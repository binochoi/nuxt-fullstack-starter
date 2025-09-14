import { Session, User } from "server/types";
import useAuthClient from "./useAuthClient";

export default () => {
  const client = useAuthClient();
  const user = ref<User>();
  const session = ref<Session>();
  const error = ref<{ status: number, message?: string }>();
  const status = shallowRef<'success' | 'error' | 'pending'>('pending');
  client.useSession(useFetch)
    .then((payload) => {
      error.value = payload.error.value;
      if (error.value || !payload.data.value) {
        status.value = 'error';
        return;
      }
      status.value = 'success';
      session.value = payload.data.value.session;
      user.value = payload.data.value.user;
    })
  return {
    user,
    session,
    status,
    error,
  }
}