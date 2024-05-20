<template>
  <div>
    <main class="main">
      <slot />
    </main>

    <Navigation />
  </div>
</template>

<script setup lang="ts">
import Navigation from "~/components/common/navigation";
</script>
