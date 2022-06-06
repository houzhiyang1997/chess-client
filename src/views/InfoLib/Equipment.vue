<template>
  <div class="equipment-container">
    <div class="title">装备列表</div>
    <div class="equip-list">
      <div class="equip-item">
        <div class="left">
          <img src="https://game.gtimg.cn/images/lol/act/img/tft/equip/Hextech.png" />
        </div>
        <div class="right">
          <div class="name">暴风大剑</div>
          <div class="effect">效果</div>
          <div class="content">+10攻击力</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.equipment-container {
  padding: 0 1.25rem;
  margin-top: 3.25rem;
  .title {
    padding-bottom: 0.625rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
  .equip-list {
    .equip-item {
      display: flex;
      .left {
        img {
          width: 3rem;
        }
      }
      .right {
        flex: 1;
        margin-left: 1.25rem;
        .name {
          font-size: 1rem;
          margin-bottom: 0.625rem;
        }
        .effect {
          font-size: 0.875rem;
          margin-bottom: 0.625rem;
        }
        .content {
          font-size: 0.875rem;
          color: grey;
        }
      }
    }
  }
}
</style>
