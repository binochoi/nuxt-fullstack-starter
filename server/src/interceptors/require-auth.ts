import { H3Event } from "h3";
import { injectAuth } from "./inject-auth";
import { assertUser } from "server/helpers/assertUser";

export const requireAuth = async (e: H3Event) => {
    await injectAuth(e);
    if (!assertUser(e)) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
        });
    }
}