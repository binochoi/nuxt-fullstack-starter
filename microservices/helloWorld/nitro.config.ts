import path from 'path'
import { defineNitroConfig } from "nitropack/config";
import { extendsRouting } from 'nitro-extends-routing'
export default defineNitroConfig({
    srcDir: "src",
    modules: [
        extendsRouting({
            routePath: path.resolve(__dirname, './src/routes'),
            prefix: 'auth'
        }),
    ],
    typescript: {
        tsConfig: {
            compilerOptions: {
                strict: true,
            },
            include: ['./global.d.ts'],
        }

    }
})
export * from './src/exports';