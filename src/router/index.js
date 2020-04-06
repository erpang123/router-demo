import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/routeD'
    },
    {
      path: '/routeD',
      component: () => import('@/page/index.vue')
    }
  ]
})
