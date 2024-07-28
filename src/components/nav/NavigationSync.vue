<template>
    <div id="raiz">
        <nav class="listasOpcoes">
            <div class="lista">
                <img :src="logo" class="logo">
                <ul>
                    <li>
                        <router-link to="/">Home</router-link>
                    </li>
                    <li>Funcionalidades</li>
                    <li>Recursos</li>
                    <li>Organização</li>
                </ul>
            </div>

            <div class="lista">
                <ul>
                    <li>Sobre Nós</li> 
                    <p>|</p>
                    <li>
                        <router-link to="/login">Fazer Login</router-link>
                    </li>
                    <li id="free">
                        <router-link to="/redirecionarlogin">USE GRATUITAMENTE</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: "NavigationSync",
    data() {
        return {
            logo: require("@/assets/logoreglus.png"),
        };
    }
}
</script>

<style>
.logo {
    width: 100px;
    margin-right: 2em;
}

.listasOpcoes {
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    margin: 0em 2em;
}

ul {
    display: flex;
    align-items: center;
    gap: 1em;
}

a {
    text-decoration: none;
    color: black;
}

.lista {
    display: flex;
    padding: 0em 2em;
}

#free a {
    color: #fff;
}

#free {
    color: #fff;
    background-color: #000;
    padding: 0.5em;
}


</style>