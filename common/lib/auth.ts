import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { genericOAuth } from 'better-auth/plugins';
import db from './db';
import { schema } from './db';
type Options = {
    isDev?: boolean,
    baseURL: string,
    secret: string,
    social: {
        google: {
            clientId: string,
            clientSecret: string,
        },
        kakao: {
            clientId: string,
            clientSecret: string,
        },
    },
    db: {
        connectionString: string,
    }
};
async function fetchKakaoUserData(accessToken: string) {
    try {
        const response = await fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const raw = await response.json();
        return {
            id: raw.id,
            email: raw.kakao_account?.email,
            emailVerified: raw.kakao_account?.is_email_verified,
            name: raw.kakao_account?.profile?.nickname,
            image: raw.kakao_account?.profile?.profile_image_url,
            createdAt: raw.connected_at,
            updatedAt: raw.connected_at,
            _raw: raw,
        };
    } catch (error) {
        console.error('Error fetching Kakao user data:', error);
        throw error;
    }
}
export default ({
    isDev,
    baseURL,
    secret,
    social,
    db: {
        connectionString,
    },
}: Options) => betterAuth({
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
