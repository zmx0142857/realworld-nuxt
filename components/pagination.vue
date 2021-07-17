<template>
  <nav class="nav">
    <ul class="pagination">
      <li class="page-item"
        v-for="n in Math.min(totalPages, 5)" :key="n"
        :class="{ active: page === n }"
      >
        <nuxt-link class="page-link" :to="linkTo(n)">{{ n }}</nuxt-link>
      </li>
      <!-- TODO: 中间部分的链接如何展示? -->
      <li class="page-item" v-if="totalPages > 10">
        <a class="page-link" href="javascript:void 0">...</a>
      </li>
      <li class="page-item"
        v-for="n in Math.min(Math.max(totalPages-5, 0), 5)"
        :key="lastPages(n)"
        :class="{ active: page === lastPages(n) }"
      >
        <nuxt-link class="page-link" :to="linkTo(lastPages(n))"
        >{{ lastPages(n) }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    page: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    name: { type: String, required: true },
    tag: { type: String },
    tab: { type: String }
  },
  methods: {
    lastPages (n) {
      return Math.max(this.totalPages-5, 5) + n
    },
    linkTo (page) {
      const { name, tag, tab } = this
      return {
        name, query: { page, tag, tab }
      }
    }
  }
}
</script>
