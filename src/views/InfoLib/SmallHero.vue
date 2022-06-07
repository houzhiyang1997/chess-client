<template>
  <div class="hero-container">
    <div class="top">
      <!-- 顶部搜索 -->
      <div class="search">
        <van-search class="search-input" v-model="searchValue" shape="round" placeholder="搜索" />
      </div>
    </div>
    <div class="hero-list" v-for="(mini, index) in computedAllHero" :key="index">
      <div class="title">{{ mini[0][0].mini }}</div>
      <div class="hero-item" v-for="(item, index2) in mini" :key="index2">
        <div class="img-list">
          <div
            class="hero"
            v-for="(ele, index3) in item"
            :key="index3"
            :style="{
              backgroundImage: 'url(' + ele.imagePath + ')'
            }"
          >
            <div class="quality">{{ ele.quality }}</div>
            <div class="star">{{ '★'.repeat(ele.star) }}</div>
          </div>
        </div>
        <div class="hero-name">{{ item[0].type + ' ' + item[0].mini }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import api from '@/api/index'
export default {
  setup() {
    // 搜索框双向绑定值
    const searchValue = ref('')
    // 获取小小英雄列表
    // 装备列表
    const allHero = ref([])
    const getAllHero = async () => {
      const { data: res } = await api.getAllHero()
      console.log(res)
      allHero.value = res.allHero
    }

    /* 开始构造数据 目标结构为 [miniId1[[typeId1],[typeId2]],
    [miniId2[],[]],
    [miniId3[],[]]] */
    const formatHero = origin => {
      // 1.先获取miniId列表
      const miniIdList = [...new Set(origin.map(item => item.miniId))]
      // 2.开始第一步根据miniId分组
      const res1 = []
      miniIdList.forEach(ele => {
        res1.push(origin.filter(item => item.miniId === ele))
      })
      // 进一步对miniId组内的typeId分组
      const result = []
      res1.forEach(ele => {
        // 对每一个miniID组 先获取对应的typeList
        const typeIdList = [...new Set(ele.map(item => item.typeId))]
        // 开始进行typeList分组 先根据type进行分组，再将res2添加到最后的大组，完成
        const res2 = []
        typeIdList.forEach(element => {
          res2.push(ele.filter(item => item.typeId === element))
        })
        result.push(res2)
      })
      return result
    }
    // 开始筛选搜索
    const computedAllHero = computed(() => {
      return formatHero(allHero.value.filter(item => item.name.includes(searchValue.value)))
    })
    onMounted(() => {
      getAllHero()
    })
    return { searchValue, getAllHero, formatHero, computedAllHero }
  }
}
</script>

<style lang="less" scoped>
.hero-container {
  margin-top: 3.25rem;
  margin-bottom: 3.25rem;
  .hero-list {
    padding: 0.625rem 0.625rem;
    .title {
      font-size: 1.125rem;
      font-weight: 600;
      padding: 0.3125rem 0;
    }
    .hero-item {
      .img-list {
        display: flex;
        justify-content: space-between;
        .hero {
          width: 6.25rem;
          height: 6.25rem;
          background-image: url(https://game.gtimg.cn/images/lol/act/img/tft/hero/lolapp_14.png);
          background-position: center;
          background-size: cover;
          display: flex;
          justify-content: space-between;
          .quality {
            display: flex;
            align-items: flex-end;
            font-size: 0.75rem;
            padding: 0.3125rem 0.3125rem;
            color: rgb(241, 177, 14);
          }
          .star {
            display: flex;
            align-items: flex-end;
            color: #c6aa4f;
            padding: 0.1625rem 0.3125rem;
          }
        }
      }
      .hero-name {
        padding: 0.625rem 0 1.25rem 0;
        font-size: 1rem;
        text-align: center;
      }
    }
  }
}
</style>
