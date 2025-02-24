export default {
    env: {
      browser: true,
      es2021: true,
      jest: true, // 確保 Jest 環境支持
      node: true, // 確保 Node.js 環境支持
    },
    extends: [
      'eslint:recommended',
      'plugin:jest/recommended', // 添加 Jest 推薦規則
    ],
    plugins: ['jest'], // 添加 Jest 插件
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
      'indent': ['error', 2],
      'semi': ['error', 'always'],
    },
  };