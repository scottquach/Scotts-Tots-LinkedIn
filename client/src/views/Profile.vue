<template>
  <div class="profile">
    <div>
      <h1>Profile</h1>
      <h3 class="profile__name">{{ user.first_name + " " + user.last_name}}</h3>
      <h3>{{ user.user_city + ", " + user.user_state + " " + user.user_country }}</h3>
      <h3>{{ "Joined " + user.join_date }}</h3>
    </div>
    <div class="profile__post">
      <template v-for="post in posts">
        <v-card :key="post.post_id" color="#26c6da" dark>
          <!-- <v-card-title>
            <span class="profile__post--header">Post</span>
          </v-card-title> -->
          <v-card-text>{{ post.Pcontent }}</v-card-text>
          <v-card-actions>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ post.Pcreated_date}} </v-list-tile-title>
              </v-list-tile-content>

              <!-- <v-icon class="mr-1">mdi-heart</v-icon>
              <span class="subheading mr-2">256</span>
              <span class="mr-1">·</span>
              <v-icon class="mr-1">mdi-share-variant</v-icon>
              <span class="subheading">45</span> -->
            </v-list-tile>
          </v-card-actions>
        </v-card>
      </template>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data: function() {
    return {
      user: {},
      posts: []
    };
  },
  methods: {},
  created() {
    console.log(this.$route.params);
    Axios.post("/api/query", {
      query: `SELECT * FROM USER WHERE USER.user_id = ${this.$route.params.id}`
    }).then(result => {
      console.log(result);
      this.user = result.data[0];
    });
    Axios.post("/api/query", {
      query: `SELECT * FROM POST WHERE POST.user_id = ${this.$route.params.id}`
    }).then(result => {
      console.log(result);
      this.posts.push(...result.data);
    });
  }
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.profile__name {
  font-size: 4rem;
}

.profile__post {
  width: 40rem;
  color: white;
}

.profile__post--header {
  font-size: 1rem;
}

.white {
  color: white;
}
</style>
