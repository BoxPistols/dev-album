# 主張抽出の網羅性検証（2026-08-23）

[2026-08-16 の監査](./2026-08-16-claim-audit.md)は「全 342 ページから外部検証可能な主張を 1520 件抽出した」と書いているが、
抽出そのものが網羅的だったかは確かめていなかった。エージェントの自己申告した `pagesScanned` は
「読んだページ数」であって「主張を漏れなく拾ったか」の保証ではない。
この記録は https://github.com/BoxPistols/dev-album/issues/48 が提案した 2 つの検査の結果である。

やったことは 2 つ。

1. 抽出済み主張をページ単位で数え直し、0〜1 件のページを洗い出して実際に読んだ（カバレッジ調査）
2. 既知の誤りを 5 件仕込んだページの複製で抽出をやり直し、拾えるかを見た（既知誤りの注入）

## 方法

### カバレッジ調査

`pnpm claim:coverage`（`scripts/claim-coverage.mjs`）が数える。
`navigation.ts` のページ一覧と `App.tsx` の `lazy` import + `<Route>` を突き合わせて
URL パス → ソースファイルの対応を作り、監査が残した記録をファイル単位で数え上げる。

数えた記録は次の 3 つで、これが監査の残したすべてである。

| 記録 | 中身 | 件数 |
|---|---|---|
| `docs/audits/2026-08-16-unverified-claims.json` | low / medium に分類した主張 | 1054 |
| `docs/audits/2026-08-16-claim-audit.md` | high のうち REFUTED | 152 |
| 同上 | high のうち UNDETERMINED | 34 |
| `client/src/data/sources.generated.ts` | high のうち CONFIRMED の出典帰属（`usedByFiles`） | 174 |

ここで最初の発見がある。**high に分類した 466 件のうち、CONFIRMED 280 件は主張単位の記録が残っていない。**
逐語照合を通った出典の `usedByFiles` を辿ると 151 出典 × 109 ファイル = 174 の帰属しか残らず、
「どのページから何件の CONFIRMED が出たか」は復元できない。以降の CONFIRMED 列は件数の下限である。
`low-verdicts.json` / `medium-verdicts.json` の 1054 件は `unverified-claims.json` と同じ主張への判定なので、
二重には数えていない（`(file, claim)` の組で 1053 件が一致、1 件だけ本文の改行位置が違う）。

もう 1 つ、監査時点（コミット `a0f70ba`）に存在しなかったページは対象外だったはずなので、
`git ls-tree` で当時のページ集合を取り、`claude-mux` → `claude-code` の改名を吸収してから区別している。

### 既知誤りの注入

監査の抽出はエージェントに読ませる方式だったので、同じ方式で再実行した。
3 ページの複製をスクラッチ領域に作り、もっともらしい誤りを 5 件（バージョン番号・制限値・
仕様の帰属・既定値・日付を 1 件ずつ）本文に混ぜ、仕込みを知らない新しいエージェントに
`.claude/skills/evidence-check/SKILL.md` の抽出基準だけを渡して主張を抽出させた。
複製はリポジトリに入れていない。

「拾えた」の定義は**抽出された主張の一覧にその文が現れること**で、真偽の照合まではこの検査の対象外。
抽出が網羅的かを見るのが目的だからで、抽出に上がらない誤りはそもそも照合の土俵に乗らない。

## 結果 1: カバレッジ調査

現行 350 ページ、記録された主張 1414 件（うち CONFIRMED 分は下限）。

| マニュアル | ページ | 主張 | 平均 | 0〜1 件 | 0 件 | 1 件 | 監査後に追加 |
|---|---|---|---|---|---|---|---|
| learning | 10 | 0 | 0.0 | 10 | 10 | 0 | 10 |
| react | 82 | 394 | 4.8 | 12 | 5 | 7 | 0 |
| git | 43 | 201 | 4.7 | 8 | 3 | 5 | 0 |
| threejs | 23 | 69 | 3.0 | 5 | 0 | 5 | 0 |
| claude-code | 48 | 215 | 4.5 | 12 | 9 | 3 | 7 |
| ai-ml | 11 | 40 | 3.6 | 3 | 1 | 2 | 0 |
| ux-design | 15 | 46 | 3.1 | 4 | 3 | 1 | 0 |
| api | 41 | 148 | 3.6 | 8 | 3 | 5 | 0 |
| vue | 22 | 98 | 4.5 | 1 | 0 | 1 | 0 |
| infra | 34 | 112 | 3.3 | 6 | 4 | 2 | 0 |
| devflow | 21 | 79 | 3.8 | 1 | 1 | 0 | 0 |

