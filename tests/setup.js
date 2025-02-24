// tests/setup.js
import { initializeTestApp } from '@firebase/testing';

beforeEach(async () => {
  // 初始化測試 Firebase 應用程式
  const app = initializeTestApp({
    projectId: 'test-recipe-organizer',
  });
  // 其他設定...
});

afterEach(async () => {
  // 清理測試資料
  await cleanup();
});