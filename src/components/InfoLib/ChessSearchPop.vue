<template>
  <div class="chess-pop-container">
    <div id="race">
      <div class="title">羁绊</div>
      <div class="choose-box">
        <div class="choose-item">强袭战士</div>
        <div class="choose-item">强袭战士2</div>
        <div class="choose-item">强袭战士3</div>
      </div>
    </div>
    <div id="job">
      <div class="title">职业</div>
      <div class="choose-box">
        <div class="choose-item">黑魔法师</div>
        <div class="choose-item">黑魔法师2</div>
        <div class="choose-item">黑魔法师3</div>
      </div>
    </div>
    <div id="price">
      <div class="title">价格</div>
      <div class="choose-box">
        <div class="choose-item">1</div>
        <div class="choose-item">2</div>
        <div class="choose-item">3</div>
        <div class="choose-item">4</div>
        <div class="choose-item">5</div>
      </div>
    </div>
    <div id="bottom"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.chess-pop-container {
  padding: 3rem 1.25rem;
  .title {
    font-size: 0.875rem;
    font-weight: 600;
  }
  .choose-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .choose-item {
      margin: 0.3125rem 0;
      padding: 0.125rem 0.3125rem;
      text-align: center;
      border: 0.0625rem solid grey;
      min-width: 3.5rem;
    }
  }
}
</style>
