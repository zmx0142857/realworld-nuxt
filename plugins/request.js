import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io',
})

// nuxt 在初始化时加载插件, 为我们传入 context
export default function ({ store }) {
  // 设置请求拦截器
  request.interceptors.request.use(config => {
    // 正常情况, 请求经过这里
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = 'Token ' + user.token
    }
    // 返回配置对象, axios 就会发出请求
    return config
  }, err => Promise.reject(err)) // 如果请求还没发出去就失败, 执行这里
}
