<template>
	<view class="container">
		<NavBar :title="$t('home.title')" :showSite="true" @switchLang="switchLang"></NavBar>
		<view class="section">
			<view class="swiper-images">
				<swiper class="swiper">
					<swiper-item v-for="(item,index) in bannerList" :key="index">
						<view class="swiper-item uni-bg-red">
							<u--image :showLoading="true" :src="item" width="100%" height="177px"></u--image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="trading d-flex align-items-center justify-around">
				<view class="item">
					<view class="title">{{$t('home.todayAmount')}}</view>
					<view class="number">
						<u-count-to ref="today_usdt" :startVal="0" :endVal="order.today_usdt" color="#5597f4"
							fontSize="18px">
						</u-count-to>
						<u--image :showLoading="true" src="/static/images/bedding/curve.png" width="100%" height="27px"
							mode="widthFix"></u--image>
					</view>
				</view>
				<view class="item">
					<view class="title">{{$t('home.todayVolume')}}</view>
					<view class="number">
						<u-count-to ref="today_order" :startVal="0" :endVal="order.today_order" color="#5597f4"
							fontSize="18px">
						</u-count-to>
						<u--image :showLoading="true" src="/static/images/bedding/curve.png" width="100%" height="27px"
							mode="widthFix"></u--image>
					</view>
				</view>
				<view class="item">
					<view class="title">{{$t('home.transactionAmount')}}</view>
					<view class="number">
						<u-count-to ref="total_usdt" :startVal="0" :endVal="order.total_usdt" color="#5597f4"
							fontSize="18px">
						</u-count-to>
						<u--image :showLoading="true" src="/static/images/bedding/curve.png" width="100%" height="27px"
							mode="widthFix"></u--image>
					</view>
				</view>
				<view class="item">
					<view class="title">{{$t('home.transactionVolume')}}</view>
					<view class="number">
						<u-count-to ref="total_order" :startVal="0" :endVal="order.total_order" color="#5597f4"
							fontSize="18px">
						</u-count-to>
						<u--image :showLoading="true" src="/static/images/bedding/curve.png" width="100%" height="27px"
							mode="widthFix"></u--image>
					</view>
				</view>
			</view>
			<view class="articles">
				<view class="head d-flex align-items-center justify-center">
					<u--image :showLoading="true" src="/static/images/icon/left.png" width="30px" height="22px"
						mode='widFix'>
					</u--image>
					<view class="title">
						{{$t('home.sectionTitle')}}
					</view>
					<u--image :showLoading="true" src="/static/images/icon/right.png" width="30px" height="22px"
						mode='widFix'>
					</u--image>
				</view>
				<view class="content">
					<u-list @scrolltolower="scrolltolower" height="1000rpx">
						<view class="list d-flex align-items-center" v-for="(item,index) in listData" :key="index"
							@click="navgateDetails(item.id)">
							<view class="img">
								<u--image v-if="index == 0" radius=10 :showLoading="true"
									src="/static/images/bedding/article1.jpg" width="110px" height="80px">
								</u--image>
								<u--image v-else-if="index == 1" radius=10 :showLoading="true"
									src="/static/images/bedding/article2.jpg" width="110px" height="80px">
								</u--image>
								<u--image v-else radius=10 :showLoading="true" src="/static/images/bedding/article3.jpg"
									width="110px" height="80px">
								</u--image>
								<!-- <u--image radius=10 :showLoading="true" src="/static/images/bedding/future.jpg"
									width="110px" height="80px">
								</u--image> -->
							</view>
							<view class="item">
								<view class="text">
									{{item.title}}
								</view>
								<view class="date">
									{{item.addtime}}
								</view>
							</view>
						</view>
						<u-divider :text="$t('basic.noMore')" v-if="hasMore"></u-divider>
					</u-list>
				</view>
			</view>
		</view>
		<Dialog :hasVerification.sync="hasVerification" @confirmIdentify="confirmIdentify"></Dialog>
	</view>
</template>

