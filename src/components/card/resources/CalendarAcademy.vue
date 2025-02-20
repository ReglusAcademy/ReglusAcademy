<template>
    <FullCalendar :options="calendarOptions" />
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
            calendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialView: "dayGridMonth",
                headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                },
                editable: true,
                selectable: true,
                events: [
                    { title: "Reunião com equipe", start: "2025-02-05T10:00:00", end: "2025-02-07T11:00:00" },
                    { title: "Atividade de Matemática", start: "2025-02-06" },
                    { title: "Entrega de trabalho", start: "2025-02-08T23:59:59" },
                ],
                dateClick: this.handleDateClick,
                eventClick: this.handleEventClick,
                eventDrop: this.handleEventDrop,
                eventResizableFromStart: true, // Permite redimensionamento
                eventResize: this.handleEventResize,
                slotMinTime: "08:00:00",
                slotMaxTime: "18:00:00",
            },
        };
    },
    methods: {
        handleEventDrop(info) {
            console.log("Evento movido para:", info.event.start);
        },
        handleEventResize(info) {
            console.log("Evento redimensionado:", info.event.end);
        },
        handleDateClick(info) {
            this.calendarOptions.events.push({
                title: "Novo Evento",
                start: info.dateStr,
            });
        },
        handleEventClick(info) {
            if (confirm(`Remover o evento "${info.event.title}"?`)) {
                info.event.remove();
            }
        },
    },
};
</script>

<style scoped></style>