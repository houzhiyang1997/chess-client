import axios from 'axios'
import { Toast } from 'vant'

// const http = axios.create({
//   baseURL: 'http://106.12.140.161:5000',
//   timeout: 5000
// })

const http = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 5000
})

// 拦截器
http.interceptors.request.use(
  config => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    Toast.clear()
    return response
  },
  error => {
    Toast.clear()
    return Promise.reject(error)
  }
)

export default http