<script>
	import {
		checkUser, // 检查是否注册，注册就登录，没注册就注册
		userInc, // 用户注册
		getBanner, // 获取轮播图
		checkLang, // 检查语言
		getAnnounceList, //公告列表
		getTransferFee //获取累计交易额
	} from "@/common/api.js"
	import {
		mapState,
		mapMutations
	} from "vuex"; // 导入Vuex获取钱包地址
	import {
		setToken
	} from "@/utils/auth.js"
	export default {
		data() {
			return {
				hasVerification: false, // 弹框
				hasMore: false,
				bannerList: [],
				order: {
					total_order: 0,
					total_usdt: 0,
					today_order: 0,
					today_usdt: 0,
				},
				params: {
					page: 1
				},
				listData: [],
				// isLogin: false,
				invitationCode: ''
			}
		},
		methods: {
			...mapMutations('app', ['setLogin']),
			// 获取钱包地址
			async getData() {
				if (window.ethereum) {
					window.ethereum.on("accountsChanged", () => {
						this.$store.dispatch("web3/init");
					});
					await this.$store.dispatch("web3/init");
					this.$store.dispatch("web3/sign").then(() => {
						// await
						this.checkLogin(); // 判断用户是否注册
					});
				}
			},
			// 判断该是否已经注册绑定
			checkLogin() {
				const params = {
					address: this.defaultAccount,
					// address: '0x85c7b770ec841795be0549A34499938F09167091',
				};
				// 判断是否已经有登录过，登陆过token未过期不请求入口
				// if (!getToken()) {
				checkUser(params).then((res) => {
					if (res.code === 0) {
						setToken(res.data._token);
						this.getTopBanner(); // 获取顶部轮播图
						this.getActivityList(); // 获取活动列表
						this.getSum();
						this.setLogin();
						// this.isLogin = true; // 判断已经登录成功
						// that.token = res.data._token;
						// that.getAll();
					} else if (res.code === 404) {
						if (this.invitationCode) {
							this.confirmIdentify(this.invitationCode)
						} else {
							this.hasVerification = true;
						}
					}
				}).catch((e) => {
					console.log(e);
				});
			},
			// 输入邀请码 - 注册账号 / 温馨提示 - 关闭弹窗
			confirmIdentify(value) {
				const params = {
					address: this.defaultAccount,
					invite_code: value,
				};
				userInc(params).then((res) => {
					if (res.code === 0) {
						uni.$showToast(res.msg)
						setToken(res.data._token);
						this.hasVerification = false;
						this.getTopBanner(); // 获取顶部轮播图
						this.getActivityList(); // 获取活动列表
						this.getSum();
						this.setLogin();
						// this.isLogin = true; // 判断已经登录成功
						// that.getAll();
					} else {
						uni.$showToast(res.msg)
						// that.isError = true;
					}
				}).catch((e) => {
					console.log(e);
				});
			},
			// 获取轮播图
			getTopBanner() {
				getBanner().then((res) => {
					if (res.code === 0) {
						this.bannerList = res.data;
					}
				}).catch((e) => {
					console.log(e);
				});
			},
			// 判断后台语言
			getBackStage() {
				checkLang().then((res) => {
					console.log(res);
				}).catch((e) => {
					console.log(e);
				});
			},
			getActivityList() {
				getAnnounceList(this.params).then(res => {
					let {
						list_data
					} = res.data
					if (res.code === 0) {
						this.params.page += 1
						this.listData.push(...list_data)
					} else {
						this.hasMore = true
					}
				}).catch(err => {
					console.log(e);
				})
			},
			getSum() {
				getTransferFee().then(res => {
					if (res.code === 0) {
						this.order.today_usdt = res.data.today_usdt
						this.order.total_usdt = res.data.total_usdt
						this.order.today_order = res.data.today_order
						this.order.total_order = res.data.total_order
					}
				}).catch(err => {
					console.log(err);
				})
			},
			scrolltolower() {
				this.getActivityList()
			},
			switchLang(){
				this.params.page = 1
				this.listData = []
				this.getActivityList()
			},
			navgateDetails(id) {
				uni.navigateTo({
					url: '/pages_basic/information/information?id=' + id
				})
			}
		},
		computed: {
			/* 钱包地址 */
			...mapState({
				defaultAccount: (state) => state.web3.defaultAccount,
				isLogin: (state) => state.app.isLogin,
			})
		},
		mounted() {
			// if (this.isLogin) {
			// 	this.checkLogin()
			// } else {
			// 	this.getData();
			// }
			this.getData();
			console.log("isLogin: " + this.isLogin);
		},
		onLoad() {
			if (window.location.search) {
				// 获取页面URL参数中的代码
				const urlParams = new URLSearchParams(window.location.search);
				const code = urlParams.get('code');
				// 在代码中查找数字
				const regex = /\d+/g;
				const numbers = code.match(regex);

				this.invitationCode = numbers[0]
				// 打印数字
				console.log(numbers[0]);
			}
		},
		onShow() {
			if (this.isLogin) {
				this.params.page = 1
				this.listData = []
				this.getActivityList()
			}
			this.$nextTick(() => {
				this.$refs.total_usdt.start();
				this.$refs.today_usdt.start();
				this.$refs.total_order.start();
				this.$refs.today_order.start();
			})
		},
		// watch: {
		// 	"$i18n.locale": function() {
		// 		this.params.page = 1
		// 		this.listData = []
		// 		this.getActivityList()
		// 	}
		// }
	}
</script>

<style lang="scss" scoped>
	.container {

		background: #F5F5F5;

		.section {
			background-color: #fff;
			padding: 0 40rpx;

			.swiper-images {
				margin-top: 10rpx;
				padding: 30rpx 0rpx 0;

				.swiper {
					height: 320rpx;
				}

				.img {
					width: 100%;
				}
			}

			.trading {
				margin: 40rpx 0;

				.item {
					border-radius: 2px 2px 2px 2px;
					width: 42%;
					padding: 30rpx 15rpx;
					margin-bottom: 40rpx;
					box-shadow: 0px 1px 11px 1px rgba(0, 0, 0, 0.2);

					.title {
						font-size: 26rpx;
						color: #BDBDBD;
					}

					.number {
						color: $theme-color;
						font-size: 30rpx;
					}
				}
			}

			.articles {
				.head {
					.title {
						font-size: 40rpx;
						font-weight: bold;
						margin: 0 20rpx;
					}
				}

				.list {
					margin-top: 30rpx;
					padding-top: 20rpx;
					padding-bottom: 40rpx;
					border-bottom: 1px solid #C4C8CC;

					.item {
						flex: 1;
						margin-left: 20rpx;

						.text {
							font-weight: bold;
							font-size: 30rpx;
							margin-bottom: 15rpx;
							text-overflow: ellipsis;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							word-break: break-all;
							display: -webkit-box !important;
							overflow: hidden;
						}

						.date {
							color: #999999;
							font-size: 26rpx;
						}
					}
				}
			}
		}

	}
</style>
