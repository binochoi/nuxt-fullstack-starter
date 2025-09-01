import { extendsRouting } from 'nitro-extends-routing';
import * as path from 'node:path'

export default defineNitroConfig({
  modules: [
    extendsRouting({
      routePath: path.resolve(__dirname, './routes'),
      prefix: '__TYPE_IT__'
    })
  ],
});