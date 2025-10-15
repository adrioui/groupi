import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default [
  {
    ignores: ['.tanstack/**', '.nitro/**', '.next/**', '.output/**', 'dist/**', 'build/**', 'src/routeTree.gen.ts'],
  },
  js.configs.recommended,
  ...compat.config({
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }),
]