**抽出 0〜1 件のページは 70。うち 17 ページは監査後に追加されたもので、対象外。
監査時に存在していて 0〜1 件だったページは 53 ページある。**

監査後に追加された 17 ページは learning の 10 ページ全部と claude-code の 7 ページで、
どれも 1 件も主張が登録されていない。監査は「全ページ」を名乗るが、
その全ページは 2026-08-16 時点の集合であって、現行の集合ではない。

53 ページが短いから主張が少ない、という説明は成り立たない。
53 ページの行数の中央値は 433 行で、全 350 ページの中央値 446 行とほぼ変わらない。
最長は 1525 行の `react/practice-app/Portfolio.tsx`（0 件）、次が 1254 行の
`react/state-events/ConditionalList.tsx`（0 件）である。

### 0〜1 件のページ一覧

`*` は監査後に追加された対象外ページ。左の数字が記録されている主張の件数。

**learning**（10）

| 件 | パス | ソース |
|---|---|---|
| *0 | `/learning` | `client/src/pages/learning/Welcome.tsx` |
| *0 | `/learning/approach/first-encounter` | `client/src/pages/learning/approach/FirstEncounter.tsx` |
| *0 | `/learning/approach/principles-first` | `client/src/pages/learning/approach/PrinciplesFirst.tsx` |
| *0 | `/learning/approach/knowing-you-know` | `client/src/pages/learning/approach/KnowingYouKnow.tsx` |
| *0 | `/learning/sources/primary-sources` | `client/src/pages/learning/sources/PrimarySources.tsx` |
| *0 | `/learning/sources/official-catchup` | `client/src/pages/learning/sources/OfficialCatchup.tsx` |
| *0 | `/learning/sources/search-technique` | `client/src/pages/learning/sources/SearchTechnique.tsx` |
| *0 | `/learning/with-ai/how-to-ask` | `client/src/pages/learning/with-ai/HowToAsk.tsx` |
| *0 | `/learning/with-ai/where-ai-fails` | `client/src/pages/learning/with-ai/WhereAiFails.tsx` |
| *0 | `/learning/habits/when-stuck` | `client/src/pages/learning/habits/WhenStuck.tsx` |

**react**（12）

| 件 | パス | ソース |
|---|---|---|
| 1 | `/react` | `client/src/pages/react/Home.tsx` |
| 1 | `/react/react-basics/jsx` | `client/src/pages/react/react-basics/Jsx.tsx` |
| 0 | `/react/react-basics/components` | `client/src/pages/react/react-basics/Components.tsx` |
| 0 | `/react/react-basics/props` | `client/src/pages/react/react-basics/Props.tsx` |
| 0 | `/react/react-basics/typescript` | `client/src/pages/react/react-basics/TypeScriptBasics.tsx` |
| 1 | `/react/state-events/events` | `client/src/pages/react/state-events/Events.tsx` |
| 0 | `/react/state-events/conditional-list` | `client/src/pages/react/state-events/ConditionalList.tsx` |
| 1 | `/react/state-events/forms` | `client/src/pages/react/state-events/Forms.tsx` |
| 0 | `/react/practice-app/portfolio` | `client/src/pages/react/practice-app/Portfolio.tsx` |
| 1 | `/react/nextjs-server/data-fetching` | `client/src/pages/react/nextjs-server/DataFetching.tsx` |
| 1 | `/react/nextjs-practice/route-handlers` | `client/src/pages/react/nextjs-practice/RouteHandlers.tsx` |
| 1 | `/react/testing/overview` | `client/src/pages/react/testing/Overview.tsx` |

**git**（8）

