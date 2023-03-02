<template>
	<view>
		<NavBar :title="$t('property.title')">
			<view class="navgate" @click="navgateTransaction(2)">
				{{$t('basic.withdraw')}}
			</view>
		</NavBar>
		<view class="section">
			<view class="performance">
				<view class="d-flex align-items-center justify-between">
					<view>
						<view class="headline">
							{{$t('basic.balance')}}(USDT)
						</view>
						<view class="number">
							{{userInfo.usdt_balance}}
						</view>
					</view>
					<view class="recharge text-center" @click="navgateTransaction(1)">
						{{$t('basic.recharge')}}
					</view>
				</view>
				<view class="people d-flex align-items-center justify-around">
					<view class='flex-1'>{{$t('property.teamRevenue')}} <text
							class="white number">{{userInfo.team_profit}}</text></view>
					<view class='flex-1'>{{$t('property.recommendRevenue')}} <text
							class="white number">{{userInfo.recommend_profit}}</text>
					</view>
				</view>
			</view>
			<view class="asset-detail">
				<view class="d-flex align-items-center tab">
					<view class="item" :class="[activeIndex == 0 ? 'active' : '']" @click="switchIndex(0,null)">
						{{$t('property.balanceStatement')}}
					</view>
					<view class="item" :class="[activeIndex == 1 ? 'active' : '']" @click="switchIndex(1,'team')">
						{{$t('property.teamRevenue')}}
					</view>
					<view class="item" :class="[activeIndex == 2 ? 'active' : '']" @click="switchIndex(2,'recommend')">
						{{$t('property.recommendRevenue')}}
					</view>
				</view>
				<view class="content">
					<u-list @scrolltolower="scrolltolower" height="50vh">
						<view class="item d-flex align-items-center justify-between" v-for="(item,index) in listData"
							:key="index">
							<view>
								<view class="detail">
									{{item.desc}}
								</view>
								<view class="date gary">
									{{item.add_time}}
								</view>
							</view>
							<view class="price" :class="{red:item.adds<0,blue:item.adds>0}">
								{{item.adds > 0 ? '+' + item.adds : item.adds}}
							</view>
						</view>
					</u-list>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getIncome
	} from "@/common/api.js"
	import mixin from "@/mixins"
	export default {
		mixins: [mixin],
		data() {
			return {
				listData: [],
				params: {
					page: 1,
					type: null
				},
				activeIndex: 0
			}
		},
		methods: {
			scrolltolower() {
				this.incomeList()
			},
			incomeList() {
				getIncome(this.params).then(res => {
					if (res.code === 0) {
						this.params.page += 1
						this.listData.push(...res.data.list_data)
					}
				}).catch(err => {
					console.log(err);
				})
			},
			switchIndex(index, type) {
				this.activeIndex = index
				this.params.type = type
				this.params.page = 1
				this.listData = []
				this.incomeList()
			},
			navgateTransaction(index) {
				uni.navigateTo({
					url: '/pages_basic/transaction/transaction?type=' + index
				})
			}
		},
		mounted() {
			this.incomeList()
		}
	}
</script>

<style lang="scss" scoped>
	.navgate {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		color: #3480DF;
	}

	.blue {
		color: #467fcf;
	}

	.red {
		color: #cb4b49;
	}

	.section {
		padding: 30rpx;

		.white {
			color: #fff;
		}

		.gary {
			color: #b3b3b3;
		}

		.performance {
			background: linear-gradient(294deg, #234ADB 0%, #4269FA 100%);
			padding: 36rpx 36rpx 40rpx;
			border-radius: 3px 3px 3px 3px;
			color: #c6d2fc;

			.headline {
				+.number {
					color: #fff;
					font-size: 55rpx;
				}
			}

			.people {
				margin-top: 20rpx;
				font-size: 30rpx;

				view {
					width: 50%;

					.number {
						margin-left: 10rpx;
						font-size: 35rpx;
					}
				}
			}

			.recharge {
				width: 150rpx;
				background-color: #5778f2;
				border-radius: 55px 55px 55px 55px;
				padding: 10rpx 20rpx;
				color: #d5defc;
			}
		}

		.asset-detail {
			margin-top: 50rpx;

			.tab {
				.item {
					color: #b3b3b3;
					margin-right: 20rpx;
				}

				.active {
					color: #333333;
				}
			}

			.content {
				border: 1px solid rgba(112, 112, 112, 0.2);
				margin-top: 40rpx;
				padding: 0 20px;
				/*height: 445px;*/
				height: 50vh;

				.item {
					border-bottom: 1px solid rgba(112, 112, 112, 0.2509803922);
					padding: 20px 0;

					.detail {
						font-size: 15px;
						font-weight: bold;
					}

					.date {
						font-size: 13px;
						margin-top: 5px;
					}

					.price {
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
