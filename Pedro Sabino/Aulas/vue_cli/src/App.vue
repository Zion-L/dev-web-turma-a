<template>
  <div>
      <img alt="Vue logo" src="./assets/logo.png"/>
      <br/>
      <home-component/>
      <br/>
      <usuario-component v-show="isUsuarioVisivel"/>
      <br/>
      <estilo-component/>
      <br>
      <imagem-component 
      urlImg="https://garagem360.com.br/wp-content/uploads/2022/05/P90462503_highRes_the-new-bmw-3-series.jpg"
       larguraImg="300"
       @visibilidade-img="escutarVisibilidadeImg"/>
  </div>
</template>

<script>
import HomeComponent from './components/HomeComponent.vue';
import UsuarioComponent from './components/UsuarioComponent.vue';
import EstiloComponent from './components/EstiloComponent.vue';
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
      isUsuarioVisivel: false,
    };
  },
  methods: {
    escutarVisibilidadeImg(isImgComponentVisivel){
          this.isUsuarioVisivel = !isImgComponentVisivel;
    },
  },
  created() {
    console.log("created");
  },
  mounted(){
    console.log("mounted");
  },
  updated() {
    console.log("updated");
  },
  errorCaptured(){
    console.log("errorCaptured");
  },
}
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
</style>
