import _DB from 'server/lib/db';

export const DB = () => {
    const config = useRuntimeConfig();
    return _DB(config.db.connectionString);
}