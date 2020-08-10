import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ProjectSelection from '../views/ProjectSelection.vue'
import CreateProject from '../views/CreateProject.vue'
import Login from '../views/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: ProjectSelection
  },
  {
    path: '/create-project',
    component: CreateProject
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

export default router
