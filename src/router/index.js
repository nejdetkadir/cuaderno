import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Auth from "@/views/Auth";
import Details from "@/views/Details";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/details',
    name: 'Details',
    component: Details
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
