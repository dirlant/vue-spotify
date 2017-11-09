<template>
  <div>
    {{ texto }}
    
    <br><br>		      
    <button id="show-modal" v-on:click="showModal = true">Show Modal</button>
    <!-- use the modal component, pass in the prop -->
    <modal v-if="showModal" v-on:close="showModal = false">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h3 slot="header">{{ header }}</h3>
      <p slot="body"> {{ body }}</p>
      <h4 slot="footer">{{ footer }}</h4>
    </modal>
    <br><br>
		
  </div>
</template>


<script>
import axios from 'axios'

export default {
  name: 'login',
  mounted(){


  },
  data () {
    return {
      texto: 'Login',
      showModal: false,
      header: 'Titulo del Login',
      body: 'Cuerpo del Login',
      footer: 'Footer del Login',
    }
  },
  methods: {

  },
  computed : {
  	
  }
}
</script>

<style lang="scss">
	.modal-header h3 {
	  margin-top: 0;
	  color: yellow;
	}	
</style>