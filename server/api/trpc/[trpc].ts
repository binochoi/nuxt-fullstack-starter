import { createNuxtApiHandler } from 'trpc-nuxt';
import { router } from '@app/server/trpc/trpc';
import * as routers from '@app/server/trpc/routers';

export const appRouter = router(routers);
export type AppRouter = typeof appRouter;
export default createNuxtApiHandler({
    router: appRouter,
    async createContext(event) {
        return {
            event,
        };
    },
});