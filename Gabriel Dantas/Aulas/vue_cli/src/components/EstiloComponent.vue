<template>
    <div>
        <h1>Usuário</h1>
        <p>Nome: {{ usuario.nome }}</p>
        <p>Email: {{ usuario.email }}</p>
    </div>
</template>

<script>
export default {
    name: 'EstiloComponent',
    data() {
        return {
            usuario: {
                nome: 'João Silva',
                email: 'joao.silva@example.com'
            }
        };
    }
}
</script>

<style scoped>
h1{
    color: greenyellow;
}

.subtitulo{
    font-family: 'Times New Roman', Times, serif;
    text-align: left;
    color: darkred;
}
</style>