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

        <SocialAspects @show-success="showNotification('success')" @show-refresh="showNotification('refresh')" />
        <HealthWellbeing @show-success="showNotification('success')" @show-refresh="showNotification('refresh')" />
    </div>

    <!-- <div id="success-message" class="notification-att">
        Dados enviados com sucesso!
    </div>
    <div id="refresh-success-message" class="notification-refresh">
        Informações atualizadas com sucesso!
    </div> -->
</template>

<script>
import NavReglus from "@/components/nav/NavIn.vue";
import SocialAspects from "@/components/card/ficha/SocialAspects.vue";
import HealthWellbeing from "@/components/card/ficha/HealthWellbeing.vue";
export default {
    name: "ReglusConta",
    components: {
        NavReglus,
        SocialAspects,
        HealthWellbeing
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

        showNotification(type) {
            const notificationId = type === 'success' ? 'success-message' : 'refresh-success-message';
            const notificationElement = document.getElementById(notificationId);

            if (notificationElement) {
                notificationElement.style.display = 'block';
                notificationElement.classList.add('show');

                setTimeout(() => {
                    notificationElement.classList.remove('show');
                    setTimeout(() => {
                        notificationElement.style.display = 'none';
                    }, 500);
                }, 3000);
            }
        }
    
    }
}
</script>

<style>
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

#ficha {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    width: 100%;
    font-size: 1.1em;
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

.notification {
    display: none;
    background-color: #4caf50;
    color: white;
    padding: 10px;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: opacity 0.5s ease, transform 0.5s ease;
    opacity: 0;
    transform: translateY(-10px);
}

.notification.show {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

.notification-success {
    background-color: #4caf50; /* Verde para sucesso */
}

.notification-refresh {
    background-color: #2196f3; /* Azul para atualização */
}
</style>