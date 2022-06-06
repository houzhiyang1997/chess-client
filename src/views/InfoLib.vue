<template>
  <div class="infolib-container">
    <!-- 头部导航 -->
    <div class="top">
      <van-tabs v-model:active="active" color="#28C281">
        <van-tab title="英雄" to="/infolib/chess"></van-tab>
        <van-tab title="装备" to="/infolib/equipment"></van-tab>
        <van-tab title="羁绊" to="/infolib/race"></van-tab>
        <van-tab title="海克斯" to="/infolib/hex"></van-tab>
        <van-tab title="小小英雄" to="/infolib/smallhero"></van-tab>
      </van-tabs>
    </div>
    <!-- 子视图 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from 'vue'
// import { useRoute } from 'vue-router'
export default {
  setup() {
    const active = ref(0)
    return {
      active
    }
  }
}
</script>

<style lang="less" scoped>
.infolib-container {
  .top {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2022;
  }
}
</style>
