import withNuxt from '@nuxt/eslint/config'

export default withNuxt({
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
  ignores: [
    'dist/',
    '.nuxt/',
    '.output/',
    'node_modules/',
    'public/'
  ]
})