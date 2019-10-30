import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { Tag } from '../modules'
import store from '@/store'
import ApiService from '@/api'
import { AxiosResponse } from 'axios'

@Module({
  namespaced: true,
  dynamic: true,
  name: 'tag',
  store,
})
class TagModule extends VuexModule {
  tags: Tag[] = []

  @Mutation
  SET_TAGS (tags: Tag[]) {
    this.tags = tags
  }

  @Action({ rawError: true })
  async GET_TAGS () {
    const res: AxiosResponse = await ApiService.get('tags')
    this.context.commit('SET_TAGS', res.data.tags)
  }
}

export default getModule(TagModule)
