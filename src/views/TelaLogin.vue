<template>
  <NavReglus />
  <div id="raiz">
    <div id="align">
      <div class="container mt-5">
        <div class="card">
          <div class="card-body">
            <form>
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Digite seu email">
              </div>
              <div class="form-group mb-3">
                <label for="password">Senha</label>
                <input type="password" class="form-control" id="password" placeholder="Digite sua senha">
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
              <div class="text-center mt-3">
                <a href="#">Esqueceu senha?</a>
              </div>
              <div class="text-center mt-3">
                <span>Ainda não tem conta? </span><router-link to="/redirecionarlogin">Crie uma agora</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <img src="logoreglus.png" alt="Logo Reglus" class="logo">
    </div>
  </div>
</template>
<script>
import NavReglus from "@/components/nav/NavReglus.vue";
export default {
  name: 'TelaLogin',
  components: {
    NavReglus,
  },
};
</script>
<style scoped>
#align {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  margin-bottom: 2em;
}

.logo {
  width: 30%;
  margin-right: 100px;
  margin-left: 100px;
}

.form-group label {
  font-weight: bold;
  font-size: 1.1em;
}

.form-control {
  border: none;
  outline: none;
  border-bottom: 1px solid #8c52ff;
  padding: 10px;
  transition: 2s;
}

.form-control:focus,
.form-control:active {
  border: 1px solid #8c52ff;
  box-shadow: 0 1px 0 0 #8c52ff;
  color: #8c52ff;
}

.btn-primary {
  background-color: #8C52FF;
  border: none;
  border-radius: 3px;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
}

.btn-primary {
  background-color: #8c52ff;
  border-color: #8c52ff;
}

.btn-primary:hover {
  background-color: #5a3abf;
  border-color: #5a3abf;
}

.card-body {
  border-radius: 10px;
  margin: 1em;
}

.text-center a {
  color: #8c52ff;
  text-decoration: none;
}

.text-center a:hover {
  text-decoration: underline;
}

.text-center router-link {
  color: #8c52ff;
  text-decoration: none;
}

.text-center router-link:hover {
  text-decoration: underline;
}
</style>