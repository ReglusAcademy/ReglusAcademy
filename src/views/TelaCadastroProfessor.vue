<template>
    <div>
      <NavigationSync />
      </div>
    <img src="logoreglus.png" alt="Logo Reglus" class="logo">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
  
                <form @submit.prevent="register">
                  <div class="form-group">
                    <label for="name">Nome Completo</label>
                    <input type="text" id="name" v-model="form.name" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="nascimento">Data de Nascimento</label>
                    <input type="date" id="nascimento" v-model="form.nascimento" class="form-control" />
                  </div>                
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="form.email" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="formacao">Grau de Formação</label>
                    <input type="text" id="formacao" v-model="form.formacao" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="instituicao">Instituição de Formação</label>
                    <input type="text" id="instituicao" v-model="form.instituicao" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="comprovante" title="Entende-se como comprovante de formação, qualquer documento institucional que comprove a formação do usuário.">Comprovante de Formação*</label>
                    <input type="text" id="comprovante" v-model="form.comprovante" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="deficiencia">Pessoa com Deficiência?</label>
                    <select id="deficiencia" v-model="form.deficiencia" class="form-control">
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </div>
                  <div class="form-group" v-if="form.deficiencia === 'sim'">
                    <label for="casosim">Se sim para a pergunta anterior, qual o tipo de deficiência?</label>
                    <input type="text" id="casosim" v-model="form.casosim" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="password">Senha</label>
                    <input type="password" id="password" v-model="form.password" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="password_confirmation">Confirmar Senha</label>
                    <input type="password" id="password_confirmation" v-model="form.password_confirmation" class="form-control" />
                  </div>
                  <button type="submit" class="btn btn-primary">Cadastre-se</button>
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
      name: "CadastroTela",
      components: {
        NavigationSync,
      },
      data() {
        return {
          form: {
            name: '',
            nascimento: '',
            email: '',
            formacao: '',
            instituicao: '',
            comprovante: '',
            deficiencia: '',
            casosim: '',
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
    <style scoped>
    .container {
      padding: 20px;
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
      background-color: #000000;
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
  