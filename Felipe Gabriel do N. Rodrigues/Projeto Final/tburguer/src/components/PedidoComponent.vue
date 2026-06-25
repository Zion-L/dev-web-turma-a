<template>
    <div class="pedido-wrapper">

        <!-- Modal de confirmação do pedido -->
        <modal-confirm-component :visivel="modalVisivel" titulo="Confirmar Pedido"
            :mensagem="`Deseja confirmar o pedido de ${nomeCliente}? Total: R$ ${calcularTotal()},00`"
            textoBotao="Sim, confirmar!" tipo="verde" @confirmar="confirmarPedido" @cancelar="modalVisivel = false" />

        <!-- Alerta de erro de validação — flutuante para aparecer no centro da tela -->
        <alert-component tipo="erro" :mensagem="alerta.erro" :flutuante="true" @fechar="alerta.erro = ''" />

        <!-- Alerta de sucesso após confirmar — flutuante=true centraliza na tela -->
        <alert-component :tipo="alerta.tipo" :mensagem="alerta.mensagem" :flutuante="true"
            @fechar="alerta.mensagem = ''" />

        <form class="pedido-form" @submit="criarPedido($event)">

            <!-- Foto e nome Café  -->
            <div class="cafe-header">
                <img class="cafe-foto" :src="cafe && cafe.foto ? cafe.foto : ''"
                    :alt="cafe && cafe.nome ? cafe.nome : ''" />
                <div class="cafe-header-overlay">
                    <p class="cafe-nome">{{ cafe && cafe.nome ? cafe.nome : '-' }}</p>
                    <p class="cafe-preco" v-if="cafe && cafe.valor">R$ {{ cafe.valor }},00</p>
                </div>
            </div>

            <!-- Campo: Nome -->
            <div class="campo">
                <label class="campo-label" for="nome-cliente">Nome</label>
                <input class="campo-input" :class="{ 'campo-erro': erros.nome }" type="text" v-model="nomeCliente"
                    id="nome-cliente" placeholder="Digite seu nome" />
                <span class="mensagem-erro" v-if="erros.nome">{{ erros.nome }}</span>
            </div>

            <!-- Campo: Tamanho -->
            <div class="campo">
                <label class="campo-label">Tamanho do Café</label>
                <select class="campo-input campo-select" :class="{ 'campo-erro': erros.tamanho }"
                    v-model="tamanhoCafeSelecionado">
                    <option value="">Selecione o tamanho do café</option>
                    <option v-for="tamanhoCafe in listaTamanhoCafe" :key="tamanhoCafe.id" :value="tamanhoCafe">
                        {{ tamanhoCafe.descricao }}
                    </option>
                </select>
                <span class="mensagem-erro" v-if="erros.tamanho">{{ erros.tamanho }}</span>
            </div>

            <!-- Seção: Complementos -->
            <div class="campo">
                <label class="campo-label secao-titulo">Selecione os opcionais</label>
                <label class="campo-sublabel">Complementos</label>
                <div class="opcoes-grid">
                    <label class="opcao-card" v-for="complemento in listaComplementos" :key="complemento.id"
                        :class="{ selecionado: listaComplementosSelecionados.includes(complemento) }">
                        <input type="checkbox" :value="complemento" v-model="listaComplementosSelecionados" hidden />
                        <span class="opcao-nome">{{ complemento.nome }}</span>
                        <span class="opcao-preco">R$ {{ complemento.valor }},00</span>
                    </label>
                </div>
            </div>

            <!-- Seção: Bebidas -->
            <div class="campo">
                <label class="campo-sublabel">Bebidas</label>
                <div class="opcoes-grid">
                    <label class="opcao-card" v-for="bebida in listaBebidas" :key="bebida.id"
                        :class="{ selecionado: listaBebidasSelecionadas.includes(bebida) }">
                        <input type="checkbox" :value="bebida" v-model="listaBebidasSelecionadas" hidden />
                        <span class="opcao-nome">{{ bebida.nome }}</span>
                        <span class="opcao-preco">{{ bebida.valor === 0 ? 'Grátis' : `R$ ${bebida.valor},00` }}</span>
                    </label>
                </div>
            </div>

            <!-- Resumo do pedido — só aparece quando nome e tamanho estão preenchidos -->
            <div class="resumo" v-if="nomeCliente.trim() && tamanhoCafeSelecionado">
                <h3 class="resumo-titulo">📋 Resumo do Pedido</h3>

                <div class="resumo-linha">
                    <span class="resumo-chave">Cliente</span>
                    <span class="resumo-valor">{{ nomeCliente }}</span>
                </div>

                <div class="resumo-linha">
                    <span class="resumo-chave">Café</span>
                    <span class="resumo-valor">{{ cafe.nome }}</span>
                </div>

                <div class="resumo-linha">
                    <span class="resumo-chave">Tamanho</span>
                    <span class="resumo-valor">{{ tamanhoCafeSelecionado.descricao }}</span>
                </div>

                <div class="resumo-linha" v-if="listaComplementosSelecionados.length">
                    <span class="resumo-chave">Complementos</span>
                    <span class="resumo-valor">{{listaComplementosSelecionados.map(c => c.nome).join(', ')}}</span>
                </div>

                <div class="resumo-linha" v-if="listaBebidasSelecionadas.length">
                    <span class="resumo-chave">Bebidas</span>
                    <span class="resumo-valor">{{listaBebidasSelecionadas.map(b => b.nome).join(', ')}}</span>
                </div>

                <div class="resumo-divisor"></div>

                <div class="resumo-linha resumo-total">
                    <span class="resumo-chave">Total</span>
                    <span class="resumo-valor-total">R$ {{ calcularTotal() }},00</span>
                </div>
            </div>

            <!-- Botão confirmar -->
            <div class="btn-wrapper">
                <button type="button" class="btn-confirmar" @click="abrirModal">Confirmar Pedido</button>
            </div>

        </form>
    </div>
