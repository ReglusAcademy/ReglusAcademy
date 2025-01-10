<template>
    <div>
        <NavReglus />

        <div v-if="loading">
            Carregando detalhes da sala...
        </div>

        <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
        </div>

        <div v-if="!loading && room">
            <h3>{{ room.name }}</h3>
            <p><strong>Curso:</strong> {{ room.course.name }}</p>
            <p><strong>Descrição:</strong> {{ room.course.description }}</p>
            <p><strong>Preço:</strong> R$ {{ room.course.price }}</p>
            <p><strong>Início:</strong> {{ room.startDate }}</p>
            <p><strong>Término:</strong> {{ room.endDate || 'Em andamento' }}</p>
            <p><strong>Período:</strong> {{ room.course.period }}</p>
            <p><strong>Frequência:</strong> {{ room.course.schedule }}</p>

            <h4>Informações do Educador</h4>
            <p><strong>Nome:</strong> {{ room.educator.user.name }}</p>
            <p><strong>Email:</strong> {{ room.educator.user.email }}</p>
            <p><strong>Experiência:</strong> {{ room.educator.experienceYears }} anos</p>
            <p><strong>Bio:</strong> {{ room.educator.bio || 'Não disponível' }}</p>

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
            loading: true,
            errorMessage: ''
        };
    },
    async created() {
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

                this.loading = false;
            } catch (error) {
                this.errorMessage = error.message;
                this.loading = false;
            }
        }
    }
};
</script>