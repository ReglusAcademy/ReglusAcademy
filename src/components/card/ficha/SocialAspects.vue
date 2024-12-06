<template>
    <div id="ficha" v-if="userRole === 'STUDENT'">
        <div class="social-aspects">
            <h3>ASPECTOS SOCIAIS E FAMILIARES</h3>
            <form @submit.prevent="submitSocialAspect">
                <div class="form-group">
                    <label>Com quem você mora? (Marque todas as que se aplicam)</label>
                    <div>
                        <div v-for="option in livingWithOptions" :key="option.value">
                            <input type="checkbox" :value="option.value" v-model="selectedLivingWith"
                                @change="handleLivingWithChange">
                            {{ option.label }}
                        </div>
                        <input v-if="selectedLivingWith.includes('outros')" v-model="form.livingWith" type="text"
                            placeholder="Especifique" class="form-control mt-2" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="relacaoColegas">Como é a sua relação com os seus colegas de classe?</label>
                    <select id="relacaoColegas" v-model="form.relationshipWithClassmates" class="form-control" required>
                        <option value="" disabled selected>Selecione...</option>
                        <option value="MUITO_BOA">Muito boa</option>
                        <option value="BOA">Boa</option>
                        <option value="REGULAR">Regular</option>
                        <option value="RUIM">Ruim</option>
                        <option value="MUITO_RUIM">Muito ruim</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="relacaoProfessores">Como é a sua relação com os professores?</label>
                    <select id="relacaoProfessores" v-model="form.relationshipWithTeachers" class="form-control"
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
                    <label for="relacaoFamilia">Como é a sua relação com sua família em casa?</label>
                    <select id="relacaoFamilia" v-model="form.relationshipWithFamily" class="form-control" required>
                        <option value="" disabled selected>Selecione...</option>
                        <option value="MUITO_BOA">Muito boa</option>
                        <option value="BOA">Boa</option>
                        <option value="REGULAR">Regular</option>
                        <option value="RUIM">Ruim</option>
                        <option value="MUITO_RUIM">Muito ruim</option>
                    </select>
                </div>
                <div class="btn">
                    <button type="submit" class="btn-primary btn-sub">Enviar</button>
                </div>
            </form>
        </div>
    </div>
    <div id="success-message" class="notification">
        Dados enviados com sucesso!
    </div>
</template>

