<template>
  <section class="page-block">
    <h1 :class="['h1', $style.title]">
      Programs
    </h1>

    <UiLoader v-if="isInitialLoading" :class="$style.loader" size="l" />

    <template v-else>
      <ul v-if="programs.length" :class="$style.programList">
        <li v-for="program in programs" :key="program.id" :class="$style.programCard">
          <div>
            <h3 :class="$style.programCardTitle">{{ program.title }}</h3>

            <p :class="$style.programCardCompleted">
              Completed times: {{ program.complete_count }}
            </p>
          </div>

          <UiButton :class="$style.programCardStartButton">
            <NuxtLink :to="`/programs/${program.id}`">
              <Icon name="carbon:play-filled-alt" />
            </NuxtLink>
          </UiButton>
        </li>
      </ul>

      <button :class="$style.addProgramButton" @click="createProgramFormIsOpened = true">
        Add new program
      </button>
    </template>

    <CreateNewProgram
        v-if="createProgramFormIsOpened"
        @close="createProgramFormIsOpened = false"
        @save="saveHandler"
    />
  </section>
</template>

<script setup lang="ts">
import CreateNewProgram from "~/components/forms/create-new-program";

const isInitialLoading = ref(true);
const programs = ref([]);
const createProgramFormIsOpened = ref(false);

const saveHandler = (program) => {
  programs.value.push(program);
}

const authStore = useAuthStore();
onMounted(async () => {
  try {
    programs.value = await authStore.fetchAPI("/programs");
    isInitialLoading.value = false;
  } catch (e) {
    console.log(e);
  }
})
</script>

<style module>
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

.programList {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.programCard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #232222;
  border: 1px solid rgba(149, 149, 149, 0.19);
  border-radius: 11px;
}

.programCardTitle {
  font-size: 18px;
  font-family: "Viga", sans-serif;
}

.programCardCompleted {
  font-size: 14px;
  margin-top: 10px;
}

.programCardStartButton {
  width: 25px;
  height: 25px;
  padding: 0;
  border-radius: 5px;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>


