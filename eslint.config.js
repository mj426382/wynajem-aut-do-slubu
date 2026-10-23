import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'dist-ssr', '.gbp-profile', 'images-src', 'src/blog/index.generated.js']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [js.configs.recommended, reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser },
      parserOptions: { ecmaVersion: 'latest', ecmaFeatures: { jsx: true }, sourceType: 'module' },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    files: ['scripts/**/*.js', 'vite.config.js'],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    // Pages and data modules export helpers next to components; Fast Refresh is a dev-only concern.
    files: ['src/pages/**/*.jsx', 'src/components/**/*.jsx', 'src/entry-server.jsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
])
