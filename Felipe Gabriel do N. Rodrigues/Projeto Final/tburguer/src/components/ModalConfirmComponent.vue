<template>
    
    <div class="modal-overlay" v-if="visivel" @click.self="$emit('cancelar')">
        <!-- @click.self para cancelar ao clicar fora do domínio (DOM) -->
        <div class="modal-caixa">
            <p class="modal-icone">{{ icone() }}</p>
            <h3 class="modal-titulo">{{ titulo }}</h3>
            <p class="modal-mensagem">{{ mensagem }}</p>
            <div class="modal-botoes">
                <button class="btn-cancelar" @click="$emit('cancelar')">Cancelar</button>
                <button class="btn-confirmar" :class="tipoBotao()" @click="$emit('confirmar')">{{ textoBotao }}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalConfirmComponent',
    props: {
        visivel: { type: Boolean, default: false },
        titulo: { type: String, default: 'Tem certeza?' },
        mensagem: { type: String, default: '' },
        textoBotao: { type: String, default: 'Confirmar' },
        // Controlar a cor do botão de confirmação: 'verde' ou 'vermelho'
        tipo: { type: String, default: 'verde' },
    },
    emits: ['confirmar', 'cancelar'],
    methods: {
        icone() {
            return this.tipo === 'vermelho' ? '🗑️' : '✅';
        },
        tipoBotao() {
            return this.tipo === 'vermelho' ? 'btn-vermelho' : 'btn-verde';
        },
    },
};
</script>

<style scoped>
/* Overlay: cobre 100% da tela com fundo escuro semitransparente */
.modal-overlay {
    position: fixed;
    /* fica sobre tudo, independente do scroll */
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    /* Ficar a frente de todos elementos. */
    animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.modal-caixa {
    background: #242424;
    border: 2px solid #444;
    border-radius: 16px;
    padding: 36px 32px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: subir 0.25s ease;
}

@keyframes subir {
    from {
        opacity: 0;
        transform: translateY(16px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-icone {
    font-size: 40px;
    margin: 0;
}

.modal-titulo {
    font-size: 20px;
    font-weight: bold;
    color: #f0f0f0;
    margin: 0;
}

.modal-mensagem {
    font-size: 14px;
    color: #aaa;
    line-height: 1.5;
    margin: 0;
}

.modal-botoes {
    display: flex;
    gap: 12px;
    margin-top: 8px;
}

.btn-cancelar,
.btn-confirmar {
    flex: 1;
    padding: 12px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    border: 2px solid transparent;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.btn-cancelar {
    background: transparent;
    border-color: #555;
    color: #aaa;
}

.btn-cancelar:hover {
    border-color: #aaa;
    color: #f0f0f0;
}

.btn-verde {
    background: rgb(0, 214, 71);
    color: #fff;
}

.btn-verde:hover {
    background: transparent;
    border-color: rgb(0, 214, 71);
    color: rgb(0, 214, 71);
}

.btn-vermelho {
    background: #e74c3c;
    color: #fff;
}

.btn-vermelho:hover {
    background: transparent;
    border-color: #e74c3c;
    color: #e74c3c;
}
</style>