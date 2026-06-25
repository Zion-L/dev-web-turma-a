<template>
    <div>

        <alert-component
            :tipo="alerta.tipo"
            :mensagem="alerta.mensagem"
            @fechar="alerta.mensagem = ''"
        />

        <!-- Modal de confirmação de exclusão -->
        <modal-confirm-component
            :visivel="modalVisivel"
            titulo="Excluir Pedido"
            :mensagem="`Tem certeza que deseja excluir o pedido #${pedidoParaDeletar}? Essa ação não pode ser desfeita.`"
            textoBotao="Sim, excluir!"
            tipo="vermelho"
            @confirmar="confirmarDelecao"
            @cancelar="modalVisivel = false"
        />

        <div id="pedidos-tabela">
            <div>
                <div id="pedidos-tabela-cabecalho">
                    <div id="ordem-id">#ID</div>
                    <div>Nome</div>
                    <div>Café</div>
                    <div>Tamanho</div>
                    <div>Opcionais</div>
                    <div>Status</div>
                    <div id="div-acoes">Ações</div>
                </div>
            </div>
        </div>
        <div class="pedidos-tabela-linha" v-for="pedido in listaPedidosRealizados" :key="pedido.id">
            <div id="ordem-numero">{{ pedido.id }}</div>
            <div>{{ pedido.nome }}</div>
            <div>{{ pedido.cafe?.nome }}</div>
            <div>{{ pedido.tamanhoCafe?.descricao }}</div>
            <div>
                <ul>
                    <li v-for="(complemento, index) in pedido.complemento" :key="index">
                        {{ complemento.nome }}
                    </li>
                </ul>
                <div class="divider"></div>
                <ul>
                    <li v-for="(bebida, index) in pedido.bebidas" :key="index">
                        {{ bebida.nome }}
                    </li>
                </ul>
            </div>
            <div>
                <select name="status" class="status" @change="atualizarStatusPedido($event, pedido.id)">
                    <option value="">Selecione</option>
                    <option v-for="status in listaStatusPedido" :key="status.id" :value="status.id"
                        :selected="status.id == pedido.statusId">
                        {{ status.descricao }}
                    </option>
                </select>
            </div>
            <div id="div-acoes">
                <button class="btn-deletar" @click="abrirModalDelecao(pedido.id)" title="Excluir pedido">🗑️</button>
            </div>
        </div>
    </div>
</template>

<script>
import AlertComponent from './AlertComponent.vue';
import ModalConfirmComponent from './ModalConfirmComponent.vue';

export default {
    name: "ListaPedidoComponent",
    components: { AlertComponent, ModalConfirmComponent },

    data() {
        return {
            listaPedidosRealizados: [],
            listaStatusPedido: [],
            alerta: {
                tipo: 'info',
                mensagem: '',
            },
            // controla o modal de exclusão
            modalVisivel: false,
            pedidoParaDeletar: null,
        };
    },
    methods: {
        // Mostrar alerta e sumir em 4 segundos
        mostrarAlerta(tipo, mensagem) {
            this.alerta.tipo = tipo;
            this.alerta.mensagem = mensagem;
            setTimeout(() => { this.alerta.mensagem = ''; }, 4000);
        },

        async consultarPedidos() {
            try {
                const response = await fetch(`${this.$apiUrl}/pedidos`);
                const dados = await response.json();
                this.listaPedidosRealizados = dados;
            } catch {
                this.mostrarAlerta('erro', 'Não foi possível carregar os pedidos.');
            }
        },

        async consultarStatusPedido() {
            const response = await fetch(`${this.$apiUrl}/status_pedido`);
            this.listaStatusPedido = await response.json();
        },

        // Abre o modal e guarda o id do pedido que será deletado
        abrirModalDelecao(id) {
            this.pedidoParaDeletar = id;
            this.modalVisivel = true;
        },

        // Chamado quando o usuário clica em sim no modal de exclusão.
        async confirmarDelecao() {
            this.modalVisivel = false;
            const id = this.pedidoParaDeletar;

            try {
                const response = await fetch(`${this.$apiUrl}/pedidos/${id}`, {
                    method: "DELETE"
                });

                if (response.ok) {
                    this.listaPedidosRealizados = this.listaPedidosRealizados.filter(p => p.id !== id);
                    this.mostrarAlerta('sucesso', `Pedido #${id} excluído com sucesso!`);
                } else {
                    this.mostrarAlerta('erro', `Erro ao excluir o pedido #${id}. Tente novamente.`);
                }
            } catch {
                this.mostrarAlerta('erro', 'Falha na conexão. Verifique se o servidor está rodando.');
            }

            this.pedidoParaDeletar = null;
        },

        async atualizarStatusPedido(event, idPedido) {
            try {
                const idPedidoAtualizado = event.target.value;
                const atualizarJson = JSON.stringify({ statusId: idPedidoAtualizado });
                const response = await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: atualizarJson,
                });
                if (response.ok) {
                    this.mostrarAlerta('sucesso', `Status do pedido #${idPedido} atualizado!`);
                } else {
                    this.mostrarAlerta('erro', `Erro ao atualizar status do pedido #${idPedido}.`);
                }
            } catch {
                this.mostrarAlerta('erro', 'Falha na conexão ao atualizar status.');
            }
        },
    },
    mounted() {
        this.consultarPedidos();
        this.consultarStatusPedido();
    },
};
</script>

<style scoped>
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
    border-bottom: 2px solid #444;
    color: #f0f0f0;
}

#pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
    width: 18%;
}

.pedidos-tabela-linha {
    width: 100%;
    padding: 12px;
    border-bottom: 1px dotted #444;
    color: #f0f0f0;
    align-items: center;
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
    width: 5%;
}

.btn-deletar {
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.2s;
    padding: 4px;
}

.btn-deletar:hover {
    transform: scale(1.2);
}
</style>