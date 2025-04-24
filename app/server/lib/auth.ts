import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { genericOAuth } from 'better-auth/plugins';
import db from './db';
import * as schema from '../database/schema';
import { Config } from '../config';
import { fetchKakaoUserData } from './auth.utils';

export default ({
    isDev,
    baseURL,
    auth: {
        secret,
        social,
    },
    db: {
        connectionString,
    },
}: Config) => betterAuth({
    baseURL: `${baseURL}/auth`,
    trustedOrigins: [baseURL!],
    secret,
    database: drizzleAdapter(db(connectionString), {
        provider: 'pg',
        schema,
    }),
    plugins: [
        genericOAuth({
            config: [
                {
                    providerId: 'kakao',
                    clientId: social.kakao.clientId,
                    clientSecret: social.kakao.clientSecret,
                    redirectURI: `${baseURL}/api/auth/callback/kakao`,
                    authorizationUrl: 'https://kauth.kakao.com/oauth/authorize',
                    tokenUrl: 'https://kauth.kakao.com/oauth/token',
                    userInfoUrl: 'https://kapi.kakao.com/v2/user/me',
                    discoveryUrl: 'https://kauth.kakao.com/.well-known/openid-configuration',
                    getUserInfo: async (user) => {
                        if (!user.accessToken) {
                            throw new Error('No access token on try to get user info from kakao');
                        }
                        return fetchKakaoUserData(user.accessToken);
                    },
                    scopes: ['profile_nickname', 'profile_image', 'account_email'],
                    pkce: true,
                    responseType: 'code',
                },
            ],
        }),
    ],
    socialProviders: {
        google: {
            redirectURI: `${baseURL}/api/auth/callback/google`,
            ...social.google,
        },
    },
    session: {
        expiresIn: 60 * 60 * 24 * 60, // 60 days
        updateAge: 60 * 60 * 24 * 7, // 7 day (every 1 day the session expiration is updated)
    },
    advanced: {
        cookiePrefix: 'app-auth-session',
    },
    logger: {
        level: isDev ? 'debug' : 'info',
    },
});
export { toNodeHandler } from 'better-auth/node';
