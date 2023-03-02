<template>
	<view class="my-tab-bar">
		<view v-for="(item, index) in tabBarList" :key="index" class="tab" @tap="switchTab(index)">
			<image :src="index === activeIndex ? item.selectedIconPath : item.iconPath" class="icon" />
			<text class="text">{{ $t('tabBarList.' + index + '.text') }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabBarList: [{
						iconPath: '/static/images/tabBar/home.png',
						selectedIconPath: '/static/images/tabBar/activeHome.png',
						pagePath: '/pages/home/index'
					},
					{
						iconPath: '/static/images/tabBar/hire.png',
						selectedIconPath: '/static/images/tabBar/activeHire.png',
						pagePath: '/pages/hire/hire'
					},
					{
						iconPath: '/static/images/tabBar/mine.png',
						selectedIconPath: '/static/images/tabBar/activeMine.png',
						pagePath: '/pages/mine/mine'
					}
				],
				activeIndex: 0
			}
		},
		methods: {
			switchTab(index) {
				this.activeIndex = index
				uni.switchTab({
					url: this.tabBarList[index].pagePath
				})
			}
		}
	}
</script>

<style scoped>
	.my-tab-bar {
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 65px;
		background-color: #fff;
		border-top: 1px solid #ccc;
	}

	.tab {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.icon {
		width: 50rpx;
		height: 50rpx;
	}

	.text {
		font-size: 14px;
	}
</style>
