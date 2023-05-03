<template>
  <view>
    <!-- 商品标题区域 -->
		<view class="cart-title">
			<!-- 左侧标题 -->
			<uni-icons type="cart" size="30"></uni-icons>
			<!-- 右侧文本 -->
			<view class="cart-title-text">购物车</view>
		</view>
		
		<!-- 循环渲染购物车中的商品信息 -->
		<view v-if="cart.length === 0">没有数据</view>
		<block v-for='(good,i) in cart' :key="i" v-else>
			<my-goods :good="good"></my-goods>
		</block>
  </view>
</template>

<script>
	import tabbarBadge from '@/mixins/tabbar-badge.js';
	import { mapState } from 'vuex'
	
  export default {
		mixins:[tabbarBadge],
		computed:{
			...mapState('moduleCart',['cart'])
		},
		
    data() {
      return {
        
      }
    },
		
  }
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #EFEFEF;
		
		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;
		}
	}
</style>
