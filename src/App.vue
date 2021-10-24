<template>
  <div id="app" @mouseup="resetJoy">
    <div class="app-wrapper">
      <h1 class="q-pa-sm text-center hero-heading">
        Reaction Game
      </h1>
      <!--  -->
      <div id="PS-body" class="row q-mx-auto">
        <div class="ps-wrapper row justify-center">
          <div id="L-set">
            <div id="L-joystick">
              <div
                id="L-joystick-pad"
                @mousedown="startMove"
                @mousemove="moveAround"
                :style="{
                  transform: 'translate(' + joyPosX + 'px, ' + joyPosY + 'px)',
                }"
              ></div>
            </div>

            <div class="btn-set">
              <ColorButton icon="change_history" color="yellow" :open="open" />
              <ColorButton icon="crop_square" color="green" :open="open" />
              <ColorButton
                icon="radio_button_unchecked"
                color="red"
                :open="open"
              />
              <ColorButton icon="close" color="blue" :open="open" />
            </div>
          </div>

          <div
            class="back-screen"
            :class="[open === null ? '' : open ? 'pspStart' : 'pspClose']"
          >
            <!-- rotateX(' +
                  -joyPosY / 10 +
                  'deg) rotateY(' +
                  joyPosX / 10 +
                  'deg)  -->
            <div
              class="select-screen row"
              :style="{
                transform:
                  'translate(' + joyPosX / 3 + 'px,' + joyPosY / 4 + 'px)',
              }"
              v-if="open && !reflexMode && !aimTrainerMode"
            >
              <div
                class="option-select column justify-evenly items-center text-center"
              >
                <div class="info-text">
                  <h2>
                    How to Play?
                  </h2>
                  <h5>
                    Hover over each button to know its function.
                  </h5>
                </div>

                <div class="info-text">
                  <h6>
                    <q-icon
                      :name="infoBtn"
                      padding="0"
                      class="q-pa-sm"
                      size="md"
                    />
                    {{ infoText }}
                  </h6>
                  <!-- <h6>Tip - Move joystick to tilt the screen</h6> -->
                </div>
              </div>
            </div>

            <div class="mid-screen" v-if="reflexMode || aimTrainerMode">
              <Reflex v-show="reflexMode" ref="reflexMode" />
              <AimTrainer v-show="aimTrainerMode" ref="aimTrainerMode" />
            </div>
          </div>

          <div id="R-set">
            <div class="btn-set">
              <ArrowButton icon="play_arrow" angle="270" :open="open" />
              <ArrowButton icon="play_arrow" angle="180" :open="open" />
              <ArrowButton icon="play_arrow" angle="0" :open="open" />
              <ArrowButton icon="play_arrow" angle="90" :open="open" />
              <div class="center-arrow"></div>
            </div>

            <div class="btn-set">
              <q-btn
                push
                round
                padding="0"
                :class="open && 'text-white'"
                :icon="
                  !this.reflexMode && !this.aimTrainerMode
                    ? 'home'
                    : this.reflexMode
                    ? 'timer'
                    : 'track_changes'
                "
                @click="switchModes"
                @mouseenter="showData"
              />
              <q-btn
                push
                round
                padding="0"
                :class="
                  (this.reflexMode || this.aimTrainerMode) && 'text-white'
                "
                icon="play_arrow"
                @click="startGame"
                @mouseenter="showData"
              />
              <q-btn
                push
                round
                padding="0"
                :class="
                  (this.reflexMode || this.aimTrainerMode) && 'text-white'
                "
                icon="replay"
                @click="resetGame"
                @mouseenter="showData"
              />
              <q-btn
                push
                round
                padding="0"
                :class="open && 'text-white'"
                icon="power_settings_new"
                @click="powerSwitch"
                @mouseenter="showData"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="text-center q-pa-md footer-text">
        "The fastest possible conscious human reactions are around 0.15 s, but
        most are around 0.2 s. Unconscious, or reflex, actions are much faster,
        around 0.08 s because the signal doesn't have to go via the brain."
        <br />
        Made By - qUB3r
      </div>
    </div>
  </div>
</template>

