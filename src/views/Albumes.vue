<template>
  <div>
    {{ texto }}
    <input type="text" v-model="token" size="70"><button v-on:click="getRest()">buscar</button>
    <br><br>
    <label for="">Buscar</label>
    <input type="search" v-model="item">
    <div id="albumes">
      <ol>
        <li v-for="(dato, key, value) in datos">
          <p>{{ dato.id }} </p>
          <p>Cantante: {{ dato.artists[0].name }} </p>
          <p>Nombre de la canción: {{ dato.name }} </p>
          <p>Duración: {{ secondsToTime(dato.duration_ms) }}</p>
          <a :href="dato.preview_url" target="_blank">Escuchar online</a>                     
        </li>
      </ol>
    </div>    

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
  name: 'albumes',
  mounted(){  
    //this.getRest();
  },
  data () {
    return {
      texto: 'Token',
      spotify: null,
      datos: {},
      item: null,
      showModal: false,
      header: 'Titulo del Abum',
      body: 'Cuerpo del Album',
      footer: 'Footer del Album',
      token: null,
    }
  },
  methods: {
    secondsToTime: function (s) {

      function addZ(n) {
        return (n<10? '0':'') + n;
      }

      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hrs = (s - mins) / 60;

      //return addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs)+ '.' + addZ(ms);
      return addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs);

    },
    getRest(){
      axios.get(
      'https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        }
      ).then((res) => {        
        console.log(res.data.tracks);
        this.datos = res.data.tracks;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  computed : {

  }
}
</script>

<style lang="scss">
  .modal-header h3 {
    margin-top: 0;
    color: blue;
  } 
</style>