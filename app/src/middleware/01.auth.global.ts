export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) {
    return;
  }
  const auth = useAuthStore();
  auth.fetchSession();
});
