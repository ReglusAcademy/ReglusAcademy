import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: '/', component: () => import('@/views/HomeAcademy.vue')},
  { path: '/login', component: () => import('@/views/TelaLogin.vue')},
  { path: '/cadastro', component: () => import('@/views/TelaCadastroEstudante.vue')},
  { path: '/cadastroprofessor', component: () => import('@/views/TelaCadastroProfessor.vue')},
  { path: '/redirecionarlogin', component: () => import('@/views/TelaRedirecionamento.vue')},
  { path: '/agenda', component: () => import('@/views/ReglusAgenda.vue')},
  { path: '/introducaoaprogramacao', component: () => import('@/views/ReglusRoomSobre.vue')},
  { path: '/educacaoinclusiva', component: () => import('@/views/ReglusRoomInclusiva.vue')},
  { path: '/sobrenos', component: () => import('@/views/TelaSobreNos.vue')},
  { path: '/fichadoaluno', component: () => import('@/views/FormsAluno.vue')},
  { path: '/inicioestudante', component: () => import('@/views/HomeEstudante.vue')},
  { path: '/inicioeducador', component: () => import('@/views/HomeProfessor.vue')},
  { path: '/listaralunos', component: () => import('@/views/ListarAlunos.vue')},
  { path: '/fichaacompanhamento', component: () => import('@/views/FichaAcompanhamento.vue')},
  { path: '/fichaacompanhamentocaroline', component: () => import('@/views/FichaCaroline.vue')},
  { path: '/fichaacompanhamentomaiara', component: () => import('@/views/FichaMaiara.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;