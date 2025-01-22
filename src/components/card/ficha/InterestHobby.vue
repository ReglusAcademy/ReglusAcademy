<template>
    <div id="ficha" v-if="userRole === 'STUDENT'">
        <div class="interest-hobby">
            <h3>PASSA TEMPOS</h3>
            <div class="form-group">
                <button @click="refreshForm" class="btn btn-primary">
                    Atualizar Informações
                </button>
            </div>

            <form @submit.prevent="submitInterestHobby">
                <div class="form-group">
                    <label for="activitiesOutsideSchool">Atividades Fora da Escola:</label>
                    <textarea id="activitiesOutsideSchool" name="activitiesOutsideSchool" rows="4" cols="50"
                        placeholder="Descreva as atividades fora da escola" v-model="form.activitiesOutsideSchool"
                        class="form-control mt-2"></textarea><br><br>
                </div>

                <div class="form-group">
                    <label for="dreamsGoals">Sonhos e Objetivos:</label><br>
                    <textarea id="dreamsGoals" name="dreamsGoals" rows="4" cols="50"
                        placeholder="Descreva seus sonhos e objetivos" v-model="form.dreamsGoals"
                        class="form-control mt-2"></textarea><br><br>
                </div>

                <div class="btn">
                    <button type="submit" class="btn-primary btn-sub">Enviar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "InterestHobby",
    data() {
        return {
            userRole: '',

            form: {
                activitiesOutsideSchool: '',
                dreamsGoals: '',
            },
            hobbyId: null
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
            this.fetchInterestHobby();
        }
    },
    methods: {
        validateForm() {
            if (!this.form.activitiesOutsideSchool || this.form.activitiesOutsideSchool.trim() === '') {
                return false;
            }

            if (!this.form.dreamsGoals || this.form.dreamsGoals === '') {
                return false;
            }

            return true;
        },

        async refreshForm() {
            await this.fetchInterestHobby();
            console.log("Informações atualizadas com sucesso!");
        },

        async fetchInterestHobby() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user?.email;

            if (!userEmail) {
                console.error("userEmail não encontrado no localStorage");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/students/email/${userEmail}`);
                const studentData = await response.json();
                const interestHobbyData = studentData.interestHobby;

                this.form.activitiesOutsideSchool = interestHobbyData.activitiesOutsideSchool !== "UNDEFINED"
                    ? interestHobbyData.activitiesOutsideSchool
                    : '';

                this.form.dreamsGoals = interestHobbyData.dreamsGoals !== "UNDEFINED"
                    ? interestHobbyData.dreamsGoals
                    : '';

            } catch (error) {
                console.error("Erro ao recuperar os dados do estudante:", error);
            }
        },

        async fetchInterestHobbyId() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user?.email;

            if (!userEmail) {
                console.error("userEmail não encontrado no localStorage");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/students/email/${userEmail}`);
                const studentData = await response.json();

                this.hobbyId = studentData.interestHobby?.hobbyId;
            } catch (error) {
                console.error("Erro ao recuperar os dados do estudante:", error);
            }
        },

        async submitInterestHobby() {
            if (!this.validateForm()) {
                return;
            }

            if (!this.hobbyId) {
                await this.fetchInterestHobbyId();
            }

            const requestBody = {
                hobbyId: this.studyId,
                activitiesOutsideSchool: this.form.activitiesOutsideSchool,
                dreamsGoals: this.form.dreamsGoals,
            };

            try {
                const response = await fetch(`http://localhost:8080/api/interest-hobbies/${this.hobbyId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    throw new Error('Erro ao enviar dados de InterestHobby');
                }

                console.log('Dados de InterestHobby enviados com sucesso!');

            } catch (error) {
                console.error('Erro ao enviar os dados de InterestHobby:', error);
            }
        }
    }
}
</script>

<style scoped>
.interest-hobby {
    background-color: var(--azul);
    color: #fff;
    border-radius: 5px;
    width: 40%;
    padding: 2em;
    margin: 1em;
}

.btn-sub {
    background-color: var(--lilas);
    color: #fff;
    border: none;
    width: 200px;
    padding: 0.5em;
    margin-top: 10px;
}
</style>