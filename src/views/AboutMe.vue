<template>
  <div>me--{{ store.state.userInfo.id + '-----' + store.state.userInfo.username }}</div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    return { store }
  }
}
</script>

<style lang="less" scoped></style>
