<template>
    <div id="ficha" v-if="userRole === 'STUDENT'">
        <div class="study-habits">
            <h3>HÁBITOS DE ESTUDO</h3>
            <!-- <div class="form-group">
                <button @click="refreshForm" class="btn btn-primary">
                    Atualizar Informações
                </button>
            </div> -->

            <form @submit.prevent="submitStudyHabit">
                <div class="form-group">
                    <label for="studyMethods">Você tem alguma forma de estudo?</label>
                    <input type="text" name="studyMethods" id="studyMethods" v-model="form.studyMethods"
                        placeholder="Nos conte aqui!" class="form-control mt-2">
                </div>

                <div class="form-group">
                    <label for="studyHoursPerDay"> Quantas horas você estuda por dia?</label>
                    <select name="studyHoursPerDay" id="studyHoursPerDay" v-model="form.studyHoursPerDay"
                        class="form-control" required>
                        <option value="" disabled selected>Selecione...</option>
                        <option value="MENOS_DE_1_HORA">Menos de 1 hora</option>
                        <option value="UMA_DUAS_HORAS">1 a 2 horas</option>
                        <option value="DUAS_TRES_HORAS">2 a 3 horas</option>
                        <option value="MAIS_DE_3_HORAS">Mais de 3 horas</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="studyLocations">Qual costuma ser seu local de estudo?</label>
                    <input type="text" name="studyLocations" id="studyLocations" v-model="form.studyLocations"
                        placeholder="Detalhe aqui!" class="form-control mt-2">
                </div>

                <div class="form-group">
                    <label for="studyPlan">E quais são seus planos sobre seus estudos?</label>
                    <input type="text" name="studyPlan" id="studyPlan" v-model="form.studyPlan"
                        placeholder="Conte aqui!" class="form-control mt-2">
                </div>

                <div>
                    <button type="submit" class="btn">Atualizar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "StudyHabits",
    data() {
        return {
            userRole: '',

            form: {
                studyMethods: '',
                studyHoursPerDay: '',
                studyLocations: '',
                studyPlan: ''
            },
            studyId: null
        }
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        const userType = localStorage.getItem('userType');

        this.userRole = userType || '';

        if (!user) {
            this.$router.push('/');
        }

        if (userType === 'STUDENT') {
            this.fetchStudyHabit();
        }
    },
    methods: {
        validateForm() {
            if (!this.form.studyMethods || this.form.studyMethods.trim() === '') {
                return false;
            }

            if (!this.form.studyHoursPerDay || this.form.studyHoursPerDay === '') {
                return false;
            }

            if (!this.form.studyLocations || this.form.studyLocations.trim() === '') {
                return false;
            }

            if (!this.form.studyPlan || this.form.studyPlan.trim() === '') {
                return false;
            }

            return true;
        },

        async refreshForm() {
            await this.fetchStudyHabit();
            console.log("Informações atualizadas com sucesso!");
        },

        async fetchStudyHabit() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user?.email;

            if (!userEmail) {
                console.error("userEmail não encontrado no localStorage");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/students/email/${userEmail}`);
                const studentData = await response.json();
                const studyHabitData = studentData.studyHabit;

                this.form.studyMethods = studyHabitData.studyMethods !== "UNDEFINED"
                    ? studyHabitData.studyMethods
                    : '';

                this.form.studyHoursPerDay = studyHabitData.studyHoursPerDay !== "UNDEFINED"
                    ? studyHabitData.studyHoursPerDay
                    : '';

                this.form.studyLocations = studyHabitData.studyLocations !== "UNDEFINED"
                    ? studyHabitData.studyLocations
                    : '';

                this.form.studyPlan = studyHabitData.studyPlan !== "UNDEFINED"
                    ? studyHabitData.studyPlan
                    : '';

            } catch (error) {
                console.error("Erro ao recuperar os dados do estudante:", error);
            }
        },

        async fetchStudyHabitId() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user?.email;

            if (!userEmail) {
                console.error("userEmail não encontrado no localStorage");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/students/email/${userEmail}`);
                const studentData = await response.json();

                this.studyId = studentData.studyHabit?.studyId;
            } catch (error) {
                console.error("Erro ao recuperar os dados do estudante:", error);
            }
        },

        async submitStudyHabit() {
            if (!this.validateForm()) {
                return;
            }

            if (!this.studyId) {
                await this.fetchStudyHabitId();
            }

            const requestBody = {
                studyId: this.studyId,
                studyMethods: this.form.studyMethods,
                studyHoursPerDay: this.form.studyHoursPerDay,
                studyLocations: this.form.studyLocations,
                studyPlan: this.form.studyPlan
            };

            try {
                const response = await fetch(`http://localhost:8080/api/study-habits/${this.studyId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    throw new Error('Erro ao enviar dados de StudyHabit');
                }

                console.log('Dados de StudyHabit enviados com sucesso!');
            } catch (error) {
                console.error('Erro ao enviar os dados de StudyHabit:', error);
            }
        }

    }
}
</script>

<style scoped>
.study-habits {
    border: 1px solid var(--lilashover);
    border-radius: 5px;
    width: 40%;
    padding: 2em;
    margin: 1em;
}

input[type="radio"] {
    margin: 10px;
}

.btn {
    background-color: black;
    border: none;
    border-radius: 3px;
    color: white;
    font-size: 1em;
    cursor: pointer;
    transition: 1s;
    margin-top: 1em;
    width: 40%;
}
</style>