<template>
  <view>
    <!-- 搜索组件 -->
    <view class="search-box">
      <my-search @myClick="gotoSearch"></my-search>
    </view>
    <!-- 1. 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList.message" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 2. 导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList.message" :key="i" @click="navClickHandle(item.name)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 3. 楼层区域 -->
    <view class="floor-list">
      <!-- 3.1 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 3.2 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }" mode="widthFix"></image>
          </navigator>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, i2) in item.product_list.slice(1)" :key="i2" :url="item2.url">
              <image :src="item2.image_src" mode="widthFix" :style="{ width: item2.image_width + 'rpx' }"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import tabbarBadgeMix from '@/mixins/tabbar-badge.js';

export default {
  mixins: [tabbarBadgeMix],

  data() {
    return {
      //1. 设置轮播图的数据列表
      swiperList: [],

      //2. 设置分类导航栏数据列表
      navList: [],

      //3. 设置获取楼层数据
      floorList: []
    };
  },
  methods: {
    // 1. 设置请求轮播图的方法
    async getSwiperList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata');
      // 如果数据请求失败，弹窗
      if (res.meta.status !== 200) {
        return uni.$showMsg();
      }
      this.swiperList = res;
    },

    // 2. 设置请求分类导航的方法
    async getNavList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/catitems');
      // 如果数据请求失败，弹窗
      if (res.meta.status !== 200) {
        return uni.$showMsg();
      }
      this.navList = res;
    },

    // 3. 设置点击切换按钮到指定页面
    navClickHandle(pageName) {
      if (pageName === '分类') {
        uni.switchTab({
          url: '/pages/cat/cat'
        });
      }
    },

    // 4. 获取首页楼层数据
    async getFloorList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/floordata');
      // 如果数据请求失败，弹窗
      if (res.meta.status !== 200) {
        return uni.$showMsg();
      }

      // 4.1 对数据进行处理，因为返回的数据路径和本地的不一样
      res.message.forEach((floor) => {
        floor.product_list.forEach((prod) => {
          prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1];
        });
      });
      this.floorList = res.message;
    },

    // 去搜索页面
    gotoSearch() {
      uni.navigateTo({
        url: '/subpkg/search/search'
      });
    }
  },
  onLoad() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  }
};
</script>

<style lang="scss">
// 1. 轮播图样式
swiper {
  height: 330rpx;

  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}

//2. 导航栏样式
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}

//3. 楼层标题
.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}

//4. 楼层图片
.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}

.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
