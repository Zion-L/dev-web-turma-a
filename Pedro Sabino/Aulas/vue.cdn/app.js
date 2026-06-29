const meuAppVue = {
    data() {
        return {
            nome : "P.diddy",
            idade : 36,
            inputText : "",
        };
    },
};

Vue.createApp(meuAppVue).mount("#app");