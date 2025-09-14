import { adminClient, genericOAuthClient } from "better-auth/client/plugins";
import { createAuthClient } from 'better-auth/vue';
import { inferAdditionalFields } from "better-auth/client/plugins";
import { Auth } from "server/providers/auth.provider";

export default () => {
  const headers = import.meta.server ? useRequestHeaders() : undefined;
  return createAuthClient({
    // baseURL: `https://localhost:3981`,
    // basePath: '/auth',
    fetchOptions: { headers },
    plugins: [
      inferAdditionalFields<ReturnType<typeof Auth>>(),
      adminClient(),
      genericOAuthClient(),
    ],
  });
}