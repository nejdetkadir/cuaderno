import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

// pages
import Main from '@/views/Main'
import Auth from "@/views/Auth";
import Details from "@/views/Details";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next("/auth");
      }
    }
  },
  {
    path: '/details',
    name: 'Details',
    component: Details,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next("/auth");
      }
    }
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
