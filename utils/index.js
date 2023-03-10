export function showToast(title, duration = 2000, mask = true) {
	console.log('showToast is called') // 输出调试信息
	uni.showToast({
		title,
		icon: 'none',
		duration,
		mask
	})
}

export function showLoading(title = "加载中", mask = true) {
	uni.showLoading({
		title,
		mask
	})
}

export function hideLoading() {
	uni.hideLoading()
}

// URL参数转成对象
export function queryString(str) {
	let params = str.split('?')[1]; //截取?号后的字符串即name=itclanCoder&study=css
	let param = params.split('&'); // 通过&符号进行分割即["name=itclanCoder", "study=css"]
	let obj = {}; // 用一个对象存储目标值
	for (let i = 0; i < param.length; i++) {
		// 循环遍历截取出来的param数组
		let paramsA = param[i].split('='); // 通过split,=继续对数组params每一项进行分割,生成数组["name", "itclanCoder"]
		let key = paramsA[0]; // 取数组项["name", "itclanCoder"]中第0位,即name
		let value = paramsA[1]; // 取数组项["name", "itclanCoder"]中第1位,即itclanCoder
		obj[key] = value;
	}
	return obj;
}

// export {
// 	showToast,
// 	showLoading,
// 	hideLoading,
// 	queryString
// }
