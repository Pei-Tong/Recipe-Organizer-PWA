import globals from 'globals';
import js from '@eslint/js';
import html from 'eslint-plugin-html';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  js.configs.recommended,
  html.configs.recommended,
  {
    ignores: ['node_modules/', 'dist/', 'docs/, 'tests/recipe.test.js'],
  },
  {
    files: ['**/*.js'],
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      'indent': ['error', 2],
      'semi': ['error', 'always'],
    },
  },
];