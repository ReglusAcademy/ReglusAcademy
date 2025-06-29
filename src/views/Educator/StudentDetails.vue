<template>
  <NavReglus />
  <div v-if="!loading && student" id="raizFicha">
    <h3 style="text-align: center">Ficha de Acompanhamento</h3>
    <div id="ficha">
      <div class="descPerson">
        <h4>Informações Pessoais</h4>
        <div class="student-image">
          <img :src="getStudentImage(student)" alt="Foto do Estudante" />
        </div>
        <p><strong>Nome:</strong> {{ student.user.name }}</p>
        <p><strong>Email:</strong> {{ student.user.email }}</p>
        <p>
          <strong>Data de Nascimento:</strong>
          {{ formatDate(student.user.dateBirth) }}
        </p>
        <p><strong>Sexo:</strong> {{ translatedGender }}</p>
        <p><strong>Instituição:</strong> {{ student.user.instituteName }}</p>
        <h4>Observações Finais</h4>
        <p>{{ translatedFinalObservations }}</p>

        <h4>Localização</h4>
        <p><strong>Estado:</strong> {{ student.state }}</p>
        <p><strong>Cidade:</strong> {{ student.city }}</p>

        <button @click="iniciarChatComAluno(student.user.userId)" class="btnChat">
          Conversar
        </button>
      </div>

      <div class="socialAspects">
        <h4>Aspectos Sociais</h4>
        <p>
          <strong>Com quem mora:</strong>
          {{ capitalizeFirstLetter(student.socialAspect.livingWith) }}
        </p>
        <p>
          <strong>Relação com colegas:</strong>
          {{
            translateRelationship(
              student.socialAspect.relationshipWithClassmates
            )
          }}
        </p>
        <p>
          <strong>Relação com professores:</strong>
          {{
            translateRelationship(student.socialAspect.relationshipWithTeachers)
          }}
        </p>
        <p>
          <strong>Relação com a família:</strong>
          {{
            translateRelationship(student.socialAspect.relationshipWithFamily)
          }}
        </p>
      </div>

      <div class="healthWellbeing">
        <h4>Saúde e Bem-estar</h4>
        <p>
          <strong>Condição de Saúde:</strong> {{ translatedHealthCondition }}
        </p>
        <p>
          <strong>Atividade Física:</strong> {{ translatedPhysicalActivity }}
        </p>
        <p>
          <strong>Avaliação Dietética:</strong>
          {{ translatedDietaryEvaluation }}
        </p>
        <p><strong>Horas de Sono:</strong> {{ translatedSleepHours }}</p>
      </div>

      <div class="interestHobby">
        <h4>Hobbies e Interesses</h4>
        <p>
          <strong>Atividades fora da escola:</strong>
          {{ student.interestHobby.activitiesOutsideSchool }}
        </p>
        <p>
          <strong>Sonhos e Objetivos:</strong>
          {{ student.interestHobby.dreamsGoals }}
        </p>
      </div>

      <div class="studyHabits">
        <h4>Hábitos de Estudo</h4>
        <p>
          <strong>Métodos de Estudo:</strong>
          {{ student.studyHabit.studyMethods }}
        </p>
        <p>
          <strong>Horas de Estudo por Dia:</strong>
          {{ translatedStudyHoursPerDay }}
        </p>
        <p>
          <strong>Locais de Estudo:</strong>
          {{ student.studyHabit.studyLocations }}
        </p>
        <p>
          <strong>Plano de Estudo:</strong> {{ student.studyHabit.studyPlan }}
        </p>
      </div>

      <div class="selfAssessment">
        <h4>Avaliação Pessoal</h4>
        <p>
          <strong>Avaliação de Desempenho:</strong>
          {{ translatedPerformanceEvaluation }}
        </p>
        <p>
          <strong>Pontos Fortes:</strong> {{ student.selfAssessment.strengths }}
        </p>
        <p>
          <strong>Áreas de Melhoria:</strong>
          {{ student.selfAssessment.improvementAreas }}
        </p>
      </div>
    </div>
  </div>

  <div v-if="loading" class="loading-spinner">Carregando...</div>

  <div v-if="errorMessage" class="alert alert-danger">
    {{ errorMessage }}
  </div>

  <FooterReglus />
