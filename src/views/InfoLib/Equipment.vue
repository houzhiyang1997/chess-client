<template>
  <div class="equipment-container">
    <div class="title">装备列表</div>
    <div class="equip-list">
      <div class="equip-item" v-for="equip in allEquip" :key="equip.equipId">
        <div class="left" v-lazy-container="{ selector: 'img' }">
          <img :data-src="equip.imagePath" />
        </div>
        <div class="right">
          <div class="name">{{ equip.name }}</div>
          <div class="effect">效果</div>
          <div class="content">{{ equip.effect }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import api from '@/api/index'
export default {
  setup() {
    // 装备列表
    const allEquip = ref([])
    const getAllEquip = async () => {
      const { data: res } = await api.getAllEquip()
      console.log(res)
      allEquip.value = res.allEquip
    }
    onMounted(() => {
      getAllEquip()
    })
    return {
      allEquip,
      getAllEquip
    }
  }
}
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
    margin-bottom: 52px;
    .equip-item {
      display: flex;
      margin-bottom: 1.25rem;
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
