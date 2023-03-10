// import Fn from '@/common/public.js'; // 导入工具
let server_url = 'http://www.topfortune.net'; // 服务器地址
// let server_url = 'http://kangle.weiyinstudio.com'; // 服务器地址

let token = '';	// 用户token

function service(options = {}) {
	// server_url = store.state.baseUrl; // 从vuex中获取网络请求地址
	// store.state.token && (token = store.state.token); // 从vuex中获取登录凭证
	// #ifdef H5
	// token = localStorage.getItem('token'); // 从storage中获取token - 只在H5中
	// #endif
	token = uni.getStorageSync('token');
	options.url = `${server_url}${options.url}`;
	options.data = options.params;
	options.header = {
		'Content-Type': 'application/json; charset=UTF-8'
	};
	token && (options.header = {
		'Token': token
	});
	return new Promise((resolved, rejected) => {
		options.success = (res) => {
			// console.log(res);
			let code = Number(res.data.code);
			// setTimeout(() => {
			switch (code) { // 状态自己判断，每个不一样
				case 0:
					resolved(res.data);
					break;
				case 1:
					resolved(res.data);
					break;
				case 2:
					resolved(res.data);
					break;
				case -1:
					resolved(res.data);
					break;
				// case 1010:
				// 	resolved(res.data);
				// 	Fn.Toast('登录失效!', 3, 1500);
				// 	setTimeout((res) => {
				// 		uni.reLaunch({
				// 			url: '/pages/login/login',
				// 		});
				// 	}, 1500)
				// 	break;
				case 401: 
					resolved(res.data);
					break;
				case 404:
					resolved(res.data);
					break;
				case 402:
					rejected(res.data);
					break;
				default:
					rejected(res.data);
					// Fn.LoadingOff();
					// Fn.Toast('!', 3, 1000);
					break;
			}
			// }, 700);
		}
		options.fail = (err) => {
			rejected(err);
			// Fn.LoadingOff();
		}
		uni.request(options);
	});
}
export default service;
