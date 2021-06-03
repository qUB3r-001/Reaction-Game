<template>
  <div class="row justify-center">
    <div class="row box">
      <div class="col-6 column self-center">
        <div class="col-5">
          <h3>Time</h3>
          <h2>{{ count }}</h2>
        </div>

        <h3 class="col-7">
          Average Time : {{ reactionTimes.length === 5 ? averageTime : "--" }}
          <ul>
            <li
              v-for="(time, id) in reactionTimes"
              v-bind:key="id"
              class="times"
            >
              {{ id + 1 }}. {{ time }}
            </li>
          </ul>
        </h3>
      </div>

      <div class="col-6 column">
        <div class="col-10">
          <div
            class="wait-text"
            v-if="disable && !greenColor"
            v-bind:disabled="greenColor"
          >
            Wait...
          </div>
          <div
            id="circle"
            v-on:click="stopTimer"
            v-bind:class="{ green: greenColor }"
            v-bind:style="targetStyle"
            v-bind:disabled="over"
          ></div>
        </div>
        <div>
          <q-btn
            round
            v-on:click="timer"
            v-bind:disabled="disable"
            color="secondary"
            icon="play_arrow"
            class="q-mx-md"
          />
          <q-btn
            round
            v-on:click="reset"
            color="secondary"
            icon="replay"
            class="q-mx-md"
          />
        </div>
      </div>
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
          this.reset();
          this.timer();
        }
      },
      timer() {
        console.log(this.reactionTimes.length);
        this.disable = true;
        let green = Math.floor(Math.random() * 5000 + 10);
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
    computed: {
      targetStyle() {
        return {
          height: this.radius * 2 + "px",
          width: this.radius * 2 + "px",
          borderRadius: this.radius + "px",
        };
      },
    },
  };
</script>

<style scoped>
  .box {
    width: 90vw;
    height: 80vh;
    border: 1px solid black;
  }

  .wait-text {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    color: black;
  }

  #circle {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
