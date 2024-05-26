<template>
  <section class="page-block" :class="$style.programPage">
    <UiLoader v-if="isLoading" />

    <template v-else-if="programData">
      <Timer v-model="restTime" :is-started="timerIsWorking" @end="end" />

      <ul :class="$style.setList">
        <li
            v-for="item in programData.set_count"
            :key="item"
            :class="[
                $style.setItem,
                {
                  [$style['setItem--prepared']]: item === programData.active,
                  [$style['setItem--passed']]: programData.active > item,
                }
            ]"
        >
          {{ item }}
        </li>
      </ul>

      <UiButton :disabled="timerIsWorking" @click="start">
        Start
      </UiButton>
    </template>
  </section>
</template>

<script lang="ts" setup>
import Timer from "~/components/common/timer";
import Sound from "~/assets/sounds/sound.mp3";

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const programData = ref<null | { set_count: number, active: number, rest: number }>(null);
const restTime = ref(0);
const sound = ref<HTMLAudioElement>(new Audio(Sound));

await useAPI(`/programs/${route.params.id}`, {
  onResponse({ response }) {
    programData.value = {
      ...response._data,
      active: 1
    };

    restTime.value = programData.value.rest;

    isLoading.value = false;
  }
});
const { execute: sendToComplete } = await useAPI(`/programs/${route.params.id}/complete`, { method: "PATCH", immediate: false })

const timerIsWorking = ref(false);
const start = () => {
  timerIsWorking.value = true;
}
const end = () => {
  if (sound.value) {
    sound.value.play();
  }
  timerIsWorking.value = false;
  setTimeout(async () => {
    restTime.value = programData.value.rest;

    if (programData.value.active === programData.value.set_count) {
      await sendToComplete()

      await router.push({ name: "programs" });
    } else {
      programData.value.active++;
    }
  }, 300);
}
</script>

<style module>
.programPage {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.setList {
  display: flex;
  gap: 20px;
  margin: 40px 0;
}

.setItem {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #232222;
  border-radius: 8px;
  border: 1px solid transparent;
  font-weight: 700;
}

.setItem--prepared {
  border-color: var(--color-primary-1);
}

.setItem--passed {
  border-color: var(--color-primary-1);
  background-color: var(--color-primary-1);
  color: var(--color-secondary-1);
}
</style>
