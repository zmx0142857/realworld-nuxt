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
  ]
}
