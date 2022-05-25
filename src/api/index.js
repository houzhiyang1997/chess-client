import http from '@/util/http.js'

// 获取全部新闻列表
const getNews = () => {
  return http({
    method: 'GET',
    url: '/getnews'
  })
}

// 根据id获取新闻详情
const getDetailById = id => {
  return http({
    method: 'GET',
    url: `/newsdetail?id=${id}`
  })
}

const getTeams = () => {
  return http({
    method: 'GET',
    url: '/getteams'
  })
}

export default {
  getNews,
  getDetailById,
  getTeams
}
