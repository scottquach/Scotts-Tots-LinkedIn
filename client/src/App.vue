<template>
  <v-app>
    <nav-bar/>
    <button @click="test()">Test</button>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import NavBar from './components/NavBar'
import Axios from 'axios';

export default {
  name: 'App',
  methods: {
    test: function() {
      console.log("this is a test");
      Axios.post('/api/query', {}).then(res => console.log(res));
    }
  },
  components: {
    NavBar,
    HelloWorld
  },
  data () {
    return {
      
    }
  }
}
</script>
