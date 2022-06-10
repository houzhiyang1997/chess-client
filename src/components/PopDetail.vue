<template>
  <van-popup v-model:show="show" @closed="closePop" round position="bottom">
    <div class="pop-container">
      <div class="top">
        <div class="left">
          <img :src="info.imgUrl" />
        </div>
        <div class="right">
          <div class="title">{{ info.name }}</div>
          <div class="content">{{ info.description }}</div>
        </div>
      </div>
      <div class="bottom" v-if="info.formula && info.formula.length !== 0">
        <div class="title">合成路径</div>
        <div class="main">
          <img :src="info.formula[0].imagePath" />
          <div class="between">+</div>
          <img :src="info.formula.length === 1 ? info.formula[0].imagePath : info.formula[1].imagePath" />
          <div class="between">=</div>
          <img :src="info.imgUrl" />
        </div>
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
  .top {
    display: flex;
    .left {
      margin-right: 1rem;
      img {
        width: 4rem;
        border-radius: 1rem;
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
  .bottom {
    .title {
      font-size: 1rem;
      font-weight: 600;
    }
    .main {
      margin-top: 0.625rem;
      display: flex;
      align-items: center;
      .between {
        margin: 0 1rem;
        font-size: 1.25rem;
        font-weight: 600;
      }
      img {
        width: 2.5rem;
        border-radius: 0.5rem;
      }
    }
  }
}
</style>
