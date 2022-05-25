<template>
  <div class="detail-container" v-if="detail[0]">
    <detail-header title="文章详情"></detail-header>
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
    <div class="detail-main content-style">
      <img class="img-header" :src="detail[0].img" />
      <div class="content" v-html="detail[0].content"></div>
    </div>
    <div class="footer">
      <div class="main">
        <van-search
          class="search"
          clearable
          shape="round"
          background="rgba(0,0,0,0)"
          v-model="comment"
          placeholder="兴趣内容"
        />
        <div class="icon">
          <van-icon name="coupon-o" size="1.5rem" />
          <van-icon name="star-o" size="1.2rem" />
          <van-icon name="share-o" size="1.5rem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import detailHeader from '@/components/DetailHeader.vue'
import api from '@/api/index'
import { hiddenFooter } from '@/hooks/useHidden.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'newsDetail',
  props: ['id'],
  components: {
    detailHeader
  },
  setup(props) {
    // 控制footer隐藏与否
    hiddenFooter()
    const router = useRouter()
    const detail = ref([])
    const comment = ref('')

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
      comment,
      getDetail,
      detail
    }
  }
}
</script>

<style lang="less" scoped>
// @import '@/assets/github.css';

:deep(.content-style p) {
  margin-top: 0;
  margin-bottom: 16px;
  text-indent: 2em;
  text-align: justify; //两端对齐
}

.detail-container {
  padding: 0.625rem 1rem;
  .detail-top {
    padding-top: 2.75rem;
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
    padding-bottom: 1.875rem;
    .img-header {
      padding-bottom: 0.625rem;
    }
    img {
      width: 100%;
    }
  }
  .footer {
    z-index: 2;
    background: white;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    .main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .search {
        width: 15rem;
      }
      .icon {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
}
</style>
