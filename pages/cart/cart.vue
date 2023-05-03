<template>
  <view>
    我是购物车页面{{total}}
  </view>
</template>

<script>
	import tabbarBadge from '@/mixins/tabbar-badge.js'
	
  export default {
    data() {
      return {
        
      }
    },
		mixins:[tabbarBadge]
  }
</script>

<style>

</style>
