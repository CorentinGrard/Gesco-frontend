import Vue from 'vue'
import VueRouter from 'vue-router'
import Planning from '@/views/Planning.vue'
import Notes from '@/views/Notes.vue'
import Admin from '@/views/Admin.vue'
import AdminMatieres from '@/views/Admin/Matieres.vue'
import AdminUe from '@/views/Admin/Ue.vue'
import NotFoundComponent from '@/views/404.vue'

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
  // {
  //   path: '/',
  //   redirect: to => {
  //     let redirect = to.query.redirect
  //     console.log(redirect)
  //     if (typeof (redirect) !== 'undefined') {
  //       console.log("redirection")
  //       return redirect
  //     }
  //     // else if (Vue.$keycloak.hasRealmRole("admin")) {
  //     //   return { name: "Admin" }
  //     // } else if (Vue.$keycloak.hasRealmRole("student")) {
  //     //   return { name: "Planning" }
  //     // } else {
  //     //   return { name: "NotFound" }
  //     // }
  //   }
  // },
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