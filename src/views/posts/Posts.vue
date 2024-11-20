<template>
  <div class="m-5">
    <div class="input-group input-group-lg mb-5">
      <input
        type="text"
        class="form-control"
        placeholder="Keyword"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        v-model="searchQuery"
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary btn-lg"
          type="button"
          @click="changeSearchQuery()"
        >
          Search
        </button>
      </div>
    </div>

    <BCard
      v-for="post in posts"
      :key="post.objectID"
      bg-variant="dark"
      text-variant="white"
      :title="post.story_title || 'No title'"
      class="mb-5"
    >
      <BCardText> Created at: {{ dateToString(post.created_at_i) }} </BCardText>
      <BCardText> Author: {{ post.author }} </BCardText>

      <router-link
        :to="{ name: 'postDetails', params: { id: post.objectID } }"
        class="btn btn-info"
      >
        <h5>Go to details</h5>
      </router-link>
    </BCard>

    <b-pagination
      class="m-5"
      v-model="currentPage"
      :total-rows="totalRecords"
      :per-page="postsPerPage"
      @update:model-value="getPosts"
      pills
      size="lg"
    />
  </div>
</template>


<script>
import { BCard, BCardText, BButton, BPagination } from "bootstrap-vue-next";
import { fetchPosts } from "../../services/postService";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

export default {
  components: {
    BPagination,
    BCard,
    BCardText,
    BButton,
  },
  data() {
    return {
      searchQuery: "",
      posts: [],
      currentPage: 1,
      postsPerPage: 20,
      totalRecords: 0,
    };
  },

  methods: {
    async getPosts(page) {
      const data = await fetchPosts(
        "search_by_date",
        page,
        this.postsPerPage,
        this.searchQuery
      );
      this.posts = data.hits;
      this.totalRecords = data.nbHits;

      if (this.totalRecords > 1000) {
        this.totalRecords = 980;
      }

      this.currentPage = data.page;
    },
    dateToString(number) {
      let date = new Date(number * 1000);
      return date.toLocaleString();
    },
    changeSearchQuery() {
      this.getPosts(1);
    },
  },
  created() {
    this.getPosts(this.currentPage);
  },
};
</script>