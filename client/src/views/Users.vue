<template>
  <div>
    <h1>Users</h1>
    <button @click="getUsers()">test</button>
    <v-list>
      <template v-for="user in users">
        <v-list-tile @click="openUserDetails" avatar :key="user.user_id">
          <v-list-tile-avatar>
            <v-icon>account_circle</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-text="user.first_name + ' ' + user.last_name"></v-list-tile-title>
            <v-list-tile-sub-title>{{user.user_country}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data: function() {
    return {
      users: []
    };
  },
  methods: {
    getUsers: function() {
      Axios.post("/api/query", {
        query: "SELECT * FROM USER"
      }).then(result => {
        console.log(result);
        this.users = result.data;
      });
    },
    openUserDetails: function() {}
  }
};
</script>
