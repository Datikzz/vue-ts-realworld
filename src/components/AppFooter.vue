<template>
  <footer>
    <div class="container">
      <router-link 
        :to='vueRoutes.home.name'
        class="logo-font">
        conduit
      </router-link>
      <span class="attribution">
        An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
      </span>
    </div>
  </footer>  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vueRoutes } from '@/router/routes'

@Component({
  name: 'AppFooter',
  data: () => ({
    vueRoutes,
  }),
})
export default class AppFooter extends Vue {
}
</script>

<style lang="scss" scoped>

</style>