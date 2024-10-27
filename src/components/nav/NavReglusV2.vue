<template>
    <div id="raiz">
        <img :src="logo" class="logo">
        <nav class="listasOpcoes">
            <div class="lista">
                <ul>
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
                    <li>
                        <button @click="logout" class="logout-button">Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: "NavReglusV2",
    data() {
        return {
            logo: require("@/assets/logoreglus.png"),
        };
    },
    methods: {
        logout() {
            localStorage.removeItem('user');
            localStorage.removeItem('userType');
            this.$router.push('/');
        }
    }
}
</script>

<style>
#raiz {
    display: flex;
    align-items: center;
    padding: 10px;
    width: 100%;
}

.logo {
    width: 100px;
    margin-right: 20px;
}

.listasOpcoes {
    display: flex;
    align-items: center;
}

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
    color: rgb(0, 0, 0);
    font-weight: bold;
}

.lista {
    display: flex;
}

#free a {
    color: #fff;
}

#free {
    color: #fff;
    background-color: #000;
}
</style>