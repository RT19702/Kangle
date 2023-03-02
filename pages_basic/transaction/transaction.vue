<template>
	<view class="container">
		<NavBar :title="type == 1 ? $t('basic.recharge') : $t('basic.withdraw')"></NavBar>
		<view class="section d-flex justify-between flex-cloumn">
			<view class="">
				<view class="item d-flex justify-between align-items-center">
					<view>{{$t('transaction.walletAddress')}}</view>
					<view>{{_defaultAccount}}</view>
				</view>
				<view class="item d-flex justify-between align-items-center" v-if="type == 2">
					<view>{{$t('transaction.withdrawalType')}}</view>
					<view class="theme-color d-flex align-items-center">
						<view class="select active"></view>
						<view>USDT</view>
					</view>
				</view>
				<view class="item">
					<view class="d-flex input-pay align-items-center">
						<view> {{type == 1 ? $t('transaction.rechargeAmount') : $t('transaction.withdrawBalance')}}
						</view>
						<view class="theme-color assist">USDT({{$t('basic.balance')}})：{{userInfo.usdt_balance}}</view>
					</view>
					<u--input border="none" v-model="params.amount" type='number'></u--input>
				</view>
				<!-- <view class="item d-flex justify-between align-items-center">
					<view>提现密码</view>
					<u--input border="none" :password='true' class="input-password" maxlength="6" inputAlign="right">
					</u--input>
				</view> -->
			</view>
			<view class="button">
				<u-button :text="$t('basic.submit')" size='large'
					color="linear-gradient(315deg, #234ADB 0%, #4269FA 100%)" @click="transaction(type)">
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from "@/mixins/index.js"
	import {
		mapState
	} from "vuex"; // 导入Vuex获取钱包地址
	import {
		preRecharge,
		recharge,
		withdrawal
	} from "@/common/api.js"
	import BigNumber from "bignumber.js";
	export default {
		mixins: [mixin],
		data() {
			return {
				type: '', // 1 为 充值 2 为提现
				params: {
					amount: '',
				},
				// order: {
				// 	order_sn: null,
				// 	amount: null
				// }
			}
		},
		methods: {
			transaction(type) {
				if (this.params.amount) {
					type == 1 ? this.payment() : this.withdraw()
				} else {
					uni.$showToast(this.$t('basic.fillInMsg'))
				}
			},
			// 充值
			payment() {
				/** 入金地址 */
				const that = this;
				const {
					toBuyAddress
				} = require("@/common/setting.js");
				let swapamount = BigNumber(that.params.amount).times(1e18).toFixed(0);
				preRecharge(that.params).then(res => {
					if (res.code == 0) {
						let {
							order_sn
							// amount
						} = res.data
						uni.$showLoading(this.$t('basic.dealing'));
						/* 2、提交支付 */
						that.$store.dispatch("web3/transfer", {
							amount: swapamount /* BigNumber(that.numberOne).times(1e18).toFixed(0)*/ ,
							to: toBuyAddress,
						}).then((res) => {
							uni.$hideLoading();
							const transactionHash = res.transactionHash;
							recharge({
								hash: transactionHash,
								order_sn,
							}).then(res => {
								uni.$showToast(res.msg)
								that.params.amount = null
								that.$store.dispatch('web3/getBalanceOfUsdt');
							})
						}).catch(err => {
							console.error(err);
							uni.$hideLoading();
						})
					} else {
						uni.$showToast(res.msg)
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 提币
			withdraw() {
				withdrawal(this.params).then(res => {
					uni.$showToast(res.msg)
				}).catch(err => {
					console.log(err);
				})
			}
		},
		computed: {
			/* 钱包地址 */
			...mapState({
				defaultAccount: (state) => state.web3.defaultAccount,
			}),
			/* 钱包地址 带* */
			_defaultAccount() {
				return this.defaultAccount.substr(0, 6) + '*****' + this.defaultAccount.substr(-5, this.defaultAccount
					.length);
			},
		},
		onLoad(options) {
			this.type = options.type || 1
		}
	}
</script>

<style lang="scss" scoped>
	.section {
		background-color: #fff;
		padding: 30rpx;
		margin-top: 10rpx;
		height: 85vh;

		.item {
			padding: 30rpx 20rpx;
			border: 1px solid #C4C8CC50;
			margin-bottom: 30rpx;

			.select {
				width: 30rpx;
				height: 30rpx;
				border-radius: 50%;
				margin-right: 10rpx;
				position: relative;
				border: 1px solid #000;
			}

			.active {
				border: 1px solid #9fb7ec;

				&::after {
					position: absolute;
					content: '';
					width: 13rpx;
					height: 13rpx;
					background-color: $theme-color;
					border-radius: 50%;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}

			.assist {
				font-size: 26rpx;
				margin-left: 20rpx;
			}

			.input-pay {
				margin-bottom: 20rpx;
			}

		}
	}
</style>
