<template>
  <div id="app" class="column text-center">
    <div class="row justify-evenly items-center q-pa-md">
      <q-btn
        push
        color="secondary"
        label="Target"
        size="medium"
        v-on:click="targetEnable"
      />

      <h2>Reaction Test</h2>

      <q-btn
        push
        style="background: #ff414d; color: white"
        label="Reflex"
        size="medium"
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
      };
    },
    methods: {
      targetEnable() {
        this.targetShow = true;
        this.reflexShow = false;
      },
      reflexEnable() {
        this.reflexShow = true;
        this.targetShow = false;
      },
    },
  };
</script>

<style scoped>
  h2 {
    font-family: "Advent Pro", sans-serif;
  }
</style>
