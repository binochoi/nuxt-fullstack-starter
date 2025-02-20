import globals from "globals";
import js from "@eslint/js";
import tslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import binoVue from "@binochoi/eslint-config-vue3";

export default tslint.config(
  {
    files: ["**/*.{ts,vue}"],
  },
  {
    ignores: ["dist", "app/.nuxt"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2025,
      },
    },
  },
  js.configs.recommended,
  ...tslint.configs.recommended,
  ...pluginVue.configs["flat/base"],
  ...pluginVue.configs["flat/essential"],
  ...pluginVue.configs["flat/strongly-recommended"],
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tslint.parser,
      },
    },
  },
  {
    rules: {
      ...binoVue.rules,
      'no-undef': 'off',
    },
  },
);
