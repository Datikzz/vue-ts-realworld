import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import { vueRoutes } from './routes'
import { Route, NavigationGuard } from 'vue-router'
import { Store } from 'vuex'
import config from '@/config'
type Next = Parameters<NavigationGuard>[2]

Vue.use(VueRouter)

// // route level code-splitting
// // this generates a separate chunk (about.[hash].js) for this route
// // which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
export function buildRouter (store: Store<{}>) {
  const routes = [
    {
      path: '*',
      redirect: vueRoutes.home,
    },
    {
      path: vueRoutes.home.path,
      name: vueRoutes.home.name,
      component: Home,
    },
    {
      path: vueRoutes.login.path,
      name: vueRoutes.login.name,
      component: () => import('@/views/Login.vue'),
      beforeEnter: buildAuthPageGuard(store),
    },
    {
      path: vueRoutes.register.path,
      name: vueRoutes.register.name,
      component: () => import('@/views/Signup.vue'),
      beforeEnter: buildAuthPageGuard(store),
    },
    {
      path: vueRoutes.settings.path,
      name: vueRoutes.settings.name,
      component: () => import('@/views/Settings.vue'),
      beforeEnter: buildInAppRouteGuard(store),
    },
    {
      path: vueRoutes.editor.path,
      name: vueRoutes.editor.name,
      component: () => import('@/views/Editor.vue'),
      beforeEnter: buildInAppRouteGuard(store),
    },
    {
      path: vueRoutes.profile.path,
      name: vueRoutes.profile.name,
      component: () => import('@/views/Profile.vue'),
    },
    {
      path: vueRoutes.article.path,
      name: vueRoutes.article.name,
      component: () => import('@/views/Article.vue'),
    },
  ]

  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  })
}

function buildAuthPageGuard (store: Store<{}>) {
  return function authPageGuard (to: Route, from: Route, next: Next) {
    const token = localStorage.getItem(config.SUM_LOCAL_STORAGE_KEY_FUR_JWT)
    const isLoggedIn = store.getters['userStore/isLoggedIn']
    token || isLoggedIn
      ? next(vueRoutes.home)
      : next()
  }
}

function buildInAppRouteGuard (store: Store<{}>) {
  return function inAppRouteGuard (to: Route, from: Route, next: Next) {
    const token = localStorage.getItem(config.SUM_LOCAL_STORAGE_KEY_FUR_JWT)
    token || store.getters['userStore/isLoggedIn']
      ? next()
      : next(vueRoutes.login)
  }
}
