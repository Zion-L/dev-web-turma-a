# ⚽ Álbum de Figurinhas — Seleções de Futebol (Vue 3 + API-Football)

Álbum de figurinhas interativo das seleções de futebol, construído com **Vue 3** consumindo a **API-Football** (`v3.football.api-sports.io`).

## Como executar

1. Obtenha sua chave gratuita em [api-football.com](https://www.api-football.com/) (Dashboard → credenciais).
2. Abra `index.html` no navegador (duplo clique — não precisa de build/servidor).
3. Cole sua chave no campo **"Chave da API"** (ou edite a constante `API_KEY` no código).
4. Selecione um país no dropdown — o elenco aparece automaticamente.

## Fluxo de dados (3 etapas encadeadas)

1. **Carregar Países** — no `mounted()`, consome `GET /teams/countries` e preenche o dropdown.
2. **Descobrir ID** — no `@change` do dropdown, consome `GET /teams?name={pais}` para obter o ID numérico da seleção.
3. **Obter Figurinhas** — usa esse ID em `GET /players/squads?team={id}` para listar os jogadores.

As etapas 2 e 3 estão encadeadas com `async/await` no método `carregarFigurinhas()`.

## Como os critérios foram atendidos

| Critério | Implementação |
|----------|---------------|
| **Dropdown dinâmico** | `<select>` preenchido por `v-for` a partir da API, carregado no `mounted` |
| **Encadeamento lógico** | `@change` → busca ID por nome → busca plantel pelo ID (sequencial, `async/await`) |
| **Apresentação responsiva** | Cards em **CSS Grid** (`auto-fill`/`minmax`) com foto, nome e posição |

## Autenticação

O token é injetado no cabeçalho `x-apisports-key` em todas as requisições.

## ⚠️ Limite de requisições

O plano gratuito permite **50 requisições por dia**. Para prototipar sem estourar a cota, vale salvar respostas em arquivos JSON locais e consumi-los durante o desenvolvimento do front-end.

## Detalhes extras

- 🔍 **Busca por nome** — filtra os jogadores em tempo real (computed property).
- 📋 **Agrupar por posição** — alterna entre lista única e seções (Goleiros, Defensores, Meio-campistas, Atacantes).
- 🔢 **Contador de figurinhas** — mostra quantos jogadores estão visíveis / total.
- Posições traduzidas para português (Goleiro, Defensor, Meio-campista, Atacante).
- Tratamento de erros, estados de carregamento e de lista vazia.
- Imagem de reserva (`@error`) caso a foto oficial do jogador falhe ao carregar.
