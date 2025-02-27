<template>
  <NavReglus />
  <div class="container">
    <h1>Olá, {{ userName }}!</h1>
    <div class="boxes">
      <div class="box blue">
        <div class="content">
          <h2>Agende reuniões</h2>
          <router-link to="/agenda" class="button">Agende</router-link>
        </div>
        <img src="@/assets/content/professorealuno.png" alt="Tutor" class="image" />
      </div>

      <div class="box purple">
        <div class="content">
          <h2>Acompanhe seus estudantes</h2>
          <router-link to="/listaralunos" class="button">Acompanhe</router-link>
        </div>
        <img src="@/assets/content/organizeosestudos.png" alt="Organização" class="image" />
      </div>

      <div class="box green">
        <div class="content">
          <h2>Gerencie suas salas</h2>
          <router-link to="/salas" class="button">Visualize</router-link>
        </div>
        <img src="@/assets/content/organizeosestudos.png" alt="Organização" class="image" />
      </div>
    </div>
  </div>
  <FooterReglus />
</template>

<script>
import NavReglus from "@/components/nav/NavIn.vue";
import FooterReglus from "@/components/nav/FooterReglus.vue";
export default {
  name: "HomeProfessor",
  components: {
    NavReglus,
    FooterReglus
  },
  data() {
    return {
      userName: '',
      userRole: ""
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = localStorage.getItem("userType");

    console.log(user)
    
    this.userRole = userType || "";

    if (!user || this.userRole !== "EDUCATOR") {
      this.$router.push("/");
      return;
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