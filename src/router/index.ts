import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ProjectSelection from '../views/ProjectSelection.vue'
import ProjectAssignment from '../views/ProjectAssignment.vue'
import CreateProject from '../views/CreateProject.vue'
import ProjectApproval from '../views/ProjectApproval.vue'
import Login from '../views/Login.vue'
import { auth } from '../compositions/useUser'

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
    path: '/assign-projects',
    component: ProjectAssignment
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/approve-projects',
    component: ProjectApproval
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      const user = await auth as {uid: string; project: string | undefined }
      if (user.project) {
        next('/project/' + user.uid)
      }
      next()
    } catch (error) {
      next({
        path: '/login',
        query: { next: to.path }
      })
    }
  } else {
    next()
  }
})

export default router
