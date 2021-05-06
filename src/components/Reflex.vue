<template>
  <div>
    <h3>Targets hit : {{ count }}</h3>
    <div class="box" id="board" v-on:click="missClick">
      <div id="target" v-on:click="handleClick">
        <img src="./bullseye.png" style="height:100px;width:100px" />
      </div>

      <h1 v-show="disable" class="timer">{{ timer }}</h1>
      <h1 v-show="missed" id="game-over">GAME OVER</h1>
    </div>
    <div class="q-gutter-xl">
      <q-btn
        push
        size="large"
        color="secondary"
        v-bind:disabled="!disable"
        v-on:click="countdown"
        label="Start"
      />
      <q-btn
        push
        size="large"
        style="background: #ff414d; color: white"
        v-bind:disabled="disable"
        v-on:click="reset"
        label="Reset"
      />
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
        count: 0,
        disable: true,
        missed: false,
        timer: 5,
      };
    },
    methods: {
      handleClick() {
        if (!this.missed && this.timer != 0) {
          this.xPos = Math.floor(Math.random() * 1000);
          this.yPos = Math.floor(Math.random() * 400);
          document
            .getElementById("target")
            .style.setProperty("margin-top", this.yPos + "px");
          document
            .getElementById("target")
            .style.setProperty("margin-left", this.xPos + "px");
          this.count++;
        }
      },
      reset() {
        this.count = 0;
        document.getElementById("target").style.setProperty("margin-top", 0);
        document.getElementById("target").style.setProperty("margin-left", 0);
        this.missed = false;
        this.disable = true;
        this.timer = 5;
      },
      missClick(e) {
        if (e.target.id === "board") {
          this.disable = false;
          this.missed = true;
        }
      },
      countdown() {
        const timerInterval = setInterval(() => {
          this.timer--;

          if (this.timer == 0) clearInterval(timerInterval);
        }, 1000);
      },
    },
  };
</script>

<style scoped>
  .box {
    width: 100%;
    height: 68vh;
    border: 1px solid black;
    margin-bottom: 20px;
    display: grid;
    place-items: center;
  }

  #target {
    height: 100px;
    width: 100px;
    border-radius: 50px;
    position: absolute;
  }

  #target:hover {
    box-shadow: 3px 3px rgb(124, 124, 124);
  }

  #game-over {
    font-size: 4em;
  }

  h3 {
    font-size: 1.5em;
  }

  .timer {
    opacity: 0.1;
  }
</style>
