<template>
  <div class="box-container" ref="content" style="height: 0">
    <div>这是隐藏内容</div>
    <div>这是隐藏内容</div>
    <div>这是隐藏内容</div>
    <div>这是隐藏内容</div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'hiddenBox',
  setup() {
    const content = ref()
    return { content }
  }
}
</script>

<style lang="less" scoped>
.box-container {
  background: rgba(214, 209, 209, 0.3);
  overflow: hidden;
}
</style>
