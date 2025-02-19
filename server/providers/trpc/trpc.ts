import { initTRPC } from '@trpc/server';
import type { H3Event, EventHandlerRequest } from 'h3';

export type RequestContext = {
    event: H3Event<EventHandlerRequest>,
};
const t = initTRPC.context<RequestContext>().create();
export const { procedure, router, middleware } = t;