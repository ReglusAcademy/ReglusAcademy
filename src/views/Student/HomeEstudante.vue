<template>
  <NavReglus />
  <div class="container">
    <div>
      <ImageUser />
    </div>
    <h1>Olá, {{ userName }}!</h1>
    <div class="boxes">
      <div class="box blue">
        <div class="content">
          <h2>Seja acompanhado por um tutor</h2>
          <p class="small-text">Gratuito</p>
          <router-link to="/agenda" class="button">Agende</router-link>
        </div>
        <img src="@/assets/content/professorealuno.png" alt="Tutor" class="image" />
      </div>

      <div class="box purple">
        <div class="content">
          <h2>Organize seus estudos</h2>
          <p class="small-text">Gratuito</p>
          <router-link to="/agenda" class="button">Organize</router-link>
        </div>
        <img src="@/assets/content/organizeosestudos.png" alt="Organização" class="image" />
      </div>

      <div class="box green boxAll">
        <div class="content">
          <h2>Salas Disponíveis</h2>
          <router-link to="/versalas" class="button">Visualize</router-link>
        </div>
        <img src="@/assets/content/professorealuno.png" alt="Tutor" class="image" />
      </div>
    </div>
  </div>
  <FooterReglus />
</template>

<script>
import NavReglus from "@/components/nav/NavIn.vue";
import FooterReglus from "@/components/nav/FooterReglus.vue";
import ImageUser from "@/components/card/resources/ImageUser.vue";

export default {
  name: "HomeEstudante",
  components: {
    NavReglus,
    FooterReglus,
    ImageUser
  },
  data() {
    return {
      userName: '',
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.userImage = null;

    console.log(user)

    if (!user) {
      this.$router.push('/');
    } else {
      this.userName = user.name;
    }
  }
}

</script>
<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.boxes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1em;
  margin-top: 2em;
}

.box {
  padding: 1em;
  border-radius: 8px;
  color: white;
}

.boxAll {
  grid-column: span 2;
}

.blue {
  background-color: #8c52ff;
}

.purple {
  background-color: #003366;
}

.green {
  background-color: var(--verde);
}

.content {
  flex: 1;
  text-align: left;
}

.small-text {
  font-size: 1em;
}

.button {
  display: inline-block;
  padding: 0.5em 1em;
  margin-top: 0.5em;
  background-color: #ffffff;
  color: #000;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
}
</style>