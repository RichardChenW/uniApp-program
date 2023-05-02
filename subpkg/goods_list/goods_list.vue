<template>
    <view class="goods-list">
      <view v-for="(good,i) in goodsList" :key="i" @click="gotoDetail(good)">
				<my-goods :good="good"></my-goods>
			</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
							// 请求参数对象
              queryObj:{
								query:"",
								cid:"",
								pageNum:1,// 默认读取一页数据
								pageSize:10, // 默认读取 10 条数据
							},
							goodsList:[],
							total:0,
							// 节流阀
							isloading:false
            };
        },
				methods:{
					// 获取商品列表数据
					async getGoodList(cb){
						
						cb&&cb();
						
						this.isloading = true;// 打开节流阀
						let {data:res} = await uni.$http.get("/api/public/v1/goods/search",this.queryObj);
						this.isloading = false;// 关闭节流阀
						if(res.meta.status !== 200){
							return uni.$showMsg()
						}
						
						this.goodsList = [...this.goodsList,...res.message.goods];
						this.total = res.message.total;
					},
					gotoDetail(good){
						uni.navigateTo({
							url:"/subpkg/goods_detail/goods_detail?goods_id=" + good.goods_id
						})
					}
				},
				onLoad(options){
					// 这里的 options 是query ? 传进来的参数
					this.query = options.query || "";
					this.queryObj.cid = options.cid || "";
					
					this.getGoodList();
					
				},
				onReachBottom(){
					
					// 获取的数据小于总页数
					if(this.queryObj.pageNum * this.queryObj.pageSize >= this.total){
						return uni.$showMsg("数据已经加载完啦😂")
					}
					// 下拉触底之后执行的函数
					
					if(this.isloading) return
					
					// 让页码值自增+1
					this.queryObj.pageNum++
					this.getGoodList()
				},
				onPullDownRefresh(){
					// 重置关键数据
					 this.queryObj.pageNum = 1;
					 this.total = 0;
					 this.isloading = false;
					 this.goodsList = [];
					 
					//重新发送数据请求
					this.getGoodList(()=> uni.stopPullDownRefresh())
				}
    }
</script>

<style lang="scss">
	
</style>
