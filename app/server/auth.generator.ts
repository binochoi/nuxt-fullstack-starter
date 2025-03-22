import { useBuildtimeConfig } from './config';
import Auth from '~~/server/lib/auth';

const config = useBuildtimeConfig();
const auth = Auth({
    ...config,
    secret: config.auth.secret,
    social: config.auth.social,
});
export { auth };
