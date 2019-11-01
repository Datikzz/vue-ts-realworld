<template>
  <div class="article-page" v-if="isLoaded">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <div class="article-meta">
          <router-link 
            :to="{ ...vueRoutes.profile, params: { username: article.author.username }}">
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link 
              :to="{ ...vueRoutes.profile, params: { username: article.author.username }}"
              class="author">
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.updatedAt | formatDateMD }}</span>
          </div>
          <button
            v-if="!isCurrentUser"
            class="btn btn-sm btn-outline-secondary action-btn profile-page__btn"
            :class="{ 'active': isFollowingProfile }"
            :disabled="isPending"
            @click="toggleProfileSubscription(article.author.username)">
            <i class="ion-plus-round"></i>
            &nbsp;
            {{ isFollowingProfile ? 'Unfollow' : 'Follow' }} {{ article.author.username }}
          </button>
          &nbsp;&nbsp;
          <button
            class="btn btn-sm btn-outline-primary"
            :class="{active: article.favorited}"
            :disabled="isPending"
            @click="toggleFavorite(article)">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        </div>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12">
          {{ article.body }}
        </div>
      </div>

      <hr />

      article-actions

      <!-- <div class="article-actions">
        <div class="article-meta">
          <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
          <div class="info">
            <a href="" class="author">Eric Simons</a>
            <span class="date">January 20th</span>
          </div>

          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow Eric Simons <span class="counter">(10)</span>
          </button>
          &nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">(29)</span>
          </button>
        </div>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              <button class="btn btn-sm btn-primary">
              Post Comment
              </button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>

        </div>

      </div> -->

    </div>

  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapState } from 'vuex'
import { vueRoutes } from '@/router/routes'
import ArticlePreview from '@/components/ArticlePreview.vue'
import Tag from '@/store/modules/tag'
import ArticleModule from '@/store/modules/article'
import ProfileModule from '@/store/modules/profile'
import UserModule from '@/store/modules/user'
import { Article } from '@/store/modules'

@Component({
  name: 'ArticlePage',
  components: {
    ArticlePreview,
  },
  data: () => ({
    vueRoutes,
  }),
})
export default class ArticlePage extends Vue {
  private isLoaded: boolean = false
  private isPending: boolean = false

  async created () {
    try {
      await ArticleModule.GET_ARTICLE(this.$route.params.slug)
      this.isLoaded = true
    } catch (e) {
      console.error(e)
    }
  }

  get article () {
    return ArticleModule.article!
  }

  get isCurrentUser () {
    return this.article.author.username === UserModule.username
  }

  get isFollowingProfile () {
    return this.article.author.following
  }

  async toggleFavorite (article: Article) {
    this.isPending = true
    try {
      article.favorited
      ? await ArticleModule.UNFAVORITE_ARTICLE(article.slug)
      : await ArticleModule.FAVORITE_ARTICLE(article.slug)
    } catch (e) {
      console.error(e)
    }
    this.isPending = false
  }

  async toggleProfileSubscription (profile: string) {
    this.isPending = true
    try {
      let updatedProfile
      if (!this.isFollowingProfile) {
        updatedProfile = await ProfileModule.FOLLOW_PROFILE(profile)
      } else {
        updatedProfile = await ProfileModule.UNFOLLOW_PROFILE(profile)
      }
      this.$store.commit('article/SET_ARTICLE', {
        ...this.article,
        author: updatedProfile,
      })
    } catch (e) {
      console.error(e)
    }
    this.isPending = false
  }
}
</script>

<style>

</style>