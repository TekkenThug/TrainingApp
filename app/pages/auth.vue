<template>
  <div :class="$style.auth">
    <div :class="$style.content">
      <h1 :class="['h1', $style.title]">
        Training App
      </h1>

      <div :class="$style.fields">
        <UiInput v-model="authCredentials.email" placeholder="Email" />

        <UiInput v-model="authCredentials.password" placeholder="Password" type="password" />
      </div>

      <UiButton
          :disabled="buttonIsDisabled"
          :is-loadind="isLoading"
          @click="auth"
      >
        Log in
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

const isLoading = ref(false);
const authCredentials = reactive({
  email: "",
  password: ""
});
const buttonIsDisabled = computed(() => !authCredentials.email || !authCredentials.password);

const authStore = useAuthStore();
const auth = async () => {
  await authStore.authenticateUser(authCredentials);
}
</script>

<style module>
.auth {
  background-image: url("~/assets/images/auth.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 0;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.content {
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 -300px 40px rgba(0 0 0 / 75%);
}

.title {
  text-align: center;
  margin-bottom: 40px;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 40px;
}
</style>
