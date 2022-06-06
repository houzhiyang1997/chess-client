<template>
  <div class="chess-pop-container">
    <div id="race">
      <div class="title">羁绊</div>
      <div class="choose-box">
        <div class="choose-item" v-for="race in raceList" :key="race.raceId">{{ race.name }}</div>
      </div>
    </div>
    <div id="job">
      <div class="title">职业</div>
      <div class="choose-box">
        <div class="choose-item" v-for="job in jobList" :key="job.jobId">{{ job.name }}</div>
      </div>
    </div>
    <div id="price">
      <div class="title">价格</div>
      <div class="choose-box">
        <div class="choose-item" v-for="price in priceList" :key="price">{{ price }}</div>
      </div>
    </div>
    <div class="bottom">
      <button class="cancel" @click="handleClickCancel">取消</button>
      <button class="comfirm">确定</button>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import { onMounted, ref } from 'vue'
export default {
  name: 'chessSearchPop',
  emit: ['searchPopCancel'],
  setup(props, { emit }) {
    // 查询羁绊列表
    const raceList = ref([])
    const getRaceList = async () => {
      const { data: res } = await api.getAllRace()
      // 升序
      raceList.value = res.allRace.sort((a, b) => {
        return a.name.length - b.name.length
      })
    }
    // 查询职业列表
    const jobList = ref([])
    const getJobList = async () => {
      const { data: res } = await api.getAllJob()
      // 升序
      jobList.value = res.allJob.sort((a, b) => {
        return a.name.length - b.name.length
      })
    }
    // 设置价格列表
    const priceList = ref([1, 2, 3, 4, 5])
    // 处理点击取消，事件委托给父 设置show隐藏
    const handleClickCancel = () => {
      emit('searchPopCancel')
    }
    onMounted(() => {
      getRaceList()
      getJobList()
    })
    return { raceList, getRaceList, jobList, getJobList, priceList, handleClickCancel }
  }
}
</script>

<style lang="less" scoped>
.chess-pop-container {
  padding: 2rem 1.25rem 0 1.25rem;
  .active {
    background: rgb(32, 32, 32);
    color: white;
  }
  .title {
    margin: 0.3125rem 0;
    font-size: 0.875rem;
    font-weight: 600;
  }
  .choose-box {
    display: flex;
    flex-wrap: wrap;
    .choose-item {
      font-size: 0.75rem;
      margin: 0.3125rem 0.125rem;
      padding: 0.125rem 0.3125rem;
      text-align: center;
      border: 0.0625rem solid grey;
      min-width: 3.75rem;
    }
  }
  .bottom {
    margin-top: 3.125rem;
    button {
      text-align: center;
      font-size: 0.875rem;
      margin-right: 1.875rem;
      width: 6.25rem;
      color: white;
      border: 0;
      border-radius: 1rem;
      padding: 0.1875rem 0.3125rem;
    }
    .cancel {
      background: rgb(65, 62, 62);
    }
    .comfirm {
      background: #28c281;
    }
  }
}
</style>
