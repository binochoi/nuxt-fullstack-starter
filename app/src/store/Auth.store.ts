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
    const res = await client.useSession();
    const { data, error, isPending } = res.value;
    fetchStatus.value = isPending ? 'fetching' : 'idle';
    if (error) {
      fetchStatus.value = 'error';
      return;
    }
    fetchStatus.value = 'fetched';
    if (data) {
      session.value = data.session;
      user.value = data.user;
    }
  }
  return {
    user,
    session,
    fetchSession,
    fetchStatus,
    state: computed(() => ({
      fetchStatus: fetchStatus.value,
      user: user.value,
      session: session.value,
    })),
  }
}
export const useAuthStore = defineStore('auth', () => {
  const client = useAuthClient();
  const fetcher = useAuthFetcher(client);
  return {
    client: computed(() => client),
    ...fetcher,
  }
});