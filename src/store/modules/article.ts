import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { Article, ArticleRequestFilter, ArticleRequestBody } from '@/store/modules'
import store from '@/store'
import ApiService from '@/api'
import { AxiosResponse } from 'axios'

@Module({
  namespaced: true,
  dynamic: true,
  name: 'articleStore',
  store,
})
class ArticleModule extends VuexModule {
  public articles: Article[] = []
  public article: Article | null = null

  @Mutation
  public SET_ARTICLES (articles: Article[]) {
    this.articles = articles
  }

  @Mutation
  public UPDATE_ARTICLES (newArticle: Article) {
    const foundIndex = this.articles
      .findIndex(item => item.slug === newArticle.slug)

    if (foundIndex !== -1) {
      this.articles.splice(foundIndex, 1, newArticle)
    }
  }

  @Mutation
  public SET_ARTICLE (article: Article) {
    this.article = article
  }

  @Action({ rawError: true })
  public async GET_ARTICLES (filters?: ArticleRequestFilter ) {
    const opts = { params: filters }
    const { data }: AxiosResponse = await ApiService.get('articles', opts)
    this.context.commit('SET_ARTICLES', data.articles)
  }

  @Action({ rawError: true })
  public async GET_ARTICLE (slug: string) {
    const { data }: AxiosResponse = await ApiService.get(`articles/${slug}`)
    this.context.commit('SET_ARTICLE', data.article)
  }

  @Action({ rawError: true })
  public CREATE_ARTICLE (article: ArticleRequestBody) {
    ApiService.post('articles', { article })
  }

  @Action({ rawError: true })
  public async FAVORITE_ARTICLE (slug: string) {
    const { data }: AxiosResponse = await ApiService.post(`articles/${slug}/favorite`)
    this.context.commit('UPDATE_ARTICLES', data.article)
    this.context.commit('SET_ARTICLE', data.article)
  }

  @Action({ rawError: true })
  public async UNFAVORITE_ARTICLE (slug: string) {
    const { data }: AxiosResponse = await ApiService.delete(`articles/${slug}/favorite`)
    this.context.commit('UPDATE_ARTICLES', data.article)
    this.context.commit('SET_ARTICLE', data.article)
  }
}

export default getModule(ArticleModule)
