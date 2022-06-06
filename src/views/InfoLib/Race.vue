<template>
  <div class="race-container">
    <!-- 顶部信息 -->
    <div class="top">
      <div class="version">版本号 12.10</div>
      <div class="race" :class="!isJobList ? 'active' : ''" @click="isJobList = false">种族</div>
      <span>|</span>
      <div class="job" :class="isJobList ? 'active' : ''" @click="isJobList = true">职业</div>
    </div>
    <!-- 羁绊视图 -->
    <div class="race-list">
      <div class="item" v-for="(rj, index) in computeRaceOrJob" :key="index">
        <div class="left">
          <div class="title">
            <img :src="rj.imagePath" />
            <div class="name">{{ rj.name }}</div>
          </div>
          <div class="content">
            {{ rj.introduce }}
          </div>
        </div>
        <div class="right">
          <img
            :src="'https://game.gtimg.cn/images/lol/act/img/tft/champions/' + item.TFTID + '.png'"
            v-for="(item, index2) in filterChess(rj.name)"
            :key="index2"
            @click="handleClickImg(item.chessId)"
          />
        </div>
      </div>
      <div class="hr-line" style="height: 2px"></div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/index'
export default {
  setup() {
    const router = useRouter()
    // 查询羁绊列表
    const raceList = ref([])
    const getRaceList = async () => {
      const { data: res } = await api.getAllRace()
      raceList.value = res.allRace
    }
    // 查询职业列表
    const jobList = ref([])
    const getJobList = async () => {
      const { data: res } = await api.getAllJob()
      jobList.value = res.allJob
    }
    // 查询英雄列表 用于筛选羁绊和职业对应的英雄
    const chessList = ref([])
    const getChessList = async () => {
      const { data: res } = await api.getAllChess()
      console.log(res)
      chessList.value = res.allChess
    }
    // 筛选英雄
    const filterChess = condition => {
      return chessList.value.filter(item => item.races.includes(condition) || item.jobs.includes(condition))
    }
    // 选择数据源是raceList还是jobList
    const isJobList = ref(false)
    const computeRaceOrJob = computed(() => {
      if (isJobList.value) {
        return jobList.value
      } else {
        return raceList.value
      }
    })
    // 跳转到棋子详情页
    const handleClickImg = chessId => {
      router.push(`/chessinforefresh/${chessId}`)
    }
    onMounted(async () => {
      await getChessList()
      getRaceList()
      getJobList()
    })
    return {
      raceList,
      getRaceList,
      jobList,
      getJobList,
      chessList,
      getChessList,
      filterChess,
      isJobList,
      computeRaceOrJob,
      handleClickImg
    }
  }
}
</script>

<style lang="less" scoped>
.hr-line {
  background: #ebedf0;
  margin: 0.3125rem 0;
}
.race-container {
  margin-top: 3.25rem;
  margin-bottom: 3.25rem;
  .active {
    color: #21ad73;
    font-weight: 600;
  }
  .top {
    padding: 0.3125rem 0.625rem;
    background: rgb(241, 241, 241);
    display: flex;
    font-size: 0.875rem;
    .version {
      flex: 1;
    }
    .race,
    .job {
      margin: 0 0.625rem;
    }
  }
  .race-list {
    .item {
      padding: 0.625rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        flex: 1.1;
        margin-right: 1.875rem;
        .title {
          display: flex;
          align-items: center;
          img {
            width: 1.5rem;
          }
          .name {
            font-size: 1rem;
          }
        }
        .content {
          font-size: 0.875rem;
          color: grey;
          white-space: pre-wrap;
          text-align: justify; //两端对齐
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        img {
          width: 2rem;
          margin: 0.125rem 0.125rem;
          height: 2rem;
          border-radius: 1rem;
        }
      }
    }
  }
}
</style>
