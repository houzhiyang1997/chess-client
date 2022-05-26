import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/team' },
  { path: '/news', component: () => import('@/views/News.vue') },
  { path: '/newsdetail/:id', component: () => import('@/views/News/NewsDetail.vue'), props: true },
  { path: '/team', component: () => import('@/views/Team.vue') },
  { path: '/chessinforefresh/:id', component: () => import('@/views/Team/ChessInfoRefresh.vue'), props: true },
  { path: '/databoard', component: () => import('@/views/DataBoard.vue') },
  { path: '/infolib', component: () => import('@/views/InfoLib.vue') },
  { path: '/aboutme', component: () => import('@/views/AboutMe.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
