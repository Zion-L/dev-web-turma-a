<template>
    <div>
        <h1>Titulo do Componente</h1>
        <p class="subtitulo">Subtitulo do Componente</p>
    </div>
</template>

<script>
    export default {
        name: "EstiloComponent",
    };
</script>

<style>
    h1 {
        color: green;
    }

    .subititulo{
        font-family: 'Times New Roman', Times, serif;
        text-align: left;
        color: darkred;
    }
</style>