
import { useBuildtimeConfig } from './server/config';
import { fileURLToPath } from 'url';
import rpc from 'nitro-rpc-definition';

const config = useBuildtimeConfig();
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: config,
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
    'server': fileURLToPath(new URL('./server', import.meta.url)),
  },
  css: [
    'src/assets/styles/main.scss',
  ],
  devServer: {
    port: Number(config.port),
    // https: {
    //   cert: './localhost.pem',
    //   key: './localhost-key.pem',
    // },
  },
  app: {
    buildAssetsDir: 'public-assets',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',
    },
    rootAttrs: {
      id: 'app',
    },
  },
  srcDir: "src/",
  serverDir: "server/",
  experimental: {
    typedPages: true,
  },
  compatibilityDate: "2025-02-16",
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  nitro: {
    preset: 'cloudflare_module',
    minify: true,
    rollupConfig: {
      external: ['cloudflare:sockets', '@aws-sdk/client-s3'],
    },
    cloudflareDev: {
      configPath: './wrangler.toml',
    },
    logLevel: 4,
    modules: [rpc()],
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
