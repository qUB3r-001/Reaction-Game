<template>
  <div class="row justify-center">
    <div class="row box">
      <div class="col-12">
        <h5>Targets hit : {{ hits }} Missed Target : {{ miss }}</h5>
      </div>

      <div class="col-12" id="target-area" v-on:click="targetClick">
        <div id="target-div">
          <img
            src="./bullseye.png"
            style="height:80px;width:80px"
            id="target"
          />
        </div>
        <div>
          <h1 class="timer">{{ timer }}</h1>
          <h1 v-show="over" id="game-over">GAME OVER</h1>
        </div>
      </div>

      <div class="col-12 self-end button-div">
        <q-btn
          push
          size="medium"
          color="secondary"
          v-on:click="countdown"
          label="Start"
        />
        <q-btn
          push
          size="medium"
          style="background: #ff414d; color: white"
          v-on:click="reset"
          label="Reset"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Reflex",
    data() {
      return {
        xPos: 0,
        yPos: 0,
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
          this.xPos = Math.floor(Math.random() * 100);
          this.yPos = Math.floor(Math.random() * 90);
          document
            .getElementById("target-div")
            .style.setProperty("top", this.yPos + "%");
          document
            .getElementById("target-div")
            .style.setProperty("left", this.xPos + "%");
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
        document.getElementById("target-div").style.setProperty("top", 0);
        document.getElementById("target-div").style.setProperty("left", 0);
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
    width: 90vw;
    height: 80vh;
    border: 1px solid black;
  }

  h5 {
    line-height: 4vh;
  }

  #target-area {
    position: relative;
    height: 70vh !important;
  }

  #target-div {
    height: 80px;
    width: 80px;
    border-radius: 40px;
    position: absolute;
    transition: 0.1s;
  }

  #target-div:hover {
    box-shadow: 0px 0px 10px black;
  }

  #game-over {
    font-size: 4em;
  }

  .button-div {
    height: 6vh !important;
  }

  .timer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    opacity: 0.1;
  }
</style>
