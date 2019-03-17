<template>
  <div class="home">
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";

export default {
  methods: {
    test: function() {
      console.log("this is a test")
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped>
.home {
  padding: 2rem;
}
</style>

