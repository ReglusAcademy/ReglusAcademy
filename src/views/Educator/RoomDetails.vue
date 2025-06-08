<template>
  <div>
    <NavReglus />

    <div v-if="loading">
      Carregando detalhes da sala...
    </div>

    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <div v-if="!loading && room" id="room">
      <div class="descRoom">
        <h3>{{ room.name }}</h3>
        <p><strong>Curso:</strong> {{ room.course.name }}</p>
        <p><strong>Descrição:</strong> {{ room.course.description }}</p>
        <p><strong>Preço:</strong> R$ {{ room.course.price }}</p>
        <p><strong>Início:</strong> {{ room.startDate }}</p>
        <p><strong>Término:</strong> {{ room.endDate || 'Em andamento' }}</p>
        <p><strong>Período:</strong> {{ room.course.period }}</p>
        <p><strong>Frequência:</strong> {{ room.course.schedule }}</p>
      </div>

      <div class="descEducator">
        <h4>Informações do Educador</h4>
        <p><strong>Nome:</strong> {{ room.educator.user.name }}</p>
        <p><strong>Email:</strong> {{ room.educator.user.email }}</p>
        <p><strong>Experiência:</strong> {{ room.educator.experienceYears }} anos</p>
        <p><strong>Bio:</strong> {{ room.educator.bio || 'Não disponível' }}</p>
      </div>

      <div class="descStudents">
        <h4>Estudantes Cadastrados</h4>
        <ul v-if="students.length > 0">
          <li v-for="student in students" :key="student.studentId">
            <div class="student-image">
              <img :src="getStudentImage(student)" alt="Foto do Estudante" />
            </div>
            <strong>{{ student.user.name }}</strong><br />
            <span>{{ student.user.email }}</span><br />
            <span>Estado: {{ student.state }}</span><br />
            <span>Cidade: {{ student.city }}</span><br />
            <router-link :to="{ name: 'estudante', params: { studentId: student.studentId } }">
              <button>Conferir Ficha</button>
            </router-link>
          </li>
        </ul>
        <div v-else>
          Nenhum aluno cadastrado na sala.
        </div>
      </div>

      <div class="descActivities">
        <h4>Atividades</h4>
        <div v-if="activities.length > 0">
          <ul>
            <li v-for="activity in activities" :key="activity.activityId">
              <strong>{{ activity.title }}</strong><br />
              <span>Máxima pontuação: {{ activity.maxPoints }}</span><br />
              <span>Prazo: {{ formatDate(activity.dataLimit) }}</span><br />
              <router-link :to="{ name: 'atividade', params: { activityId: activity.activityId } }">
                <button>Conferir</button>
              </router-link>
            </li>
          </ul>
        </div>
        <div v-else>
          Nenhuma atividade cadastrada para esta sala.
        </div>

        <!-- Formulário de nova atividade -->
        <div class="newActivityForm">
          <form @submit.prevent="createActivity">
            <input v-model="newActivity.title" placeholder="Título da atividade" required />
            <input v-model="newActivity.description" placeholder="Descrição da atividade" required />
            <input v-model="newActivity.maxPoints" type="number" placeholder="Máxima pontuação" />
            <input v-model="dataLimitString" type="datetime-local" required />
            <input type="file" @change="handleFileChange" />
            <button type="submit">Criar Atividade</button>
          </form>
        </div>

      </div>
    </div>

    <FooterReglus />
  </div>

</template>

<script>
import NavReglus from "@/components/nav/NavIn.vue";
import FooterReglus from "@/components/nav/FooterReglus.vue";

