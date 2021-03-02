import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import roles from '@/roles'

import Planning from '@/views/Planning.vue'
import Notes from '@/views/etudiant/Notes.vue'
import Admin from '@/views/Admin.vue'
import AdminMatieres from '@/views/admin/Matieres.vue'
import AdminModule from '@/views/admin/Modules.vue'
import AdminFormations from '@/views/admin/Formations.vue'
import AdminSemestres from '@/views/admin/Semestres.vue'
import CreationCours from '@/views/assistantPedagogique/CreationCours.vue'
import NotFoundComponent from '@/views/error/404.vue'
import AdminEleve from '@/views/admin/Eleves.vue'
import AdminPromotion from '@/views/admin/Promotions.vue'
import Index from '@/views/Index.vue'
import AssistantPedagogique from '@/views/AssistantPedagogique.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/planning',
    name: 'Planning',
    component: Planning,
    meta: { etudiant: true, assistantPedagogique: true, admin: true, responsableFormation: true }
  },
  {
    path: '/etudiant/notes',
    name: 'Notes',
    component: Notes,
    meta: { etudiant: true }
  },
  {
    path: '/assistantPedagogique',
    name: 'AssistantPedagogique',
    component: AssistantPedagogique,
    meta: { assistantPedagogique: true, admin: true },
  },
  {
    path: '/assistantPedagogique/creationcours',
    name: 'CreationCours',
    component: CreationCours,
    meta: { assistantPedagogique: true, admin: true },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { admin: true, responsableFormation: true },
  },
  {
    path: '/admin/matieres',
    name: 'AdminMatieres',
    component: AdminMatieres,
    meta: { admin: true, responsableFormation: true },
  },
  {
    path: '/admin/modules',
    name: 'AdminModule',
    component: AdminModule,
    meta: { admin: true, responsableFormation: true },
  },
  {
    path: '/admin/eleve',
    name: 'AdminEleve',
    component: AdminEleve,
    meta: { admin: true, responsableFormation: true },
  },
  {
    path: '/admin/promotion',
    name: 'AdminPromotion',
    component: AdminPromotion,
    meta: { admin: true, responsableFormation: true },
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
    meta: { admin: true, responsableFormation: true },
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFoundComponent,
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: { etudiant: true, assistantPedagogique: true, admin: true, responsableFormation: true }
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