| 件 | パス | ソース |
|---|---|---|
| 0 | `/git` | `client/src/pages/git/Home.tsx` |
| 1 | `/git/environment/git` | `client/src/pages/git/environment/Git.tsx` |
| 1 | `/git/github/account` | `client/src/pages/git/github/Account.tsx` |
| 1 | `/git/markdown-prompt/prompt-engineering` | `client/src/pages/git/markdown-prompt/PromptEngineering.tsx` |
| 0 | `/git/workflow/commit` | `client/src/pages/git/workflow/Commit.tsx` |
| 1 | `/git/workflow/history` | `client/src/pages/git/workflow/History.tsx` |
| 0 | `/git/flow-automation/why` | `client/src/pages/git/flow-automation/Why.tsx` |
| 1 | `/git/advanced/integration` | `client/src/pages/git/advanced/Integration.tsx` |

**threejs**（5）

| 件 | パス | ソース |
|---|---|---|
| 1 | `/threejs` | `client/src/pages/threejs/Home.tsx` |
| 1 | `/threejs/basics/scene` | `client/src/pages/threejs/basics/scene.tsx` |
| 1 | `/threejs/game-dev/overview` | `client/src/pages/threejs/game-dev/overview.tsx` |
| 1 | `/threejs/game-dev/aircraft` | `client/src/pages/threejs/game-dev/aircraft.tsx` |
| 1 | `/threejs/game-dev/terrain` | `client/src/pages/threejs/game-dev/terrain.tsx` |

**claude-code**（12）

| 件 | パス | ソース |
|---|---|---|
| 1 | `/claude-code` | `client/src/pages/claude-code/getting-started/Welcome.tsx` |
| 0 | `/claude-code/getting-started/why-claude-code` | `client/src/pages/claude-code/getting-started/WhyClaudeCode.tsx` |
| 1 | `/claude-code/claude-intro/install-setup` | `client/src/pages/claude-code/claude-intro/InstallSetup.tsx` |
| *0 | `/claude-code/claude-core/explore-plan-code-commit` | `client/src/pages/claude-code/claude-core/ExplorePlanCodeCommit.tsx` |
| *0 | `/claude-code/claude-core/permission-modes` | `client/src/pages/claude-code/claude-core/PermissionModes.tsx` |
| *0 | `/claude-code/claude-core/project-rules` | `client/src/pages/claude-code/claude-core/ProjectRules.tsx` |
| *0 | `/claude-code/agent-extensions/skills-deep-dive` | `client/src/pages/claude-code/agent-extensions/SkillsDeepDive.tsx` |
| *0 | `/claude-code/multi-ai/file-map` | `client/src/pages/claude-code/multi-ai-architecture/FileMap.tsx` |
| 1 | `/claude-code/cmux/worktrees` | `client/src/pages/claude-code/cmux/CmuxWorktrees.tsx` |
| *0 | `/claude-code/best-practices/verification-and-trust` | `client/src/pages/claude-code/best-practices/VerificationAndTrust.tsx` |
| *0 | `/claude-code/best-practices/browser-verification` | `client/src/pages/claude-code/best-practices/BrowserVerification.tsx` |
| 0 | `/claude-code/best-practices/spec-driven-dev` | `client/src/pages/claude-code/best-practices/SpecDrivenDev.tsx` |

**ai-ml**（3）

| 件 | パス | ソース |
|---|---|---|
| 0 | `/ai-ml` | `client/src/pages/ai-ml/Home.tsx` |
| 1 | `/ai-ml/ai-overview/ml-concepts` | `client/src/pages/ai-ml/ai-overview/MlConcepts.tsx` |
| 1 | `/ai-ml/python-ml/python-basics` | `client/src/pages/ai-ml/python-ml/PythonBasics.tsx` |

**ux-design**（4）

| 件 | パス | ソース |
|---|---|---|
| 0 | `/ux-design` | `client/src/pages/ux-design/Home.tsx` |
| 0 | `/ux-design/research/persona-journey` | `client/src/pages/ux-design/research/PersonaJourney.tsx` |
| 1 | `/ux-design/for-designers/component-thinking` | `client/src/pages/ux-design/for-designers/ComponentThinking.tsx` |
| 0 | `/ux-design/for-designers/ai-collaboration-with-tokens` | `client/src/pages/ux-design/for-designers/AiCollaborationWithTokens.tsx` |

**api**（8）

