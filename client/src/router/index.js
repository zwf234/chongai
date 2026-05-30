import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/pets', name: 'Pets', component: () => import('../views/Pets.vue') },
  { path: '/pet/:id', name: 'PetDetail', component: () => import('../views/PetDetail.vue') },
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
  { path: '/register', name: 'Register', component: () => import('../views/Register.vue') },
  { path: '/profile', name: 'Profile', component: () => import('../views/Profile.vue') },
  { path: '/favorites', name: 'Favorites', component: () => import('../views/Favorites.vue') },
  { path: '/applications', name: 'Applications', component: () => import('../views/Applications.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router