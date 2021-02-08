<template>
  <div>
    <div class="box" id="board" v-on:click="missClick">
      <h3>Targets hit : {{ count }}</h3>
      <div id="target" v-on:click="handleClick"></div>
      <button v-bind:disabled="disable" v-on:click="reset">Restart</button>
      <h1 v-show="missed">GAME OVER</h1>
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
    height: 600px;
  }

  #target {
    height: 100px;
    width: 100px;
    border-radius: 50px;
    background-color: red;
    position: absolute;
  }

  h3 {
    font-family: "Ubuntu", sans-serif;
    padding: 0.3em;
  }
</style>
