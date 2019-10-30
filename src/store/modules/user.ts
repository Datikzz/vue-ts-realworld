// import { MutationTree, ActionTree } from 'vuex'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { User, AuthRequestBody, RegisterRequestBody } from '../modules'
import store from '@/store'
import ApiService from '@/api'
import { AxiosResponse } from 'axios'

@Module({
  namespaced: true,
  dynamic: true,
  name: 'user',
  store,
})
class UserModule extends VuexModule {
  user: User | null = null

  @Mutation
  SET_USER (user: User) {
    this.user = user
  }

  @Mutation
  REMOVE_USER () {
    this.user = null
  }

  // @Action({ commit: 'SET_USER' })
  @Action({ rawError: true })
  async login (userCreds: AuthRequestBody) {
    const payload = { 'user': userCreds }
    const res: AxiosResponse = await ApiService.post('users/login', payload)
    ApiService.setJWT(res.data.user.token) // meh, probably add lodash
    this.context.commit('SET_USER', res.data.user)
    // return res.data.user
  }

  @Action({ commit: 'SET_USER', rawError: true })
  async register (userCreds: RegisterRequestBody) {
    const payload = { 'user': userCreds }
    const res: AxiosResponse = await ApiService.post('users', payload)
    ApiService.setJWT(res.data.user.token) // meh, probably add lodash
    return res.data.user
  }

  @Action({ commit: 'SET_USER', rawError: true })
  async loadUser (token: string) {
    ApiService.setJWT(token)
    const res: AxiosResponse = await ApiService.get('user')
    return res.data.user
  }

  @Action
  logout () {
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
