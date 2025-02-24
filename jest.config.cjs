// jest.config.cjs
module.exports = {
  testEnvironment: 'jsdom', // 模擬瀏覽器環境，因為是 PWA
  roots: ['<rootDir>/tests'], // 測試檔案目錄
  testMatch: ['**/*.test.js'], // 測試檔案匹配模式
  moduleFileExtensions: ['js', 'json', 'node'], // 支持的檔案類型
  transform: {
    '^.+\\.js$': 'babel-jest', // 使用 babel-jest 轉換 ES 模組
  },
};