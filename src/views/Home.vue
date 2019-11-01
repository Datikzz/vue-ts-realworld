<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a 
                  class="nav-link"
                  :class="{'active' : isUserTab}" 
                  @click="activeTab = FEED_TAB_CONST.USER_TAB">Your Feed</a>
              </li>
              <li class="nav-item">
                <a 
                  class="nav-link"
                  :class="{'active' : !isUserTab}" 
                  @click="activeTab = FEED_TAB_CONST.GLOBAL_TAB">Global Feed</a>
              </li>
            </ul>
          </div>
          <article-list :byFilters="filters" /> 
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a 
                class="tag-pill tag-default"
                v-for="(tag, index) in tagList"
                :key="index"
                @click="selectedTag = tag">
                {{ tag }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import ArticleList from '@/components/ArticleList.vue'
import Tag from '@/store/modules/tag'
import Article from '@/store/modules/article'
import User from '@/store/modules/user'
import { ArticleRequestFilter } from '@/store/modules'
import user from '@/store/modules/user'

enum FEED_TAB_CONST {
  GLOBAL_TAB = 'GLOBAL_TAB',
  USER_TAB = 'USER_TAB',
}

@Component({
  name: 'Home-page',
  components: {
    ArticleList,
  },
  data: () => ({
    FEED_TAB_CONST,
  }),
  computed: {
    ...mapGetters('user', {
      username: 'username',
    }),
  },
})
export default class Home extends Vue {
  private activeTab = FEED_TAB_CONST.GLOBAL_TAB
  private selectedTag = ''

  async created () {
    try {
      await Promise.all([
        Tag.GET_TAGS(),
        Article.GET_ARTICLES(),
      ])
    } catch (e) {
      console.error(e)
    }
  }
  get tagList () {
    return Tag.tags
  }

  get feed () {
    return Article.articles
  }

  get isUserTab () {
    return this.activeTab === FEED_TAB_CONST.USER_TAB
  }

  get filters (): ArticleRequestFilter {
    return {
      tag: this.selectedTag,
      author: '',
      // favorited: !this.isUserTab ? '' : this.username,
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar .tag-pill {
    cursor: pointer;
  }
</style>
