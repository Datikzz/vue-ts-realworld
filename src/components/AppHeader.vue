<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link 
        :to='vueRoutes.home.path'
        class="navbar-brand">
        conduit
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link 
            :to='vueRoutes.home.path'
            class="nav-link"
            :class="{'active': $route.path === vueRoutes.home.path }">
            Home
          </router-link>
        </li>
        <template v-if='isLoggedIn'>
          <li class="nav-item">
            <router-link 
              :to='vueRoutes.editor.path'
              class="nav-link"
              :class="{'active': $route.path === vueRoutes.editor.path }">
              <i class="ion-compose"></i>&nbsp;New Post
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              :to='vueRoutes.settings.path'
              class="nav-link"
              :class="{'active': $route.path === vueRoutes.settings.path }">
              <i class="ion-gear-a"></i>&nbsp;
              Settings
            </router-link>
          </li>
          <li class="nav-item">
            <a 
              class="nav-link nav-logout-btn"
              @click.prevent="logOutUser">
              Logout
            </a>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link 
              :to='vueRoutes.register.path'
              class="nav-link"
              :class="{'active': $route.path === vueRoutes.register.path }">
              Sign up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vueRoutes } from '@/router/routes'
import { mapGetters } from 'vuex'
import User from '@/store/modules/user'

@Component({
  name: 'AppHeader',
  data: () => ({
    vueRoutes,
  }),
  computed: {
    ...mapGetters('userStore', {
      isLoggedIn: 'isLoggedIn',
    }),
  },
})
export default class AppHeader extends Vue {
  logOutUser () {
    User.LOG_OUT()
    location.reload()
  }
}
</script>

<style lang="scss" scoped>
  .nav-logout-btn {
    &:hover {
      cursor: pointer;
    }
  }
</style>