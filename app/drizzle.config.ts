import { defineConfig } from 'drizzle-kit';
import { useBuildtimeConfig } from './server/config';

export default defineConfig({
  dialect: 'postgresql',
  schema: '../common/schema',
  out: './.cache/.migrations',
  breakpoints: true,
  dbCredentials: {
    url: useBuildtimeConfig().db.connectionString,
  },
});
