<template>
		<view class="good-item">
			<!-- 左侧的盒子 -->
			<view class="goods-item-left">
				<radio :checked="good.goods_state" color="#C00000" v-if="showRadio" @click="emitRadioChange"/>
				<image :src="good.goods_small_logo || defaultPic" mode="" class="goods-pic"></image>
			</view>
			<!-- 右侧的盒子 -->
			<view class="goods-item-right">
				<!-- 商品的名字 -->
				<view class="goods-name">{{good.goods_name}}</view>
				<view class="goods-info-box">
					<view class="goods-price">￥{{good.goods_price | toFixed}}</view>
					<uni-number-box :min="1" :value="good.goods_count" v-if="showNumberBox" @change="numChangeHandler"></uni-number-box>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			good:{
				type:Object,
				default:{}
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			showNumberBox:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			}
		},
		methods:{
			emitRadioChange(){
				this.$emit("radioChange",{
					goods_id:this.good.goods_id,
					goods_state:!this.good.goods_state
				})
			},
			numChangeHandler(newValue){
				this.$emit("numChange",{
					goods_id:this.good.goods_id,
					goods_count:newValue
				})
			}
		}
	}
</script>

<style lang="scss">
.good-item {
		display: flex;
		padding:10px 5px;
		border-bottom: 1px solid #f0f0f0;
		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods-item-right {
			display: flex;
			flex:1;
			flex-direction: column;
			justify-content: space-between;
			.goods-name {
				font-size: 13px;
			}
			.goods-info-box {
				display: flex;
				justify-content: space-between;
				.goods-price {
					color:#C00000;
					font-size: 16px;
				}
			}
		}
	}
</style>