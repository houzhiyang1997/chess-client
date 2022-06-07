import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  plugins: [
    createPersistedState({
      // reducer 可以选择存储哪些state
      reducer: state => {
        return {
          userInfo: state.userInfo
        }
      }
    })
  ],
  state: {
    // 控制页面toast loading显示，防止连续请求闪现
    loadingCount: 0,
    // 控制底部隐藏
    isFooterShow: true,
    // 用户信息 因为要存到loaclstorage 为了安全只保存 id 和username
    // about页面发请求拿信息
    userInfo: {
      id: 0,
      username: ''
    }
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
    },
    // 用户信息控制
    setUserInfo(state, val) {
      state.userInfo.id = val.id
      state.userInfo.username = val.username
    }
  },
  actions: {},
  modules: {}
})
