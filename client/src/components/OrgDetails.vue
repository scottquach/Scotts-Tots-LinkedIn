<template>
  <v-dialog v-model="dialog" width="500">
    <!-- <template v-slot:activator="{ on }">
      <v-btn color="red lighten-2" dark v-on="on">Click Me</v-btn>
    </template> -->

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
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Axios from 'axios';

export default {
  props: ["org", "dialog"],
  methods: {
    getData: function() {}
  },
  created() {
      // Axios.post("/api/query")
  }
};
</script>
