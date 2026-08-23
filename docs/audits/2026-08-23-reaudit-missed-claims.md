# 抽出漏れの再監査（2026-08-23）

2026-08-16 の主張監査が網羅的でなかったことは
`docs/audits/2026-08-23-extraction-completeness.md` で確認した。その結果を受けて、
漏れていた領域から主張を拾い直し、一次情報と照合した記録。

依頼は https://github.com/BoxPistols/dev-album/issues/97 に書いてある。

## 何を対象にしたか

優先順位は issue の順に従った。

1. 監査コミットより後に追加され、一度も対象になっていなかった 17 ページ
   （`learning` 10 ページ、`claude-code` 7 ページ）
2. infra と devflow の薄いページ、および完全性検証が名指しした重い項目
   （`infra/foundations/Landscape.tsx`、`infra/baas/WhatIsBaas.tsx`、
   `api/openapi/SchemaFirst.tsx`）
3. `claude-code/getting-started/WhyClaudeCode.tsx` の比較表
4. react の `react-basics` / `state-events` の薄いページ

## 判定の結果

441 件を抽出して照合した。

| 判定 | 件数 |
|---|---|
| CONFIRMED | 393 |
| UNDETERMINED | 25 |
| REFUTED | 23 |
| 計 | 441 |

マニュアル別の内訳。

| マニュアル | 件数 |
|---|---|
| claude-code | 144 |
| react | 134 |
| infra | 63 |
| learning | 62 |
| api | 37 |
| devflow | 1 |

判定は `docs/audits/2026-08-23-reaudit-verdicts.json` にある。書式は既存の判定 JSON と
同じで、`pnpm check:verdicts:reaudit` が引用の逐語照合を行う。実行結果は
照合 420 件 / 一致 420 件 / 不一致 0 件（引用を持たない判定 21 件は照合の対象外）。

この検査は `.github/workflows/source-checks.yml` の週次実行にも足してある。step だけ
足しても「失敗を issue に報告」の `RESULTS` と「結果を確定」の `OUTCOMES` に載せないと
走るだけで報告されない検査になるので、3 箇所すべてに足した。

## 教材を直したページ

REFUTED 23 件に対応して 11 ページを修正した。裏づけの無い記述は弱めるのではなく落として
いる（`.claude/skills/evidence-check/SKILL.md` の方針）。

- `api/openapi/SchemaFirst.tsx`
- `claude-code/best-practices/BrowserVerification.tsx`
- `claude-code/getting-started/WhyClaudeCode.tsx`
- `infra/bff/ApiGateway.tsx`
- `infra/database/Relational.tsx`
- `infra/foundations/Choosing.tsx`
- `learning/approach/KnowingYouKnow.tsx`
- `react/react-basics/Jsx.tsx`
- `react/react-basics/TypeScriptBasics.tsx`
- `react/state-events/ConditionalList.tsx`
- `react/state-events/Forms.tsx`

`TypeScriptBasics.tsx` で直したもののうち 2 つは、教材としての正確さに直接効く。

`const brandColor = '#2563eb'` のコメントが「string と推論」になっていた。`const` で
束縛したリテラルはリテラル型 `'#2563eb'` に推論される。`string` に広がるのは `let` の
ときで、ここを取り違えたままだと後のジェネリクスの節が読めなくなる。同じファイルの
`useState('')` と、テンプレートリテラルを返す関数の「string と推論」は正しいので
そのままにした。

「React.FC は使わない（旧式の書き方）」も直した。React.FC は非推奨ではない。React 18 の
型定義で `children` の暗黙の宣言が外れたという変化があっただけで、公式が使うなと言って
いるわけではない。このマニュアルが関数宣言に Props の型を付ける方針を採っている、という
書き方に改めた。

## 抽出の網を広げた

完全性検証は、漏れた 44 件が置き場所に偏っていたことを示していた。ファイル先頭の
`const` 配列、`InfoBox` と `Quiz` の explanation、表のセル、`ReferenceLinks` の
description で、どれも `<p>` や `<h2>` の中ではない。

`scripts/lib/prose-scan.mjs` を足し、`pnpm claim:coverage --outside` で JSX 本文の外に
ある散文を数えられるようにした。数えるのは「主張の件数」ではなく「主張が置かれうる散文の
個数」で、抽出の網が届いていたかを見るための代理指標である。数の大小ではなく 0 か否かで
読む。主張 0 件のページが「主張を書いていないページ」なのか「本文の外に主張があるのに
拾えていないページ」なのかを、これで切り分けられる。

## 残っていること

issue #97 が挙げた 4 段のうち、1 から 4 までの対象ページは拾い終えている。ただし
完全性検証が推奨していた「高リスク主張を判定ごとに JSON へ記録する」形への移行は、
2026-08-16 の監査結果そのものの持ち方を変える話なので手を付けていない。CONFIRMED 280 件が
`sources.generated.ts` の 174 件の出典→ファイル対応としてしか残っていない状態は変わらない。
