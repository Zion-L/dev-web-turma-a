<script>
import { carregarPaises, descobrirIdDoTime, carregarElenco } from './services/api'

export default {
  data() {
    return {
      paises: [],
      paisSelecionado: '',
      jogadores: [],
      carregandoElenco: false,
      erro: null
    }
  },
  
  async mounted() {
    try {
      this.paises = await carregarPaises()
    } catch (e) {
      this.erro = `Erro ao carregar países: ${e.message}`
    }
  },
  methods: {
    async abrirAlbum() {
      if (!this.paisSelecionado) return
      this.erro = null
      this.jogadores = []
      this.carregandoElenco = true
      try {
        const teamId = await descobrirIdDoTime(this.paisSelecionado) 
        this.jogadores = await carregarElenco(teamId)                
      } catch (e) {
        this.erro = e.message
      } finally {
        this.carregandoElenco = false
      }
    },
    onErroFoto(evento) {
      evento.target.onerror = null
      evento.target.src =
        'data:image/svg+xml;utf8,' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90">' +
        '<rect width="90" height="90" rx="45" fill="%231a4d2e"/>' +
        '<circle cx="45" cy="36" r="16" fill="%23ffffff"/>' +
        '<ellipse cx="45" cy="78" rx="24" ry="18" fill="%23ffffff"/>' +
        '</svg>'
    }
  }
}
</script>
<template>
  <div class="app">
    <h1> Álbum Da Copa 2026 </h1>

    <select v-model="paisSelecionado" @change="abrirAlbum" class="dropdown">
      <option value="">Selecione um país</option>
      <option v-for="pais in paises" :key="pais.name" :value="pais.name">
        {{ pais.name }}
      </option>
    </select>

    <p v-if="carregandoElenco">Abrindo o álbum...</p>
    <p v-if="erro" class="erro">{{ erro }}</p>

    <div class="album">
    <div v-for="jogador in jogadores" :key="jogador.id" class="figurinha">
    <span class="numero">{{ jogador.number || '–' }}</span>
    <img
      :src="jogador.photo"
      :alt="jogador.name"
      class="foto"
      @error="onErroFoto"
    />
    <strong>{{ jogador.name }}</strong>
    <small>{{ jogador.position }}</small>
   </div>
 </div>
</div>
</template>

<style scoped>
.app {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
  font-family: system-ui, sans-serif;
}
.dropdown {
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
}
.erro { color: #c00; }
.album {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}
.figurinha {
  position: relative;
  border: 2px solid #ddd;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.figurinha img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
}
.numero {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #1a4d2e;
  color: #fff;
  font-weight: bold;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  line-height: 28px;
}

</style>