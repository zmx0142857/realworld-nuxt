<template>
<div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9" style="width:100%">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link class="nav-link"
                :class="{ active: tab === 'your_feed' }"
                :to="{
                  name: 'index',
                  query: { tab: 'your_feed' }
                }"
                exact
              >Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link"
                :class="{ active: tab === 'global_feed' }"
                :to="{
                  name: 'index',
                  query: { tab: 'global_feed' }
                }"
                exact
              >Global Feed</nuxt-link>
            </li>
            <li class="nav-item" v-if="tag">
              <nuxt-link class="nav-link active" :to="{
                name: 'index',
                query: { tag }
              }"
              >#{{ tag }}</nuxt-link>
            </li>
          </ul>
        </div>

        <!-- 文章列表 -->
        <div v-for="article in articles" :key="article.slug"
          class="article-preview"
        >
          <div class="article-meta">
            <nuxt-link :to="`/profile/${article.author.username}`">
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link :to="`/profile/${article.author.username}`"
                class="author">{{ article.author.username }}</nuxt-link>
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button
              class="btn btn-outline-primary btn-sm pull-xs-right"
              :class="{ active: article.favorited }"
              @click="toggleFavorite(article)"
              :disabled="article.favorited === null"
            >
              <i class="ion-heart"></i> {{ article.favoritesCount }}
            </button>
          </div>
          <nuxt-link :to="`/article/${article.slug}`" class="preview-link">
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>
        <p class="article-preview" v-if="!articles.length">No articles are here... yet.</p>
        <!-- /文章列表 -->

        <!-- 分页 -->
        <pagination :page="page" :total-pages="totalPages"
          name="index" :tag="tag" :tab="tab" />
        <!-- /分页 -->

      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link :to="`/?tag=${item}`" class="tag-pill tag-default"
              v-for="(item,i) in tags" :key="i"
            >{{ item }}</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import {
  getArticles,
  getArticlesFeed,
  toggleFavorite
} from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
import Pagination from '@/components/pagination'

export default {
  name: 'Home',
  components: { Pagination },
  // 需要 SEO 的数据, 放在 asyncData 中
  // asyncData 方法中不能使用 this
  async asyncData ({ query, store }) {
    const page = Number.parseInt(query.page) || 1
    const limit = 20
    const { tag } = query

    const fetchArticles = store.state.user && query.tab === 'your_feed'
      ? getArticlesFeed
      : getArticles

    const [
      { data: { articles, articlesCount } },
      { data: { tags } }
    ] = await Promise.all([
      fetchArticles({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])

    return {
      articles,
      page,
      totalPages: Math.ceil(articlesCount / limit),
      tags
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    tag () {
      return this.$route.query.tag
    },
    tab () {
      return this.$route.query.tab || (this.tag ? undefined : 'global_feed')
    }
  },
  methods: {
    toggleFavorite
  }
}
</script>

<style scoped>
</style>
