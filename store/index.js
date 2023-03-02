import Vue from 'vue';
import Vuex from 'vuex';
import web3 from './modules/web3.js'
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		token: '', // 用户token
		baseUrl: 'http://kangle.weiyinstudio.com', // 测试服域名
		// baseUrl: '', // 正式服域名
	},
	mutations: {

	},
	actions: {

	},
	modules: {
		web3
	}
});

export default store;
