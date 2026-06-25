# ☕ Cafézinho Selocura

Sistema de  cafeteria , feita com **Vue 3** e **JSON Server**. O usuário pode navegar pelo menu de cafés, montar o próprio pedido com complementos e bebidas, acompanhar todos os pedidos realizados e gerenciar os status de cada um.


# Nome e RA do estudante:

Nome: Felipe Gabriel do Nascimento Rodrigues
RA : 22509850

---

## 🌐 Links

| | |
|---|---|
| 🔗 **Link de Produção** | [https://dev-web-turma-a-five.vercel.app/] |
| 📦 **Repositório** | [https://github.com/Kyon-S2/dev-web-turma-a/tree/main/Felipe%20Gabriel%20do%20N.%20Rodrigues/Projeto%20Final/tburguer] |
| 🗄️ **API (JSON Server)** | [https://api-cafeselocura.onrender.com] |

---

## 🖥️ Visão Geral

- **Novo segmento:** De uma hamburgueria para uma cafeteria simples, com um tema mais escuro para não deixar ninguém cego com tanta claridade.
- **Página Home:** criação de uma página introdutória para diferenciar o home (`\`) do menu de opções (`\menu`).  
- **Cards do menu redesenhados:** scroll horizontal mais suave e com destaque para facilitar visão.
- **Formulário de pedido reformulado:** Tema mais escuro, opcionais como cards clicáveis, resumo do pedido, e validação obrigatória de nome e tamanho do café, além da mensagem de erro caso isso não seja cumprido.
- **Banco de dados corrigido:** campos `burguer` e `ponto` renomeados para `cafe` e `tamanhoCafe`, e `cafes` para `cafe` no menu, alinhando os dados com os componentes Vue

---

## 🚨 Solução Técnica dos Alertas

O sistema conta com dois componentes reutilizáveis para feedback visual, construídos em Vue 3:

### `AlertComponent.vue`

Exibe mensagens semânticas em 4 tipos, cada um com cor e ícone próprios:

| Tipo | Cor | Ícone | Quando usar |
|---|---|---|---|
| `sucesso` | Verde | ✅ | Pedido confirmado, exclusão realizada |
| `erro` | Vermelho | ❌ | Campos obrigatórios não preenchidos, falha na requisição |
| `info` | Azul | ℹ️ | Opções carregando, avisos informativos |
| `aviso` | Laranja | ⚠️ | Alertas importantes | Não foi utilizado, mas está lá para caso precise.

O componente recebe duas **props**: `tipo` e `mensagem`. Quando a mensagem está vazia, o `v-if` remove o alerta do DOM automaticamente. Ao clicar no botão ✕, o componente emite o evento `@fechar` para o pai, que limpa a mensagem.

A prop `flutuante` (booleana) posiciona o alerta no **centro da tela** para garantir uma melhor visibilidade.

```vue
<!-- Exemplo de uso — alerta de erro centralizado na tela -->
<alert-component
    tipo="erro"
    :mensagem="alerta.erro"
    :flutuante="true"
    @fechar="alerta.erro = ''"
/>
```

Os alertas com `flutuante=true` somem automaticamente após **4 segundos** via `setTimeout`, ou manualmente pelo botão ✕.

### `ModalConfirmComponent.vue`

Modal de confirmação reutilizável, utilizado em dois contextos:

- **Confirmar pedido** — modal verde, acionado após validação dos campos obrigatórios
- **Excluir pedido** — modal vermelho, acionado ao clicar na lixeira na tela de pedidos

O componente recebe props de `titulo`, `mensagem`, `textoBotao` e `tipo` (verde/vermelho), e emite os eventos `@confirmar` e `@cancelar`. Clicar fora da caixa do modal (no overlay) também o fecha via `@click.self`.

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── AlertComponent.vue        # Alertas semânticos reutilizáveis
│   ├── ModalConfirmComponent.vue # Modal de confirmação reutilizável
│   ├── BannerComponent.vue       # Banner principal
│   ├── NavBarComponent.vue       # Barra de navegação com logo
│   ├── ListaPedidoComponent.vue  # Tabela de pedidos com ações
│   └── PedidoComponent.vue       # Formulário de montagem do pedido
├── views/
│   ├── HomeView.vue              # Página introdutória
│   ├── MenuView.vue              # Cardápio de cafés
│   ├── ConfiguracaoPedidoView.vue# Tela de configuração do pedido
│   └── PedidosView.vue           # Tela de acompanhamento de pedidos
├── router/
│   └── index.js                  # Rotas da aplicação
└── main.js                       # Configuração global ($apiUrl)
```