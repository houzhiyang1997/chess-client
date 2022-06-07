<template>
  <div>
    <van-button round block type="primary" @click="handleLogOut"> 退出登录 </van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { useStore } from 'vuex'
export default {
  name: 'dataBoard',
  components: {},
  setup() {
    const store = useStore()
    const handleLogOut = () => {
      window.localStorage.removeItem('token')
      // 清除userinfo
      store.commit('setUserInfo', { id: 0, username: '' })
      Toast('退出成功')
    }
    return { handleLogOut }
  }
}
</script>

<style lang="less" scoped></style>
