import useAuthClient from "../hooks/useAuthClient";

export default () => {
  const client = useAuthClient();
  const fetchSession = async () => {
    const { data, error, isPending } = await client.useSession(useFetch);
  }
}