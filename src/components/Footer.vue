<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="footer-container">
      <van-tabbar fixed route v-model="active" active-color="#31C27C" inactive-color="#000">
        <van-tabbar-item to="/news" icon="comment-o">资讯</van-tabbar-item>
        <van-tabbar-item to="/team" icon="gem-o">阵容</van-tabbar-item>
        <van-tabbar-item to="/databoard" icon="chart-trending-o">数据榜</van-tabbar-item>
        <van-tabbar-item to="/infolib" icon="newspaper-o">资料库</van-tabbar-item>
        <van-tabbar-item to="/aboutme" icon="fire-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </van-config-provider>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const themeVars = {
      tabbarHeight: '3.125rem',
      tabbarItemFontSize: '0.75rem',
      tabbarItemIconSize: '1.375rem'
    }
    const active = ref(0)
    return { themeVars, active }
  }
}
</script>

<style lang="less" scoped>
.footer-container {
  width: 100%;
}
</style>
