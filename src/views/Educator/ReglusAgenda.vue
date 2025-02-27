<template>
    <NavReglusV2></NavReglusV2>
  <!--   
    <div class="calendar-container">
      <div>
        <NavReglus />
      </div>
      <div class="month-selector">
        <button class="btn" @click="prevMonth">Anterior</button>
        <span>{{ months[currentMonth] }} {{ currentYear }}</span>
        <button class="btn" @click="nextMonth">Próximo</button>
      </div>
  
      <div class="main-content">
        <div class="calendar-wrapper">
          <table class="calendar">
            <thead>
              <tr>
                <th v-for="day in daysOfWeek" :key="day" class="day-header">{{ day }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="week in weeks" :key="week">
                <td
                  v-for="day in week"
                  :key="day ? day.date : ''"
                  @click="day ? selectDate(day.date) : null"
                  :class="{'selected': day && isSelected(day.date)}"
                >
                  {{ day ? day.date.getDate() : '' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="divider"></div>
  
        <div v-if="selectedDate" class="todo-list">
          <h3>Tarefas para {{ formatDate(selectedDate) }}</h3>
          <ul>
            <li v-for="(task, index) in todos[selectedDateString] || []" :key="index">
              <input type="text" v-model="task.text" />
              <button class="btn" @click="removeTask(index)">Remover</button>
            </li>
          </ul>      
          <input type="text" v-model="newTask" placeholder="Nova Tarefa" />
          <button class="btn" @click="addTask">Adicionar Tarefa</button>
        </div>
      </div>
    </div> 
  -->
  
  <CalendarAcademy />
  
  </template>
  
  <script>
  import NavReglusV2 from "@/components/nav/NavIn.vue";
  import CalendarAcademy from "@/components/card/resources/CalendarAcademy.vue";
  
  export default {
    name: "AgendaReglus",
    components: {
      NavReglusV2,
      CalendarAcademy
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
  .calendar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
  }
  
  .month-selector {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 300px;
    margin-bottom: 20px;
    padding: 20px;
  }
  
  .main-content {
    display: flex;
    width: 100%;
    height: 80vh; 
  }
  
  .calendar-wrapper, .todo-list {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .calendar-wrapper {
    border-right: 2px solid #8c52ff; 
  }
  
  .calendar {
    border-collapse: collapse;
    width: 100%;
    height: 100%;
  }
  
  .calendar th, .calendar td {
    border: 1px solid #ccc;
    padding: 10px;
    width: 40px;
    text-align: center;
  }
  
  .selected {
    background-color: #f0f0f0;
  }
  
  .todo-list {
    max-width: 100%;
  }
  
  .todo-list input {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
  }
  
  .todo-list ul {
    list-style-type: none; 
    padding: 0; 
  }
  
  .todo-list li {
    display: flex; 
    align-items: center; 
    margin-bottom: 10px; 
  }
  
  .todo-list input[type="text"] {
    flex: 1; 
    padding: 5px;
    margin-right: 10px; 
  }
  
  .divider {
    width: 2px;
    background-color: #8c52ff;
    height: 100%;
  }
  
  .btn {
    background-color: #8c52ff; 
    color: white; 
    border: none; 
    border-radius: 4px;
    padding: 10px 20px; 
    font-size: 14px;
    cursor: pointer; 
    transition: background-color 0.3s ease;
  }
  
  .btn:hover {
    background-color: #8c52ff; 
  }
  
  .day-header {
    background-color: #8c52ff; 
    color: white;
    padding: 10px; 
    text-align: center;
    border: 1px solid #ddd;
  }
  
  /* Estilo para as células do calendário */
  .calendar th, .calendar td {
    border: 1px solid #ccc; /* Borda ao redor das células */
    padding: 10px; /* Espaçamento interno */
    text-align: center; /* Alinha o texto ao centro */
  }
  
  /* Estilo para o calendário */
  .calendar-wrapper {
    background: #f9f9f9; /* Cor de fundo clara para o calendário */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.05); /* Sombras para profundidade */
    padding: 20px; /* Espaçamento interno */
  }
  
  /* Adiciona uma borda com cor roxa clara ao redor do calendário */
  .calendar {
    border: 1px solid #8c52ff; /* Cor roxa clara para a borda */
    border-radius: 8px; /* Bordas arredondadas */
  }
  
  /* Estilo para o efeito de hover nas células do calendário */
  .calendar td:hover {
    background-color: #8c52ff; 
  }
  
  /* Estilo para a célula selecionada no calendário */
  .calendar .selected {
    background-color: #8c52ff; 
  }
  </style>