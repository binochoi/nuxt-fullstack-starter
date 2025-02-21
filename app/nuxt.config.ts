import config from '@app/server/config';
import { fileURLToPath } from 'url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: config(process.env),
  imports: {
    dirs: [
      './types/*.d.ts',
      './layers',
      './hooks',
      './utils',
    ],
    autoImport: true,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nitro-cloudflare-dev',
  ],
  pinia: {
    storesDirs: ['./app/stores/**'],
  },
  alias: {
    'src': fileURLToPath(new URL('./src', import.meta.url)),
    '@app/server': fileURLToPath(new URL('../server', import.meta.url)),
    '@app/common': fileURLToPath(new URL('../common', import.meta.url)),
  },
  devServer: {
    port: Number(process.env.PORT),
    https: {
      cert: './localhost.pem',
      key: './localhost-key.pem',
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',
    },
    rootAttrs: {
      id: 'app',
    },
  },
  srcDir: "src/",
  serverDir: "../server/",

  build: {
    transpile: ['trpc-nuxt', 'primevue'],
  },
  experimental: {
    typedPages: true,
  },
  compatibilityDate: "2025-02-16",
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  nitro: {
    preset: 'cloudflare_module',
    minify: false,
    rollupConfig: {
      external: ['cloudflare:sockets'],
    },
    cloudflareDev: {
      configPath: './wrangler.toml',
    },
    logLevel: 4,
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        verbatimModuleSyntax: false,
        moduleResolution: 'bundler',
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
