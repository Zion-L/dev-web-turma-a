<template>
  <div>
    <h1>Configuração dos Pedidos</h1>
    <pedido-component-vue :cafe="cafeSelecionado"/>
  </div>
</template>

<script>

import PedidoComponentVue from '@/components/PedidoComponent.vue';

export default {
  name: 'ConfiguracaoPeiddoView',
  components: {
    PedidoComponentVue,
  },
  data() {
    return {
      cafeSelecionado : null,
    };
  },
  mounted () {
    const query = this.$route.query;
    if(query.cafe) {
      const decodeBurguer = JSON.parse(decodeURIComponent(query.cafe));
      this.cafeSelecionado = decodeBurguer;
    }
  },
};
</script>

<style scoped>
h1 {
  margin-top: 40px;
  color: #f0f0f0;
}
</style>