<template>
  <!-- 使用时间戳作为随机值 产生动态key 解决同路由内点击不跳转刷新页面 -->
  <chess-info :key="Date.now()"></chess-info>
</template>

<script>
import chessInfo from '@/views/Team/ChessInfo.vue'
export default {
  components: {
    chessInfo
  }
}
</script>

<style></style>
