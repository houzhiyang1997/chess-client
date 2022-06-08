<template>
  <div class="me-container">
    <div class="bg">
      <img src="http://106.12.140.161:81/image/me-bg.jpeg" ref="topBg" />
    </div>
    <div class="author" v-if="userInfo[0]">
      <img :src="userInfo[0].imgUrl" />
    </div>
    <div class="author-name" v-if="userInfo[0]">
      <p>{{ userInfo[0].nickName }}</p>
    </div>
    <div class="main" v-if="userInfo[0]">
      <div class="main-list">
        <van-cell-group inset>
          <van-cell title="等级" :value="userInfo[0].level" center icon="medal-o" />
          <van-cell title="积分" :value="userInfo[0].score" center icon="gem-o" />
          <van-cell title="对弈赛季" center icon="flag-o" is-link />
          <van-cell title="收藏阵容" center icon="newspaper-o" is-link />
          <van-cell title="吐槽反馈" center icon="bulb-o" is-link />
          <van-cell title="关于云顶小助手" center icon="star-o" is-link />
        </van-cell-group>
      </div>
      <div class="btn">
        <van-button round block type="primary" @click="handleLogOut"> 退出登录 </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect, nextTick, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import api from '@/api'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
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
    // 处理退出
    const handleLogOut = () => {
      window.localStorage.removeItem('token')
      // 清除userinfo
      store.commit('setUserInfo', { id: 0, username: '' })
      router.push('/login')
      Toast('退出成功')
    }
    // 获取登录用户信息
    const userInfo = ref([])
    const getUserInfo = async id => {
      const { data: res } = await api.getUserById(id)
      console.log(res)
      userInfo.value = res.userInfo
    }
    onMounted(() => {
      getUserInfo(store.state.userInfo.id)
      handleScroll()
    })
    return { store, handleScroll, topBg, handleLogOut, getUserInfo, userInfo }
  }
}
</script>

<style lang="less" scoped>
.me-container {
  position: relative;
  // #region 顶部三个绝对定位
  .bg {
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
    width: 5rem;
    left: calc(50% - 2.5rem);
    top: -3rem;
    z-index: 222;
    img {
      width: 5rem;
      height: 5rem;
      border-radius: 2.5rem;
    }
  }
  .author-name {
    z-index: 222;
    position: absolute;
    width: 100%;
    left: 0;
    top: 2.5rem;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
  }
  // #endregion 顶部三个绝对定位
  .main {
    border-top-left-radius: 1.25rem;
    border-top-right-radius: 1.25rem;
    width: 100%;
    height: 100vh;
    margin-top: 9rem;
    background: rgb(245, 243, 243);
    .main-list {
      padding-top: 5rem;
    }
    .btn {
      padding: 1.25rem 1.25rem;
      width: 100%;
    }
  }
}
</style>
