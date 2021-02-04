import Vue from 'vue'
import VueRouter from 'vue-router'
import Planning from '../views/Planning.vue'
import Notes from '../views/Notes.vue'
import Admin from '../views/Admin.vue'
import Eleves from '../views/admin/Eleves.vue'
import Promotions from '../views/admin/Promotions.vue'

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
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/admin/eleves',
    name: 'Eleves',
    component: Eleves
  },
  {
    path: '/admin/promotions',
    name: 'Promotions',
    component: Promotions
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
