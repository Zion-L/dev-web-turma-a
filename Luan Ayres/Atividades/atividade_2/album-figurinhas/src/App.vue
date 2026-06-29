<script setup>
import { ref, onMounted } from 'vue'

const listaPaises = ref([])
const paisSelecionado = ref('')
const jogadores = ref([])
const carregando = ref(false)

// Token da sua conta da API-Football
const token = '47581802efd32492a11f4f38c287914a'

// PASSO 1: Carregar a lista de países
const carregarPaises = async () => {
  try {
    const response = await fetch('https://v3.football.api-sports.io/teams/countries', {
      method: 'GET',
      headers: {
        'x-apisports-key': token
      }
    });
    const dados = await response.json();
    listaPaises.value = dados.response; 
  } catch (erro) {
    console.error('Falha ao obter lista de países:', erro);
  }
};

// PASSO 2 e 3: Descobrir o ID da seleção e buscar os jogadores
const carregarFigurinhas = async () => {
  if (!paisSelecionado.value) return;
  
  carregando.value = true;
  jogadores.value = [];

  try {
    // Busca a Seleção pelo NOME (isso garante que venha o time principal com fotos)
    const responseTime = await fetch(`https://v3.football.api-sports.io/teams?name=${paisSelecionado.value}`, {
      method: 'GET',
      headers: {
        'x-apisports-key': token
      }
    });
    const dadosTime = await responseTime.json();
    
    if (dadosTime.response.length === 0) {
      alert("Seleção não encontrada!");
      carregando.value = false;
      return;
    }

    const teamId = dadosTime.response[0].team.id;

    // Busca o elenco usando o ID do time
    const responseElenco = await fetch(`https://v3.football.api-sports.io/players/squads?team=${teamId}`, {
      method: 'GET',
      headers: {
        'x-apisports-key': token
      }
    });
    const dadosElenco = await responseElenco.json();
    
    if (dadosElenco.response.length > 0) {
      jogadores.value = dadosElenco.response[0].players;
    } else {
      alert("Nenhum jogador encontrado para esta seleção.");
    }

  } catch (erro) {
    console.error('Erro ao processar fluxo assíncrono:', erro);
  } finally {
    carregando.value = false;
  }
};

// Se a foto oficial falhar, troca pelo avatar cinza
const imagemPadrao = (evento) => {
  evento.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
}

onMounted(() => {
  carregarPaises();
});
</script>

<template>
  <div class="album-container">
    <h1>🏆 Álbum de Figurinhas Virtual</h1>
    <p>Selecione um país para ver o time:</p>
    
    <select v-model="paisSelecionado" @change="carregarFigurinhas" class="caixa-selecao">
      <option disabled value="">Escolha um país...</option>
      <option v-for="pais in listaPaises" :key="pais.name" :value="pais.name">
        {{ pais.name }}
      </option>
    </select>

    <p v-if="carregando" class="loading">Abrindo o pacotinho... ⏳</p>
    
    <div v-if="jogadores.length > 0" class="galeria">
      <div v-for="jogador in jogadores" :key="jogador.id" class="card-figurinha">
        <img :src="jogador.photo" :alt="jogador.name" class="foto-jogador" @error="imagemPadrao">
        <div class="info-jogador">
          <h3>{{ jogador.name }}</h3>
          <p><strong>Idade:</strong> {{ jogador.age || 'N/A' }} anos</p>
          <p><strong>Número:</strong> {{ jogador.number || '—' }}</p>
          <span class="posicao">{{ jogador.position }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.album-container {
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 40px;
  background-color: #f4f6f9;
  min-height: 100vh;
  color: #2c3e50;
}

.caixa-selecao {
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: 2px solid #27ae60;
  cursor: pointer;
  margin-bottom: 30px;
  background-color: white;
}

.loading {
  font-size: 18px;
  color: #27ae60;
  font-weight: bold;
}

.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
}

.card-figurinha {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s;
  border: 3px solid #f1c40f;
}

.card-figurinha:hover {
  transform: scale(1.03);
}

.foto-jogador {
  width: 100%;
  height: 210px;
  object-fit: cover;
  /* Fundo de segurança caso a imagem fique transparente */
  background-color: #e9ecef;
  background-image: url('https://cdn-icons-png.flaticon.com/512/149/149071.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.info-jogador {
  padding: 15px;
  text-align: left;
}

.info-jogador h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-jogador p {
  margin: 4px 0;
  font-size: 13px;
  color: #555;
}

.posicao {
  display: inline-block;
  margin-top: 10px;
  padding: 4px 12px;
  background-color: #27ae60;
  color: white;
  border-radius: 50px;
  font-size: 11px;
  font-weight: bold;
}
</style>