import rpc from 'api-to-rpc';
import type { API } from '~~/.nuxt/.rpc-definition';
export const useRPC = () => {
    const config = useRuntimeConfig();
    const client = rpc<API>({
        baseURL: config.baseURL,
    });
    return client;
};
