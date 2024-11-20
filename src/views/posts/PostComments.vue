<template>
  <div v-if="rootComments.length > 0">
    <div class="head mb-5">
      <h2 class="ms-5 head">Title: {{ title }}</h2>
      <a :href="linkPreview" class="btn btn-outline-dark btn-lg ms-5">
        Go to the original article
      </a>
    </div>

    <div class="mt-3 container" style="margin-left: 0px">
      <TreeItem
        class="item"
        v-for="rootComment in rootComments"
        :key="rootComment.objectID"
        :model="rootComment"
      />
    </div>
  </div>
  <div v-else>
    <h2 class="ms-5 head">No information available</h2>
  </div>
</template>


<script>
import TreeItem from "../../components/TreeItem.vue";
import { fetchPostComments } from "@/services/postService";

export default {
  name: "PostComments",
  components: { TreeItem },
  props: ["id"],
  data() {
    return {
      title: "",
      linkPreview: "",
      rootComments: [],
    };
  },

  async mounted() {
    const data = await fetchPostComments(this.id, 1, 5);

    if (data.hits.length > 0) {
      this.rootComments = this.buildCommentTree(data.hits);

      this.title = data.hits[0].story_title;
      this.linkPreview = data.hits[0].story_url;
    }
  },
  methods: {
    buildCommentTree(comments) {
      const commentMap = {};
      comments.forEach((comment) => {
        commentMap[comment.objectID] = {
          name: comment.author,
          text: comment.comment_text,
          objectID: comment.objectID,
          children: [],
        };
      });

      comments.forEach((comment) => {
        if (comment.parent_id != this.id) {
          if (commentMap[comment.parent_id]) {
            //ako ne postoi commentMap[comment.parent_id] togas parentot ne e ispraten, nego samo negovite kids
            commentMap[comment.parent_id].children.push(
              commentMap[comment.objectID]
            );
          }
        }
      });

      return comments
        .filter((comment) => comment.parent_id == this.id)
        .map((rootComment) => commentMap[rootComment.objectID]);
    },
  },
};
</script>
<style>
.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
.head {
  font-family: cursive;
  text-align: left;
}

.container {
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
}
</style>