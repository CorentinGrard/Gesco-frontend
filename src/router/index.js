import Vue from 'vue'
import VueRouter from 'vue-router'
import Planning from '@/views/Planning.vue'
import Notes from '@/views/Notes.vue'
import Admin from '@/views/Admin.vue'
import AdminMatieres from '@/views/admin/Matieres.vue'
import AdminFormations from '@/views/admin/Formations.vue'
import AdminUe from '@/views/admin/Ue.vue'
import CreationCours from '@/views/CreationCours.vue'
import NotFoundComponent from '@/views/404.vue'
import AdminEleve from '@/views/admin/Eleves.vue'
import AdminPromotion from '@/views/admin/Promotions.vue'

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
    path: '/admin/eleve',
    name: 'AdminEleve',
    component: AdminEleve,
    meta: { admin: true },
  },
  {
    path: '/admin/promotion',
    name: 'AdminPromotion',
    component: AdminPromotion,
    meta: { admin: true },
  },
  {
    path: '/admin/formations',
    name: 'AdminFormations',
    component: AdminFormations,
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