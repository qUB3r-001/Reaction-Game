<template>
  <div id="app" class="column items-center">
    <h2 class="q-pa-md">Reaction Test</h2>

    <div id="PS-body" class="row">
      <div id="L-set">
        <div id="L-joystick">
          <div id="L-joystick-pad"></div>
        </div>
        <div id="play-buttons"></div>
      </div>
      <div id="back-screen">
        <div id="mid-screen">
          <Target v-show="targetShow" />
          <Reflex v-show="reflexShow" />
        </div>
      </div>
      <div id="R-set">
        <div id="mode-buttons" class="text-center">
          <q-btn
            push
            color="secondary"
            label="Target"
            size="medium"
            v-on:click="targetEnable"
          />
          <q-btn
            push
            style="background: #ff414d; color: white"
            label="Reflex"
            size="medium"
            v-on:click="reflexEnable"
          />
        </div>
        <div id="start-stop-buttons"></div>
      </div>
    </div>
    <!-- <div class="row justify-evenly items-center q-pa-md">
      <q-btn
        push
        color="secondary"
        label="Target"
        size="medium"
        v-on:click="targetEnable"
      />

      <h2>Reaction Test</h2>

      <q-btn
        push
        style="background: #ff414d; color: white"
        label="Reflex"
        size="medium"
        v-on:click="reflexEnable"
      />
    </div>
    <Target v-show="targetShow" />
    <Reflex v-show="reflexShow" /> -->
    <!-- <svg
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Slide 16:9 - 1">
          <rect width="100%" height="100%" fill="white" />
        </g>
        <path
          id="L1"
          d="M20 222C20 165.115 66.1147 119 123 119H239V253H20V222Z"
          fill="black"
        />
        <path
          id="R1"
          d="M1900 222C1900 165.115 1853.89 119 1797 119H1681V253H1900V222Z"
          fill="black"
        />
        <path
          id="L-Set"
          d="M28 234C28 174.906 75.9055 127 135 127H280V961H135C75.9055 961 28 913.094 28 854V234Z"
          fill="#FCFF52"
        />
        <path
          id="R-Set"
          d="M1640 127H1785C1844.09 127 1892 174.906 1892 234V854C1892 913.094 1844.09 961 1785 961H1640V127Z"
          fill="#FCFF52"
        />
        <g id="Screen-bottom" filter="url(#filter0_d)">
          <path d="M280 127H1640V961H280V127Z" fill="#383838" />
          <path d="M280.5 127.5H1639.5V960.5H280.5V127.5Z" stroke="black" />
        </g>
        <rect
          id="Screen-middle"
          x="295"
          y="147"
          width="1331"
          height="794"
          rx="34"
          fill="black"
        />
        <circle id="L-Joystick-Base" cx="149" cy="352" r="64" fill="black" />
        <circle id="L-Joystick" cx="149" cy="352" r="54" fill="#171717" />
        <ellipse
          id="Triangle"
          cx="149"
          cy="562.5"
          rx="25"
          ry="24.5"
          fill="black"
        />
        <ellipse
          id="Start"
          cx="1713.5"
          cy="717"
          rx="35.5"
          ry="35"
          fill="#C7C7C7"
        />
        <ellipse
          id="Reset"
          cx="1817.5"
          cy="717"
          rx="35.5"
          ry="35"
          fill="#C7C7C7"
        />
        <ellipse
          id="Cross"
          cx="149"
          cy="667.5"
          rx="25"
          ry="24.5"
          fill="black"
        />
        <ellipse
          id="Circle"
          cx="198.5"
          cy="619"
          rx="24.5"
          ry="24"
          fill="black"
        />
        <ellipse
          id="Square"
          cx="94.5"
          cy="619"
          rx="24.5"
          ry="24"
          fill="black"
        />
        <path
          id="Mode-1"
          d="M1678 315.5C1678 295.342 1694.34 279 1714.5 279H1816.5C1836.66 279 1853 295.342 1853 315.5V315.5C1853 335.658 1836.66 352 1816.5 352H1714.5C1694.34 352 1678 335.658 1678 315.5V315.5Z"
          fill="#C7C7C7"
        />
        <rect
          id="Mode-2"
          x="1678"
          y="406"
          width="175"
          height="73"
          rx="36.5"
          fill="#C7C7C7"
        />
        <line
          id="Line 1"
          x1="227"
          y1="172.5"
          x2="253"
          y2="172.5"
          stroke="black"
          stroke-width="5"
        />
        <line
          id="Line 3"
          x1="1663"
          y1="172.5"
          x2="1689"
          y2="172.5"
          stroke="black"
          stroke-width="5"
        />
        <line
          id="Line 2"
          x1="240.5"
          y1="186"
          x2="240.5"
          y2="160"
          stroke="black"
          stroke-width="5"
        />
        <path
          id="Triangle"
          d="M136.922 572L149.012 551.09L161.072 572H136.922ZM138.992 570.8H159.002L149.012 553.46L138.992 570.8Z"
          fill="white"
        />
        <path
          id="Square"
          d="M83.0202 629.12V607.16H104.98V629.12H83.0202ZM84.1302 628.01H103.87V608.27H84.1302V628.01Z"
          fill="white"
        />
        <path
          id="Circle"
          d="M139.186 679.28L137.566 677.66L147.406 667.76L137.566 657.86L139.186 656.24L149.026 666.14L158.806 656.24L160.426 657.86L150.586 667.76L160.426 677.66L158.806 679.28L149.026 669.44L139.186 679.28Z"
          fill="white"
        />
        <path
          id="Cross"
          d="M198.007 630.02C196.367 630.02 194.827 629.71 193.387 629.09C191.947 628.49 190.677 627.65 189.577 626.57C188.497 625.47 187.647 624.2 187.027 622.76C186.427 621.32 186.127 619.78 186.127 618.14C186.127 616.48 186.427 614.94 187.027 613.52C187.647 612.08 188.497 610.82 189.577 609.74C190.677 608.64 191.947 607.79 193.387 607.19C194.827 606.57 196.367 606.26 198.007 606.26C199.667 606.26 201.207 606.57 202.627 607.19C204.067 607.79 205.327 608.64 206.407 609.74C207.507 610.82 208.357 612.08 208.957 613.52C209.577 614.94 209.887 616.48 209.887 618.14C209.887 619.78 209.577 621.32 208.957 622.76C208.357 624.2 207.507 625.47 206.407 626.57C205.327 627.65 204.067 628.49 202.627 629.09C201.207 629.71 199.667 630.02 198.007 630.02ZM198.007 628.76C199.487 628.76 200.867 628.49 202.147 627.95C203.427 627.39 204.547 626.63 205.507 625.67C206.487 624.69 207.247 623.56 207.787 622.28C208.347 621 208.627 619.62 208.627 618.14C208.627 616.66 208.347 615.28 207.787 614C207.247 612.72 206.487 611.6 205.507 610.64C204.547 609.66 203.427 608.9 202.147 608.36C200.867 607.8 199.487 607.52 198.007 607.52C196.527 607.52 195.147 607.8 193.867 608.36C192.587 608.9 191.457 609.66 190.477 610.64C189.517 611.6 188.757 612.72 188.197 614C187.657 615.28 187.387 616.66 187.387 618.14C187.387 619.62 187.657 621 188.197 622.28C188.757 623.56 189.517 624.69 190.477 625.67C191.457 626.63 192.587 627.39 193.867 627.95C195.147 628.49 196.527 628.76 198.007 628.76Z"
          fill="white"
        />
        <defs>
          <filter
            id="filter0_d"
            x="276"
            y="127"
            width="1368"
            height="842"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg> -->
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
    width: 90%;
    aspect-ratio: 2.23;
  }

  #L-set {
    background-color: #fcff52;
    height: 100%;
    width: 13.5%;
    border-radius: 100px 0 0 100px;
    display: grid;
    place-items: center;
  }

  #play-buttons {
    height: 100px;
    width: 100px;
  }

  #L-joystick {
    background-color: black;
    height: 100px;
    width: 100px;
    border-radius: 50px;
    display: grid;
    place-items: center;
  }

  #L-joystick-pad {
    background-color: #171717;
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
    background-color: black;
    width: 95%;
    aspect-ratio: 1.63;
    border-radius: 30px;
  }
</style>
