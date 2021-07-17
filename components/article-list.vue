<template>
  <div>
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
  </div>
</template>

<script>
import { toggleFavorite } from '@/api/article'

export default {
  props: {
    articles: { type: Array, required: true }
  },
  methods: { toggleFavorite }
}
</script>
