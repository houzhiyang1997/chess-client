<template>
  <div class="hex-container">
    <div class="top">
      <div class="top-item" :class="itemId === 0 ? 'active' : ''" @click="selectItem(0)">一级</div>
      <div class="top-item" :class="itemId === 1 ? 'active' : ''" @click="selectItem(1)">二级</div>
      <div class="top-item" :class="itemId === 2 ? 'active' : ''" @click="selectItem(2)">三级</div>
    </div>
    <div class="hex-list">
      <div class="hex-item" v-for="hex in computeLevelList" :key="hex.id">
        <div class="left" v-lazy-container="{ selector: 'img' }">
          <img :data-src="hex.imgUrl" />
        </div>
        <div class="right">
          <div class="name">{{ hex.name }}</div>
          <div class="effect">效果</div>
          <div class="content">{{ hex.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue'
import api from '@/api/index'
export default {
  setup() {
    const selectItem = index => {
      itemId.value = index
    }
    // hex列表
    const allHex = ref([])
    const getAllEquip = async () => {
      const { data: res } = await api.getAllHex()
      console.log(res)
      allHex.value = res.allHex
    }
    // 选择数据源级别
    const itemId = ref(0)
    const computeLevelList = computed(() => {
      if (itemId.value === 0) {
        return allHex.value.filter(item => item.type === 1)
      } else if (itemId.value === 1) {
        return allHex.value.filter(item => item.type === 2)
      } else {
        return allHex.value.filter(item => item.type === 3)
      }
    })
    onMounted(() => {
      getAllEquip()
    })
    return {
      itemId,
      computeLevelList,
      selectItem,
      allHex,
      getAllEquip
    }
  }
}
</script>

<style lang="less" scoped>
.hex-container {
  margin-top: 3.25rem;
  position: relative;
  .active {
    color: #21ad73;
    font-weight: 600;
    border-bottom: 0.1875rem solid #21ad73;
  }
  .top {
    width: 100%;
    position: fixed;
    left: 0;
    top: 2.75rem;
    background: white;
    border-top: 0.0625rem solid rgb(236, 234, 234);
    border-bottom: 0.0625rem solid rgb(236, 234, 234);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .top-item {
      font-size: 1rem;
      padding: 0.25rem 0.125rem;
    }
  }
  .hex-list {
    margin-top: 5.75rem;
    margin-bottom: 3.25rem;
    .hex-item {
      display: flex;
      margin-bottom: 1.25rem;
      padding: 0.625rem 0.625rem;
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
          white-space: pre-wrap;
          text-align: justify; //两端对齐
        }
      }
    }
  }
}
</style>
