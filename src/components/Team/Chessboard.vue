<template>
  <div class="board-container">
    <div class="bg">
      <img class="location" src="http://106.12.140.161:81/image/location.png" />
      <!-- <img
        class="item"
        :style="{ top: 2.3125 * 1 + 'rem', left: 1.375 + 2.875 * 2 + 'rem' }"
        src="https://game.gtimg.cn/images/lol/act/img/tft/champions/414.png"
      /> -->
      <img
        class="item"
        :style="getPosition('1-3')"
        src="https://game.gtimg.cn/images/lol/act/img/tft/champions/434.png"
      />
    </div>
    <div>{{ needInfo }}</div>
  </div>
</template>

<script>
export default {
  name: 'chessBoard',
  props: ['needInfo'],
  setup() {
    // 根据行列位置 设置偏移距离 传入格式为 "1-2" 代表2行3列 坐标从0开始
    const getPosition = origin => {
      const position = origin.split('-')
      const row = position[0]
      const col = position[1]
      let rowStart = 0
      if (row % 2 !== 0) {
        rowStart = 1.375
      }
      return {
        top: 2.3125 * row + 'rem',
        left: rowStart + 2.8125 * col + 'rem'
      }
    }
    return { getPosition }
  }
}
</script>

<style lang="less" scoped>
.board-container {
  .bg {
    position: relative;
    .location {
      width: 100%;
    }
    .item {
      position: absolute;
      width: 2.85rem;
      // height: 5.1875rem;
      object-fit: cover;
      mask: url('https://game.gtimg.cn/images/lol/tft/content-site/slot-mask-img.png') no-repeat;
      // mask-size: 2.625rem 2.8rem;
      mask-size: 2.7rem 2.85rem;
    }
  }
}
</style>
