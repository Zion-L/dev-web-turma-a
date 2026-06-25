<template>
  <div>
    <NavBarComponent />
    <BannerComponent />
    <router-view />
  </div>
</template>

<script>

import NavBarComponent from './components/NavBarComponent.vue'
import BannerComponent from './components/BannerComponent.vue'

export default {
  name: 'App',
  components: {
    NavBarComponent,
    BannerComponent,
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #1a1a1a;
  min-height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f0f0f0;
  background-color: #1a1a1a;
  min-height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #f0f0f0;
}

nav a.router-link-exact-active {
  color: rgb(0, 214, 71);
}
</style>