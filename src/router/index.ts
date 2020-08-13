import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ProjectSelection from '../views/ProjectSelection.vue'
import CreateProject from '../views/CreateProject.vue'
import Login from '../views/Login.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: ProjectSelection,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create-project',
    component: CreateProject,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: Login
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const loggedIn = true // firebase.auth().currentUser
  console.log(firebase.auth().currentUser)
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next({
        path: '/login',
        query: { next: to.path }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
