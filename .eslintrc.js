module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:jest/all',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  env: { node: true },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {},
};
