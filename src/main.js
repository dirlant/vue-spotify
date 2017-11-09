import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter);

import App from './App.vue'

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Albumes from './views/Albumes.vue'




const routes = [  
  //{path: '/albumes' , component: Albumes},
  {path: '/login', name: 'login' , component: Login},
  {path: '/albumes', name: 'albumes' , component: Albumes},
];

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.component('login', Login);

Vue.component('modal', {
  template: `
		<transition name="modal">
		  <div class="modal-mask">
	      <div class="modal-wrapper">
	        <div class="modal-container">

	          <div class="modal-header">	          	
	            <slot name="header">
	              default header
	            </slot>	            
	          </div>

	          <div class="modal-body">
	            <slot name="body">
	              default body
	            </slot>
	          </div>

	          <div class="modal-footer">
	            <slot name="footer">
	              default footer	              
	            </slot>
	            <b-btn v-on:click="$emit('close')">
	              Cerrar
	            </b-btn>         
	          </div>
	          
	        </div>
	      </div>
	    </div>
	  </transition>
  `,
})


new Vue({
  el: '#app',
  router,  
  render: h => h(App)
})
