<template>
  <div class="login-page">
    <h1 class="text-xs-center">Sign in</h1>

    <router-link 
      :to="vueRoutes.register.name"
      class="text-xs-center">
      Need an account?
    </router-link>

    <ul class="error-messages" v-if="errorMsgs.length">
      <li 
        v-for="(msg, index) in errorMsgs"
        :key="index">
        {{ msg }}
      </li>
    </ul>

    <form @submit.prevent="submitLogin">
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
        type="submit">
        Sign in
      </button>
    </form>
  </div>  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vueRoutes } from '@/router/routes'
import User from '@/store/modules/user'
// import { mapActions } from 'vuex'
@Component({
  name: 'Login-page',
  data: () => ({
    vueRoutes,
  }),
  // methods: {
  //   ...mapActions('user', {
  //     login: 'login',
  //   })
  // },
})
export default class Login extends Vue {
  private form = {
    email: '',
    password: '',
  }
  private errorMsgs: string[] = []

  private async submitLogin () {
    try {
      await User.LOG_IN({
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
