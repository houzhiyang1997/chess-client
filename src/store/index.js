import { createStore } from 'vuex'

export default createStore({
  state: {
    // 控制底部隐藏
    isFooterShow: true
  },
  getters: {},
  mutations: {
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
