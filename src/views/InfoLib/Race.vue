<template>
  <div class="race-container">
    <div class="top">
      <div class="version">版本号 12.10</div>
      <div class="race active">种族</div>
      <span>|</span>
      <div class="job">职业</div>
    </div>
    <div class="race-list">
      <div class="race-item">
        <div class="left">
          <div class="title">
            <img src="https://game.gtimg.cn/images/lol/act/img/tft/origins/6102.png" />
            <div class="name">炼金科技</div>
          </div>
          <div class="content">
            在跌入75%生命值以下之后，【炼金科技】英雄们获得伤害减免、攻击速度，并且每秒回复其一定比例的最大生命值，持续一定时间。
          </div>
        </div>
        <div class="right">
          <img src="https://game.gtimg.cn/images/lol/act/img/tft/champions/352.png" alt="" />
          <img src="https://game.gtimg.cn/images/lol/act/img/tft/champions/352.png" alt="" />
          <img src="https://game.gtimg.cn/images/lol/act/img/tft/champions/352.png" alt="" />
          <img src="https://game.gtimg.cn/images/lol/act/img/tft/champions/352.png" alt="" />
          <img src="https://game.gtimg.cn/images/lol/act/img/tft/champions/352.png" alt="" />
          <img src="https://game.gtimg.cn/images/lol/act/img/tft/champions/352.png" alt="" />
          <img src="https://game.gtimg.cn/images/lol/act/img/tft/champions/352.png" alt="" />
        </div>
      </div>
      <div class="hr-line" style="height: 2px"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.hr-line {
  background: #ebedf0;
  margin: 0.3125rem 0;
}
.race-container {
  margin-top: 3.25rem;
  .active {
    color: #21ad73;
    font-weight: 600;
  }
  .top {
    padding: 0.3125rem 0.625rem;
    background: rgb(241, 241, 241);
    display: flex;
    font-size: 0.875rem;
    .version {
      flex: 1;
    }
    .race,
    .job {
      margin: 0 0.625rem;
    }
  }
  .race-list {
    .race-item {
      padding: 0.625rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        flex: 1.1;
        margin-right: 1.875rem;
        .title {
          display: flex;
          align-items: center;
          img {
            width: 1.5rem;
          }
          .name {
            font-size: 1rem;
          }
        }
        .content {
          font-size: 0.875rem;
          color: grey;
          white-space: pre-wrap;
          text-align: justify; //两端对齐
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        img {
          width: 2rem;
          margin: 0.125rem 0.125rem;
          height: 2rem;
          border-radius: 1rem;
        }
      }
    }
  }
}
</style>
