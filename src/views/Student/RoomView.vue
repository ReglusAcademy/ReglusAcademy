<template>
  <NavReglus />
  <h1>REGLUS ROOM</h1>
  <main>
    <div class="chat">
      <!-- <h4 style="text-align: center;">Chat [Futuro]</h4> -->
      <h4 style="text-align: center">Conversas Recentes</h4>
      <ul>
        <li v-for="chat in chatList" :key="chat.conversationId">
          <strong>{{ chat.otherUserName }}</strong>
          <button @click="abrirChat(chat)">Abrir Chat</button>
        </li>
      </ul>
    </div>

    <div class="registered">
      <div class="header">
        <div></div>
        <h2>Inscrito</h2>
        <router-link to="/salasinscritas" class="btnLink"
          >Ver todas</router-link
        >
      </div>
      <ul>
        <li v-for="room in enrolledRooms" :key="room.roomId">
          <strong>{{ room.name }}</strong>
          <span>{{ room.course.name }}</span>
          <span>{{ room.educator.user.name }}</span>
          <router-link
            :to="{ name: 'sala', params: { roomId: room.roomId } }"
            class="btn"
          >
            Ver Detalhes
          </router-link>
        </li>
      </ul>
    </div>

    <div class="available">
      <div class="header">
        <div></div>
        <h2>Disponíveis</h2>
        <router-link to="/salasdisponiveis" class="btnLink"
          >Ver todas</router-link
        >
      </div>
      <ul>
        <li v-for="room in rooms" :key="room.roomId">
          <strong>{{ room.name }}</strong>
          <span>{{ room.course.name }}</span>
          <span>Preço: R$ {{ room.course.price }}</span>
          <span>{{ room.educator.user.name }}</span>

          <button @click="enrollInRoom(room.roomId)" class="btn">
            Inscrever-se
          </button>
        </li>
      </ul>
    </div>
  </main>
  <FooterReglus />
</template>

<script>
import NavReglus from "@/components/nav/NavIn.vue";
import FooterReglus from "@/components/nav/FooterReglus.vue";

export default {
  name: "RoomView",
  components: {
    NavReglus,
    FooterReglus,
  },
  data() {
    return {
      userName: "",
      userRole: "",
      rooms: [],
      enrolledRooms: [],
      userId: null,
      chatList: [],
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = localStorage.getItem("userType");

    console.log(user);

    this.userRole = userType || "";

    if (!user || this.userRole !== "STUDENT") {
      this.$router.push("/");
    } else {
      this.userName = user.name;
      this.fetchAvailableRooms();
      this.fetchEnrolledRooms();
    }
  },
  async created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.userId) {
      this.$router.push("/");
      return;
    }
    this.userId = user.userId;

    await this.fetchUserChats();
  },
  methods: {
    async enrollInRoom(roomId) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const studentEmail = user ? user.email : null;

        if (!studentEmail) {
          throw new Error("Email do estudante não encontrado");
        }

        const studentResponse = await fetch(
          `http://localhost:8080/api/students/email/${encodeURIComponent(
            studentEmail
          )}`
        );
        const studentData = await studentResponse.json();
        const studentId = studentData.studentId;

        const enrollResponse = await fetch(
          `http://localhost:8080/api/rooms/enroll?studentId=${studentId}&roomId=${roomId}`,
          {
            method: "POST",
          }
        );

        if (!enrollResponse.ok) {
          throw new Error("Erro ao inscrever na sala");
        }

        alert("Inscrição realizada com sucesso!");

        console.log("Atualizando salas...");
        this.fetchAvailableRooms();
        this.fetchEnrolledRooms();
      } catch (error) {
        console.error(error);
        alert("Erro ao inscrever na sala!");
      }
    },

    async fetchEnrolledRooms() {
      const user = JSON.parse(localStorage.getItem("user"));
      const studentEmail = user ? user.email : null;

      if (!studentEmail) {
        return [];
      }

      try {
        const studentResponse = await fetch(
          `http://localhost:8080/api/students/email/${encodeURIComponent(
            studentEmail
          )}`
        );
        const studentData = await studentResponse.json();
        const studentId = studentData.studentId;
        const enrolledRoomsResponse = await fetch(
          `http://localhost:8080/api/rooms/student/${studentId}`
        );

        if (!enrolledRoomsResponse.ok) {
          throw new Error("Erro ao recuperar salas inscritas");
        }

        this.enrolledRooms = await enrolledRoomsResponse.json();
      } catch (error) {
        console.error(error);
        this.enrolledRooms = [];
      }
    },

    async fetchAvailableRooms() {
      const user = JSON.parse(localStorage.getItem("user"));
      const studentEmail = user ? user.email : null;

      if (!studentEmail) {
        return [];
      }

      try {
        const studentResponse = await fetch(
          `http://localhost:8080/api/students/email/${encodeURIComponent(
            studentEmail
          )}`
        );
        const studentData = await studentResponse.json();
        const studentId = studentData.studentId;

        const roomsResponse = await fetch(
          `http://localhost:8080/api/rooms/available?studentId=${studentId}`
        );
        if (!roomsResponse.ok) {
          throw new Error("Erro ao recuperar salas disponíveis");
        }

        const roomsData = await roomsResponse.json();
        this.rooms = [...roomsData];
      } catch (error) {
        console.error("Erro na recuperação das salas:", error);
        this.rooms = [];
      }
    },

    async fetchUserChats() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/chat/conversations/user/${this.userId}`
        );
        if (!response.ok) throw new Error("Erro ao buscar conversas.");

        const chats = await response.json();

        // Buscar nomes dos outros usuários para cada chat
        for (const chat of chats) {
            const userIdStr = String(this.userId);
            const otherUserId = chat.user1Id === userIdStr ? chat.user2Id : chat.user1Id;
            try {
                const userResp = await fetch(
                `http://localhost:8080/api/users/${otherUserId}`
                );
                if (!userResp.ok) throw new Error("Usuário não encontrado");
                const userData = await userResp.json();
                chat.otherUserName = userData.name || "Usuário";
            } catch {
                chat.otherUserName = "Usuário";
            }
        }

        this.chatList = chats;
      } catch (error) {
        console.error("Erro ao carregar chats:", error.message);
      }
    },

    getOtherUserId(chat) {
        const userIdStr = String(this.userId);
        return chat.user1Id === userIdStr ? chat.user2Id : chat.user1Id;
    },

    abrirChat(chat) {
        const targetUserId = this.getOtherUserId(chat);
        this.$router.push({
            name: "chat",
            query: {
            myUserId: String(this.userId),
            targetUserId: String(targetUserId),
            },
        });
    }
  },
};
</script>

