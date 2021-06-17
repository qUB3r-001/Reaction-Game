<template>
  <div class="row justify-center box">
    <div class="col-12" id="target-area" v-on:click="targetClick">
      <div id="target-div" v-if="!over">
        <img src="./bullseye.png" style="height:80px;width:80px" id="target" />
      </div>
      <div class="timer text-center">
        <h1>{{ timer !== 0 ? timer : "Time Up!" }}</h1>
        <div v-if="over">
          <h4 class="q-pa-xs">Targets hit : {{ hits }}</h4>
          <h4 class="q-pa-xs">Missed Target : {{ miss }}</h4>
        </div>
        <div v-if="!start">
          <h5>Click on target as fast as possible before the time runs out!</h5>
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
        timer: 5,
      };
    },
    methods: {
      targetClick(e) {
        let idClicked = e.target.id;
        if (this.start && !this.over && idClicked === "target") {
          let xPos = Math.floor(Math.random() * 92);
          let yPos = Math.floor(Math.random() * 80);
          document
            .getElementById("target-div")
            .style.setProperty("top", yPos + "%");
          document
            .getElementById("target-div")
            .style.setProperty("left", xPos + "%");
          this.hits++;
        } else if (this.start && !this.over && idClicked === "target-area") {
          this.miss++;
        }
      },
      reset() {
        this.timer = 5;
        this.hits = 0;
        this.miss = 0;
        this.start = false;
        this.over = false;
        document.getElementById("target-div").style.setProperty("top", "2%");
        document.getElementById("target-div").style.setProperty("left", "1%");
      },
      countdown() {
        const timerInterval = setInterval(() => {
          this.timer--;

          if (this.timer == 0) {
            clearInterval(timerInterval);
            this.over = true;
          }
        }, 1000);
        this.start = true;
      },
    },
  };
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100%;
  }

  h5 {
    line-height: 4vh;
  }

  #target-area {
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
  }

  #target-div:hover {
    box-shadow: 0px 0px 10px black;
  }

  #game-over {
    font-size: 4em;
  }

  .button-div {
    height: 10vh !important;
  }

  .timer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.1;
    z-index: 9;
  }
</style>
