<template>
  <NavReglusV2></NavReglusV2>
  <CalendarAcademy />
  <FooterReglus />
</template>

<script>
import NavReglusV2 from "@/components/nav/NavIn.vue";
import FooterReglus from "@/components/nav/FooterReglus.vue";
import CalendarAcademy from "@/components/card/resources/CalendarAcademy.vue";

export default {
  name: "AgendaReglus",
  components: {
    NavReglusV2,
    CalendarAcademy,
    FooterReglus
  },
  data() {
    return {
      daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      months: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      selectedDate: null,
      newTask: '',
      todos: {},
    };
  },
  computed: {
    weeks() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      const days = [];

      // Preenche os dias do mês
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({ date: new Date(this.currentYear, this.currentMonth, i) });
      }

      const weeks = [];
      let week = new Array(firstDay).fill(null);
      for (let day of days) {
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
        week.push(day);
      }
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);

      return weeks;
    },
    selectedDateString() {
      return this.selectedDate ? this.selectedDate.toDateString() : '';
    },
  },
  methods: {
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    selectDate(date) {
      this.selectedDate = date;
      if (!this.todos[this.selectedDateString]) {
        this.todos[this.selectedDateString] = [];
      }
    },
    isSelected(date) {
      return this.selectedDate && this.selectedDate.toDateString() === date.toDateString();
    },
    formatDate(date) {
      return date.toLocaleDateString();
    },
    addTask() {
      if (this.newTask.trim()) {
        this.todos[this.selectedDateString].push({ text: this.newTask });
        this.newTask = '';
      }
    },
    removeTask(index) {
      this.todos[this.selectedDateString].splice(index, 1);
    },
  },
};
</script>

<style scoped>
</style>