# specs/fullstack-course.md（草案）

## 概要
フロントエンド経験者が1人で「設計 → DB → API → UI → 非同期処理 → デプロイ → CI/CD」を縦に通す「フルスタック実践コース」（`fullstack`）を新設する。
題材は1本の業務アプリ「B2B運用ダッシュボード」に固定し、既存のマニュアル（React / API設計/ Infra /開発フロー）が領域ごとに説明していることを、1本のアプリを作る順番に並べ直して、足りない接合部（テナント分離・RBAC・ジョブ・監査ログ・コンテナ配備）だけを新しく書く。

既存マニュアルとの違いは次の2点。

- 既存は「領域ごとの地図」（APIとは、Supabaseとは）。このコースは「1本のアプリを完成させる手順」で、各ページが前のページの成果物を前提にする
- 既存ページで足りる説明は書き直さず、そのページへ飛ばす。このコースが持つのは、接合部の判断とコードだけ

## 入力

### 題材アプリ（固定）
「B2B運用ダッシュボード」。現場の稼働ログが散在し、異常（エラー率の上昇・遅延）の検知と担当者への連絡が手作業になっている、という課題を解く。

必須要件は5つ。コースの各セクションがこの5つに対応する。

| # | 要件 | 対応セクション |
|---|---|---|
| 1 | マルチテナント（ワークスペース単位のデータ分離。RLS）とRBAC（Admin / Member / Viewer） | fullstack-auth |
| 2 | 複合条件の検索（状態・期間・タグ・キーワード）、URLクエリとの同期、ページネーション | fullstack-ui |
| 3 | 時系列の可視化と、CSV / JSONのインポート・エクスポート | fullstack-ui |
| 4 | ルールベースの異常検知と通知（条件を満たしたら状態を変え、Webhookへ送る非同期処理） | fullstack-jobs |
| 5 | 監査ログ（誰が・いつ・何を変えたか） | fullstack-audit |

### 技術スタック（コースで使うもの。代替は「置き換え表」で示す）

| 層 | 採用 | 理由 | 置き換え表に載せる代替 |
|---|---|---|---|
| フロント | Next.js（App Router）+ TypeScript + Tailwind | Reactマニュアルの続きとして読める | Vue / Nuxt（Vueマニュアル） |
| API | Next.jsのRoute Handlers + Zod（第1段階）→ Hono（第2段階、ワーカー分離時） | 最初は1デプロイで完結させ、分離が要る理由が出てから分ける | tRPC |
| DB / ORM | PostgreSQL（Supabase）+ Drizzle | RLSとAuthが同じ基盤にあり、テナント分離の説明が1か所で済む。DrizzleはSQLに近く、生成したマイグレーションを読んで直せる | Neon + Prisma |
| 認証 | Supabase Auth | RLSの`auth.uid()`と直結する | Auth.js / Clerk |
| 非同期 | pg-boss（Postgresをキューにする）+ Cloud Run上のワーカー | 追加のマネージドキューを増やさずに始められる | Upstash QStash / SQS |
| 配備 | Vercel（Web）+ Cloud Run（ワーカー）+ GitHub Actions | コンテナ配備の手順が最短 | AWS App Runner / ECS（InfraマニュアルAWS編） |
| テスト | Vitest + Playwright | サイトと同じ | — |

スタックは1本に固定する。「どれでもよい」と書くと手順が書けなくなる。代替は各セクション末尾の置き換え表で「何が変わるか」だけ示す。

この表は本番の構成。演習はブラウザの中のラボ（[fullstack-lab.md](./fullstack-lab.md)）で行い、ラボの中ではNext.js 15.5以降がWebContainerで動かないため、Vite + Hono + PGliteで同じ設計を組む（ラボの仕様の決定事項を参照）。本番の構成への載せ替えはfullstack-shipで扱う。

### セクションとページ（stepは1から連番）

