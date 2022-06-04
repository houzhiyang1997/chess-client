<template>
  <van-popup v-model:show="show" @closed="closePop" round position="bottom">
    <div class="pop-container">
      <div class="left">
        <img :src="info.imgUrl" />
      </div>
      <div class="right">
        <div class="title">{{ info.name }}</div>
        <div class="content">{{ info.description }}</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
  name: 'popDetail',
  props: ['info'],
  emits: ['closePop'],
  setup(props, { emit }) {
    onMounted(() => {
      show.value = true
    })
    const show = ref(false)
    const closePop = () => {
      emit('closePop')
    }
    return {
      show,
      closePop
    }
  }
}
</script>

<style lang="less" scoped>
.pop-container {
  padding: 0.625rem 1.25rem;
  display: flex;
  .left {
    margin-right: 1rem;
    img {
      width: 4rem;
    }
  }
  .right {
    font-size: 1rem;
    font-weight: 600;
    .content {
      margin-top: 0.3125rem;
      margin-bottom: 1rem;
      white-space: pre-wrap;
      text-align: justify; //两端对齐
    }
  }
}
</style>
