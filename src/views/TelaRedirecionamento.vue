<template>
  <div>
    <NavReglus />
  </div>
  <div class="container">
    <img src="/logoreglus.png" alt="Logo Reglus" class="logo">
    <h1 class="title"><strong>Descubra uma educação inclusiva e gratuita conosco</strong></h1>
    <p class="subtitle">Você é um...</p>
    <div class="buttons">
      <router-link to="/cadastroeducador" class="btn">Professor</router-link>
      <span class="or">ou</span>
      <router-link to="/cadastroestudante" class="btn">Estudante</router-link>
    </div>
  </div>
</template>
<script>
import NavReglus from "@/components/nav/NavOut.vue";

export default {
  name: "CadastroTela",
  components: {
    NavReglus,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  margin-top: 2em;
  background-color: #ffffff;
}

.logo {
  width: 200px;
  height: auto;
  margin-bottom: 10px;
}

.title {
  font-size: 1.5rem;
  width: 50%;
  text-align: center;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 30px;
}

.buttons {
  display: flex;
  align-items: center;
  gap: 3em
}

.buttons a {
  color: white;
}

.btn {
  background-color: var(--lilas);
  color: white;
  padding: 15px 50px;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  margin: 0 10px;
  transition: 1s;
}

.btn:hover {
  background-color: var(--lilashover);
}

.or {
  font-size: 1.2rem;
  margin: 0 10px;
}
</style>