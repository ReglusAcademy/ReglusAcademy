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
          <h2>Fale com um tutor</h2>
          <p class="small-text">Gratuito</p>
          <router-link to="/versalas" class="button">Chat</router-link>
        </div>
        <img src="@/assets/content/professorealuno.png" alt="Tutor" class="image"/>
      </div>

      <div class="box purple">
        <div class="content">
          <h2>Organize seus estudos</h2>
          <p class="small-text">Gratuito</p>
          <router-link to="/agenda/estudante" class="button">Organize</router-link>
        </div>
        <img src="@/assets/content/organizeosestudos.png" alt="Organização" class="image" />
      </div>

      <div class="box green">
        <div class="content">
          <h2>Salas Disponíveis</h2>
          <p class="small-text">Gratuito</p>
          <router-link to="/versalas" class="button">Visualize</router-link>
        </div>
        <img src="@/assets/content/teachers.png" alt="Tutor" class="image" /> 
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 1em;
  margin-top: 2em;
}

.box {
  padding: 1em;
  border-radius: 8px;
  color: white;
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

.image {
  margin-left: 10em;
  width: 160px;
  height: 130px;
  object-fit: contain;
}
</style>