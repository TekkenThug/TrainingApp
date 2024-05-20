<template>
  <section class="page-block">
    <h1 :class="['h1', $style.title]">
      Programs
    </h1>

    <UiLoader v-if="isInitialLoading" :class="$style.loader" />

    <template v-else>
      <ul v-if="programs.length" :class="$style.programList">
        <li v-for="program in programs" :key="program.id" :class="$style.programCard">
          <div>
            <h3 :class="$style.programCardTitle">{{ program.title }}</h3>
          </div>

          <UiButton :class="$style.programCardStartButton">
            <Icon name="carbon:play-filled-alt" />
          </UiButton>
        </li>
      </ul>

      <button :class="$style.addProgramButton" @click="newProgramFormIsOpened = true">
        Add new program
      </button>
    </template>

    <BubbleWindow v-if="newProgramFormIsOpened" @close="newProgramFormIsOpened = false">
      <div :class="$style.newProgramForm">
        <UiInput v-model="newProgramData.title" placeholder="Name of new program" />

        <UiInput v-model="newProgramData.setCount" placeholder="Sets count" type="number" />

        <UiInput v-model="newProgramData.restTimeMinutes" placeholder="Minutes rest time" type="number" />

        <UiInput v-model="newProgramData.restTimeSeconds" placeholder="Seconds rest time" type="number" />

        <UiButton :is-loading="loading" @click="saveNewProgram">
          Save program
        </UiButton>
      </div>
    </BubbleWindow>
  </section>
<!--    <h1 class="h1">Timer</h1>-->

<!--    <div-->
<!--        v-if="mode === 'setTime'"-->
<!--        :class="$style.timeSection"-->
<!--    >-->
<!--      <h2>Enter time</h2>-->

<!--      <div :class="$style.timeSectionFields">-->
<!--        <label for="">-->
<!--          Minutes-->
<!--          <input v-model="time.minutes" type="number">-->
<!--        </label>-->

<!--        <label for="">-->
<!--          Seconds-->
<!--          <input v-model="time.seconds" type="number">-->
<!--        </label>-->
<!--      </div>-->

<!--      <button :disabled="buttonIsDisabled" @click="startTimer">Start</button>-->
<!--    </div>-->

<!--    <Timer v-else-if="mode === 'activeTime'" :rest-milliseconds="restOfTime" :all-milliseconds="allOfTime" />-->
</template>

<script setup lang="ts">
import Timer from "~/components/common/timer/Timer.vue";
import BubbleWindow from "~/components/layouts/bubble-window";

const mode = ref<"setTime" | "activeTime">("setTime");

const time = reactive({
  minutes: 0,
  seconds: 0,
});

const buttonIsDisabled = computed(() => {
  return !time.seconds && !time.minutes
});

const restOfTime = ref(0);
const allOfTime = ref(0);
const restOfTimeIntervalID = ref<ReturnType<typeof setInterval> | null>(null);

const startTimer = () => {
  restOfTime.value = allOfTime.value = (time.minutes * 60 + time.seconds) * 1000;

  restOfTimeIntervalID.value = setInterval(() => {
    if (restOfTime.value === 0 && restOfTimeIntervalID.value) {
      clearInterval(restOfTimeIntervalID.value);
      restOfTimeIntervalID.value = null;
      allOfTime.value = 0;
      mode.value = "setTime";
      return;
    }

    restOfTime.value -= 1000;
  }, 1000);

  mode.value = "activeTime";
}

const isInitialLoading = ref(true);

const programs = ref([]);

const newProgramData = reactive({
  title: "",
  setCount: 0,
  restTimeMinutes: 0,
  restTimeSeconds: 0,
});

const newProgramFormIsOpened = ref(false);

const loading = ref(false);

const saveNewProgram = async () => {
  loading.value = true;

  try {
    const program = await $fetch("http://localhost:8000/programs/", {
      method: "POST",
      body: {
        title: newProgramData.title,
        setCount: newProgramData.setCount,
        rest: newProgramData.restTimeMinutes * 60 + newProgramData.restTimeSeconds
      }
    });

    programs.value.push(program);

    newProgramFormIsOpened.value = false;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  try {
    programs.value = await $fetch("http://localhost:8000/programs/");

    setTimeout(() => {
      isInitialLoading.value = false;
    }, 1500);
  } catch (e) {
    console.log(e);
  }
});
</script>

<style module>
.main {
  padding: 40px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.timeSectionFields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title {
  margin-bottom: 40px;
}

.addProgramButton {
  padding: 15px 20px;
  font-size: 24px;
  background-color: var(--color-primary-1);
  border-radius: 20px;
  width: 100%;
  font-family: "Viga", sans-serif;
  color: #000000;
}

.newProgramForm {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.programList {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.programCard {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #232222;
  border: 1px solid rgba(149, 149, 149, 0.19);
  border-radius: 11px;
}

.programCardTitle {
  font-size: 18px;
  font-family: "Viga", sans-serif;
}

.programCardStartButton {
  width: 25px;
  height: 25px;
  padding: 0;
  border-radius: 8px;
}

.loader {
  --color-loader: var(--color-primary-1);

  position: absolute;
  top: 50%;
  left: 50%;
}
</style>


