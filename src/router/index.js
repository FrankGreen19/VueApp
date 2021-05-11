import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Article.vue')
  },
  {
    path: '/articletype',
    name: 'ArticleType',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ArticleType.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import(/* webpackChunkName: "about" */ '../views/Article.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import(/* webpackChunkName: "about" */ '../views/Form.vue')
  },
  {
    path: '/forms_view',
    name: 'FormsView',
    component: () => import(/* webpackChunkName: "about" */ '../views/FormsView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
