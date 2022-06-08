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

// 获取全部英雄列表
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

// 获取全部race列表
const getAllRace = () => {
  return http({
    method: 'GET',
    url: '/getallrace'
  })
}

// 根据raceid获取race详情
const getRaceById = id => {
  return http({
    method: 'GET',
    url: `/getraceinfo?raceId=${id}`
  })
}

// 获取全部job列表
const getAllJob = () => {
  return http({
    method: 'GET',
    url: '/getalljob'
  })
}

// 根据jobid获取job详情
const getJobById = id => {
  return http({
    method: 'GET',
    url: `/getjobinfo?jobId=${id}`
  })
}

// 获取全部equip列表
const getAllEquip = () => {
  return http({
    method: 'GET',
    url: '/getallequip'
  })
}

// 根据equipid获取装备详情
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

// 获取全部hex列表
const getAllHex = () => {
  return http({
    method: 'GET',
    url: '/getallhex'
  })
}

// 获取全部小小英雄列表
const getAllHero = () => {
  return http({
    method: 'GET',
    url: '/getallhero'
  })
}

// 根据equipid获取海克斯详情
const getHexById = id => {
  return http({
    method: 'GET',
    url: `/gethexinfo?hexId=${id}`
  })
}
// 登录
const login = (username, password) => {
  return http({
    method: 'POST',
    url: '/login',
    data: {
      username: username,
      password: password
    }
  })
}

// 根据id获取用户详情
const getUserById = id => {
  return http({
    method: 'GET',
    url: `/getuserinfo?id=${id}`
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
  getHexById,
  getAllRace,
  getAllJob,
  getAllEquip,
  getAllHex,
  getAllHero,
  login,
  getUserById
}
