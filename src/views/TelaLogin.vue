<template>
  <div>
    <NavigationSync />
    </div>
    <img src="logoreglus.png" alt="Logo Reglus" class="logo">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <form>
                <div class="form-group mb-3">
                  <label for="email">Email:</label>
                  <input type="email" class="form-control" id="email" placeholder="Digite seu email">
                </div>
                <div class="form-group mb-3">
                  <label for="password">Senha:</label>
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
      </div>
    </div>
  </template>
<script>
import NavigationSync from "@/components/nav/NavigationSync.vue";
export default {
  name: 'TelaLogin',
  components: {
      NavigationSync,
    },
};
</script>
<style scoped>
  .container {
    padding: 20px;
    height: 100vh;
  }
  
  .logo {
    display: block;
    margin: 0 auto;
    width: 250px;
  }
  
  .form-group {
    margin-bottom: 15px;
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
  </style>