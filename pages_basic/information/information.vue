<template>
	<view class="">
		<NavBar :title="$t('information.title')"></NavBar>
		<view class="section">
			<view class="title text-center">{{particulars.title}}</view>
			<!-- <view class="date text-center">2022.12.12 18：20</view> -->
			<view v-html="particulars.content"></view>
		</view>
	</view>
</template>

<script>
	import {
		getProgramDetail
	} from "@/common/api.js"
	export default {
		data() {
			return {
				params: {
					announce_id: ''
				},
				particulars: {
					title: '',
					content: ''
				}
			}
		},
		methods: {
			getDetail() {
				getProgramDetail(this.params).then(res => {
					if (res.code === 0) {
						let {
							data: result
						} = res
						this.particulars.title = result.title
						this.particulars.content = result.content
					}
				}).catch(err => {
					console.log(err);
				})
			}
		},
		onLoad(options) {
			this.params.announce_id = options.id;
			this.getDetail()
		}
	}
</script>

<style lang="scss">
	.section {
		margin: 40rpx 30rpx 0;
		padding: 40rpx;
		box-shadow: 0px 2px 17px 1px rgba(0, 0, 0, 0.1);
		border-radius: 2px 2px 2px 2px;

		.date {
			color: #9c9c9c;
			margin: 20rpx 0;
			font-size: 26rpx;
		}
	}
</style>
