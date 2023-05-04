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
		},
		// 更新购物车中商品的勾选状态
		updateGoodsState(state,goods){
			let findRes = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findRes){
				findRes.goods_state = goods.goods_state
				this.commit("moduleCart/saveToStorage")
			}
			
		},
		// 更新购物车的数量
		updateGoodsCount(state,goods){
			let findRes = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findRes){
				findRes.goods_count = goods.goods_count
				this.commit("moduleCart/saveToStorage")
			}
		},
		// 删除购物车
		removeGoodsById(state,goods){
			state.cart = state.cart.filter(x=> x.goods_id !==goods.goods_id)
			this.commit("moduleCart/saveToStorage")
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