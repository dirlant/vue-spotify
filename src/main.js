import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Albumes from './views/Albumes.vue'

Vue.use(VueRouter);

const routes = [
  {path: '/albumes' , component: Albumes},
  {path: '/' , component: Albumes},
];

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.component('login', Login);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
