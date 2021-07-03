<template>
  <div id="app" @mouseup="resetJoy">
    <div class="wrapper">
      <h1 class="q-pa-sm text-center">Reaction Test</h1>

      <div
        id="PS-body"
        class="row q-mx-auto"
        v-bind:style="{
          transform:
            'rotateX(' +
            -joyPosY / 2 +
            'deg) rotateY(' +
            joyPosX / 4.5 +
            'deg) ',
        }"
      >
        <div class="ps-wrapper row justify-center">
          <div id="L-set">
            <div id="L-joystick" @mousedown="startMove" @mousemove="moveAround">
              <div
                id="L-joystick-pad"
                v-bind:style="{
                  transform: 'translate(' + joyPosX + 'px, ' + joyPosY + 'px)',
                }"
              ></div>
            </div>

            <div id="play-buttons">
              <q-btn
                push
                round
                id="btn-top"
                padding="none"
                icon="change_history"
                class="text-yellow light-btn"
              />
              <q-btn
                push
                round
                id="btn-left"
                padding="0"
                icon="crop_square"
                class="text-green light-btn"
              />
              <q-btn
                push
                round
                id="btn-right"
                padding="0"
                icon="radio_button_unchecked"
                class="text-red light-btn"
              />
              <q-btn
                push
                round
                id="btn-bottom"
                padding="0"
                icon="close"
                class="text-blue light-btn"
              />
            </div>
          </div>
          <div
            class="back-screen"
            v-bind:class="[open === null ? '' : open ? 'pspStart' : 'pspClose']"
          >
            <div class="mid-screen">
              <Target v-show="targetShow" ref="myTarget" />
              <Reflex v-show="reflexShow" ref="myReflex" />
            </div>
          </div>
          <div id="R-set">
            <div id="mode-buttons" class="text-center">
              <q-btn
                rounded
                style="color: #474747"
                icon="speed"
                v-on:click="targetEnable"
                v-bind:disabled="!open"
                v-bind:style="targetShow && { color: '#ebebeb' }"
                class="q-my-sm"
              />
              <q-btn
                rounded
                style="color: #474747"
                icon="track_changes"
                v-on:click="reflexEnable"
                v-bind:disabled="!open"
                v-bind:style="reflexShow && { color: '#ebebeb' }"
                class="q-my-sm"
              />
            </div>
            <div id="start-stop-buttons">
              <!-- //style="color: #FFEB3B" -->
              <q-btn
                push
                round
                icon="light_mode"
                class="light-btn"
                padding="0"
                style="color: #444444"
              />
              <q-btn
                push
                round
                v-bind:disabled="gameBegin"
                v-bind:style="!gameBegin && { color: '#4CAF50' }"
                v-on:click="
                  () => {
                    this.$refs[
                      `${targetShow ? 'myTarget' : 'myReflex'}`
                    ].countdown();
                  }
                "
                icon="play_arrow"
                class="start-btn"
                padding="0"
                style="color: #474747"
              />
              <q-btn
                push
                round
                v-bind:disabled="gameBegin"
                v-bind:style="!gameBegin && { color: '#F44336' }"
                v-on:click="
                  () => {
                    this.$refs[
                      `${targetShow ? 'myTarget' : 'myReflex'}`
                    ].reset();
                  }
                "
                icon="replay"
                class="stop-btn"
                padding="0"
                style="color: #474747"
              />
              <q-btn
                push
                round
                icon="power_settings_new"
                class="power-btn"
                padding="0"
                style="color: #474747"
                v-bind:style="open && { color: '#2196F3' }"
                v-on:click="powerSwitch"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="text-center q-pa-md text-grey footer-text">
        "The most popular hack will undoubtedly remain the Pandora’s Battery.
        This hacking method allows you to convert your PSP battery into a
        bootable one thus able to run Windows, Mac and even NES games."
        <br />
        Made By - qUB3r
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
        open: null,
      };
    },
    methods: {
      powerSwitch() {
        this.open === null ? (this.open = true) : (this.open = !this.open);
        this.targetShow = false;
        this.reflexShow = false;
        this.gameBegin = true;
      },
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
    perspective: 1000px;
    height: 100%;
    background-image: url("https://www.transparenttextures.com/patterns/inspiration-geometry.png");
    /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you!*/
    display: grid;
    place-items: center;
  }

  .wrapper {
    width: 92%;
  }

  h1 {
    font-family: "Faster One", cursive;
  }

  #PS-body {
    width: 95%;
    aspect-ratio: 2.6;
  }

  .ps-wrapper {
    width: 100%;
  }

  #L-set {
    background-color: #272727;
    width: 15%;
    border-radius: 6em 0 0 6em;
    display: grid;
    place-items: center;
    perspective: 1000px;
  }

  #play-buttons {
    width: 70%;
    aspect-ratio: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      ". top ."
      "left . right"
      ". bottom .";
  }

  #btn-top {
    grid-area: top;
  }

  #btn-left {
    grid-area: left;
  }

  #btn-right {
    grid-area: right;
  }

  #btn-bottom {
    grid-area: bottom;
  }

  #start-stop-buttons {
    width: 70%;
    aspect-ratio: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      ". top ."
      "left . right"
      ". mid .";
  }

  .start-btn {
    grid-area: left;
  }

  .stop-btn {
    grid-area: right;
  }

  .power-btn {
    grid-area: mid;
  }

  .light-btn {
    grid-area: top;
  }

  #mode-buttons {
    width: 70%;
  }

  #mode-buttons button {
    width: 95%;
    aspect-ratio: 2;
    padding: 0;
    font-size: 1.3em;
  }

  #L-joystick {
    background-color: #3a3a3a;
    width: 70%;
    aspect-ratio: 1;
    border-radius: 80px;
    display: grid;
    place-items: center;
  }

  #L-joystick-pad {
    width: 85%;
    aspect-ratio: 1;
    border-radius: 80px;
    background-color: #686d76;
  }

  #R-set {
    background-color: #272727;
    width: 15%;
    border-radius: 0 6em 6em 0;
    display: grid;
    place-items: center;
  }

  .back-screen {
    background-color: #838383;
    width: 0;
    aspect-ratio: 2;
    display: grid;
    place-items: center;
    transform-origin: center;
  }

  .pspStart {
    animation: anim 0.5s ease-in-out forwards;
  }

  .pspClose {
    animation: revanim 0.5s ease-in-out forwards;
  }

  .mid-screen {
    background-color: #fafaf6;
    width: 98%;
    height: 95%;
    border-radius: 20px;
  }

  @keyframes anim {
    from {
      width: 0;
    }
    to {
      width: 70%;
    }
  }

  @keyframes revanim {
    from {
      width: 70%;
    }
    to {
      width: 0;
    }
  }

  .footer-text {
    font-family: "Architects Daughter", cursive;
  }
</style>