| section | ページ | path | 既存で代替できる部分 |
|---|---|---|---|
| fullstack-intro（はじめに） | このコースについて | `/fullstack` | |
| | 題材アプリの要件と完成形 | `/fullstack/intro/requirements` | |
| | リポジトリ構成とローカル環境 | `/fullstack/intro/setup` | |
| fullstack-data（データ） | 要件からER図へ | `/fullstack/data/er-diagram` | `/api/data-modeling/design-flow`と`worked-example`を参照し、題材固有の判断だけ書く |
| | Drizzleでスキーマとマイグレーション | `/fullstack/data/drizzle` | `/infra/database/orm`を参照 |
| | シードと開発用データ | `/fullstack/data/seed` | |
| fullstack-auth（認証とテナント） | Supabase Authとセッション | `/fullstack/auth/session` | `/infra/baas/supabase`、`/react/nextjs-practice/middleware` |
| | マルチテナントの設計（workspace_id） | `/fullstack/auth/multi-tenant` | 新規 |
| | RLSポリシー | `/fullstack/auth/rls` | 新規 |
| | RBACとサーバー側のガード | `/fullstack/auth/rbac` | `/api/build/auth`、`/infra/bff/auth` |
| fullstack-api（API層） | ZodスキーマとRoute Handlers | `/fullstack/api/zod-route-handlers` | `/react/nextjs-practice/route-handlers` |
| | エラー設計とべき等性 | `/fullstack/api/errors-idempotency` | `/api/rest-design/error-handling`、`/api/rest-design/idempotency` |
| | Honoへの切り出しと型付きクライアント | `/fullstack/api/hono-rpc` | 新規 |
| fullstack-ui（画面） | 複合検索とURLクエリの同期 | `/fullstack/ui/search` | 新規 |
| | ページネーションと大量データ | `/fullstack/ui/pagination` | 新規 |
| | 時系列グラフと更新 | `/fullstack/ui/timeseries` | 新規 |
| | CSV / JSONのインポートとエクスポート | `/fullstack/ui/import-export` | 新規 |
| fullstack-jobs（非同期処理） | 異常検知ルールの設計 | `/fullstack/jobs/rules` | 新規 |
| | キューとワーカー（pg-boss） | `/fullstack/jobs/queue-worker` | 新規 |
| | Webhook通知と再送 | `/fullstack/jobs/webhook` | `/api/build/webhooks` |
| fullstack-audit（監査ログ） | 監査ログの設計（誰が・いつ・何を） | `/fullstack/audit/design` | 新規 |
| | トリガーで取るか、アプリ層で取るか | `/fullstack/audit/trigger-vs-app` | 新規 |
| fullstack-ship（配備と検証） | Dockerfileとワーカーの配備 | `/fullstack/ship/container` | `/infra/devops/containers` |
| | GitHub ActionsでE2Eと配備 | `/fullstack/ship/ci-cd` | `/react/testing/playwright-e2e`、GitマニュアルGitHub Actions編 |
| | 構成図とADR | `/fullstack/ship/architecture-adr` | `/devflow/team/documentation` |

26ページ。多いので、実装は3段階に分ける（下の「処理フロー」）。

### 添付の計画書（フルスタック・プロダクトエンジニア転身ロードマップ）との対応
計画書は「学習の中身」と「個人の商流・単価」を1枚に書いている。このコースに入れるのは前者だけ。

- 入れる: 1章の技術スタック、2章の初期プロダクト仕様（5要件）、3章フェーズ1（1〜3か月目）の技術面
- 入れない: 4〜6か月目（ワークフローの図解化、記事、営業）。これは個人の計画であって教材ではない。「ワークフローの図解化」と「構成図・ADR」だけは`fullstack-ship/architecture-adr`に教材として残す
- 書き換える: 「初期PoC構築期間を70%短縮」「コミュニケーションコストをゼロ化」のような数値は、裏づけが無いので書かない（AGENTS.mdの教材コンテンツ規約）。書くなら、題材アプリを作ったときの実測（何にどれだけかかったか）を記録して、その数字だけを書く
- 分ける: 計画書は1か月目に5要件すべてを求めるが、要件3と4（時系列・リアルタイム、非同期の検知と通知）はインフラ（ワーカー分離）と一緒でないと説明できない。コースでは第1段階（要件1・2・5）と第2段階（3・4＋配備）に分ける

