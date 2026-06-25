# ☕ Cafezão Do Bom — Sistema de Pedidos Web

Cardápio digital de uma cafeteria, onde o cliente navega entre bebidas quentes,
bebidas geladas e sobremesas, monta seu pedido com tamanho e acompanhamentos, e
acompanha o status na tela de pedidos. O projeto parte da base do sistema
**T-Burguer**, construído ao longo das aulas de Desenvolvimento Web.

- Todo o código está na
  pasta `tburguer/`.

## Aviso importante antes de testar

A API (banco de dados) está hospedada no plano gratuito do **Render**, que coloca
o servidor para "dormir" após 15 minutos sem uso. Por isso, **ao abrir o site pela
primeira vez, os cards do cardápio podem levar até ~50 segundos para carregar** — a
API está reativando. Se as fotos e os itens não aparecerem de imediato, aguarde
alguns segundos e atualize a página (F5). A partir daí, tudo funciona normalmente.

## 🔗 Links

| Recurso                          | URL                                         |
| -------------------------------- | ------------------------------------------- |
| 🌐 Aplicação em produção (Vercel) | https://cafezao-do-bom.vercel.app           |
| 🗄️ API / JSON Server (Render)     | https://api-cafezao.onrender.com            |
| 📁 Repositório do front-end       | https://github.com/La-Ghosta/cafezao-do-bom |
| 📁 Repositório da API             | https://github.com/La-Ghosta/api-cafezao    |

## 📌 Visão Geral

O sistema foi migrado do modelo de hamburgueria (T-Burguer) para uma cafeteria,
mantendo **integralmente** a estrutura, os componentes e os padrões ensinados em
sala (Vue 3 com Options API, Vue Router, consumo de API com `fetch`, `props`,
`$emit`, diretivas e `json-server`). As mudanças se concentraram em conteúdo,
dados, identidade visual e organização das telas.

Principais adaptações:

- **Identidade:** novo nome, banner, paleta de cores (marrom e amarelo) e textos.
- **Categorias:** o menu único foi dividido em três telas — **Bebidas Quentes**,
  **Bebidas Geladas** e **Sobremesas**, cada uma com seus cards.
- **Campos do pedido:** "Ponto da carne" deu lugar a **Tamanho** (Pequeno/Grande,
  apenas nas bebidas quentes); os opcionais viraram **adicionais** (xaropes e
  coberturas) e **acompanhamentos** (pão de queijo, croissant, pamonha).
- **Dados:** o `db.json` foi reescrito com o cardápio da cafeteria.

## 🔔 Validação e Alertas Semânticos

O sistema usa um componente reutilizável `AlertaComponent.vue` com três tipos
semânticos, cuja cor é definida por **classe dinâmica via `v-bind`**
(`:class="['alerta', 'alerta-' + tipo]"`):

- 🔴 **Erro:** campo obrigatório não preenchido (nome do cliente).
- 🟠 **Aviso:** seleção obrigatória não feita (tamanho da bebida).
- 🟢 **Sucesso:** pedido confirmado, excluído ou status atualizado.

A validação ocorre antes do envio (`validarPedido`), bloqueando a requisição se
faltar algum campo. Ao confirmar um pedido, o usuário é redirecionado para a tela
de pedidos, onde a lista é atualizada em tempo real. O botão de confirmação é
desabilitado durante o envio, evitando pedidos duplicados.

## 🛠️ Como Rodar Localmente

```bash
# 1. Entrar na pasta do projeto
cd tburguer

# 2. Instalar as dependências
npm install

# 3. Iniciar a API mock (JSON Server) — em um terminal
npm run bancojson

# 4. Iniciar a aplicação Vue — em outro terminal
npm run serve
```

> Para rodar localmente, o arquivo `.env.development` aponta a aplicação para a
> API local (`http://localhost:3000`). Em produção, o `.env.production` aponta
> para a API publicada no Render.

## 👨‍💻 Autor

Guilherme Holanda — CEUB · Desenvolvimento Web · Turma A
