<template>
    <div class="calendar-container">
        <FullCalendar :options="calendarOptions" />
    </div>

    <div v-if="showModal" class="modal">
        <div class="modal-content">
            <h2>{{ selectedActivity.title }}</h2>
            <p><strong>Data de Criação:</strong> {{ selectedActivity.createdAt }}</p>
            <p><strong>Data Limite:</strong> {{ selectedActivity.dataLimit }}</p>
            <p><strong>Pontuação Máxima:</strong> {{ selectedActivity.maxPoints }}</p>
            <p><strong>Curso:</strong> {{ selectedActivity.room?.course?.name }}</p>
            <p><strong>Professor:</strong> {{ selectedActivity.room?.educator?.user?.name }}</p>
            <router-link :to="'/sala/' + selectedActivity.room?.roomId">
                <button>Ir para a Sala</button>
            </router-link>

            <button @click="closeModal">Fechar</button>
        </div>

    </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
    name: "CalendarAcademy",
    components: {
        FullCalendar,
    },
    data() {
        return {
            showModal: false,
            selectedActivity: {},
            calendarOptions: {
                locale: "pt-br",
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialView: "dayGridMonth",
                showNonCurrentDates: false,
                fixedWeekCount: false,
                headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                },
                buttonText: {
                    today: "Hoje",
                    month: "Mês",
                    week: "Semana",
                    day: "Dia",
                    list: "Lista",
                },
                allDayText: "Dia inteiro",
                editable: true,
                selectable: true,
                events: [],
                eventClick: this.handleEventClick,
            },
        };
    },
    async mounted() {
        await this.loadActivities();
    },
    methods: {
        async loadActivities() {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userEmail = user?.email;
                const userType = user?.userType; // Pegando o tipo de usuário

                if (!userEmail || !userType) {
                    throw new Error('Usuário ou tipo de usuário não encontrado');
                }

                let rooms = [];

                if (userType === 'STUDENT') {
                    const studentResponse = await fetch(`http://localhost:8080/api/students/email/${encodeURIComponent(userEmail)}`);
                    const studentData = await studentResponse.json();
                    const studentId = studentData.studentId;

                    const roomsResponse = await fetch(`http://localhost:8080/api/rooms/student/${studentId}`);
                    rooms = await roomsResponse.json();
                }
                else if (userType === 'EDUCATOR') {
                    const educatorResponse = await fetch(`http://localhost:8080/api/educators/email/${encodeURIComponent(userEmail)}`);
                    const educatorData = await educatorResponse.json();
                    const educatorId = educatorData.educatorId;

                    const roomsResponse = await fetch(`http://localhost:8080/api/rooms/educator/${educatorId}`);
                    rooms = await roomsResponse.json();
                }

                let allEvents = [];

                for (const room of rooms) {
                    const activitiesResponse = await fetch(`http://localhost:8080/api/activities/room/${room.roomId}/activities`);
                    const activities = await activitiesResponse.json();

                    const events = activities.map(activity => {
                        const startDate = new Date(activity.createdAt);
                        const endDate = new Date(activity.dataLimit);

                        return {
                            title: activity.title,
                            start: startDate.toISOString(),
                            end: endDate.toISOString(),
                            allDay: true,
                            extendedProps: {
                                ...activity,
                                room,
                                createdAt: startDate.toLocaleString(),
                                dataLimit: endDate.toLocaleString(),
                            },
                        };
                    });

                    allEvents = [...allEvents, ...events];
                }

                this.calendarOptions.events = allEvents;
            } catch (error) {
                console.error("Erro ao buscar atividades:", error);
            }
        },

        handleEventClick(info) {
            this.selectedActivity = info.event.extendedProps;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.selectedActivity = {};
        },
    }
};
</script>

<style scoped>
.calendar-container {
    margin: 20px auto;
    max-width: 900px;
    width: 90%;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    text-align: center;
}

.modal-content button {
    margin-top: 10px;
    padding: 8px 16px;
    border: none;
    background: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}

.modal-content button:hover {
    background: #0056b3;
}

.modal-content a button {
    display: block;
    width: 100%;
    margin-top: 10px;
    padding: 8px 16px;
    border: none;
    background: #28a745;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
}

.modal-content a button:hover {
    background: #218838;
}
</style>