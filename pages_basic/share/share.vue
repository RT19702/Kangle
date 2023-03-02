<template>
	<view>
		<NavBar :title="$t('share.title')"></NavBar>
		<view class="section">
			<view class="interlinkage text-center">
				{{share.invitedCode}}
			</view>
			<view class="text-center d-flex align-items-center justify-center">
				<u--image :showLoading="true" :src="share.imgShare" width="200px" height="200px"></u--image>
			</view>
			<u-button :text="$t('basic.copylink')" class='button' shape='circle'
				color="linear-gradient(294deg, #234ADB 0%, #4269FA 100%)" @click="copyCode"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		getInvitedCode
	} from "@/common/api.js"
	export default {
		data() {
			return {
				share: {
					invitedCode: '',
					imgShare: ''
				}
			}
		},
		methods: {
			getCode() {
				getInvitedCode().then((res) => {
					if (res.code === 0) {
						this.share.invitedCode = res.data.invite_url
						this.share.imgShare = res.data.tgm_url
					}
				}).catch(err => {
					console.log(err);
				})
			},
			copyCode() {
				uni.setClipboardData({
					data: this.share.invitedCode,
					success:()=>{
						uni.$showToast(this.$t('basic.successCopy'))
					}
				})
			}
		},
		mounted() {
			this.getCode()
		}
	}
</script>

<style lang="scss" scoped>
	.section {
		margin: 40rpx 30rpx 0;
		padding: 60rpx 40rpx;
		border: 1px solid #70707015;
		border-radius: 2px 2px 2px 2px;

		.interlinkage {
			padding: 26rpx 0;
			background: #F5F5F5;
			margin-bottom: 40rpx;
		}

		.button {
			width: 200rpx;
			margin-top: 30rpx;
		}
	}
</style>
