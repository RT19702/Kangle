<template>
	<view class="section-header">
		<view class="nav d-flex align-items-center justify-center">
			<image class="img" src="@/static/images/icon/getBack.png" mode="widthFix" @click="getBack"></image>
			<view class="title">
				{{title}}
			</view>
			<view class="">
				<slot></slot>
			</view>
		</view>
		<view class="region d-flex align-items-center justify-center" v-if="showSite">
			<view class="">
				{{_defaultAccount}}
			</view>
			<view class="language d-flex align-items-center justify-center" @click="show = true">
				<image class="img"
					:src="language == 'zh' || language == 'zh-cn' ? '/static/images/icon/cn.png' : '/static/images/icon/usa.png'"
					mode="widthFix"></image>
				<!-- <u--image class="img" :showLoading="true" :src="imgUrl" width="34rpx" height="34rpx"></u--image> -->
				<view class="title">
					{{language == 'zh' || language == "zh-cn" ? "中文" : "en-us"}}
				</view>
			</view>
		</view>
		<u-picker :show="show" :columns="columns" @cancel='show = false' @confirm="getCurrentVal"></u-picker>
	</view>
</template>

<script>
	import {
		changeLang
	} from "@/common/api.js"
	import {
		setLanguage,
		getLanguage
	} from "@/utils/auth.js"
	import {
		mapState
	} from "vuex"; // 导入Vuex获取钱包地址
	export default {
		name: "NavHead",
		props: {
			title: {
				type: String
			},
			showSite: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				show: false,
				columns: [
					[this.$t('langCol.zh'), this.$t('langCol.en')]
				],
				// imgUrl: getLanguage() == "zh" ? '/static/images/icon/cn.png' : '/static/images/icon/usa.png',
			};
		},
		methods: {
			getCurrentVal(e) {
				this.show = false;
				let matching = /[a-zA-Z]+/g; // 匹配多个英文字母
				let params = {}
				let language = ''
				e.value[0] == "中文" || e.value[0] == "zh-cn" ? language = 'zh-cn' : language = 'en-us'
				this.$store.commit('app/setLang', language);
				if (this.language == 'zh-cn') {
					// this.imgUrl = '/static/images/icon/cn.png'
					this.$i18n.locale = 'zh'
				} else {
					// this.imgUrl = '/static/images/icon/usa.png'
					this.$i18n.locale = 'en'
				}
				changeLang({
					lang: language
				}).then((res) => {
					if (res.code === 0) {
						setLanguage(this.$i18n.locale)
						this.$emit('switchLang')
					}
				}).catch(err => {
					console.log(err);
				})
			},
			getBack() {
				this.$router.back();
			}
		},
		computed: {
			/* 钱包地址 */
			...mapState({
				defaultAccount: (state) => state.web3.defaultAccount,
				language: (state) => state.app.language,
			}),
			/* 钱包地址 带* */
			_defaultAccount() {
				return this.defaultAccount.substr(0, 6) + '*****' + this.defaultAccount.substr(-5, this.defaultAccount
					.length);
			}
		},
		watch: {
			"$i18n.locale": function() {
				this.columns = [
					[this.$t('langCol.zh'), this.$t('langCol.en')]
				]
			}
		},
		onShow() {
			console.log(this.$i18n.locale, "$i18n.locale");
		}
	}
</script>

<style lang="scss" scoped>
	.section-header {
		padding: 15px;
		background-color: #fff;

		.nav {
			position: relative;

			.img {
				width: 20rpx;
				position: absolute;
				left: 0;
			}

			.title {
				font-weight: bold;
				font-size: 38rpx;
			}
		}

		.region {
			margin-top: 20rpx;
			position: relative;

			// font-size: 28rpx;
			.language {
				background-color: $theme-color;
				border-radius: 47px 47px 47px 47px;
				width: 176rpx;
				height: 50rpx;
				text-align: center;
				position: absolute;
				right: 0;

				.img {
					width: 34rpx;
					// margin-left: 6rpx;
					position: absolute;
					left: 8rpx;
					top: 9.5rpx;
				}

				.title {
					color: #fff;
					font-size: 20rpx;
					font-weight: bold;
					line-height: 20rpx;
					position: relative;

					&::after {
						position: absolute;
						content: '';
						right: -25rpx;
						top: 40%;
						// transform: translateY(-50%);
						width: 0px;
						height: 0px;
						border-top: 8rpx solid #fff;
						border-right: 8rpx solid transparent;
						border-bottom: 8rpx solid transparent;
						border-left: 8rpx solid transparent;
					}
				}
			}
		}
	}
</style>
