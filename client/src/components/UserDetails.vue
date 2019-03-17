<template>
  <v-dialog v-model="dialog" width="500">
    <!-- <template v-slot:activator="{ on }">
      <v-btn color="red lighten-2" dark v-on="on">Click Me</v-btn>
    </template>-->
    <v-card>
      <v-card-title
        class="headline lighten-2"
        primary-title
      >{{ user.first_name + " " + user.last_name }}</v-card-title>
      <v-card-text>
        <div>
          <h3>Area</h3>
          <span>{{ user.user_city + ", " + user.user_country }}</span>
          <h3>Joined</h3>
          <span>{{ user.join_date }}</span>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="followUser" :disabled="isFollowing">Follow user</v-btn>
        <v-btn color="primary" flat @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import Axios from "axios";

export default {
  data: function() {
    return {
      isFollowing: false
    };
  },
  props: ["user", "dialog"],
  methods: {
    getUsers: function() {},
    followUser: function() {
      Axios.post("/api/query", {
        query: `INSERT INTO follows_user (follower_uid, followee_uid) VALUES (${
          this.$route.params.id
        }, ${this.user.user_id})`
      }).then(result => {
        console.log(result);
        this.isFollowing = true;
      });
    }
  }
};
</script>

<style>
</style>
