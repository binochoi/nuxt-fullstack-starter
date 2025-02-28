import _DB from '@app/common/lib/db';

export const DB = () => {
    const config = useRuntimeConfig();
    return _DB(config.db.connectionString);
}