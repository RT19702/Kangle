import request from '@/utils/request.js';

/* 登录接口 */
const loginUrl = '/dapp/index';
/* 用户信息接口 */
const indexUrl = '/dapp/api';
/* 活动接口 */
const activityUrl = '/dapp/Activity'
/* 用户接口 */
const userUrl = '/dapp/User';
/* 切换语言 */
const languageUrl = '/dapp/Languge';

/* 入口 */
export function checkUser(params) {
	return request({
		url: loginUrl + '/checkUser',
		method: 'POST',
		params
	})
};

/* 新增用户 */
export function userInc(params) {
	return request({
		url: loginUrl + '/userInc',
		method: 'POST',
		params
	})
};

/* 检查服务器当前语言 */
export function checkLang() {
	return request({
		url: languageUrl + '/checkLang',
		method: 'POST',
	})
}

/* 切换语言 */
export function changeLang(params) {
	return request({
		url: languageUrl + '/changeLang',
		method: 'GET',
		params
	})
}

/* 获取用户信息 */
export function getUserinfo() {
	return request({
		url: indexUrl + '/getUserinfo',
		method: 'GET',
	})
};

/* 获取轮播图 */
export function getBanner() {
	return request({
		url: indexUrl + '/getBanner',
		method: 'GET',
	})
};

/* 邀请链接 */
export function getInvitedCode() {
	return request({
		url: indexUrl + '/getInvitedCode',
		method: 'GET',
	})
}

/* 获取团队列表 */
export function getTeam(params) {
	return request({
		url: indexUrl + '/getTeam',
		method: 'GET',
		params
	})
};

/* 获取雇佣记录 */
export function getEmployOrder(params) {
	return request({
		url: indexUrl + '/getEmployOrder',
		method: 'GET',
		params
	})
}

/* 获取雇佣记录 */
export function getAnnounceList(params) {
	return request({
		url: indexUrl + '/getAnnounceList',
		method: 'GET',
		params
	})
}

/* 获取雇佣记录 */
export function getProgramDetail(params) {
	return request({
		url: indexUrl + '/getProgramDetail',
		method: 'GET',
		params
	})
}

/* 雇佣 余额支付 */
export function employByBalance(params) {
	return request({
		url: indexUrl + '/employByBalance',
		method: 'POST',
		params
	})
}

/* 充值预下单 */
export function preRecharge(params) {
	return request({
		url: indexUrl + '/preRecharge',
		method: 'POST',
		params
	})
}

/* 充值支付回调 */
export function recharge(params) {
	return request({
		url: indexUrl + '/recharge',
		method: 'POST',
		params
	})
}

/* 提币 */
export function withdrawal(params) {
	return request({
		url: indexUrl + '/withdrawal',
		method: 'POST',
		params
	})
}

/* 获取系统配置信息 */
export function getConfig() {
	return request({
		url: indexUrl + '/getConfig',
		method: 'GET'
	})
}

/* 获取累计交易额 */
export function getTransferFee() {
	return request({
		url: indexUrl + '/getTransferFee',
		method: 'GET'
	})
}

/* 获取收益记录 */
export function getIncome(params){
	return request({
		url: indexUrl + '/getIncome',
		method: 'GET',
		params
	})
}

/* 解雇 */
export function fire(params){
	return request({
		url: indexUrl + '/fire',
		method: 'POST',
		params
	})
}