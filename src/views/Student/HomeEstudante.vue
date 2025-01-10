<template>
  <NavReglus />
  <div class="container">
    <h1>Olá, {{ userName }}!</h1>
    <div class="boxes">
      <div class="box blue">
        <div class="content">
          <h2>Seja acompanhado por um tutor</h2>
          <p class="small-text">Gratuito</p>
          <router-link to="/agenda" class="button">Agende</router-link>
        </div>
        <img src="@/assets/content/professorealuno.png" alt="Tutor" class="image" />
      </div>

      <div class="box purple">
        <div class="content">
          <h2>Organize seus estudos</h2>
          <p class="small-text">Gratuito</p>
          <router-link to="/introducaoaprogramacao" class="button">Organize</router-link>
        </div>
        <img src="@/assets/content/organizeosestudos.png" alt="Organização" class="image" />
      </div>
    </div>

    <div>
      <h2>Salas Disponíveis</h2>
      <ul>
        <li v-for="room in rooms" :key="room.roomId">
          <strong>{{ room.name }}</strong><br />
          <span>{{ room.course.name }} - {{ room.course.description }}</span><br />
          <span>Início: {{ room.startDate }} - Término: {{ room.endDate || 'Indefinido' }}</span><br />
          <span>Preço: R$ {{ room.course.price }}</span><br />
          <span>Educador(a): {{ room.educator.user.name }}</span><br />

          <button @click="enrollInRoom(room.roomId)">Inscrever-se</button>
        </li>
      </ul>
    </div>

    <div>
      <h2>Salas em que você está inscrito</h2>
      <ul>
        <li v-for="room in enrolledRooms" :key="room.roomId">
          <strong>{{ room.name }}</strong><br />
          <span>{{ room.course.name }} - {{ room.course.description }}</span><br />
          <span>Início: {{ room.startDate }} - Término: {{ room.endDate || 'Indefinido' }}</span><br />
          <span>Educador(a): {{ room.educator.user.name }}</span><br />
        </li>
      </ul>
    </div>
  </div>
  <FooterReglus />
</template>

<script>
import NavReglus from "@/components/nav/NavIn.vue";
import FooterReglus from "@/components/nav/FooterReglus.vue";
export default {
  name: "HomeEstudante",
  components: {
    NavReglus,
    FooterReglus
  },
  data() {
    return {
      userName: '',
      rooms: [],
      enrolledRooms: []
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      this.$router.push('/');
    } else {
      this.userName = user.name;
      this.fetchAvailableRooms();
      this.fetchEnrolledRooms();
    }
  },
  methods: {
    async enrollInRoom(roomId) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const studentEmail = user ? user.email : null;

        if (!studentEmail) {
          throw new Error('Email do estudante não encontrado');
        }

        const studentResponse = await fetch(`http://localhost:8080/api/students/email/${encodeURIComponent(studentEmail)}`);
        const studentData = await studentResponse.json();
        const studentId = studentData.studentId;

        const enrollResponse = await fetch(`http://localhost:8080/api/rooms/enroll?studentId=${studentId}&roomId=${roomId}`, {
          method: 'POST'
        });

        if (!enrollResponse.ok) {
          throw new Error('Erro ao inscrever na sala');
        }

        alert('Inscrição realizada com sucesso!');

        console.log('Atualizando salas...');
        this.fetchAvailableRooms();
        this.fetchEnrolledRooms();

      } catch (error) {
        console.error(error);
        alert('Erro ao inscrever na sala!');
      }
    },

    async fetchEnrolledRooms() {
      const user = JSON.parse(localStorage.getItem('user'));
      const studentEmail = user ? user.email : null;

      if (!studentEmail) {
        return [];
      }

      try {
        const studentResponse = await fetch(`http://localhost:8080/api/students/email/${encodeURIComponent(studentEmail)}`);
        const studentData = await studentResponse.json();
        const studentId = studentData.studentId;
        const enrolledRoomsResponse = await fetch(`http://localhost:8080/api/rooms/student/${studentId}`);

        if (!enrolledRoomsResponse.ok) {
          throw new Error('Erro ao recuperar salas inscritas');
        }

        this.enrolledRooms = await enrolledRoomsResponse.json();
      } catch (error) {
        console.error(error);
        this.enrolledRooms = [];
      }
    },

    async fetchAvailableRooms() {
      const user = JSON.parse(localStorage.getItem('user'));
      const studentEmail = user ? user.email : null;

      if (!studentEmail) {
        return [];
      }

      try {
        const studentResponse = await fetch(`http://localhost:8080/api/students/email/${encodeURIComponent(studentEmail)}`);
        const studentData = await studentResponse.json();
        const studentId = studentData.studentId;

        const roomsResponse = await fetch(`http://localhost:8080/api/rooms/available?studentId=${studentId}`)
        if (!roomsResponse.ok) {
          throw new Error('Erro ao recuperar salas disponíveis');
        }

        const roomsData = await roomsResponse.json();
        this.rooms = [...roomsData];
      } catch (error) {
        console.error('Erro na recuperação das salas:', error);
        this.rooms = [];
      }
    }
  }
}

</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.boxes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1em;
  margin-top: 2em;
}

.box {
  padding: 1em;
  border-radius: 8px;
  color: white;
}

.boxAll {
  grid-column: span 2;
}

.blue {
  background-color: #8c52ff;
}

.purple {
  background-color: #003366;
  /* Roxo */
}

.content {
  flex: 1;
  text-align: left;
}

.small-text {
  font-size: 0.8em;
}

.button {
  display: inline-block;
  padding: 0.5em 1em;
  margin-top: 0.5em;
  background-color: #ffffff;
  color: #000;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
}

.image {
  width: 100px;
  height: auto;
}
</style>