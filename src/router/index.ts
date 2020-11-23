import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ProjectSelection from '../views/ProjectSelection.vue'
import ProjectAssignment from '../views/ProjectAssignment.vue'
import CreateProject from '../views/CreateProject.vue'
import ProjectApproval from '../views/ProjectApproval.vue'
import Login from '../views/Login.vue'
import Project from '../views/Project.vue'
import { auth } from 'firebase'

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
    component: ProjectAssignment,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/approve-projects',
    component: ProjectApproval,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/project/:projectid',
    props: true,
    component: Project
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      const { authPromise } = await require('../compositions/useUser')
      await authPromise
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

router.beforeEach(async (to, from, next) => {
  if (to.path === '/') {
    const { authPromise } = await require('../compositions/useUser')
    const user = await authPromise
    if (user.value.project) {
      next('/project/' + user.value.project)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
