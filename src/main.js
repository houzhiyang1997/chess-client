import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import myVant from '@/util/vantImpl'
import VueLazyload from 'vue-lazyload'

const app = createApp(App)
app.use(VueLazyload, { loading: require('../src/assets/logo.png') })
// 循环挂载vant组件
myVant.forEach(vantComponent => app.use(vantComponent))
app.use(store).use(router).mount('#app')
