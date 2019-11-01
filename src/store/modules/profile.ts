import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { Profile } from '../modules'
import store from '@/store'
import ApiService from '@/api'
import { AxiosResponse } from 'axios'

@Module({
  namespaced: true,
  dynamic: true,
  name: 'profileStore',
  store,
})
class ProfileModule extends VuexModule {
  public profile: Profile | null = null

  @Mutation
  public SET_PROFILE (profile: Profile) {
    this.profile = profile
  }

  @Action({ commit: 'SET_PROFILE', rawError: true })
  public async GET_PROFILE (username: string) {
    const { data }: AxiosResponse = await ApiService.get(`profiles/${username}`)
    return data.profile
  }

  @Action({ commit: 'SET_PROFILE', rawError: true })
  public async FOLLOW_PROFILE (username: string) {
    const { data }: AxiosResponse = await ApiService.post(`profiles/${username}/follow`)
    return data.profile
  }

  @Action({ commit: 'SET_PROFILE', rawError: true })
  public async UNFOLLOW_PROFILE (username: string) {
    const { data }: AxiosResponse = await ApiService.delete(`profiles/${username}/follow`)
    return data.profile
  }
}

export default getModule(ProfileModule)
