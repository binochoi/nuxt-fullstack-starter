import _Auth from 'server/lib/auth';

export const Auth = () => {
    const config = useRuntimeConfig();
    return _Auth(config);
};