<style scoped>
main {
  display: grid;
  padding: 0em 2em;
  margin-bottom: 5em;
  gap: 1em;
  height: 100vh;
  grid-template-columns: 300px 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

h1 {
  font-size: 3em;
  text-align: center;
  margin-bottom: 1em;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0em 5em;
}

.header h2 {
  font-size: 1.5em;
  text-align: center;
}

ul {
  min-height: 250px;
}

.chat {
  width: 300px;
  height: 100%;
  border: 1px solid rgb(180, 178, 178);
  box-shadow: 0 0 10px #8c52ff;
  border-radius: 8px;
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  box-sizing: border-box;
  justify-content: flex-start;
  padding: 1em;
  font-size: 1.1em;
  border-radius: 8px;
}

.chat ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.chat li {
  background: #fff;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease-in-out;
}

.chat li:hover {
  background-color: #f3ecff;
  transform: scale(1.01);
  cursor: pointer;
}

.chat li strong {
  font-size: 1em;
  color: #333;
}

.available {
  width: 205%;
  height: 100%;
  border: 1px solid rgb(180, 178, 178);
  box-shadow: 0 0 10px #8c52ff;
  border-radius: 8px;
  gap: 1em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 1em;
  font-size: 1.1em;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.registered {
  width: 205%;
  height: 100%;
  border: 1px solid rgb(180, 178, 178);
  box-shadow: 0 0 10px #8c52ff;
  border-radius: 8px;
  gap: 1em;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 1em;
  font-size: 1.1em;
  border-radius: 8px;
}

.registered li {
  background: #fafafa;
  height: 200px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-left: 5px solid var(--lilashover);
  justify-content: space-between;
  overflow: hidden;
}

.available li {
  background: #fafafa;
  height: 230px;
  width: 230px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-left: 5px solid var(--verde);
  justify-content: space-between;
  overflow: hidden;
}

.registered li span,
.registered li strong,
.available li span,
.available li strong {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
}

.btnLink {
  background-color: black;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  padding: 10px 20px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition: background-color 0.3s;
}

.btnLink:hover {
  background-color: #8c52ff;
}

.btn {
  margin-top: 1em;
  background: var(--lilashover);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  width: 100%;
  cursor: pointer;
  bottom: 0;
  transition: background 1s;
}
</style>
