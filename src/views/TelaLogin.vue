<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Login</h3>
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
                  <span>Ainda não tem conta? </span><router-link to="/cadastro">Crie uma agora</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
export default {
  name: 'TelaLogin'
};
</script>