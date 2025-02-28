type Runtime = 'monolithic';

const assert = (key: string) => {
    const value = process.env[key];
    if (value === undefined) {
        throw new Error(`environment variable ${key} is undefined`);
    }
    return value;
}
const env = (process.env.ENV || 'dev') as 'dev' | 'prod';
const port = assert('PORT');
const runtime = (process.env.SERVER_RUNTIME || 'monolithic') as Runtime;
const isDev = env === 'dev';
const isProd = env === 'prod';
export const useBuildtimeConfig = () => ({
    env,
    port,
    runtime,
    isDev,
    isProd,
    baseURL: isDev ? 'http://localhost:3000' : 'https://example.com',
    db: {
        connectionString: process.env.DB_CONNECTION_STRING || '',
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY || '',
    },
    auth: {
        secret: process.env.AUTH_SECRET || '',
        social: {
            google: {
                clientId: process.env.GOOGLE_CLIENT_ID || '',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            },
            kakao: {
                clientId: process.env.KAKAO_CLIENT_ID || '',
                clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
            }
        }
    },
})
export type Config = ReturnType<typeof useBuildtimeConfig>;