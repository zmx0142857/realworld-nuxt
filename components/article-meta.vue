<template>
  <div class="article-meta">
    <nuxt-link :to="`/profile/${article.author.username}`">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link :to="`/profile/${article.author.username}`"
        class="author">{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createdAt | date('MMMM DD, YYYY') }}</span>
    </div>
    <!-- 当前用户的文章, 展示修改和删除按钮 -->
    <template v-if="user.username === article.author.username">
      <nuxt-link class="btn btn-outline-secondary btn-sm"
        :to="`/editor/${article.slug}`">
        <i class="ion-edit"></i>&nbsp;Edit Article
      </nuxt-link>
      &nbsp;&nbsp;
      <button class="btn btn-outline-danger btn-sm"
        :disabled="pendingDelArticle"
        @click="onDelArticle">
        <i class="ion-trash-a"></i>&nbsp;Delete Article
      </button>
    </template>
    <!-- 其他用户的文章, 展示关注和点赞按钮 -->
    <template v-else>
    <button class="btn btn-sm btn-outline-secondary"
      :class="{ active: article.author.following }"
      @click="toggleFollow(article.author)"
      :disabled="article.author.following === null"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      {{ article.author.following ? 'Unfollow' : 'Follow' }} Author
      <span class="counter">({{ article.author.following ? 11 : 10 }})</span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary"
      :class="{ active: article.favorited }"
      @click="toggleFavorite(article)"
      :disabled="article.favorited === null"
    >
      <i class="ion-heart"></i>
      &nbsp;
      {{ article.favorited ? 'Favorited' : 'Favorite' }} Post
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
    </template>
  </div>
</template>

<script>
import { toggleFavorite, delArticle } from '@/api/article'
import { toggleFollow } from '@/api/user'
import { mapState } from 'vuex'

export default {
  name: 'ArticleMeta',
  props: {
    article: { type: Object, required: true }
  },
  data () {
    return {
      pendingDelArticle: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    toggleFavorite,
    toggleFollow,
    delArticle,
    async onDelArticle () {
      await this.delArticle(this.article.slug)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
