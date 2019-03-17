<template>
  <v-app>
    <nav-bar/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
import Home from './views/Home'
import Axios from 'axios';

export default {
  name: 'App',
  methods: {
    test: function() {
      console.log("this is a test");
      Axios.post('/api/query', {"query": "SELECT * FROM USER"}).then(res => console.log(res));
    }
  },
  components: {
    NavBar,
    Home
  },
  data () {
    return {
      
    }
  }
}
</script>
