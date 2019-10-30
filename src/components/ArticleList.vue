<template>
  <div class="article-preview">
    <template v-if="articles && articles.length">
      <article-preview 
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
    </template>
    <template v-else>
      <h1>No articles :c</h1>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ArticleRequestFilter } from '@/store/modules'
import { vueRoutes } from '@/router/routes'
import ArticlePreview from '@/components/ArticlePreview.vue'
import Article from '@/store/modules/article'
 
@Component({
  name: 'ArticleList',
  components: {
    ArticlePreview,
  },
  data: () => ({
    vueRoutes,
  }),
})
export default class ArticleList extends Vue {
  @Prop() byFilters!: ArticleRequestFilter

  async created () {
    await this.fetchList()
  }

  async fetchList () {
    try {
      await Article.GET_ARTICLES(this.byFilters)
    } catch (e) {
      console.error(e)
    }
  }

  get articles () {
    return Article.articles
  }

  @Watch('byFilters')
  byFiltersHandler () {
    this.fetchList()
  }
}
</script>

<style lang="scss" scoped>
</style>
