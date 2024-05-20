<template>
  <div :class="$style.uiInput">
    <input v-model="model" :type="type" :placeholder="placeholder">
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },

  type: {
    type: String,
    default: "text",
  },
});

const model = defineModel();
</script>

<style module>
.uiInput input {
  background-color: transparent;
  outline: none;
  width: 100%;
  color: var(--app-text-color);
  padding: 15px 12px;
  border: 2px solid #959595;
  border-radius: 12px;
  transition: all .3s ease;
}

.uiInput input:focus {
  border-color: var(--color-primary-1);
}
</style>
