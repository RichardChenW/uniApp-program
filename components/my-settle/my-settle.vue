<template>
	<view class="my-settle-conatiner">
		<!-- 全选区域 -->
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullCheck" /><text> 全选</text>
		</label>
		<!-- 合计区域 -->
		<view class="amount-box">
			<text class="amount">合计：￥{{checkTotalPrice}}</text>
		</view>
		<!-- 结算区域 -->
		<view class="btn-settle" @click="settlement">
			结算（{{checkedCount}}）
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from "vuex";


	export default {
		name: "my-settle",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations("moduleCart", ["updateAllGoodState"]),
			changeAllState() {
				this.updateAllGoodState(!this.isFullCheck)
			},
			// 用户勾选结算按钮
			settlement() {
				if (!this.checkedCount) {
					return uni.$showMsg("请选择要结算的商品!")
				} else if (!this.addstr) {
					return uni.$showMsg("请选择收货地址!")
				} else if (!this.token) {
					return uni.$showMsg("请先登录!")
				}
			}
		},
		computed: {
			...mapState("moduleCart", ["cart"]),
			...mapGetters("moduleCart", ["checkedCount", "checkedNumber", "checkTotalPrice"]),
			...mapGetters("moduleUser", ["addstr"]),
			...mapState("moduleUser", ["token"]),
			isFullCheck() {
				return this.cart.length === this.checkedNumber;
			}
		},
	}
</script>

<style lang="scss">
	.my-settle-conatiner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		z-index: 999;
		background-color: white;
		font-size: 14px;
		padding-left: 10px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: red;
				font-weight: 700;
			}
		}

		.btn-settle {
			height: 100%;
			background-color: #C00000;
			line-height: 50px;
			color: white;
			padding: 0 15px;
			min-width: 100px;
			text-align: center;
		}
	}
</style>