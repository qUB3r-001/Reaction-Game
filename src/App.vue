<template>
  <div id="app">
    <h1>REACTION TEST</h1>
    <Target />
    <!-- <Reflex /> -->
  </div>
</template>

<script>
  import Target from "./components/Target";
  //import Reflex from "./components/Reflex";

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

  h1 {
    font-family: "Ubuntu", sans-serif;
    font-size: 2.5em;
    padding: 0.3em;
  }
</style>
