<template>
  <v-toolbar>
    <v-btn flat icon to="/home" color="pink">
      <v-icon>home</v-icon>
    </v-btn>
    <v-toolbar-title>Interconnexus</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/home/feed">Your Network</v-btn>
      <v-btn flat to="/home/users">Users</v-btn>
      <v-btn flat to="/home/organizations">Organizations</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {}
};
</script>
