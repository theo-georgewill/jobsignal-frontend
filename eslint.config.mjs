import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  {
    files: ["vite.config.ts"],
    languageOptions: {
      globals: globals.node,
    },
  },
];