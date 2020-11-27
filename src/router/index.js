import Vue from 'vue'
import VueRouter from 'vue-router'
import Planning from '../views/Planning.vue'
import Notes from '../views/Notes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/planning',
    name: 'Planning',
    component: Planning
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
