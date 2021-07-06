<template>
<div>
  <nav class="navbar navbar-light">
    <div class="container">
      <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/editor">
            <i class="ion-compose"></i>&nbsp;New Post
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/settings">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/profile/1">
            <img class="user-pic" src="https://zmx0142857.gitee.io/note/img/pikachu.png" alt="">
            lpz999
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>

  <nuxt/>

  <footer>
    <div class="container">
      <a href="/" class="logo-font">conduit</a>
      <span class="attribution">
        An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
      </span>
    </div>
  </footer>
</div>
</template>
