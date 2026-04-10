<template>
  <div>
<img alt="Vue logo" src="./assets/logo.png" />
<h1>Meu App Vue</h1>
<p class="subtitle">Bem-vindo ao meu aplicativo Vue!</p>
<br>
<Home-Component />
<hr/>
<Home-Component />
<UsuarioComponent v-show="isUsuarioVisivel" />
<br>
<UsuarioComponent />
<br>
<EstiloComponent />
<br>
<ImagemComponent 
@visibilidade-Img="listenVisibilidadeImg"
:larguraImg="450"
urlImg=" https://s2-autoesporte.glbimg.com/Hd0xOwD4BNi53gaqw3sWHuLqVAQ=/0x0:743x410/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2022/t/M/NDRWeQRD2mBaDyyoGKLw/2023-porsche-911-gt3-rs-leaked-full-details-coming-august-17th-196018-1.jpg" />
  </div>
</template>

<script>

import HomeComponent from "./components/HomeComponent.vue";
import UsuarioComponent from "./components/UsuarioComponent.vue";
import EstiloComponent from "./components/EstiloComponent.vue";
import ImagemComponent from "./components/Imagem.Component.vue";

export default {
  name: "App",
  components: {
    HomeComponent,
    UsuarioComponent,
    EstiloComponent,
    ImagemComponent,
  },
  data() {
    return {
      isUsuarioVisivel: false,
    };
  },
  methods: {
    listenVisibilidadeImg(isImgComponentVisible) {
      this.isUsuarioVisivel = !isImgComponentVisible;
      console.log("Visibilidade da imagem:", isImgComponentVisible);
    },
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
  },
  updated() {
    console.log("updated");
  },
  errorCaptured() {
    console.log("errorCaptured");
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
  color: #d1ce08;
  text-align: center ;
}
.subtitle {
  color: #057a22;
  font-family: "Gill Sans";
  text-align: center;
  
}
</style>