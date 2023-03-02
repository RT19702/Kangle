<template>
	<view>
		<NavBar :title="$t('team.title')"></NavBar>
		<view class="section">
			<view class="performance">
				<view class="headline">
					{{$t('team.teamPerformance')}}
				</view>
				<view class="number">
					{{teamData.total_achievement.toFixed(2)}}
				</view>
				<view class="people d-flex align-items-center justify-around">
					<view class='flex-1'>{{$t('team.directPush')}} <text
							class="white number">{{teamData.invite_number}}</text></view>
					<view class='flex-1'>{{$t('team.teamSize')}} <text
							class="white number">{{teamData.team_nums}}</text></view>
				</view>
			</view>
			<view class="group-size">
				<view class="title">
					{{$t('team.teamSize')}}
				</view>
				<view class="wrapper ">
					<view class="item d-flex gary">
						<view class="first text-center">{{$t('basic.index')}}</view>
						<view class="second text-center">{{$t('team.accountNumber')}}</view>
						<view class="thirdly text-center">{{$t('team.individualPerformance')}}</view>
						<view class="fourthly text-right">{{$t('team.groupPerformance')}}</view>
					</view>
					<u-list @scrolltolower="scrolltolower" height='650rpx'>
						<view class="list d-flex" v-for="(item,index) in listData" :key="index">
							<view class="first text-center">{{index + 1}}</view>
							<view class="second text-center">{{item.user_id}}</view>
							<view class="thirdly text-center">{{item.self_achievement}}</view>
							<view class="fourthly text-right">{{item.team_achievement}}</view>
						</view>
						<u-divider :text="$t('basic.noMore')" v-if="hasMore"></u-divider>
					</u-list>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getTeam
	} from "@/common/api.js"
	export default {
		data() {
			return {
				teamData: {
					invite_number: 0, //直推人数
					team_nums: 0, //团队人数
					total_achievement: 0 //总业绩
				},
				listData: [],
				params: {
					page: 1
				},
				hasMore: false
			}
		},
		methods: {
			getTeamList() {
				getTeam(this.params).then((res) => {
					if (res.code === 0) {
						this.params.page += 1
						this.teamData = res.data
						this.listData.push(...res.data.list_data)
					} else {
						this.hasMore = true
					}
				})
			},
			scrolltolower() {
				this.getTeamList()
			}
		},
		mounted() {
			this.getTeamList()
		}
	}
</script>

<style lang="scss" scoped>
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

			.headline {}

			>.number {
				color: #fff;
				font-size: 55rpx;
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
		}

		.group-size {
			margin-top: 60rpx;

			.title {
				font-size: 36rpx;
				margin-bottom: 30rpx;
			}

			.wrapper {
				border: 1px solid #70707030;
				padding: 40rpx;

				.first {
					width: 10%;
				}

				.second {
					width: 35%;
				}

				.thirdly {
					width: 27%;
				}

				.fourthly {
					width: 27%;
				}

				.list {
					margin-top: 30rpx;
				}
			}
		}
	}
</style>
