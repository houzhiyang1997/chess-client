<template>
  <div class="chessinfo-container">
    <detail-header title="英雄详情"></detail-header>
    <div>chessinfo---{{ id }}</div>
    <div>chessinfo---{{ id }}</div>
    <div>chessinfo---{{ id }}</div>
    <div>chessinfo---{{ id }}</div>
  </div>
</template>

<script>
import detailHeader from '@/components/DetailHeader.vue'

export default {
  name: 'chessInfo',
  props: ['id'],
  components: {
    detailHeader
  }
}
</script>

<style></style>
