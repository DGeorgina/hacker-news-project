<template>
  <article class="container post-details">
    <h1 class="text-center display-4 mb-5" style="font-weight: bold">
      {{ data.story_title }}
    </h1>
    <div class="row">
      <div class="col-md-6">
        <h4 class="display-6">Author:</h4>
        <h1 style="font-size: 25px">{{ data.author }}</h1>
      </div>
      <div class="col-md-6">
        <h4 class="display-6">URL:</h4>
        <a :href="data.story_url" target="_blank" style="font-size: 25px">{{
          data.story_url
        }}</a>
      </div>
    </div>
  </article>

  <br />
  <router-link
    :to="{ name: 'postComments', params: { id: id } }"
    class="btn btn-outline-primary btn-lg"
  >
    <h5>Go to comments</h5>
  </router-link>

  <br />
  <br />
  <br />

  <button class="btn btn-outline-primary btn-lg" @click="back">Go back</button>
</template>
<script>
import { db } from "../../db";
export default {
  props: ["id"],
  data() {
    return {
      data: {},
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
  async mounted() {
    this.data = await db.posts.where("objectID").equals(this.id).first();
  },
};
</script>

<style>
.post-details {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 100px;
  background: linear-gradient(#404040, #ddd);
}

.post-details h2 {
  text-align: center;
  margin-bottom: 10px;
}

.post-details h3,
h4 {
  margin-bottom: 5px;
}

.post-details a {
  color: blue;
  text-decoration: underline;
}
</style>

