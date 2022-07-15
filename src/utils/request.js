// 封装axios模块
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // baseURL: 'http://toutiao.itheima.net/' // 基础路径
  baseURL: 'http://42.192.129.12:8000/'
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // 请求发送会经过这里
    // config：本次请求的配置对象
    // Do something before request is sent
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    console.log(config)
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
export default request
