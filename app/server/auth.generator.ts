import { useBuildtimeConfig } from './config';
import Auth from './lib/auth';

const config = useBuildtimeConfig();
const auth = Auth(config);
export { auth };
