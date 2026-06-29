<template>

  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Meu App Vue</h1>
    <p class="subTitulo">Meu subtítulo</p>
    <br>
    <home-component />
    <br>
    <usuario-component v-show="isUsuarioVisivel"/>
    <br>
    <estilo-component />
    <br>
    <imagem-component
      @visibilidadeImg="escutarVisibilidadeImg"
      larguraImg=200
      urlImg="https://img.freepik.com/fotos-gratis/homem-sendo-vitorioso-junto-ao-mar_23-2148739337.jpg" />
  </div>

</template>

<script>

import EstiloComponent from './components/EstiloComponent.vue';
import HomeComponent from './components/HomeComponent.vue';
import UsuarioComponent from './components/UsuarioComponent.vue';
import ImagemComponent from './components/ImagemComponent.vue';

export default {
  name: 'App',
  components: {
    HomeComponent,
    UsuarioComponent,
    EstiloComponent,
    ImagemComponent,
  },
  data() {
    return{
      isUsuarioVisivel : false,
    };
  },
methods: {
  escutarVisibilidadeImg(isImgComponetVisivel) {
    this.isUsuarioVisivel = !isImgComponetVisivel;
  },
},

  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted")
  },
  updated() {
    console.log("updated")
  },
  errorCaptured() {
    console.log("errorCaptured")
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

h1 {
  color: #2c3e50;
}

.subTitulo {
  color: aqua;
  font-family: "Gill Sans";
  text-align: center;
}
</style>
