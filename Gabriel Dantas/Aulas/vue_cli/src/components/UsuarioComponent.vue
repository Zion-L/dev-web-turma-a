<template>
    <div>
        <h1 v-show="isBrasaCampeao">Brasil Campeão</h1>
        <p>Nombre: {{ nome }}</p>
        <p>Email: {{ email }}</p>
        <hr />
<img :src="urlImg"
 width="300"
height="200" />
    </div>
</template>

<script>


export default {
    name: 'UsuarioComponent',
    data() {
        return {
           
                nome: 'Gabriel Dantas',
                email: 'gabriel.dantas@example.com',
                isBrasaCampeao: false,
                urlImg: "https://ds-images.bolavip.com/news/image/740/416/?src=https://images.bolavip.com/webp/br/full/BBR_20241016_BBR_1002443_Selecao-Brasileira-2-2-scaled-e1729102666338.webp" 
            };
        },
        mounted() {
            setTimeout(() => {
                this.isBrasaCampeao = true;
            }, 4000);
             setTimeout(() => {
                this.isBrasaCampeao = false;
                this.urlImg = "https://cdn-images-site-arauto.portalarauto.com.br/2024/03/65e60ff3e122d.png"
            }, 8000);
            
            console.log('UsuarioComponent montado');
        },  
    }
</script>

<style>

</style>
