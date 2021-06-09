<template>
  <div id="app" class="column items-center">
    <h2 class="q-pa-md">Reaction Test</h2>

    <div id="PS-body" class="row">
      <div id="L-set">
        <div id="L-joystick">
          <div id="L-joystick-pad"></div>
        </div>
        <div id="play-buttons" class="column justify-between text-center">
          <div id="power-button" class="q-mx-auto text-primary"></div>
          <div class="row justify-between">
            <div id="power-button"></div>
            <div id="power-button"></div>
          </div>
          <div id="power-button" class="q-mx-auto"></div>
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
            style="background: white; color: #EAEAEA"
            label="Target"
            size="medium"
            v-on:click="targetEnable"
          />
          <q-btn
            push
            style="background: white; color: #EAEAEA"
            label="Reflex"
            size="medium"
            v-on:click="reflexEnable"
          />
        </div>
        <div id="start-stop-buttons">
          <q-btn
            push
            round
            v-on:click="
              () => {
                this.$refs[
                  `${targetShow ? 'myTarget' : 'myReflex'}`
                ].countdown();
              }
            "
            icon="play_arrow"
            class="q-mx-md"
            style="background: white"
          />
          <q-btn
            push
            round
            v-on:click="
              () => {
                this.$refs[`${targetShow ? 'myTarget' : 'myReflex'}`].reset();
              }
            "
            icon="replay"
            class="q-mx-md"
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
        currRef: null,
      };
    },
    methods: {
      targetEnable() {
        this.targetShow = true;
        this.reflexShow = false;
      },
      reflexEnable() {
        this.reflexShow = true;
        this.targetShow = false;
      },
    },
  };
</script>

<style scoped>
  #app {
    height: 100%;
    width: 100%;
  }

  h2 {
    font-family: "Advent Pro", sans-serif;
  }

  #PS-body {
    width: 85%;
    aspect-ratio: 2.23;
  }

  #L-set {
    background-color: #fcff52;
    height: 100%;
    width: 13.5%;
    border-radius: 100px 0 0 100px;
    display: grid;
    place-items: center;
    opacity: 0.9;
  }

  #power-button {
    background-color: white;
    height: 32px;
    width: 32px;
    border-radius: 16px;
  }

  #play-buttons {
    height: 100px;
    width: 100px;
  }

  #L-joystick {
    background-color: rgb(218, 218, 218);
    height: 100px;
    width: 100px;

    border-radius: 50px;
    display: grid;
    place-items: center;
  }

  #L-joystick-pad {
    background-color: #f5f5f5;
    height: 80px;
    width: 80px;
    border-radius: 40px;
  }

  #R-set {
    background-color: #fcff52;
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
    background-color: rgb(206, 206, 206);
    width: 95%;
    aspect-ratio: 1.63;
    border-radius: 30px;
  }
</style>
