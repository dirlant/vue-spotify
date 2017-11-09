<template>
  <div>
    {{ texto }}
    <br><br>  
    
    <span v-if="datos == null">
      <label for="">Token</label>
      <input type="text" v-model="token" size="70" ><button v-on:click="getRest()">buscar</button>
    </span>
    <br><br>
    <div v-if="datos != null">
      <b-col cols="4" align-self="center" offset-md="4">
      <b-form-input v-model="item"                  
        type="search"
        placeholder="Buscar">
        
      </b-form-input>
    </b-col>
      

      <b-container class="bv-example-row">
        <b-row>                            
          <b-col cols="3" class="clearfix" v-for="datos in filteredItems">
            <b-card title="Artista">
              <p class="card-text">
                {{ datos.artists[0].name }}
              </p>
              <b-btn id="v-b-modal" v-on:click="showModal(datos)" variant="primary">Detalles </b-btn>
            </b-card>          
          </b-col>
        </b-row>
      </b-container>
    </div>
   

    
    <!-- use the modal component, pass in the prop -->
    <modal v-if="show_modal" v-on:close="show_modal = false">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h5 slot="header">Artista: {{ artista }}</h5>
      <p slot="body">         
          <slot name="body">            
            <b-col align-self="center">Canción</b-col>
            <b-alert show>              
              {{ cancion }}              
            </b-alert>  
            <b-col align-self="center">Duración</b-col>
            <b-badge>
            {{ duracion }} 
            </b-badge> 
          </slot>           
      </p>

      <h5 slot="footer">
        <a :href="preview" target="_blank">Escuchar online</a> 
      </h5>
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
      texto: 'Albumes',
      spotify: null,
      datos: null,
      item: '', 
      show_modal: false,     
      header: 'Titulo del Abum',
      body: 'Cuerpo del Album',
      artista: null,
      cancion: null,
      duracion: null,
      preview: null, 
      footer: 'Footer del Album',
      token: 'BQDgJkNHBs9nbsuBRs9uG3S57lRwTwhKHoi-c3kU5yjWFupePXFKaOxlKB4nS6x0Yl5CXuUPlRuuU3AwS2b8g73t6aDtKX6Rc5AGDwgFB9nnXpnIv1PMY5R_fNYSOF3ifUmD2mpuTiWUKeRJT7PTAfRRmAGNJti6Gu_lpwQAhYLMLFgZncI&refresh_token=AQCE70SCAFMQHFLvx7K8qxjEZCCiJLZvtizdmkITlr3W2ZVbU3V-OQ-TEYm_8kMtCNCKrSedrjnOLJ82rl6BZJwegfrQRBsr5dADtFnq5UM-yJQFl8u7qjFU9_-rxwG9OtI',
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
      //'https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE', {
      'https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50&market=US', {
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

    },
    showModal(req){
      this.show_modal = true;
      this.artista = req.artists[0].name;
      this.cancion = req.name;
      this.duracion = this.secondsToTime(req.duration_ms);
      this.preview = req.preview_url;
    },    
  },
  computed : {
    filteredItems: function () {
      return this.datos.filter((dato) => {
         return dato.artists[0].name.includes(this.item);
      })
    }
  }
}
</script>

<style lang="scss"> 
  .clearfix{
    margin: 15px 0px;
  }
</style>