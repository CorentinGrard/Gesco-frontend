import Vue from 'vue'
import VueRouter from 'vue-router'
import Planning from '../views/Planning.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Planning',
    component: Planning
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
