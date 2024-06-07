<template>
  <BubbleWindow @close="$emit('close')">
    <div :class="$style.createProgramForm">
      <UiInput v-model="newProgramData.title" placeholder="Name of new program" />

      <UiInput v-model="newProgramData.setCount" placeholder="Sets count" type="number" />

      <UiInput v-model="newProgramData.restTimeMinutes" placeholder="Minutes rest time" type="number" />

      <UiInput v-model="newProgramData.restTimeSeconds" placeholder="Seconds rest time" type="number" />

      <UiButton :is-loading="loading" :disabled="!isValidData" @click="saveNewProgram">
        Save program
      </UiButton>
    </div>
  </BubbleWindow>
</template>
<script setup lang="ts">
import BubbleWindow from "~/components/layouts/bubble-window/index.vue";

const emits = defineEmits(["close", "save"]);

const newProgramData = reactive({
  title: "",
  setCount: 0,
  restTimeMinutes: null,
  restTimeSeconds: null,
});
const loading = ref(false);

const isValidData = computed(() => newProgramData.title && newProgramData.setCount > 0 && (newProgramData.restTimeMinutes !== null || newProgramData.restTimeSeconds !== null));
const authStore = useAuthStore();
const saveNewProgram = async () => {
  if (loading.value) return;

  loading.value = true;

  try {
    const program = await authStore.fetchAPI("/programs", {
      method: "post",
      body: {
        title: newProgramData.title,
        setCount: newProgramData.setCount,
        rest: newProgramData.restTimeMinutes * 60 + newProgramData.restTimeSeconds,
      }
    });

    emits("save", program);

    setTimeout(() => {
      emits("close");
    }, 1000);
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      loading.value = false;
    },1500);
  }
}
</script>

<style module>
.createProgramForm {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
