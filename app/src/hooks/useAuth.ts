import { createAuthClient } from 'better-auth/vue';
import type { RouteLocationRaw } from 'vue-router';
import { adminClient, genericOAuthClient, inferAdditionalFields } from 'better-auth/client/plugins';
import Auth from '@app/common/lib/auth';

export default () => {
  const headers = import.meta.server ? useRequestHeaders() : undefined;
  const client = createAuthClient({
    fetchOptions: { headers },
    plugins: [
      inferAdditionalFields<ReturnType<typeof Auth>>(),
      adminClient(),
      genericOAuthClient(),
    ],
  });
  type Session = typeof client.$Infer.Session['session'] | null;
  type User = typeof client.$Infer.Session['user'] | null;
  const session = useState<Session>('auth:session', () => null);
  const user = useState<User>('auth:user', () => null);
  const isSessionFetching = import.meta.server ? ref(false) : useState('auth:sessionFetching', () => false);

  const fetchSession = async () => {
    if (isSessionFetching.value) {
      return;
    }
    isSessionFetching.value = true;
    const { data } = await client.useSession(useFetch);
    session.value = data.value?.session ?? null;
    user.value = data.value?.user ?? null;
    isSessionFetching.value = false;
  };
  const clearSession = () => {
    session.value = null;
    user.value = null;
  };
  if (import.meta.client) {
    client.$store.listen('$sessionSignal', async (signal) => {
      if (!signal) return;
      await fetchSession();
    });
  }
  return {
    client,
    session,
    user,
    fetchSession,
    clearSession,
    async signOut({ redirectTo }: { redirectTo?: RouteLocationRaw } = {}) {
      const res = await client.signOut();
      session.value = null;
      user.value = null;
      if (redirectTo) {
        await navigateTo(redirectTo);
      }
      return res;
    },
  };
};
