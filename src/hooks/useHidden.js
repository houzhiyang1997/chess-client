import { onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

// 控制Footer在一些页面中的隐藏 解构引入此方法 调用即可
export const hiddenFooter = () => {
  // 不能在方法外调用 会是undefined
  const store = useStore()
  onMounted(() => {
    // 发起mutation 修改isheadershow
    store.commit('hiddenFooter')
  })
  onUnmounted(() => {
    store.commit('showFooter')
  })
}
