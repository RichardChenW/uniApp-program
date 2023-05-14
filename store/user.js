export default {
	// 开启命名空间
	namespaced: true,

	// 数据节点
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || "{}"),
		token: uni.getStorageSync('token') || "{}",
		// 用户的信息对象
		userInfo: JSON.parse(uni.getStorageSync("userInfo") || "{}"),
		// 重定向 object
		redirectInfo: null
	}),
	//方法节点
	mutations: {

		// 更新地址的方法
		updateAddress(state, address) {
			state.address = address;
			this.commit("moduleUser/savaAddressToStorage")
		},

		// 持久化存储 address
		savaAddressToStorage(state) {
			uni.setStorageSync("address", JSON.stringify(state.address))
		},

		// 更新用户信息
		updateUserInfo(state, userInfo) {
			state.userInfo = userInfo
			this.commit("moduleUser/saveUserInfoStorage")
		},
		saveUserInfoStorage(state) {
			uni.setStorageSync("userInfo", JSON.stringify(state.userInfo))
		},
		updateToken(state, token) {
			state.token = token
			this.commit("moduleUser/saveTokenToStorage")
		},
		saveTokenToStorage(state) {
			uni.setStorageSync("token", state.token)
		},
		updateRedirectInfo(state, info) {
			state.redirectInfo = info;
			console.log(state.redirectInfo)
		}
	},

	// getter
	getters: {
		addstr(state) {
			if (!state.address.provinceName) return ""
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	}
}