<template>
  <div class="board-container">
    <div class="title">阵容站位</div>
    <div class="bg">
      <img class="location" src="http://106.12.140.161:81/image/location.png" />
      <!-- <img
        class="item"
        :style="getPosition('1-3')"
        src="https://game.gtimg.cn/images/lol/act/img/tft/champions/414.png"
      /> -->
      <div class="item" v-for="(item, index) in needInfo.chessPosition.split(',')" :key="index">
        <img
          :style="getPosition(item)"
          :src="'https://game.gtimg.cn/images/lol/act/img/tft/champions/' + needInfo.imgList.split(',')[index]"
        />
      </div>
    </div>
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
  .title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.625rem;
  }
  .bg {
    position: relative;
    .location {
      width: 100%;
    }
    .item {
      img {
        position: absolute;
        width: 2.85rem;
        top: 0;
        left: 0;
        object-fit: cover;
        mask: url('https://game.gtimg.cn/images/lol/tft/content-site/slot-mask-img.png') no-repeat;
        // mask-size: 2.625rem 2.8rem;
        mask-size: 2.7rem 2.85rem;
        mask-border: 5px solid orange;
      }
    }
  }
}
</style>
