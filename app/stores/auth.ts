import { defineStore } from 'pinia';
import { useLocalStorage } from "@vueuse/core";
import { parseJWT } from "~/utils";

interface UserPayloadInterface {
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", () => {
  const authenticated = ref(false);

  const token = useLocalStorage("token", null);
  const tokenExpires = useLocalStorage<string | null>("token_exp", null);

  const tokenIsExpired = computed(() => {
    if (!tokenExpires.value) return false;

    return new Date().getTime() > new Date(tokenExpires.value).getTime()
  });

  const userId = computed(() => {
    if (!token.value) return null;

    const payload = parseJWT(token.value);

    return payload.sub;
  })

  const authenticateUser = async ({ email, password }: UserPayloadInterface) => {
    const data = await $fetch('http://localhost:8000/api/v1/auth/login', {
      method: 'post',
      body: {
        email,
        password,
      },
      credentials: "include"
    });

    token.value = data.token;
    tokenExpires.value = data.expires;

    authenticated.value = true;
  }

  const refreshTokens = async () => {
    const data = await $fetch("http://localhost:8000/api/v1/auth/refresh", {
      method: "post",
      credentials: "include"
    });

    token.value = data.token;
    tokenExpires.value = data.expires;
  };

  const logout = async () => {
    await $fetch("http://localhost:8000/api/v1/auth/logout", {
      method: "post",
      credentials: "include"
    });

    token.value = null;
    tokenExpires.value = null;

    authenticated.value = false;
  };

  return {
    authenticated,
    authenticateUser,
    token,
    tokenIsExpired,
    refreshTokens,
    logout,
    userId
  }
});