</template>

<script>
import NavReglus from "@/components/nav/NavIn.vue";
import FooterReglus from "@/components/nav/FooterReglus.vue";

export default {
  name: "StudentDetails",
  props: {
    studentId: {
      type: Number,
      required: true,
    },
  },
  components: {
    NavReglus,
    FooterReglus,
  },
  data() {
    return {
      student: null,
      loading: true,
      errorMessage: "",
      userRole: "",

      relationshipMap: {
        MUITO_BOA: "Muito Boa",
        BOA: "Boa",
        REGULAR: "Regular",
        RUIM: "Ruim",
        MUITO_RUIM: "Muito Ruim",
      },
      genderMap: {
        MALE: "Masculino",
        FEMALE: "Feminino",
        OTHER: "Outro",
        UNDEFINED: "Não definido",
      },
      observationsMap: {
        UNDEFINED: "Não há observações",
      },
      healthConditionMap: {
        YES: "Sim",
        NO: "Não",
        NONE: "Nenhuma",
      },
      physicalActivityMap: {
        NONE: "Nenhuma",
        DAILY: "Diariamente",
        WEEKLY: "Semanalmente",
        OCCASIONAL: "Ocasionalmente",
      },
      dietaryEvaluationMap: {
        SAUDAVEL: "Saudável",
        UNHEALTHY: "Não Saudável",
        BALANCED: "Balanceada",
        VEGAN: "Vegana",
        VEGETARIAN: "Vegetariana",
      },
      sleepHoursMap: {
        MENOS_DE_SEIS_HORAS: "Menos de 6 horas",
        SEIS_SETE_HORAS: "6 a 7 horas",
        OITO_NOVE_HORAS: "8 a 9 horas",
        MAIS_DE_DEZ_HORAS: "Mais de 10 horas",
      },
      studyHoursMap: {
        MENOS_DE_UMA_HORA: "Menos de 1 hora",
        UMA_DUAS_HORAS: "1 a 2 horas",
        DUAS_TRES_HORAS: "2 a 3 horas",
        MAIS_DE_QUATRO_HORAS: "Mais de 4 horas",
      },
      performanceMap: {
        OTIMA: "Ótima",
        BOA: "Boa",
        REGULAR: "Regular",
        RUIM: "Ruim",
        MUITO_RUIM: "Muito Ruim",
      },
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = localStorage.getItem("userType");

    this.userRole = userType || "";

    if (!user || this.userRole !== "EDUCATOR") {
      this.$router.push("/");
      return;
    }

    this.fetchStudentDetails();
  },
  computed: {
    translatedGender() {
      return this.translateValue(this.student.user.gender, this.genderMap);
    },
    translatedFinalObservations() {
      return this.translateValue(
        this.student.finalObservations,
        this.observationsMap,
        "Não há observações"
      );
    },
    translatedHealthCondition() {
      return this.translateValue(
        this.student.healthWellbeing.healthCondition,
        this.healthConditionMap
      );
    },
    translatedPhysicalActivity() {
      return this.translateValue(
        this.student.healthWellbeing.physicalActivity,
        this.physicalActivityMap
      );
    },
    translatedDietaryEvaluation() {
      return this.translateValue(
        this.student.healthWellbeing.dietaryEvaluation,
        this.dietaryEvaluationMap
      );
    },
    translatedSleepHours() {
      return this.translateValue(
        this.student.healthWellbeing.sleepHours,
        this.sleepHoursMap
      );
    },
    translatedStudyHoursPerDay() {
      return this.translateValue(
        this.student.studyHabit.studyHoursPerDay,
        this.studyHoursMap
      );
    },
    translatedPerformanceEvaluation() {
      return this.translateValue(
        this.student.selfAssessment.performanceEvaluation,
        this.performanceMap
      );
    },
  },
  methods: {
    translateValue(value, translationMap, defaultValue = "Não informado") {
      if (translationMap && typeof value !== "undefined" && value !== null) {
        return translationMap[value] || value;
      }
      return defaultValue;
    },

    translateRelationship(value) {
      return this.translateValue(value, this.relationshipMap);
    },

    capitalizeFirstLetter(string) {
      if (!string) return "";
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    formatDate(dateString) {
      const [year, month, day] = dateString.split("-");
      return `${String(day).padStart(2, "0")}/${String(month).padStart(
        2,
        "0"
      )}/${year}`;
    },

    getStudentImage(student) {
      if (student.user.profileImage) {
        return "data:image/png;base64," + student.user.profileImage;
      } else {
        if (student.user.gender === "MALE") {
          return require("@/assets/content/avatar/11.png");
        } else if (student.user.gender === "FEMALE") {
          return require("@/assets/content/avatar/10.png");
        } else {
          return require("@/assets/content/avatar/12.png");
        }
      }
    },

    async fetchStudentDetails() {
      const studentId = this.$route.params.studentId;

      try {
        const response = await fetch(
          `http://localhost:8080/api/students/id/${studentId}`
        );
        if (!response.ok) {
          throw new Error("Erro ao carregar os detalhes do estudante.");
        }
        this.student = await response.json();
        this.loading = false;
      } catch (error) {
        this.errorMessage = error.message;
        this.loading = false;
      }
    },

    iniciarChatComAluno(alunoId) {
      const professor = JSON.parse(localStorage.getItem("user"));
      const professorId = professor.userId;

      if (!professorId || !alunoId) {
        alert("IDs inválidos.");
        return;
      }

      this.$router.push({
        name: "chat",
        query: {
          myUserId: professorId,
          targetUserId: alunoId,
        },
      });
    },
  },
};
</script>

<style scoped>
.student-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.student-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.default-avatar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

#raizFicha {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}

/* #ficha {
    display: grid;
    grid-template-columns: 40% auto;
    grid-template-rows: auto;
    grid-auto-flow: column;
    gap: 1em;
    align-items: start;
    padding: 0em 5em;
} */

#ficha {
  display: grid;
  /* Define larguras fixas para as colunas. Ajuste 400px e 550px conforme sua necessidade. */
  /* minmax(400px, 1fr) permite que a primeira coluna seja no mínimo 400px, mas se estenda se houver espaço. */
  /* 550px para a segunda coluna, para um valor fixo. */
  grid-template-columns: minmax(300px, 1fr) 650px;
  gap: 1.5em; /* Aumentei um pouco o espaçamento entre as colunas e linhas */
  align-items: start; /* Alinha os itens ao topo da célula da grade */
  padding: 1em 2em; /* Padding geral para a ficha */
  max-width: 1200px; /* Limita a largura máxima da ficha para não esticar demais */
  width: 100%; /* Garante que ocupe a largura disponível até o max-width */
}

h3 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.descPerson,
.socialAspects,
.healthWellbeing,
.interestHobby,
.studyHabits,
.selfAssessment {
  padding: 1em;
  border-radius: 10px;
}

.descPerson {
  border: 2px solid var(--roxo);
  min-width: 470px;
  grid-column: 1 / 2;
  grid-row: 1 / span 2;
}

.socialAspects {
  border: 2px solid var(--verde);
  grid-column: 2 / 3;
  grid-row: 1 / span 1;
}

.healthWellbeing {
  border: 2px solid var(--lilas);
}

.interestHobby {
  border: 2px solid var(--lilashover);
}

.studyHabits {
  border: 2px solid var(--azul);
}

.selfAssessment {
  border: 2px solid var(--verde);
}

.socialAspects,
.healthWellbeing,
.interestHobby,
.studyHabits,
.selfAssessment {
  grid-column: 2 / 3;
  align-self: start;
  height: 100%;
}

.btnChat {
  border: 1px solid var(--roxo);
}
</style>
