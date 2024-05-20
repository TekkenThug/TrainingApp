<template>
  <button :class="$style.uiButton" :disabled="isLoading" @click="$emit('click')">
    <UiLoader v-if="isLoading" theme="secondary" size="s" />

    <slot v-else />
  </button>
</template>

<script lang="ts" setup>
interface Props {
  isLoading?: boolean
}
withDefaults(defineProps<Props>(), { isLoading: false })
</script>

<style module>
.uiButton {
  padding: 15px 20px;
  font-size: 18px;
  background-color: var(--color-primary-1);
  border-radius: 12px;
  width: 100%;
  font-family: "Viga", sans-serif;
  color: var(--color-secondary-1);
}
</style>
