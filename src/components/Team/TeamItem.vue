<template>
  <div class="teamitem-container">
    <div class="title" @click="handleClickTitle(info.teamId)">
      <div class="title-main">{{ info.title }}</div>
      <div class="title-arrow" v-if="top">详情<i class="iconfont icon-youjiantou1"></i></div>
      <div v-else class="title-label" :style="info.label === '新手推荐' ? 'background:#F8DCBF' : ''">
        {{ info.label }}
      </div>
    </div>
    <div class="main">
      <!-- imgList中元素格式为类似 400.png -->
      <img
        :src="'https://game.gtimg.cn/images/lol/act/img/tft/champions/' + item"
        v-for="(item, index) in info.imgList.split(',')"
        :key="index"
        @click="handleClickImg(index)"
      />
    </div>
    <div class="info" v-if="foot">
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
  props: ['info', 'top', 'foot'],
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

    const handleClickTitle = teamId => {
      router.push(`/teamdetail/${teamId}`)
    }

    return { hardValue, handleClickImg, handleClickTitle }
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-main {
      flex: 5;
      -webkit-line-clamp: 1; //（用来限制在一个块元素显示的文本的行数，2 表示最多显示 2 行。为了实现该效果，它需要组合其他的 WebKit 属性）
      display: -webkit-box; //（和 1 结合使用，将对象作为弹性伸缩盒子模型显示 ）
      -webkit-box-orient: vertical; //（和 1 结合使用 ，设置或检索伸缩盒对象的子元素的排列方式 ）
      overflow: hidden; //（文本溢出限定的宽度就隐藏内容）
      text-overflow: ellipsis; //（多行文本的情况下，用省略号 “…” 隐藏溢出范围的文本
    }
    .title-arrow {
      text-align: center;
      flex: 1;
      font-size: 0.75rem;
      i {
        font-size: 0.75rem;
      }
    }
    .title-label {
      flex: 1;
      background: #c6aa4f;
      padding: 0.125rem 0.375rem;
      font-size: 0.75rem;
      text-align: center;
      color: rgb(15, 14, 14);
    }
  }
  .main {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    padding: 0.625rem 0 0 0;
    img {
      width: 2.5rem;
      padding: 0.3125rem 0.1875rem;
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
