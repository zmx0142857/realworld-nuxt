<template>
<div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form @submit.prevent="onUpdateSettings">
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="form.image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="form.username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="form.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="form.email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="form.password" minlength="8">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
          </fieldset>
        </form>

        <!-- logout -->
        <hr>
        <button class="btn btn-outline-danger" @click="logout()">
          Or click here to logout.
        </button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { setProfile } from '@/api/user'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Settings',
  middleware: 'auth',
  data () {
    return {
      form: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.form = { ...this.user } // 浅拷贝没有问题, 因为都是基本类型
  },
  methods: {
    ...mapMutations(['setUser', 'setCookie']),
    logout () {
      this.setUser(null)
      this.setCookie(null)
      this.$router.push('/')
    },
    async onUpdateSettings () {
      const keys = ['email', 'username', 'password', 'image', 'bio']
      const user = {}
      // 过滤出变化了的, 且非空的字段
      for (const key of keys) {
        const newVal = this.form[key]
        if (newVal && newVal !== this.user[key]) {
          user[key] = newVal
        }
      }
      const { data } = await setProfile(user)
      data.user.image = this.user.image
      this.setUser(data.user)
    }
  }
}
</script>

<style scoped>
</style>
