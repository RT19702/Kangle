<template>
	<view class="container">
		<NavBar :title="$t('hire.title')" :showSite="true"></NavBar>
		<view class="section">
			<view class="item d-flex justify-between align-items-center">
				<view>{{$t('hire.placeholderOne')}}</view>
				<view> {{config.day}} {{$t('basic.days')}}</view>
			</view>
			<view class="item d-flex justify-between align-items-center">
				<view>{{$t('hire.placeholderTwo')}}</view>
				<view class="theme-color d-flex align-items-center">
					<view class="select active"></view>
					<view>USDT</view>
				</view>
			</view>
			<view class="item">
				<view class="d-flex input-pay justify-between align-items-center">
					<view>{{$t('hire.placeholderThree')}}</view>
					<view class="theme-color assist">{{$t('hire.placeholderFour')}}: {{userInfo.usdt_balance}}</view>
				</view>
				<u--input border="none" type="number" v-model="params.amount"></u--input>
			</view>
			<!-- <view class="item d-flex justify-between align-items-center">
				<view>Transaction password</view>
				<u--input border="none" :password='true' class="input-password" maxlength="6" inputAlign="right">
				</u--input>
			</view> -->
			<view class="button">
				<u-button :text="$t('hire.submit')" size='large'
					color="linear-gradient(315deg, #234ADB 0%, #4269FA 100%)" @click="employBy"></u-button>
			</view>
		</view>
		<!-- <u-picker :show="show" :columns="columns" @cancel='show = false' @confirm="getCurrentDate"></u-picker> -->
	</view>
</template>

<script>
	import mixin from "@/mixins/index.js"
	import {
		employByBalance,
		getConfig
	} from "@/common/api.js"
	export default {
		mixins: [mixin],
		data() {
			return {
				config: {
					day: 0
				},
				params: {
					amount: null
				}
			}
		},
		methods: {
			employBy() {
				if (this.params.amount) {
					employByBalance(this.params).then(res => {
						uni.$showToast(res.msg);
					}).catch(err => {
						console.log(err);
					})
				} else {
					uni.$showToast(this.$t('basic.fillInMsg'));
				}
			},
			// 获取配置
			getconfig() {
				getConfig().then(res => {
					if (res.code === 0) {
						this.config.day = res.data.employ_lock_day
					}
					console.log(res);
				}).catch(err => {
					console.log(err);
				})
			}
		},
		mounted() {
			this.getconfig()
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background: #F5F5F5;

		.section {
			background-color: #fff;
			padding: 30rpx;
			margin-top: 10rpx;

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
				}

				.input-pay {
					margin-bottom: 20rpx;
				}

				.button {}
			}
		}
	}
</style>
