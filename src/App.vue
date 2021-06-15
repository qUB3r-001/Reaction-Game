<template>
  <div id="app" class="column justify-center items-center" @mouseup="resetJoy">
    <h2 class="q-pa-md">Reaction Test</h2>

    <div
      id="PS-body"
      class="row"
      v-bind:style="{
        transform:
          'rotateX(' + -joyPosY / 2 + 'deg) rotateY(' + joyPosX / 5 + 'deg) ',
      }"
    >
      <div id="L-set">
        <div id="L-joystick" @mousedown="startMove" @mousemove="moveAround">
          <div
            id="L-joystick-pad"
            v-bind:style="{
              transform: 'translate(' + joyPosX + 'px, ' + joyPosY + 'px)',
            }"
          ></div>
        </div>

        <div id="play-buttons" class="column justify-between text-center">
          <q-btn
            push
            round
            size="small"
            id="power-button"
            class="q-mx-auto"
            label="△"
          />
          <div class="row justify-between">
            <q-btn
              push
              round
              size="small"
              id="power-button"
              class="q-mx-auto"
              label="◻"
            />
            <q-btn
              push
              round
              size="small"
              id="power-button"
              class="q-mx-auto"
              label="o"
            />
          </div>
          <q-btn
            push
            round
            size="small"
            id="power-button"
            class="q-mx-auto"
            label="✕"
          />
        </div>
      </div>
      <div id="back-screen">
        <div id="mid-screen">
          <Target v-show="targetShow" ref="myTarget" />
          <Reflex v-show="reflexShow" ref="myReflex" />
        </div>
      </div>
      <div id="R-set">
        <div id="mode-buttons" class="text-center">
          <q-btn
            push
            rounded
            style="background: #fafaf6; color: #EAEAEA"
            label="Target"
            size="large"
            v-on:click="targetEnable"
            class="q-ma-md"
          />
          <q-btn
            push
            rounded
            style="background: #fafaf6; color: #EAEAEA"
            label="Reflex"
            size="large"
            v-on:click="reflexEnable"
            class="q-ma-md"
          />
        </div>
        <div id="start-stop-buttons">
          <q-btn
            push
            round
            size="large"
            v-bind:disabled="gameBegin"
            v-on:click="
              () => {
                this.$refs[
                  `${targetShow ? 'myTarget' : 'myReflex'}`
                ].countdown();
              }
            "
            icon="play_arrow"
            class="q-mx-sm text-grey"
            style="background: white"
          />
          <q-btn
            push
            round
            size="large"
            v-bind:disabled="gameBegin"
            v-on:click="
              () => {
                this.$refs[`${targetShow ? 'myTarget' : 'myReflex'}`].reset();
              }
            "
            icon="replay"
            class="q-mx-sm text-grey"
            style="background: white"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Target from "./components/Target";
  import Reflex from "./components/Reflex";

  export default {
    name: "App",
    components: {
      Target,
      Reflex,
    },
    props: {},
    data() {
      return {
        targetShow: false,
        reflexShow: false,
        gameBegin: true,
        currRef: null,
        joyPosX: null,
        joyPosY: null,
        move: false,
      };
    },
    methods: {
      targetEnable() {
        this.targetShow = true;
        this.reflexShow = false;
        this.gameBegin = false;
      },
      reflexEnable() {
        this.reflexShow = true;
        this.targetShow = false;
        this.gameBegin = false;
      },
      moveAround(e) {
        if (this.move) {
          let rect = e.target.getBoundingClientRect();
          this.joyPosX = Math.round(e.clientX - rect.left - 50) / 2;
          this.joyPosY = Math.round(e.clientY - rect.top - 50) / 2;
        } else {
          this.joyPosX = 0;
          this.joyPosY = 0;
        }
      },
      resetJoy() {
        this.move = false;
        this.joyPosX = 0;
        this.joyPosY = 0;
      },
      startMove(e) {
        e.preventDefault();
        this.move = true;
      },
    },
  };
</script>

<style scoped>
  #app {
    height: 100%;
    width: 100%;
    perspective: 1000px;
    transform-style: preserve-3d;
  }

  h2 {
    font-family: "Advent Pro", sans-serif;
  }

  #PS-body {
    width: 80%;
    aspect-ratio: 2.23;
    transition: 0.1s;
    transform: translateZ(0);
  }

  #L-set {
    background-color: #00d1ff;
    height: 100%;
    width: 13.5%;
    border-radius: 100px 0 0 100px;
    display: grid;
    place-items: center;
    opacity: 0.9;
    perspective: 1000px;
    transform-style: preserve-3d;
  }

  #play-buttons {
    width: 90%;
  }

  #power-button {
    background-color: #fafaf6;
  }

  #L-joystick-base {
    height: 120px;
    width: 120px;
    border-radius: 60px;
    display: grid;
    place-items: center;
  }

  #L-joystick {
    background-color: rgb(218, 218, 218);
    height: 120px;
    width: 120px;
    border-radius: 60px;
    display: grid;
    place-items: center;
  }

  #L-joystick-pad {
    background-color: #fafaf6;
    height: 100px;
    width: 100px;
    border-radius: 50px;
    transition: 0.1;
  }

  #R-set {
    background-color: #00d1ff;
    height: 100%;
    width: 13.5%;
    border-radius: 0 100px 100px 0;
    display: grid;
    place-items: center;
  }

  #back-screen {
    background-color: #383838;
    width: 73%;
    aspect-ratio: 1.63;
    display: grid;
    place-items: center;
  }

  #mid-screen {
    background-color: #fafaf6;
    width: 95%;
    aspect-ratio: 1.63;
    border-radius: 30px;
  }
</style>
