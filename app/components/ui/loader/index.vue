<template>
  <Icon
      :class="classes"
      name="svg-spinners:180-ring"
  />
</template>

<script lang="ts" setup>
interface Props {
  size?: "s" | "m" | "l"
}
const props = withDefaults(defineProps<Props>(), {
  size: "m"
});

const $style = useCssModule();
const classes = computed(() => ([
  $style.uiLoader, $style[`size--${props.size}`]
]));
</script>

<style module>
.uiLoader {
  color: var(--color-primary-1);
}

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
</style>
