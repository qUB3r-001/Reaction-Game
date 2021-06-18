<template>
  <div id="app" @mouseup="resetJoy">
    <div class="wrapper">
      <h1 class="q-pa-sm text-center">Reaction Test</h1>

      <div></div>
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
              />
              <q-btn push round id="btn-left" padding="0" icon="crop_square" />
              <q-btn
                push
                round
                id="btn-right"
                padding="0"
                icon="radio_button_unchecked"
              />
              <q-btn push round id="btn-bottom" padding="0" icon="close" />
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
                rounded
                style="background: #fafaf6;color: grey"
                label="Target"
                v-on:click="targetEnable"
                v-bind:style="
                  targetShow && {
                    background: '#50D890',
                    boxShadow: '0 0 20px #50D890',
                    color: 'white',
                  }
                "
                class="q-ma-md"
                size="lg"
              />
              <q-btn
                rounded
                style="background: #fafaf6;color: grey"
                label="Reflex"
                v-on:click="reflexEnable"
                v-bind:style="
                  reflexShow && {
                    background: '#4F98CA',
                    boxShadow: '0 0 20px #4F98CA',
                    color: 'white',
                  }
                "
                class="q-ma-md"
                size="lg"
              />
            </div>
            <div id="start-stop-buttons">
              <q-btn
                push
                round
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
                v-bind:disabled="gameBegin"
                v-on:click="
                  () => {
                    this.$refs[
                      `${targetShow ? 'myTarget' : 'myReflex'}`
                    ].reset();
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
      <div class="text-center q-pa-md text-grey">
        "The Sony PSP was hackable allowing users to download any firmware
        including Windows, NES and even PS3"
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
    perspective: 1000px;
    height: 100%;
    background-color: #f1f1f1;
    background-image: url("https://www.transparenttextures.com/patterns/inspiration-geometry.png");
    /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
    display: grid;
    place-items: center;
  }

  .wrapper {
    width: 90%;
  }

  h1 {
    font-family: "Faster One", cursive;
  }

  #PS-body {
    width: 85%;
    aspect-ratio: 2.23;
  }

  .ps-wrapper {
    width: 100%;
  }

  #L-set {
    background-color: #272727;
    width: 14%;
    border-radius: 100px 0 0 100px;
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
    background-color: #ffffff;
    grid-area: top;
  }

  #btn-left {
    background-color: #ffffff;
    grid-area: left;
  }

  #btn-right {
    background-color: #ffffff;
    grid-area: right;
  }

  #btn-bottom {
    background-color: #ffffff;
    grid-area: bottom;
  }

  #L-joystick {
    background-color: rgb(218, 218, 218);
    width: 70%;
    aspect-ratio: 1;
    border-radius: 60px;
    display: grid;
    place-items: center;
  }

  #L-joystick-pad {
    width: 85%;
    aspect-ratio: 1;
    border-radius: 50px;
    background-color: white;
  }

  #R-set {
    background-color: #272727;
    width: 14%;
    border-radius: 0 100px 100px 0;
    display: grid;
    place-items: center;
  }

  #back-screen {
    background-color: #838383;
    width: 0;
    aspect-ratio: 1.63;
    display: grid;
    place-items: center;
    transform-origin: center;
    animation: anim 1.4s ease-in-out forwards;
  }

  #mid-screen {
    background-color: #fafaf6;
    width: 98%;
    height: 95%;
    border-radius: 20px;
    animation: anim1 1.4s ease-in-out forwards;
  }

  @keyframes anim {
    from {
      width: 0;
    }
    to {
      width: 72%;
    }
  }

  @keyframes anim1 {
    from {
      width: 0;
    }
    to {
      width: 98%;
    }
  }
</style>
