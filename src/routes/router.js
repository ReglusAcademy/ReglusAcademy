import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: '/', component: () => import('@/views/HomeSync.vue')},
  { path: '/login', component: () => import('@/views/TelaLogin.vue')},
  { path: '/cadastro', component: () => import('@/views/TelaCadastro.vue')},
  { path: '/cadastroprofessor', component: () => import('@/views/TelaCadastroProfessor.vue')},
  { path: '/redirecionarlogin', component: () => import('@/views/TelaRedirecionamento.vue')},
  { path: '/agenda', component: () => import('@/views/ReglusAgenda.vue')},
  { path: '/introducaoaprogramacao', component: () => import('@/views/ReglusRoomSobre.vue')},
  { path: '/educacaoinclusiva', component: () => import('@/views/ReglusRoomInclusiva.vue')},
  { path: '/sobrenos', component: () => import('@/views/TelaSobreNos.vue')},
  { path: '/fichadoaluno', component: () => import('@/views/FormsAluno.vue')},
  { path: '/inicial', component: () => import('@/views/HomeAluno.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;