import { adminClient, genericOAuthClient } from "better-auth/client/plugins";
import type { Session, User } from "server/types";
import { createAuthClient } from 'better-auth/vue';
import { inferAdditionalFields } from "better-auth/client/plugins";
import { Auth } from "server/providers/auth.provider";

const useAuthClient = () => {
  const headers = import.meta.server ? useRequestHeaders() : undefined;
  return createAuthClient({
    fetchOptions: { headers },
    plugins: [
      inferAdditionalFields<ReturnType<typeof Auth>>(),
      adminClient(),
      genericOAuthClient(),
    ],
  });
}
type AuthClient = ReturnType<typeof useAuthClient>;
const useAuthFetcher = (client: AuthClient) => {
  const user = ref<User>();
  const session = ref<Session>();
  const fetchStatus = shallowRef<'idle' | 'fetching' | 'fetched' | 'error'>('idle');
  const fetchSession = async () => {
    if (fetchStatus.value === 'fetching' || fetchStatus.value === 'fetched') {
      return;
    }
    fetchStatus.value = 'fetching';
    const { data, error } = await client.useSession(useFetch);
    if (error.value) {
      fetchStatus.value = 'error';
      return;
    }
    fetchStatus.value = 'fetched';
    if (data.value) {
      session.value = data.value.session;
      user.value = data.value.user;
    }
  }
  return {
    user,
    session,
    fetchSession,
    fetchStatus,
    status: computed<'loading' | 'error' | 'success'>(() => {
      if (fetchStatus.value === 'idle' || fetchStatus.value === 'fetching') {
        return 'loading';
      }
      if (fetchStatus.value === 'error') {
        return 'error';
      }
      return 'success';
    }),
  }
}
export const useAuthStore = defineStore('auth', () => {
  const client = useAuthClient();
  const { user, session, ...fetcher } = useAuthFetcher(client);
  return {
    ...fetcher,
    client: computed(() => client),
    user,
    session,
    signOut: async () => {
      await client.signOut();
      session.value = undefined;
      user.value = undefined;
    },
  }
});