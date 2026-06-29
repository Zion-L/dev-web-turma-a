<template>
  <div>
    <h1>Minha Agenda de Tarefas</h1>
  </div>
  <lista-component />
</template>


<script>
import ListaComponent from './components/ListaComponent.vue';

export default {
  name: 'App',
  components: {
    ListaComponent,
},
}
</script>


<style scoped>

</style>



<!-- Comando para fazer usar o lint! -->
<!-- npm run lint -- --fix -->