<template>
  <div>
    <h1>Time : {{ count }}</h1>
    <div
      class="circle"
      v-on:click="stopTimer"
      v-if="hide"
      v-bind:style="yellow"
    ></div>
    <button v-on:click="timer" v-bind:disabled="disable">Start</button>
    <button v-on:click="reset">Reset</button>
  </div>
</template>

<script>
  export default {
    name: "Target",
    data() {
      return {
        hide: true,
        count: 0,
        rsTimer: null,
        disable: false,
      };
    },
    methods: {
      stopTimer() {
        this.hide = false;
        clearInterval(this.rsTimer);
      },
      timer() {
        this.disable = true;
        this.rsTimer = setInterval(() => {
          this.count = this.count + 10;
        }, 10);
      },
      reset() {
        this.hide = true;
        this.count = 0;
        this.disable = false;
      },
    },
  };
</script>

<style scoped>
  .circle {
    height: 100px;
    width: 100px;
    border-radius: 50px;
    background-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
