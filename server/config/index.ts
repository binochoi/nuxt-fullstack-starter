/* eslint-disable @typescript-eslint/no-explicit-any */
export default (env: any) => {
    const isDev = env.NODE_ENV === 'development';
    const host = isDev ? 'https://localhost:3000' : 'https://localhost:3000';
    return {
        isDev,
        public: {
            host,
        }
    }
}