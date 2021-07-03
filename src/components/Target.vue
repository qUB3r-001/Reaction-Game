<template>
  <div class="box">
    <div v-if="!disable">
      <h5 class="text-center info-text">
        Wait for the green color and click as fast as possible in a set of 5
      </h5>
    </div>
    <div
      v-bind:style="disable && { backgroundColor: 'rgb(248, 61, 61)' }"
      v-else-if="disable && !greenColor"
      v-on:click="errorClick"
      class="standby-screen"
    >
      <h1>
        Wait...
      </h1>
    </div>

    <div
      id="circle"
      v-on:click="stopTimer"
      v-bind:class="{ green: greenColor }"
      v-else-if="!over"
    >
      <h1>{{ count }}</h1>
    </div>

    <div class="wait-text text-center" v-else>
      <h2>GAME OVER</h2>
      <h3 class="col-7 text-center">
        Average Time : {{ reactionTimes.length === 5 ? averageTime : "--" }}
        <ul>
          <li v-for="(time, id) in reactionTimes" v-bind:key="id" class="times">
            {{ id + 1 }}. {{ time }}
          </li>
        </ul>
      </h3>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Target",
    data() {
      return {
        count: 0,
        rsTimer: null,
        disable: false,
        grnTimer: null,
        greenColor: false,
        over: false,
        reactionTimes: [],
        averageTime: 0,
      };
    },
    methods: {
      errorClick() {
        this.disable = true;
        this.greenColor = true;
        this.over = true;
        clearInterval(this.rsTimer);
        clearTimeout(this.grnTimer);
      },
      stopTimer(e) {
        console.log(e.target);
        clearInterval(this.rsTimer);
        this.reactionTimes.push(this.count);
        this.averageTime =
          this.reactionTimes.reduce((a, b) => a + b, 0) /
          this.reactionTimes.length;

        if (this.reactionTimes.length === 5) {
          this.disable = true;
          this.rsTimer = null;
          this.grnTimer = null;
          this.over = true;
        } else {
          this.resetTimer();
          this.countdown();
        }
      },
      countdown() {
        console.log(this.reactionTimes.length);
        this.disable = true;
        let green = Math.floor(Math.random() * 3500 + 500);
        this.grnTimer = setTimeout(() => {
          this.greenColor = true;
          this.rsTimer = setInterval(() => {
            this.count = this.count + 10;
          }, 10);
        }, green);
      },
      resetTimer() {
        if (this.reactionTimes.length === 5) {
          this.reactionTimes = [];
          this.over = false;
        } else {
          this.count = 0;
          clearInterval(this.rsTimer);
          clearTimeout(this.grnTimer);
          this.disable = false;
          this.greenColor = false;
          this.rsTimer = null;
          this.grnTimer = null;
        }
      },
      reset() {
        this.reactionTimes = [];
        this.over = false;
        this.count = 0;
        clearInterval(this.rsTimer);
        clearTimeout(this.grnTimer);
        this.disable = false;
        this.greenColor = false;
        this.rsTimer = null;
        this.grnTimer = null;
        this.averageTime = 0;
      },
    },
  };
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
  }

  .standby-screen {
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
    border-radius: 20px;
    color: white;
  }

  .info-text {
    font-family: "Josefin Sans", sans-serif;
    opacity: 0.3;
  }

  .wait-text {
    opacity: 0.3;
  }

  .wait-text,
  .wait-text h3,
  .wait-text li {
    font-family: "Josefin Sans", sans-serif;
  }

  #circle {
    height: 100%;
    width: 100%;
    border-radius: 20px;
    background-color: transparent;
    color: black;
    display: grid;
    place-items: center;
  }

  #circle h1 {
    color: white;
    font-family: "Josefin Sans", sans-serif;
  }

  .green {
    background-color: lightgreen !important;
  }

  h3 {
    font-family: "Roboto", sans-serif;
    padding: 0.2em;
    font-size: 1.5em;
  }

  ul {
    list-style-type: none;
  }

  .times {
    line-height: 1.5em;
  }
</style>
