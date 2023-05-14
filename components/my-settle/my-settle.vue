<template>
  <view class="my-settle-conatiner">
    <!-- 全选区域 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck" />
      <text>全选</text>
    </label>
    <!-- 合计区域 -->
    <view class="amount-box">
      <text class="amount">合计：￥{{ checkTotalPrice }}</text>
    </view>
    <!-- 结算区域 -->
    <view class="btn-settle" @click="settlement">结算（{{ checkedCount }}）</view>
  </view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'my-settle',
  data() {
    return {
      // 倒计时秒数
      seconds: 3,
      timer: null
    };
  },
  methods: {
    ...mapMutations('moduleCart', ['updateAllGoodState']),
	...mapMutations('moduleUser',['updateRedirectInfo']),
    changeAllState() {
      this.updateAllGoodState(!this.isFullCheck);
    },
    // 用户勾选结算按钮
    settlement() {
      if (!this.checkedCount) {
        return uni.$showMsg('请选择要结算的商品!');
      } else if (!this.addstr) {
        return uni.$showMsg('请选择收货地址!');
      } else if (this.token.toString() === '{}') {
        return this.delayNavigate();
      }
    },
    // 延时导航到 my 页面
    delayNavigate() {
      this.seconds = 3;
      this.timer = setInterval(() => {
        if (this.seconds > 0) {
          this.showTips(this.seconds);
          this.seconds--;
        } else {
          clearInterval(this.timer);

          uni.switchTab({
            url: '/pages/my/my',
			success:()=>{
				this.updateRedirectInfo({
					openType:"switchTab",
					from:"/pages/cart/cart"
				})
			}
          });
        }
      }, 1000);
    },
    // 展示倒计时的提示消息
    showTips(n) {
      uni.showToast({
        icon: 'none',
        title: `请登录后再结算！${n}秒之后自动登录`,
        mask: true, // 防止穿透
        duration: 1500 // 1.5 秒之后自动消失弹窗
      });
    }
  },
  computed: {
    ...mapState('moduleCart', ['cart']),
    ...mapGetters('moduleCart', ['checkedCount', 'checkedNumber', 'checkTotalPrice']),
    ...mapGetters('moduleUser', ['addstr']),
    ...mapState('moduleUser', ['token']),
    isFullCheck() {
      return this.cart.length === this.checkedNumber;
    }
  }
};
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
    background-color: #c00000;
    line-height: 50px;
    color: white;
    padding: 0 15px;
    min-width: 100px;
    text-align: center;
  }
}
</style>
