import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Albumes from './views/Albumes.vue'


Vue.use(VueRouter);

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
	          	<button class="modal-default-button" v-on:click="$emit('close')">
	              X
	            </button>
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
