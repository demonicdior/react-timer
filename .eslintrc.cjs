module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', 'node_modules'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier', '@emotion'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-explicit-any': ['off']
  },
}
