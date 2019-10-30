import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { Profile } from '../modules'
import store from '@/store'
import ApiService from '@/api'
import { AxiosResponse } from 'axios'

@Module({
  namespaced: true,
  dynamic: true,
  name: 'profile',
  store,
})
class ProfileModule extends VuexModule {
  profile: Profile | null = null

  @Mutation
  SET_PROFILE (profile: Profile) {
    this.profile = profile
  }

  @Action({ commit: 'SET_PROFILE', rawError: true })
  async GET_PROFILE (username: string) {
    const res: AxiosResponse = await ApiService.get(`profiles/${username}`)
    return res.data.profile
  }
  
  @Action({ commit: 'SET_PROFILE', rawError: true })
  async FOLLOW_PROFILE (username: string) {
    const res: AxiosResponse = await ApiService.post(`profiles/${username}/follow`)
    return res.data.profile
  }

  @Action({ commit: 'SET_PROFILE', rawError: true })
  async UNFOLLOW_PROFILE (username: string) {
    const res: AxiosResponse = await ApiService.delete(`profiles/${username}/follow`)
    return res.data.profile
  }
}

export default getModule(ProfileModule)
