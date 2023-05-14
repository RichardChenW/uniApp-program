<template>
  <view class="my-container">
    <my-login v-if="token === '{}'"></my-login>
    <my-userInfo v-else></my-userInfo>
  </view>
</template>

<script>
import tabbarBadgeMix from '@/mixins/tabbar-badge.js';
import { mapState } from 'vuex';

export default {
  mixins: [tabbarBadgeMix],

  data() {
    return {};
  },
  methods: {
  },
  computed: {
    ...mapState('moduleUser', ['token'])
  }
}

</script>

<style lang="scss">
.my-container {
	height: 100vh;
}
</style>
