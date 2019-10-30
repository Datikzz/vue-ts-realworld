import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { Article, ArticleRequestFilter, ArticleRequestBody } from '@/store/modules'
import store from '@/store'
import ApiService from '@/api'
import { AxiosResponse } from 'axios'

@Module({
  namespaced: true,
  dynamic: true,
  name: 'article',
  store,
})
class ArticleModule extends VuexModule {
  articles: Article[] = []
  article: Article | null = null

  @Mutation
  SET_ARTICLES (articles: Article[]) {
    this.articles = articles
  }

  @Mutation
  UPDATE_ARTICLES (newArticle: Article) {
    const foundIndex = this.articles
      .findIndex(item => item.slug === newArticle.slug)

    if (foundIndex !== -1) {
      this.articles.splice(foundIndex, 1, newArticle)
    }
  }

  @Mutation
  SET_ARTICLE (article: Article) {
    this.article = article
  }

  @Action({ rawError: true })
  async GET_ARTICLES (filters?: ArticleRequestFilter ) {
    const opts = { params: filters }
    const res: AxiosResponse = await ApiService.get('articles', opts)
    this.context.commit('SET_ARTICLES', res.data.articles)
  }

  @Action({ rawError: true })
  async GET_ARTICLE (slug: string) {
    const res: AxiosResponse = await ApiService.get(`articles/${slug}`)
    this.context.commit('SET_ARTICLE', res.data.article)
  }

  @Action({ rawError: true })
  CREATE_ARTICLE (article: ArticleRequestBody) {
    ApiService.post('articles', { article })
  }

  @Action({ rawError: true })
  async FAVORITE_ARTICLE (slug: string) {
    const res: AxiosResponse = await ApiService.post(`articles/${slug}/favorite`)
    this.context.commit('UPDATE_ARTICLES', res.data.article)
    this.context.commit('SET_ARTICLE', res.data.article)
  }

  @Action({ rawError: true })
  async UNFAVORITE_ARTICLE (slug: string) {
    const res: AxiosResponse = await ApiService.delete(`articles/${slug}/favorite`)
    this.context.commit('UPDATE_ARTICLES', res.data.article)
    this.context.commit('SET_ARTICLE', res.data.article)
  }
}

export default getModule(ArticleModule)