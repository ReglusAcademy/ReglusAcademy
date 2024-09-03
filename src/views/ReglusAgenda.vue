<template>
  <div class="calendar">
    <NavReglusV2 />
    <div class="calendar-header">
      <button @click="prevMonth">Anterior</button>
      <span>{{ currentMonth }} {{ currentYear }}</span>
      <button @click="nextMonth">Próximo</button>
    </div>
    <div class="calendar-body">
      <table>
        <thead>
          <tr>
            <th>Segunda</th>
            <th>Terça</th>
            <th>Quarta</th>
            <th>Quinta</th>
            <th>Sexta</th>
            <th>Sábado</th>
            <th>Domingo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in weeks" :key="index">
            <td v-for="(day, index) in week" :key="index">
              {{ day }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import NavReglusV2 from "@/components/nav/NavReglusV2.vue";
export default {
  name: "AgendaReglus",
  components: {
    NavReglusV2,
  },
  data() {
    return {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      weeks: []
    }
  },
  mounted() {
    this.generateCalendar()
  },
  methods: {
    generateCalendar() {
      const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0)
      const weeks = []
      let week = []

      for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const day = new Date(this.currentYear, this.currentMonth, i)
        week.push(day.getDate())

        if (day.getDay() === 0 || i === lastDayOfMonth.getDate()) {
          weeks.push(week)
          week = []
        }
      }

      this.weeks = weeks
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11
        this.currentYear--
      } else {
        this.currentMonth--
      }
      this.generateCalendar()
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0
        this.currentYear++
      } else {
        this.currentMonth++
      }
      this.generateCalendar()
    }
  }
}
</script>

<style>
.calendar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
}

.calendar-header button {
  background-color: #8C52FF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.calendar-header button:hover {
  background-color: #8C52FF;
}

.calendar-body {
  padding: 20px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #8C52FF;
}
</style>