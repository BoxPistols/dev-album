# external-service-detail ほか 4 層の再照合（2026-08-23）

2026-08-16 の主張監査で CONFIRMED とした判定のうち、`external-service-detail` の全件と、
抜き取り検査に 1 件も引かれなかった `official-recommendation` / `statistic-or-number` /
`universal-or-superlative` の全件について、引用が主張を支えているかを見直した記録。

依頼は https://github.com/BoxPistols/dev-album/issues/96 に書いてある。前提になった
抜き取り検査は `docs/audits/2026-08-23-confirmed-sampling.md`。

`pnpm check:verdicts` が保証しているのは「引用が原文に文字列として在る」ところまでで、
「その引用がその主張を支えているか」は保証していない。今回見たのは後者だけ。

## 方法

対象は 263 件。内訳は `external-service-detail` 171 件、`official-recommendation` 44 件、
`statistic-or-number` 33 件、`universal-or-superlative` 15 件。`category` は
`docs/audits/2026-08-16-unverified-claims.json` を `(file, claim)` で突き合わせて付けた。

判定は盲検で行った。263 件から `claim` と `quote` だけを取り出した一時ファイルを作り、
ファイル名・`verdict`・`evidence`・`sourceUrl`・`category` を伏せた状態で全件の判定を
書き終えてから突き合わせた。並び順はシード 96 で混ぜてあり、category が隣接して
漏れないようにした。

判定は抜き取り検査と同じ 3 値。

| 判定 | 定義 |
|---|---|
| SUPPORTS | 主張の中で外部情報に照らして確かめられる断定が、すべて引用の中にある |
| PARTIAL | 一部は引用にあるが、確かめられる断定が少なくとも 1 つ引用の外に残っている |
| DOES-NOT-SUPPORT | 主張の断定を 1 つも裏づけていない、または矛盾している |

## 見直し前の判定

| 判定 | 件数 | 割合 |
|---|---|---|
| SUPPORTS | 152 | 57.8% |
| PARTIAL | 96 | 36.5% |
| DOES-NOT-SUPPORT | 15 | 5.7% |
| 計 | 263 | |

category 別。

| category | SUPPORTS | PARTIAL | DOES-NOT-SUPPORT | 計 |
|---|---|---|---|---|
| external-service-detail | 98 | 64 | 9 | 171 |
| official-recommendation | 26 | 15 | 3 | 44 |
| statistic-or-number | 20 | 13 | 0 | 33 |
| universal-or-superlative | 8 | 4 | 3 | 15 |

抜き取り検査（40 件）の SUPPORTS 率は 62.5% で、そこから推定した
`external-service-detail` の 50%（12 件中 6 件）に対し、全件では 57.3%（171 件中 98 件）
だった。標本の値は誤差の範囲に収まっている。

DOES-NOT-SUPPORT が 15 件のうち 9 件が `external-service-detail` に落ちた点は
抜き取りと同じ傾向。`universal-or-superlative` は 15 件中 3 件（20%）が
DOES-NOT-SUPPORT で、母集団は小さいが率としては最も高い。

## 文の途中で切れた引用を機械で洗い出す

抜き取り検査で見つかった 4 つの外し方のうち「切り詰めで主語が落ちた」型は機械で拾える。
`scripts/check-quote-fragments.mjs` を足し、`pnpm check:quote-fragments` で回せるようにした。

見る合図は 2 つに絞ってある。

- 末尾が機能語で終わる（`The default storage class. If you` / `For advanced control, create an`）
- 先頭が継続語から始まる（`are not impacted by this sunset …`）

散文でないもの（コード・設定・表の行・識別子の列挙）は対象にしない。終止記号が無いだけの
引用は正しいものが大量にあるので合図にしない。「小文字で始まる」だけを合図にすると
用語の定義文（`server.port Type: number …`）を 200 件超拾うので、小文字始まりであることと
前の語が要る語であることの両方を求めている。

この検査を今回の判定 JSON にかけると、修正前が 35 件、修正後が 0 件。実際の作業では
これより緩い初期版が出した 58 件を候補として回したので、対象カテゴリ外の判定
（`spec-or-standard` / `tool-behavior` / REFUTED 判定など）44 件も一緒に直っている。

検査そのものの単体テストは `client/src/lib/quote-fragments.test.ts`。拾う例と拾わない例を
実物の引用で固定してあり、判定を緩めると落ちる。

## 何を直したか

対象 160 件（盲検で PARTIAL / DOES-NOT-SUPPORT だった 111 件 + 断片検出だけに引っかかった
49 件）を出典から取り直した。加えて次の 8 件を個別に見ている。

- 動く URL を指していた 2 件（Git for Windows のリリース、VS Code のダウンロード）
- 原文が書き換わって引用が外れていた 4 件（Claude Code の MCP ドキュメント 2 件、
  GitHub Copilot のプラン、GitHub のランナー表）
