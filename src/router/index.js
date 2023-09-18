import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Homepage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('../views/Gallery.vue')
  },
 {
  path: '/register',
  name: 'register',
  component: () => import('../views/Register.vue')
 },
 {
  path: '/gallery/:id',
  name: 'galleryById',
  component: () => import('../views/Othergallery.vue')
}


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
