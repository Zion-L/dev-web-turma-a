<template>
  <div class="home-wrapper">

    <section class="hero">
      <div class="hero-texto">
        <h1 class="hero-titulo">Bem-vindo ao <span class="destaque">Cafézinho Selocura</span></h1>
        <p class="hero-subtitulo">
          O melhor café da região, feito com amor e muito estilo. Escolha o seu favorito e peça agora!
        </p>
        <button class="btn-hero" @click="$router.push('/menu')">Ver o Menu</button>
      </div>
      <div class="hero-imagem">
        <img src="https://images.pexels.com/photos/35710835/pexels-photo-35710835.jpeg" alt="Café especial" />
      </div>
    </section>

    <section class="diferenciais">
      <div class="card-diferencial">
        <span class="icone">☕</span>
        <h3>Cafés Especiais</h3>
        <p>Grãos selecionados com sabores únicos pra você se apaixonar.</p>
      </div>
      <div class="card-diferencial">
        <span class="icone">⚡</span>
        <h3>Pedido Rápido</h3>
        <p>Monte o seu pedido em segundos, do jeito que você preferir.</p>
      </div>
      <div class="card-diferencial">
        <span class="icone">🎯</span>
        <h3>Do Seu Jeito</h3>
        <p>Escolha o tamanho, os complementos e as bebidas que quiser.</p>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home-wrapper {
  padding: 40px 48px;
  color: #f0f0f0;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 64px;
}

.hero-texto {
  flex: 1;
  text-align: left;
}

.hero-titulo {
  font-size: 42px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 16px;
  color: #f0f0f0;
}

.destaque {
  color: rgb(0, 214, 71);
}

.hero-subtitulo {
  font-size: 18px;
  color: #aaa;
  line-height: 1.6;
  margin-bottom: 32px;
  max-width: 480px;
}

.btn-hero {
  padding: 14px 36px;
  background-color: rgb(0, 214, 71);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.btn-hero:hover {
  background-color: transparent;
  color: rgb(0, 214, 71);
  border-color: rgb(0, 214, 71);
}

.hero-imagem {
  flex: 1;
  max-width: 420px;
  border-radius: 20px;
  overflow: hidden; 
  border: 3px solid rgb(0, 214, 71);
  box-shadow: 0 8px 32px rgba(0, 214, 71, 0.2);
}

.hero-imagem img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  object-position: center;
  display: block;
}

.diferenciais {
  display: flex;
  gap: 24px;
  justify-content: center;
}

.card-diferencial {
  flex: 1;
  max-width: 280px;
  background: #242424; 
  border: 2px solid rgb(0, 214, 71);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-diferencial:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 214, 71, 0.15);
}

.icone {
  font-size: 40px;
  display: block;
  margin-bottom: 12px;
}

.card-diferencial h3 {
  font-size: 18px;
  font-weight: bold;
  color: rgb(0, 214, 71);
  margin-bottom: 8px;
}

.card-diferencial p {
  font-size: 14px;
  color: #aaa;
  line-height: 1.5;
}
</style>