- 一括実行のときだけ取得に失敗していた 1 件（cursor.com）
- 断片検出の絞り込みを厳しくした後に新しく出た 1 件（AWS Well-Architected の 6 本柱）

| 変更 | 件数 |
|---|---|
| 引用を差し替えた | 128 |
| `sourceUrl` を差し替えた | 5 |
| `evidence` を更新した | 168 |
| 判定を変えた（CONFIRMED → UNDETERMINED） | 4 |
| 引用を据え置いた（出典に足せる逐語が無い） | 36 |
| 出典を取得できなかった | 1 |

引用の差し替えは 96 の教材ページに紐づく判定に及ぶ。差し替えた引用はすべて
`scripts/lib/source-fetch.mjs` の正規化を通した逐語照合で確認してある。

### 判定を変えた 4 件

いずれも npm のダウンロード数 1 件だけを出典にして比較優位を述べていたもので、
出典が単一パッケージの計測値しか含まないため、引用を取り直しても支えられない。
教材からは比較の断定を削った（弱めるのではなく落とす）。

| ページ | 削った断定 |
|---|---|
| `react/mui/MuiIntro.tsx` | 「世界で最も利用されている」 |
| `react/api-design/GraphQL.tsx` | 「最も広く使われているのが」 |
| `threejs/Home.tsx` | 「最も人気のあるライブラリが」 |
| `react/practice-app/Api.tsx` | 出典（JSONPlaceholder Guide）との紐づけ。本文は演習の指示で事実主張ではないので残した |

### 動く出典を固定した

内容が時間とともに書き換わる URL は、判定が正しくてもいつか照合に落ちる。実際、
2 件は今回の再照合の時点で既に落ちていた。

| 元の URL | 固定先 |
|---|---|
| `api.github.com/repos/git-for-windows/git/releases/latest` | `releases/tags/v2.55.0.windows.5` |
| `code.visualstudio.com/sha/download?build=stable&os=win32-x64-user`（実機 curl） | `update.code.visualstudio.com/api/versions/1.134.0/win32-x64-user/stable` |
| `designtokens.org/TR/drafts/format/` | `designtokens.org/TR/2025.10/format/` |
| `api.npmjs.org/downloads/point/last-month/three` | 固定せず UNDETERMINED（期間を打っても比較優位は支えられないため） |

いずれも `evidence` に「元は動く URL だった」と書き残してある。`latest` へ戻さないこと。

`docs.github.com` のランナー表は HTML の表を 1 行に詰めた引用だったため、表の中身が
更新された時点で外れていた。ラベルとアーキテクチャの対応が 1 行で読める
`actions/runner-images` の README へ出典を移した。

### 出典を実測へ移した 1 件

`react/api-design/OpenApiSwagger.tsx` の「POST /posts は 201 Created が返る」は、
JSONPlaceholder の Guide 全文に `201` も `Created` も無い。一方でステータスコード自体は
curl で再現できるので、出典を実測へ移した（`local:` 前置きの再現コマンド）。文書に無い
挙動を文書由来として扱わないための差し替えで、教材の記述は正しい。

## 教材ページの修正

| ファイル | 何をしたか |
|---|---|
| `client/src/pages/react/mui/MuiIntro.tsx` | 「世界で最も利用されている」を削った |
| `client/src/pages/react/api-design/GraphQL.tsx` | 「最も広く使われているのが」を削った |
| `client/src/pages/threejs/Home.tsx` | 「最も人気のあるライブラリが」を削った |
| `client/src/pages/react/tailwind/Shadcn.tsx` | Dialog を「Radix UI ベース」と述べる文を削った。同ページの InfoBox が既に「2026 年 7 月以降の既定は Base UI」と書いており、本文と食い違っていた |
| `client/src/pages/infra/hosting/Vercel.tsx` | Edge ランタイムの例に、Next.js 側で `runtime` の export が非推奨になった旨を日付つきで足した |

再照合で REFUTED になった 13 件のうち 9 件は、教材ページの側が既に直っていた（監査は
2026-08-16 時点の記述に対するもので、その後の PR で修正済み）。判定 JSON の `claim` が
古いまま残っている状態で、削るべき記述はページに無い。各判定の `pageFix` にその旨を
書いてある。

## 残った未裏づけ

引用を取り直しても、出典側に記述が無くて支えられなかった断定。判定は CONFIRMED のまま
（引用は主張の中心を支えている）で、残りをここに書き出す。教材から落とすか、別の一次情報を
足すかは別の判断になる。

### 比較・全称の表現（構造的に 1 本の逐語で支えにくい層）

- `react/tailwind/Intro.tsx` —「最も人気のあるスタイリング手法」。出典（State of CSS）は
  継続利用意向で Tailwind が突出していることを述べるが、順位の断定は平文に無い
