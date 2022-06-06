<template>
  <div class="chess-pop-container">
    <div id="race">
      <div class="title">羁绊</div>
      <div class="choose-box">
        <div
          class="choose-item"
          v-for="(race, index) in raceList"
          :key="race.raceId"
          @click="handleClickItem('race', race.name, index)"
          :class="activeRaceId === index ? 'active' : ''"
        >
          {{ race.name }}
        </div>
      </div>
    </div>
    <div id="job">
      <div class="title">职业</div>
      <div class="choose-box">
        <div
          class="choose-item"
          v-for="(job, index) in jobList"
          :key="job.jobId"
          @click="handleClickItem('job', job.name, index)"
          :class="activeJobId === index ? 'active' : ''"
        >
          {{ job.name }}
        </div>
      </div>
    </div>
    <div id="price">
      <div class="title">价格</div>
      <div class="choose-box">
        <div
          class="choose-item"
          v-for="(price, index) in priceList"
          :key="price"
          @click="handleClickItem('price', price, index)"
          :class="activePriceId === index ? 'active' : ''"
        >
          {{ price }}
        </div>
      </div>
    </div>
    <div class="bottom">
      <button class="cancel" @click="handleClickCancel">取消</button>
      <button class="comfirm" @click="handleClickComfirm">确定</button>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import { onMounted, ref } from 'vue'
export default {
  name: 'chessSearchPop',
  emit: ['searchPopCancel', 'searchPopComfirm'],
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
    const priceList = ref(['1', '2', '3', '4', '5'])
    // 处理点击取消，事件委托给父 设置show隐藏
    const handleClickCancel = () => {
      emit('searchPopCancel')
    }
    // 处理单击确定，事件委托给父，根据查询条件显示信息
    const handleClickComfirm = () => {
      emit('searchPopComfirm', queryList.value)
    }
    // 开始实现选项点击
    const activeRaceId = ref(-1) // 控制羁绊选中
    const activeJobId = ref(-1) // 控制职业选中
    const activePriceId = ref(-1) // 控制价格选中
    const queryList = ref(['', '', '']) // 查询参数 顺序为 race job price
    /* from：点击的是race，job，还是price
    val：传递的查询值
    index：选中的index  */
    const handleClickItem = (from, val, index) => {
      switch (from) {
        case 'race':
          activeRaceId.value = index
          queryList.value[0] = val
          break
        case 'job':
          activeJobId.value = index
          queryList.value[1] = val
          break
        case 'price':
          activePriceId.value = index
          queryList.value[2] = val
      }
      console.log(queryList.value)
    }
    onMounted(() => {
      getRaceList()
      getJobList()
    })
    return {
      raceList,
      getRaceList,
      jobList,
      getJobList,
      priceList,
      handleClickCancel,
      handleClickComfirm,
      handleClickItem,
      activeRaceId,
      activeJobId,
      activePriceId,
      queryList
    }
  }
}
</script>

<style lang="less" scoped>
.chess-pop-container {
  padding: 2rem 1.25rem 0 1.25rem;
  .active {
    background: #21ad73;
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
