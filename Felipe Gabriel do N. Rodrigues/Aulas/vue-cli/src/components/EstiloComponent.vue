<template>
    <div>
        <h1>Título do Componente</h1>
        <p class="subTitulo">Subtítulo do Componente</p>
    </div>
</template>

<script>
export default {
    name: "EstiloComponent",
};
</script>

<style scoped>
    h1 {
        color:greenyellow;
    }

    .subTitulo {
        color: darkblue;
        font-family:'Times New Roman', Times, serif;
        text-align: center;
    }
</style>    