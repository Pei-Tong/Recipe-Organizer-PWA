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
    ignores: ['node_modules/', 'dist/', 'docs/'],
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
  // 為測試檔案添加 Jest 環境
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.jest, // 添加 Jest 全局變數
      },
    },
    rules: {
      'no-unused-vars': 'off', // 測試檔案可能有更多未使用的變數，略過警告
    },
  },
];