| 件 | パス | ソース |
|---|---|---|
| 0 | `/api` | `client/src/pages/api/Home.tsx` |
| 0 | `/api/basics/what-is-api` | `client/src/pages/api/basics/WhatIsApi.tsx` |
| 1 | `/api/data-modeling/normalization` | `client/src/pages/api/data-modeling/Normalization.tsx` |
| 1 | `/api/data-modeling/design-flow` | `client/src/pages/api/data-modeling/DesignFlow.tsx` |
| 1 | `/api/data-modeling/worked-example` | `client/src/pages/api/data-modeling/WorkedExample.tsx` |
| 0 | `/api/openapi/schema-first` | `client/src/pages/api/openapi/SchemaFirst.tsx` |
| 1 | `/api/build/webhooks` | `client/src/pages/api/build/Webhooks.tsx` |
| 1 | `/api/collaboration/design-and-api` | `client/src/pages/api/collaboration/DesignAndApi.tsx` |

**vue**（1）

| 件 | パス | ソース |
|---|---|---|
| 1 | `/vue` | `client/src/pages/vue/Home.tsx` |

**infra**（6）

| 件 | パス | ソース |
|---|---|---|
| 0 | `/infra` | `client/src/pages/infra/Home.tsx` |
| 0 | `/infra/foundations/landscape` | `client/src/pages/infra/foundations/Landscape.tsx` |
| 0 | `/infra/foundations/choosing` | `client/src/pages/infra/foundations/Choosing.tsx` |
| 0 | `/infra/baas/what-is-baas` | `client/src/pages/infra/baas/WhatIsBaas.tsx` |
| 1 | `/infra/database/relational` | `client/src/pages/infra/database/Relational.tsx` |
| 1 | `/infra/bff/api-gateway` | `client/src/pages/infra/bff/ApiGateway.tsx` |

**devflow**（1）

| 件 | パス | ソース |
|---|---|---|
| 0 | `/devflow` | `client/src/pages/devflow/Home.tsx` |

## 結果 2: 実際に読んで確かめた

53 ページのうち 19 ページを読んだ。内訳は issue の指定どおり infra と devflow の全該当ページ（7）と、
残りのマニュアルから 12 ページ。読み手には `.claude/skills/evidence-check/SKILL.md` の抽出基準だけを渡し、
既存の抽出結果と突き合わせて「本当に無いのか、拾い漏れたのか」を判断させた。
挙がった行はすべて `sed -n` で現物を確認している。

**19 ページ中 6 ページは妥当、13 ページに抽出漏れがあった。漏れは合計 44 件。**

妥当だった 6 ページは `infra/Home.tsx` / `devflow/Home.tsx` / `git/Home.tsx` / `api/Home.tsx` /
`ai-ml/Home.tsx` / `api/basics/WhatIsApi.tsx` で、5 つはカリキュラムの索引ページ、
1 つは概念の語義説明だった。つまり **0 件が正しかったのは「主張を書いていないページ」だけ**で、
教材本体で 0 件だったページは全部が拾い漏れである。

### infra / devflow

