<template>
  <Icon
      :class="classes"
      name="svg-spinners:180-ring"
  />
</template>

<script lang="ts" setup>
interface Props {
  size?: "s" | "m" | "l",
  theme?: "primary" | "secondary"
}
const props = withDefaults(defineProps<Props>(), {
  size: "m",
  theme: "primary"
});

const $style = useCssModule();
const classes = computed(() => ([
  $style[`size--${props.size}`], $style[`theme--${props.theme}`]
]));
</script>

<style module>
.size--s {
  width: 18px;
  height: 18px;
}

.size--m {
  width: 24px;
  height: 24px;
}

.size--l {
  width: 32px;
  height: 32px;
}

.theme--primary {
  color: var(--color-primary-1);
}

.theme--secondary {
  color: var(--color-secondary-1);
}
</style>
