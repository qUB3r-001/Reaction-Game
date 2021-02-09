<template>
  <div>
    <h3>Targets hit : {{ count }}</h3>
    <div class="box" id="board" v-on:click="missClick">
      <div id="target" v-on:click="handleClick">
        <img src="./bullseye.png" style="height:100px;width:100px" />
      </div>

      <h1 v-show="missed" id="game-over">GAME OVER</h1>
    </div>
    <q-btn
      push
      size="large"
      style="background: #ff414d; color: white"
      v-bind:disabled="disable"
      v-on:click="reset"
      label="Restart"
    />
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
      };
    },
    methods: {
      handleClick() {
        if (!this.missed) {
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
      },
      missClick(e) {
        if (e.target.id === "board") {
          this.disable = false;
          this.missed = true;
        }
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
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  h3 {
    font-size: 1.5em;
  }
</style>
