<template>
    <div class="list">
        <div v-if="loading" class="loading-spinner">
            Carregando...
        </div>

        <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
        </div>

        <div v-if="!loading && rooms.length > 0">
            <ul>
                <li v-for="room in rooms" :key="room.roomId">
                    <strong>{{ room.name }}</strong><br />
                    <span>{{ room.course.name }}</span><br />
                    <span>Período: {{ room.course.period }}</span> <br />
                    <span>Frequência: {{ room.course.schedule }}</span> <br />

                    <router-link :to="{ name: 'salaAdmin', params: { roomId: room.roomId } }">
                        <button>Conferir</button>
                    </router-link>

                </li>
            </ul>
        </div>

        <div v-if="!loading && rooms.length === 0">
            Nenhuma cadastrada por enquanto...
        </div>
    </div>
</template>

<script>
export default {
    name: "RoomListEducator",
    data() {
        return {
            rooms: [],
            loading: true,
            errorMessage: ''
        };
    },
    mounted() {
        this.fetchRooms();
    },
    methods: {
        async fetchRooms() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user ? user.userId : null;

            if (!userId) {
                this.errorMessage = "Não foi possível recuperar o ID do usuário.";
                this.loading = false;
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/api/educators');

                if (!response.ok) {
                    throw new Error("Erro ao buscar educadores");
                }

                const educators = await response.json();
                const educator = educators.find(educator => educator.user.userId === userId);

                if (!educator) {
                    throw new Error("Educador não encontrado");
                }

                const educatorId = educator.educatorId;
                const roomsResponse = await fetch(`http://localhost:8080/api/rooms/educator/${educatorId}`);

                if (!roomsResponse.ok) {
                    throw new Error("Erro ao carregar as salas.");
                }

                const roomsData = await roomsResponse.json();
                this.rooms = roomsData;
                this.loading = false;
            } catch (error) {
                this.errorMessage = error.message;
                this.loading = false;
            }
        }
    }
}
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
  color: #343a40;
  margin: 0;
  padding: 0;
}

h2 {
  font-size: 2.5em;
  color: var(--roxo);
  margin-bottom: 1.5em;
  text-align: center;
  padding-top: 1em;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  margin: 0 auto;
  max-width: 1200px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.8em;
  width: 100%;
  margin-top: 1em;
}

li {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 180px; 
}

li:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18);
}

li strong {
  font-size: 1.4em;
  color: var(--roxo);
  margin-bottom: 0.5em;
  display: block;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 0.5em;
}

li span {
  font-size: 0.95em;
  color: #555;
  margin-bottom: 0.3em;
  display: block;
}

router-link {
  align-self: flex-end;
  margin-top: 1em;
}

button {
  padding: 10px 18px;
  font-size: 0.95em;
  background-color: var(--roxo);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #69076f;
}

.loading-spinner {
  text-align: center;
  font-size: 1.2em;
  color: var(--roxo);
  margin-top: 2em;
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
  color: #fff;
  border: 1px solid #dc3545;
}

div[v-if="!loading && rooms.length === 0"] {
  text-align: center;
  font-size: 1.2em;
  color: #6c757d;
  margin-top: 2em;
  width: 100%;
}
</style>