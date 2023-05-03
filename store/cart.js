export default {
	namespaced:true,
	
	state:()=>({
		cart:JSON.parse(uni.getStorageSync('cart') || '[]') 
	}),
	
	mutations:{
		addToCart(state,goods){
			let findResult = state.cart.find(x => x.goods_id === goods.goods_id);// 说明购物车已经有这件商品了
			if (!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++
			}
			this.commit('moduleCart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		}
		
	},
	
	getters:{
		total(state){
			let count = state.cart.reduce((res,good)=>{
				return res + good.goods_count
			},0);
			return count
		}
	}
}