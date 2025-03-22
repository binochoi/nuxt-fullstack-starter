import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '~~/server/database/schema';

export default (connection = process.env.DB_CONNECTION_STRING) => {
    const client = postgres(connection || '');
    return drizzle(client, { schema });
};
export { schema };
