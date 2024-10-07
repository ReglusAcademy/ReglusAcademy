<template>
  <div>
    <NavReglus />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h2>Bem-vindo educador!</h2>
              <p>Complete seu cadastro.</p>
              <form @submit.prevent="register">
                <div class="form-group">
                  <label for="userType">Tipo de Usuário:</label>
                  <select id="userType" v-model="form.userType" class="form-control" required>
                    <option value="EDUCATOR">Educador</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="name">Nome Completo</label>
                  <input type="text" id="name" v-model="form.name" class="form-control" required />
                </div>
                <div class="form-group">
                  <label for="dateBirth">Data de Nascimento</label>
                  <input type="date" id="dateBirth" v-model="form.dateBirth" class="form-control" required />
                </div>
                <div class="form-group">
                <label for="gender">Gênero</label>
                <select id="gender" required>
                  <option value="MALE">Masculino</option>
                  <option value="FEMALE">Feminino</option>
                </select>
              </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" v-model="form.email" class="form-control" required />
                </div>
                <div class="form-group">
                  <label for="passwordHash">Senha</label>
                  <input type="password" id="passwordHash" v-model="form.passwordHash" class="form-control" required />
                </div>
                <div class="form-group">
                  <label for="disability">Deficiência:</label>
                  <select id="disability" v-model="form.deficiency" class="form-control" required>
                    <option value="false">Não</option>
                    <option value="true">Sim</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="educationLevel">Nível de Educação:</label>
                  <input type="text" id="educationLevel" v-model="form.educationLevel" class="form-control" required />
                </div>
                <div class="form-group">
                  <label for="instituteName">Nome do Instituto:</label>
                  <input type="text" id="instituteName" v-model="form.instituteName" class="form-control" required />
                </div>
                <div class="form-group">
                  <label for="experienceYears">Anos de Experiência:</label>
                  <input type="number" id="experienceYears" v-model.number="form.experienceYears" class="form-control" required />
                </div>
                <div class="form-group">
                  <label for="bio">Biografia:</label>
                  <textarea id="bio" v-model="form.bio" class="form-control"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Cadastrar Educador</button>
              </form>
              <div id="responseMessage" v-if="responseMessage" :style="{ color: responseColor }">{{ responseMessage }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavReglus from "@/components/nav/NavReglus.vue";

export default {
  name: "CadastroTela",
  components: {
    NavReglus,
  },
  data() {
    return {
      form: {
        userType: "EDUCATOR",
        name: '',
        dateBirth: '',
        email: '',
        gender: '',
        passwordHash: '',
        disability: false,
        educationLevel: '',
        instituteName: '',
        experienceYears: null,
        bio: ''
      },
      responseMessage: '',
      responseColor: 'green' // Cor padrão para sucesso
    }
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:8080/api/educators', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form) // Envia o objeto como JSON
        });

        const result = await response.json();

        if (response.ok) {
          this.responseMessage = 'Educador cadastrado com sucesso!';
          this.responseColor = 'green';
          this.resetForm(); // Limpa o formulário
        } else {
          this.responseMessage = `Erro: ${result}`;
          this.responseColor = 'red';
        }
      } catch (error) {
        console.error('Error:', error);
        this.responseMessage = 'Erro ao cadastrar educador.';
        this.responseColor = 'red';
      }
    },
    resetForm() {
      this.form = {
        userType: "EDUCATOR",
        name: '',
        dateBirth: '',
        gender: '',
        email: '',
        passwordHash: '',
        disability: false,
        educationLevel: '',
        instituteName: '',
        experienceYears: null,
        bio: ''
      };
      this.responseMessage = ''; // Limpa a mensagem de resposta
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