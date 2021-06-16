<template>
  <div class="box">
    <!-- <h3>Time</h3>
        <h2>{{ count }}</h2> -->
    <div v-if="!disable">
      <h5 class="text-center">
        Wait for the green color and click as fast as possible in a set of 5
      </h5>
    </div>
    <div
      v-bind:style="disable && { backgroundColor: 'rgb(248, 61, 61)' }"
      v-else-if="disable && !greenColor"
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
    ></div>
    <div class="wait-text text-center" v-else>
      GAME OVER
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
        radius: 100,
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
      stopTimer(e) {
        console.log(e.target);
        clearInterval(this.rsTimer);
        this.reactionTimes.push(e.target.id === "circle" ? this.count : 0);
        this.averageTime =
          this.reactionTimes.reduce((a, b) => a + b, 0) /
          this.reactionTimes.length;

        if (this.reactionTimes.length === 5) {
          this.disable = true;
          this.rsTimer = null;
          this.grnTimer = null;
          this.over = true;
        } else {
          this.reset();
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
      reset() {
        if (this.reactionTimes.length === 5) {
          this.reactionTimes = [];
          this.over = false;
        }
        this.count = 0;
        this.disable = false;
        this.greenColor = false;
        this.radius = Math.floor(Math.random() * 50 + 50);
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
    border-radius: 30px;
    color: white;
  }

  #circle {
    height: 100%;
    width: 100%;
    border-radius: 30px;
    background-color: transparent;
    color: black;
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
