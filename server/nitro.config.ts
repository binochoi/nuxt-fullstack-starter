import { fileURLToPath } from "url";
import cfBinding from "nitro-cloudflare-dev";
import rpc from 'nitro-rpc-definition';
import { useBuildtimeConfig } from "./src/config";
const config = useBuildtimeConfig();
//https://nitro.unjs.io/config
export default defineNitroConfig({
  runtimeConfig: config,
  compatibilityDate: "2025-03-05",
  modules: [cfBinding, rpc()],
  srcDir: "src",
  preset: 'cloudflare_module',
  minify: true,
  rollupConfig: {
    external: ['cloudflare:sockets', '@aws-sdk/client-s3', 'wrangler'],
  },
  prerender: {
    crawlLinks: true,
  },
  cloudflareDev: {
    configPath: './wrangler.toml',
  },
  cloudflare: {
    wrangler: {
      observability: {
        enabled: true,
        logs: {
          enabled: true,
        }
      },
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        verbatimModuleSyntax: false,
        moduleResolution: 'bundler',
        typeRoots: ['../../src/types', '../../node_modules/@types'],
        paths: {
          'server/*': [fileURLToPath(new URL("src/*", import.meta.url))],
        },
      },
    }
  },
  alias: {
    server: fileURLToPath(new URL("./src", import.meta.url)),
  },
  extends: [],
  openAPI: config.isDev ? {
    meta: {
      title: 'My Awesome Project',
      description: 'This might become the next big thing.',
      version: '1.0',
    },
    route: '/_docs/openapi.json',
    ui: {
      scalar: {
        route: '/_docs/scalar',
        theme: 'purple',
      },
      swagger: false,
    },
  } : undefined,
  logLevel: 4,
  hooks: {
    "types:extend"({ tsConfig }) {
      const aliasesToRemoveFromAutocomplete = ['~', '~/*', '~~', '~~/*', '@', '@/*', '@@', '@@/*']
      for (const alias of aliasesToRemoveFromAutocomplete) {
        if (tsConfig?.compilerOptions?.paths[alias]) {
          delete tsConfig?.compilerOptions.paths[alias]
        }
      }
    }
  },
  experimental: {
    openAPI: true,
    tasks: true,
  },
});
