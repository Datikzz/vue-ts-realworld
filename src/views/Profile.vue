<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div
            class="col-xs-12 col-md-10 offset-md-1"
            v-if="isLoaded">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              v-if="!isCurrentUser"
              class="btn btn-sm btn-outline-secondary action-btn profile-page__btn"
              :class="{'active': isFollowing}"
              :disabled="isPending"
              @click="toggleSubscription">
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ isFollowing ? 'Unfollow' : 'Follow' }} {{ profile.username }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{active: activeTab === TAB_CONST.PROFILE_ARTICLES}"
                  @click="selectTab(TAB_CONST.PROFILE_ARTICLES)">My Articles</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{active: activeTab === TAB_CONST.FAVORITED_ARTICLES}"
                  @click="selectTab(TAB_CONST.FAVORITED_ARTICLES)">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <article-list
            :byFilters="filters" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ProfileModule from '@/store/modules/profile'
import UserModule from '@/store/modules/user'
import ArticleList from '@/components/ArticleList.vue'
import { ArticleRequestFilter } from '@/store/modules'

enum TAB_CONST {
  PROFILE_ARTICLES = 'PROFILE_ARTICLES',
  FAVORITED_ARTICLES = 'FAVORITED_ARTICLES',
}

@Component({
  name: 'Profile-page',
  components: {
    ArticleList,
  },
  data: () => ({
    TAB_CONST,
  }),
})
export default class ProfilePage extends Vue {
  private isLoaded: boolean = false
  private isPending: boolean = false
  private activeTab: string = TAB_CONST.PROFILE_ARTICLES
  async created () {
    await ProfileModule.GET_PROFILE(this.profileUsername)
    this.isLoaded = true
  }

  async toggleSubscription () {
    this.isPending = true
    try {
      !this.isFollowing
      ? await ProfileModule.FOLLOW_PROFILE(this.profileUsername)
      : await ProfileModule.UNFOLLOW_PROFILE(this.profileUsername)
    } catch (e) {
      console.error(e)
    }
    this.isPending = false
  }

  get profile () {
    return ProfileModule.profile!
  }

  get profileUsername (): string {
    return this.$route.params.username
  }

  get isCurrentUser () {
    return this.profile.username === UserModule.username
  }

  get isFollowing () {
    return this.profile.following
  }

  get filters (): ArticleRequestFilter {
    return {
      author: this.activeTab === TAB_CONST.PROFILE_ARTICLES ?
        this.profileUsername : '',
      favorited: this.activeTab === TAB_CONST.FAVORITED_ARTICLES ?
        this.profileUsername : '',
    }
  }

  selectTab (tab: string) {
    this.activeTab = tab
  }
}
</script>

<style lang='scss' scope>
</style>