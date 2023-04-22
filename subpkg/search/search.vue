<template>
	<view>
		<!-- 搜索栏 -->
		<view class="search-box">
			<uni-search-bar radius="20" placeholder="请输入显示内容" @input="input"  cancelButton="none"/>
		</view>
		<!-- 搜索建议列表 -->		
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="forward" size="20"></uni-icons>
			</view>
		</view>
		<!-- 历史记录 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="20" @click="clearHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list" >
				<uni-tag @click="gotoGoodsList(item)" :text="item" v-for="(item,index) in historyList" :key="index"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 防抖处理
				timer:null,
				keyword:"",
				// 搜索的结果列表
				searchResults:[],
				// 历史记录假数据
				historyList:[],
				titleShow:true
			};
		},
		methods:{
			async getSearchList(){
				// 判断搜索是否为空
				if(this.keyword.length === 0 ){
					this.searchResults = [];
					return;
				};
				// 不为空，发送请求
				const {data:res} = await uni.$http.get("/api/public/v1/goods/qsearch",{query:this.keyword});
				if(res.meta.status !== 200) {
					return uni.$showMsg();
				}else{
					this.searchResults = res.message;
				}
				this.saveSearchHistory(this.keyword);
			},
			input(e){
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					this.keyword = e;
					this.getSearchList();
				},500);
	
			},
			gotoDetail(item){
				uni.navigateTo({
					url:"/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
				})
			},
			clearHistory(){
				this.historyList = [];
				uni.removeStorageSync("historyList");
			},
			saveSearchHistory(keyword){
				let set = new Set(this.historyList);
				if(set.has(keyword)) return;
				else{
					this.historyList.unshift(keyword);
					uni.setStorageSync("historyList",JSON.stringify(this.historyList));
				}
			},
			gotoGoodsList(item){
				uni.navigateTo({
					url:"/subpkg/goods_list/goods_list?query=" + item 
					// url:"/subpkg/goods_list/goods_list"
				})
			}
		},
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageSync("historyList") || "[]");
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.sugg-list {
		padding: 0 5px;
		.sugg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			border-bottom:1px solid #efefef ;
			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
	.history-box {
		.history-title{
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #efefef;
			padding: 10px 15px;
			text {
				font-size: 14px;
				font-weight: 450;
			}
		}
		.history-list{
			display: flex;
			flex-wrap: wrap;
			.uni-tag {
				&:first-child{
					margin-left: 5px;
				}
				margin-top: 10px;
				margin-right: 10px;
				background-color: #efefef;
				color: black;
			}
		}
	}
</style>