export default {
  name: "RoomDetails",
  components: {
    NavReglus,
    FooterReglus
  },
  data() {
    return {
      room: null,
      students: [],
      activities: [],
      newActivityText: '',
      newActivityFile: null,
      newActivity: {
        title: '',
        maxPoints: '',
        description: '',
        roomId: null,
        educatorId: null,
        fileData: null,
      },
      dataLimitString: '',
      loading: true,
      errorMessage: '',
      userRole: ""
    };
  },
  async created() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = localStorage.getItem("userType");

    this.userRole = userType || "";

    if (!user || this.userRole !== "EDUCATOR") {
      this.$router.push("/");
      window.location.reload();
      return;
    }
    await this.fetchRoomDetails();

    const roomId = this.$route.params.roomId;
    this.newActivity.roomId = this.$route.params.roomId;

    const response = await fetch(`http://localhost:8080/api/rooms/${roomId}`);
    const roomData = await response.json();

    this.newActivity.educatorId = roomData.educator.educatorId;
  },
  methods: {
    formatDate(dateTimeString) {
      if (!dateTimeString) {
        return 'Não disponível';
      }

      const date = new Date(dateTimeString);

      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
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

    async fetchRoomDetails() {
      const roomId = this.$route.params.roomId;

      try {
        const response = await fetch(`http://localhost:8080/api/rooms/${roomId}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar detalhes da sala');
        }

        const data = await response.json();
        this.room = data;

        const studentsResponse = await fetch(`http://localhost:8080/api/rooms/${roomId}/students`);
        if (!studentsResponse.ok) {
          throw new Error("Erro ao carregar os estudantes.");
        }
        this.students = await studentsResponse.json();

        const activitiesResponse = await fetch(`http://localhost:8080/api/activities/room/${roomId}/activities`);
        if (!activitiesResponse.ok) {
          throw new Error("Erro ao carregar as atividades.");
        }
        this.activities = await activitiesResponse.json();

        this.loading = false;
      } catch (error) {
        this.errorMessage = error.message;
        this.loading = false;
      }
    },

    handleFileChange(event) {
      this.newActivity.fileData = event.target.files[0];
    },

    async createActivity() {
      const formData = new FormData();
      formData.append('title', this.newActivity.title);
      formData.append('maxPoints', this.newActivity.maxPoints);
      formData.append('description', this.newActivity.description);
      formData.append('roomId', this.newActivity.roomId);
      formData.append('educatorId', this.newActivity.educatorId);
      formData.append('dataLimit', this.dataLimitString);

      if (this.newActivity.fileData) {
        formData.append('fileData', this.newActivity.fileData);
      }

      try {
        const response = await fetch('http://localhost:8080/api/activities', {
          method: 'POST',
          body: formData, // Envia os dados do formulário, incluindo o arquivo
        });

        if (!response.ok) {
          throw new Error('Erro ao criar atividade');
        }

        // const data = await response.json();
        // console.log('Atividade criada:', data);
        window.location.reload()
      } catch (error) {
        console.error('Erro ao criar atividade:', error.message);
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
  color: #343a40;
  margin: 0;
  padding: 0;
}

h3 {
  font-size: 2.2em;
  color: var(--roxo);
  margin-bottom: 1em;
  text-align: center;
}

h4 {
  font-size: 1.6em;
  color: #495057;
  margin-top: 2em;
  margin-bottom: 1em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid var(--roxo);
  text-align: center;
}

p {
  line-height: 1.6;
  margin-bottom: 0.5em;
}

strong {
  color: #212529;
}

#room {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 1.5em;
  padding: 2em 2em;
  max-width: 1200px;
  margin: 2em auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  align-items: start;
}

.descRoom,
.descEducator,
.descStudents,
.descActivities {
  padding: 1.5em;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 0;
  height: fit-content;
}

.descRoom {
  border: 1px solid #d1e7dd;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.descEducator {
  border: 1px solid #cfe2ff;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.descStudents {
  border: 1px solid #fff3cd;
  grid-column: 1 / 3;
  grid-row: 2 / 3;
}

.descActivities {
  border: 1px solid #f8d7da;
  grid-column: 1 / 3;
  grid-row: 3 / 4;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 1em;
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  gap: 1em;
}

ul li:last-child {
  margin-bottom: 0;
}

.student-image {
  width: 60px;
  height: 60px;
  min-width: 60px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--roxo);
  ;
}

.student-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

button {
  padding: 10px 18px;
  font-size: 1em;
  background-color: var(--roxo);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 0.5em;
}

button:hover {
  background-color: var(--lilas);
}

.newActivityForm {
  margin-top: 2em;
  padding: 1.5em;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border: 1px dashed #6c757d;
}

.newActivityForm form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.newActivityForm input {
  padding: 12px;
  font-size: 1.1em;
  border: 1px solid #e9ecef;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
}

.newActivityForm input:focus {
  border-color: var(--roxo);
  box-shadow: 0 0 0 0.2rem rgba(179, 0, 255, 0.25);
}

.newActivityForm input::placeholder {
  color: #888;
  font-style: italic;
}

.newActivityForm button {
  width: auto;
  align-self: flex-end;
}

.alert {
  padding: 1em;
  margin: 1.5em auto;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  max-width: 600px;
}

.alert-danger {
  background-color: #dc3545;
  /* Vermelho para erro */
  color: #fff;
  border: 1px solid #dc3545;
}
</style>