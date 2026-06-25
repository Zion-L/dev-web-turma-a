<template>
    <div class="menu-wrapper">

        <!-- Alerta informativo enquanto os cafés carregam -->
        <alert-component tipo="info" :mensagem="alertaCarregando" :flutuante="true" @fechar="alertaCarregando = ''" />

        <h1 class="menu-titulo">Menu</h1>
        <div class="scroll-container" ref="scrollContainer">
            <div class="cafe-card" v-for="cafe in listaMenuCafe" :key="cafe.id">
                <div class="cafe-imagem-wrapper">
                    <img :src="cafe.foto" :alt="cafe.nome" class="cafe-imagem" />
                    <span v-if="cafe.eh_novidade" class="badge-novidade">Novidade</span>
                </div>
                <div class="cafe-info">
                    <p class="cafe-nome">{{ cafe.nome }}</p>
                    <p class="cafe-preco">R$ {{ cafe.valor }},00</p>
                    <p class="cafe-descricao">{{ cafe.descricao }}</p>
                    <button class="btn-selecionar" @click="selecionarCafe(cafe)">Selecionar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AlertComponent from '@/components/AlertComponent.vue';

export default {
    name: 'MenuView',
    components: { AlertComponent },
    data() {
        return {
            listaMenuCafe: [],
            alertaCarregando: 'Opções carregando, aguarde um momento...',
        }
    },
    methods: {
        async consultarMenu() {
            const response = await fetch(`${this.$apiUrl}/menu`);
            const dados = await response.json();
            this.listaMenuCafe = dados.cafe;
            // Carregou — limpa o alerta informativo
            this.alertaCarregando = '';
        },
        selecionarCafe(cafeSelecionado) {
            const param = JSON.stringify(cafeSelecionado);
            const cafeJson = encodeURIComponent(param);
            this.$router.push({ path: '/config', query: { cafe: cafeJson } });
        },
    },
    mounted() {
        this.consultarMenu();
    }
}
</script>

<style scoped>
.menu-wrapper {
    padding: 0 24px 40px;
}

.menu-titulo {
    font-size: 28px;
    font-weight: bold;
    margin: 32px 0 24px;
    color: #f0f0f0;
}

/* Scroll suave com GPU — elimina o lag */
.scroll-container {
    display: flex;
    flex-direction: row;
    gap: 20px;
    overflow-x: auto;
    padding: 12px 4px 20px;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    /* scroll inercial no iOS */
    will-change: scroll-position;
    /* avisa o browser pra preparar a GPU */
    scrollbar-width: auto;
    scrollbar-color: rgb(0, 214, 71) #e0e0e0;
}

.scroll-container::-webkit-scrollbar {
    height: 10px;
}

.scroll-container::-webkit-scrollbar-track {
    background: #e0e0e0;
    border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-thumb {
    background: rgb(0, 214, 71);
    border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
    background: rgb(0, 160, 67);
}

/* Card */
.cafe-card {
    flex: 0 0 260px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border: 2px solid rgb(0, 214, 71);
    background: #fff;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.cafe-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
    border-color: rgb(0, 160, 67);
}

/* Imagem centralizada e bem enquadrada */
.cafe-imagem-wrapper {
    position: relative;
    width: 100%;
    height: 280px;
    overflow: hidden;
    background: #f5f5f5;
}

.cafe-imagem {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* mostra a imagem inteira sem cortar */
    object-position: center;
    display: block;
    transition: transform 0.4s ease;
    padding: 8px;
    /* pequeno respiro nas bordas */
    box-sizing: border-box;
}

.cafe-card:hover .cafe-imagem {
    transform: scale(1.04);
}

.badge-novidade {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgb(0, 214, 71);
    color: #fff;
    font-size: 11px;
    font-weight: bold;
    padding: 4px 10px;
    border-radius: 20px;
    letter-spacing: 0.5px;
}

/* Conteúdo do card */
.cafe-info {
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.cafe-nome {
    font-size: 18px;
    font-weight: bold;
    color: #222;
    margin: 0 0 6px;
}

.cafe-preco {
    font-size: 20px;
    font-weight: bold;
    color: rgb(0, 160, 67);
    margin: 0 0 10px;
}

.cafe-descricao {
    font-size: 13px;
    color: #777;
    line-height: 1.5;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    flex: 1;
    margin: 0 0 16px;
}

.btn-selecionar {
    width: 100%;
    padding: 12px;
    background-color: rgb(0, 214, 71);
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    border: 2px solid transparent;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.btn-selecionar:hover {
    background-color: transparent;
    color: rgb(0, 160, 67);
    border-color: rgb(0, 160, 67);
}
</style>