<template>
  <div>
    <NavReglus />
  </div>
  <div class="row justify-content-center">
    <div class="card">
      <div class="card-body">
        <h2>Bem-vindo(a) Estudante!</h2>
        <p>Complete seu cadastro.</p>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Nome Completo *</label>
            <input type="text" id="name" v-model="form.name" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="dateBirth">Data de Nascimento *</label>
            <input type="date" id="dateBirth" v-model="form.dateBirth" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="gender">Gênero *</label>
            <select id="gender" v-model="form.gender" class="form-control" required>
              <option disabled value="">Por favor, escolha o que melhor define você.</option>
              <option value="MALE">Masculino</option>
              <option value="FEMALE">Feminino</option>
              <option value="OTHER">Outro</option>
            </select>
          </div>
          <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" v-model="form.email" class="form-control" required />
          </div>
          <div class="form-group select-container">
            <label for="educationLevel">Grau de Formação *</label>
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
            <label for="disability">Pessoa com Deficiência? *</label>
            <select id="disability" v-model="form.disability" class="form-control" required>
              <option disabled value="">Você possui alguma deficiência?</option>
              <option value="YES">Sim</option>
              <option value="NO">Não</option>
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
          <div class="form-group">
            <label for="instituteName">Nome do Instituto em que estuda atualmente *</label>
            <input type="text" id="instituteName" v-model="form.instituteName" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="state">Estado *</label>
            <select id="state" v-model="form.state" class="form-control" required @change="fetchCities">
              <option disabled value="">Selecione o Estado</option>
              <option v-for="state in states" :key="state.sigla" :value="state.sigla">
                {{ state.nome }} ({{ state.sigla }})
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="city">Cidade *</label>
            <select id="city" v-model="form.city" class="form-control" required>
              <option disabled value="">Selecione a Cidade</option>
              <option v-for="city in cities" :key="city">{{ city }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="password">Senha *</label>
            <input type="password" id="password" v-model="form.passwordHash" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="password_confirmation">Confirmar Senha *</label>
            <input type="password" id="password_confirmation" v-model="form.password_confirmation" class="form-control"
              required />
          </div>
          <div v-if="passwordMismatch" class="alert alert-danger">
            As senhas não coincidem.
          </div>
          <button type="submit" class="btn">Cadastrar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavReglus from "@/components/nav/NavOut.vue";
export default {
  name: "TelaCadastroEstudante",
  components: {
    NavReglus,
  },
  data() {
    return {
      form: {
        userType: 'STUDENT',
        name: '',
        dateBirth: '',
        email: '',
        gender: '',
        passwordHash: '',
        password_confirmation: '',
        disability: '',
        educationLevel: '',
        instituteName: '',
        city: '',
        state: '',
        casosim: '',
        finalObservations: '',
        socialAspectRequest: {
          livingWith: "UNDEFINED",
          relationshipWithClassmates: "UNDEFINED",
          relationshipWithTeachers: "UNDEFINED",
          relationshipWithFamily: "UNDEFINED"
        },
        studyHabitRequest: {
          studyMethods: "UNDEFINED",
          studyHoursPerDay: "UNDEFINED",
          studyLocations: "UNDEFINED",
          studyPlan: "UNDEFINED"
        },
        healthWellbeingRequest: {
          healthCondition: "UNDEFINED",
          physicalActivity: "UNDEFINED",
          dietaryEvaluation: "UNDEFINED",
          sleepHours: "UNDEFINED"
        },
        interestHobbyRequest: {
          activitiesOutsideSchool: "UNDEFINED",
          dreamsGoals: "UNDEFINED"
        },
        selfAssessmentRequest: {
          performanceEvaluation: "UNDEFINED",
          strengths: "UNDEFINED",
          improvementAreas: "UNDEFINED"
        }
      },
      states: [],
      cities: []
    };
  },
  created() {
    this.fetchStates();
  },
  computed: {
    passwordMismatch() {
      return this.form.passwordHash !== this.form.password_confirmation;
    }
  },
  methods: {
    async fetchStates() {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const data = await response.json();

        this.states = data.map(state => ({
          sigla: state.sigla,
          nome: state.nome
        }));
      } catch (error) {
        console.error('Erro ao carregar os estados:', error);
      }
    },

    async fetchCities() {
      if (this.form.state) {
        try {
          const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.form.state}/municipios`);
          const data = await response.json();

          this.cities = data.map(city => city.nome);
        } catch (error) {
          console.error('Erro ao carregar as cidades:', error);
        }
      }
    },

    async submitForm() {
      const data = {
        ...this.form,
        finalObservations: "UNDEFINED",
        socialAspectRequest: {
          livingWith: "UNDEFINED",
          relationshipWithClassmates: "UNDEFINED",
          relationshipWithTeachers: "UNDEFINED",
          relationshipWithFamily: "UNDEFINED"
        },
        studyHabitRequest: {
          studyMethods: "UNDEFINED",
          studyHoursPerDay: "UNDEFINED",
          studyLocations: "UNDEFINED",
          studyPlan: "UNDEFINED"
        },
        healthWellbeingRequest: {
          healthCondition: "UNDEFINED",
          physicalActivity: "UNDEFINED",
          dietaryEvaluation: "UNDEFINED",
          sleepHours: "UNDEFINED"
        },
        interestHobbyRequest: {
          activitiesOutsideSchool: "UNDEFINED",
          dreamsGoals: "UNDEFINED"
        },
        selfAssessmentRequest: {
          performanceEvaluation: "UNDEFINED",
          strengths: "UNDEFINED",
          improvementAreas: "UNDEFINED"
        }
      };

      try {
        const response = await fetch('http://localhost:8080/api/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          this.$router.push('/login');
        } else {
          alert("Erro ao realizar o cadastro. Consulte um admin.");
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Ocorreu um erro inesperado.");
      }
    },
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
  border-bottom: 1px solid grey;
  transition: 1s;
}

input:active,
input:focus {
  transition: 1s;
  border: 1px solid #8c52ff;
  color: #8c52ff;
  box-shadow: 0 1px 0 0 #8c52ff;
}

select {
  border: none;
  border-bottom: 1px solid grey;
  background: transparent;
  padding: 5px;
  font-size: 16px;
  transition: 1s;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select:focus,
select:active {
  transition: 1s;
  border: 1px solid #8c52ff;
  color: #8c52ff;
  box-shadow: 0 1px 0 0 #8c52ff;
  outline: none;
}

.btn {
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 40px;
  font-size: 16px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
}

.btn:hover {
  opacity: 0.8;
  transition: 2s;
}
</style>
