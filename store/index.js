// 仅在服务端引入这个包
const cookieparser = process.server ? require('cookieparser') : undefined

// 仅在客户端引入这个包
const Cookie = process.client ? require('js-cookie') : undefined

// 把 state 定义为函数, 确保数据一致性
export const state = () => {
  return {
    user: null // 用户登录状态
  }
}

export const mutations = {
  async setUser (state, user) {
    state.user = user
  },
  setCookie (state, user) {
    // 1. 登录状态持久化: 刷新浏览器, cookie 仍存在.
    // 该 cookie 会随着刷新的请求一起发送到服务端.
    // 服务端从 cookie 中取出数据, 存入 vuex 即可.
    // 2. 为避免 CSRF 攻击, 建议为 cookie 设置 SameSite 属性
    // http://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html
    if (user) {
      Cookie.set('user', user, { SameSite: 'Lax' })
    } else {
      Cookie.remove('user')
    }
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
