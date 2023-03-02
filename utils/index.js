function showToast(title, duration = 2000, mask = true) {
	uni.showToast({
		title,
		icon: 'none',
		duration,
		mask
	})
}

function showLoading(title = "加载中", mask = true) {
	uni.showLoading({
		title,
		mask
	})
}

function hideLoading() {
	uni.hideLoading()
}

export {
	showToast,
	showLoading,
	hideLoading
}
