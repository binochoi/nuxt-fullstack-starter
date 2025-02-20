import { initTRPC } from '@trpc/server';
import type { H3Event, EventHandlerRequest } from 'h3';
import superjson from 'superjson';

export type RequestContext = {
    event: H3Event<EventHandlerRequest>,
};
const t = initTRPC.context<RequestContext>().create({
    transformer: superjson,
});
export const { procedure, router, middleware } = t;