| ファイル | 行 | 主張（要約せず先頭を引く） | 決着させる一次情報 | risk |
|---|---|---|---|---|
| `infra/foundations/Landscape.tsx` | 302-304 | 事業者はデータセンターの物理セキュリティやハードウェア、仮想化基盤の安全を守ります。一方、利用者はアプリのコード、アクセス権限の設定、保存するデータの扱いに責任を持ちます。 | AWS 責任共有モデル（同ページ L396 でリンク済みだがレジストリ未登録） | high |
| `infra/foundations/Landscape.tsx` | 313-315 | データベースやキャッシュを「マネージドサービス」として使うと、バックアップ・パッチ適用・障害時のフェイルオーバーを事業者が肩代わりしてくれます。 | RDS / Cloud SQL の自動バックアップと Multi-AZ の公式記載 | medium |
| `infra/foundations/Landscape.tsx` | 276-278 | 各リージョンの中には、電源やネットワークが独立したアベイラビリティゾーン（AZ）が複数あり | AWS Regions and Availability Zones | medium |
| `infra/foundations/Landscape.tsx` | 39 | 関数単位でコードをデプロイし、リクエストが来たときだけ実行する。 | Lambda / Cloudflare Workers の実行モデル | medium |
| `infra/foundations/Landscape.tsx` | 54 | フロントエンドのデプロイとエッジ配信に強い。設定より規約を重視し、Git push からデプロイまでの体験を整えている。 | Vercel / Netlify / Cloudflare Pages の Git 連携ドキュメント | medium |
| `infra/foundations/Landscape.tsx` | 228 | PaaS・FaaS・SaaS では、OS やミドルウェアの面倒は事業者側が見るため、利用者は OS のパッチ適用を意識せずに済みます。（Quiz の explanation） | 各社の責任範囲ドキュメント | medium |
| `infra/foundations/Choosing.tsx` | 35 | 作り置きした静的ページを、一定間隔やアクセス契機で裏側で再生成する。 | Next.js の ISR（`revalidate` と on-demand revalidation） | medium |
| `infra/foundations/Choosing.tsx` | 107,110 | 最近のフレームワークは、ページ単位でレンダリング方式を切り替えられます。／ページの性質ごとに最適な方式を選ぶのが一般的です。（InfoBox のタイトルは「混ぜて使うのが現代の標準」） | Next.js App Router / Nuxt のルート単位設定 | medium |
| `infra/foundations/Choosing.tsx` | 379 | `Vercel - Rendering 戦略の概要` というタイトルに `https://vercel.com/docs/frameworks/nextjs` を当てている | URL を取得すれば決着する帰属ズレ | medium |
| `infra/baas/WhatIsBaas.tsx` | 21 | テーブルやドキュメントを定義すれば、CRUD API が自動で用意される。 | Supabase の自動生成 API / Firestore の SDK | high |
| `infra/baas/WhatIsBaas.tsx` | 273-274 | 読み書き回数・転送量・関数の実行時間など複数の軸で課金されるため、利用が伸びたときに料金が予想より急に跳ねることがあります。 | Supabase / Firebase の料金ページ | high |
| `infra/baas/WhatIsBaas.tsx` | 16 | メール・パスワード、ソーシャルログイン、マジックリンクなどを設定だけで導入できる。 | Supabase Auth / Firebase Authentication の対応プロバイダ | medium |
| `infra/baas/WhatIsBaas.tsx` | 26 | 画像や動画などのファイルをアップロード・配信する仕組み。アクセス制御や CDN 配信を含めて提供される。 | Supabase Storage / Firebase Storage（CDN の有無はプラン依存） | medium |
| `infra/baas/WhatIsBaas.tsx` | 331-341 | `client.auth.signInWithPassword` / `client.from("posts").select(...)` のコード例 | supabase-js v2 の API リファレンス | medium |
| `infra/database/Relational.tsx` | 241-242 | 多くの場合 B-tree インデックスが使われ、等価検索・範囲検索の両方に効きます。 | PostgreSQL の Index Types | medium |
| `infra/database/Relational.tsx` | 258-260 | 実測では行数が少ない・対象がテーブルの大半に一致するといった場合、プランナがあえて全走査（Seq Scan）を選ぶことがあります。 | PostgreSQL の Using EXPLAIN。自分で再現できるので `kind: "measured"` 候補 | medium |
| `infra/database/Relational.tsx` | 38 | JSON をバイナリ形式で保存し、内部にインデックスを張れる。 | PostgreSQL の JSON Types | medium |
| `infra/database/Relational.tsx` | 43 | PostGIS（地理空間）、pg_trgm（あいまい検索）など、CREATE EXTENSION 一行で機能を足せる。 | `CREATE EXTENSION` / PostGIS 公式（PostGIS は別途インストールが要る） | medium |
| `infra/bff/ApiGateway.tsx` | 189 | 原則行わない（リバースプロキシは集約を行わない、という表のセル） | nginx / Envoy のドキュメント。存在の否定形 | low |

`infra/bff/ApiGateway.tsx` L177-178 の「基本的な仕組みは標準で持つ（nginx の Basic 認証、Envoy の
JWT 認証・外部認可フィルタ）」は一度漏れとして挙がったが、確認したところ**漏れではなかった**。
監査は旧文言「標準では持たない（設定で一部可能）」を抽出して REFUTED と判定し、
Envoy の JWT Authentication フィルタの逐語引用を根拠に現在の文言へ直している（コミット `5b19690`）。
判定の記録は `medium-verdicts.json` にある。

### その他のマニュアル

