<template>
  <v-toolbar>
    <v-btn flat icon color="pink" @click="home">
      <v-icon>home</v-icon>
    </v-btn>
    <v-toolbar-title>Connexus</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat @click="feed()">Network</v-btn>
      <v-btn flat @click="users()">Users</v-btn>
      <v-btn flat @click="organizations()">Organizations</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    feed: function() {
      this.$router.push({name: 'feed', params: { id: this.$route.params.id}});
    },
    users: function() {
      this.$router.push({name: 'users', params: { id: this.$route.params.id}});
    },
    organizations: function() {
      this.$router.push({name: 'organizations', params: { id: this.$route.params.id}});

    },
    home: function() {
      this.$router.push({name: 'profile', params: { id: this.$route.params.id}});

    }
  }
};
</script>
