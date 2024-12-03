<template>
  <div>
    <NavReglus />
    <div class="row justify-content-center">
      <div class="card">
        <div class="card-body">
          <h2>Bem-vindo, Educador(a)!</h2>
          <p>Complete seu cadastro.</p>
          <form @submit.prevent="register">
            <div class="form-group">
              <label for="name">Nome Completo</label>
              <input type="text" id="name" v-model="form.name" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="dateBirth">Data de Nascimento</label>
              <input type="date" id="dateBirth" v-model="form.dateBirth" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="gender">Gênero</label> <br>
              <select id="gender" v-model="form.gender" class="form-control" required>
                  <option disabled value="">Por favor, escolha o que melhor define você.</option>
                  <option value="MALE">Masculino</option>
                  <option value="FEMALE">Feminino</option>
                  <option value="OTHER">Outro</option>
                </select>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="form.email" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="disability">Pessoa com Deficiência?</label>
              <select id="disability" v-model="form.disability" class="form-control" required>
                <option value="sim">Sim</option>
                <option value="No">Não</option>
              </select>
            </div>
            <div class="form-group" v-if="form.disability === 'sim'">
              <label for="casosim">Qual o tipo de deficiência?</label>
              <select id="casosim" v-model="form.casosim" class="form-control" required>
                <option disabled value="">Selecione o tipo de deficiência.</option>
                <option value="Hearing">Auditiva</option>
                <option value="Visual">Visual</option>
                <option value="Physical">Física</option>
                <option value="Intellectual">Intelectual</option>
                <option value="Multiple">Múltipla</option>
              </select>
            </div>
            <div class="form-group select-container">
              <label for="educationLevel">Grau de Formação</label>
              <select id="educationLevel" v-model="form.educationLevel" class="form-control" required>
                <option disabled value="">Selecione o grau de formação.</option>
                <option value="Elementary">Ensino Fundamental</option>
                <option value="Secondary">Ensino Médio</option>
                <option value="Undergraduate">Superior Completo</option>
                <option value="Incomplete">Superior Incompleto</option>
                <option value="Graduate">Pós-graduação</option>
                <option value="Master">Mestrado</option>
                <option value="Doctorate">Doutorado</option>
              </select>
            </div>
            <div class="form-group">
              <label for="instituteName">Nome do Instituto:</label>
              <input type="text" id="instituteName" v-model="form.instituteName" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="experienceYears">Anos de Experiência:</label>
              <select id="experienceYears" v-model.number="form.experienceYears" class="form-control" required>
                <option disabled value="">Selecione a quantidade de anos lecionando.</option>
                <option value="1">1 ano</option>
                <option value="2">2 anos</option>
                <option value="3">3 anos</option>
                <option value="4">4 anos</option>
                <option value="5+">5 anos ou mais</option>
                <option value="10+">10 anos ou mais</option>
                <option value="20+">20 anos ou mais</option>
              </select>
            </div>
            <div class="form-group">
              <label for="bio">Biografia:</label>
              <textarea id="bio" v-model="form.bio" class="form-control"
                placeholder="Não se preocupe, você pode editar mais tarde!!"></textarea>
            </div>
            <div class="form-group">
              <label for="password">Senha</label>
              <input type="password" id="password" v-model="form.passwordHash" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="password_confirmation">Confirmar Senha</label>
              <input type="password" id="password_confirmation" v-model="form.password_confirmation"
                class="form-control" required />
            </div>
            <div v-if="passwordMismatch" class="alert alert-danger">
              As senhas não coincidem.
            </div>
            <button type="submit" class="btn btn-primary">Cadastrar</button>
          </form>
          <div id="responseMessage" v-if="responseMessage" :style="{ color: responseColor }">{{ responseMessage }}</div>
        </div>
      </div>
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
  data() {
    return {
      form: {
        userType: "EDUCATOR",
        name: '',
        dateBirth: '',
        email: '',
        gender: '',
        passwordHash: '',
        password_confirmation: '',
        disability: '',
        educationLevel: '',
        casosim: '',
        instituteName: '',
        experienceYears: null,
        bio: ''
      },
      responseMessage: '',
      responseColor: 'green'
    }
  },
  computed: {
    passwordMismatch() {
      return this.form.passwordHash !== this.form.password_confirmation;
    }
  },
  methods: {
    async register() {
      if (this.passwordMismatch) {
        return; 
      }

      try {
        const response = await fetch('http://localhost:8080/api/educators', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        });

        const result = await response.json();

        if (response.ok) {
          this.responseMessage = 'Educador cadastrado com sucesso!';
          this.responseColor = 'green';
          this.resetForm();
          this.$router.push('/login');
        } else {
          this.responseMessage = `Erro: ${result}`;
          this.responseColor = 'red';
        }
      } catch (error) {
        console.error('Error:', error);
        this.responseMessage = 'Erro ao cadastrar.';
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
        password_confirmation: '',
        disability: false,
        educationLevel: '',
        instituteName: '',
        experienceYears: null,
        bio: ''
      };
      this.responseMessage = '';
    }
  }
}
</script>
<style scoped>
.card {
  border: 1px solid #8c52ff73;
  padding: 1em 2em;
  margin-bottom: 5em;
  width: 600px;
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
  border-radius: 5px;
  border-bottom: 1px solid #8c52ff;
  width: 100%;
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