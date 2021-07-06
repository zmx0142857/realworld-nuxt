const cookieparser = process.server ? require('cookieparser') : undefined

// 把 state 定义为函数, 确保数据一致性
export const state = () => {
  return {
    user: null // 用户登录状态
  }
}

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export const actions = {
  // 在服务端初始化时自动调用, 该方法只运行在服务端渲染期间
  // 作用: 初始化容器数据, 并传递给客户端
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    // 从请求头读取 cookie
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
        console.log('cookie found, auto login')
      } catch (err) {
        // no valid cookie found
      }
    }
    // 传递给客户端
    commit('setUser', user)
  }
}