<script>
  import ColorButton from "./components/ColorButton";
  import ArrowButton from "./components/ArrowButton";
  import Reflex from "./components/Reflex";
  import AimTrainer from "./components/AimTrainer";

  export default {
    name: "App",
    components: {
      Reflex,
      AimTrainer,
      ColorButton,
      ArrowButton,
    },
    props: {},
    data() {
      return {
        reflexMode: false,
        aimTrainerMode: false,
        gameBegin: true,
        currRef: null,
        joyPosX: null,
        joyPosY: null,
        move: false,
        open: null,
        infoBtn: "",
        infoText: "",
      };
    },
    methods: {
      showData(e) {
        // console.log(e.target.innerText);
        this.infoBtn = e.target.innerText;
        switch (this.infoBtn) {
          case "home":
            this.infoText = "Switch between Game Modes";
            break;
          case "play_arrow":
            this.infoText = "Start Game";
            break;
          case "power_settings_new":
            this.infoText = "Power On/Off";
            break;
          case "replay":
            this.infoText = "Reset Game";
            break;
          case "change_history":
            this.infoText = "Yellow Theme";
            break;
          case "radio_button_unchecked":
            this.infoText = "Red Theme";
            break;
          case "close":
            this.infoText = "Blue Theme";
            break;
          case "crop_square":
            this.infoText = "Green Theme";
            break;
          default:
            break;
        }
      },
      switchModes() {
        if (this.open) {
          if (!this.reflexMode && !this.aimTrainerMode)
            this.reflexMode = !this.reflexMode;
          else if (this.reflexMode && !this.aimTrainerMode) {
            this.reflexMode = !this.reflexMode;
            this.aimTrainerMode = !this.aimTrainerMode;
          } else {
            this.aimTrainerMode = !this.aimTrainerMode;
          }
        }
      },
      startGame() {
        (this.reflexMode || this.aimTrainerMode) &&
          this.$refs[
            `${this.reflexMode ? "reflexMode" : "aimTrainerMode"}`
          ].reactionTimer();
      },
      resetGame() {
        (this.reflexMode || this.aimTrainerMode) &&
          this.$refs[
            `${this.reflexMode ? "reflexMode" : "aimTrainerMode"}`
          ].reset();
      },
      changeColor(color) {
        if (color === "red" && this.open) {
          document.getElementById("L-set").style.backgroundColor = "#F44336";
          document.getElementById("R-set").style.backgroundColor = "#F44336";
        } else if (color === "green" && this.open) {
          document.getElementById("L-set").style.backgroundColor = "#00C853";
          document.getElementById("R-set").style.backgroundColor = "#00C853";
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
        this.reflexMode = false;
        this.aimTrainerMode = false;
        this.gameBegin = true;
        document.getElementById("L-set").style.backgroundColor = "#272727";
        document.getElementById("R-set").style.backgroundColor = "#272727";
      },
      showReflexMode() {
        if (this.open) {
          this.reflexMode = true;
          this.aimTrainerMode = false;
          this.gameBegin = false;
        }
      },
      showAimTrainerMode() {
        if (this.open) {
          this.aimTrainerMode = true;
          this.reflexMode = false;
          this.gameBegin = false;
        }
      },
      moveAround(e) {
        if (this.move) {
          let rect = document
            .getElementById("L-joystick")
            .getBoundingClientRect();
          let rectLStick = document
            .getElementById("L-joystick-pad")
            .getBoundingClientRect();
          let maxW = rect.width / 2 - rectLStick.width / 2;
          let maxH = rect.height / 2 - rectLStick.height / 2;
          this.joyPosX = e.clientX - (rect.left + rect.width / 2);
          this.joyPosY = e.clientY - (rect.top + rect.height / 2);

          this.joyPosX = Math.min(2 * maxW, Math.max(this.joyPosX, -2 * maxW));
          this.joyPosY = Math.min(2 * maxH, Math.max(this.joyPosY, -2 * maxH));
          // this.joyPosY = this.joyPosY / 2;
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

<style lang="scss" scoped>
  button {
    color: #474747;
    background-color: #232323;
  }

  #app {
    height: 100%;
    background-image: url("https://www.transparenttextures.com/patterns/inspiration-geometry.png");
    display: grid;
    place-items: center;
  }

  .app-wrapper {
    width: 92%;
    perspective: 1000px;
  }

  .hero-heading {
    font-family: "Faster One", cursive;
    animation: colorChanger 5s ease-in-out infinite alternate;
  }

  @keyframes colorChanger {
    0% {
      color: #f44336;
    }
    33% {
      color: #ffeb3b;
    }
    66% {
      color: #2196f3;
    }
    100% {
      color: #4caf50;
    }
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
  }

  .btn-set {
    position: relative;
    width: 70%;
    aspect-ratio: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      ". top ."
      "left . right"
      ". bottom .";

    $position: top, left, right, bottom;

    @each $item in $position {
      $i: index($position, $item);
      button:nth-of-type(#{$i}) {
        grid-area: $item;
        z-index: 999;
      }
    }

    div:nth-of-type(1) {
      position: absolute;
      inset: 0;
      margin: auto;
      background-color: #232323;
      z-index: 0;
      height: 35%;
      width: 34%;
    }
  }

  #L-joystick {
    background-color: #393e46;
    width: 70%;
    aspect-ratio: 1;
    border-radius: 50%;
    display: grid;
    place-items: center;
  }

  #L-joystick-pad {
    width: 85%;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: #232323;
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
    position: absolute;
    inset: 0;
    margin: auto;
  }

  .back-screen {
    background-color: #838383;
    width: 0;
    aspect-ratio: 2;
    // display: grid;
    // place-items: center;
    transform-origin: center;
    perspective: 1000px;
    position: relative;
  }

  .pspStart {
    animation: anim 0.5s ease-in-out forwards;
  }

  .pspClose {
    animation: revanim 0.5s ease-in-out forwards;
  }

  .option-select {
    transform: scale(0);
    width: 100%;
    height: 100%;
    border-radius: 20px;
    animation: popout ease-in-out 0.7s forwards;
  }

  .info-text {
    font-family: "Josefin Sans", sans-serif;
    opacity: 0.3;
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
    position: absolute;
    inset: 0;
    margin: auto;
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
    font-size: 13px;
    color: #b3b3b3;
  }
</style>
