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

// 获取阵容信息
const getTeams = () => {
  return http({
    method: 'GET',
    url: '/getteams'
  })
}

// 根据chessid获取英雄详情
const getChessById = id => {
  return http({
    method: 'GET',
    url: `/getchessinfo?chessId=${id}`
  })
}

export default {
  getNews,
  getDetailById,
  getTeams,
  getChessById
}
