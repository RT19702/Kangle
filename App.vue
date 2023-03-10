<!-- <template>
	<view>
		<router-view></router-view>
		<my-tab-bar></my-tab-bar>
	</view>
</template> -->

<script>
	import MyTabBar from '@/components/MyTabBar.vue'
	import {
		showToast,
		showLoading,
		hideLoading
	} from "@/utils/index.js"
	export default {
		components: {
			MyTabBar
		},
		onLaunch: function() {
			uni.$showToast = showToast;
			uni.$showLoading = showLoading;
			uni.$hideLoading = hideLoading;
		},
		onShow: function() {
		},
		onHide: function() {}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "@/static/css/font.css";
	@import "static/css/theme.scss";
	@import "static/css/reset.scss";
</style>
