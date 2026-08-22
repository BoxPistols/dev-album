import { defineConfig } from '@playwright/test';

import { parsePort } from './client/src/lib/port';

// dev サーバの既定ポートは乱数（vite.config.ts）なので、e2e は必ず値を固定する。
// この値を webServer.env で子プロセスへ渡し、待ち受け側とサーバ側を必ず一致させる。
// 渡さないと vite が乱数ポートで起動し、Playwright は別ポートを待ち続けてハングする。
// 検証は vite 側と同じ関数を使う（待ち受け側とサーバ側で判定がずれないように）。
const PORT = String(parsePort(process.env.PORT) ?? 3400);

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
    baseURL: `http://localhost:${PORT}`,
    screenshot: 'only-on-failure',
    // CI 失敗時の原因追跡用。再試行時のみ収集してアーティファクト量を抑える。
    trace: process.env.CI ? 'on-first-retry' : 'off',
  },
  webServer: {
    command: 'pnpm dev',
    // 子の vite に同じポートを強制する（未指定だと vite が乱数ポートで起動してしまう）。
    env: { PORT },
    port: Number(PORT),
    // CI では毎回クリーンな dev サーバを起動する（残留プロセスの再利用による flake を防ぐ）。
    // ローカルでは起動中の dev サーバを再利用して待ち時間を減らす。
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
