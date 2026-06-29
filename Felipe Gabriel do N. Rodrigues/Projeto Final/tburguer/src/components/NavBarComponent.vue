<template>
  <div>
    <nav id="nav">
      <router-link id="logo-url" to="/">
        <img
          id="logo"
          src="https://images.pexels.com/photos/35710835/pexels-photo-35710835.jpeg"
          alt="Logo Cafézinho Selocura"
        />
      </router-link>
      <router-link to="/">Início</router-link> 
      <router-link to="/menu">Menu de Opções</router-link> 
      <router-link to="/pedidos">Pedidos</router-link> 
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBarComponent',
}
</script>

<style scoped>
#logo {
  width: 60px;
  height: 60px;
  object-fit: cover;       
  border-radius: 50%;      
  border: 2px solid rgb(0, 214, 71);
}

#logo:hover {
  width: 70px;
  height: 70px;
  rotate: 360deg;
  transition: 0.5s;
}

#nav #logo-url {
  margin: auto;
  margin-left: 0;
}

#nav {
  background-color: #1a1a1a;
  border-bottom: rgb(0, 214, 71) 4px solid;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#nav a {
  color: rgb(0, 214, 71);
  text-decoration: none;
  margin-left: 20px;
  font-size: 18px;
}

#nav a:hover {
  color: white;
  font-size: 22px;
  transition: 0.5s;
}
</style>