</template>

<script>
import ModalConfirmComponent from './ModalConfirmComponent.vue';
import AlertComponent from './AlertComponent.vue';

export default {
    name: "PedidoComponent",
    components: { ModalConfirmComponent, AlertComponent },
    props: {
        cafe: null,
    },
    data() {
        return {
            listaTamanhoCafe: [],
            listaBebidas: [],
            listaComplementos: [],
            nomeCliente: "",
            tamanhoCafeSelecionado: "",
            listaComplementosSelecionados: [],
            listaBebidasSelecionadas: [],
            erros: {
                nome: "",
                tamanho: "",
            },
            // controla se o modal está visível
            modalVisivel: false,
            // alerta de sucesso/erro
            alerta: {
                tipo: 'sucesso',
                mensagem: '',
                erro: '',   
            },
        };
    },
    methods: {
        // Calcula o total somando café + complementos + bebidas
        calcularTotal() {
            const valorCafe = this.cafe?.valor ?? 0;
            const valorComplementos = this.listaComplementosSelecionados.reduce((soma, c) => soma + c.valor, 0);
            const valorBebidas = this.listaBebidasSelecionadas.reduce((soma, b) => soma + b.valor, 0);
            return valorCafe + valorComplementos + valorBebidas;
        },
        async getTamanhoCafe() {
            const response = await fetch(`${this.$apiUrl}/tamanhoCafe`);
            const dados = await response.json();
            this.listaTamanhoCafe = dados;
        },
        async getOpcionais() {
            const response = await fetch(`${this.$apiUrl}/opcionais`);
            const dados = await response.json();
            this.listaComplementos = dados.complemento;
            this.listaBebidas = dados.bebidas;
        },
        criarPedido(e) {
            e.preventDefault();
        },

        // Valida os campos e abre o modal se tiver certo.
        abrirModal() {
            this.erros.nome = "";
            this.erros.tamanho = "";

            if (!this.nomeCliente.trim()) {
                this.erros.nome = "Por favor, digite seu nome.";
            }
            if (!this.tamanhoCafeSelecionado) {
                this.erros.tamanho = "Por favor, selecione o tamanho do café.";
            }

            if (this.erros.nome || this.erros.tamanho) {
                this.alerta.erro = 'Preencha todos os campos obrigatórios antes de confirmar.';
                return;
            }

            // Limpa o erro e abre o modal.
            this.alerta.erro = '';
            this.modalVisivel = true;
        },

        // Chamado quando o usuário clica em "Sim, confirmar!" no modal.
        async confirmarPedido() {
            this.modalVisivel = false;

            const dadosPedido = {
                nome: this.nomeCliente,
                tamanhoCafe: this.tamanhoCafeSelecionado,
                bebidas: Array.from(this.listaBebidasSelecionadas),
                complemento: Array.from(this.listaComplementosSelecionados),
                cafe: this.cafe,
                statusId: 5,
            };

            await fetch(`${this.$apiUrl}/pedidos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosPedido),
            });

            // Mostra o alerta de sucesso
            this.alerta.tipo = 'sucesso';
            this.alerta.mensagem = 'Pedido confirmado! Redirecionando para pedidos...';

            // Aguarda 3 segundos para redirecionar.
            setTimeout(() => {
                this.$router.push('/pedidos');
            }, 3000);
        },
    },
    mounted() {
        this.getTamanhoCafe();
        this.getOpcionais();
    },
};
</script>

<style scoped>

/* Wrapper centraliza o formulário na página */
.pedido-wrapper {
    padding: 32px 24px;
    color: #f0f0f0;
}

.pedido-form {
    max-width: 640px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 28px;
}

/* ── Cabeçalho com foto ── */

.cafe-header {
    position: relative;
    width: 100%;
    height: 220px;
    border-radius: 16px;
    overflow: hidden;
    border: 2px solid rgb(0, 214, 71);
}

.cafe-foto {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
}

/* Gradiente escuro na parte de baixo da imagem para o texto ser legível */

.cafe-header-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px 20px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    text-align: left;
}

.cafe-nome {
    font-size: 28px;
    font-weight: bold;
    color: #fff;
    margin: 0;
}

.cafe-preco {
    font-size: 18px;
    color: rgb(0, 214, 71);
    margin: 4px 0 0;
    font-weight: bold;
}

/* ── Campos de formulário ── */
.campo {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

/* Label principal de cada seção — borda verde no lado esquerdo como marcador visual */
.campo-label {
    font-size: 15px;
    font-weight: bold;
    color: #f0f0f0;
    border-left: 4px solid rgb(0, 214, 71);
    padding: 4px 12px;
    text-align: left;
}

.campo-sublabel {
    font-size: 13px;
    font-weight: bold;
    color: #aaa;
    text-align: left;
    padding-left: 4px;
}

/* input e select recebem fundo escuro para combinar com o tema */
.campo-input {
    background: #242424;
    color: #f0f0f0;
    border: 1px solid #444;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.2s;
}

/*  feedback visual */
.campo-input:focus {
    border-color: rgb(0, 214, 71);
}

.campo-select {
    height: 48px;
    cursor: pointer;
}

/* ── Cards de opcionais (complementos e bebidas) ── */

.opcoes-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

/* Cada opção é um <label> estilizado como card clicável */
.opcao-card {
    background: #242424;
    border: 2px solid #444;
    border-radius: 12px;
    padding: 14px 16px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
    transition: border-color 0.2s, background 0.2s;
}

.opcao-card:hover {
    border-color: rgb(0, 214, 71);
}

.opcao-card.selecionado {
    border-color: rgb(0, 214, 71);
    background: rgba(0, 214, 71, 0.1);
}

.opcao-nome {
    font-size: 14px;
    font-weight: bold;
    color: #f0f0f0;
}

.opcao-preco {
    font-size: 13px;
    color: rgb(0, 214, 71);
}

/* Quando o campo tem erro, a borda fica vermelha */
.campo-erro {
    border-color: #e74c3c !important;
}

/* Mensagem de erro embaixo do campo */
.mensagem-erro {
    font-size: 13px;
    color: #e74c3c;
    text-align: left;
    padding-left: 4px;
}

/* ── Resumo do pedido ── */
.resumo {
    background: #242424;
    border: 2px solid rgb(0, 214, 71);
    border-radius: 14px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: entrar 0.3s ease;
}

@keyframes entrar {
    from {
        opacity: 0;
        transform: translateY(-6px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.resumo-titulo {
    font-size: 16px;
    font-weight: bold;
    color: rgb(0, 214, 71);
    text-align: left;
    margin: 0 0 4px;
}

.resumo-linha {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
}

.resumo-chave {
    font-size: 13px;
    color: #aaa;
    white-space: nowrap;
    min-width: 90px;
    text-align: left;
}

.resumo-valor {
    font-size: 13px;
    color: #f0f0f0;
    text-align: right;
}

.resumo-divisor {
    border-top: 1px solid #444;
    margin: 4px 0;
}

.resumo-total {
    align-items: center;
}

.resumo-valor-total {
    font-size: 20px;
    font-weight: bold;
    color: rgb(0, 214, 71);
}

/* ── Botão confirmar ── */

.btn-wrapper {
    margin-top: 16px;
    padding-bottom: 40px;
}

.btn-confirmar {
    width: 100%;
    padding: 16px;
    background-color: rgb(0, 214, 71);
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    box-sizing: border-box;
}

.btn-confirmar:hover {
    background-color: transparent;
    color: rgb(0, 214, 71);
    border-color: rgb(0, 214, 71);
}
</style>