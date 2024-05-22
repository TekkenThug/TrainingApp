<template>
  <button
      :class="classes"
      :disabled="isLoading || disabled"
      @click="$emit('click')"
  >
    <UiLoader v-if="isLoading" theme="secondary" size="s" />

    <slot v-else />
  </button>
</template>

<script lang="ts" setup>
interface Props {
  isLoading?: boolean,
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), { isLoading: false, disabled: false });

const $style = useCssModule();
const classes = computed(() => ([$style.uiButton, { [$style["uiButton--disabled"]]: props.disabled }]))
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
  transition: all .2s ease;
}

.uiButton--disabled {
  background-color: var(--color-primary-2);
}
</style>
