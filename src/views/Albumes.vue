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
      <label for="">Buscar</label>
      <input type="search" v-model="item">
      <ol>
        <li v-for="datos in filteredItems">
          <p>Cantante: {{ datos.artists[0].name }}</p>
          <button id="show-modal" v-on:click="showModal(datos)">Show Modal</button>
        </li>
      </ol>
    </div>
   

    
    <!-- use the modal component, pass in the prop -->
    <modal v-if="show_modal" v-on:close="show_modal = false">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h3 slot="header">{{ artista }}</h3>
      <p slot="body"> 
        Cancion: {{ cancion }}        
      </p>
      <p>
        <a :href="preview" target="_blank">Escuchar online</a>
      </p>
      <h4 slot="footer">{{ duracion }}</h4>
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
      token: 'BQDMtirPx3oSjo4njKPMl91q4f_EBvpn6mEZ3URrOKt_bjmh4AYeOzIcGOxmPfX0sQJSw3e9b4lPHyyJUMAQodaWAd68EOE0RQIiOPRg34VgVUb2PH31SG_ThMGqQRfV8Zkni1c7Rmc8mBntXdcy5pPInssDVgYLplj4pAs4IH0-1G_7Tjs&refresh_token=AQA3PDAtNtHpTCmpEaOhYGgqK3A8tK1wC7etRGaqwDzTMA_Aj0z3pb9xzbX1WmaM-R8ysjFFiTCyJW1VXSDZSCTYncM5uLEitL-0VIFXarwuy0HlG47Oof0unLSBmsonN9E',
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
  .modal-header h3 {
    margin-top: 0;
    color: blue;
  } 
</style>