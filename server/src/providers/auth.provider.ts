import type { Config } from 'server/config';
import _Auth from 'server/lib/auth';

export const Auth = () => {
    const config = useRuntimeConfig() as unknown as Config;
    return _Auth(config);
};
