<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link 
        :to="{ ...vueRoutes.profile, params: { username: article.author.username }}">
        <img :src="article.author.image" />
      </router-link>
      <div class="info">
        <router-link
          class="author"
          :to="{ ...vueRoutes.profile, params: { username: article.author.username }}">
          {{ article.author.username }}
        </router-link>
        <span class="date">{{ article.updatedAt | formatDateMD }}</span>
      </div>
      
      <button 
        class="btn btn-outline-primary btn-sm pull-xs-right"
        :class="{active: article.favorited}"
        :disabled="isPending"
        @click="toggleFavorite(article)">
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <router-link
      class="preview-link"
      :to="{ ...vueRoutes.article, params: { slug: article.slug }}">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li 
          class="tag-default tag-pill tag-outline"
          v-for="(tag, index) in article.tagList"
          :key="index">
          {{ tag }}
        </li>
      </ul>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Article } from '@/store/modules'
import ArticleModule from '@/store/modules/article'
import { vueRoutes } from '@/router/routes'

@Component({
  name: 'ArticlePreview',
  data: () => ({
    vueRoutes,
  }),
})
export default class ArticlePreview extends Vue {
  @Prop() article?: Article
  private isPending: boolean = false

  async toggleFavorite (article: Article) {
    this.isPending = true
    try {
      article.favorited
      ? await ArticleModule.UNFAVORITE_ARTICLE(article.slug)
      : await ArticleModule.FAVORITE_ARTICLE(article.slug)
    } catch (e) {
      console.error(e)
    }
    this.isPending = false
  }
}
</script>

<style lang="scss" scoped>
</style>
