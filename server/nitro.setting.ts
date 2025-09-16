import { fileURLToPath } from "url";
import cfBinding from "nitro-cloudflare-dev";
import rpc from 'nitro-rpc-definition';
import { useBuildtimeConfig } from "./src/config";
import { type NitroConfig } from "nitropack";
const config = useBuildtimeConfig();
export default {
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
  // cloudflareDev: {
  //   configPath: './wrangler.toml',
  // },
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
      title: 'Nuxt Fullstack Starter',
      description: 'This might become the next big thing blah blah...',
      version: '0.1',
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
} as NitroConfig;