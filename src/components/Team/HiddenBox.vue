<template>
  <div class="box-container" ref="hiddenbox" style="height: 0">
    <div class="title">{{ title }}</div>
    <div class="content">{{ content }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'hiddenBox',
  props: ['title', 'content'],
  setup() {
    const hiddenbox = ref()
    return { hiddenbox }
  }
}
</script>

<style lang="less" scoped>
.box-container {
  background: rgba(214, 209, 209, 0.3);
  overflow: hidden;
  padding: 0 1.25rem;
  .title {
    margin-top: 10px;
    font-size: 1.25rem;
    font-weight: 600;
  }
  .content {
    margin-top: 0.3125rem;
    margin-bottom: 1rem;
    white-space: pre-wrap;
    text-align: justify; //两端对齐
    font-size: 14px;
  }
}
</style>
