import {
	getUserinfo
} from "@/common/api.js"
export default {
	data() {
		return {
			userInfo: {
				address: '',
				user_id: '',
				level: 0,
				usdt_balance: 0,
				total_profit: 0, //总收益
				team_profit: 0, //团队收益
				recommend_profit: 0 //推荐收益
			},
		}
	},
	methods: {
		getUser() {
			getUserinfo().then(res => {
				this.userInfo = res.data;
				this.userInfo.address = this.userInfo.address.substr(0, 6) + '*****' + this.userInfo.address
					.substr(-5, this.userInfo.address.length)
			}).catch(err => {
				console.log(err);
			})
		},
	},
	// mounted() {
	// },
	onShow() {
		this.getUser()
	}
}
