import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '@/views/MenuView.vue'
import ConfiguracaoPedidoView from '@/views/ConfiguracaoPedidoView.vue'
import PedidoView from '@/views/PedidoView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: MenuView
  },
  {
    path: "/menu",
    name: "menu",
    component: MenuView
  },
  {
  path: "/Pedidos",
    name: 'Pedidos',
    component: PedidoView
  },
  {
   path: '/config',
    name: 'config',
    component: ConfiguracaoPedidoView 
  }

  
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
