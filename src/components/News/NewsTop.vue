<template>
  <div class="top-container">
    <div class="main">
      <van-search
        class="search"
        clearable
        shape="round"
        background="rgba(0,0,0,0)"
        v-model="value"
        placeholder="兴趣内容"
      />
      <div class="title">最新资讯</div>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    // 双向绑定查询框中的值
    const value = ref('')
    return { value }
  }
}
</script>

<style lang="less" scoped>
.top-container {
  width: 100%;
  height: 3rem;
  position: fixed;
  top: 0;
  left: 0;
  .main {
    display: flex;
    align-items: center;
    .search {
      width: 15rem;
    }
    .title {
      padding: 0 0.625rem;
      font-size: 1.25rem;
      color: white;
      font-weight: 600;
    }
  }
  .bg {
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    height: 3rem;
    width: 100%;
    background: #31c27c;
    border-bottom-left-radius: 0.625rem;
    border-bottom-right-radius: 0.625rem;
  }
}
</style>
