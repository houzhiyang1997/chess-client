import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/team' },
  { path: '/news', component: () => import('@/views/News.vue') },
  { path: '/newsdetail/:id', component: () => import('@/views/News/NewsDetail.vue'), props: true },
  { path: '/team', component: () => import('@/views/Team.vue') },
  { path: '/chessinforefresh/:id', component: () => import('@/views/Team/ChessInfoRefresh.vue'), props: true },
  { path: '/teamdetail/:teamId', component: () => import('@/views/Team/TeamDetail.vue'), props: true },
  { path: '/databoard', component: () => import('@/views/DataBoard.vue') },
  {
    path: '/infolib',
    redirect: '/infolib/chess',
    component: () => import('@/views/InfoLib.vue'),
    children: [
      { path: 'chess', component: () => import('@/views/InfoLib/Chess.vue') },
      { path: 'equipment', component: () => import('@/views/InfoLib/Equipment.vue') },
      { path: 'race', component: () => import('@/views/InfoLib/Race.vue') },
      { path: 'hex', component: () => import('@/views/InfoLib/Hex.vue') },
      { path: 'smallhero', component: () => import('@/views/InfoLib/SmallHero.vue') }
    ]
  },
  { path: '/aboutme', component: () => import('@/views/AboutMe.vue') },
  { path: '/login', component: () => import('@/views/Login.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/aboutme') {
    const token = localStorage.getItem('token')
    if (token) {
      next() // 访问的是后台主页，且有 token的值
    } else {
      next('/login') // 访问的是后台主页，但是没有token的值
    }
  } else {
    next() // 访问的不是后台主页，直接放行
  }
})

export default router
