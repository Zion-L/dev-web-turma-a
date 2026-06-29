const meuAppVue = {
    data() {
        return{
            nome: "João Victor",
            idade: 20,
            inputText: "",
        };
    },
};

Vue.createApp(meuAppVue).mount("#app");