| ファイル | 行 | 主張 | 決着させる一次情報 | risk |
|---|---|---|---|---|
| `claude-code/getting-started/WhyClaudeCode.tsx` | 35 | エディタのプラグインではなく、ターミナルで直接動作するエージェントとして設計されています。 | 公式に VS Code / JetBrains 拡張があるため、ベンダー自身のドキュメントで反証されうる否定 | high |
| `claude-code/getting-started/WhyClaudeCode.tsx` | 87-92 | MCP 連携 — Web UI 型: 非対応（比較表のセル） | 各社の MCP / コネクタ対応ドキュメント。存在の否定 | high |
| `claude-code/getting-started/WhyClaudeCode.tsx` | 99-104 | Git 統合 — Claude Code: 完全 / Web UI 型: 非対応 | 同上。「完全」は一次情報で決着しない評価語 | high |
| `claude-code/getting-started/WhyClaudeCode.tsx` | 75-80 | コマンド実行 — Web UI 型: 不可 | 同上 | medium |
| `claude-code/getting-started/WhyClaudeCode.tsx` | 93-98 | バックグラウンド実行 — Claude Code: 対応 / Web UI 型: タブ必須 | 同上 | medium |
| `claude-code/getting-started/WhyClaudeCode.tsx` | 35 | Claude Code は Anthropic が開発した公式の CLI ツールです。 | 公式ドキュメント。おそらく正しいが逐語引用つきで登録すべき帰属 | low |
| `api/openapi/SchemaFirst.tsx` | 269-283 | 「生成される型（schema.d.ts 抜粋）」として `export interface components { schemas: { ... } }` と `/** Format: int64 */` を断定 | openapi-typescript を実際に回して `kind: "measured"` で登録すべき | high |
| `api/openapi/SchemaFirst.tsx` | 236 | `npx openapi-typescript ./openapi.yaml -o ./src/api/schema.d.ts` | openapi-typescript の CLI ドキュメント | medium |
| `api/openapi/SchemaFirst.tsx` | 242-244 | required に含まれないフィールドは省略可能（?）として表現され | 同上（版とオプションで変わりうる） | medium |
| `api/openapi/SchemaFirst.tsx` | 227-229 | openapi-typescript は OpenAPI 仕様から TypeScript の型定義を生成するツールです。 | 同上 | low |
| `api/openapi/SchemaFirst.tsx` | 35,37 | Spectral で Lint ／ 命名規則・必須フィールド・説明文の有無などをルールで検証し | Spectral の既定ルールセット（`spectral:oas`） | medium |
| `api/openapi/SchemaFirst.tsx` | 41,43 | Prism でモック起動 ／ OpenAPI から自動でモックサーバを立て | Prism のドキュメント | low |
| `threejs/basics/scene.tsx` | 94-96, 219 | 3D オブジェクト、ライト、カメラなど、表示したいものはすべて `scene.add()` でシーンに追加します。 | カメラは `scene.add()` しなくても描画できる。three.js の Creating a scene / `WebGLRenderer.render` | medium |
| `threejs/basics/scene.tsx` | 64 | 視野角 75 度、アスペクト比、描画範囲 0.1〜1000 | `PerspectiveCamera` の引数と単位 | low |
| `react/react-basics/Components.tsx` | 263-264, 752 | React では、大文字で始まる関数がコンポーネントとして認識されます。小文字で始めると HTML タグとして解釈されてしまいます。 | react.dev の Your First Component / JSX の変換規則。Quiz の explanation にも重複 | medium |
| `react/react-basics/Components.tsx` | 222-223 | Thinking in React（React 的に考える）と言います。React 公式ドキュメントでも推奨されているアプローチです。 | react.dev/learn/thinking-in-react（同ページ L912 でリンク済み） | medium |
| `react/react-basics/Components.tsx` | 289 | しかし現在は関数コンポーネントがスタンダードです。 | react.dev がクラスコンポーネントをどう位置づけているか | low |
| `react/react-basics/TypeScriptBasics.tsx` | 297 | 関数の引数 → 推論できないので必須（コード内コメント） | contextual typing で推論される場合がある。TypeScript Handbook | medium |
| `react/react-basics/TypeScriptBasics.tsx` | 565, 700 | React.FC は使わない（旧式の書き方） | react.dev の TypeScript ページ / `@types/react` の変更経緯 | low |
| `react/react-basics/TypeScriptBasics.tsx` | 176, 744 | interface と type はほぼ同じことができます。／ interface は extends で拡張しやすく | TypeScript Handbook の Type Aliases vs Interfaces | low |
| `git/workflow/Commit.tsx` | 237 | 「.」は「現在のフォルダ内のすべてのファイル」を意味します。 | `git-add(1)` の pathspec。再帰性と Git 2.0 以降の削除の扱いが落ちている | medium |
| `git/workflow/Commit.tsx` | 326 | 「q」キーを押すと、ログ表示を終了できます。 | `core.pager` / `GIT_PAGER` 次第 | low |
| `ux-design/research/PersonaJourney.tsx` | 550 | Jeff Gothelf による Lean UX の実践ガイド | 『Lean UX』は Jeff Gothelf と Josh Seiden の共著。同ページ L548 の O'Reilly 書誌ページで決着 | medium |
| `ux-design/research/PersonaJourney.tsx` | 461-462 | エンパシーマップは、Think / Feel / Say / Do の 4 象限で整理するフレームワークです。 | NN/g は Says / Thinks / Does / Feels。L124 で Feel に耳のアイコンを当てているのは XPLANE 版の Hear の混入が疑われる | medium |
| `vue/Home.tsx` | 65 | レンダリングモード（SSR / SSG / ISR） | Nuxt の ISR は `routeRules` の設定であってモードの並びではない | low |

