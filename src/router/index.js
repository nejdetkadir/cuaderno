import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

// pages
import Main from '@/views/Main'
import Auth from "@/views/Auth";
import Details from "@/views/Details";
import Today from "@/views/Today";

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
    path: '/details/:id',
    name: 'Details',
    component: Details,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        store.dispatch('queryNotes', {
          id: to.params.id
        });
        next();

      } else {
        next("/auth");
      }
    }
  },
  {
    path: '/today',
    name: 'Today',
    component: Today,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        store.dispatch('queryToday');
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
