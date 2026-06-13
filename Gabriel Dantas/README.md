# ⚽ Álbum de Figurinhas — Vue 3

Álbum de figurinhas interativo das seleções de futebol, consumindo a API-Football.

## ✅ Requisitos atendidos

| Critério | Implementação |
|---|---|
| Dropdown dinâmico | `onMounted` → `GET /teams/countries` → `<select>` com v-model |
| Encadeamento de requisições | `@change` → `GET /teams?name=` → captura `team.id` → `GET /players/squads?team=` |
| Async/Await | Funções `carregarPaises()` e `carregarFigurinhas()` com try/catch/finally |
| CSS Grid responsivo | `grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))` |
| Cards com foto, nome e posição | Componente `PlayerCard.vue` isolado |
| Vue 3 + Composition API | `ref`, `computed`, `onMounted`, `<script setup>` |
| Componentização | `PlayerCard.vue` separado em `src/components/` |

## 📁 Estrutura

```
album-figurinhas/
├── .env                    # VITE_API_KEY=sua_chave
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.js
    ├── App.vue             # Lógica principal + layout
    └── components/
        └── PlayerCard.vue  # Card individual do jogador
```

## 🚀 Como rodar

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

## 🔑 API Key

Crie um arquivo `.env` na raiz com:

```
VITE_API_KEY=sua_chave_aqui
```

Obtenha sua chave gratuita em: https://dashboard.api-football.com

> ⚠️ O plano gratuito permite 50 requisições/dia.

## 🛠️ Tecnologias

- Vue 3 (Composition API + `<script setup>`)
- Vite 5
- API-Football v3
- CSS Grid + Custom Properties
