import Vue from 'vue'
import VueRouter from 'vue-router'
import Planning from '../views/Planning.vue'
import Notes from '../views/Notes.vue'
import Admin from '../views/Admin.vue'
import CreationCours from '../views/CreationCours.vue'
import AdminMatieres from '../views/Admin/Matieres.vue'
import AdminUe from '../views/Admin/Ue.vue'

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
    path: '/creationcours',
    name: 'CreationCours',
    component: CreationCours
  },
  {
    path: '/admin/Matieres',
    name: 'Matieres',
    component: AdminMatieres
  },
  {
    path: '/admin/Ue',
    name: 'Ue',
    component: AdminUe
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
