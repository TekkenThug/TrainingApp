<template>
  <div :class="$style.timer">
    <div :class="$style.values">
      {{ timeFields[0] }} : {{ timeFields[1] }}
    </div>

    <svg :class="$style.svgBox" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle :class="$style.circle" cx="50" cy="50" r="45"></circle>
        <path
            :stroke-dasharray="dashArray"
            :class="$style.circleStroke"
            stroke="url(#paint0_linear_103_79)"
            d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
        ></path>

        <linearGradient
            id="paint0_linear_103_79"
            x1="-2"
            y1="49.4667"
            x2="96"
            y2="49.4667"
            gradientUnits="userSpaceOnUse"
            :class="$style.circleGradient"
            :style="gradientStyle"
        >
          <stop stop-color="#73EC48"/>
          <stop offset="0.526042" stop-color="#F4F755"/>
          <stop offset="3" stop-color="#99F63B"/>
        </linearGradient>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  restMilliseconds: {
    type: Number,
    required: true
  },

  allMilliseconds: {
    type: Number,
    required: true
  }
});

const FULL_DASH_ARRAY = 283;

const dashArray = computed(() => {
  return `${Math.floor((props.restMilliseconds * FULL_DASH_ARRAY) / props.allMilliseconds)} 283`;
});

const gradientStyle = computed(() => {
  return { rotate: `${Math.floor((props.restMilliseconds / props.allMilliseconds) * 100)}deg` };
})

const timeFields = computed(() => {
  const totalSeconds = props.restMilliseconds / 1000;

  const minutes = Math.floor(totalSeconds / 60) < 10 ? `0${Math.floor(totalSeconds / 60)}` : Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60 < 10 ? `0${totalSeconds % 60}` : totalSeconds % 60;

  return [minutes, seconds];
});
</script>

<style module>
.timer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
}

.values {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 115px;
  z-index: 1;
}

.svgBox {
  width: 200px;
  height: 200px;
  transform: scaleX(-1);
}

.circle {
  stroke-width: 7px;
  stroke: #F5F5F5;
  fill: transparent;
}

.circleStroke {
  stroke-width: 7px;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  fill: transparent;
}

.circleGradient {
  transform-origin: center center;
  transition: 1s linear all;
}
</style>
