<template>
  <div :class="[$style.bubbleWindow, { [$style['bubbleWindow--opened']]: isOpened }]" @click.self="close">
    <div :class="[$style.curtain, { [$style['curtain--opened']]: isOpened }]">
      <div :class="$style.header">
        <button @click="close" :class="$style.closeButton"></button>
      </div>

      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpened = ref(false);

onMounted(() => {
  setTimeout(() => {
    isOpened.value = true;
  }, 0);
});

const emits = defineEmits(["close"]);
const close = () => {
  const delay = 500;

  isOpened.value = false;

  setTimeout(() => {
    emits("close");
  }, delay)
}
</script>

<style module>
.bubbleWindow {
  position: fixed;
  bottom: 0;
  left: 0;
  transition: all .25s ease;
  background-color: rgba(0, 0, 0, .8);
  height: 100dvh;
  width: 100%;
  z-index: 1005;
  opacity: 0;
}

.bubbleWindow--opened {
  opacity: 1;
}

.curtain {
  height: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: var(--color-primary-1) 0 -5px 20px;
  transition: all .4s ease;
  transform: translateY(100%);
  padding: 15px;
  background-color: var(--app-bg-color);
}

.curtain--opened {
  transform: translateY(20%);
}

.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.closeButton {
  position: relative;
  width: 20px;
  height: 20px;
  margin-left: auto;
}

.closeButton::after,
.closeButton::before {
  content: "";
  width: 100%;
  height: 2px;
  background-color: #9DB2CE;
  border-radius: 2px;
  position: absolute;
  left: 0;
}

.closeButton::before {
  transform: rotate(45deg);
}

.closeButton::after {
  transform: rotate(-45deg);
}
</style>
