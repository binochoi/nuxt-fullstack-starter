import { Auth } from 'server/providers/auth.provider';

export default defineEventHandler(
    (event) => Auth().handler(toWebRequest(event)),
);