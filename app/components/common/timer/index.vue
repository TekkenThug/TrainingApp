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
interface Props {
  isStarted?: boolean;
}
const props = withDefaults(defineProps<Props>(), { isStarted: false });
const seconds = defineModel<number>({ required: true });

const FULL_DASH_ARRAY = 283;

const dashArray = computed(() => {
  return `${Math.floor((seconds.value * FULL_DASH_ARRAY) / totalSeconds.value)} 283`;
});

const gradientStyle = computed(() => {
  return { rotate: `${Math.floor((seconds.value / totalSeconds.value) * 100)}deg` };
})

const timeFields = computed(() => {
  const minutes = Math.floor(seconds.value / 60) < 10 ? `0${Math.floor(seconds.value / 60)}` : Math.floor(seconds.value / 60);

  return [minutes, seconds.value % 60 < 10 ? `0${seconds.value % 60}` : seconds.value % 60];
});

const totalSeconds = ref(0);
watch(() => props.isStarted, (value) => {
  if (value) {
    totalSeconds.value = seconds.value;
    startTimer();
  }
});

const emits = defineEmits(["end"]);
const restOfTimeIntervalID = ref<ReturnType<typeof setInterval> | null>(null);
const startTimer = () => {
  restOfTimeIntervalID.value = setInterval(() => {
    if (seconds.value === 0 && restOfTimeIntervalID.value) {
      clearInterval(restOfTimeIntervalID.value);
      restOfTimeIntervalID.value = null;
      totalSeconds.value = 0;
      emits("end");
      return;
    }

    seconds.value -= 1;
  }, 1000);
}

onBeforeUnmount(() => {
  if (restOfTimeIntervalID.value) {
    clearInterval(restOfTimeIntervalID.value);
  }
})
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
