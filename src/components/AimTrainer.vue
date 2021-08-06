<template>
  <div class="gameplay-bg justify-center">
    <div id="clickable-area" @click="targetClick">
      <div id="target-div" v-if="!over">
        <img
          src="../../public/bullseye.png"
          style="height:80px;width:80px"
          id="target"
        />
      </div>

      <div class="gameplay-screen text-center">
        <h1>{{ startTimerValue !== 0 ? startTimerValue : "Time Up!" }}</h1>

        <div v-if="over" class="results">
          <h5>Targets hit : {{ hits }}</h5>
          <h5>Missed Target : {{ miss }}</h5>
          <h5>Accuracy : {{ Math.round((100 * hits) / (hits + miss)) }}%</h5>
          <h5>Average Target Click Time : {{ (5 / hits).toFixed(2) }}s</h5>
        </div>

        <div v-if="!start">
          <h5 class="text-center info-text">
            Click on target as fast as possible before the time runs out!
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Reflex",
    data() {
      return {
        hits: 0,
        miss: 0,
        start: false,
        over: false,
        countdownTimer: null,
        startTimerValue: 30,
      };
    },
    methods: {
      targetClick(e) {
        let idClicked = e.target.id;
        if (this.start && !this.over && idClicked === "target") {
          let xPos = Math.floor(Math.random() * 90);
          let yPos = Math.floor(Math.random() * 82);
          document
            .getElementById("target-div")
            .style.setProperty("top", yPos + "%");
          document
            .getElementById("target-div")
            .style.setProperty("left", xPos + "%");
          this.hits++;
        } else if (this.start && !this.over && idClicked === "clickable-area") {
          this.miss++;
        }
      },
      reset() {
        this.startTimerValue = 5;
        this.hits = 0;
        this.miss = 0;
        this.start = false;
        this.over = false;
        clearInterval(this.countdownTimer);
        document.getElementById("target-div").style.setProperty("top", "2%");
        document.getElementById("target-div").style.setProperty("left", "1%");
      },
      reactionTimer() {
        this.countdownTimer = setInterval(() => {
          this.startTimerValue--;

          if (this.startTimerValue <= 0) {
            clearInterval(this.countdownTimer);
            this.over = true;
          }
        }, 1000);
        this.start = true;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .gameplay-bg {
    width: 100%;
    height: 100%;
  }

  .info-text {
    font-family: "Josefin Sans", sans-serif;
    opacity: 0.3;
  }

  #clickable-area {
    position: relative;
    height: 100%;
    border-radius: 20px;
  }

  #target-div {
    height: 80px;
    width: 80px;
    border-radius: 40px;
    position: absolute;
    top: 2%;
    left: 1%;
    z-index: 10;
    transition: 0.1s;

    &:hover {
      box-shadow: 0px 0px 7px black;
    }
  }

  .gameplay-screen {
    font-family: "Josefin Sans", sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;

    h1 {
      opacity: 0.3;
    }
  }

  .results {
    display: grid;
    grid-template-columns: auto;
    text-align: left;

    h5 {
      padding: 5px 0;
      text-align: center;
      opacity: 0.3;
    }
  }
</style>
