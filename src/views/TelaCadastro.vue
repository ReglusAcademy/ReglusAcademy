<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h2>Cadastrar-se</h2>
              <form @submit.prevent="register">
                <div class="form-group">
                  <label for="name">Nome</label>
                  <input type="text" id="name" v-model="form.name" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="email">E-mail</label>
                  <input type="email" id="email" v-model="form.email" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="password">Senha</label>
                  <input type="password" id="password" v-model="form.password" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="password_confirmation">Confirmar Senha</label>
                  <input type="password" id="password_confirmation" v-model="form.password_confirmation" class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary">Cadastrar-se</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        }
      }
    },
    methods: {
      register() {
        // Chamar API para cadastrar usuário
        console.log('Cadastro realizado com sucesso!');
      }
    }
  }
  </script>