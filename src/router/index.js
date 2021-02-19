import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import roles from '@/roles'

import Planning from '@/views/Planning.vue'
import Notes from '@/views/Notes.vue'
import Admin from '@/views/Admin.vue'
import AdminMatieres from '@/views/admin/Matieres.vue'
import AdminFormations from '@/views/admin/Formations.vue'
import AdminSemestres from '@/views/admin/Semestres.vue'
import AdminUe from '@/views/admin/Ue.vue'
import CreationCours from '@/views/CreationCours.vue'
import NotFoundComponent from '@/views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/planning',
    name: 'Planning',
    component: Planning,
    meta: { etudiant: true, assistantPedagogique: true }
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
    meta: { etudiant: true }
  }, {
    path: '/creationcours',
    name: 'CreationCours',
    component: CreationCours,
    meta: { assistantPedagogique: true, admin: true },
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
    path: '/admin/formations',
    name: 'AdminFormations',
    component: AdminFormations,
    meta: { admin: true },
  },
  {
    path: '/admin/semestres',
    name: 'AdminSemestres',
    component: AdminSemestres,
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
  for (const id in roles) {
    const role = roles[id]
    if (to.matched.some(record => record.meta[role.name]) && store.getters[role.getter]) {
      next()
      return true
    }
  }

  if (to.matched.some(record => record.meta && Object.keys(record.meta).length === 0 && record.meta.constructor === Object)) {
    next()
    return true
  } else {
    next("/")
    return false
  }
})


export default router
