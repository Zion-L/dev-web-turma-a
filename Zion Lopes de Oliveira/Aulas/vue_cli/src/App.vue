<template>
  <div>
    <h1>Meu App Vue</h1>    <img alt="Vue logo" src="./assets/logo.png" />

    <p class="subtitulo">Meu Subtitulo</p>
    <br />
    <home-component />
    <br>
    <usuario-component />
    <br>
    <estilo-component/>
  </div>
</template>

<script>
import HomeComponent from './components/HomeComponent.vue';
import UsuarioComponent from './components/UsuarioComponent.vue';
import EstiloComponent from './components/EstiloComponent.vue';

export default {
  name: "App",
  components: {
    HomeComponent,
    UsuarioComponent,
    EstiloComponent
  },
  created(){
    console.log("created")
  },
  mounted(){
    console.log("mouted")
  },
  updated() {
    console.log("updated")
  },
  errorCaptured(){
    console.log("erro")
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1{
  color: darkmagenta;
}

.subtitulo{
  color: darkseagreen;
  font-family: "Gill Sans";
  text-align: center;
}
</style>
