import { createStore } from 'vuex'

export default createStore({
  state: {
    // 控制页面toast loading显示，防止连续请求闪现
    loadingCount: 0,
    // 控制底部隐藏
    isFooterShow: true
  },
  getters: {},
  mutations: {
    // loading控制
    setShowLoading(state, val) {
      state.loadingCount = val
    },
    // header隐藏与显示
    hiddenFooter(state) {
      state.isFooterShow = false
    },
    showFooter(state) {
      state.isFooterShow = true
    }
  },
  actions: {},
  modules: {}
})
