<template>
  <div class="teamdetail-container">
    <detail-header title="阵容详情"></detail-header>
    <div class="bg">
      <img src="http://106.12.140.161:81/image/bg2.jpg" ref="topBg" />
    </div>
    <div class="author">
      <img src="https://game.gtimg.cn/images/lol/act/img/tft/author/yese.png" />
    </div>
    <div class="author-name" v-if="teamInfo[0]">
      <p>{{ teamInfo[0].author }}</p>
    </div>
    <div class="main">
      <div class="main-top" v-if="teamInfo[0]">
        <team-item :info="teamInfo[0]" :top="false" :foot="false"></team-item>
      </div>
      <div class="main-iconlist">
        <div class="icon-item">强袭战士</div>
      </div>
    </div>
  </div>
</template>

<script>
import teamItem from '@/components/Team/TeamItem.vue'
import detailHeader from '@/components/DetailHeader.vue'
import api from '@/api/index'
import { ref, onMounted, watchEffect, nextTick } from 'vue'
export default {
  name: 'teamDetail',
  props: ['teamId'],
  components: {
    detailHeader,
    teamItem
  },
  setup(props) {
    // #region 检测头部滚动实现高斯模糊
    const scrollTop = ref(0)
    const topBg = ref()
    // 获取屏幕滚动距离
    const handleScroll = () => {
      window.addEventListener('scroll', () => {
        scrollTop.value = window.scrollY
      })
    }
    // 监视scrolltop 计算百分比并设置filter
    watchEffect(() => {
      let blur = 0
      const top = scrollTop.value
      nextTick(() => {
        const percent = Math.abs(top / topBg.value.height)
        if (percent >= 1) {
          blur = 20
        } else {
          blur = percent * 20
        }
        topBg.value.style.filter = `blur(${blur}px)`
      })
    })

    // #endregion
    // 获取team信息
    const teamInfo = ref([])
    const getTeam = async teamId => {
      const { data: res } = await api.getTeamById(teamId)
      console.log(res)
      teamInfo.value = res.teaminfo
    }
    onMounted(() => {
      getTeam(props.teamId)
      handleScroll()
    })

    return { scrollTop, topBg, handleScroll, teamInfo, getTeam }
  }
}
</script>

<style lang="less" scoped>
.teamdetail-container {
  position: relative;
  // #region 顶部三个绝对定位
  .bg {
    margin-top: 2.875rem;
    width: 100%;
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  .author {
    position: absolute;
    width: 50%;
    left: calc(50% - 2.5rem);
    top: -4rem;
    img {
      width: 5rem;
      height: 5rem;
      border-radius: 2.5rem;
    }
  }
  .author-name {
    position: absolute;
    width: 18.75rem;
    left: calc(50% - 9.375rem);
    top: 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    p:after {
      content: ' —————';
    }
    p:before {
      content: '————— ';
    }
  }
  // #endregion 顶部三个绝对定位
  .main {
    border-top-left-radius: 1.25rem;
    border-top-right-radius: 1.25rem;
    width: 100%;
    height: 100%;
    margin-top: 12.5rem;
    background: white;
    .main-top {
      padding: 3.5rem 1.25rem 0 1.25rem;
    }
    .main-iconlist {
      padding: 0 1.25rem;
      display: flex;
      flex-wrap: wrap;
      .icon-item {
        background: black;
        color: white;
        padding: 0.125rem 0.3125rem;
        margin: 0 0.1875rem 0.3125rem 0.1875rem;
      }
    }
  }
}
</style>
