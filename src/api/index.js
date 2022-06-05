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

// 获取阵容信息
const getTeamById = teamId => {
  return http({
    method: 'GET',
    url: `getteambyid?teamId=${teamId}`
  })
}

// 获取全部新闻列表
const getAllChess = () => {
  return http({
    method: 'GET',
    url: '/getallchess'
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

// 获取协同英雄信息 传递id是为了过筛当前英雄不会重复添加
const getSimilar = (jobs, races, id) => {
  return http({
    method: 'GET',
    url: `/getsimilar?jobs=${jobs}&races=${races}&id=${id}`
  })
}

// 根据equipid获取英雄详情
const getHexById = id => {
  return http({
    method: 'GET',
    url: `/gethexinfo?hexId=${id}`
  })
}

export default {
  getNews,
  getDetailById,
  getTeams,
  getTeamById,
  getAllChess,
  getChessById,
  getRaceById,
  getJobById,
  getEquipById,
  getSimilar,
  getHexById
}
