import useAuthClient from "app/layers/auth/hooks/useAuthClient";
import fetchAuthSession from "app/layers/auth/hooks/fetchAuthSession";

export const useAuthStore = defineStore('auth', () => {
  const client = useAuthClient();
  const auth = fetchAuthSession();
  return {
    ...auth,
    client: computed(() => client),
    async signOut() {
      await client.signOut();
      auth.session.value = undefined;
      auth.user.value = undefined;
    },
  }
});