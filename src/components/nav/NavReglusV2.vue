<template>
    <div id="raiz">
        <img :src="logo" class="logo">
        <nav class="listasOpcoes">
            <div class="lista">
                <ul>
                    <li>
                        <router-link to="/">Home</router-link>
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
    display: flex;
    align-items: center; /* Alinha verticalmente no centro */
    padding: 10px; /* Adiciona um pouco de padding */
    width: 100%; /* Ocupa toda a largura disponível */
  }

  .logo {
    width: 100px;
    margin-right: 20px; /* Espaço à direita do logo */
  }

  .listasOpcoes {
    display: flex;
    align-items: center; /* Alinha os itens verticalmente no centro */
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    margin: 0; /* Remove a margem padrão da lista */
    padding: 0; /* Remove o padding padrão da lista */
    list-style-type: none; /* Remove os marcadores de lista */
  }

  a {
    text-decoration: none;
    color: rgb(0, 0, 0); /* Cor do texto dos links */
    font-weight: bold; /* Negrito nos links */
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