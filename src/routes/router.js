import { createRouter, createWebHistory } from "vue-router"

const routes = [
  // geral
  { path: '/', component: () => import('@/views/HomeAcademy.vue')},
  { path: '/login', component: () => import('@/views/TelaLogin.vue')},
  { path: '/cadastroestudante', component: () => import('@/views/Student/TelaCadastroEstudante.vue')},
  { path: '/cadastroeducador', component: () => import('@/views/Educator/TelaCadastroProfessor.vue')},
  { path: '/redirecionarlogin', component: () => import('@/views/TelaRedirecionamento.vue')},
  { path: '/minhacontareglus', component: () => import('@/views/Resources/ReglusConta.vue')},
  { path: '/sobrenos', component: () => import('@/views/TelaSobreNos.vue')},
  // estudante
  { path: '/fichadoaluno', component: () => import('@/views/Student/FormsAluno.vue')},
  { path: '/sala/:roomId', name: 'sala', component: () => import('@/views/Student/RoomDetails.vue')},
  { path: '/inicioestudante', component: () => import('@/views/Student/HomeEstudante.vue')},
  { path: '/agenda', component: () => import('@/views/Resources/ReglusAgenda.vue')},
  { path: '/introducaoaprogramacao', component: () => import('@/views/Resources/ReglusRoomSobre.vue')},
  { path: '/educacaoinclusiva', component: () => import('@/views/Resources/ReglusRoomInclusiva.vue')},
  // educador
  { path: '/inicioeducador', component: () => import('@/views/Educator/HomeProfessor.vue')},
  { path: '/salaAdmin/:roomId', name: 'salaAdmin', component: () => import('@/views/Educator/RoomDetails.vue')},
  { path: '/listaralunos', component: () => import('@/views/Educator/ListarAlunos.vue')},
  { path: '/fichaacompanhamento', component: () => import('@/views/Student/FichaAcompanhamento.vue')},
  { path: '/fichaacompanhamentocaroline', component: () => import('@/views/Student/FichaCaroline.vue')},
  { path: '/fichaacompanhamentomaiara', component: () => import('@/views/Student/FichaMaiara.vue')},
  { path: '/salas', component: () => import('@/views/Educator/RoomAcademy.vue')},
  { path: '/estudante/:studentId', name: 'estudante', component: () => import('@/views/Educator/StudentDetails.vue')},
  { path: '/atividade/:activityId', name: 'atividade', component: () => import('@/views/Educator/ActivityDetails.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;