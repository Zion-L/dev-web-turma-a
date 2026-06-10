Snippet de código
<template>
  <div class="pagina-figurinhas">

    <div class="cabecalho">
      <h1>Álbum de Figurinhas</h1>
      <p>Selecione um país para ver os jogadores da seleção</p>
    </div>

    <div class="selecao-pais">
      <label for="dropdown-pais">🌍 País:</label>
      <select id="dropdown-pais" v-model="selecaoEscolhida" @change="buscarElenco">
        <option value="">-- Escolha um país --</option>
        <option v-for="item in paisesDisponiveis" :key="item.name" :value="item.name">
          {{ item.name }}
        </option>
      </select>
    </div>

    <div v-if="estaCarregando" class="mensagem-carregando">
      <p>⏳ Buscando jogadores...</p>
    </div>

    <div v-if="erroAtual" class="mensagem-erro">
      <p>{{ erroAtual }}</p>
    </div>

    <div v-if="!estaCarregando && selecaoEscolhida && elenco.length === 0 && !erroAtual" class="mensagem-vazia">
      <p>Nenhum jogador encontrado para este país.</p>
    </div>

    <div v-if="elenco.length > 0" class="grid-figurinhas">
      <div class="figurinha" v-for="atleta in elenco" :key="atleta.id">
        <div class="figurinha-header">
          <span class="posicao">{{ atleta.position }}</span>
        </div>
        <div class="figurinha-foto">
          <img :src="atleta.photo" :alt="atleta.name" @error="imagemAlternativa" />
        </div>
        <div class="figurinha-info">
          <p class="nome-jogador">{{ atleta.name }}</p>
          <p class="numero-jogador">#{{ atleta.number || '?' }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
const CHAVE_API = 'd31b64836034ee4a236746de3dc2f640'

export default {
  name: 'AlbumComponent',

  data() {
    return {
      paisesDisponiveis: [],
      selecaoEscolhida: '',
      elenco: [],
      estaCarregando: false,
      erroAtual: null,
    }
  },

  mounted() {
    this.obterPaises()
  },

  methods: {
    async obterPaises() {
      const opcoesFetch = {
        method: 'GET',
        headers: { 'x-apisports-key': CHAVE_API }
      }

      try {
        const resposta = await fetch('https://v3.football.api-sports.io/teams/countries', opcoesFetch)
        const json = await resposta.json()
        
        this.paisesDisponiveis = json.response
        console.log('Total de países carregados:', this.paisesDisponiveis.length)

      } catch (falha) {
        this.erroAtual = 'Falha de comunicação ao carregar os países.'
        console.error('Erro no obterPaises:', falha)
      }
    },

    async buscarElenco() {
      if (!this.selecaoEscolhida) {
        this.elenco = []
        return
      }

      this.estaCarregando = true
      this.elenco = []
      this.erroAtual = null

      const opcoesFetch = {
        method: 'GET',
        headers: { 'x-apisports-key': CHAVE_API }
      }

      try {
        const reqTime = await fetch(`https://v3.football.api-sports.io/teams?name=${this.selecaoEscolhida}`, opcoesFetch)
        const jsonTime = await reqTime.json()

        if (!jsonTime.response || jsonTime.response.length === 0) {
          this.erroAtual = 'Não foi possível encontrar essa seleção.'
          return
        }

        const idEquipe = jsonTime.response[0].team.id
        console.log('Time localizado com ID:', idEquipe)

        const reqJogadores = await fetch(`https://v3.football.api-sports.io/players/squads?team=${idEquipe}`, opcoesFetch)
        const jsonJogadores = await reqJogadores.json()

        if (!jsonJogadores.response || jsonJogadores.response.length === 0) {
          this.erroAtual = 'Plantel vazio para esta equipe.'
          return
        }

        this.elenco = jsonJogadores.response[0].players
        console.log('Total de atletas encontrados:', this.elenco.length)

      } catch (falha) {
        this.erroAtual = 'Falha ao buscar as figurinhas. O token pode ter expirado.'
        console.error('Erro no buscarElenco:', falha)
      } finally {
        this.estaCarregando = false
      }
    },

    imagemAlternativa(evento) {
      evento.target.src = 'https://media.api-sports.io/football/players/0.png'
    }
  }
}
</script>

<style scoped>
.pagina-figurinhas {
  min-height: 100vh;
  background-color: #f1f5f9;
  padding: 20px;
  font-family: 'Segoe UI', Arial, sans-serif;
}

.cabecalho {
  background-color: #0f172a;
  color: white;
  text-align: center;
  padding: 30px 20px;
  border-radius: 12px;
  margin-bottom: 25px;
}

.cabecalho h1 {
  font-size: 32px;
  margin: 0 0 8px 0;
}

.cabecalho p {
  font-size: 16px;
  margin: 0;
  opacity: 0.85;
}

.selecao-pais {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 25px;
}

.selecao-pais label {
  font-size: 18px;
  font-weight: bold;
  color: #0f172a;
}

.selecao-pais select {
  padding: 10px 16px;
  font-size: 16px;
  border: 2px solid #0f172a;
  border-radius: 8px;
  background-color: white;
  color: #333;
  cursor: pointer;
  min-width: 220px;
}

.selecao-pais select:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 6px rgba(14, 165, 233, 0.4);
}

.mensagem-carregando,
.mensagem-erro,
.mensagem-vazia {
  text-align: center;
  font-size: 18px;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.mensagem-carregando {
  background-color: #e0f2fe;
  color: #0369a1;
}

.mensagem-erro {
  background-color: #fdecea;
  color: #c0392b;
}

.mensagem-vazia {
  background-color: #fff3cd;
  color: #856404;
}

.grid-figurinhas {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  padding: 10px 0;
}

.figurinha {
  background-color: white;
  border: 3px solid #0f172a;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s;
}

.figurinha:hover {
  transform: scale(1.05);
}

.figurinha-header {
  background-color: #0f172a;
  padding: 6px;
  text-align: center;
}

.posicao {
  color: white;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.figurinha-foto {
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 130px;
}

.figurinha-foto img {
  width: 100px;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
}

.figurinha-info {
  padding: 10px 8px;
  text-align: center;
  background-color: white;
}

.nome-jogador {
  font-size: 13px;
  font-weight: bold;
  color: #0f172a;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.numero-jogador {
  font-size: 12px;
  color: #64748b;
  margin: 0;
}
</style>