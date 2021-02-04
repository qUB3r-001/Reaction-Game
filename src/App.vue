<template>
  <div id="app">
    <h1>REACTION TEST</h1>
    <Target />
  </div>
</template>

<script>
  import Target from "./components/Target";

  export default {
    name: "App",
    components: { Target },
  };
</script>

<style>
  #app {
    text-align: center;
    border: 1px solid black;
  }
</style>
