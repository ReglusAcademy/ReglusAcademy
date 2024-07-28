import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: '/', component: () => import('@/views/HomeSync.vue')},
  { path: '/login', component: () => import('@/views/TelaLogin.vue')},
  { path: '/cadastro', component: () => import('@/views/TelaCadastro.vue')},
  { path: '/cadastroprofessor', component: () => import('@/views/TelaCadastroProfessor.vue')},
  { path: '/redirecionarlogin', component: () => import('@/views/TelaRedirecionamento.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;