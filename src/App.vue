<template>
  <div id="app">
    <h2>Reaction Test</h2>
    <div class="q-gutter-xl" v-show="enable">
      <q-btn
        color="secondary"
        label="Target"
        size="large"
        v-on:click="targetEnable"
      />
      <q-btn
        style="background: #ff414d; color: white"
        label="Reflex"
        size="large"
        v-on:click="reflexEnable"
      />
    </div>
    <Target v-show="targetShow" />
    <Reflex v-show="reflexShow" />
  </div>
</template>

<script>
  import Target from "./components/Target";
  import Reflex from "./components/Reflex";

  export default {
    name: "App",
    components: {
      Target,
      Reflex,
    },

    data() {
      return {
        targetShow: false,
        reflexShow: false,
        enable: true,
      };
    },
    methods: {
      targetEnable() {
        this.targetShow = true;
        this.reflexShow = false;
        this.enable = false;
      },
      reflexEnable() {
        this.reflexShow = true;
        this.targetShow = false;
        this.enable = false;
      },
    },
  };
</script>

<style scoped>
  h2 {
    font-family: "Advent Pro", sans-serif;
    font-size: 5em !important;
    padding: 0.3em;
  }
</style>
