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
                            <span>Prazo: {{ activity.dataLimit }}</span><br />
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
.newActivityForm {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Estilo do formulário */
form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Estilo dos campos de entrada */
input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s ease;
}

input:focus {
    border-color: #007bff;
}

/* Estilo do botão */
button {
    padding: 12px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}

/* Estilo para inputs de tipo number e file */
input[type="number"],
input[type="file"],
input[type="datetime-local"] {
    max-width: 100%;
}

/* Placeholder estilizado */
input::placeholder {
    color: #888;
    font-style: italic;
}

.student-image {
    width: 60px;
    height: 60px;
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

#room {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.descRoom {
    border: 1px solid red;
}

.descEducator {
    border: 1px solid purple;
}

.descStudents {
    border: 1px solid green;
}

.descActivities {
    border: 1px solid blue;
}
</style>