### 併せて見つかった、抽出とは別種の問題

- `git/Home.tsx` L133 の「総学習時間： 約 2 時間 45 分」は、同ファイル L21-42 の `duration`（30 + 20 + 40 + 45 = 135 分）と 30 分ずれている。外部照合ではなくページ内で決着する誤りで、CLAUDE.md の「具体的な数値は記載しない」にも触れる
- `vue/Home.tsx` は監査の指摘どおり本文が直っており、レジストリ側の引用が旧文言（`defineModel` を含む）のまま残っている。`pnpm check:sources` の照合が落ちるはずなので、引用を現行本文から取り直す
- `api/openapi/SchemaFirst.tsx` L419 と L425 は Spectral と Prism で同じ URL スラッグ（`674b27b261c3c-overview`）を指している。片方がコピー由来の誤りである可能性がある
- `claude-code/getting-started/WhyClaudeCode.tsx` L58-107 の比較表は、比較対象が「エディタ拡張型」「Web UI 型」という匿名カテゴリなので**一次情報を当てる先が原理的に存在しない**。SKILL.md の「どれでもない → その文を落とす」に当たる。製品名を明記して各社ドキュメントを出典にするか、表ごと落とすかの二択になる

## 結果 3: 既知誤りの注入

仕込んだ 5 件は次のとおり（複製にだけ入れた。リポジトリには入っていない）。

| # | 型 | 入れた場所 | 仕込んだ文 |
|---|---|---|---|
| 1 | 制限値 | `infra/hosting/Vercel.tsx` 335 | Hobby プランの関数タイムアウトは既定で 300 秒（5 分）、Pro プランでは 900 秒まで引き上げられます。 |
| 2 | 既定値 | `infra/hosting/Vercel.tsx` 341 | Functions の実行リージョンは、プロジェクト設定を変えていなければ既定で hnd1（東京）が選ばれます。 |
| 3 | 仕様の帰属 | `devflow/devops/Dora.tsx` 89 | Four Keys の 4 指標そのものは DORA ではなく SPACE フレームワークが定義したもので、DORA は年次調査でその値を集計する役割を担っています。 |
| 4 | 日付 | `devflow/devops/Dora.tsx` 91 | DORA の年次調査 State of DevOps Report は 2010 年に第 1 回が公開されました。 |
| 5 | バージョン番号 | `infra/devops/Containers.tsx` 222 | マルチステージビルドは Docker 21.03 以降で利用できます。 |

**5 件中 5 件が拾われた。5 件とも risk は high に分類され、照合先の URL も付いた。**
仕込みを知らせずに抽出させ、返ってきた行番号を現物と突き合わせて確認している。
抽出さえ回れば、この種の誤りは取りこぼされない。

問題は件数のほうだった。同じ 3 ページに対して、

| ページ | 2026-08-16 の監査 | 今回の再抽出 | うち high |
|---|---|---|---|
| `infra/hosting/Vercel.tsx` | 5 | 43 | 14 |
| `devflow/devops/Dora.tsx` | 8 | 38 | 17 |
| `infra/devops/Containers.tsx` | 2 | 31 | 3 |

