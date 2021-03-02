import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import roles from '@/roles'

import Planning from '@/views/Planning.vue'
import Notes from '@/views/etudiant/Notes.vue'
import Admin from '@/views/admin/Index.vue'
import AdminFormations from '@/views/admin/Formations.vue'
import CreationCours from '@/views/assistantPedagogique/CreationCours.vue'
import NotFoundComponent from '@/views/error/404.vue'
import Index from '@/views/Index.vue'
import AssistantPedagogique from '@/views/assistantPedagogique/Index.vue'
import ResponsableFormation from '@/views/responsableFormation/Index.vue'
import ResponsableFormationMatieres from '@/views/responsableFormation/Matieres.vue'
import ResponsableFormationModule from '@/views/responsableFormation/Modules.vue'
import ResponsableFormationSemestres from '@/views/responsableFormation/Semestres.vue'
import ResponsableFormationEleve from '@/views/responsableFormation/Eleves.vue'
import ResponsableFormationPromotion from '@/views/responsableFormation/Promotions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: { etudiant: true, assistantPedagogique: true, admin: true, responsableFormation: true }
  },
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
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { admin: true },
  },
  {
    path: '/responsableFormation',
    name: 'ResponsableFormation',
    component: ResponsableFormation,
    meta: { admin: true, responsableFormation: true },
  },
  {
    path: '/assistantPedagogique/creationcours',
    name: 'CreationCours',
    component: CreationCours,
    meta: { assistantPedagogique: true, admin: true },
  },
  {
    path: '/responsableFormation/matieres',
    name: 'ResponsableFormationMatieres',
    component: ResponsableFormationMatieres,
    meta: { admin: true, responsableFormation: true },
  },
  {
    path: '/responsableFormation/modules',
    name: 'ResponsableFormationModule',
    component: ResponsableFormationModule,
    meta: { admin: true, responsableFormation: true },
  },
  {
    path: '/responsableFormation/eleve',
    name: 'ResponsableFormationEleve',
    component: ResponsableFormationEleve,
    meta: { admin: true, responsableFormation: true },
  },
  {
    path: '/responsableFormation/promotion',
    name: 'ResponsableFormationPromotion',
    component: ResponsableFormationPromotion,
    meta: { admin: true, responsableFormation: true },
  },
  {
    path: '/responsableFormation/semestres',
    name: 'ResponsableFormationSemestres',
    component: ResponsableFormationSemestres,
    meta: { admin: true, responsableFormation: true },
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