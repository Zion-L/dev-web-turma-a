<template>
  <div id="app">

    <nav class="navbar">
      <div class="navbar-logo">
        ⚽ FutebolApp
      </div>
      <div class="navbar-links">
        <router-link to="/">🏠 Início</router-link>
        <router-link to="/album">🎴 Meu Álbum</router-link>
      </div>
    </nav>

    <router-view />

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Reset básico */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Arial, sans-serif;
  background-color: #f1f5f9; 
}

/* ===== NAVBAR ===== */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0f172a; 
  padding: 15px 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.navbar-logo {
  font-size: 22px;
  font-weight: bold;
  color: white;
}

.navbar-links {
  display: flex;
  gap: 20px;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.navbar-links a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}


.navbar-links a.router-link-exact-active {
  background-color: white;
  color: #0f172a;
}
</style>