module.exports = {
  router: {
    linkActiveClass: 'active',
    extendRoutes (routes, resolve) {
      routes.push(...[
        {
          path: '/register',
          name: 'register',
          component: resolve(__dirname, 'pages/login.vue')
        },
        {
          path: '/editor/:slug',
          name: 'edit-article',
          component: resolve(__dirname, 'pages/editor.vue')
        }
      ])
    }
  },
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ],
  server: {
    host: '0.0.0.0', // '0.0.0.0' 表示外部可访问; 默认是 'localhost'
    port: 3000
  }
}
