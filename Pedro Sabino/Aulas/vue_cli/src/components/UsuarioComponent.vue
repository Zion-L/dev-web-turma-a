<template>
    <div>
        <p>Nome: {{ nome }}</p>
        <p>Email: {{ email }}</p>
        <hr>
        <h1 v-show="doNiggasLikeChicken">OLHA O HB20 AE</h1>
        <h1 v-show="pDiddy">É mentiraaaaaa</h1>
        <img :src="urlImg"/>
    </div>
</template>

<script>

    export default {
        name: "UsuarioComponent",
        data() {
            return {
                nome: "Peaga da bmw, ex do Hb20",
                email: "peaga@BMW.com.br",
                doNiggasLikeChicken: false,
                urlImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO1dKpOrFHYLNEMatdi_l0q4pynf9k_5Jepg&s",
            };
        },
        mounted() {
            setTimeout(() => {
                this.doNiggasLikeChicken = true;
            }, 4 * 1000);

            setTimeout(() => {
                this.doNiggasLikeChicken = false;
                this.pDiddy = true;
                this.urlImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXIYQrbounHQreUAtDAwt8sNbx2vg4L7KyfA&s";
            }, 8 * 1000);
        },
    };

</script>

<style>

</style>