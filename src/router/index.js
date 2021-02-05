import Vue from 'vue'
import VueRouter from 'vue-router'
import Planning from '../views/Planning.vue'
import Notes from '../views/Notes.vue'
import Admin from '../views/Admin.vue'
import AdminMatieres from '../views/Admin/Matieres.vue'
import AdminUe from '../views/Admin/Ue.vue'
import Login from '../views/Login.vue'
import NotFoundComponent from '../views/404.vue'
import store from "../store/index"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/planning',
    name: 'Planning',
    component: Planning,
    meta: { requiresAuth: true, isStudent: true }
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
    meta: { requiresAuth: true, isStudent: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: '/admin/matieres',
    name: 'AdminMatieres',
    component: AdminMatieres,
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: '/admin/ue',
    name: 'AdminUe',
    component: AdminUe,
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: '*',
    component: NotFoundComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.auth.isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      if (to.matched.some(record => record.meta.isAdmin)) {
        if (!store.getters.user.isAdmin()) {
          next({
            path: '/',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } else if (to.matched.some(record => record.meta.isStudent)) {
        if (!store.getters.user.isStudent()) {
          next({
            path: '/',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      }
    }
  } else {
    next() // make sure to always call next()!
  }
})


export default router