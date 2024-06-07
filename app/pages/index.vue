<template>
  <section class="page-block">
    <h1 class="h1">
      Main
    </h1>

    <UiButton @click="logout">
      Logout
    </UiButton>
  </section>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const router = useRouter();
const logout = async () => {
  await authStore.logout();
  await router.push("/auth");
}
</script>
