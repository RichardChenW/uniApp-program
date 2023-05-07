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
		},
		
		// 全选按钮更新所有购物车的状态
		updateAllGoodState(state,newState){
			state.cart.forEach(x =>{
				x.goods_state = newState
			});
			this.commit("moduleCart/saveToStorage");
		},
	},
	
	getters:{
		
		total(state){
			let count = state.cart.reduce((res,good)=>{
				return res + good.goods_count
			},0);
			return count
		},
		
		// 计算勾选商品所有数量
		checkedCount(state){
			return state.cart.filter(x=>x.goods_state).reduce((res,good)=>{
				return res + good.goods_count
			},0)
		},
		
		// 计算勾选商品品类数量
		checkedNumber(state){
			let selected = state.cart.filter(x=>x.goods_state);
			let count = 0;
			for (let each in selected){
				count++;
			};
			return count
		},
		
		// 计算商品总价格
		checkTotalPrice(state){
			let selected = state.cart.filter(x=>x.goods_state);
			let totalPrice = selected.reduce((res,each)=>{
				return res + each.goods_price*each.goods_count
			},0);
			return totalPrice.toFixed(2)
		}
	}
}