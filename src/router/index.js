import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Main'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "goods" */ '@/views/Home')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import(/* webpackChunkName: "goods" */ '@/views/Goods')
      },
      {
        path: '/product',
        name: 'product',
        component: () => import(/* webpackChunkName: "goods" */ '@/views/Product')
      },
      {
        path: '/category',
        name: 'category',
        component: () => import(/* webpackChunkName: "goods" */ '@/views/Category')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
