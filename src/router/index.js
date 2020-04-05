import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/debts',
    name: 'Debts',
    component: () => import(/* webpackChunkName: "about" */ '../views/Debts.vue')
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import(/* webpackChunkName: "about" */ '../views/Events.vue')
  },
  {
    path: '/group/:groupId/events/:eventId',
    name: 'eventPage',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/EventPage.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "about" */ '../views/Account.vue')
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import(/* webpackChunkName: "about" */ '../views/Groups.vue')
  },
  {
    path: '/group/:groupId',
    name: 'groupEvents',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Events.vue')
  },
  {
    path: '/participant',
    name: 'participant',
    component: () => import(/* webpackChunkName: "about" */ '../views/Participant.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
