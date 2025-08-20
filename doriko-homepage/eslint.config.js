// @ts-check
import { defineConfig } from 'eslint-define-config'

export default defineConfig({
  extends: [
    '@nuxt/eslint-config'
  ],
  rules: {
    // Vue specific rules
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'warn',
    'vue/require-default-prop': 'warn',
    
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // General code quality
    'no-console': 'warn',
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    
    // Formatting (handled by Prettier)
    'indent': 'off',
    'quotes': 'off',
    'semi': 'off'
  },
  ignorePatterns: [
    'dist/',
    '.nuxt/',
    '.output/',
    'node_modules/',
    'public/'
  ]
})