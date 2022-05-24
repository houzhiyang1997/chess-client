<template>
  <div class="item-container">
    <div class="left">
      <div class="title">{{ news.title }}</div>
      <div class="author">{{ news.author }}</div>
    </div>
    <div class="right">
      <img :src="news.img" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'newsItem',
  // 获取父组件传过来的数据
  props: ['news']
}
</script>

<style lang="less" scoped>
.item-container {
  padding: 0.625rem 0.625rem;
  display: flex;
  align-items: center;
  height: 100%;
  .left {
    display: flex;
    flex: 2;
    flex-direction: column;
    .title {
      font-size: 14px;
      -webkit-line-clamp: 2; //（用来限制在一个块元素显示的文本的行数，2 表示最多显示 2 行。为了实现该效果，它需要组合其他的 WebKit 属性）
      display: -webkit-box; //（和 1 结合使用，将对象作为弹性伸缩盒子模型显示 ）
      -webkit-box-orient: vertical; //（和 1 结合使用 ，设置或检索伸缩盒对象的子元素的排列方式 ）
      overflow: hidden; //（文本溢出限定的宽度就隐藏内容）
      text-overflow: ellipsis; //（多行文本的情况下，用省略号 “…” 隐藏溢出范围的文本
    }
    .author {
      padding-top: 0.9375rem;
      font-size: 0.75rem;
      color: rgb(54, 53, 53);
      font-weight: 600;
    }
  }
  .right {
    flex: 1.5;
    display: flex;
    padding-left: 0.3125rem;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
