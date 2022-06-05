<template>
  <div class="chess-container">
    <!-- 顶部搜索 -->
    <div class="search">
      <van-search class="search-input" v-model="searchValue" shape="round" placeholder="搜索" />
      <i class="iconfont icon-a-Frame1455"></i>
      <i class="iconfont icon-shaixuan"></i>
    </div>
    <!-- 标题栏 -->
    <div class="title-bar">
      <div>英雄<i class="iconfont icon-xiangxia"></i></div>
      <div>种族</div>
      <div>职业</div>
      <div>消耗<i class="iconfont icon-xiangxia"></i></div>
    </div>
    <!-- 英雄列表 -->
    <div class="chess-list">
      <div
        class="chess-item"
        v-for="(chess, index) in allChess"
        :key="chess.chessId"
        :style="{
          backgroundImage: 'url(http://game.gtimg.cn/images/lol/tft/cham-icons/624x318/' + chess.TFTID + '.jpg)'
        }"
      >
        <div class="title">{{ chess.title }}</div>
        <div class="displayName">
          <div class="name">{{ chess.displayName }}</div>
          <i class="iconfont icon-jinbi"></i>
          <div class="price">{{ chess.price }}</div>
        </div>
        <div class="race-job" v-if="allChess.races !== '' && allChess.jobs !== ''">
          <div class="rj-item" v-for="(rj, indexRJ) in computedRJ(index)" :key="indexRJ">{{ rj }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '@/api/index'
export default {
  setup() {
    // 搜索框双向绑定值
    const searchValue = ref('')
    // 获取所有英雄列表
    const allChess = ref([])
    const getAllChess = async () => {
      const { data: res } = await api.getAllChess()
      console.log(res)
      allChess.value = res.allChess
    }
    // 动态计算羁绊和职业列表
    const computedRJ = index => {
      return [...allChess.value[index].races.split(','), ...allChess.value[index].jobs.split(',')]
    }
    onMounted(async () => {
      await getAllChess()
    })
    return { searchValue, allChess, getAllChess, computedRJ }
  }
}
</script>

<style lang="less" scoped>
.chess-container {
  .search {
    padding: 0 0.625rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .search-input {
      flex: 1;
    }
    i {
      font-size: 1.25rem;
      margin-left: 0.625rem;
    }
  }
  .title-bar {
    background: rgba(212, 211, 211, 0.25);
    padding: 0.3125rem 0.625rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: grey;
    i {
      font-size: 0.75rem;
    }
  }
  .chess-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;
    .chess-item {
      margin: 0.625rem 0;
      border-radius: 1rem;
      width: 21rem;
      height: 6rem;
      background-size: cover;
      color: white;
      font-weight: 600;
      box-shadow: 8.75rem 0px 3.125rem 0 #2c2b2b inset;
      .title {
        margin: 0.625rem 0.625rem 0.3125rem 0.625rem;
        font-size: 0.875rem;
      }
      .displayName {
        margin: 0 0.625rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 6.25rem;
        .name {
          font-size: 1rem;
        }
        i {
          font-size: 0.75rem;
          color: goldenrod;
        }
      }
      .race-job {
        margin: 0.625rem 0.625rem;
        display: flex;
        font-size: 0.75rem;
        .rj-item {
          margin-right: 0.625rem;
        }
      }
    }
  }
}
</style>
