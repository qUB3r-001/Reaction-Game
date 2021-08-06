<template>
  <div class="gameplay-bg">
    <div v-if="!gameBegin">
      <h5 class="text-center info-text">
        Wait for the green color and click as fast as possible in a set of 5
      </h5>
    </div>

    <div
      class="gamestart-screen"
      :style="gameBegin && { backgroundColor: 'rgb(248, 61, 61)' }"
      @click="wrongClick"
      v-else-if="gameBegin && !grnTriggerDisplay"
    >
      <h1>
        Wait...
      </h1>
    </div>

    <div
      id="greenBox"
      :style="grnTriggerDisplay && { backgroundColor: 'rgb(144, 238, 144)' }"
      @click="stopTimer"
      v-else-if="!gameOver"
    >
      <h1>{{ reactionTime }}</h1>
    </div>

    <div class="text-center wait-text" v-else>
      <h2>GAME OVER</h2>
      <h3 class="col-7 text-center">
        Average Time : {{ reactionTimes.length === 5 ? averageTime : "--" }} ms
        <ul>
          <li v-for="(time, id) in reactionTimes" :key="id">
            {{ id + 1 }}. {{ time }} ms
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
        reactionTime: 0,
        reactionTimeTimer: null,
        gameBegin: false,
        grnDelayTimer: null,
        grnTriggerDisplay: false,
        gameOver: false,
        reactionTimes: [],
        averageTime: 0,
      };
    },
    methods: {
      wrongClick() {
        this.gameBegin = true;
        this.grnTriggerDisplay = true;
        this.gameOver = true;
        clearInterval(this.reactionTimeTimer);
        clearTimeout(this.grnDelayTimer);
      },
      stopTimer() {
        clearInterval(this.reactionTimeTimer);
        this.reactionTimes.push(this.reactionTime);
        this.averageTime =
          this.reactionTimes.reduce((a, b) => a + b, 0) /
          this.reactionTimes.length;

        if (this.reactionTimes.length === 5) {
          this.gameBegin = true;
          this.reactionTimeTimer = null;
          this.grnDelayTimer = null;
          this.gameOver = true;
        } else {
          this.resetTimer();
          this.reactionTimer();
        }
      },
      reactionTimer() {
        this.gameBegin = true;
        let green = Math.floor(Math.random() * 3500 + 500);
        this.grnDelayTimer = setTimeout(() => {
          this.grnTriggerDisplay = true;
          this.reactionTimeTimer = setInterval(() => {
            this.reactionTime = this.reactionTime + 10;
          }, 10);
        }, green);
      },
      resetTimer() {
        if (this.reactionTimes.length === 5) {
          this.reactionTimes = [];
          this.gameOver = false;
        } else {
          this.reactionTime = 0;
          clearInterval(this.reactionTimeTimer);
          clearTimeout(this.grnDelayTimer);
          this.gameBegin = false;
          this.grnTriggerDisplay = false;
          this.reactionTimeTimer = null;
          this.grnDelayTimer = null;
        }
      },
      reset() {
        this.reactionTimes = [];
        this.gameOver = false;
        this.reactionTime = 0;
        clearInterval(this.reactionTimeTimer);
        clearTimeout(this.grnDelayTimer);
        this.gameBegin = false;
        this.grnTriggerDisplay = false;
        this.reactionTimeTimer = null;
        this.grnDelayTimer = null;
        this.averageTime = 0;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .gameplay-bg {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
  }

  .gamestart-screen {
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
    font-family: "Josefin Sans", sans-serif;

    ul {
      list-style-type: none;
      font-family: "Josefin Sans", sans-serif;

      li {
        line-height: 1.5em;
      }
    }

    h3 {
      font-family: "Roboto", sans-serif;
      font-family: "Josefin Sans", sans-serif;
      padding: 0.2em;
      font-size: 1.5em;
    }
  }

  #greenBox {
    height: 100%;
    width: 100%;
    border-radius: 20px;
    background-color: transparent;
    color: black;
    display: grid;
    place-items: center;

    h1 {
      color: white;
      font-family: "Josefin Sans", sans-serif;
    }
  }
</style>
