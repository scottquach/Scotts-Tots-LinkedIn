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
          <v-subheader v-if="Object.keys(job).length > 0">Job</v-subheader>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title v-html="job.job_title"></v-list-tile-title>
              <v-list-tile-sub-title>{{ job.job_desc }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="followUser" :disabled="isFollowing">Follow user</v-btn>
        <v-btn color="primary" flat @click="$emit('close'); isFollowing = false;">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import Axios from "axios";

export default {
  data: function() {
    return {
      isFollowing: false,
      job: {}
    };
  },
  props: ["user", "dialog"],
  methods: {
    getUsers: function() {},
    followUser: function() {
      Axios.post("https://us-central1-homework-rpg.cloudfunctions.net/query", {
        query: `INSERT INTO follows_user (follower_uid, followee_uid) VALUES (${
          this.$route.params.id
        }, ${this.user.user_id})`
      }).then(result => {
        console.log(result);
        this.isFollowing = true;
      });
    },
    getJob: function() {
      Axios.post("https://us-central1-homework-rpg.cloudfunctions.net/query", {
        query: `SELECT * FROM job WHERE job_no = ${this.user.job_no}`
      }).then(result => {
        console.log(result);
        this.job = result.data[0];
      });
    }
  },
  watch: {
    dialog: function(newVal) {
      if (newVal) {
        this.getJob();
      }
    }
  }
};
</script>

<style>
</style>
