import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@app/server/providers/trpc/app';

const init = ({ url }: { url: string }) => createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({ url }),
    ],
});

export default createGlobalState(() => {
    const config = useRuntimeConfig();
    return init({ url: `${config.public.host}/api/trpc` });
})