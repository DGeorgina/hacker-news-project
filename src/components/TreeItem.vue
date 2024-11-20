<template>
  <div class="item">
    <div :class="{ bold: isFolder }" @click="toggle">
      <div class="card">
        <div class="card-header">
          {{ model.name }}
          <span v-if="isFolder">[{{ isOpen ? "-" : "+" }}]</span>
        </div>
        <div class="card-body">
          <div class="card-text" v-html="model.text"></div>
        </div>
      </div>
    </div>
    <div v-show="isOpen" v-if="isFolder">
      <TreeItem
        class="item"
        v-for="model in model.children"
        :model="model"
        :key="model.objectID"
      >
      </TreeItem>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  model: Object,
});

const isOpen = ref(false);
const isFolder = computed(() => {
  return props.model.children && props.model.children.length;
});

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>

<style scoped>
.item {
  margin-left: 50px;
  margin-top: 10px;
}
.card-header,
.card-body {
  text-align: left;
}
.card {
  width: 80%;
}
</style>