<template>
  <div>
    <NavigationSync />
  </div>
  <!-- <img src="logoreglus.png" alt="Logo Reglus" class="logo"> -->
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2>Bem-vindo estudante !</h2>
            <p>Complete seu cadastro.</p>
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="name">Nome Completo</label>
                <input type="text" id="name" v-model="form.name" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="nascimento">Data de Nascimento</label>
                <input type="date" id="nascimento" v-model="form.nascimento" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="form.email" class="form-control" required />
              </div>
              <div class="form-group select-container">
                <label for="formacao">Grau de Formação</label>
                <select id="formacao" v-model="form.formacao" class="form-control" required>
                  <option disabled value="">Selecione o grau de formação</option>
                  <option>Ensino Fundamental</option>
                  <option>Ensino Médio</option>
                  <option>Superior Completo</option>
                  <option>Superior Incompleto</option>
                  <option>Pós-graduação</option>
                  <option>Mestrado</option>
                  <option>Doutorado</option>
                </select>
              </div>
              <div class="form-group">
                <label for="deficiencia">Pessoa com Deficiência?</label>
                <select id="deficiencia" v-model="form.deficiencia" class="form-control" required>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>
              <div class="form-group" v-if="form.deficiencia === 'sim'">
                <label for="casosim">Qual o tipo de deficiência?</label>
                <select id="casosim" v-model="form.casosim" class="form-control" required>
                  <option disabled value="">Selecione o tipo de deficiência</option>
                  <option>Auditiva</option>
                  <option>Visual</option>
                  <option>Física</option>
                  <option>Intelectual</option>
                  <option>Múltipla</option>
                </select>
              </div>
              <!-- <p>Tipo de deficiência selecionada: {{ form.casosim }}</p> -->
              <div class="form-group">
                <label for="password">Senha</label>
                <input type="password" id="password" v-model="form.password" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="password_confirmation">Confirmar Senha</label>
                <input type="password" id="password_confirmation" v-model="form.password_confirmation"
                  class="form-control" required />
              </div>
              <div v-if="passwordMismatch" class="alert alert-danger">
                As senhas não coincidem.
              </div>
              <button class="btn"><router-link to="/fichadoaluno">Continuar</router-link></button>
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
        escolaridade: '',
        deficiencia: '',
        casosim: '',
        password: '',
        password_confirmation: ''
      },
      passwordMismatch: false
    }
  },
  methods: {
    handleFileUpload(event) {
      this.form.comprovante = event.target.files[0];
    },

    register() {
      // Chamar API para cadastrar usuário
      if (this.form.password !== this.form.password_confirmation) {
        this.passwordMismatch = true;
      } else {
        this.passwordMismatch = false;
        // Continue com a submissão do formulário, por exemplo, enviar para o servidor
        alert('Formulário enviado com sucesso!');
      }
      console.log('Cadastro realizado com sucesso!');
    },

    watch: {
      'form.password': function () {
        this.passwordMismatch = false;
      },
      'form.password_confirmation': function () {
        this.passwordMismatch = false;
      }
    }
  }
}
</script>
<style scoped>
/*
.logo {
  display: block;
  margin: 0 auto;
  width: 250px;
}
*/

.card {
  border: 1px solid #8c52ff73;
  padding: 1em 2em;
  margin-bottom: 5em;
}

.form-group {
  margin-bottom: 1em;
}

.form-group label {
  font-weight: bold;
  font-size: 1.1em;
  margin-bottom: 5px;
}

input {
  border: none;
  border: 1px solid #fff;
  border-bottom: 1px solid #8c52ff;
}

input:active,
input:focus {
  transition: 2s;
  border: 1px solid #8c52ff;
  color: #8c52ff;
  box-shadow: 0 1px 0 0 #8c52ff;
}

select {
  border: none;
  border: 1px solid #fff;
  border-bottom: 1px solid #8c52ff;
  background: transparent;
  padding: 5px;
  font-size: 16px;
  transition: 2s;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select:focus,
select:active {
  border: 1px solid #8c52ff;
  color: #8c52ff;
  box-shadow: 0 1px 0 0 #8c52ff;
  outline: none;
}

.btn {
  background-color: #000000;
  border: none;
  border-radius: 3px;
  padding: 10px 40px;
  font-size: 16px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
}

.btn a {
  color: #fff;
}

.btn:hover {
  opacity: 0.8;
  transition: 2s;
}
</style>
