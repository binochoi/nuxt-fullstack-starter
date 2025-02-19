import { procedure, router } from '../trpc';

export default router({
    getList: procedure.query(() => ['hello world !']),
});