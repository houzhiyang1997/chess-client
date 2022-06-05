<template>
  <router-view></router-view>
  <!-- 底部导航栏 -->
  <Footer v-if="store.state.isFooterShow"></Footer>
</template>

<script>
import Footer from '@/components/Footer.vue'
import { useStore } from 'vuex'
export default {
  name: 'myApp',
  components: { Footer },
  setup() {
    const store = useStore()
    return { store }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  // font-family: 'Microsoft YaHe';
  box-sizing: border-box;
}

html,
body {
  width: 100%;
}
</style>
