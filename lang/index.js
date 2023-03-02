import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from './en.js'
import zhLocale from './zh.js'
import {
	getLanguage
} from '@/utils/auth.js'
Vue.use(VueI18n)

const locale = getLanguage() || 'en'; // 默认语言

console.log(locale);

const messages = {
	en: {
		...enLocale,
	},
	zh: {
		...zhLocale,
	}
}

const i18n = new VueI18n({
	locale, // 设置地区
	messages, // 设置地区信息
})

export default i18n
