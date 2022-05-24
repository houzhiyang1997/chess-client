<template>
  <div class="detail-container" v-if="detail[0]">
    <van-nav-bar title="文章详情" @click-left="router.back()">
      <template #left>
        <van-icon name="arrow-left" color="grey" size="1.5rem" />
      </template>
      <template #right>
        <van-icon name="setting-o" color="grey" size="1.5rem" />
      </template>
    </van-nav-bar>
    <div class="detail-top">
      <h3>{{ detail[0].title }}</h3>
      <div class="info">
        <img :src="detail[0].author_img" alt="" />
        <div class="info-main">
          <div class="author">{{ detail[0].author }}</div>
          <div class="time">{{ `发布于2022-05-24` }}</div>
        </div>
        <van-button type="success" size="small">关注</van-button>
      </div>
    </div>
    <div class="detail-main markdown-body">
      <img class="img-header" :src="detail[0].img" />
      <div class="content" v-html="detail[0].content"></div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import { hiddenFooter } from '@/hooks/useHidden.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'newsDetail',
  props: ['id'],
  setup(props) {
    // 控制footer隐藏与否
    hiddenFooter()
    const router = useRouter()
    const detail = ref([])

    onMounted(() => {
      getDetail(props.id)
    })

    // 根据id获取新闻详情
    const getDetail = async id => {
      const { data: res } = await api.getDetailById(id)
      detail.value = res.detail
    }

    return {
      router,

      getDetail,
      detail
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/github.css';

.detail-container {
  padding: 0.625rem 1rem;
  /deep/ .van-nav-bar__left,
  /deep/ .van-nav-bar__right {
    padding: 0;
  }
  .detail-top {
    .info {
      padding: 0.625rem 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      img {
        width: 3rem;
        border-radius: 1.5rem;
      }
      .info-main {
        flex: 1;
        padding-left: 0.625rem;
        .author {
          padding-bottom: 0.3125rem;
        }
        .time {
          font-size: 0.75rem;
        }
      }
    }
  }
  .detail-main {
    padding: 0.625rem 0;
    .img-header {
      padding-bottom: 0.625rem;
    }
    img {
      width: 100%;
    }
  }
}
</style>
