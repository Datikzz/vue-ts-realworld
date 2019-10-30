<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <router-link 
            :to='vueRoutes.login.name'
            class="text-xs-center">
            Have an account?
          </router-link>

          <ul class="error-messages" v-if="errorMsgs.length">
            <li 
              v-for="(msg, index) in errorMsgs"
              :key="index">
              {{ msg }}
            </li>
          </ul>

          <form @submit.prevent="signUp">
            <fieldset class="form-group">
              <input 
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model.trim="form.username">
            </fieldset>
            <fieldset class="form-group">
              <input 
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model.trim="form.email">
            </fieldset>
            <fieldset class="form-group">
              <input 
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="form.password">
            </fieldset>
            <button 
              class="btn btn-lg btn-primary pull-xs-right"
              type='submit'>
              Sign up
            </button>
          </form>

        </div>
      </div>
    </div>
  </div>  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vueRoutes } from '@/router/routes'
import User from '@/store/modules/user'

@Component({
  name: 'Sign-up-page',
  data: () => ({
    vueRoutes,
  }),
})
export default class SignUp extends Vue {
  private form = {
    username: '',
    email: '',
    password: '',
  }
  private errorMsgs: string[] = []

  private async signUp () {
    try {
      await User.register({
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
      })
      this.$router.push(vueRoutes.home)
    } catch (e) {
      this.processError(e)
    }
  }

  private processError (e: any) {
    const errorData = e.response.data.errors
    this.errorMsgs = Object.entries(errorData).map((item) => item.join(' '))
  }
}
</script>
