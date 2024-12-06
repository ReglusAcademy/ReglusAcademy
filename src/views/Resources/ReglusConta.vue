<template>
    <NavReglus />
    <div id="account">
        <div class="descUser">
            <h1>Confira e atualize as informações da sua conta, {{ userName }}.</h1>
            <p>Email: {{ userEmail }}</p>
            <p>Nível educacional cadastrado: {{ userEducationLevel }}</p>
            <p>Data de nascimento: {{ userBirthDate }}</p>
            <p>Instituição de Ensino: {{ instituteName }}</p>
            <p>Deficiência: {{ userDisability }}</p>
        </div>

        <SocialAspects />
    </div>
</template>

<script>
import NavReglus from "@/components/nav/NavIn.vue";
import SocialAspects from "@/components/card/ficha/SocialAspects.vue";
export default {
    name: "ReglusConta",
    components: {
        NavReglus,
        SocialAspects
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
            userRole: '',

            // aspectos sociais
            form: {
                livingWith: '', // Para armazenar o valor quando "Outros" é selecionado
                relationshipWithClassmates: "MUITO_BOA",
                relationshipWithTeachers: "MUITO_BOA",
                relationshipWithFamily: "MUITO_BOA"
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
        const userType = localStorage.getItem('userType');

        this.userRole = userType || '';

        if (!user) {
            this.$router.push('/');
        } else {
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
    }
}
</script>

<style scoped>
#account {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.descUser {
    text-align: center;
}

h1 {
    text-align: center;
}
</style>