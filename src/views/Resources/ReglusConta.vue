<template>
    <NavReglus />
    <div>
        <h1>Confira e atualize as informações da sua conta, {{ userName }}.</h1>
        <p>Email: {{ userEmail }}</p>
        <p>Nível educacional cadastrado: {{ userEducationLevel }}</p>
        <p>Data de nascimento: {{ userBirthDate }}</p>
        <p>Instituição de Ensino: {{ instituteName }}</p>
        <p>Deficiência: {{ userDisability }}</p>

        <div class="social-aspects">
            <h3>Aspectos Sociais e Familiares</h3>
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
                    <option value="MUITO_BOA">Muito boa</option>
                    <option value="BOA">Boa</option>
                    <option value="REGULAR">Regular</option>
                    <option value="RUIM">Ruim</option>
                    <option value="MUITO_RUIM">Muito ruim</option>
                </select>
            </div>

            <div class="form-group">
                <label for="relacaoProfessores">Como é a sua relação com os professores?</label>
                <select id="relacaoProfessores" v-model="form.relationshipWithTeachers" class="form-control" required>
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
                    <option value="MUITO_BOA">Muito boa</option>
                    <option value="BOA">Boa</option>
                    <option value="REGULAR">Regular</option>
                    <option value="RUIM">Ruim</option>
                    <option value="MUITO_RUIM">Muito ruim</option>
                </select>
            </div>
            <button @click="submitSocialAspect" class="btn btn-primary">Enviar</button>
        </div>
    </div>
</template>

<script>
import NavReglus from "@/components/nav/NavIn.vue";
export default {
    name: "ReglusConta",
    components: {
        NavReglus,
    },
    data() {
        return {
            // geral
            userName: '',
            userEmail: '',
            userEducationLevel: '',
            userBirthDate: '',
            instituteName: '',
            userDisability: 'Nada definido',

            // aspectos sociais
            form: {
                livingWith: '', // Para armazenar o valor quando "Outros" é selecionado
                studentId: '',
                relationshipWithClassmates: '',
                relationshipWithTeachers: '',
                relationshipWithFamily: '',
            },
            selectedLivingWith: [], // Armazenar as opções selecionadas
            livingWithOptions: [
                { value: 'pais', label: 'Pais' },
                { value: 'avos', label: 'Avós' },
                { value: 'tios', label: 'Tios' },
                { value: 'irmaos', label: 'Irmãos' },
                { value: 'outros', label: 'Outros' },
            ],
        };
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.form.studentId = user.userId;
            this.userName = user.name;
            this.userEmail = user.email;
            this.userEducationLevel = user.educationLevel;
            this.userBirthDate = this.formatDate(user.dateBirth);
            this.instituteName = user.instituteName;
            this.userDisability = user.disability === "false" ? "Nada definido" : user.disability;
        }
    },
    methods: {
        formatDate(dateString) {
            const [year, month, day] = dateString.split('-');
            return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
        },
        handleLivingWithChange() {
            // Se "Outros" estiver selecionado, não salvamos a palavra "outros" no banco
            if (this.selectedLivingWith.includes('outros')) {
                this.form.livingWith = ''; // Zera o campo quando outros é selecionado
            } else {
                // Se "Outros" não estiver selecionado, salvamos as seleções
                this.form.livingWith = this.selectedLivingWith.join(', '); // Junte as seleções em uma string
            }
        },
        submitSocialAspect() {
            fetch('http://localhost:8080/api/social-aspects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.form),
            })
                .then(response => {
                    if (!response.ok) {
                        console.log(response)
                        throw new Error('Erro na requisição: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Dados enviados com sucesso:', data);
                })
                .catch(error => {
                    console.error('Erro ao enviar dados:', error);
                });
        }
    }
}
</script>

<style>
h1 {
    text-align: center;
}
</style>