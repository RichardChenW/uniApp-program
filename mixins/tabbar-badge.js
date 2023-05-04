import {
	mapGetters
} from 'vuex';


export default {
	computed: {
		...mapGetters('moduleCart', ['total'])
	},
	watch: {
		total: {
			immediate: true,
			handler(newValue, oldValue) {
				uni.setTabBarBadge({
					index: 2, // 设置 tabbar 的索引 
					text: this.total.toString() // 徽标的内容必须是字符串
				})
			}
		}
	},
	methods: {
		setBage() {
			uni.setTabBarBadge({
				index: 2, // 设置 tabbar 的索引 
				text: this.total.toString() // 徽标的内容必须是字符串
			})
		}
	},
	onShow() {
		this.setBage()
	}
}