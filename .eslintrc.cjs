module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module', 
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    'indent': ['error', 2],
    'semi': ['error', 'always'],
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'docs/',
    'tests/',
    'assets/html/', 
  ],
};
