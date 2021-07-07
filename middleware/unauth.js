// 若用户已经登陆, 就不必再访问登录/注册页了
export default function ({ store, redirect }) {
  if (store.state.user) {
    return redirect('/')
  }
}

