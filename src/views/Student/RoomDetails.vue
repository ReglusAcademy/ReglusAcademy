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
            <div class="roomTitle">
                <h3>{{ room.name }}</h3>
            </div>
            <!-- Seção descRoom -->
            <div class="descRoom">
                <div class="roomHeader">
                    <h4>Descrição da Sala</h4>
                    <button @click="toggleRoomVisibility" class="toggleButton">
                        <span v-if="isRoomVisible">&#x25BE;</span> <!-- Seta para baixo -->
                        <span v-else>&#x25B4;</span> <!-- Seta para cima -->
                    </button>
                </div>

                <div v-if="isRoomVisible">
                    <p><strong>Curso:</strong> {{ room.course.name }}</p>
                    <p><strong>Descrição:</strong> {{ room.course.description }}</p>
                    <p><strong>Preço:</strong> R$ {{ room.course.price }}</p>
                    <p><strong>Início:</strong> {{ room.startDate }}</p>
                    <p><strong>Término:</strong> {{ room.endDate || 'Em andamento' }}</p>
                    <p><strong>Período:</strong> {{ room.course.period }}</p>
                    <p><strong>Frequência:</strong> {{ room.course.schedule }}</p>
                </div>
            </div>

            <!-- Seção do Educador -->
            <div class="descEducator">
                <div class="educatorHeader">
                    <h4>Informações do Educador</h4>
                    <button @click="toggleEducatorInfo" class="toggleButton">
                        <span v-if="isEducatorInfoVisible">&#x25BE;</span>
                        <span v-else>&#x25B4;</span>
                    </button>
                </div>

                <div v-if="isEducatorInfoVisible">
                    <div class="educator-image">
                        <img :src="getEducatorImage(room.educator)" alt="Foto do Educador" />
                    </div>
                    <p><strong>Nome:</strong> {{ room.educator.user.name }}</p>
                    <p><strong>Email:</strong> {{ room.educator.user.email }}</p>
                    <p><strong>Experiência:</strong> {{ room.educator.experienceYears }} anos</p>
                    <p><strong>Bio:</strong> {{ room.educator.bio || 'Não disponível' }}</p>

                    <button @click="iniciarChatComProfessor" class="btn-iniciar-chat">
  💬 Conversar com o professor
</button>
                </div>
            </div>

            <!-- Seção de Atividades -->
            <div class="descActivities">
                <h4>Atividades</h4>

                <!-- Exibindo as atividades -->
                <div v-if="activities.length > 0">
                    <ul>
                        <li v-for="activity in activities" :key="activity.activityId">
                            <strong>{{ activity.title }}</strong><br />
                            <span>Máxima pontuação: {{ activity.maxPoints }}</span><br />
                            <span>Prazo: {{ activity.dataLimit }}</span><br />
                        </li>
                    </ul>
                </div>

                <!-- Caso não haja atividades cadastradas -->
                <div v-else class="no-activities">
                    Nenhuma atividade cadastrada para esta sala.
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
            activities: [],
            loading: true,
            errorMessage: '',
            userRole: "",
            isEducatorInfoVisible: true,
            isRoomVisible: true,
        };
    },
    async created() {
        const user = JSON.parse(localStorage.getItem("user"));
        const userType = localStorage.getItem("userType");

        this.userRole = userType || "";

        if (!user || this.userRole !== "STUDENT") {
            this.$router.push("/");
            window.location.reload();
            return;
        }

        await this.fetchRoomDetails();
    },
    methods: {
        getEducatorImage(educator) {
            if (educator.user.profileImage) {
                return "data:image/png;base64," + educator.user.profileImage;
            } else {
                if (educator.user.gender === "MALE") {
                    return require("@/assets/content/avatar/11.png");
                } else if (educator.user.gender === "FEMALE") {
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

        toggleRoomVisibility() {
            this.isRoomVisible = !this.isRoomVisible;
        },

        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.newActivityFile = file;
            }
        },

        submitActivity() {
            if (this.newActivityText.trim() === '' && !this.newActivityFile) {
                alert('Por favor, insira um texto ou anexe um arquivo.');
                return;
            }

            console.log('Texto da atividade:', this.newActivityText);
            console.log('Arquivo anexado:', this.newActivityFile);
            this.newActivityText = '';
            this.newActivityFile = null;
        },

        toggleEducatorInfo() {
            this.isEducatorInfoVisible = !this.isEducatorInfoVisible;
        },

        iniciarChatComProfessor() {
            const user = JSON.parse(localStorage.getItem("user"));
            const alunoId = user.userId;
            const professorId = this.room.educator.user.userId;

            if (!alunoId || !professorId) {
                alert("IDs inválidos.");
                return;
            }

            // Redireciona pra página de chat passando os IDs
            this.$router.push({
                name: "chat", // ou o nome da rota que exibe ChatTest.vue
                query: {
                myUserId: alunoId,
                targetUserId: professorId
                }
            });
        }
    }
};
</script>

<style scoped>
.educator-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.educator-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}

.educator-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.roomTitle {
    background-color: #8c52ff;
    color: white;
    padding: 1em;
    width: 100%;
    height: 30%;
    text-align: center;
    border-radius: 8px;
    margin-bottom: 2em;
}

#room {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2em;
    display: flex;
    flex-direction: column;
    gap: 2em;
}

.descRoom {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 2em;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1.5em;
}

.descEducator {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 2em;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1.5em;
}

.educatorHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.toggleButton {
    background-color: transparent;
    border: none;
    color: #8c52ff;
    font-size: 2em;
    cursor: pointer;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.toggleButton:hover {
    color: #7a44e0;
    transform: scale(1.1);
}

/* Ajustes para a seção de Atividades */
.descActivities {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 2em;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1.5em;
}

.descActivities h4 {
    font-size: 1.5em;
    color: #333;
    margin-bottom: 1em;
}

.descActivities ul {
    list-style-type: none;
    padding-left: 0;
}

.descActivities li {
    padding: 1em;
    background-color: #fafafa;
    margin-bottom: 1em;
    border-radius: 6px;
}

.descActivities li strong {
    font-size: 1.2em;
    color: #333;
}

.descActivities li span {
    font-size: 1em;
    color: #777;
}

.descActivities .no-activities {
    font-size: 1.2em;
    color: #888;
    font-style: italic;
}

/* Estilos de Formulário de Nova Atividade */
.newActivityForm h5 {
    font-size: 1.5em;
    color: #333;
    margin-bottom: 1em;
}

.textInput {
    width: 100%;
    padding: 1em;
    margin-bottom: 1em;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1em;
    box-sizing: border-box;
}

.fileInput {
    display: block;
    margin-bottom: 1em;
}

.submitBtn {
    background-color: #8c52ff;
    color: white;
    padding: 0.8em 2em;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    margin-left: 40%;
}

.submitBtn:hover {
    background-color: #8c52ff;
}

.roomHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
</style>