- `react/accessibility/FormA11y.tsx` — reCAPTCHA v3 の「問題が最も少ない」。公式に比較の
  記述が無い。この一句は落とすのが正しい対応
- `ai-ml/lmops/LmopsWorkflow.tsx` — Haiku / Sonnet / Opus の価格の序列。料金表のセルにしか
  無く、表を 1 行に詰めた引用は使えない。能力の序列のほうは引用で支えた
- `devflow/devops/Dora.tsx` — Elite のしきい値（1 日未満・1 時間未満）。表の中だけにある

### 出典が別の対象を扱っているもの

- `infra/observability/Monitoring.tsx` — Sentry のスタックトレース・発生頻度・
  フロント/バック双方。docs トップはナビ主体で該当が無い
- `infra/hosting/CloudflarePages.tsx` — R2 の S3 互換。料金ページには無く別ページにある
- `infra/baas/Supabase.tsx` / `infra/baas/Comparison.tsx` — 「オープンソース」。
  セルフホスト手順のページには記述が無い
- `api/data-modeling/ErDiagram.tsx` — dbdiagram.io の DBML・エクスポート・無料枠。
  ページが JS 描画で本文を取得できない（https://github.com/BoxPistols/dev-album/issues/58 の範囲）
- `claude-code/multi-ai-architecture/DesignMd.tsx` — DESIGN.md の発行元（Google Labs）。
  README 本文に帰属を述べた文が無く、リポジトリ名にしか現れない
- `react/react-basics/HelloReact.tsx` — Jordan Walke が Facebook のエンジニアである点と
  2013 年の公開。謝辞ページに記載が無い
- `react/hooks-deep/CustomHooks.tsx` — ahooks の「60 以上の Hook」。npm のメタデータに無い
- `react/css-basics/CssInJs.tsx` — Panda CSS の「ゼロランタイム」。npm のメタデータに無い

### 版のずれ

- `claude-code/mcp/MCPPractical.tsx` — Serena の対応言語数。教材は「30+」、現在の README は
  `over 40 programming languages`。矛盾はしないが古い
- `git/github-actions/Reference.tsx` — `macos-14` は `actions/runner-images` で deprecated の
  印が付いている（https://github.com/actions/runner-images/issues/13518）。ラベル自体は今も arm64 だが、いずれ使えなくなる
- `api/rest-design/Idempotency.tsx` — 422 と 409 を「内容の違うリクエスト」に並列で当てているが、
  ドラフトは 422 =「同じキーで payload が違う」、409 =「元のリクエストが処理中に再送」と
  別の場面に割り当てている

### 残した食い違い（今回の対象外）

- `react/tailwind/Shadcn.tsx` の冒頭・箇条書き・参考リンクには「Radix UI をベースにした」が
  残っている。監査対象だったのは Dialog 節の 1 文だけなので、そちらだけを直した。
  ページ全体の記述を Base UI 前提へ揃えるのは別の作業になる

## 検査の結果

- `pnpm check:verdicts` — 触った判定はすべて一致
- `pnpm check:verdicts:low` — 触った判定はすべて一致
- `pnpm check:quote-fragments` — 0 件

再照合の前から落ちていたもの（今回の変更とは無関係）は次のとおり。

- medium: 不一致 17 件（CONFIRMED 8 / REFUTED 8 / UNDETERMINED 1）、取得失敗 4 URL。
  このうち対象カテゴリに入っていた 5 件（`claude-code/mcp/MCPSetup.tsx` と
  `MCPPractical.tsx` の「Only the tools Claude actually uses enter context.」、
  `claude-code/ai-coding-agents/GithubCopilot.tsx`、`git/github-actions/Reference.tsx`、
  `vue/basics/Setup.tsx`）は今回直した。残りは対象外なので手を付けていない
- low: 不一致 2 件。どちらも動く URL が原因で、両方とも今回直した

取得失敗 4 URL のうち `https://cursor.com/docs/context/rules` は、単体で取り直すと 200 が
返り引用も逐語で在った。一括実行のときだけ落ちる種類の失敗で、引用の問題ではない。

## この記録の限界

- 判定者は 1 名（1 エージェント）。SUPPORTS と PARTIAL の境目には判定者の癖が残る
- 「評価・推奨の表現は確かめられる断定に数えない」という基準を先に固定したが、
  境界例（「1 行で書ける」「〜が自然」）の扱いは揺れうる
- 引用が原文に在るかは `pnpm check:verdicts` に任せた。今回見たのは対応だけ
- 監査（2026-08-16）以降にページが更新されているものがあり、判定 JSON の `claim` と
  現在のページ内容は必ずしも一致しない。REFUTED 13 件のうち 9 件がこれに当たる
- `spec-or-standard`（母集団 160 件）と `tool-behavior`（同 317 件）は今回の対象外。
  断片検出に引っかかった分だけ直っている
