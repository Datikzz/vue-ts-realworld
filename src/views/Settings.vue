<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="submit">
            <fieldset>
                <fieldset class="form-group">
                  <input 
                    class="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    :disabled="isPending"
                    v-model="form.image">
                </fieldset>
                <fieldset class="form-group">
                  <input 
                    class="form-control form-control-lg" 
                    type="text" 
                    placeholder="Your Name"
                    :disabled="isPending"
                    v-model="form.username">
                </fieldset>
                <fieldset class="form-group">
                  <textarea 
                    class="form-control form-control-lg"
                    rows="8" 
                    placeholder="Short bio about you"
                    :disabled="isPending"
                    v-model="form.bio"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input 
                    class="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    readonly
                    v-model="form.email">
                </fieldset>
                <fieldset class="form-group">
                  <input 
                    class="form-control form-control-lg" 
                    type="password" 
                    placeholder="Password"
                    :disabled="isPending"
                    v-model="form.oldPassword">
                </fieldset>
                <fieldset class="form-group">
                  <input 
                    class="form-control form-control-lg" 
                    type="password" 
                    placeholder="Password"
                    :disabled="isPending"
                    v-model="form.password">
                </fieldset>
                <fieldset class="form-group">
                  <input 
                    class="form-control form-control-lg" 
                    type="password" 
                    placeholder="Confirm password"
                    :disabled="isPending"
                    v-model="form.confirmPassword">
                </fieldset>
                <button
                  class="btn btn-lg btn-primary pull-xs-right"
                  :disabled="isPending"
                  type="submit">
                  Update Settings
                </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SettingsForm } from '@/store/modules'
import UserModule from '@/store/modules/user'

@Component({
  name: 'Settings-page',
})
export default class SettingsPage extends Vue {
  private isPending: boolean = false
  private form: SettingsForm = {
    bio: '',
    image: '',
    username: '',
    email: '',
    password: '',
    oldPassword: '',
    confirmPassword: '',
  }

  created () {
    this.populateForm()
  }

  populateForm () {
    this.form = {
      ...this.form,
      bio: this.user.bio,
      image: this.user.image,
      username: this.user.username,
      email: this.user.email,
    }
  }

  async submit () {
    this.isPending = true
    try {
      await UserModule.UPDATE_USER(this.form)
    } catch (e) {
      console.error(e)
    }
    this.isPending = false
  }

  get user () {
    return UserModule.user!
  }
}
</script>
