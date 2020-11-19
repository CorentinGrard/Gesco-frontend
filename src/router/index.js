import Vue from 'vue'
import VueRouter from 'vue-router'
import Planning from '../views/Planning.vue'
import GestionDesNotes from '../views/GestionDesNotes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Planning',
    component: Planning
  },
  {
    path: '/ap/notes/',
    name: 'GestionDesNotes',
    component: GestionDesNotes
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
