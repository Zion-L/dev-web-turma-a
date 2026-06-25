<template>
    <!-- v-if: o alerta só existe no DOM quando há uma mensagem para mostrar -->
    <!-- :class recebe um array: aplica sempre o tipo de cor, e só aplica 'flutuante' se a prop for true -->
    <div v-if="mensagem" class="alerta" :class="[tipo, { flutuante: flutuante }]">
        <span class="alerta-icone">{{ icones[tipo] }}</span>
        <span class="alerta-mensagem">{{ mensagem }}</span>
        <!-- botão X para fechar manualmente -->
        <button class="alerta-fechar" @click="$emit('fechar')">✕</button>
    </div>
</template>

<script>
export default {
    name: 'AlertComponent',

    // Props são os "parâmetros" que o componente recebe de quem o usa.
    // Assim o mesmo componente serve para qualquer situação, só mudando o tipo e a mensagem.
    props: {
        // tipo define a cor: 'sucesso' | 'erro' | 'info' | 'aviso'
        tipo: {
            type: String,
            default: 'info',
        },
        // mensagem é o texto exibido
        mensagem: {
            type: String,
            default: '',
        },
        // flutuante: se true, o alerta fica fixado no centro da tela por cima de tudo
        flutuante: {
            type: Boolean,
            default: false,
        },
    },

    // $emit avisa o componente pai que algo aconteceu.
    // O pai decide o que fazer — aqui ele vai limpar a mensagem.
    emits: ['fechar'],

    data() {
        return {
            // cada tipo tem um emoji de ícone associado
            icones: {
                sucesso: '✅',
                erro:    '❌',
                info:    'ℹ️',
                aviso:   '⚠️',
            },
        };
    },
};
</script>

<style scoped>
.alerta {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    border-radius: 10px;
    border-left: 5px solid;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 500;
    animation: entrar 0.3s ease;
}

/* Animação de entrada — o alerta desliza levemente de cima */
@keyframes entrar {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
}

/* ── Variações de cor por tipo ── */
.sucesso {
    background: rgba(0, 214, 71, 0.12);
    border-color: rgb(0, 214, 71);
    color: rgb(0, 214, 71);
}

.erro {
    background: rgba(231, 76, 60, 0.12);
    border-color: #e74c3c;
    color: #e74c3c;
}

.info {
    background: rgba(52, 152, 219, 0.12);
    border-color: #3498db;
    color: #3498db;
}

.aviso {
    background: rgba(230, 126, 34, 0.12);
    border-color: #e67e22;
    color: #e67e22;
}

.alerta-icone {
    font-size: 18px;
    flex-shrink: 0; /* impede o ícone de encolher em telas pequenas */
}

.alerta-mensagem {
    flex: 1; /* ocupa o espaço restante, empurrando o X para a direita */
    text-align: left;
}

.alerta-fechar {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: inherit; /* herda a cor do tipo (verde, vermelho, etc.) */
    padding: 0 4px;
    opacity: 0.7;
    transition: opacity 0.2s;
}

.alerta-fechar:hover {
    opacity: 1;
}

/* Quando flutuante=true, o alerta sai do fluxo da página e fica centralizado na tela */
.flutuante {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2000;
    min-width: 400px;
    max-width: 540px;
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.7);
    font-size: 18px;
    padding: 24px 28px;
    border-left-width: 8px;  /* borda lateral mais grossa */
}

/* Quando flutuante, o ícone e o texto ficam maiores */
.flutuante .alerta-icone {
    font-size: 32px;
}

.flutuante .alerta-mensagem {
    font-size: 17px;
    font-weight: 600;
}
</style>