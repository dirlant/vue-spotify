<template>
  <div id="app">
    <router-link to="/">
      <img src="./assets/logo.png" width="40">
      
    </router-link>
    <h1>{{ msg }}</h1>
    <ul>
      <!--
      <li><router-link to="/albumes">Abumes</router-link></li>        
      <li><router-link to="/login">Abumes</router-link></li>
      <li><router-link to="/register">Register</router-link></li>
      -->
    </ul>
    
    <router-view></router-view>
  
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Spotify Vue.js App'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
