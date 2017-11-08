<template>
  <div>
    {{ texto }}

    <div v-for="(dato, key, value) in datos">
			<p>{{ dato.id }} </p>
			<p>Cantante: {{ dato.artists[0].name }} </p>
			<p>Nombre de la canción: {{ dato.name }} </p>
			<p>Duración: {{ secondsToTime(dato.duration_ms) }}</p>
			<a :href="dato.preview_url" target="_blank">Escuchar online</a>
			
    	
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  name: 'login',
  mounted(){
  	
  	/*
  	spotifyApi.getAlbums(['5U4W9E5WsYb2jUQWePT8Xm', '3KyVcddATClQKIdtaap4bV'])
		  .then(function(data) {
		    console.log('Albums information', data);
		  }, function(err) {
		    console.error(err);
		  });
		*/
		axios.get(
	    'https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE', {
	    		headers: {
		        'Authorization': 'Bearer BQD_gV9wfpxeaqcpANYlHQiXBhSU95FVLYw2X3y30ug_s21c-7-jjD1fkaB5yGX2NwZJnKUpmVEACkNQNcvx6SDzxLodi4TE4Dlav-RKLnkPTaFdyFPLLFaOxoHKYvzRd0Vk66-RekWLme_rDyHj4Jki96ZGJfhTOslLMEAAGYc4Dso3kLI&refresh_token=AQAsZPHHqqpwkfl6rJ4QOkmbu2aZ1Juq4-LWsk5E7Q00IgESTQuipHI1eN-yHs-Vldwc83T0NtDwl87yfCgPOUylcyXbaPGWUp2l2yrHZ5DED31nB8dpivfN9SHwz1NXWxU'
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
  data () {
    return {
      texto: 'Albumes',
      spotify: null,
      datos: { }
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

		}
  },
  computed : {
  	
  }
}
</script>

<style lang="scss">

</style>