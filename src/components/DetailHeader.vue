<template>
  <!-- 详情页通用header -->
  <van-nav-bar fixed :title="title" @click-left="router.back()">
    <template #left>
      <van-icon name="arrow-left" color="grey" size="1.5rem" />
    </template>
    <template #right>
      <van-icon name="setting-o" color="grey" size="1.5rem" />
    </template>
  </van-nav-bar>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'detailHeader',
  props: ['title'],
  setup() {
    const router = useRouter()
    return {
      router
    }
  }
}
</script>

<style></style>
