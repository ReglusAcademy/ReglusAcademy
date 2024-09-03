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
                    <li>
                        <router-link to="/agenda">Recursos</router-link>
                    </li>
                    <li>Organização</li>
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
    }
}
</script>

<style>
#raiz {
    padding: 0em 1.5em;
}

.logo {
    width: 150px;
}

.listasOpcoes {
    font-weight: bold;
    display: flex;
    justify-content: space-between;
}

ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
}

a {
    text-decoration: none;
    color: black;
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