<template>
	<view>
		<NavBar :title="$t('mercenary.title')"></NavBar>
		<view class="section">
			<u-list @scrolltolower="scrolltolower" height="90vh">
				<view class="item" v-for="(item,index) in listData" :key="item.employ_id">
					<view class="d-flex align-items-center justify-between designation">
						<view>{{$t('mercenary.employment')}} {{index+1}} {{item.status_name}}</view>
						<view>{{item.add_time}}</view>
					</view>
					<view class="d-flex align-items-center justify-between">
						<view class="d-flex align-items-center justify-between">
							<u--image :showLoading="true" src="/static/images/bedding/standard.png" width="50px"
								height="50px"></u--image>
							<view class="message">
								<view class="">{{$t('mercenary.employmentDays')}}：{{item.lock_day}} {{$t('basic.days')}}
								</view>
								<view class="price">{{$t('mercenary.employmentAmount')}}：{{item.employ_amount}}</view>
							</view>
						</view>
						<view class="button" v-if="item.fire_able == true" @click="dismissal(item.employ_id)">
							{{$t('mercenary.dismissal')}}
							<!-- {{item.status_name}} -->
							<!-- {{$t('mercenary.underway')}} -->
						</view>
						<view class="button dismissal" v-else>
							{{$t('mercenary.dismissal')}}
							<!-- {{item.status_name}} -->
							<!-- {{$t('mercenary.underway')}} -->
						</view>
					</view>
				</view>
			</u-list>
		</view>
	</view>
</template>

<script>
	import {
		getEmployOrder,
		fire
	} from "@/common/api.js"
	export default {
		data() {
			return {
				listData: [],
				params: {
					page: 1
				}
			}
		},
		methods: {
			getEmploy() {
				getEmployOrder(this.params).then(res => {
					if (res.code === 0) {
						this.params.page += 1
						this.listData.push(...res.data.list_data)
					}
				}).catch(err => {
					console.log(err);
				})
			},
			dismissal(id) {
				let params = {
					employ_id: id
				}
				fire(params).then(res => {
					if (res.code == 0) {
						this.params.page = 1
						this.listData = []
						this.getEmploy()
					}
					uni.$showToast(res.msg)
				}).catch(err => {
					console.log(err);
				})
			},
			scrolltolower() {
				this.getEmploy()
			}
		},
		mounted() {
			this.getEmploy()
		}
	}
</script>

<style lang="scss">
	.section {
		margin-top: 50rpx;
		padding: 0 30rpx;

		.item {
			border: 1px solid #70707020;
			padding: 20rpx;
			margin-bottom: 30rpx;
			border-radius: 2px 2px 2px 2px;

			.designation {
				margin-bottom: 20rpx;
				color: #3480DF;
				position: relative;

				&::after {
					position: absolute;
					left: -11px;
					top: 0;
					content: '';
					width: 10rpx;
					height: 100%;
					background-color: #3480DF;
					border-radius: 55px 55px 55px 55px;
				}
			}

			.message {
				margin-left: 20rpx;

				.price {
					color: #acacac;
					font-size: 30rpx;
				}
			}

			.button {
				color: #3480DF;
				border: 1px solid #3480DF;
				border-radius: 55px 55px 55px 55px;
				padding: 5rpx 20rpx;
			}

			.dismissal {
				opacity: 0.5;
			}
		}
	}
</style>
