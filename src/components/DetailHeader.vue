<template>
  <!-- 详情页通用header -->
  <van-config-provider :theme-vars="themeVars">
    <van-nav-bar fixed :title="title" @click-left="router.back()">
      <template #left>
        <van-icon name="arrow-left" color="grey" size="1.5rem" />
      </template>
      <template #right>
        <van-icon name="setting-o" color="grey" size="1.5rem" />
      </template>
    </van-nav-bar>
  </van-config-provider>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'detailHeader',
  props: ['title'],
  setup() {
    const themeVars = {
      navBarHeight: '2.875rem',
      navBarTitleFontSize: '1rem'
    }
    const router = useRouter()
    return {
      themeVars,
      router
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-ellipsis) {
  overflow: visible;
}
</style>
