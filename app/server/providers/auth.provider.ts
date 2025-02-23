import _Auth from '@app/common/lib/auth';

export const Auth = () => {
    const config = useRuntimeConfig();
    return _Auth({
        isDev: true,
        baseURL: config.baseURL,
        secret: config.auth.secret,
        social: config.auth.social,
        db: config.db,
    });
};
