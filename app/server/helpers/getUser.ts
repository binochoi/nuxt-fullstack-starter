import { H3Event } from "h3";
import { User } from "server/types";

export const getUser = (e: H3Event) => e.context.auth?.user as User | null;