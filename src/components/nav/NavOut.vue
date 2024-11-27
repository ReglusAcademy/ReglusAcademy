<template>
    <div id="raiz">
            <div class="lista">
                <ul>
                    <img :src="logo" class="logo">
                    <li>
                        <router-link to="/" style="color: var(--roxo)">Início</router-link>
                    </li>
                    <li>Sobre Nós</li>
                </ul>
            </div>

            <div class="lista right">
                <ul>
                    <li>
                        <router-link to="/login">Fazer Login</router-link>
                    </li>
                    <li>
                        <router-link to="/redirecionarlogin" id="btnCadastro">USE GRATUITAMENTE</router-link>
                    </li>
                </ul>
            </div>
    </div>
</template>

<script>
export default {
    name: "NavOut",
    data() {
        return {
            logo: `${process.env.BASE_URL}logoreglus-nobg.png`,
        };
    }
}
</script>

<style scoped>
#raiz {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0em 2em;
}

.lista {
    display: flex;
    align-items: center;
}

.right {
    margin-right: 20px;
}

.logo {
    width: 100px;
    margin-top: 1em;
}

.lista ul {
    display: flex;
    align-items: center;
    gap: 2em;
}

a {
    text-decoration: none;
    color: black;
    transition: 1s;
}

a:hover {
    color: var(--roxo);
}

#btnCadastro {
    color: #fff;
    background-color: #000;
    padding: 0.5em;
    border-radius: 3px;
    border: none; 
    cursor: pointer; 
    transition: 2s;
}

#btnCadastro:hover {
    background-color: var(--roxo);
}
</style>
