<template>
    <view class="goods-detail-container">
        <!-- 轮播图区域 -->
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
            <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
                <img :src="item.pics_big" @click="preview(i)" />
            </swiper-item>
        </swiper>

        <!-- 商品信息区域 -->
        <view class="goods-info-box">
            <!-- 商品价格 -->
            <view class="price">{{ goods_info.goods_price }}</view>
            <!-- 商品信息主体区域 -->
            <view class="goods-info-body">
                <!-- 商品名字 -->
                <view class="goods-name">{{ goods_info.goods_name }}</view>
                <!-- 收藏 -->
                <view class="favi">
                    <uni-icons type="star" size="18" color="grey"></uni-icons>
                    <text>收藏</text>
                </view>
            </view>
            <!-- 运费 -->
            <view class="yf">快递:免运费</view>
        </view>
        <!-- 富文本 -->
        <rich-text :nodes="goods_info.goods_introduce"></rich-text>

        <!-- 商品导航组件区域 -->
        <view class="goods-nav">
            <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
        </view>
    </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import cart from '../../store/cart';

export default {
    data() {
        return {
            goods_info: {},

            // 商品导航
            options: [
                {
                    icon: 'shop',
                    text: '店铺',
                    infoBackgroundColor: '#007aff',
                    infoColor: 'red'
                },
                {
                    icon: 'cart',
                    text: '购物车',
                    info: 0
                }
            ],
            buttonGroup: [
                {
                    text: '加入购物车',
                    backgroundColor: '#ff0000',
                    color: '#fff'
                },
                {
                    text: '立即购买',
                    backgroundColor: '#ffa200',
                    color: '#fff'
                }
            ]
        };
    },
    computed: {
        ...mapState('moduleCart', ['cart']),
        ...mapGetters('moduleCart', ['total'])
    },
    watch: {
        // total(newValue){
        // 	let findResult = this.options.find(x=>x.text ==='购物车');
        // 	if (findResult){
        // 		findResult.info = newValue
        // 	}
        // }
        total: {
            handler(newValue) {
                let findResult = this.options.find((x) => x.text === '购物车');
                if (findResult) {
                    findResult.info = newValue;
                }
            },
            immediate: true
        }
    },
    methods: {
        async getGoodsDetail(goods_id) {
            let { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id: goods_id });
            if (res.meta.status !== 200) {
                return uni.$showMsg('请求失败！');
            } else {
                res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, "<img style='display:block;'");

                this.goods_info = res.message;
            }
        },
        preview(i) {
            uni.previewImage({
                current: i,
                urls: this.goods_info.pics.map((x) => x.pics_big)
            });
        },
        // 左侧按钮的事件
        onClick(e) {
            if (e.content.text === '购物车') {
                uni.switchTab({
                    url: '/pages/cart/cart'
                });
            }
        },
        ...mapMutations('moduleCart', ['addToCart']),
        buttonClick(e) {
            if (e.content.text === '加入购物车') {
                let goods = {
                    goods_id: this.goods_info.goods_id,
                    goods_name: this.goods_info.goods_name,
                    goods_price: this.goods_info.goods_price,
                    goods_count: 1,
                    goods_small_logo: this.goods_info.goods_small_logo,
                    goods_state: true
                };
                this.addToCart(goods);
            }
        }
    },
    onLoad(options) {
        let goods_id = options.goods_id;
        this.getGoodsDetail(goods_id);
    }
};
</script>

<style lang="scss">
swiper {
    height: 750rpx;
    image {
        height: 100%;
        width: 100%;
    }
}

.goods-info-box {
    padding: 10px;
    padding-right: 0px;
    .price {
        color: #c00000;
        font-size: 18px;
        margin: 10px 0;
        &::before {
            content: '￥';
        }
    }
    .goods-info-body {
        display: flex;
        justify-content: space-between;
        .goods-name {
            flex: 4;
            margin-right: 4px;
        }
        .favi {
            flex: 1;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-left: 1px solid #efefef;
            color: grey;
        }
    }
    .yf {
        font-size: 12px;
        color: gray;
        margin: 10px 0;
    }
}
.goods-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
.goods-detail-container {
    padding-bottom: 50px;
}
</style>
