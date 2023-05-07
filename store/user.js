export default {
	// 开启命名空间
	namespaced:true,
	
	// 数据节点
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address') || "{}")
	}),
	//方法节点
	mutations:{
		
		// 更新地址的方法
		updateAddress(state,address){
			state.address = address;
			this.commit("moduleUser/savaAddressToStorage")
		},
		
		// 持久化存储 address
		savaAddressToStorage(state){
			uni.setStorageSync("address",JSON.stringify(state.address))
		}
	},
	
	// getter
	getters:{
		addstr(state){
			if(!state.address.provinceName) return	""
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}