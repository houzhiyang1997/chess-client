<template>
  <div class="racedetail-container" ref="content" style="height: 0">
    <!-- <img src="https://game.gtimg.cn/images/lol/tft/content-site/slot-mask-img.png" alt="" /> -->
    <div class="race" v-for="(race, index) in raceInfo" :key="index">
      <div class="title">
        <div class="bg">
          <img :src="race.imagePath" />
        </div>
        <div class="name">{{ race.name }}</div>
      </div>
      <div class="introduce">
        {{ race.introduce }}
      </div>
    </div>
    <div class="job" v-for="(job, index) in jobInfo" :key="index">
      <div class="title">
        <div class="bg">
          <img :src="job.imagePath" />
        </div>
        <div class="name">{{ job.name }}</div>
      </div>
      <div class="introduce">
        {{ job.introduce }}
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import api from '@/api/index'
export default {
  name: 'raceDetail',
  props: ['raceIdList', 'jobIdList'],
  setup(porps) {
    const content = ref()
    // 获取race详情
    const raceInfo = ref([])
    const getRaceDetail = async () => {
      const { data: res } = await api.getRaceById(porps.raceIdList.join(','))
      console.log(res)
      raceInfo.value = res.raceinfo
    }
    // 获取job详情
    const jobInfo = ref([])
    const getJobDetail = async () => {
      console.log(porps.jobIdList)
      const { data: res } = await api.getJobById(porps.jobIdList.join(','))
      console.log(res)
      jobInfo.value = res.jobinfo
    }
    onMounted(() => {
      getRaceDetail()
      getJobDetail()
    })
    return { content, raceInfo, jobInfo }
  }
}
</script>

<style lang="less" scoped>
.racedetail-container {
  background: rgba(214, 209, 209, 0.3);
  overflow: hidden;
  .race,
  .job {
    padding: 0.325rem 1.25rem;
    .introduce {
      margin-top: 0.325rem;
      font-size: 0.875rem;
      white-space: pre-wrap;
      text-align: justify; //两端对齐
    }
    .title {
      display: flex;
      align-items: center;
      position: relative;
      .bg {
        width: 1.8rem;
        height: 2rem;
        background: goldenrod;
        mask: url('https://game.gtimg.cn/images/lol/tft/content-site/slot-mask-img.png') no-repeat;
        mask-size: 1.8rem 2rem;
        img {
          width: 1.8rem;
          filter: invert(30%);
        }
      }
      .name {
        position: absolute;
        left: 1.7rem;
        background: rgba(218, 165, 32, 0.37);
        font-size: 0.8rem;
        padding: 0 0.8rem;
      }
    }
  }
}
</style>
