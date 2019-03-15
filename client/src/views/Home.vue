<template>
  <div>
    <!-- <HelloWorld/> -->
    <button @click="test()">Click me</button>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import NavBar from "../components/NavBar";

export default {
  methods: {
    test: function() {
      console.log("this is a test")
    }
  },
  components: {
    HelloWorld,
    NavBar
  }
};
</script>
