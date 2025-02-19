import { router } from './trpc';
import * as routes from './routers';

export const appRouter = router(routes);
export type AppRouter = typeof appRouter;