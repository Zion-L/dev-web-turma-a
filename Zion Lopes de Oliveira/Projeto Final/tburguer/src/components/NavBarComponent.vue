<template>
    <div>
        <nav id="nav">
            <router-link to="/" id="logo-url">
                <img src="/img/logo_tburguer.png" id="logo">
            </router-link> 
            <router-link to="/menu">Menu</router-link> |
            <router-link to="/pedidos">Pedidos</router-link> |
            <router-link to="/config">Config</router-link> |
        </nav>
    </div>
</template>
<script>
    export default {
        name: "NavBarComponent",
    }

</script>
<style scoped>
#logo {
    width: 60px;
    height: 60px;
}

#logo:hover{
    width: 70px;
    height: 70px;
    rotate: 3600deg;
    transition: 1s;
}

#nav #logo-url{
    margin: auto;
    margin-left: 20px;
}

#nav{
    background-color: rgb(124, 35, 0);
    border-bottom: rgb(196, 105, 45) 47px solid;
    padding: 10px 5px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

#nav a{
    color: rgb(0, 0, 0);
    text-decoration: none;
    margin: 20px;
    font-size: 18px;
    }

#nav a:hover{
    color: rgb(255, 255, 255);
    font-size: 20px;
    transition: 0.2s;
}
</style>