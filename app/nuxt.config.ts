import { useBuildtimeConfig } from '../server/src/config';
import { fileURLToPath } from 'node:url';
import rpc from 'nitro-rpc-definition';
import { definePreset } from '@primeuix/themes';
import AuraTheme from '@primeuix/themes/aura';
import { generateColorPalette } from './src/utils/generateColorPalette';
import nitroConfig from 'server/nitro.setting'

const primePreset = definePreset(AuraTheme, {
  semantic: {
    primary: generateColorPalette('--color-primary', '1'),
  }
});
const config = useBuildtimeConfig();
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  routeRules: {
    '/**/*': {
      ssr: false,
      prerender: true,
    },
  },
  runtimeConfig: config,
  components: {
    dirs: [
      'components/features',
      'components/layout',
      'components/ui',
    ],
  },
  imports: {
    dirs: [
      './types',
      './layers',
      './hooks',
      './utils',
    ],
    autoImport: true,
    global: true,
  },
  extends: [
    './src/layers/auth',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nitro-cloudflare-dev',
    '@primevue/nuxt-module',
    '@vant/nuxt'
  ],
  vant: {
    defaultLocale: 'en-US',
  },
  primevue: {
    components: {
      prefix: 'Prime',
    },
    options: {
      ripple: true,
      theme: {
        preset: primePreset,
        options: {
          darkModeSelector: '.darkmode',
        },
      },
    },
  },
  pinia: {
    storesDirs: ['./src/store/**'],
  },
  alias: {
    'app': fileURLToPath(new URL('src', import.meta.url)),
    'server': fileURLToPath(new URL('../server/src', import.meta.url)),
    'server/.nitro': fileURLToPath(new URL('../server/.nitro', import.meta.url)),
    'server/nitro.setting': fileURLToPath(new URL('../server/nitro.setting.ts', import.meta.url)),
    '.nuxt': fileURLToPath(new URL('.nuxt', import.meta.url)),
  },
  css: [
    'vue-final-modal/style.css',
    './src/assets/styles/main.scss',
  ],
  devServer: {
    port: Number(config.port),
    https: {
      cert: './localhost.pem',
      key: './localhost-key.pem',
    },
  },
  app: {
    pageTransition: {
      name: 'default',
      mode: 'out-in',
      duration: 120,
    },
    buildAssetsDir: 'public-assets',
    head: {
      charset: 'utf8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',
    },
    rootAttrs: {
      id: 'app',
    },
  },
  srcDir: "src/",
  serverDir: "../server/src",
  experimental: {
    typedPages: true,
  },
  compatibilityDate: "2025-02-16",
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  nitro: nitroConfig,
  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        verbatimModuleSyntax: false,
        moduleResolution: 'bundler',
      },
    },
  },
  hooks: {
    'prepare:types'({ tsConfig }) {
      const aliasesToRemoveFromAutocomplete = ['src', 'src/*', '~', '~/*', '~~', '~~/*', '@', '@/*', '@@', '@@/*']
      for (const alias of aliasesToRemoveFromAutocomplete) {
        if (tsConfig.compilerOptions?.paths[alias]) {
          delete tsConfig.compilerOptions.paths[alias]
        }
      }
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});