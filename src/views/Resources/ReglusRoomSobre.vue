<template>
  <NavReglus />
  <!-- <main>
    <section class="about-us">
      <h2>Sobre Nós</h2>
      <div class="illustration">
        <img src="@/assets/content/paulofreire.jpeg" alt="Foto de paulo freire">
      </div>
      <div class="quote">
        <p>
          "Ensinar não é transferir conhecimento, mas criar as
          possibilidades para a sua própria produção ou a sua
          construção."
        </p>
        <p>
          <strong>Paulo Freire</strong>
          <br>
          Pedagogia da autonomia. São Paulo: Paz e Terra, 1996.
        </p>
      </div>
      <p>
        Reglus Academy representa não apenas um esforço para
        superar as barreiras enfrentadas por pessoas
        neurodivergentes e em situação de vulnerabilidade
        socioeconômica no acesso à educação e construção do
        conhecimento, mas também uma afirmação do
        compromisso com os ideais de Paulo Freire e sua visão de
        uma educação libertadora e inclusiva.
      </p>
    </section>
  </main> -->

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
      <img :src="reglus" alt="paulo freire" width="400">
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
  display: flex;
}

.left,
.right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  width: 50%;
}

.projectDesc {
  text-align: justify;
  width: 70%;
}

h3 {
  font-weight: bold;
}

.quote {
  text-align: center;
  font-size: 1.5em;
  width: 60%;
  font-weight: regular;
}

.personDesc {
  text-align: center;
  width: 70%;
}
</style>