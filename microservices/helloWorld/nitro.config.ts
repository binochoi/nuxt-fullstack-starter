import path from 'path'
import { defineNitroConfig } from "nitropack/config";
import { extendsRouting } from 'nitro-extends-routing'
export default defineNitroConfig({
    srcDir: "src",
    alias: {
        '@app/common': path.resolve(__dirname, '../../common'),
    },
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