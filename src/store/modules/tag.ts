import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { Tag } from '../modules'
import store from '@/store'
import ApiService from '@/api'
import { AxiosResponse } from 'axios'

@Module({
  namespaced: true,
  dynamic: true,
  name: 'tagStore',
  store,
})
class TagModule extends VuexModule {
  public tags: Tag[] = []

  @Mutation
  public SET_TAGS (tags: Tag[]) {
    this.tags = tags
  }

  @Action({ rawError: true })
  public async GET_TAGS () {
    const { data }: AxiosResponse = await ApiService.get('tags')
    this.context.commit('SET_TAGS', data.tags)
  }
}

export default getModule(TagModule)
