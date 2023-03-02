<template>
	<view class="container">
		<NavBar :title="$t('mine.title')" :showSite="true"></NavBar>
		<view class="section">
			<view class="user d-flex align-items-center">
				<view class="image">
					<u--image shape="circle" :showLoading="true" src="/static/images/apply/photo.png" width="59px"
						height="59px">
					</u--image>
					<view class="level text-center">
						V{{userInfo.level}}
					</view>
				</view>
				<view class="personal-information">
					<view class="coding" @click="copyId">
						<text>ID:{{userInfo.user_id}}</text>
						<text class="theme-color copy">{{$t('basic.copy')}}</text>
					</view>
					<view class="address">
						{{$t('transaction.walletAddress')}}: {{userInfo.address}}
					</view>
				</view>
			</view>
			<view class="income d-flex align-content-center justify-around">
				<view class="text-center">
					<view class="theme-color number">{{userInfo.total_profit}}</view>
					<view class="text">{{$t('mine.grossIncome')}}</view>
				</view>
				<view class="text-center">
					<view class="theme-color number">{{userInfo.team_profit}}</view>
					<view class="text">{{$t('mine.teamIncome')}}</view>
				</view>
				<view class="text-center">
					<view class="theme-color number">{{userInfo.recommend_profit}}</view>
					<view class="text">{{$t('mine.recommend')}}</view>
				</view>
			</view>
			<view class="basic-function">
				<view>{{$t('mine.basic')}}</view>
				<view class="list d-flex align-items-center">
					<view class="item" v-for="(item,index) in basicList" :key="index">
						<view class="" v-if="item.eventName" @click="item.eventName">
							<view class="image d-flex align-items-center justify-center">
								<u--image :showLoading="true" :src="item.src" width="65px" height="65px"
									mode="aspectFit">
								</u--image>
							</view>
							<view class="text  text-center">
								{{item.title}}
							</view>
						</view>
						<view class="" v-else>
							<view class="image d-flex align-items-center justify-center">
								<u--image :showLoading="true" :src="item.src" width="65px" height="65px"
									mode="aspectFit">
								</u--image>
							</view>
							<view class="text  text-center">
								{{item.title}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from "@/mixins"
	export default {
		mixins: [mixin],
		data() {
			return {
				basicList: [{
					src: '/static/images/apply/assets.png',
					title: this.$t('mine.assets'),
					eventName: this.navgateAssets,
				}, {
					src: '/static/images/apply/hire.png',
					title: this.$t('mine.hire'),
					eventName: this.navgateMercenary,
				}, {
					src: '/static/images/apply/team.png',
					title: this.$t('mine.team'),
					eventName: this.navgateTeam,
				}, {
					src: '/static/images/apply/share.png',
					title: this.$t('mine.share'),
					eventName: this.navgateShare,
				}, {
					src: '/static/images/apply/about-us.png',
					title: this.$t('mine.about')
				}, {
					src: '/static/images/apply/log-out.png',
					title: this.$t('mine.logout')
				}]
			}
		},
		methods: {
			copyId() {
				uni.setClipboardData({
					data: `${this.userInfo.user_id}`, // String类型
					success: () => {
						uni.$showToast(this.$t('basic.successCopy'))
					}
				})
			},
			navgateAssets() {
				uni.navigateTo({
					url: '/pages_basic/property/property'
				})
			},
			navgateMercenary() {
				uni.navigateTo({
					url: '/pages_basic/mercenary/mercenary'
				})
			},
			navgateTeam() {
				uni.navigateTo({
					url: '/pages_basic/team/team'
				})
			},
			navgateShare() {
				uni.navigateTo({
					url: '/pages_basic/share/share',
				});
			}
		},

	}
</script>

<style lang="scss" scoped>
	.container {
		background: #F5F5F5;

		.section {
			background-color: #fff;
			padding: 30rpx;
			margin-top: 10rpx;

			.user {
				.image {
					position: relative;

					.level {
						position: absolute;
						bottom: -5px;
						left: 50%;
						transform: translateX(-50%);
						background-color: $theme-color;
						color: #fff;
						width: 60rpx;
						font-size: 20rpx;
						border-radius: 55px 55px 55px 55px;
					}
				}

				.personal-information {
					margin-left: 20rpx;

					.coding {
						.copy {
							margin-left: 10rpx;
						}
					}

					.address {
						font-size: 28rpx;
						color: #a7a7a7;
					}
				}
			}

			.income {
				margin-top: 50rpx;

				.number {

					font-weight: bold;
				}

				.text {
					color: #7f9999;
					font-size: 26rpx;
				}
			}

			.basic-function {
				margin-top: 60rpx;
				box-shadow: 0px 2px 17px 1px rgba(0, 0, 0, 0.2);
				padding: 40rpx 20rpx;

				.list {
					padding: 0 10rpx;

					.item {
						margin-top: 40rpx;
						width: 25%;

						.image {
							// background-color: #e3e9fa;
							width: 100rpx;
							height: 100rpx;
							border-radius: 50%;
							margin: 0 auto;
						}

						.text {
							font-size: 30rpx;
							margin-top: 10rpx;
						}
					}

				}
			}

		}
	}
</style>
