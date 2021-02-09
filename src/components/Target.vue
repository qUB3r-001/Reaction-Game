<template>
  <div>
    <div class="box row">
      <div class="col-3 column">
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
            class="circle"
            v-on:click="stopTimer"
            v-bind:class="{ green: greenColor }"
            v-bind:style="targetStyle"
          ></div>
        </div>
        <!-- // v-if="hide" -->
        <div class="col-2 q-gutter-md">
          <q-btn
            v-on:click="timer"
            v-bind:disabled="disable"
            label="Start"
            color="secondary"
          />
          <q-btn v-on:click="reset" color="secondary" label="Reset" />
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
        hide: true,
        count: 0,
        radius: 100,
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
        if (this.disable) {
          this.hide = false;
          clearInterval(this.rsTimer);
          this.reactionTimes.push(this.count);
          this.averageTime =
            this.reactionTimes.reduce((a, b) => a + b, 0) /
            this.reactionTimes.length;
        }
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
        this.radius = Math.floor(Math.random() * 50 + 50);
        if (this.reactionTimes.length === 5) {
          this.reactionTimes = [];
        }
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
    width: 100%;
    height: 70vh;
    border: 1px solid black;
    margin-bottom: 20px;
  }

  .circle {
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
