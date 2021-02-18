import Vue from 'vue'
import VueRouter from 'vue-router'
import Planning from '@/views/Planning.vue'
import Notes from '@/views/Notes.vue'
import Admin from '@/views/Admin.vue'
import AdminMatieres from '@/views/admin/Matieres.vue'
import AdminUe from '@/views/admin/Ue.vue'
import CreationCours from '@/views/CreationCours.vue'
import NotFoundComponent from '@/views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/planning',
    name: 'Planning',
    component: Planning,
    meta: { admin: true, student: true }
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
    meta: { admin: true, ad: true },
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
  if (to.matched.some(record => record.meta.admin) && Vue.$keycloak.hasRealmRole("admin")) {
    next()
    return true
  }

  if (to.matched.some(record => record.meta.student) && Vue.$keycloak.hasRealmRole("student")) {
    next()
    return true
  }

  if (to.matched.some(record => record.meta && Object.keys(record.meta).length === 0 && record.meta.constructor === Object)) {
    next()
    return true
  } else {
    next('/')
    return false
  }
})


export default router