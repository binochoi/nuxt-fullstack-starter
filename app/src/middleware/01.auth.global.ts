export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();
  auth.fetchSession();
});