## 処理フロー
1. 題材アプリを実際に作る。ラボのリポジトリ（`dev-album-lab`、仮）の`exercises/fullstack/`に、課題ごとのstarter・テスト・ルーブリック・模範解答として置く（形はfullstack-lab.mdの「課題の定義」）。教材のコードは全部ここから写し、出力は実行結果から写す（Goマニュアルと同じ規律）
2. 第1段階（10ページ）: fullstack-intro / data / auth。`navigation.ts`に`fullstack`を追加し、`navigation.test.ts`・`SectionBadge`・`Landing`の`Record<ManualId>`・`index.css`のブランド色（3テーマ。`theme-contrast.test.ts`の対象に足す）・`App.tsx`・`searchIndex.ts`・`e2e/manuals.spec.ts`・`e2e/a11y.spec.ts`（代表1ページ）・`announcements.ts`を更新
3. 第2段階（9ページ）: fullstack-api / ui / jobsの前半。ワーカー分離とHonoの切り出しはここ
4. 第3段階（7ページ）: fullstack-jobsの後半/ audit / ship
5. 各段階の最後に、題材リポジトリと教材の整合（コードと出力が一致するか）を`evidence-check`で確認する

## エッジケース
- Dev Album本体のプレビューではバックエンドは動かない → 教材ページでは`CodePreview` / `CodingChallenge`のJSXプレビューを使わず、コードは`CodeBlock`、実行結果は別の`CodeBlock`で示す。手を動かす演習は各ページの「ラボで開く」からラボで行う。UIの見た目だけはJSXプレビューで出せるので、`fullstack-ui`の検索フォームや表の見た目はプレビュー可
- サービスの画面・料金・無料枠は変わる → Supabase / Cloud Run / Vercelの無料枠や上限の数値は書かない。「確認した日付と版」を`VerifiedBox`で付け、数値は公式ページへのリンクにする
- 秘密情報 → `.env.local`の例は値を伏せ字にする。Webhookの送り先URLやAPIキーをコードに書かない
- RLSは効いていなくてもアプリは動く → RLSのページでは「ポリシーを外すと他テナントのデータが見える」ことを、実際に外した状態の実行結果で示す（仕様値と実測値のズレを先に明示する規律）
- pg-bossのジョブは配達が「少なくとも1回」 → Webhookのページで、同じ通知が2回届く場合があることと、べき等キーで受け側が吸収する形を先に書く
- 題材が重い（26ページ、アプリ1本） → 第1段階の10ページだけで「ログインしてテナント内のデータを一覧できる」まで通るように切る。第1段階だけでも公開できる状態にする

## 出力
- 正常系: `fullstack`がマニュアル一覧の末尾（`devflow`の後）に出て、各段階のページが3テーマで描画され、前後ナビでつながる。題材アプリの本番URLとリポジトリがコースの入口から辿れる
- 異常系: 題材アプリが落ちている（無料枠の停止など）→ 教材は実行結果の写しで読めるので、入口に「デモが止まっている場合」の注記を置く

## 完了条件（検証可能な形で）
- [ ] 第1段階: `pnpm check`・`pnpm test`・`pnpm build`・`pnpm check:prose`が緑。`pnpm test:a11y`が新ページでcritical / serious 0（3テーマ）
- [ ] 教材のコードがすべて題材リポジトリに実在し、出力が実行結果と一致する（`evidence-check`）
- [ ] 既存ページで代替できる説明を書き直していない（各ページの「既存で代替できる部分」のリンクが実在する。`link-integrity.test.ts`）
- [ ] 数値（短縮率・料金・無料枠）を根拠なしに書いていない

## 決定事項
1. 新マニュアル`fullstack`として作る（2026-11-07決定）。Reactマニュアルのpartにはしない。マニュアル一覧では`devflow`の後ろに置く
2. 非同期の基盤はpg-boss（Postgres内）にする（2026-11-07、推奨案で確定。実装前なら変更できる）。学習の見通しを優先し、Upstash QStashなどには置き換え表で触れる
3. 題材アプリのリポジトリはdev-albumと分ける（2026-11-07、推奨案で確定。実装前なら変更できる）。dev-albumのCIが重くなり、スタックも混ざるため
4. 演習はブラウザ内のラボ（別アプリ、WebContainer方式）で行い、自由に書いたコードを機械判定とAIレビューで見る（2026-11-07決定）。仕様は[fullstack-lab.md](./fullstack-lab.md)。決定事項2のpg-bossは、ラボの第0段階でPGliteで動くかを確かめてから確定し直す
