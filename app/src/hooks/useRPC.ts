import rpc from 'api-to-rpc';
import superjson from 'superjson';
import type { API } from 'server/.nitro/.rpc-definition';
import { isSuperJSON } from 'server/utils/isSuperJSON';
export const useRPC = () => {
    const config = useRuntimeConfig();
    const client = rpc<API>({
        baseURL: config.baseURL,
        onRequest: (params, fetcher) => {
            const { payload } = params;
            if (payload.body && (payload.body instanceof FormData) === false) {
                payload.body = superjson.serialize(payload.body);
            }
            return fetcher({
                ...params,
                payload,
            });
        },
        onResponse: (data) => {
            return isSuperJSON(data) ? superjson.deserialize(data) : data;
        }
    });
    return client;
};

export type { API };