<script>
export default {
    name: "SocialAspects",
    data() {
        return {
            userRole: '',

            // aspectos sociais
            form: {
                livingWith: '', // Para armazenar o valor quando "Outros" é selecionado
                relationshipWithClassmates: '',
                relationshipWithTeachers: '',
                relationshipWithFamily: ''
            },
            selectedLivingWith: [], // Armazenar as opções selecionadas
            livingWithOptions: [
                { value: 'pais', label: 'Pais' },
                { value: 'avos', label: 'Avós' },
                { value: 'tios', label: 'Tios' },
                { value: 'irmaos', label: 'Irmãos' },
                { value: 'outros', label: 'Outros' },
            ],
            socialId: null
        };
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user)
        const userType = localStorage.getItem('userType');

        this.userRole = userType || '';

        if (!user) {
            this.$router.push('/');
        }

        this.fetchSocialAspect();
    },
    methods: {
        async fetchSocialAspect() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user.email;

            if (!userEmail) {
                console.error("userEmail não encontrado no localStorage");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/students/email/${userEmail}`);
                const studentData = await response.json();

                console.log(studentData);

                const socialAspectData = studentData.socialAspect;

                this.form.relationshipWithClassmates = socialAspectData.relationshipWithClassmates !== "UNDEFINED"
                    ? socialAspectData.relationshipWithClassmates
                    : '';

                this.form.relationshipWithTeachers = socialAspectData.relationshipWithTeachers !== "UNDEFINED"
                    ? socialAspectData.relationshipWithTeachers
                    : '';

                this.form.relationshipWithFamily = socialAspectData.relationshipWithFamily !== "UNDEFINED"
                    ? socialAspectData.relationshipWithFamily
                    : '';

                const livingWithArray = socialAspectData.livingWith !== "UNDEFINED"
                    ? socialAspectData.livingWith.split(', ')
                    : [];

                this.selectedLivingWith = livingWithArray.filter(item => ['pais', 'avos', 'tios', 'irmaos'].includes(item));

                const others = livingWithArray.filter(item => !['pais', 'avos', 'tios', 'irmaos'].includes(item));

                if (others.length > 0) {
                    this.selectedLivingWith.push('outros');
                    this.form.livingWith = others.join(', ');
                } else {
                    this.form.livingWith = '';
                }

            } catch (error) {
                console.error("Erro ao recuperar os dados do estudante:", error);
            }
        },

        handleLivingWithChange() {
            if (this.selectedLivingWith.includes('outros')) {
                this.form.livingWith = this.form.livingWith || '';
            } else {
                this.form.livingWith = this.selectedLivingWith.join(', ');
            }
        },

        validateForm() {
            if (!this.form.relationshipWithClassmates || this.form.relationshipWithClassmates === '') {
                return false;
            }
            if (!this.form.relationshipWithTeachers || this.form.relationshipWithTeachers === '') {
                return false;
            }
            if (!this.form.relationshipWithFamily || this.form.relationshipWithFamily === '') {
                return false;
            }
            if (this.selectedLivingWith.length === 0) {
                return false;
            }
            if (this.selectedLivingWith.includes('outros') && !this.form.livingWith) {
                return false;
            }

            return true;
        },

        async fetchSocialId() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user.email;

            console.log(userEmail)

            if (!userEmail) {
                console.error("userEmail não encontrado no localStorage");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/students/email/${userEmail}`);
                const studentData = await response.json();

                console.log(studentData)

                this.socialId = studentData.socialAspect.socialId;
            } catch (error) {
                console.error("Erro ao recuperar os dados do estudante:", error);
            }
        },

        async submitSocialAspect() {
            if (!this.validateForm()) {
                return;
            }

            if (!this.socialId) {
                await this.fetchSocialId();
            }

            const requestBody = {
                socialId: this.socialId,
                livingWith: this.selectedLivingWith.includes('outros') ? this.form.livingWith : this.selectedLivingWith.join(", "),
                relationshipWithClassmates: this.form.relationshipWithClassmates,
                relationshipWithTeachers: this.form.relationshipWithTeachers,
                relationshipWithFamily: this.form.relationshipWithFamily
            };

            try {
                const response = await fetch(`http://localhost:8080/api/social-aspects/${this.socialId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    throw new Error('Erro ao enviar dados de aspectos sociais');
                }

                console.log('Dados enviados com sucesso!');

                const successMessage = document.getElementById('success-message');

                successMessage.style.display = 'block'; 
                successMessage.classList.add('show'); 

                setTimeout(() => {
                    successMessage.classList.remove('show');

                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 500);
                }, 3000); 

            } catch (error) {
                console.error('Erro ao enviar os dados:', error);
            }
        }
    }
}
</script>

<style scoped>
#ficha {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 5px;
    width: 100%;
    font-size: 1.1em;
}

.social-aspects {
    background-color: var(--roxo);
    color: #fff;
    border-radius: 5px;
    width: 40%;
    padding: 2em;
    margin: 1em;
}

label {
    margin-bottom: 5px;
}

input,
select {
    transition: 0.3s;
}

input:focus,
input:active,
select:focus,
select:active {
    border: 1px solid var(--branco);
    box-shadow: 0 1px 0 0 var(--branco);
    color: var(--lilas);
    font-weight: bold;
    transition: 0.3s;
}

input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-bottom: -5px;
    border: none;
    border-radius: 3px;
    background-color: #fff;
    appearance: none;
    transition: background-color 0.3s, border-color 0.3s;
}

input[type="checkbox"]:checked {
    background-color: var(--lilas);
    border-color: #fff;
}

.form-group {
    padding-bottom: 10px;
}

.btn {
    display: flex;
    justify-content: center;
}

.btn-sub {
    background-color: var(--lilas);
    color: #fff;
    border: none;
    width: 200px;
    padding: 0.5em;
    margin-top: 10px;
}

.notification {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease, transform 0.5s ease, visibility 0s linear 0.5s;
}

.notification.show {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}
</style>