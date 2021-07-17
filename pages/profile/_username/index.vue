<template>
<div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{ profile.username }}</h4>
          <p>{{ profile.bio }}</p>
          <!-- 用户自己, 展示 settings 按钮 -->
          <nuxt-link class="btn btn-sm btn-outline-secondary action-btn"
            v-if="profile.username === user.username"
            to="/settings"
          >
            <i class="ion-gear-a"></i>
            &nbsp;
            Edit Profile Settings
          </nuxt-link>
          <!-- 其他用户, 展示关注按钮 -->
          <button class="btn btn-sm btn-outline-secondary pull-xs-right"
            v-else
            :class="{ active: profile.following }"
            @click="toggleFollow(profile)"
            :disabled="profile.following === null"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            {{ profile.following ? 'Unfollow' : 'Follow' }}
            {{ profile.username }}
          </button>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link class="nav-link"
                :class="{ active: tab === 'my' }"
                :to="{
                  name: 'profile-username',
                  query: { tab: 'my' }
                }"
                exact
              >My Articles</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link"
                :class="{ active: tab === 'favorites' }"
                :to="{
                  name: 'profile-username',
                  query: { tab: 'favorites' }
                }"
                exact
              >Favorited Articles</nuxt-link>
            </li>
          </ul>
        </div>

        <!-- 文章列表 -->
        <article-list :articles="articles" />

        <!-- 分页 -->
        <pagination v-if="totalPages > 1" name="profile-username"
          :page="page" :total-pages="totalPages" :tab="tab" />

      </div>
    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import { getProfile, toggleFollow } from '@/api/user'
import { getArticles } from '@/api/article'
import ArticleList from '@/components/article-list'
import Pagination from '@/components/pagination'

export default {
  name: 'Profile',
  middleware: 'auth',
  components: { ArticleList, Pagination },
  async asyncData ({ params, query }) {
    const limit = 5
    const page = Number.parseInt(query.page) || 1
    const queryParams = {}
    if (query.tab === 'favorites') {
      queryParams.favorited = params.username
    } else {
      queryParams.author = params.username
    }

    const [
      { data: { profile } },
      { data: { articles, articlesCount } }
    ] = await Promise.all([
      getProfile(params.username),
      getArticles({
        limit,
        offset: (page - 1) * limit,
        ...queryParams
      })
    ])

    return {
      profile,
      articles,
      page,
      totalPages: Math.ceil(articlesCount / limit),
    }
  },
  computed: {
    ...mapState(['user']),
    tab () {
      return this.$route.query.tab || 'my'
    }
  },
  watchQuery: ['page', 'tab'],
  head () {
    return {
      title: `Profile of ${this.profile.username} - RealWorld`,
    }
  },
  methods: {
    toggleFollow
  }
}
</script>
