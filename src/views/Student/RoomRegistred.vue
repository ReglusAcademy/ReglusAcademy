<template>
    <NavReglus />
    <h1>REGLUS ROOM</h1>
    <main>
        <div class="registered">
            <h2>Inscrito</h2>
            <ul>
                <li v-for="room in enrolledRooms" :key="room.roomId">
                    <strong>{{ room.name }}</strong>
                    <span>{{ room.course.name }}</span>
                    <span>{{ room.educator.user.name }}</span>
                    <router-link :to="{ name: 'sala', params: { roomId: room.roomId } }" class="btn">
                        Ver Detalhes
                    </router-link>
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
        FooterReglus
    },
    data() {
        return {
            userName: '',
            userRole: '',
            rooms: [],
            enrolledRooms: []
        };
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem("user"));
        const userType = localStorage.getItem("userType");

        console.log(user)

        this.userRole = userType || "";

        if (!user || this.userRole !== "STUDENT") {
            this.$router.push("/");
        } else {
            this.userName = user.name;
            this.fetchEnrolledRooms();
        }
    },
    methods: {
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
    }
}
</script>

<style scoped>
main {
    display: grid;
    height: 100vh;
}

h1 {
    font-size: 2em;
    text-align: center;
    margin-bottom: 1em;
}

main h2 {
    font-size: 1.5em;
    text-align: center;
}

ul {
    min-height: 250px;
}

.registered {
    width: 100%;
    height: 50vh;
    border: 1px solid black;
    gap: 1em;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    font-size: 1.1em;
}

.registered li {
    background: #fafafa;
    height: 250px;
    padding: 10px;
    border-radius: 10px; 
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); 
    border-left: 5px solid var(--lilashover); 
    justify-content: space-between;
    overflow: hidden;
}

.registered li span,
.registered li strong {
    display: block; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
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