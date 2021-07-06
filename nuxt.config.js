module.exports = {
  router: {
    linkActiveClass: 'active',
    extendRoutes (routes, resolve) {
      routes.push(...[
        {
          path: '/register',
          name: 'register',
          component: resolve(__dirname, 'pages/login.vue')
        }
      ])
    }
  }
}

