import { createRouter, createWebHistory } from 'vue-router'
import { routers } from './routers'

export const router = createRouter({
  history: createWebHistory(),
  routes:routers,
})