<template>
    <div id="raiz">
        <nav class="listasOpcoes">
            <div class="lista">
                <img :src="logo" class="logo">
                <ul>
                    <li>Produto</li>
                    <li>Serviços</li>
                    <li>Recursos</li>
                    <li>Organização</li>
                </ul>
            </div>

            <div class="lista">
                <ul>
                    <li>Saiba mais</li> 
                    <p>|</p>
                    <li>Fazer login</li>
                    <li id="free">USE GRATUITAMENTE</li>
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
            logo: require("@/assets/StudySync.png"),
        };
    }
}
</script>

<style scoped>
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

.lista {
    display: flex;
    padding: 0em 2em;
}

#free {
    color: #fff;
    background-color: #000;
    padding: 0.5em;
}

p {
    opacity: 0.3;
    user-select: none;
}

</style>