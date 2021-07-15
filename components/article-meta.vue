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
    <button class="btn btn-sm btn-outline-secondary"
      :class="{ active: article.author.following }"
      @click="toggleFollow(article.author)"
      :disabled="article.author.following === null"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      {{ article.author.following ? 'Following' : 'Follow' }} Author
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
  </div>
</template>

<script>
import { toggleFavorite } from '@/api/article'
import { toggleFollow } from '@/api/user'
export default {
  name: 'ArticleMeta',
  props: {
    article: { type: Object, required: true }
  },
  methods: {
    toggleFavorite,
    toggleFollow
  }
}
</script>

<style scoped>
</style>
