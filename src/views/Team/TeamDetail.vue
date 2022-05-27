<template>
  <div class="teamdetail-container">
    <detail-header title="阵容详情"></detail-header>
    <div class="bg">
      <img src="http://106.12.140.161:81/image/bg1.jpg" ref="topBg" />
    </div>
    <div class="main">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quasi minus minima fugiat voluptatibus
        facilis hic et unde error quam aut, laudantium dolores aliquid omnis sunt distinctio cum ipsa? Veniam.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quasi minus minima fugiat voluptatibus
        facilis hic et unde error quam aut, laudantium dolores aliquid omnis sunt distinctio cum ipsa? Veniam.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quasi minus minima fugiat voluptatibus
        facilis hic et unde error quam aut, laudantium dolores aliquid omnis sunt distinctio cum ipsa? Veniam.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quasi minus minima fugiat voluptatibus
        facilis hic et unde error quam aut, laudantium dolores aliquid omnis sunt distinctio cum ipsa? Veniam.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quasi minus minima fugiat voluptatibus
        facilis hic et unde error quam aut, laudantium dolores aliquid omnis sunt distinctio cum ipsa? Veniam.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quasi minus minima fugiat voluptatibus
        facilis hic et unde error quam aut, laudantium dolores aliquid omnis sunt distinctio cum ipsa? Veniam.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quasi minus minima fugiat voluptatibus
        facilis hic et unde error quam aut, laudantium dolores aliquid omnis sunt distinctio cum ipsa? Veniam.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quasi minus minima fugiat voluptatibus
        facilis hic et unde error quam aut, laudantium dolores aliquid omnis sunt distinctio cum ipsa? Veniam.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quasi minus minima fugiat voluptatibus
        facilis hic et unde error quam aut, laudantium dolores aliquid omnis sunt distinctio cum ipsa? Veniam.
      </p>
    </div>
  </div>
</template>

<script>
import detailHeader from '@/components/DetailHeader.vue'
import { ref, onMounted, watchEffect, nextTick } from 'vue'
export default {
  name: 'teamDetail',
  props: ['teamId'],
  components: {
    detailHeader
  },
  setup() {
    const scrollTop = ref(0)
    const topBg = ref()
    onMounted(() => {
      handleScroll()
    })
    const handleScroll = () => {
      window.addEventListener('scroll', () => {
        scrollTop.value = window.scrollY
      })
    }
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
    return { scrollTop, topBg, handleScroll }
  }
}
</script>

<style lang="less" scoped>
.teamdetail-container {
  .bg {
    margin-top: 2.875rem;
    width: 100%;
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    img {
      width: 100%;
      height: 15.625rem;
      object-fit: cover;
    }
  }
  .main {
    border-top-left-radius: 0.625rem;
    border-top-right-radius: 0.625rem;
    width: 100%;
    height: 100%;
    margin-top: 300px;
    background: white;
  }
}
</style>
