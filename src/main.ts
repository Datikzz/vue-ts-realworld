import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { buildRouter } from './router'
import { formatDateMD } from '@/common/filters/formatDateMD'
import './registerServiceWorker'
import '@/assets/app.css'

Vue.config.productionTip = false
Vue.filter('formatDateMD', formatDateMD)

const router = buildRouter(store)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
