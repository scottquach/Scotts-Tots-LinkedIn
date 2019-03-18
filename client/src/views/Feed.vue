<template>
  <div class="feed">
    <div class="feed__post">
      <h1>From your network</h1>
      <template v-for="post in posts">
        <v-card :key="post.post_id" color="#26c6da" dark style="margin-top: 2rem;">
          <v-card-title>
            <span class="title font-weight-light">{{ post.Pcreated_date }}</span>
          </v-card-title>
          <v-card-text>{{ post.Pcontent }}</v-card-text>
          <v-card-actions>
            <v-list-tile>
              <v-list-tile-avatar color="grey darken-3">
                <v-icon>account_circle</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ post.first_name + " " + post.last_name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-btn @click="openDetails(post)">Details</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </div>
    <div v-if="Object.keys(selectedPost).length > 0" class="feed__details">
      <h1>Post Details</h1>
      <h3>{{ selectedPost.first_name + " " + selectedPost.last_name}}</h3>
      <p>{{ selectedPost.Pcontent }}</p>

      <div class="font-size: 2rem;">
        <v-icon>thumb_up</v-icon>
        <span>{{ selectedPost.likes }}</span>
        <v-btn :disabled="liked" @click="likePost(selectedPost);">Like</v-btn>
      </div>
      <h3>Comments</h3>
      <v-list-tile v-for="comment in comments" :key="comment.comment_no">
        <v-list-tile-content style="margin-top: 1rem;">
          <v-list-tile-title>{{ comment.Cpost_date }}</v-list-tile-title>
          <v-list-tile-sub-title class="text--primary">{{ comment.cmt_content }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-textarea style="margin-top: 2rem;" box label="Comment" v-model="commentContent"></v-textarea>
      <v-btn @click="comment()">Post comment</v-btn>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data: function() {
    return {
      posts: [],
      comments: [],
      selectedPost: {},
      liked: false,
      commentContent: ""
    };
  },
  methods: {
    likePost: function(post) {
      Axios.post("https://us-central1-homework-rpg.cloudfunctions.net/query", {
        query: `insert into likes(user_id, post_id) values(${
          this.$route.params.id
        }, ${post.post_id})`
      }).then(result => {
        this.selectedPost.likes++;
        this.liked = true;
      });
    },
    getPosts: function() {
      Axios.post("https://us-central1-homework-rpg.cloudfunctions.net/query", {
        query: `select * from post join user on user.user_id = post.user_id where post.user_id in (select followee_uid from follows_user where follower_uid = ${
          this.$route.params.id
        });`
      }).then(result => {
        console.log(result);
        this.posts = [];
        this.posts.push(...result.data);
      });
    },
    openDetails: function(selectedPost) {
      Axios.post("https://us-central1-homework-rpg.cloudfunctions.net/query", {
        query: `select * from user join (
	select post.user_id,post.post_id, Pcontent, Pcreated_date, count(post.post_id) as likes from likes, post where likes.post_id = post.post_id and post.post_id = ${
    selectedPost.post_id
  }
            ) as post on post.user_id = user.user_id;
            `
      }).then(result => {
        console.log(result);
        if (result.data.length > 0) {
          this.selectedPost = result.data[0];
        } else {
          this.selectedPost = {};
        }
        Axios.post("https://us-central1-homework-rpg.cloudfunctions.net/query", {
          query: `select * from comment where comment.post_id = ${
            selectedPost.post_id
          }`
        }).then(res => {
          this.comments = [];
          this.comments.push(...res.data);
        });
      });
    },
    comment: function() {
      Axios.post("https://us-central1-homework-rpg.cloudfunctions.net/query", {
        query: `INSERT INTO COMMENT (post_id, user_id, cmt_content, Cpost_date) VALUES (${
          this.selectedPost.post_id
        },
        ${this.$route.params.id},
         \"${this.commentContent}\",
          \"${new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")}\")`
      }).then(result => {
        console.log(result);
        this.comments.push({
            "cmt_content": this.commentContent,
            "Cpost_date": new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")
        })
        this.commentContent = "";
      });
    }
  },
  created() {
    this.getPosts();
  }
};
</script>

<style scoped>
.feed {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.feed__details {
  width: 30%;
}

.feed__post {
  width: 30%;
}
</style>
