<template>
  <div>
    <!-- Modal de confirmação -->
    <div v-if="modalVisivel" class="modal-overlay">
      <div class="modal">
        <h3>Confirmar exclusão</h3>
        <p>Tem certeza que deseja excluir o pedido <strong>#{{ pedidoParaDeletar }}</strong>?</p>
        <div class="modal-acoes">
          <button class="btn-cancelar" @click="cancelarDelecao">Cancelar</button>
          <button class="btn-confirmar" @click="confirmarDelecao">Excluir</button>
        </div>
      </div>
    </div>

    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Nome</div>
          <div>Hamburguer</div>
          <div>Ponto</div>
          <div>Opcionais</div>
          <div>Status</div>
          <div id="div-acoes">Ações</div>
        </div>
      </div>
    </div>
    <div
      class="pedidos-tabela-linha"
      v-for="pedido in listaPedidosRealizados"
      :key="pedido.id"
    >
      <div id="ordem-numero">{{ pedido.id }}</div>
      <div>{{ pedido.nome }}</div>
      <div>{{ pedido.burguer.nome }}</div>
      <div>{{ pedido.ponto.descricao }}</div>
      <div>
        <ul>
          <li v-for="(complemento, index) in pedido.complemento" :key="index">
            {{ complemento.nome }}
          </li>
        </ul>
        <div class="divider"></div>
        <ul>
          <li v-for="(bebidas, index) in pedido.bebidas" :key="index">
            {{ bebidas.nome }}
          </li>
        </ul>
      </div>
      <div>
        <select name="status">
          <option value="">Selecione</option>
          <option
            v-for="status in listaStatusPedido"
            :key="status.id"
            :value="status.id"
            :selected="status.id == pedido.statusId"
          >
            {{ status.descricao }}
          </option>
        </select>
      </div>
      <div id="div-acoes">
        <img @click="solicitarDelecao(pedido.id)"
        src="/img/icone_lixeira.png"
        width="35px" height="35px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListaPedidoComponent",
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
      modalVisivel: false,
      pedidoParaDeletar: null,
    };
  },
  methods: {
    async consultarPedidos() {
      const response = await fetch("http://localhost:3000/pedidos");
      const dados = await response.json();
      this.listaPedidosRealizados = dados;
    },
    async consultarStatusPedido() {
      const response = await fetch("http://localhost:3000/status_pedido");
      this.listaStatusPedido = await response.json();
    },
    solicitarDelecao(id) {
      this.pedidoParaDeletar = id;
      this.modalVisivel = true;
    },
    cancelarDelecao() {
      this.pedidoParaDeletar = null;
      this.modalVisivel = false;
    },
    async confirmarDelecao() {
      await fetch(`http://localhost:3000/pedidos/${this.pedidoParaDeletar}`, {
        method: "DELETE",
      });
      this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
        (p) => p.id !== this.pedidoParaDeletar
      );
      this.cancelarDelecao();
    },
        async atualizarStatusPedido( event, Idpedido) {
            const idPedidoAtualizado = event.target.value;
            const novoStatusId = parseInt(idPedidoAtualizado);
            const atualizaoJSon = JSON.stringify({ statusId: idPedidoAtualizado });
            await fetch(`http://localhost:3000/pedidos/${Idpedido}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: atualizaoJSon,
            });
        },
},
  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>

<style scoped>
/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  width: 340px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal h3 {
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
}

.modal p {
  margin: 0 0 1.5rem;
  color: #555;
}

.modal-acoes {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn-cancelar,
.btn-confirmar {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
}

.btn-cancelar {
  background: #e0e0e0;
  color: #333;
}

.btn-cancelar:hover {
  background: #ccc;
}

.btn-confirmar {
  background: #e53935;
  color: #fff;
}

.btn-confirmar:hover {
  background: #c62828;
}

/* Estilos originais */
#pedidos-tabela {
  width: 100%;
  margin: 0 auto;
}

#pedidos-tabela-cabecalho,
#pedidos-tabela-linhas,
.pedidos-tabela-linha {
  display: flex;
  flex-wrap: wrap;
}

#pedidos-tabela-cabecalho {
  font-weight: bold;
  padding: 12px;
  border-bottom: 2px solid #222;
}

#pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
  width: 18%;
}

.pedidos-tabela-linha {
  width: 100%;
  padding: 12px;
  border-bottom: 1px dotted #222;
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
  width: 5%;
}
</style>