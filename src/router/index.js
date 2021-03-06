import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

import AuthGuard from './factoryGuard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: AuthGuard.publicRoute
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
      beforeEnter: AuthGuard.publicRoute
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/admin/Dashboard.vue'),
      beforeEnter: AuthGuard.privateRoute
    },
    {
      path: '/admin/logs',
      name: 'logs-page',
      component: () => import('../views/admin/LogsPage.vue'),
      beforeEnter: AuthGuard.privateRoute
    }
  ]
})
