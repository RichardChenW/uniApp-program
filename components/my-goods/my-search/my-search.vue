<template>
	<view class="my-search-container" :style="{'background-color':bgColor}" @click="searchBoxHandler">
		<!-- 使用 view 组件模拟 input 输入框的样式 -->
		<view class="my-search-box" :style="{'border-radius':radius+'px'}">
			<!-- 使用 uni-ui 的图标组件 -->
			<uni-icons type="search" size="30"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props:{
			// 背景颜色
			bgColor:{
				type:String,
				default:"#C00000"
			},
			// 圆角尺寸
			radius:{
				type:Number,
				default:18 
			},
		},
		data() {
			return {

			};
		},
		methods:{
			searchBoxHandler(){
				console.log("searchBoxHandler!")
				this.$emit("myClick");
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		height: 50px;
		display: flex;
		align-items: center;
		.my-search-box{
			height: 37px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: white;
			margin: 0 15px;
			.placeholder{
				font-size: 15px;
				line-height: 50px;
			}
		}
	}
</style>