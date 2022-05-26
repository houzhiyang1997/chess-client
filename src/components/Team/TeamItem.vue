<template>
  <div class="teamitem-container">
    <div class="title">{{ info.title }}</div>
    <div class="main">
      <!-- imgList中元素格式为类似 400.png -->
      <img
        :src="'https://game.gtimg.cn/images/lol/act/img/tft/champions/' + item"
        v-for="(item, index) in info.imgList.split(',')"
        :key="index"
        @click="handleClickImg(index)"
      />
    </div>
    <div class="info">
      <div class="good">点赞数:{{ info.goods }}</div>
      <div class="hard">
        <div>成型难度</div>
        <van-rate v-model="hardValue" readonly size="1rem" color="#ffd21e" />
      </div>
      <div class="author">{{ info.author }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'teamItem',
  props: ['info'],
  setup(props) {
    const router = useRouter()
    // 成型难度
    const hardValue = ref(props.info.hard)
    // 对应team表 chessList 也就是棋子们对应的id
    const chessList = props.info.chessList.split(',')
    const handleClickImg = index => {
      // 跳转到棋子详情页，index是当前图片的index，因为与chessList一一对应，所以可以拿到对应的id
      router.push(`/chessinforefresh/${chessList[index]}`)
    }

    return { hardValue, handleClickImg }
  }
}
</script>

<style lang="less" scoped>
.teamitem-container {
  width: 100%;
  overflow: hidden;
  padding: 0.3125rem 0;
  .title {
    font-size: 1rem;
  }
  .main {
    display: flex;
    overflow: hidden;
    padding: 0.625rem 0;
    img {
      width: 2.5rem;
      padding-right: 0.3125rem;
    }
  }
  .info {
    display: flex;
    height: 1.875rem;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    .hard {
      padding-left: 0.625rem;
      display: flex;
      align-items: center;
      flex: 1;
    }
  }
}
</style>