仕込んだ 5 件を差し引いても、再抽出は監査の 7 倍を挙げている。

（再抽出したエージェントの自己申告は「113 件（44 / 39 / 30）」だったが、
実際に返ってきた行を数えると 112 件（43 / 38 / 31）だった。
この issue の出発点である「自己申告した件数は検証ではない」が、検証の側でも同じように起きている。
上の表は数え直した値である。）
DORA のベンチマーク表（Elite / High / Medium / Low の 4 行のしきい値）、
Vercel の `vercel.json` のキー名と `runtime = "edge"` の効果、Docker のレイヤキャッシュの条件は、
どれも一次情報で決着する断定だが、監査の記録には 1 件も入っていない。

ただし条件は完全に同じではない。今回の抽出指示には「網羅性を重視、迷ったら入れる」と書いた。
監査側の指示は残っていないので、この差の一部は指示の違いで説明できる。
`ReferenceLinks` の URL 実在確認のような low の行を除いても差は埋まらないが、
7 倍という数字そのものは上振れしている前提で読むべきである。

**この検査で分かったのは「拾えば当たる、しかし拾う量が足りていない」ということ。**
issue が疑ったのは判定器の精度だったが、弱いのは判定ではなく抽出の網である。

## 推奨

**再監査は必要で、対象は特定のマニュアルに限らない。**

issue の見立ては「infra と devflow の high が少なすぎる」だったが、
調べた結果はそれより広い。0 件のページを読めば漏れが出るし（19 ページ中 13 ページ）、
5 件・8 件と記録が残っているページを読み直しても 40 件前後が新しく出てくる。
つまり抽出の網は特定マニュアルで粗いのではなく、全体的に粗い。

一方で総量が多いので、順番を付ける。

1. **監査後に追加された 17 ページ** — learning の 10 ページ全部と claude-code の 7 ページ。
   一度も抽出されていないので、これは再監査ではなく初回監査になる
2. **infra / devflow** — issue が挙げた領域。外部サービスの数値・制限・料金を扱うのに
   high が 1 桁で、実際に読むと責任共有モデル・BaaS の課金軸・Supabase の自動生成 API といった
   high 相当が出てくる
3. **`claude-code/getting-started/WhyClaudeCode.tsx` の比較表**（L58-107） — 他社製品の
   「非対応」「不可」を匿名カテゴリに対して断定している。ここは記述を直す前に、
   比較対象を製品名にするか表ごと落とすかの判断が要る
4. **`api/openapi/SchemaFirst.tsx`** — 外部ツール 3 つの出力形と CLI フラグを断定していて 0 件
5. **react の `react-basics` / `state-events`** — 基礎ページに 0 件が並ぶ。
   1000 行超のページが 0 件のまま残っている

やり直すときに変えるべきことが 3 つある。

- **抽出結果を主張単位で残す。** 今回 CONFIRMED 280 件のページ内訳を復元できなかったのは、
  記録が `sources.generated.ts` の `usedByFiles`（174 の帰属）にしか残っていないため。
  low/medium と同じ形式の JSON を high についても残せば、次回のカバレッジ調査が機械で完結する
- **`pnpm claim:coverage` を監査の工程に入れる。** 0 件のページが出たら、
  「主張を書いていないページだから 0 件」と言える理由を 1 行で添える。
  今回妥当だった 6 ページは全部が索引ページか語義説明で、判断は 1 行で書ける
- **JSX 本文の外を走査対象に含める。** 見つかった漏れは置き場所に偏りがある。
  ファイル先頭の `const` 配列に切り出したカードデータ、`InfoBox` と `Quiz` の `explanation`、
  表のセル、`ReferenceLinks` の `description`。
  実際、記録された主張のうちソース内に逐語で位置を特定できた 577 件を見ると、
  `Quiz` の `explanation` から出たものは 9 件しかない（`explanation` は 193 ページに 380 個ある）。
  文字列一致による粗い推定なので数字自体は当てにならないが、偏りの向きは他の観察と一致する

追跡は https://github.com/BoxPistols/dev-album/issues/97 に置いた。

## 再現

```bash
pnpm claim:coverage          # 集計と 0〜1 件ページの一覧
pnpm claim:coverage -- --json  # 全ページの件数（JSON）
```
