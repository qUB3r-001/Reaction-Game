<template>
  <div class="gameplay-bg justify-center">
    <div id="clickable-area" @click="targetClick">
      <div id="target-div" v-if="!over && start">
        <div id="target" v-if="start">
          <div id="target-inner-1">
            <div id="target-inner-2">
              <div id="target-inner-3"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="gameplay-screen column justify-center">
        <div
          class="column justify-evenly items-center"
          v-if="!start && !over"
          style="height: 100%; width: 100%"
        >
          <div class="info-text text-center">
            <h2>Aim Trainer</h2>
            <h5>
              Click on target as fast as possible before the time runs out!
            </h5>
          </div>
          <div class="info-text">
            <h5>Rules:</h5>
            <ul>
              <li>Innermost ring is of 10 points</li>
              <li>2nd - Innermost ring is of 5 points</li>
              <li>3rd - Innermost ring is of 2 points</li>
              <li>Outermost ring is of 1 points</li>
            </ul>
          </div>
        </div>

        <div class="info-text text-center" v-else-if="start && !over">
          <h2>
            {{ startTimerValue }}
          </h2>
        </div>

        <div v-else class="info-text column justify-around items-center">
          <h2 class="q-pa-md">Time Up!</h2>
          <h5>
            Total Points :
            {{ hits + hitsInner1 * 2 + hitsInner2 * 5 + hitsInner3 * 10 }}
          </h5>
          <h5>
            Targets hit : {{ hits + hitsInner1 + hitsInner2 + hitsInner3 }}
          </h5>

          <h5>Missed Target : {{ miss }}</h5>

          <h5>
            Accuracy :
            {{
              Math.round(
                (100 * (hits + hitsInner1 + hitsInner2 + hitsInner3)) /
                  (hits + hitsInner1 + hitsInner2 + hitsInner3 + miss)
              )
            }}%
          </h5>
          <h5>
            Average Target Click Time :
            {{
              (30 / (hits + hitsInner1 + hitsInner2 + hitsInner3)).toFixed(2)
            }}s
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Reflex",
    data() {
      return {
        hits: 0,
        hitsInner1: 0,
        hitsInner2: 0,
        hitsInner3: 0,
        miss: 0,
        start: false,
        over: false,
        countdownTimer: null,
        startTimerValue: 30,
      };
    },
    methods: {
      targetClick(e) {
        let idClicked = e.target.id;
        if (
          this.start &&
          !this.over &&
          (idClicked === "target" ||
            idClicked === "target-inner-1" ||
            idClicked === "target-inner-2" ||
            idClicked === "target-inner-3")
        ) {
          let xPos = Math.floor(Math.random() * 90);
          let yPos = Math.floor(Math.random() * 82);
          document
            .getElementById("target-div")
            .style.setProperty("top", yPos + "%");
          document
            .getElementById("target-div")
            .style.setProperty("left", xPos + "%");
          if (idClicked === "target") this.hits++;
          else if (idClicked === "target-inner-1") this.hitsInner1++;
          else if (idClicked === "target-inner-2") this.hitsInner2++;
          else this.hitsInner3++;
        } else if (this.start && !this.over && idClicked === "clickable-area") {
          this.miss++;
        }
      },
      reset() {
        this.startTimerValue = 30;
        this.hits = 0;
        this.hitsInner1 = 0;
        this.miss = 0;
        this.start = false;
        this.over = false;
        clearInterval(this.countdownTimer);
      },
      reactionTimer() {
        this.countdownTimer = setInterval(() => {
          this.startTimerValue--;

          if (this.startTimerValue <= 0) {
            this.over = true;
          }
        }, 1000);
        this.start = true;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .gameplay-bg {
    width: 100%;
    height: 100%;
    animation: popout ease-in-out 0.7s forwards;
  }

  @keyframes popout {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  .info-text {
    font-family: "Josefin Sans", sans-serif;
    opacity: 0.3;

    h2 {
      user-select: none;
    }
  }

  #clickable-area {
    position: relative;
    height: 100%;
    border-radius: 20px;
  }

  #target-div {
    height: 80px;
    width: 80px;
    border-radius: 40px;
    position: absolute;
    top: 2%;
    left: 1%;
    z-index: 10;
    transition: 0.1s;
  }

  #target {
    height: 80px;
    width: 80px;
    border-radius: 40px;
    background-color: red;
    display: grid;
    place-items: center;
  }

  #target-inner-1 {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    background-color: white;
    display: grid;
    place-items: center;
  }

  #target-inner-2 {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    background-color: red;
    display: grid;
    place-items: center;
  }

  #target-inner-3 {
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background-color: white;
  }

  .gameplay-screen {
    height: 100%;
    width: 100%;
    font-family: "Josefin Sans", sans-serif;
    position: relative;
    z-index: 9;

    h1 {
      opacity: 0.3;
    }
  }
</style>
