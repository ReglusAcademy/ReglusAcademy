<template id="teste">
  <NavReglus />
  <main>
    <div class="left">
      <h3>Sobre Nós</h3>
      <img :src="students" alt="estudantes" width="400">
      <p class="projectDesc">Reglus Academy representa não apenas um esforço para superar as barreiras enfrentadas por
        pessoas neurodivergentes e em situação de vulnerabilidade socioeconômica no acesso à educação e construção do
        conhecimento, mas também uma afirmação do compromisso com os ideais de Paulo Freire e sua visão de uma educação
        libertadora e inclusiva.</p>
    </div>

    <div class="right">
      <p class="quote">“ Ensinar não é transferir conhecimento, mas criar as possibilidades para a sua própria produção
        ou a sua construção.”
      </p>
      <p class="personDesc">Paulo Freire <br>
        Pedagogia da autonomia. São Paulo: Paz e Terra, 1996.</p>
      <img :src="reglus" alt="foto de paulo freire" width="400">
    </div>
  </main>
  <FooterReglus />
</template>

<script>
import NavReglus from "@/components/nav/NavOut.vue"
import FooterReglus from "@/components/nav/FooterReglus.vue"

export default {
  name: 'ReglusRoomSobre',
  components: {
    NavReglus,
    FooterReglus
  },
  data() {
    return {
      students: require("@/assets/content/about.png"),
      reglus: require("@/assets/content/paulofreire.jpeg"),
    };
  }
}

</script>

<style scoped>
main {
  position: relative;
  display: flex;
}

.left,
.right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.projectDesc {
  text-align: justify;
  width: 70%;
}

h3 {
  font-weight: bold;
  font-size: 1.5em;
}

.quote {
  text-align: center;
  font-size: 1.2em;
  width: 60%;
  font-weight: regular;
}

.personDesc {
  text-align: center;
  width: 70%;
}

.right img {
  border-radius: 10px;
  box-shadow: 2px 5px 3px rgba(0, 0, 0, 0.5);
}
</style>