<template>
  <view>
    <view class="scroll-view-container">
		<!-- 左侧的滑动区域 -->
		<scroll-view
			scroll-y="true"
			:style="{height:windowHeight+'px'}"
			class="left-scroll-view"
		>
			<view 
				v-for="each in 50" 
				class= "left-scroll-view-item active"
				:key="each"
			>
				{{each}}
			</view>
		</scroll-view>
		
		<!-- 右侧滑动区域 -->
		<scroll-view
			scroll-y="true"
			:style="{height:windowHeight+'px'}"
		>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
			<view>yyy</view>
		</scroll-view>
	</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        windowHeight:0 // 当前设备可用高度
      }
    },
    methods: {
      
    },
	async onLoad() {
		let sysInfo =  await uni.getSystemInfo(); // 拿到设备信息
		this.windowHeight = sysInfo.windowHeight
	}
  }
</script>

<style lang="scss">
	.scroll-view-container{
		display: flex;
	}
	.left-scroll-view{
		width: 120px;
		.left-scroll-view-item{
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			&.active{
				background-color: skyblue;
				position: relative;
				&::before{
					content: " ";
					display: block;
					width: 3px;
					height: 30px;
					background-color: red;
					position: absolute;
					top:50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
</style>
