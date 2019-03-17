<template>
  <div class="profile">
    <div style="width: 45%">
      <h1>Profile</h1>
      <h3 class="profile__name">{{ user.first_name + " " + user.last_name}}</h3>
      <h3>{{ user.user_city + ", " + user.user_state + " " + user.user_country }}</h3>
      <h3>{{ "Joined " + user.join_date }}</h3>
      <v-card style="margin-top: 5rem;">
        <v-card-title primary-title>
          <div>
            <div class="headline">Share with your netowork</div>
          </div>
        </v-card-title>
        <v-card-text>
          <v-textarea
            box
            label="Content"
            v-model="postContent"
            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="orange" @click="post()">Post</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div class="profile__post">
      <h2>Your posts</h2>
      <template v-for="post in posts" >
        <v-card :key="post.post_id" color="#26c6da" dark style="margin-top: 2rem;">
          <v-card-text>{{ post.Pcontent }}</v-card-text>
          <v-card-actions>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ post.Pcreated_date}}</v-list-tile-title>
              </v-list-tile-content>
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
      posts: [],
      postContent: ""
    };
  },
  methods: {
    post: function() {
      Axios.post("/api/query", {
        "query": `INSERT INTO POST (Pcontent, Pcreated_date, user_id) values (\"${this.postContent}\", \"${new Date().toISOString().slice(0, 19).replace('T', ' ')}\", ${this.$route.params.id})`
      }).then(result => {
        console.log(result);
        this.postContent = "";
      })
    }
  },
  created() {
    console.log(this.$route.params);
    Axios.post("/api/query", {
      "query": `SELECT * FROM USER WHERE USER.user_id = ${this.$route.params.id}`
    }).then(result => {
      console.log(result);
      this.user = result.data[0];
    });
    Axios.post("/api/query", {
      "query": `SELECT * FROM POST WHERE POST.user_id = ${this.$route.params.id}`
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
}

.profile__post--header {
  font-size: 1rem;
}

.white {
  color: white;
}
</style>
