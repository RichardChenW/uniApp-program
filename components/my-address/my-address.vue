<template>
	<view>
		<!-- 选择收货地址的盒子 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button 
				type="primary" 
				size="mini" 
				class="btn-choose-address"
				@click="addressChoose"
			>请选择收货地址+</button>
		</view>
		
		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box" v-else @click="addressChoose">
			<view class="row1">
				<view class="row1-left">
					<view class="user-name">
						收货人：{{address.userName}}
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：{{address.telNumber}}
					</view>
					<uni-icons type="forward" size="15"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址：
				</view>
				<view class="row2-right">
					{{addstr}}
				</view>
			</view>
		</view>
		
		<!-- 底部的边框线 -->
		<view class="address-border"></view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from "vuex";
	
	
	export default {
		name:"my-address",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations("moduleUser",["updateAddress"]),
			async addressChoose(){
				// 获取到地址
				let res = await uni.chooseAddress();
				this.updateAddress(res);
			},
		},
		computed:{
			...mapState("moduleUser",["address"]),
			...mapGetters("moduleUser",["addstr"])
		}
	}
</script>

<style lang="scss">
	.address-choose-box {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 150px;
	}
	
	.address-info-box {
		height: 90px;
		font-size: 12px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;
		.row1 {
			display: flex;
			justify-content: space-between;
			.row1-right {
				display: flex;
			}
		}
		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;
			.row2-left {
				white-space: nowrap;
			}
		}
	}
	
	.address-border {
		background-image: linear-gradient(to right, red, skyblue);
		height: 15px;
	}
</style>