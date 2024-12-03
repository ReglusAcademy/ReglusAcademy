<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

textarea:focus,
input:focus,
select:focus {
  box-shadow: 0 0 0 0;
  border: 0 none;
  outline: 0;
}

:root {
  --branco: #fcfcfc;
  --marromlogo: #2e2214;
  --cinza: #212529;
  --preto: #0D0D0D;
  --roxo: #A432A6;
  --lilas: #9c68ff;
  --lilashover: #5a3abf;
}

ul,
li,
a {
  list-style: none;
  text-decoration: none;
  font-weight: bold;
  margin: 0; 
  padding: 0; 
}
</style>
