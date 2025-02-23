import DB from '@app/common/lib/db';

export const db = () => {
    const config = useRuntimeConfig();
    return DB(config.db.connectionString);
}