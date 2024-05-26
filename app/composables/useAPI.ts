import { storeToRefs } from "pinia";

export const useAPI: typeof useFetch = (request, opts) => {
  const config = useRuntimeConfig();
  const { tokenIsExpired, token } = storeToRefs(useAuthStore());

  const options = { baseURL: config.public.baseURL, ...opts };

  if (token) {
    options.headers = [
      ["Authorization", `bearer ${token.value}`]
    ];
  }

  return useFetch(request, options);
}
