<template>
    <div id="raiz">
        <div class="lista">
            <ul>
                <img :src="logo" class="logo">
                <li>
                    <router-link to="/">Início</router-link>
                </li>
                <li>
                    <router-link to="/introducaoaprogramacao">Funcionalidades</router-link>
                </li>
                <li>
                    <router-link to="/agenda">Recursos</router-link>
                </li>
                <li>Organização</li>
            </ul>
        </div>

        <div class="lista">
            <button class="view-account"><router-link to="/minhacontareglus">Conta</router-link></button>
            <button @click="logout" class="logout-button">Logout</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "NavIn",
    data() {
        return {
            logo: `${process.env.BASE_URL}logoreglus-nobg.png`,
        };
    },
    methods: {
        logout() {
            localStorage.clear();
            sessionStorage.clear();
            this.$nextTick(() => {
                this.$router.push('/');
            });
        }
    }
}
</script>

<style>
#raiz {
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0em 2em;
}

.logo {
    width: 100px;
    margin-top: 1em;
}

/* .listasOpcoes {
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0em 2em;
} */

ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    margin: 0;
    padding: 0;
    list-style-type: none;
}

a {
    text-decoration: none;
    color: black;
    transition: 1s;
    font-weight: bold;
}

.lista {
    display: flex;
    align-items: center;
}

.lista ul {
    display: flex;
    align-items: center;
    gap: 2em;
}

button {
    border: none;
    padding: 1em 2em;
    border-radius: 5px;
    font-size: 1em;
    font-weight: bold;
    background: none;
    transition: 1s;
}

button:hover,
a:hover {
    color: var(--roxo);
    transition: 1s;
}
</style>