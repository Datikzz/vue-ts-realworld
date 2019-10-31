<template>
  <div id="app" v-if="isInitialized">
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import config from '@/config/index.ts'
import User from '@/store/modules/user'
import { mapGetters } from 'vuex'

@Component({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  computed: {
    ...mapGetters('user', {
      isLoggedIn: 'isLoggedIn',
    }),
  },
})
export default class App extends Vue {
  private isInitialized: boolean = false

  async created () {
    try {
      const token = localStorage.getItem(config.SUM_LOCAL_STORAGE_KEY_FUR_JWT)
      if (token) {
        await User.LOAD_USER(token)
      }
      this.isInitialized = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style lang="scss">
</style>
