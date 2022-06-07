<template>
  <div>
    <van-button round block type="primary" @click="handleLogOut"> 退出登录 </van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'dataBoard',
  components: {},
  setup() {
    const handleLogOut = () => {
      window.localStorage.removeItem('token')
      Toast('退出成功')
    }

    return { handleLogOut }
  }
}
</script>

<style lang="less" scoped></style>
