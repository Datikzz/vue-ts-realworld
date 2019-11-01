// import { MutationTree, ActionTree } from 'vuex'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { User, AuthRequestBody, RegisterRequestBody, SettingsRequestBody } from '../modules'
import store from '@/store'
import ApiService from '@/api'
import { AxiosResponse } from 'axios'

@Module({
  namespaced: true,
  dynamic: true,
  name: 'userStore',
  store,
})
class UserModule extends VuexModule {
  public user: User | null = null

  @Mutation
  public SET_USER (user: User) {
    this.user = user
  }

  @Mutation
  public REMOVE_USER () {
    this.user = null
  }

  // @Action({ commit: 'SET_USER' })
  @Action({ rawError: true })
  public async LOG_IN (userCreds: AuthRequestBody) {
    const payload = { user: userCreds }
    const { data }: AxiosResponse = await ApiService.post('users/login', payload)
    ApiService.setJWT(data.user.token) // meh, probably add lodash
    this.context.commit('SET_USER', data.user)
    // return data.user
  }

  @Action({ commit: 'SET_USER', rawError: true })
  public async REGISTER (userCreds: RegisterRequestBody) {
    const payload = { user: userCreds }
    const { data }: AxiosResponse = await ApiService.post('users', payload)
    ApiService.setJWT(data.user.token) // meh, probably add lodash
    return data.user
  }

  @Action({ commit: 'SET_USER', rawError: true })
  public async LOAD_USER (token: string) {
    ApiService.setJWT(token)
    const { data }: AxiosResponse = await ApiService.get('user')
    return data.user
  }

  @Action({ commit: 'SET_USER', rawError: true })
  public async UPDATE_USER (user: SettingsRequestBody) {
    const payload = { user }
    const { data }: AxiosResponse = await ApiService.put('user', payload)
    return data.user
  }

  @Action
  public LOG_OUT () {
    ApiService.deleteJWT()
    this.context.commit('REMOVE_USER')
  }

  get isLoggedIn () {
    return !!this.user
  }

  get username () {
    return this.user && this.user.username
  }
}

export default getModule(UserModule)
