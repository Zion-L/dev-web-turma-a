import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '@/views/MenuView.vue'
import ConfiguracaoPedidoView from '@/views/ConfiguracaoPedidoView.vue'
import PedidosView from '@/views/PedidosView.vue'
const routes = [
  {
    path: '/',
    name: 'menu',
    component: MenuView
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView
  },
  {
    path: '/config',
    name: 'config',
    component: ConfiguracaoPedidoView
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: PedidosView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
