<template>
	<view>
		<!-- 搜索部分 -->
		<view class="search-box">
			<my-search @myClick="gotoSearch"></my-search>
		</view>
		<view class="scroll-view-container">
			<!-- 左侧的滑动区域 -->
			<scroll-view scroll-y="true" :style="{height:windowHeight+'px'}" class="left-scroll-view">
				<block v-for="(each,index) in cateList" :key="index">
					<view :class="['left-scroll-view-item',index === active?'active':'']" @click="changeActive(index)">
						{{each.cat_name}}
					</view>
				</block>
			</scroll-view>

			<!-- 右侧滑动区域 -->
			<scroll-view scroll-y="true" :scroll-top="scrollTop" :style="{height:windowHeight+'px'}">

				<view v-for="(item2,index2) in cateLevel2" :key="index2">
					<!-- 二级分类标题 -->
					<view class="cate-level2-title">{{item2.cat_name}}</view>
					<!-- 三级分类列表-->
					<view class="cate-level3-list">
						<view v-for="(item3,index3) in item2.children" class="cate-lv3-item"
							@click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon.replace('dev','web')" mode="aspectFill"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import tabbarBadgeMix from '@/mixins/tabbar-badge.js'
	
	
	export default {
		mixins:[tabbarBadgeMix],
		data() {
			return {
				windowHeight: 0, // 当前设备可用高度
				cateList: [],
				active: 0,
				cateLevel2: [], // 二级分类
				scrollTop: 0,
			}
		},
		methods: {

			// 定义获取 catelist 的方法
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories');
				this.cateList = res.message;
				this.cateLevel2 = this.cateList[0].children;
			},

			changeActive(index) {

				this.active = index;

				this.cateLevel2 = this.cateList[index].children;

				this.scrollTop = this.scrollTop === 0 ? 1 : 0;
			},
			
			// 搜索栏自定义事件
			gotoSearch(){
				uni.navigateTo({
					url:"/subpkg/search/search"
				})
			},

			// 定义跳转三级分类的函数
			gotoGoodsList(item3) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
				})
			}
		},

		async onLoad() {

			let sysInfo = await uni.getSystemInfo(); // 拿到设备信息
			this.windowHeight = sysInfo.windowHeight - 50;

			this.getCateList();
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;
	}

	.left-scroll-view {
		width: 120px;
		background-color: #f7f7f7;

		.left-scroll-view-item {
			line-height: 60px;
			text-align: center;
			font-size: 12px;

			&.active {
				position: relative;

				&::before {
					content: " ";
					display: block;
					width: 3px;
					height: 30px;
					background-color: red;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}

	.cate-level2-title {
		font-size: 15px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;

	}

	.cate-level3-list {
		--main-weight: 700;
		display: flex;
		flex-wrap: wrap;
		border-bottom: 1px solid grey;
		padding-bottom: 10px;

		.cate-lv3-item {
			display: flex;
			flex-direction: column;
			width: 33.33%;
			align-items: center;
			margin-bottom: 10px;

			image {
				width: 60px;
				height: 60px;
			}

			text {
				font-size: 12px;
				font-weight: var(--main-weight);
			}
		}
	}
</style>