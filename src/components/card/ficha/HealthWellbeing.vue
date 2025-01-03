<template>
    <div id="ficha" v-if="userRole === 'STUDENT'">
        <div class="health-wellbeing">
            <h3>SAÚDE E BEM-ESTAR</h3>
            <form @submit.prevent="submitHealthWellbeing">
                <div class="form-group">
                    <button @click="refreshForm" class="btn btn-primary">
                        Atualizar Informações
                    </button>
                </div>
                <div class="form-group">
                    <label>Você tem condições de saúde ou necessidades especiais?</label>
                    <div>
                        <input type="radio" id="sim" value="YES" v-model="form.healthCondition"
                            @change="handleHealthConditionChange">
                        <label for="sim">Sim</label>

                        <input type="radio" id="nao" value="NO" v-model="form.healthCondition"
                            @change="handleHealthConditionChange">
                        <label for="nao">Não</label>

                        <input v-if="form.healthCondition === 'YES'" v-model="form.healthDetail" type="text"
                            placeholder="Especifique" class="form-control mt-2" />
                    </div>
                </div>

                <div class="form-group">
                    <label>Pratica atividade física regularmente?</label>
                    <div>
                        <input type="radio" id="sim2" value="YES" v-model="form.physicalActivity"
                            @change="handleActivityChange" class="radio-input">
                        <label for="sim2">Sim</label>

                        <input type="radio" id="nao2" value="NO" v-model="form.physicalActivity"
                            @change="handleActivityChange" class="radio-input">
                        <label for="nao2">Não</label>

                        <input v-if="form.physicalActivity === 'YES'" v-model="form.physicalActivityDetail" type="text"
                            placeholder="Especifique" class="form-control mt-2" />
                    </div>
                </div>

                <div class="form-group">
                    <label>Avalie sua alimentação diária:</label>
                    <select v-model="form.dietaryEvaluation" class="form-control" required>
                        <option value="" disabled selected>Selecione...</option>
                        <option value="MUITO_SAUDAVEL">Muito saudável</option>
                        <option value="SAUDAVEL">Saudável</option>
                        <option value="REGULAR">Regular</option>
                        <option value="POUCO_SAUDAVEL">Pouco saudável</option>
                        <option value="NADA_SAUDAVEL">Nada saudável</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Quantas são suas horas de sono por noite?</label>
                    <select v-model="form.sleepHours" class="form-control" @change="handleSleepHoursChange" required>
                        <option value="" disabled selected>Selecione...</option>
                        <option value="MENOS_DE_6_HORAS">Menos de 6 horas</option>
                        <option value="SEIS_SETE_HORAS">6-7 horas</option>
                        <option value="SETE_OITO_HORAS">7-8 horas</option>
                        <option value="OITO_NOVE_HORAS">8-9 horas</option>
                        <option value="MAIS_DE_9_HORAS">Mais de 9 horas</option>
                    </select>
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
    name: "HealthWellbeing",
    data() {
        return {
            userRole: '',
            form: {
                healthCondition: '',
                healthDetail: '',
                physicalActivity: '',
                physicalActivityDetail: '',
                dietaryEvaluation: '',
                sleepHours: ''
            }
        };
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        const userType = localStorage.getItem('userType');

        this.userRole = userType || '';

        if (!user) {
            this.$router.push('/');
        }

        this.fetchHealthWellbeing();
    },
    methods: {
        handleHealthConditionChange() {
            if (this.form.healthCondition === 'YES' && this.form.healthDetail) {
                // Concatenar "Sim" com o detalhamento
                this.form.healthCondition = `${this.form.healthDetail}`;
            } else if (this.form.healthCondition === 'NO') {
                // Se for "Não", apenas definimos a resposta como "Não"
                this.form.healthCondition = 'NO';
            }
        },
        handleActivityChange() {
            if (this.form.physicalActivity === 'YES' && this.form.physicalActivityDetail) {
                // Concatenar "Sim" com o detalhe da atividade
                this.form.physicalActivity = `${this.form.physicalActivityDetail}`;
            } else if (this.form.physicalActivity === 'NO') {
                // Se for "Não", apenas definimos a resposta como "Não"
                this.form.physicalActivity = 'NO';
            }
        },
        validateForm() {
            // Validar se a condição de saúde foi preenchida
            if (!this.form.healthCondition || this.form.healthCondition === 'Selecione...') {
                return false;
            }
            // Se a condição de saúde for "Sim", verificar se o campo de detalhe foi preenchido
            if (this.form.healthCondition === 'YES' && !this.form.healthDetail) {
                return false;
            }

            // Validar se a atividade física foi preenchida
            if (!this.form.physicalActivity || this.form.physicalActivity === 'Selecione...') {
                return false;
            }
            // Se a atividade for "Sim", verificar se o campo de detalhe foi preenchido
            if (this.form.physicalActivity === 'YES' && !this.form.physicalActivityDetail) {
                return false;
            }

            // Validar se a avaliação da alimentação foi preenchida
            if (!this.form.dietaryEvaluation || this.form.dietaryEvaluation === '') {
                return false;
            }

            // Validar se as horas de sono foram preenchidas
            if (!this.form.sleepHours || this.form.sleepHours === '') {
                return false;
            }

            return true;
        },

        async refreshForm() {
            await this.fetchHealthWellbeing();
            console.log("Informações atualizadas com sucesso!");
        },

        async fetchHealthWellbeing() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user.email;

            if (!userEmail) {
                console.error("userEmail não encontrado no localStorage");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/students/email/${userEmail}`);
                const studentData = await response.json();
                const healthwellbeingData = studentData.healthWellbeing;

                if (healthwellbeingData.healthCondition !== "UNDEFINED") {
                    if (healthwellbeingData.healthCondition === "NO") {
                        this.form.healthCondition = "NO";
                        this.form.healthDetail = "";
                    } else {
                        this.form.healthCondition = "YES";
                        this.form.healthDetail = healthwellbeingData.healthCondition;
                    }
                } else {
                    this.form.healthCondition = '';
                    this.form.healthDetail = '';
                }

                if (healthwellbeingData.physicalActivity !== "UNDEFINED") {
                    if (healthwellbeingData.physicalActivity === "NO") {
                        this.form.physicalActivity = "NO";
                        this.form.physicalActivityDetail = "";
                    } else {
                        this.form.physicalActivity = "YES";
                        this.form.physicalActivityDetail = healthwellbeingData.physicalActivity;
                    }
                } else {
                    this.form.physicalActivity = '';
                    this.form.physicalActivityDetail = '';
                }

                this.form.dietaryEvaluation = healthwellbeingData.dietaryEvaluation !== "UNDEFINED"
                    ? healthwellbeingData.dietaryEvaluation
                    : '';

                this.form.sleepHours = healthwellbeingData.sleepHours !== "UNDEFINED"
                    ? healthwellbeingData.sleepHours
                    : '';

            } catch (error) {
                console.error("Erro ao recuperar os dados do estudante:", error);
            }
        },

        async fetchHealthwellbeingId() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user.email;

            if (!userEmail) {
                console.error("userEmail não encontrado no localStorage");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/students/email/${userEmail}`);
                const studentData = await response.json();

                this.healthId = studentData.healthWellbeing.healthId;
            } catch (error) {
                console.error("Erro ao recuperar os dados do estudante:", error);
            }
        },

        async submitHealthWellbeing() {
            if (!this.validateForm()) {
                return;
            }

            if (!this.healthId) {
                await this.fetchHealthwellbeingId();
            }

            if (this.form.physicalActivity === 'YES' && this.form.physicalActivityDetail) {
                this.form.physicalActivity = `${this.form.physicalActivityDetail}`;
            } else if (this.form.physicalActivity === 'NO') {
                this.form.physicalActivity = 'NO';
            }

            if (this.form.healthCondition === 'YES' && this.form.healthDetail) {
                this.form.healthCondition = `${this.form.healthDetail}`;
            } else if (this.form.healthCondition === 'NO') {
                this.form.healthCondition = 'NO';
            }

            const requestBody = {
                healthId: this.healthId,
                healthCondition: this.form.healthCondition,
                healthDetail: this.form.healthDetail,
                physicalActivity: this.form.physicalActivity,
                physicalActivityDetail: this.form.physicalActivityDetail,
                dietaryEvaluation: this.form.dietaryEvaluation,
                sleepHours: this.form.sleepHours
            };

            try {
                const response = await fetch(`http://localhost:8080/api/healthwellbeing/${this.healthId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    throw new Error('Erro ao enviar dados de healthwellbeing');
                }

                console.log('Dados de healthwellbeing enviados com sucesso!');
            } catch (error) {
                console.error('Erro ao enviar os dados de healthwellbeing:', error);
            }
        }
    },
}
</script>

<style scoped>
.health-wellbeing {
    background-color: var(--lilas);
    color: #fff;
    border-radius: 5px;
    width: 40%;
    padding: 2em;
    margin: 1em;
}

input[type="radio"] {
    margin: 10px;
}

.btn-sub {
    background-color: var(--roxo);
    color: #fff;
    border: none;
    width: 200px;
    padding: 0.5em;
    margin-top: 10px;
}
</style>