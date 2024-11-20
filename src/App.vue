<template>
  <h2 class="text-white-50 bg-dark display-1">Hacker News Clone</h2>
  <div id="nav" class="display-6">
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link :to="{ name: 'posts' }">Posts</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}

#nav a.router-link-exact-active {
  color: white;
  background: rgb(20, 180, 220);
}
</style>
