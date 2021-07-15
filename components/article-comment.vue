<template>
  <div>
    <!-- 必须阻止 form 的默认提交行为 -->
    <form class="card comment-form" @submit.prevent="onPostComment">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="commentBody"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary"
          :disabled="pendingPostComment"
        >Post Comment</button>
      </div>
    </form>
    
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="`/profile/${comment.author.username}`"
          class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="`/profile/${comment.author.username}`"
          class="comment-author">{{ comment.author.username }}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>

        <button class="btn btn-sm btn-outline-danger pull-xs-right"
          v-if="comment.author.username === user.username"
          @click="onDelComment(comment)"
          :disabled="comment.pendingDelete"
        >Delete</button>
      </div>
    </div>

  </div>
</template>

<script>
import {
  getComments,
  addComment,
  delComment
} from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'ArticleComment',
  props: {
    article: { type: Object, required: true }
  },
  // 评论不需要 SEO
  data () {
    return {
      comments: [],
      pendingPostComment: false,
      commentBody: ''
    }
  },
  created () {
    this.fetchComment()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async fetchComment () {
      const { data } = await getComments(this.article.slug)
      data.comments.forEach(comment => {
        comment.pendingDelete = false
      })
      this.comments = data.comments
    },
    async onPostComment () {
      const body = this.commentBody.trim()
      if (body) {
        this.commentBody = ''
        this.pendingPostComment = true
        await addComment(this.article.slug, body)
        await this.fetchComment()
        this.pendingPostComment = false
      }
    },
    async onDelComment (comment) {
      comment.pendingDelete = true
      await delComment(this.article.slug, comment.id)
      await this.fetchComment()
      comment.pendingDelete = false
    }
  }
}
</script>

<style scoped>
</style>
