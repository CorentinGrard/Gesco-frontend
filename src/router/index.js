import Vue from 'vue'
import VueRouter from 'vue-router'
import Planning from '@/views/Planning.vue'
import Notes from '@/views/Notes.vue'
import Admin from '@/views/Admin.vue'
import AdminMatieres from '@/views/Admin/Matieres.vue'
import AdminUe from '@/views/Admin/Ue.vue'
import CreationCours from '@/views/CreationCours.vue'
import NotFoundComponent from '@/views/404.vue'
import GestionDesNotes from '@/views/GestionDesNotes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/planning',
    name: 'Planning',
    component: Planning,
    meta: { student: true }
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
    meta: { student: true }
  }, {
    path: '/creationcours',
    name: 'CreationCours',
    component: CreationCours,
    meta: { ad: true },
  },  
  {
    path: '/ap/notes/',
    name: 'GestionDesNotes',
    component: GestionDesNotes
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { admin: true },
  },
  {
    path: '/admin/matieres',
    name: 'AdminMatieres',
    component: AdminMatieres,
    meta: { admin: true },
  },
  {
    path: '/admin/ue',
    name: 'AdminUe',
    component: AdminUe,
    meta: { admin: true },
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFoundComponent,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.admin)) {
    if (Vue.$keycloak.hasRealmRole("admin")) {
      next()
    } else {
      next("/")
    }
  }


  if (to.matched.some(record => record.meta.student)) {
    if (Vue.$keycloak.hasRealmRole("student")) {
      next()
    } else {
      next("/")
    }
  }

  next()
})


export default router