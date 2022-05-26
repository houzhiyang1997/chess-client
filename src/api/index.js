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

// 根据raceid获取英雄详情
const getRaceById = id => {
  return http({
    method: 'GET',
    url: `/getraceinfo?raceId=${id}`
  })
}

// 根据jobid获取英雄详情
const getJobById = id => {
  return http({
    method: 'GET',
    url: `/getjobinfo?jobId=${id}`
  })
}

// 根据equipid获取英雄详情
const getEquipById = id => {
  return http({
    method: 'GET',
    url: `/getequipinfo?equipId=${id}`
  })
}

export default {
  getNews,
  getDetailById,
  getTeams,
  getChessById,
  getRaceById,
  getJobById,
  getEquipById
}
