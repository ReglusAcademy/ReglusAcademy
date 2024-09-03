<template>
    <div>
      <NavigationReglus />
    </div>
    <div class="container">
      <main>
        <section class="hero">
          <div class="hero-title">
            <h2>Reglus Room</h2>
            <i class="fas fa-chevron-right"></i>
            <h1>Introdução a Programação</h1>
            <p>2024.2</p>
          </div>
          <div class="hero-profile">
            <i class="fas fa-user-circle"></i>
          </div>
        </section>
        <section class="content">
          <div class="sidebar">
            <ul>
              <li><a href="#"><i class="fas fa-home"></i> Início</a></li>
              <li><a href="#"><i class="far fa-calendar-alt"></i> Agenda</a></li>
              <li><a href="#"><i class="fas fa-users" style="color: purple;"></i> Cursos</a>
                <ul>
                  <li><a href="#"><i class="fas fa-calculator"></i> Matemática para Iniciantes</a></li>
                  <li><a href="#"><i class="fas fa-laptop-code"></i> Introdução a Programação</a></li>
                  <li><a href="#"><i class="fas fa-book"></i> Turma Pré-Enem</a></li>
                  <li><a href="#"><i class="fas fa-brain"></i> Mindfullness</a></li>
                  <li><a href="#"><i class="fas fa-users"></i> Educação Inclusiva</a></li>
                  <li><a href="#"><i class="fas fa-heart"></i> Lógica de Programação</a></li>
                  <li><a href="#"><i class="fas fa-archive"></i> Turmas Arquivadas</a></li>
                  <li><a href="#"><i class="fas fa-cog"></i> Configurações</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="main-content">
            <div class="teacher-profile">
              <div class="teacher-info">
                <img src="@/assets/content/eduardo.png" alt="Foto do professor">
                <h3>Eduardo de Melo Vasconcelos</h3>
                <p>Doutor em Ciências da Computação pela UFPE</p>
              </div>
              <div class="teacher-skills">
                <ul>
                  <li><button>Inteligência Artificial</button></li>
                  <li><button>Tecnologia da Informação</button></li>
                  <li><button>Sistemas de Informações</button></li>
                  <li><button>Análise de Dados</button></li>
                  <li><button>Redes de Computadores</button></li>
                  <li><button>Redes Petri</button></li>
                  <li><button>Programação</button></li>
                </ul>
              </div>
            </div>
            <div class="about-teacher">
              <h3>Sobre mim:</h3>
              <p>Doutor em Ciências da Computação pela Universidade Federal de Pernambuco e professor Associado do Instituto Federal de Educação, Ciência e Tecnologia de Pernambuco Tem Experiência e interesse nas áreas de programação, redes de computadores com ênfase em redes sem fio, Sistemas de Informações, Inteligência Artificial e estatística aplicada a computação, análise estatística de sistemas, análise de dados, modelagem estocástica de sistemas com ênfase em Cadeias de Markov de Tempo Contínuo, redes Petri (temporizada e colorida), simulação e construção de simuladores. <br> Link GitHub: https://github.com/dr-eduardovasconcelos</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  import NavigationReglus from "@/components/nav/NavigationReglus.vue";
  export default {
    name: 'ReglusRoomSobre',
    components: {
      NavigationReglus,
    },
    data() {
      return {
      }
    },
    methods: {
    }
  }
  </script>
  
  <style scoped>
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  header {
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }
  
  .logo {
    height: 60px;
  }
  
  .logo img {
    height: 100%;
  }
  
  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }
  
  nav li {
    margin-right: 20px;
  }
  
  nav a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
  
  main {
    padding: 20px;
    flex-grow: 1;
    margin-top: 80px;
  }

  .main-content {
    flex-grow: 1; /* Faz o conteúdo principal ocupar o espaço restante */
    display: flex;
    flex-direction: column; /* Mantém os elementos internos alinhados verticalmente */
  }
  
  .hero {
    background-color: #f5f5f5;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .hero-title h1 {
    font-size: 2.5rem;
    margin-bottom: 0;
  }
  
  .hero-title h2 {
    font-size: 1.5rem;
    margin-bottom: 0;
  }
  
  .hero-title p {
    font-size: 1rem;
    margin-bottom: 0;
  }
  
  .hero-title i {
    font-size: 2rem;
    margin: 0 10px;
  }
  
  .hero-profile {
    display: flex;
    align-items: center;
  }
  
  .hero-profile i {
    font-size: 2rem;
    margin-right: 10px;
  }
  
  .hero-profile img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  
  .content {
    display: flex;
    gap: 20px;
    position: relative;
  }
  
  .sidebar {
    width: 250px;
    flex-shrink: 0;
  }
  
  .sidebar ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  
  .sidebar li {
    margin-bottom: 10px;
  }
  
  .sidebar a {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #333;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .sidebar a:hover {
    background-color: #eee;
  }
  
  .sidebar {
    width: 250px; /* já está definido */
    flex-shrink: 0; /* Adiciona essa linha para impedir que a sidebar encolha */
    display: flex;
    flex-direction: column;
  }
  
  .sidebar li:hover > ul {
    display: block; /* Exibe a lista aninhada quando o item pai é focado */
  }
  
  .teacher-profile {
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .teacher-info {
    display: flex;
    gap: 10px;
  }
  
  .teacher-info img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  
  .teacher-info h3 {
    margin-bottom: 0;
    font-size: 2.0rem;
  }
  
  .teacher-info p {
    margin-bottom: 0;
    font-size: 1rem;
  }
  
  .teacher-skills ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .teacher-skills button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #8c52ff;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
  }
  
  .about-teacher {
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }
  
  .about-teacher h3 {
    margin-bottom: 10px;
  }
  
  .about-teacher p {
    font-size: 1rem;
    line-height: 1.5;
  }
  
  @media (max-width: 768px) {
    .content {
      flex-direction: column;
    }
  
    .sidebar {
      width: 100%;
    }
  }
  
  /* Estilo dos ícones */
  .fas, .far {
    color: #000;
    font-size: 1.2rem;
  }
  
  /* Estilo da lista de cursos */
  .sidebar ul ul {
    display: none; /* Oculta a lista aninhada por padrão */
    position: absolute; /* Posiciona a lista sobre os outros elementos */
    left: 100%; /* Desloca a lista para a direita */
    top: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    padding: 10px;
    z-index: 1;
  }
  
  .sidebar ul ul li {
    margin-bottom: 5px;
  }
  
  .sidebar ul ul li a {
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: #333;
    background-color: #fff;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .sidebar ul ul li a:hover {
    background-color: #eee;
  }
  </style>
