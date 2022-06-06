<template>
  <div class="chess-container">
    <div class="top">
      <!-- 顶部搜索 -->
      <div class="search">
        <van-search class="search-input" v-model="searchValue" shape="round" placeholder="搜索" />
        <i class="iconfont icon-a-Frame1455" @click="isSmall = !isSmall"></i>
        <i class="iconfont icon-shaixuan" @click="showPopup"></i>
      </div>
      <!-- 标题栏 -->
      <div class="title-bar">
        <div>英雄<i class="iconfont icon-xiangxia"></i></div>
        <div>种族</div>
        <div>职业</div>
        <div>消耗<i class="iconfont icon-xiangxia"></i></div>
      </div>
    </div>
    <!-- 英雄列表 -->
    <!-- 大图模式 -->
    <div class="chess-list" v-if="!isSmall">
      <div
        class="chess-item"
        @click="handleClickChess(chess.chessId)"
        v-for="(chess, index) in computedChess"
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
          <div class="rj-item" v-for="(rj, indexRJ) in computedRJ(computedChess, index)" :key="indexRJ">{{ rj }}</div>
        </div>
      </div>
    </div>
    <!-- 小图模式 -->
    <div class="chess-list-small" v-if="isSmall">
      <div
        class="chess-item"
        v-for="chess in computedChess"
        :key="chess.chessId"
        @click="handleClickChess(chess.chessId)"
      >
        <img :src="'https://game.gtimg.cn/images/lol/act/img/tft/champions/' + chess.TFTID + '.png'" />
        <div class="name">{{ chess.displayName }}</div>
        <div class="races">
          <div class="item" v-for="race in chess.races.split(',')" :key="race">{{ race }}</div>
        </div>
        <div class="jobs">
          <div class="item" v-for="job in chess.jobs.split(',')" :key="job">{{ job }}</div>
        </div>
        <div class="price">{{ chess.price }}</div>
      </div>
    </div>
    <!-- 侧边筛选 -->
    <div class="right-bar">
      <van-popup v-model:show="show" position="right" :style="{ height: '80%', width: '80%' }" round>
        <chess-search-pop @handleClickReset="handlePopReset" @searchPopComfirm="handlePopComfirm"></chess-search-pop>
      </van-popup>
    </div>
  </div>
</template>

<script>
import chessSearchPop from '@/components/InfoLib/ChessSearchPop.vue'
import { ref, onMounted, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/index'
export default {
  components: {
    chessSearchPop
  },
  setup() {
    const router = useRouter()
    // 搜索框双向绑定值
    const searchValue = ref('')
    // 弹出层查询值
    const popValue = ref('')
    // 获取所有英雄列表
    const allChess = ref([])
    const getAllChess = async () => {
      const { data: res } = await api.getAllChess()
      console.log(res)
      allChess.value = res.allChess
    }
    // 模糊查询英雄
    const computedChess = computed(() => {
      if (searchValue.value !== '') {
        // 只要触发了搜索，就重置查询条件
        resetQuery()
        return allChess.value.filter(
          item => item.title.includes(searchValue.value) || item.displayName.includes(searchValue.value)
        )
      }
      // 三个条件可以选其一 也可以多选
      if (queryList.race !== '' || queryList.job !== '' || queryList.price !== '') {
        return allChess.value.filter(
          item =>
            (item.title.includes(searchValue.value) || item.displayName.includes(searchValue.value)) &&
            item.jobs.includes(queryList.job) &&
            item.races.includes(queryList.race) &&
            item.price.toString().includes(queryList.price)
        )
      }
      // 处理在没有设置查询条件时 返回所有信息
      return allChess.value.filter(
        item => item.title.includes(searchValue.value) || item.displayName.includes(searchValue.value)
      )
    })
    // 控制英雄list大图还是小图模式
    const isSmall = ref(false)
    // 侧边栏查询
    const show = ref(false)
    const showPopup = () => {
      show.value = true
    }
    // 处理子组件传来的重置
    const handlePopReset = () => {
      resetQuery()
    }
    // 处理子组件传来的查询条件
    const queryList = reactive({
      race: '',
      job: '',
      price: ''
    })
    // 重置查询条件
    const resetQuery = () => {
      queryList.race = ''
      queryList.job = ''
      queryList.price = ''
    }
    // 顺序为 race job price
    const handlePopComfirm = val => {
      queryList.race = val[0]
      queryList.job = val[1]
      queryList.price = val[2]
      console.log(queryList)
      show.value = false
    }
    // 点击英雄跳转详情
    const handleClickChess = chessId => {
      router.push(`/chessinforefresh/${chessId}`)
    }
    // 动态计算羁绊和职业列表
    const computedRJ = (origin, index) => {
      return [...origin[index].races.split(','), ...origin[index].jobs.split(',')]
    }
    onMounted(async () => {
      await getAllChess()
    })
    return {
      searchValue,
      popValue,
      allChess,
      getAllChess,
      computedChess,
      handleClickChess,
      computedRJ,
      show,
      isSmall,
      showPopup,
      handlePopReset,
      handlePopComfirm,
      queryList,
      resetQuery
    }
  }
}
</script>

<style lang="less" scoped>
.chess-container {
  position: relative;
  .top {
    width: 100%;
    position: fixed;
    top: 2.65rem;
    left: 0;
    z-index: 222;
    .search {
      background: white;
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
      // background: white;
      z-index: 223;
      background: rgb(247, 244, 244);
      padding: 0.3125rem 0.625rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.75rem;
      text-align: center;
      color: grey;
      i {
        font-size: 0.75rem;
      }
    }
  }
  .chess-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;
    margin-top: 8.75rem;
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
  .chess-list-small {
    padding: 0 0.625rem;
    margin-bottom: 3rem;
    margin-top: 8.75rem;
    .chess-item {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      margin: 1.25rem 0;
      img {
        border-radius: 0.5rem;
        width: 3rem;
        margin-right: 0.3125rem;
      }
      .name {
        min-width: 3.625rem;
      }
      .races {
        min-width: 4.375rem;
        margin: 0 2rem 0 0.3125rem;
      }
      .jobs {
        min-width: 4rem;
        margin-right: 2rem;
      }
      .price {
        text-align: center;
        min-width: 1.875rem;
      }
    }
  }
}
</style>
