import { storeToRefs } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = storeToRefs(useAuthStore());
  const token = useLocalStorage("token", null);
  const tokenExpires = useLocalStorage("token_exp", null);

  if (token.value) {
    authenticated.value = true;
  }

  if (token.value && to.name === "auth") {
    return navigateTo("/");
  }

  if (!token.value && to?.name !== "auth") {
    abortNavigation();
    return navigateTo("/auth");
  }
});
