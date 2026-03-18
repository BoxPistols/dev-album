import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: `http://localhost:${process.env.PORT || 3000}`,
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    port: Number(process.env.PORT) || 3000,
    reuseExistingServer: true,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
