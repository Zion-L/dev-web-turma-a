<template>
    <div>
        <img :width="larguraImg"  v-show="isImgVisivel"
        :src="urlImg"
   />
   <br />
   <button @click="ApareceEsconde(), trocaLabel()"> {{NomeBotao}} </button>
    </div>
</template>

<script>

export default {
    name: "ImagemComponent",
    data() {
        return {
            isImgVisivel: true,
            NomeBotao: "Mostrar Imagem"
        };
    }, 
    methods: {
        ApareceEsconde() {
            this.isImgVisivel = !this.isImgVisivel;
            this.$emit("visibilidadeImg", this.isImgVisivel);
            this.trocaLabel();
        }
        },
        trocaLabel() {
            this.isImgVisivel = !this.isImgVisivel;
            if (this.isImgVisivel) {
                this.NomeBotao = "Esconder Imagem";
            } else {
                this.NomeBotao = "Mostrar Imagem";
        }
    },
    props: {
       urlImg: String,
       larguraImg: Number,
       },
       emits: ["visibilidadeImg"],
};

</script>

<style scoped>
img {
    border: 10px solid #ff0000;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
}
</style>