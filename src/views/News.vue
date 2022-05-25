<template>
  <div class="news-container">
    <!-- top -->
    <news-top></news-top>
    <!-- news list -->
    <van-list class="newlist" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <news-item v-for="item in newsList" :key="item.id" :news="item" @click="handleClick(item.id)"> </news-item>
    </van-list>
  </div>
</template>

<script>
import newsTop from '@/components/News/NewsTop.vue'
import newsItem from '@/components/News/NewsItem.vue'
import api from '@/api/index'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'News',
  components: {
    newsTop,
    newsItem
  },
  setup() {
    // 加载router
    const router = useRouter()

    // 新闻数据列表
    const newsList = ref([])
    // 控制加载
    // TODO: 后期更改后台进行分页 进行懒加载和下拉刷新
    const loading = ref(false)
    const finished = ref(false)
    // 获取新闻列表
    const getNews = async () => {
      const { data: res } = await api.getNews()
      // console.log(res)
      newsList.value = res.news
    }
    // 处理点击事件 跳转详情页
    const handleClick = id => {
      router.push(`/newsdetail/${id}`)
    }
    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      getNews()
      // 加载状态结束
      loading.value = false
      // 数据全部加载完成
      finished.value = true
    }
    return {
      newsList,
      onLoad,
      loading,
      finished,
      getNews,
      handleClick
    }
  }
}
</script>

<style lang="less" scoped>
.news-container {
  .newlist {
    padding-top: 3rem;
  }
}
</style>
