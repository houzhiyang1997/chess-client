<template>
  <div class="team-container">
    <div class="top">{{ store.state.version === '12.11' ? '巨龙之境' : '霓虹之夜' }}</div>
    <div class="content">
      <div class="content-top">
        <div class="title">推荐阵容 版本：{{ store.state.version }}</div>
        <div class="info" @click="showPicker = true">点此可切换赛季版本</div>
      </div>
      <div class="main">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <team-item v-for="item in teamList" :key="item" :info="item" :top="true" :foot="true"></team-item>
        </van-list>
      </div>
    </div>
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker title="赛季选择" :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
import teamItem from '@/components/Team/TeamItem.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import api from '@/api/index'
import { ref } from 'vue'

export default {
  name: 'team',
  components: {
    teamItem
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    //
    const teamList = ref([])
    const loading = ref(false)
    const finished = ref(false)

    // 获取全部阵容列表 对应team表，for渲染每一项
    const getTeam = async () => {
      const { data: res } = await api.getTeams()
      console.log(res)
      teamList.value = res.teams
    }

    const onLoad = () => {
      // 异步更新数据
      getTeam()
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      loading.value = false
      // 数据全部加载完成
      finished.value = true
    }

    // 赛季选择弹出框
    const columns = [
      { text: 'S7-巨龙之境', val: '12.11' },
      { text: 'S6-霓虹之夜', val: '12.9' },
      { text: '等待更新', disabled: true }
    ]
    const result = ref('')
    const showPicker = ref(false)

    const onConfirm = value => {
      store.commit('setVersion', value.val)
      result.value = value
      showPicker.value = false
      router.go(0)
    }

    return {
      store,
      teamList,
      onLoad,
      loading,
      finished,
      getTeam,
      columns,
      result,
      showPicker,
      onConfirm
    }
  }
}
</script>

<style lang="less" scoped>
.team-container {
  padding: 0.625rem 0.625rem;
  .top {
    text-align: center;
    background: #31c27c;
    height: 2rem;
    line-height: 2rem;
    color: white;
    border-radius: 0.3125rem;
    font-weight: 600;
    font-size: 1rem;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
  }
  .content {
    padding-top: 1.375rem;
    .content-top {
      margin-top: 0.625rem;
      height: 1.5rem;
      line-height: 1.5rem;
      border-left: 0.3125rem solid #31c27c;
      display: flex;
      align-items: center;
      .title {
        padding-left: 0.3125rem;
      }
      .info {
        padding-left: 0.625rem;
        font-size: 0.75rem;
        color: grey;
      }
    }
  }
  .main {
    padding-top: 0.625rem;
  }
}
</style>
