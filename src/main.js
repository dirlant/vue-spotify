import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

Vue.use(VueRouter);

const routes = [
  {path: '/login' , component: Login},
  {path: '/register' , component: Register},
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
