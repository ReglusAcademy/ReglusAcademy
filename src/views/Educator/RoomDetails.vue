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
                <h4>Alunos Cadastrados</h4>
                <ul v-if="students.length > 0">
                    <li v-for="student in students" :key="student.studentId">
                        <strong>{{ student.user.name }}</strong><br />
                        <span>{{ student.user.email }}</span><br />
                        <span>Estado: {{ student.state }}</span><br />
                        <span>Cidade: {{ student.city }}</span><br />
                        <router-link :to="{ name: 'estudante', params: { studentId: student.studentId } }">
                            <button>Conferir Ficha de Acompanhamento</button>
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
                        <input v-model="newActivity.maxPoints" type="number" placeholder="Máxima pontuação" required />
                        <input v-model="dataLimitString" type="datetime-local" required />
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
                dataLimit: ''
            },
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
    },
    methods: {
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
                    throw new Error("Erro ao carregar os alunos.");
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

        async createActivity() {
            const user = JSON.parse(localStorage.getItem('user'));
            const educatorEmail = user ? user.email : null;

            if (!educatorEmail) {
                throw new Error('Email do educador não encontrado');
            }

            const educatorResponse = await fetch(`http://localhost:8080/api/users/email/${encodeURIComponent(educatorEmail)}`);
            const educatorData = await educatorResponse.json();
            const educatorId = educatorData.userId;

            const roomId = parseInt(this.$route.params.roomId, 10);

            const dataLimitString = "2025-02-27T15:48";
            const dataLimit = new Date(dataLimitString).toISOString();

            const activityData = {
                roomId,
                educatorId,
                title: this.newActivity.title,
                maxPoints: this.newActivity.maxPoints,
                dataLimit: dataLimit
            };

            console.log(activityData)

            const createResponse = await fetch('http://localhost:8080/api/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(activityData)
            });

            if (createResponse.ok) {
                this.newActivity.title = '';
                this.newActivity.maxPoints = '';
                this.newActivity.dataLimit = '';
                window.location.reload();
            } else {
                console.error('Erro ao criar atividade');
            }
        },
    }
};
</script>

<style scoped>
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