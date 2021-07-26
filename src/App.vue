<template>
  <div
    id="app"
    @mouseup="resetJoy"
    :style="dark ? { backgroundColor: 'black' } : { backgroundColor: 'white' }"
  >
    <div class="wrapper">
      <h1
        class="q-pa-sm text-center"
        id="hero-heading"
        :style="dark ? { color: 'white' } : { color: 'black' }"
      >
        Reaction Test
      </h1>

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
          <div
            id="L-set"
            :style="
              !dark
                ? { backgroundColor: '#272727' }
                : { backgroundColor: '#EEEEEE' }
            "
          >
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
                padding="0"
                icon="change_history"
                style="color: #474747; backgroundColor: #B0BEC5"
                :class="open && 'text-yellow'"
                v-on:click="() => this.changeColor('yellow')"
              />
              <q-btn
                push
                round
                id="btn-left"
                padding="0"
                icon="crop_square"
                style="color: #474747; backgroundColor: #B0BEC5"
                :class="open && 'text-green'"
                v-on:click="() => this.changeColor('green')"
              />
              <q-btn
                push
                round
                id="btn-right"
                padding="0"
                icon="radio_button_unchecked"
                style="color: #474747; backgroundColor: #B0BEC5"
                :class="open && 'text-red'"
                v-on:click="() => this.changeColor('red')"
              />
              <q-btn
                push
                round
                id="btn-bottom"
                padding="0"
                icon="close"
                style="color: #474747; backgroundColor: #B0BEC5"
                :class="open && 'text-blue'"
                v-on:click="() => this.changeColor('blue')"
              />
            </div>
          </div>
          <div
            class="back-screen"
            v-bind:class="[open === null ? '' : open ? 'pspStart' : 'pspClose']"
          >
            <div
              class="select-screen row"
              v-if="open && !targetShow && !reflexShow"
            >
              <div class="col-6 target-div" @click="targetEnable">
                <div class="text-center">
                  <q-icon name="timer" style="font-size:5rem" />
                  <h3>Target</h3>
                </div>
              </div>
              <div class="col-6 reflex-div" @click="reflexEnable">
                <div class="text-center">
                  <q-icon name="track_changes" style="font-size:5rem" />
                  <h3>Reflex</h3>
                </div>
              </div>
            </div>

            <div class="mid-screen" v-if="targetShow || reflexShow">
              <Target v-show="targetShow" ref="myTarget" />
              <Reflex v-show="reflexShow" ref="myReflex" />
            </div>
          </div>
          <div
            id="R-set"
            :style="
              !dark
                ? { backgroundColor: '#272727' }
                : { backgroundColor: '#EEEEEE' }
            "
          >
            <div id="arrow-buttons">
              <q-btn flat class="top-arrow" padding="0" style="height:0">
                <svg
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="24.7059"
                    height="23.0611"
                    rx="5"
                    transform="matrix(1 0 0 -1 2.64706 23.0611)"
                    fill="#B0BEC5"
                  />
                  <path
                    d="M14.3839 29.5181C14.7458 29.8012 15.2542 29.8012 15.6161 29.5181L25.705 21.6264C26.4539 21.0406 26.0397 19.8387 25.0889 19.8387H4.9111C3.96034 19.8387 3.54611 21.0406 4.29499 21.6264L14.3839 29.5181Z"
                    fill="#B0BEC5"
                  />
                  <path
                    d="M14.2223 7.96217C14.6225 7.467 15.3775 7.467 15.7777 7.96217L19.7458 12.8714C20.2744 13.5253 19.8089 14.5 18.9681 14.5H11.0319C10.1911 14.5 9.72565 13.5253 10.2542 12.8714L14.2223 7.96217Z"
                    fill="#474747"
                  />
                </svg>
              </q-btn>

              <q-btn flat class="left-arrow" padding="0" style="height:0">
                <svg
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="24.7059"
                    height="23.0611"
                    rx="5"
                    transform="matrix(0 -1 -1 0 23.0611 27.3529)"
                    fill="#B0BEC5"
                  />
                  <path
                    d="M29.5181 15.6161C29.8012 15.2542 29.8012 14.7458 29.5181 14.3839L21.6264 4.29499C21.0406 3.54611 19.8387 3.96034 19.8387 4.91111V25.0889C19.8387 26.0397 21.0406 26.4539 21.6264 25.705L29.5181 15.6161Z"
                    fill="#B0BEC5"
                  />
                  <path
                    d="M7.96217 15.7777C7.467 15.3775 7.467 14.6225 7.96217 14.2223L12.8714 10.2542C13.5253 9.72565 14.5 10.1911 14.5 11.0319V18.9681C14.5 19.8089 13.5253 20.2744 12.8714 19.7458L7.96217 15.7777Z"
                    fill="#474747"
                  />
                </svg>
              </q-btn>

              <q-btn flat class="right-arrow" padding="0" style="height:0">
                <svg
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="6.9389"
                    y="27.3529"
                    width="24.7059"
                    height="23.0611"
                    rx="5"
                    transform="rotate(-90 6.9389 27.3529)"
                    fill="#B0BEC5"
                  />
                  <path
                    d="M0.481936 15.6161C0.19881 15.2542 0.19881 14.7458 0.481937 14.3839L8.37364 4.29499C8.95942 3.54611 10.1613 3.96034 10.1613 4.91111L10.1613 25.0889C10.1613 26.0397 8.95942 26.4539 8.37364 25.705L0.481936 15.6161Z"
                    fill="#B0BEC5"
                  />
                  <path
                    d="M22.0378 15.7777C22.533 15.3775 22.533 14.6225 22.0378 14.2223L17.1286 10.2542C16.4747 9.72565 15.5 10.1911 15.5 11.0319V18.9681C15.5 19.8089 16.4747 20.2744 17.1286 19.7458L22.0378 15.7777Z"
                    fill="#474747"
                  />
                </svg>
              </q-btn>

              <q-btn flat class="down-arrow" padding="0" style="height:0">
                <svg
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2.64706"
                    y="6.9389"
                    width="24.7059"
                    height="23.0611"
                    rx="5"
                    fill="#B0BEC5"
                  />
                  <path
                    d="M14.3839 0.481933C14.7458 0.198806 15.2542 0.198806 15.6161 0.481933L25.705 8.37363C26.4539 8.95942 26.0397 10.1613 25.0889 10.1613H4.9111C3.96034 10.1613 3.54611 8.95942 4.29499 8.37363L14.3839 0.481933Z"
                    fill="#B0BEC5"
                  />
                  <path
                    d="M14.2223 22.0378C14.6225 22.533 15.3775 22.533 15.7777 22.0378L19.7458 17.1286C20.2744 16.4747 19.8089 15.5 18.9681 15.5H11.0319C10.1911 15.5 9.72565 16.4747 10.2542 17.1286L14.2223 22.0378Z"
                    fill="#474747"
                  />
                </svg>
              </q-btn>
            </div>
            <div id="start-stop-buttons">
              <q-btn
                push
                round
                :icon="this.dark ? `dark_mode` : `light_mode`"
                class="light-btn"
                padding="0"
                style="color: #474747; backgroundColor: #B0BEC5"
                v-on:click="() => open && (this.dark = !this.dark)"
                :style="open && { color: '#ffffff' }"
              />
              <q-btn
                push
                round
                v-bind:style="!gameBegin && { color: '#ffffff' }"
                v-on:click="
                  () => {
                    !this.gameBegin &&
                      this.$refs[
                        `${targetShow ? 'myTarget' : 'myReflex'}`
                      ].countdown();
                  }
                "
                icon="play_arrow"
                class="start-btn"
                padding="0"
                style="color: #474747; backgroundColor: #B0BEC5"
              />
              <q-btn
                push
                round
                v-bind:style="!gameBegin && { color: '#ffffff' }"
                v-on:click="
                  () => {
                    this.reflexShow = false;
                    this.targetShow = false;
                    !this.gameBegin &&
                      this.$refs[
                        `${targetShow ? 'myTarget' : 'myReflex'}`
                      ].reset();
                  }
                "
                icon="replay"
                class="stop-btn"
                padding="0"
                style="color: #474747; backgroundColor: #B0BEC5"
              />
              <q-btn
                push
                round
                icon="power_settings_new"
                class="power-btn"
                padding="0"
                style="color: #474747; backgroundColor: #B0BEC5"
                v-bind:style="open && { color: '#ffffff' }"
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
        dark: false,
      };
    },
    methods: {
      changeColor(color) {
        if (color === "red" && this.open) {
          document.getElementById("L-set").style.backgroundColor = "#F44336";
          document.getElementById("R-set").style.backgroundColor = "#F44336";
        } else if (color === "green" && this.open) {
          document.getElementById("L-set").style.backgroundColor = "#4CAF50";
          document.getElementById("R-set").style.backgroundColor = "#4CAF50";
        } else if (color === "blue" && this.open) {
          document.getElementById("L-set").style.backgroundColor = "#2196F3";
          document.getElementById("R-set").style.backgroundColor = "#2196F3";
        } else if (color === "yellow" && this.open) {
          document.getElementById("L-set").style.backgroundColor = "#FFEB3B";
          document.getElementById("R-set").style.backgroundColor = "#FFEB3B";
        } else {
          null;
        }
      },
      powerSwitch() {
        this.open === null ? (this.open = true) : (this.open = !this.open);
        this.targetShow = false;
        this.reflexShow = false;
        this.gameBegin = true;
      },
      targetEnable() {
        if (this.open) {
          this.targetShow = true;
          this.reflexShow = false;
          this.gameBegin = false;
        }
      },
      reflexEnable() {
        if (this.open) {
          this.reflexShow = true;
          this.targetShow = false;
          this.gameBegin = false;
        }
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

  #arrow-buttons {
    width: 70%;
    aspect-ratio: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  .top-arrow {
    grid-column: 2/3;
    margin-top: 10px;
  }

  .left-arrow {
    grid-row: 2;
    margin-left: 10px;
    margin-right: -10px;
  }

  .right-arrow {
    grid-row: 2;
    grid-column: 3/3;
    margin-left: -10px;
    margin-right: 10px;
  }

  .down-arrow {
    grid-row: 3;
    grid-column: 2/3;
    margin-top: -10px;
  }

  #L-joystick {
    background-color: #9fa6b3;
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
    background-color: #b0bec5;
    box-shadow: 0 0 4px black;
  }

  #R-set {
    background-color: #272727;
    width: 15%;
    border-radius: 0 6em 6em 0;
    display: grid;
    place-items: center;
  }

  .select-screen {
    background-color: #fafaf6;
    width: 98%;
    height: 95%;
    border-radius: 20px;
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

  .target-div,
  .reflex-div {
    display: grid;
    place-items: center;
    transform: scale(0);
    opacity: 0.5;
    border-radius: 20px;
    animation-name: popout;
    animation-timing-function: ease-in-out;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    animation-duration: 0.5s;
  }

  .target-div:hover,
  .reflex-div:hover {
    cursor: pointer;
    opacity: 1;
  }

  @keyframes popout {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
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
