<template>
  <div>
      <h1>Organizations</h1>
    <button @click="getOrganizations()">test</button>
    <v-list>
      <v-list-tile v-for="org in organizations" :key="org.org_id" avatar style="margin-bottom: 1rem;" @click="selectedOrg = org;openDetails = true">
        <v-list-tile-avatar>
          <v-icon>account_balance</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content >
          <v-list-tile-title v-text="org.org_name"></v-list-tile-title>
          <v-list-tile-sub-title>{{org.org_country}}</v-list-tile-sub-title>
            <v-list-tile-sub-title>{{org.org_industry}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <org-details :org="selectedOrg" :dialog="openDetails" @close="openDetails = false" />
  </div>
</template>

<script>
import Axios from 'axios';
import OrgDetails from '../components/OrgDetails';


export default {
  data: function() {
    return {
      organizations: [],
      selectedOrg: {},
      openDetails: false
    };
  },
  methods: {
    getOrganizations: function() {
      Axios.post("/api/query", {
        query: "SELECT * FROM ORGANIZATION"
      }).then(result => {
        this.organizations = result.data;
      });
    }
  },
  components: {
    OrgDetails
  }
};
</script>
