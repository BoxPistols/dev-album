import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  // 共有ランナーはローカルより遅く、タイミング由来の揺れが出る。CI のみ再試行して
  // 実バグ（毎回落ちる）と一過性の揺れ（再試行で通る）を切り分ける。
  retries: process.env.CI ? 2 : 0,
  // CI では失敗を PR 上に注釈表示し（github）、追跡用に HTML レポートを残す。
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list']],
  use: {
    baseURL: `http://localhost:${process.env.PORT || 3000}`,
    screenshot: 'only-on-failure',
    // CI 失敗時の原因追跡用。再試行時のみ収集してアーティファクト量を抑える。
    trace: process.env.CI ? 'on-first-retry' : 'off',
  },
  webServer: {
    command: 'npm run dev',
    port: Number(process.env.PORT) || 3000,
    // CI では毎回クリーンな dev サーバを起動する（残留プロセスの再利用による flake を防ぐ）。
    // ローカルでは起動中の dev サーバを再利用して待ち時間を減らす。
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
