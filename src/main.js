import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import myVant from '@/util/vantImpl'
const app = createApp(App)

// 循环挂载vant组件
myVant.forEach(vantComponent => app.use(vantComponent))
app.use(store).use(router).mount('#app')
