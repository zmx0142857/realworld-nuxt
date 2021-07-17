<template>
<div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form @submit.prevent="onSubmit">
          <fieldset class="form-group">
              <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="form.title">
          </fieldset>
          <fieldset class="form-group">
              <input type="text" class="form-control" placeholder="What's this article about?" v-model="form.description">
          </fieldset>
          <fieldset class="form-group">
              <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="form.body"></textarea>
          </fieldset>
          <fieldset class="form-group">
              <input type="text" class="form-control" placeholder="Enter tags, separated by commas" v-model="tagStr"><div class="tag-list"></div>
          </fieldset>
          <button class="btn btn-lg pull-xs-right btn-primary">
              {{ slug ? 'Update' : 'Publish' }} Article
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { getArticle, addArticle, setArticle } from '@/api/article'

export default {
  name: 'Editor',
  middleware: 'auth',
  data () {
    return {
      tagStr: '',
      form: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },
  computed: {
    slug () {
      return this.$route.params.slug
    }
  },
  async created () {
    if (this.slug) {
      const { data } = await getArticle(this.slug)
      this.form = data.article
      this.tagStr = this.form.tagList.join(', ')
    }
  },
  methods: {
    async onSubmit () {
      this.form.tagList = this.tagStr.split(',').map(tag => tag.trim())
      const { data } = await (
        this.slug ?
        setArticle(this.slug, this.form) :
        addArticle(this.form)
      )
      this.$router.push(`/article/${data.article.slug}`)
    }
  }
}
</script>

<style scoped>
</style>
