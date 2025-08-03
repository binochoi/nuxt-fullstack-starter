import { EventHandler, H3Event } from "h3";
import { Auth } from 'server/providers/auth.provider'

/**
 * Middleware used to require authentication for a route.
 *
 * Can be extended to check for specific roles or permissions.
 */
export const injectAuth: EventHandler = async (e: H3Event) => {
  const cookie = getCookie(e, '__Secure-app-auth-session.session_token');
  if (!cookie) {
    return;
  }

  const session = await Auth().api.getSession({
    headers: e.headers,
  });
  e.context.auth = session;
};