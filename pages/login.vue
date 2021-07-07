<template>
<div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{ titleText }}</h1>
        <p class="text-xs-center">
          <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
          <nuxt-link v-else to="/login">Have an account?</nuxt-link>
        </p>

        <ul class="error-messages">
          <!-- note: template cannot be keyed -->
          <template v-for="(msgs, key) in errors">
            <li v-for="(msg, i) in msgs" :key="key+'-'+i">{{ key }} {{ msg }}</li>
          </template>
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset v-if="!isLogin" class="form-group">
            <input v-model="userForm.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
          </fieldset>
          <fieldset class="form-group">
            <input v-model="userForm.email" class="form-control form-control-lg" type="email" placeholder="Email" required>
          </fieldset>
          <fieldset class="form-group">
            <input v-model="userForm.password" class="form-control form-control-lg" type="password" placeholder="Password" required minlength="8">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{ titleText }}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { login, register } from '@/api/user'

// 仅在客户端引入这个包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'Login',
  middleware: 'unauth',
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    },
    titleText () {
      return this.isLogin ? 'Sign in' : 'Sign up'
    }
  },
  data () {
    return {
      userForm: {
        username: '',
        email: '',
        password: ''
      },
      /*
      errors: {
        'That email': ['is already taken', 'is out of reach'],
        'The password': ['must contain letters and numbers', 'length must be at least 8']
      }
      */
      errors: {}
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 这一行若放在 try 外面, 请求就出现 CORS 问题, 为什么?
        const loginOrRegister = this.isLogin ? login : register
        const { data } = await loginOrRegister({ user: this.userForm })

        // 默认头像
        data.user.image = data.user.image || 'https://zmx0142857.gitee.io/note/img/pikachu.png'

        // 保存登录状态
        this.$store.commit('setUser', data.user)

        // 1. 登录状态持久化: 刷新浏览器, cookie 仍存在.
        // 该 cookie 会随着刷新的请求一起发送到服务端.
        // 服务端从 cookie 中取出数据, 存入 vuex 即可.
        // 2. 为避免 CSRF 攻击, 建议为 cookie 设置 SameSite 属性
        // http://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html
        Cookie.set('user', data.user, { SameSite: 'Lax' })

        this.$router.push('/')
      } catch (e) {
        // console.dir(e)
        console.error(e.response.data)
        this.errors = e.response.data.errors
      }
    }
  }
}
</script>

<style scoped>
</style>
