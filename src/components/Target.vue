<template>
  <div>
    <h3>Time : {{ count }}</h3>
    <div>
      <div
        class="circle"
        v-on:click="stopTimer"
        v-if="hide"
        v-bind:style="yellow"
        v-bind:class="{ green: greenColor }"
      ></div>
    </div>
    <div>
      <button v-on:click="timer" v-bind:disabled="disable">Start</button>
      <button v-on:click="reset">Reset</button>
    </div>
    <h3>
      Average Time : {{ reactionTimes.length === 5 ? averageTime : null }}
    </h3>
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
        grnTimer: null,
        greenColor: false,
        reactionTimes: [],
        averageTime: 0,
      };
    },
    methods: {
      stopTimer() {
        this.hide = false;
        clearInterval(this.rsTimer);
        this.reactionTimes.push(this.count);
        this.averageTime =
          this.reactionTimes.reduce((a, b) => a + b, 0) /
          this.reactionTimes.length;
      },
      timer() {
        this.disable = true;
        let green = Math.ceil(Math.random() * 5000);
        this.grnTimer = setTimeout(() => {
          this.greenColor = true;
          this.rsTimer = setInterval(() => {
            this.count = this.count + 10;
          }, 10);
        }, green);
      },
      reset() {
        this.hide = true;
        this.count = 0;
        this.disable = false;
        this.greenColor = false;
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
    margin: 0 auto;
  }

  .green {
    background-color: lightgreen !important;
  }

  h3 {
    font-family: "Roboto", sans-serif;
    padding: 0.2em;
    font-size: 1.5em;
  }
</style>
