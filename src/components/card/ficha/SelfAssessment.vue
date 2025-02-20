<template>
    <div id="ficha" v-if="userRole === 'STUDENT'">
        <div class="self-assessment">
            <h3>AUTO AVALIAÇÃO</h3>
            <!-- <div class="form-group">
                <button @click="refreshForm" class="btn btn-primary">
                    Atualizar Informações
                </button>
            </div> -->

            <form @submit.prevent="submitSelfAssessment">
                <div class="form-group">
                    <label for="performanceEvaluation">Como você se sente sobre o seu desempenho ultimamente?</label>
                    <select id="performanceEvaluation" v-model="form.performanceEvaluation" class="form-control"
                        required>
                        <option value="" disabled selected>Selecione...</option>
                        <option value="MUITO_BOA">Muito boa</option>
                        <option value="BOA">Boa</option>
                        <option value="REGULAR">Regular</option>
                        <option value="RUIM">Ruim</option>
                        <option value="MUITO_RUIM">Muito ruim</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="strengths">Quais são as coisas em que você acredita ser realmente bom(a)?</label>
                    <input type="text" name="strengths" id="strengths" v-model="form.strengths"
                        placeholder="Detalhe aqui!" class="form-control mt-2">
                </div>

                <div class="form-group">
                    <label for="improvementAreas">Em que aspectos você gostaria de melhorar ou se sente
                        desafiado(a)?</label>
                    <input type="text" name="improvementAreas" id="improvementAreas" v-model="form.improvementAreas"
                        placeholder="Detalhe aqui!" class="form-control mt-2">
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
    name: "SelfAssessment",
    data() {
        return {
            userRole: '',

            form: {
                performanceEvaluation: '',
                strengths: '',
                improvementAreas: '',
            },
            assessmentId: null
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
            this.fetchSelfAssessment();
        }
    },
    methods: {
        validateForm() {
            if (!this.form.performanceEvaluation || this.form.performanceEvaluation.trim() === '') {
                return false;
            }

            if (!this.form.strengths || this.form.strengths === '') {
                return false;
            }

            if (!this.form.improvementAreas || this.form.improvementAreas === '') {
                return false;
            }

            return true;
        },

        async refreshForm() {
            await this.fetchSelfAssessment();
            console.log("Informações atualizadas com sucesso!");
        },

        async fetchSelfAssessment() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user?.email;

            if (!userEmail) {
                console.error("userEmail não encontrado no localStorage");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/students/email/${userEmail}`);
                const studentData = await response.json();
                const SelfAssessmentData = studentData.selfAssessment;

                this.form.performanceEvaluation = SelfAssessmentData.performanceEvaluation !== "UNDEFINED"
                    ? SelfAssessmentData.performanceEvaluation
                    : '';

                this.form.strengths = SelfAssessmentData.strengths !== "UNDEFINED"
                    ? SelfAssessmentData.strengths
                    : '';

                this.form.improvementAreas = SelfAssessmentData.improvementAreas !== "UNDEFINED"
                    ? SelfAssessmentData.improvementAreas
                    : '';

            } catch (error) {
                console.error("Erro ao recuperar os dados do estudante:", error);
            }
        },

        async fetchSelfAssessmentId() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user?.email;

            if (!userEmail) {
                console.error("userEmail não encontrado no localStorage");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/students/email/${userEmail}`);
                const studentData = await response.json();

                this.assessmentId = studentData.selfAssessment?.assessmentId;
            } catch (error) {
                console.error("Erro ao recuperar os dados do estudante:", error);
            }
        },

        async submitSelfAssessment() {
            if (!this.validateForm()) {
                return;
            }

            if (!this.assessmentId) {
                await this.fetchSelfAssessmentId();
            }

            const requestBody = {
                assessmentId: this.assessmentId,
                performanceEvaluation: this.form.performanceEvaluation,
                strengths: this.form.strengths,
                improvementAreas: this.form.improvementAreas,
            };

            try {
                const response = await fetch(`http://localhost:8080/api/self-assessments/${this.assessmentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    throw new Error('Erro ao enviar dados de SelfAssessment');
                }

                console.log('Dados de SelfAssessment enviados com sucesso!');
            } catch (error) {
                console.error('Erro ao enviar os dados de SelfAssessment:', error);
            }
        }
    }
}
</script>

<style scoped>
.self-assessment {
    border: 1px solid var(--verde);
    border-radius: 5px;
    width: 40%;
    padding: 2em;
    margin: 1em;
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