<template>
  <v-dialog v-model="dialog" width="500">
    <!-- <template v-slot:activator="{ on }">
      <v-btn color="red lighten-2" dark v-on="on">Click Me</v-btn>
    </template>-->
    <v-card>
      <v-card-title class="headline lighten-2" primary-title>{{ org.org_name }}</v-card-title>
      <v-card-text>
        <div>
          <h3>Founded</h3>
          <span>{{ org.year_founded}}</span>
          <h3>Headquartered</h3>
          <span>{{ org.org_country }}</span>
          <h3>Industry</h3>
          <span>{{ org.org_industry }}</span>
          <v-list v-if="jobs">
            <v-subheader>Jobs</v-subheader>
            <v-list-tile v-for="job in jobs" :key="job.job_no" avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="job.job_title"></v-list-tile-title>
                <v-list-tile-sub-title>{{ job.job_desc }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="followOrg" :disabled="isFollowing">Follow org</v-btn>
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
      jobs: []
    };
  },
  props: ["org", "dialog"],
  methods: {
    getData: function() {},
    followOrg: function() {
      Axios.post("https://us-central1-homework-rpg.cloudfunctions.net/query", {
        query: `INSERT INTO follows_org (user_id, org_id) VALUES (${
          this.$route.params.id
        }, ${this.org.org_id})`
      }).then(result => {
        console.log(result);
        this.isFollowing = true;
      });
    },
    getJobs: function() {
      Axios.post("https://us-central1-homework-rpg.cloudfunctions.net/query", {
        query: `SELECT * FROM job WHERE org_id = ${this.org.org_id}`
      }).then(result => {
        console.log(result);
        this.jobs = [];
        this.jobs.push(...result.data);
      });
    }
  },
  watch: {
    dialog: function(newVal) {
      if (newVal) {
        this.getJobs();
      }
    }
  }
};
</script>
