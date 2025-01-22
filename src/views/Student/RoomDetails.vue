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

            <div class="descActivities">
                <h4>Atividades</h4>
                <div v-if="activities.length > 0">
                    <ul>
                        <li v-for="activity in activities" :key="activity.activityId">
                            <strong>{{ activity.title }}</strong><br />
                            <span>Máxima pontuação: {{ activity.maxPoints }}</span><br />
                            <span>Prazo: {{ activity.dataLimit }}</span><br />
                        </li>
                    </ul>
                </div>
                <div v-else>
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
            userRole: ""
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
        }
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