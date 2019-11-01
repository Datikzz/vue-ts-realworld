<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent='publish'>
            <fieldset>
              <fieldset class="form-group">
                <input 
                  type="text"
                  class="form-control form-control-lg" 
                  placeholder="Article Title"
                  v-model="form.title">
              </fieldset>
              <fieldset class="form-group">
                <input 
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="form.description">
              </fieldset>
              <fieldset class="form-group">
                <textarea 
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="form.body">
                </textarea>
              </fieldset>
              <fieldset class="form-group">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Enter tags"
                  v-model="form.tagList">
                  <ul class="tag-list">
                    <li 
                      class="tag-default tag-pill tag-outline"
                      v-for="(tag, index) in form.tagList"
                      :key="index">
                      {{ tag }}
                    </li>
                  </ul>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
                Publish Article
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
import { vueRoutes } from '@/router/routes'
import Article from '@/store/modules/article'
import { ArticleRequestBody } from '../store/modules'

@Component({
  name: 'Editor-page',
})
export default class Editor extends Vue {
  private form: ArticleRequestBody = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  }

  private async publish () {
    try {
      await Article.CREATE_ARTICLE(this.form)
      this.$router.push(vueRoutes.home)
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style>

</style>