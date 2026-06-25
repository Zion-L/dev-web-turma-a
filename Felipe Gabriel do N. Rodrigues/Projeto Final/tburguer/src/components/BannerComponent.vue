<template>
  <div id="main-banner">
    <h1>Cafézinho Selocura</h1>
  </div>
</template>

<script>

export default {
    name: 'BannerComponent',
}

</script>

<style scoped>

#main-banner {
    background-image: url("https://images.pexels.com/photos/34287070/pexels-photo-34287070.jpeg");
    height: 300px;
    background-position: 0;
    background-size:cover;
    display: flex;
    align-items: center;
    justify-content: flex-end;

}

#main-banner h1{
    font-size: 40px;
    color: #fff;
    background: rgba(0, 160, 67, 0.85);
    padding: 25px;
    border-radius: 100px 0px 0px 100px;
}
</style>