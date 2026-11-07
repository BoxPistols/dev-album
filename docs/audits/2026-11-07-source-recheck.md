# 出典・リンク検査の再照合（2026-11-07）

Issue #121（定期検査の失敗）を受けて、`pnpm check:sources`、`check:verdicts`、`check:verdicts:low`、`check:verdicts:reaudit`、`check:quotes`、`check:links`をローカルで実行し、失敗を分類して直した記録。

判定の方法は次のとおり。失敗した引用ごとに現在の一次情報を読み、原文から逐語の引用を取り直した。そのうえで教材本文の主張が今も成り立つかを確かめ、成り立たないものは本文を直した。引用を消して検査を通すことはしていない。一次情報から記述が消えたものは、本文の主張も外したうえで引用を外した。

## 失敗の分類

修正前の不一致は203件。内訳は、CIの結果と手元の最初の実行を突き合わせた194件（`check:sources`50、`check:verdicts`66、`check:verdicts:low`4、`check:verdicts:reaudit`74）と、照合の途中の再実行で増えた9件。

| 分類 | 件数 | 扱い |
|---|---|---|
| 一次情報側の変更 | 195 | 引用を差し替え、必要な本文を修正した |
| cmuxとNext.js、MUIの出典 | 8 | 別のPRの本文修正を待って解消した。下の表に書いた |

途中で増えた9件は次のとおり。下の一覧には含まない。

| 検査 | 対象 | 変わった内容 |
|---|---|---|
| check:verdicts | `git/github-actions/Reference.tsx` | READMEからmacOS 14 Arm64の行が消えたので、教材の例を`macos-15`へ移した |
| check:verdicts | `react/react19/React19Hooks.tsx` | react.devのform.mdが書き直された |
| check:verdicts | `react/hooks-deep/UseEffect.tsx` | React Routerの版の指定が原文から消えた |
| check:verdicts | `vue/nuxt-basics/WhatIsNuxt.tsx` | 導入コマンドが`npx nuxt add image`に変わった |
| check:verdicts | `react/design-tokens/DarkModeImpl.tsx` | 仕様の手順にparserのabortedの条件が加わった |
| check:verdicts | `api/quality/ContractTesting.tsx` | Schemathesisの対象にgRPCが加わった |
| check:verdicts:low | `ai-ml/lmops/LmopsWorkflow.tsx` | LangfuseのREADMEの説明がAI engineeringに変わった |
| check:verdicts:reaudit | `react/state-events/Events.tsx` | form.mdの文が分かれた |
| check:verdicts:reaudit | `learning/sources/OfficialCatchup.tsx` | VerifiedBoxのprop名がmainで変わった |

### cmux、Next.js、MUIの8件

作業中に#174（cmuxの教材の削除）、#175（Next.js 16）、#176（MUI v9）がmainへ入った。出典`github-com-manaflow-ai-cmux`は#174で消え、残る7件を次のように解消した。

| 検査 | 対象 | 出典 | 解消の仕方 |
|---|---|---|---|
| check:sources、check:quotes | `nextjs-org-docs-app-api-reference-functions-cachelife` | nextjs.org cacheLife | コード例の前置きが`title`に変わったので、コード本体を引用した |
| check:verdicts | `react/nextjs-practice/Optimization.tsx`（imageSizes） | nextjs.org image | 本文は#175で既定値どおりに直っていたので、引用を合わせて判定をCONFIRMEDにした |
| check:verdicts | `react/nextjs-practice/Optimization.tsx`（runtime） | route-segment-config | 箇条書きの記号の変更。本文の例は#175で消えている。判定はREFUTEDのまま |
| check:verdicts | `react/nextjs-server/Rsc.tsx` | server-and-client-components | 原文の表記が`navigator.geolocation`に変わった |
| check:verdicts | `claude-code/cmux/CmuxBrowserAPI.tsx`、`CmuxSetup.tsx`（2件） | manaflow-ai/cmux、code.claude.com | 監査記録は履歴なので書き換えず、`scripts/verify-verdicts.mjs`が「ページ削除済み」として件数を出して照合から外す |
| check:verdicts:low | `react/Home.tsx` | registry.npmjs.org/@mui/material | 本文は版数を書かない「MUI」に直っていた。latestが9.5.0へ進んだので、9系であることまでを引用した |

`check:verdicts`のページ削除済みは10件で、すべてcmuxの教材の判定。

## 到達不能の扱い

| URL | 状況 | 判断 |
|---|---|---|
| threejs.org/manual/en/*（4件） | 404 | 版固定の`raw.githubusercontent.com/mrdoob/three.js/r185/manual/en/`へ移した。平文にHTMLタグが残るので、3件は中略つきの断片で引用した |
| prisma/docsの`orm/prisma-client/...`（2件） | 404 | 構成変更後の`orm/v7/prisma-client/...`へ移した |
| www.starlette.io/responses/ | 接続不可 | 移転先の`starlette.dev/responses/`へ移した |
| webfoundation.org/about/vision/history-of-the-web/ | CIとローカルの両方で接続不可 | Internet Archiveの版を指した |
| agents.md | ローカルで断続的に取得失敗 | 再実行で3件とも一致した。一時的なものとして据え置いた |
| www.khronos.org/gltf/ | 最後の実行で取得失敗（2件） | curlでは200を返す。一時的なものとして据え置いた |
| web.archive.org（3件）、orval.dev、eur-lex.europa.eu（2件） | CIのみ429、403、202 | ローカルでは取得でき引用も一致する。CIのIPによる拒否と判断して据え置いた。取得失敗は5%以内なら赤にならない |

再実行の結果、`check:links`は確認805、切れ0、要手動確認24、リダイレクト46。要手動確認（400、401、403、405、429）は、W3C、MCP、TypeSafeのコンソールなどのボット拒否と認証で、既存の扱いどおり赤にならない。

PDFは`check:verdicts`の6 URLと`check:verdicts:low`の2 URLが、この環境に`pdftotext`が無いため未照合で、CIの結果に従う（Homebrewでの導入に失敗した）。

## スクリプトの問題

- `scripts/check-links.mjs`: fetchの最終URLにフラグメントが残らないので、`#`付きのURLがリダイレクトと判定され、`fix:links`がアンカーを消していた。元のフラグメントを保つようにした（リダイレクト74件→67件）。
- `scripts/trim-quotes.mjs`: 独自の正規化と取得を持っていて、`check:sources`が通る引用まで破棄と判定していた。`scripts/lib/source-fetch.mjs`の共有処理へ揃えた。
- `.github/scripts/link-maintenance.sh`: `gh pr create`が失敗したら、比較用URLをissueへ報告して続けるようにした。

## Link maintenanceの失敗の原因

1. 2026-09-28〜11-02: SDKのベースURL（api.typesafe.aiなど）が404を返すと`check:links`が1で終わり、pnpmが`ELIFECYCLE`を標準出力に足すので`jq`が読めず、`before`の段で止まっていた。#149で修正済みで、ローカルでbefore、fix、afterの通過を確かめた。
2. 2026-09-14: `gh pr create`が「GitHub Actions is not permitted to create or approve pull requests」で失敗した。リポジトリの設定（Settings > Actions > General）によるもので、設定は変えていない。今回の修正で、許可が無くてもissueへの報告に落ちるようにした。

## 主な一次情報の変更

- Claude CodeがAGENTS.mdを読むようになった（v2.1.277以降、CLAUDE.mdが無いとき）
- autoが既定の開始モードになった（v2.1.283以降）。Ultraプランが増えた。既定モデルはOpus 5.5、effortの既定はmedium
- Gemini CLIの個人の無料利用が2026-06-18にAntigravity CLIへ移った
- CursorのCmd+Kのインライン編集が廃止された
- Idempotency-KeyのドラフトがActiveに戻った（-08）
- GitHub Actionsの無料枠が金額のincluded compute usageの説明に変わり、公開されるのは分単価になった
- Jevの公式ドキュメントの応答例、Modelsページ、エラー一覧が更新された

## 件数の内訳

| 区分 | 件数 | 本文は成立 | 本文を一部修正 | 本文を修正 | 一次情報から消えた |
|---|---|---|---|---|---|
| Claude Codeのメモリ・AGENTS.md | 39 | 16 | 15 | 8 | 0 |
| Claude Codeの運用 | 24 | 10 | 11 | 1 | 2 |
| Claude Codeのその他 | 56 | 34 | 13 | 9 | 0 |
| Claude Code以外 | 67 | 50 | 13 | 3 | 1 |

#180と重なったClaude Codeのページは#180の内容を優先した。下の一覧の本文修正のうち、そのページの分は#180の文面になっている。

## 差し替えた引用の一覧

引用の全文は`client/src/data/sources*.ts`と各判定JSONにある。JSONの`evidence`末尾にも同じ理由を書いた。

| 登録元 | 出典IDまたは教材ファイル | 判定 | 変わった内容 |
|---|---|---|---|
| sources | `claude-code-memory` | 本文を修正 | 「CLAUDE.mdだけを読む」記述は削除され、v2.1.277以降はCLAUDE.mdが無いときにAGENTS.mdを直接読む。 |
| sources | `claude-code-memory` | 本文は成立 | 末尾が「at launch」から「load with the CLAUDE.md importing them」に変わったが、分割でコンテキストは減らないという要点は同じ。 |
| sources | `claude-code-memory` | 本文は成立 | rulesがinstructionsに言い換えられただけで意味は同じ。 |
| sources | `code-claude-com-docs-en-memory` | 本文を修正 | importは必須の手順ではなくなり、CLAUDE.mdが併存するときなどAGENTS.mdを直接読まない場合の共有手段という位置づけに変わった。 |
| sources | `code-claude-com-docs-en-permission-modes` | 本文は成立 | 循環順は同じで、back to defaultの語が落ちオプションのモードはplanの後に入るという文に変わった。 |
| sources | `code-claude-com-docs-en-permission-modes` | 本文を一部修正 | 確認が必要な呼び出しの自動拒否は同じだが、許可ルール以外にも確認不要の読み取りが実行され、modが一部を承認できると現行は書いている。 |
| 08-16-medium | `git/github-actions/ReuseTroubleshoot.tsx` | 本文は成立 | 「唯一の方法」の文は消え、最良策はlockfileでSHA固定はそれを採用できないリポジトリ向けの手段という構成に変わったが、タグが動きうることとSHA固定の効果は同じ。 |
| 08-16-medium | `git/ai-agent/ClaudeCodeBasics.tsx` | 本文を一部修正 | 起動フォルダ以下という境界は現行も裏づけられるが、Gitルートでの起動が最善という記述は現行に無く、この主張文は教材ページにも残っていないため本文の修正は不要。 |
| 08-16-medium | `git/ai-agent/ClaudeCodeBasics.tsx` | 本文は成立 | 作業ディレクトリ外の読み取りをblockReadsOutsideWorkingDirectoriesで制限する例外が加わったが、git statusなどが自動で走るという主張は成り立つ。 |
| 08-16-medium | `claude-code/multi-ai-architecture/AgentDocs.tsx` | 本文は成立 | 文の順序が変わり、core.symlinksが無効だとsymlinkが1行のテキストになるという理由が足されたが、案内は同じ。 |
| 08-16-medium | `claude-code/multi-ai-architecture/AgentDocs.tsx` | 本文を一部修正 | コンテキストが減らない点は同じだが、理由が「起動時に読み込まれる」から「importするCLAUDE.mdと一緒に読み込まれる」に変わった。 |
| 08-16-medium | `claude-code/multi-ai-architecture/AgentDocs.tsx` | 本文を一部修正 | 確認コマンドが/context allに変わり、フルスクリーンモードでは/contextだけだと一覧が畳まれる。 |
| 08-23-reaudit | `claude-code/claude-core/ExplorePlanCodeCommit.tsx` | 本文は成立 | 例外の対象が「対話ターミナルセッション」に絞られただけで主張は同じ。 |
| 08-23-reaudit | `claude-code/claude-core/ExplorePlanCodeCommit.tsx` | 本文は成立 | 文が言い換えられただけで選択肢の内容は同じ。 |
| 08-23-reaudit | `claude-code/claude-core/PermissionModes.tsx` | 本文を一部修正 | 表の内容がOnly pre-approved toolsから、作業ディレクトリ内の読み取りと事前承認済みツールに広がり、modの例外も加わった。 |
| 08-23-reaudit | `claude-code/claude-core/PermissionModes.tsx` | 本文を修正 | v2.1.283以降はプランやプロバイダを問わず対話セッションの開始モードがautoになり、プラン限定は旧バージョンの話に変わった。 |
| 08-23-reaudit | `claude-code/claude-core/PermissionModes.tsx` | 本文は成立 | バージョンの記述が外れただけで、プロジェクト設定のautoが効かない点は同じ。 |
| 08-23-reaudit | `claude-code/claude-core/PermissionModes.tsx` | 本文は成立 | 前半の文末が言い換えられただけで循環順は同じ。 |
| 08-23-reaudit | `claude-code/claude-core/PermissionModes.tsx` | 本文を一部修正 | 分類器のレビュー対象からクリティカルパスの削除が除かれ、bypass permissionsが使える対話ターミナルセッションでは分類器も確認も適用されないと現行は明記している。 |
| 08-23-reaudit | `claude-code/claude-core/PermissionModes.tsx` | 本文を修正 | クリティカルパスの削除は既定で分類器のレビュー対象外になり、autoモードではターミナルなら時間制限付きの確認、それ以外では拒否に変わった。 |
| 08-23-reaudit | `claude-code/claude-core/PermissionModes.tsx` | 本文を一部修正 | 対象モデルにHaiku 5.5が加わってFable 5がFableモデル全般に広がり、プランの条件はAll plansになった。 |
| 08-23-reaudit | `claude-code/claude-core/PermissionModes.tsx` | 本文を修正 | 「一時的な障害ではない」という文は消え、サーバー側で止まっている場合もあるので後で新しいセッションを始めるという案内に変わった。 |
| 08-23-reaudit | `claude-code/claude-core/PermissionModes.tsx` | 本文は成立 | レッスンは現存し、ページの実在を示す見出しとして使える。 |
| 08-23-reaudit | `claude-code/claude-core/ProjectRules.tsx` | 本文は成立 | consuming tokensの文は消えたが、毎セッション開始時に読むという主張は同じ。 |
| 08-23-reaudit | `claude-code/claude-core/ProjectRules.tsx` | 本文を一部修正 | 読み込みの契機が読み取りだけでなくWrite / Editと読み取り扱いのBashコマンドに広がった。 |
| 08-23-reaudit | `claude-code/claude-core/ProjectRules.tsx` | 本文を一部修正 | 200行の目安は同じだが、勧めている内容は「長くなったら分割」から「コードベースの一部にだけ関わる指示をpaths付きrulesへ移す」に変わった。 |
| 08-23-reaudit | `claude-code/claude-core/ProjectRules.tsx` | 本文を一部修正 | 全文が読まれるのは起動時に読むCLAUDE.mdで4 MiB以下のときに限られ、超えると全く読まれず、オンデマンドのファイルはより小さい上限で先頭だけになる。 |
| 08-23-reaudit | `claude-code/claude-core/ProjectRules.tsx` | 本文を修正 | *.mdの意味がプロジェクトルート限定からベースディレクトリ以下の全域に変わり、直下だけを指す/*.mdが新設された。 |
| 08-23-reaudit | `claude-code/claude-core/ProjectRules.tsx` | 本文を一部修正 | symlink対応と循環検出は同じだが、作業ディレクトリ外を指すリンクは承認するまで読み込まれず、承認後もpathsなしのルールだけが読まれるようになった。 |
| 08-23-reaudit | `claude-code/claude-core/ProjectRules.tsx` | 本文を一部修正 | 全プロジェクトに効くことと先に読み込まれることは同じだが、プロジェクト側が優先されるという記述はなくなり、どちらも上書きしないと明記された。 |
| 08-23-reaudit | `claude-code/claude-core/ProjectRules.tsx` | 本文は成立 | ページの題名は同じで、説明文にAGENTS.mdが足された。 |
| 08-23-reaudit | `claude-code/multi-ai-architecture/FileMap.tsx` | 本文は成立 | 場所の欄にAGENTS.mdへの案内が足されただけで、CLAUDE.mdの場所と用途は同じ。 |
| 08-23-reaudit | `claude-code/multi-ai-architecture/FileMap.tsx` | 本文を一部修正 | pathsなしは同じだが、pathsありの読み込み契機が読み取りだけでなくWrite / Editにも広がった。 |
| 08-23-reaudit | `claude-code/multi-ai-architecture/FileMap.tsx` | 本文を修正 | Claude CodeはCLAUDE.mdが無ければAGENTS.mdを直接読み、両方あるときの既定はCLAUDE.mdだけで、/configのProject instructionsで変更できる。 |
| 08-23-reaudit | `claude-code/multi-ai-architecture/FileMap.tsx` | 本文を一部修正 | 上の階層の順序は同じだが、下の階層の読み込み契機が読み取りだけでなく書き込みと編集にも広がった。 |
| 08-23-reaudit | `claude-code/multi-ai-architecture/FileMap.tsx` | 本文を修正 | AGENTS.mdは条件次第で読まれるようになり、読まれたかは/memoryの一覧で確かめられ、CLAUDE.mdの確認は/context allに変わった。 |
| 08-23-reaudit | `claude-code/multi-ai-architecture/FileMap.tsx` | 本文を一部修正 | 4ホップの上限は同じだが、「at launch」が消え、importはそれを参照するCLAUDE.mdと一緒に読み込まれるという記述に変わった。 |
| 08-23-reaudit | `claude-code/multi-ai-architecture/FileMap.tsx` | 本文は成立 | 対象の表現がCLAUDE.mdとrulesに具体化されただけで、用途は同じ。 |
| 08-23-reaudit | `claude-code/getting-started/WhyClaudeCode.tsx` | 本文は成立 | 文が書き直されたが、OSが境界を強制することと対応OSは同じ。 |
| 08-16-medium | `claude-code/best-practices/EffectiveWorkflows.tsx` | 一次情報から消えた | llms.txtの全228ページを全文検索したが、4フェーズのワークフローを推奨する記述は無く、best-practicesからこの節は削除されている。 |
| 08-16-medium | `claude-code/claude-core/ContextEngineering.tsx` | 本文を修正 | 現行のbest-practicesは「コンテキストウィンドウが主な制約」という助言を「What you can stop doing」の表に移し、もう不要な助言として扱っている。 |
| 08-16-medium | `claude-code/claude-core/ContextEngineering.tsx` | 本文を一部修正 | cache_read_input_tokensの説明から「roughly 10%」が消え、料金ページ参照に変わった。自動利用と割安さは成り立つ（料金ページで0.1倍以下）が、prefixの構成とCLAUDE.md編集の記述は現行と違う。 |
| 08-23-reaudit | `claude-code/claude-core/ExplorePlanCodeCommit.tsx` | 本文を一部修正 | プランモードで先に調査し承認してから実装する助言はcostsに残るが、4フェーズのワークフローという推奨は全ページから消えた。 |
| 08-23-reaudit | `claude-code/claude-core/ExplorePlanCodeCommit.tsx` | 本文を一部修正 | 探索から実装までの流れはpermission-modesが裏づけ、コミットとPRはcommon-workflowsに別途あるが、4段に分けた公式の手順としての記述は無い。 |
| 08-23-reaudit | `claude-code/claude-core/ExplorePlanCodeCommit.tsx` | 本文は成立 | プランモードへの入り方はcommon-workflowsの「Plan before editing」へ移り、内容は同じ。 |
| 08-23-reaudit | `claude-code/claude-core/ExplorePlanCodeCommit.tsx` | 本文は成立 | common-workflowsの「Delegate research to subagents」へ移り、教材の例と同じ指示文が載っている。 |
| 08-23-reaudit | `claude-code/claude-core/ExplorePlanCodeCommit.tsx` | 本文は成立 | 同じ節が言い換えられたが、チェックが無いと見た目で止まるという内容は同じ。 |
| 08-23-reaudit | `claude-code/claude-core/ExplorePlanCodeCommit.tsx` | 本文は成立 | ghの説明は「Connect the tools Claude needs」へ移り、PRを開けるという内容は同じ。 |
| 08-23-reaudit | `claude-code/claude-core/ExplorePlanCodeCommit.tsx` | 一次情報から消えた | llms.txtの全228ページを全文検索したが、計画を省く基準（typo修正などの例、差分を一文で説明できるか）の記述は無い。 |
| 08-23-reaudit | `claude-code/claude-core/ExplorePlanCodeCommit.tsx` | 本文を一部修正 | 3条件の文は消え、現行で残るのは複雑なタスクでアプローチを先に確認するという説明で、複数ファイルはcommunications-kitの勧めに見えるのみ。 |
| 08-23-reaudit | `claude-code/best-practices/VerificationAndTrust.tsx` | 本文は成立 | 言い換えられたが内容は同じで、節の見出しは「Give Claude a check to run」に変わった。 |
| 08-23-reaudit | `claude-code/best-practices/VerificationAndTrust.tsx` | 本文は成立 | 文が箇条書きになり、test suiteがtest fileへ変わったが、列挙の内容は同じ。 |
| 08-23-reaudit | `claude-code/best-practices/VerificationAndTrust.tsx` | 本文を一部修正 | ビルドエラーの例文は全ページから消え、根本原因を直させる例文だけがcommunications-kitに残る。教材は公式の例と書いていないので本文の修正は不要。 |
| 08-23-reaudit | `claude-code/best-practices/VerificationAndTrust.tsx` | 本文は成立 | 例文は変わったが、同じメッセージで頼めば任意のタスクで使えるという内容は同じ。 |
| 08-23-reaudit | `claude-code/best-practices/VerificationAndTrust.tsx` | 本文を一部修正 | 別モデルが毎ターン後に判定する点は同じだが、判定の対象は会話の内容で、チェックを実行し直すわけではないと明記された。 |
| 08-23-reaudit | `claude-code/best-practices/VerificationAndTrust.tsx` | 本文を一部修正 | 上限の8回は同じだが、ツール呼び出しで回数がリセットされる条件と、環境変数で上げられることが明記された。 |
| 08-23-reaudit | `claude-code/best-practices/VerificationAndTrust.tsx` | 本文を一部修正 | 作業者と採点者を分ける内容は残るが、best-practicesから動的ワークフローの記述は消え、workflowsの説明は独立したエージェント同士のレビューになっている。 |
| 08-23-reaudit | `claude-code/best-practices/VerificationAndTrust.tsx` | 本文は成立 | 言い換えられたが、証拠を求める理由も含めて内容は同じ。 |
| 08-23-reaudit | `claude-code/best-practices/VerificationAndTrust.tsx` | 本文は成立 | 文は変わったが、差分を新しいサブエージェントでレビューする内容は同じで、同梱スキルである点はcode-review-localに書かれている。 |
| 08-23-reaudit | `claude-code/best-practices/VerificationAndTrust.tsx` | 本文を一部修正 | 例文の対象がPLAN.mdからSPEC.mdへ変わり、範囲外の変更の確認が消え、報告の範囲が正しさに影響するギャップへ絞られた。 |
| 08-23-reaudit | `claude-code/best-practices/VerificationAndTrust.tsx` | 本文を一部修正 | 警告は短くなり、防御コードの例と、残りを任意として扱う指示が消えた。 |
| 08-23-reaudit | `claude-code/best-practices/VerificationAndTrust.tsx` | 本文は成立 | 「Steer the session」節へ移り、2回で/clearして書き直す内容は同じ。 |
| 08-23-reaudit | `claude-code/best-practices/VerificationAndTrust.tsx` | 本文を一部修正 | チェックポイントの作成はターンを開始するプロンプトごとで、編集前に取るのはファイルのスナップショットとして書き分けられ、Esc二度押しは入力欄が空のときに限ると明記された。 |
| sources | `code-claude-com-docs-en-agent-teams` | 本文は成立 | 文頭の「As of v2.1.186」が本文から消えただけで、v2.1.186での追加はchangelogの2.1.186に残っているため教材の版条件は正しい。 |
| sources | `code-claude-com-docs-en-authentication` | 本文は成立 | 2文が例外の箇条書きへ再構成されたが、初回にブラウザが開きAPIキーは承認制という内容は同じ。 |
| sources | `code-claude-com-docs-en-checkpointing` | 本文を一部修正 | Bashの変更は一律に追跡外という記述が改まり、Claudeが編集ツールで触ったファイルならその後のBash変更も/rewindで戻るようになった。 |
| sources | `code-claude-com-docs-en-checkpointing` | 本文は成立 | 言い回しが変わり、既定の約30日とcleanupPeriodDaysで延ばせることが同じ段落に書かれている。 |
| sources | `code-claude-com-docs-en-cli-reference` | 本文は成立 | 説明文が書き換わったが、printモードでAPI呼び出しの支出に上限を設けるフラグという点は同じ。 |
| sources | `code-claude-com-docs-en-commands` | 本文は成立 | /importの対象が「対応するコーディングエージェント」からOpenAI CodexとGoogle Gemini CLIの明記に変わっただけで、教材の/initの説明はそのまま成り立つ。 |
| sources | `code-claude-com-docs-en-mcp` | 本文は成立 | 状態一覧の箇条書きに移ったが、未承認サーバーの表示と対話起動で承認する流れは同じ。 |
| sources | `code-claude-com-docs-en-model-config` | 本文を修正 | 既定モデルはv2.1.280からPro / Team StandardのSonnet区分がなくなり、Foundry以外はOpus 5.5に統一された。 |
| sources | `code-claude-com-docs-en-model-config` | 本文を一部修正 | 例示のモデルIDがclaude-opus-5-5に変わっただけでエイリアスと固定の説明は同じだが、同じ段落のfableの解決先が古い。 |
| sources | `code-claude-com-docs-en-plugins` | 本文は成立 | pluginsページが概要に改稿され、スキルの命名規則はplugins/componentsへ移ったが内容は同じ。 |
| sources | `code-claude-com-docs-en-settings` | 本文は成立 | 「Nothing you set overrides them」が具体的な表現に変わったが、管理設定が最上位である点は同じ。 |
| sources | `code-claude-com-docs-en-settings` | 本文を一部修正 | 優先順位の2段目はフラグ全般から--settingsのJSONに絞られ、--modelなどの個別フラグはこの段に含まないと明記された。 |
| sources | `code-claude-com-docs-en-setup` | 本文を一部修正 | 対応アカウントにUltraが加わり、教材の列挙が現行より1つ少ない。 |
| sources | `code-claude-com-docs-en-setup` | 本文は成立 | 「As of v2.1.198」の版条件が消えたが、Node.js 22以上とEBADENGINE警告の内容は同じ。 |
| sources | `code-claude-com-docs-en-sub-agents` | 本文は成立 | 省略時が「Defaults to inherit」から解決順の参照に変わったが、教材は指定できる値を挙げるだけで既定には触れていない。 |
| 08-16-medium | `claude-code/best-practices/HarnessEngineering.tsx` | 本文は成立 | 表の行に5.5世代が加わり、Opus 4.7は引き続き現行の対応モデルに載っている。 |
| 08-16-medium | `claude-code/best-practices/TestingDebugging.tsx` | 本文を修正 | 導入文が変わったが必須項目の記述は残り反証は有効で、教材はすでに修正済み。なおtoolsのYAMLリスト形式は現行では許容されるので、当時の訂正のうちリスト形式を不可とした部分は今は当てはまらない。 |
| 08-16-medium | `claude-code/cicd-headless/HeadlessMode.tsx` | 本文を修正 | 続く文のバックグラウンドセッションの説明が変わったが、-pの会話を継続できるという反証は有効で、教材はすでに修正済み。 |
| 08-16-medium | `claude-code/claude-core/ExtendedThinking.tsx` | 本文を一部修正 | highが既定なのはOpus 5.5 / Sonnet 5.5 / Haiku 5.5 / Opus 4.7以外のモデルに限られ、既定モデルのOpus 5.5はmediumになった。highの説明も「バランス」から検証重視の作業向けに変わった。 |
| 08-16-medium | `claude-code/claude-core/ExtendedThinking.tsx` | 本文を一部修正 | キー操作とeffortが思考量を決める点は同じだが、Opus 5.5 / Sonnet 5.5 / Haiku 5.5 / Fableでは思考をオフにできなくなり、既定モデルでは切替が効かない。 |
| 08-16-medium | `claude-code/claude-core/TokenOptimization.tsx` | 本文は成立 | Fable 5.1と5.5世代が表に加わったが、xhighがFable 5やOpus 4.7以降で使える点は同じ。 |
| 08-16-medium | `claude-code/claude-intro/SlashCommands.tsx` | 本文を一部修正 | 1文の要約が5段階の解決順に置き換わり、環境変数と設定の間にセッション内の選択と--effortが入った。 |
| 08-16-medium | `git/ai-agent/ClaudeCodeSetup.tsx` | 本文を一部修正 | コマンドは同じだが「As of v2.1.198」が本文から消え、changelogにも該当の記載がないため版条件の裏づけがなくなった。 |
| 08-16-medium | `claude-code/ide-agent-teams/AgentOrchestration.tsx` | 本文は成立 | --setting-sourcesの説明が途中に入り段落が分かれたが、CLAUDE.mdを全チームメイトが読む点は同じ。 |
| 08-16-medium | `claude-code/ide-agent-teams/IdeIntegration.tsx` | 本文を修正 | 表にkittyキーボードプロトコル対応端末の行が増えAlacrittyが0.16で分かれたが反証は有効で、教材の誤りは修正済み。ただし修正後の文のAlacrittyの扱いが古い。 |
| 08-16-medium | `claude-code/ide-agent-teams/PluginsEcosystem.tsx` | 本文は成立 | pluginsページの改稿で名前空間の説明がplugins/createへ移ったが内容は同じ。 |
| 08-16-medium | `claude-code/ide-agent-teams/PluginsEcosystem.tsx` | 本文を修正 | スコープの説明はplugins-referenceからpluginsへ移ったが反証は有効で、教材はすでにスコープ前提の記述へ修正済み。 |
| 08-16-medium | `git/ai-agent/ClaudeCodeSetup.tsx` | 本文を修正 | 行末に下書き復元の案内が足されただけで反証は有効で、教材はすでに2回押す記述へ修正済み。 |
| 08-16-medium | `claude-code/mcp/MCPPractical.tsx` | 本文は成立 | discover-pluginsはplugins/installへ統合され、3スコープの一覧はpluginsページにまとまっている。 |
| 08-16-medium | `claude-code/reference/ClaudeCheatsheet.tsx` | 本文を修正 | v2.1.205より前のfキーの注記は消え、commandsページにfキーの記述はない。チートシートは修正済みだがトラブルシューティングのヒントに同じ記述が残っている。 |
| 08-16-medium | `claude-code/reference/ClaudeCheatsheet.tsx` | 本文は成立 | 文が続きのキー説明とつながり句点の位置が変わっただけで、tキーのソートは同じ。 |
| 08-16-medium | `claude-code/reference/Troubleshooting.tsx` | 本文は成立 | 診断範囲が具体的になり、修正は確認のあとでClaudeが適用すると明記されたが、教材の説明と矛盾しない。 |
| 08-16-medium | `ai-ml/lmops/LmopsWorkflow.tsx` | 本文を修正 | 英語4文字への反証は有効だが、3.5文字はClaude 4.7より前のモデルの値に限定された。教材の修正後の文は限定なしの3.5文字のままで、現行とずれている。 |
| 08-16-medium | `git/ai-agent/CursorCline.tsx` | 本文を修正 | 対応アカウントにUltraが加わったが反証は有効で、教材はすでに修正済み。ただし修正後の列挙にUltraがない。 |
| 08-23-reaudit | `learning/sources/SearchTechnique.tsx` | 本文は成立 | フックの種類にMCPツール呼び出しとサブエージェントが加わった。教材は検索語の例なので影響しない。 |
| 08-23-reaudit | `learning/with-ai/HowToAsk.tsx` | 本文は成立 | 「like Claude」が「such as Claude」に変わっただけ。 |
| 08-23-reaudit | `learning/with-ai/WhereAiFails.tsx` | 本文は成立 | 「like Claude」が「such as Claude」に変わっただけ。 |
| 08-23-reaudit | `claude-code/claude-core/ExplorePlanCodeCommit.tsx` | 本文は成立 | commandsの説明が短くなり詳細はinteractive-modeへ移ったが、未コミットの変更とターンごとの差分を見られる点は同じ。 |
| 08-23-reaudit | `claude-code/claude-core/ProjectRules.tsx` | 本文は成立 | 「only exit code that blocks」の文が消え、exit 2の説明節の冒頭に同じ内容が書かれている。 |
| 08-23-reaudit | `claude-code/agent-extensions/SkillsDeepDive.tsx` | 本文は成立 | 表にNestedなどの行と細かな適用範囲が足されたが、4種類の場所と対象は教材と同じ。 |
| 08-23-reaudit | `claude-code/agent-extensions/SkillsDeepDive.tsx` | 本文は成立 | 同名解決の表に移って表現が短くなったが順序は同じ。 |
| 08-23-reaudit | `claude-code/agent-extensions/SkillsDeepDive.tsx` | 本文は成立 | 同名解決の表に移ったが内容は同じ。 |
| 08-23-reaudit | `claude-code/agent-extensions/SkillsDeepDive.tsx` | 本文は成立 | 同名時の優先が例文から同名解決の表へ移ったが、スキルが勝つ点は同じ。 |
| 08-23-reaudit | `claude-code/agent-extensions/SkillsDeepDive.tsx` | 本文を一部修正 | 入れ子のスキルは起動時ではなく該当ファイルを読むか編集した時点で読み込まれ、ディレクトリ修飾名が付くのは他のスキルと同名のときに限られる。 |
| 08-23-reaudit | `claude-code/agent-extensions/SkillsDeepDive.tsx` | 本文は成立 | 「Only you can invoke the skill」が「Claude can't invoke the skill on its own」に変わったが意味は同じ。 |
| 08-23-reaudit | `claude-code/agent-extensions/SkillsDeepDive.tsx` | 本文は成立 | 例の引数が変わったため変数表の行へ差し替えた。$0が最初の引数である点は同じ。 |
| 08-23-reaudit | `claude-code/agent-extensions/SkillsDeepDive.tsx` | 本文を一部修正 | 追記の条件が「$ARGUMENTSがない」から「引数を受け取るプレースホルダーがない」に広がり、$1や名前付き引数も数えるようになった。 |
| 08-23-reaudit | `claude-code/agent-extensions/SkillsDeepDive.tsx` | 本文を一部修正 | 重ねて起動できるのはターミナルのプロンプトに限られ、Agent SDKとclaude -pでは最初のスキルだけが読み込まれると明記された。 |
| 08-23-reaudit | `claude-code/agent-extensions/SkillsDeepDive.tsx` | 本文は成立 | 説明の文が書き直されたが、サブエージェントで隔離実行する点は同じ。 |
| 08-23-reaudit | `claude-code/agent-extensions/SkillsDeepDive.tsx` | 本文は成立 | 語尾と文の区切りが変わっただけで、そのターン限りの上書きである点は同じ。 |
| 08-23-reaudit | `claude-code/agent-extensions/SkillsDeepDive.tsx` | 本文は成立 | 「has no description to match against」が言い換えられただけ。 |
| 08-23-reaudit | `claude-code/multi-ai-architecture/FileMap.tsx` | 本文は成立 | claude-directoryの本文から該当の文が消え、指示と設定の違いはmemoryページの記述で裏づけられる。権限・フック・環境変数という中身はclaude-directoryのファイル表に残っている。 |
| 08-23-reaudit | `claude-code/best-practices/VerificationAndTrust.tsx` | 本文は成立 | コース名の表記が「Claude Code in Action」から小文字のinに変わっただけで、リンク先のレッスンは同じ。 |
| 08-23-reaudit | `claude-code/best-practices/BrowserVerification.tsx` | 本文を一部修正 | 「or higher」が「or later」に変わり、対応プランにUltraが加わった。 |
| 08-23-reaudit | `claude-code/best-practices/BrowserVerification.tsx` | 本文は成立 | 1文が2文に分かれただけで内容は同じ。 |
| 08-23-reaudit | `claude-code/best-practices/BrowserVerification.tsx` | 本文を一部修正 | 必要なプランにUltraが加わった。 |
| sources | `gemini-code-assist-github-config` | 本文は成立 | 同じ内容の文が「Configuration fields」節へ移り、言い回しが変わった。 |
| sources | `gemini-code-assist-github-config` | 本文は成立 | 元のページから.gemini/の場所の記述が消え、配置先は別ページのCode review style guideに移ったので、sourcesの同一エントリにある#3とはURLを分ける必要がある。 |
| sources | `typesafe-docs-models` | 本文は成立 | 課金の中身は同じで、文面だけが変わった。 |
| sources | `typesafe-docs-models` | 本文は成立 | Aliases節で文面が変わったが、意味は同じ。 |
| sources | `typesafe-docs-models` | 一次情報から消えた | ModelsページからLanguage support節が消え、llms-full.txtの全文検索でもEnglish primary・CJK・non-Englishの記述は見つからず、残る言語の記述はmodel changelogのJev 1.14にある「Better multilingual support.」だけで、言語ごとの精度は示されていない。 |
| sources | `typesafe-docs-models` | 本文は成立 | 文の後半が「each with a description and a release date」に変わっただけで、内容は同じ。 |
| sources | `typesafe-docs-models` | 本文は成立 | 上限の値は同じで、表記が表の短い形に変わり、Jev 1.14とJev 1.13の両方に同じ値が載っている。 |
| sources | `typesafe-docs-models` | 本文は成立 | 説明が箇条書きに変わったが、掛かる範囲は同じ。 |
| sources | `typesafe-docs-models` | 本文は成立 | 文面が少し変わっただけで、意味は同じ。 |
| sources | `typesafe-docs-models` | 本文は成立 | 版のIDで固定する案内は残り、文面が変わった。 |
| sources | `typesafe-docs-models` | 本文は成立 | 例の版名がjev-1.14.0に変わったので、版名を含まない部分だけを引く。 |
| sources | `typesafe-docs-quickstart` | 本文を一部修正 | キーの発行先は同じだが、Quick startの構成が変わり、Playgroundは4つの使い方の1つになった。 |
| sources | `typesafe-docs-api-errors` | 本文を一部修正 | 文はそのままで、エラー表が/apiから/api/errorsへ移り、表に400・413・415が増えた。 |
| sources | `typesafe-docs-api-errors` | 本文は成立 | 文はそのままで、掲載先が/api/errorsへ移った。 |
| sources | `typesafe-docs-api-errors` | 本文は成立 | 文はそのままで、掲載先が/api/errorsへ移った。 |
| sources | `typesafe-docs-confidence` | 本文は成立 | 括弧書きの文が変わったので、Noul節の同じ内容の文に替える。 |
| sources | `typesafe-docs-python-usage` | 本文は成立 | 文はそのままでAdvanced usageページへ移り、同じエントリのもう1件（環境変数の表）は元のページに残るので、sourcesのエントリを2つに分ける必要がある。 |
| sources | `typesafe-docs-primitives-choice` | 本文を一部修正 | 例の数値が変わったので、版で動かない文に替え、確率が割れるとconfidenceが下がるという趣旨は今も成り立つ。 |
| sources | `typesafe-docs-primitives-choice` | 本文を一部修正 | 例の数値が変わったので、教材の「説明はnullにしています」を裏づける版で動かない文に替える。 |
| sources | `typesafe-docs-primitives-score` | 本文を一部修正 | 計算例の数値が変わったので、計算の定義を述べた部分だけを引く。 |
| sources | `typesafe-docs-jaggedness-jev-1-13` | 本文は成立 | 版別のページがModel jaggednessに統合され、主語がJevに変わった。 |
| sources | `typesafe-docs-jaggedness-jev-1-13` | 本文は成立 | 版別のページがModel jaggednessに統合され、主語がJevに変わった。 |
| sources | `developers-figma-com-docs-figma-mcp-server-code-to-canvas` | 本文は成立 | 冒頭の文が言い換えられたが、取り込める内容は同じ。 |
| sources | `docs-github-com-en-billing-concepts-product-billing-github-actions` | 本文を一部修正 | パブリックとセルフホストの無料は変わらないが、ページがincluded compute usage（金額）の説明に書き直された。 |
| sources | `docs-github-com-en-copilot-concepts-agents-cloud-agent-about-cloud-age` | 本文を一部修正 | ページがCopilot on GitHub.comに統合され、2026-10-28からの有料プラン向けCopilot in the cloudでは実行環境が選べ、Cloudが既定になった。 |
| sources | `raw-githubusercontent-com-nitrojs-nitro-main-docs-2-deploy-0-index-md` | 本文は成立 | 文面が言い換えられただけで、自動検出の内容は同じ。 |
| sources | `vercel-com-kb-guide-a-record-and-caa-with-vercel` | 本文を一部修正 | 手順の説明が書き直され、値はプロジェクトごとに違い、別の案内から写した値はInvalid Configurationになると明記された。 |
| 08-16-medium | `api/openapi/SwaggerUi.tsx` | 本文は成立 | 有料版の機能名がTry-it consoleからTry-it panel (Replay)に変わった。 |
| 08-16-medium | `claude-code/mcp/MCPPractical.tsx` | 本文は成立 | READMEの例がmiddlewareからproxyに変わったので、同じ使い方を示す別の例に替える。 |
| 08-16-medium | `claude-code/mcp/MCPPractical.tsx` | 本文は成立 | 言語の列挙が変わったので列挙部分を落とし、教材の30+はover 40の範囲に収まるので誤りではない。 |
| 08-16-medium | `claude-code/ai-coding-agents/ChoosingTools.tsx` | 本文を修正 | READMEは個人の無料枠が2026-06-18にAntigravity CLIへ移ったと書き、Gemini CLIは組織のCode Assistライセンス向けになり、1M contextとGoogle Search groundingの記述も消えた。 |
| 08-16-medium | `git/github-actions/CiPractice.tsx` | 本文は成立 | サイドバーの節名がCode, planning, and automationに変わったが、Settings → Branchesの経路は同じ。 |
| 08-16-medium | `git/github-actions/Reference.tsx` | 本文は成立 | セルフホストランナーが無料という内容は同じで、ページの構成が変わった。 |
| 08-16-medium | `git/github/Markdown.tsx` | 本文を一部修正 | ドラッグ＆ドロップの手順は同じで、本文欄の更新までは書かれているが、Markdownの画像記法になるとは明記されていない。 |
| 08-16-medium | `git/flow-automation/MergeGovernance.tsx` | 本文を一部修正 | サイドバーの項目がRulesからRulesetsに変わった。 |
| 08-16-medium | `claude-code/ai-coding-agents/GithubCopilot.tsx` | 本文は成立 | 教員とメンテナーの文の読点が消えただけで、内容は同じ。 |
| 08-16-medium | `api/rest-design/ErrorHandling.tsx` | 本文は成立 | 本文の変更は無く、ハイフン後の空白の位置だけを現行の取得結果に合わせた。 |
| 08-16-medium | `vue/nuxt-server/RenderingModes.tsx` | 本文は成立 | 本文の変更は無く、取得形式の違いで崩れた長い逐語を短い断片に分けた。 |
| 08-16-medium | `react/deploy/Vercel.tsx` | 本文を一部修正 | LetsEncryptの表記がLet's Encryptに直り、自動発行とLet's Encryptの利用は確認できるが、このページに費用の記述は無い。 |
| 08-16-medium | `infra/edge/EdgeFunctions.tsx` | 本文を一部修正 | 指定方法は同じだが例からimport行が消え、ページ冒頭にNode.jsへの移行推奨とNext.js 16.3以降の非対応が加わった。 |
| 08-16-medium | `infra/foundations/ComputeModels.tsx` | 本文を一部修正 | 上限の秒数は改定で動くので上限の存在を述べる文に替え、現行の上限は最大1800sのBetaまであり、「数十秒〜数分」の語は教材本文から消えている。 |
| 08-16-medium | `vue/nuxt-server/Deploy.tsx` | 本文は成立 | 対応サービスの列挙にOriginとAzure DevOps Pipelinesが増えたので、列挙の手前までを引く。 |
| 08-16-medium | `react/cdd-flow/DesignQA.tsx` | 本文は成立 | 文の接続が少し変わっただけで、Manage > Configureの経路は同じ。 |
| 08-16-medium | `react/cdd-flow/DesignQA.tsx` | 本文は成立 | 文面が変わり、GitHub Actionでは既定でtrueと明記されたが、教材のCLIの説明は成り立つ。 |
| 08-16-medium | `react/css-layout/CssGrid.tsx` | 本文は成立 | 定義文がlogical propertiesを含む形に書き直され、初期値autoは同じ。 |
| 08-16-medium | `claude-code/multi-ai-architecture/SingleSourceOfTruth.tsx` | 本文は成立 | トークンの書き方にinterleaved YAML code blocksが増えただけで、主張に影響しない。 |
| 08-16-medium | `git/ai-agent/CursorCline.tsx` | 本文は成立 | Cmd KもCmd Lと同じ操作に割り当てられたが、Cmd Lの説明は成り立つ。 |
| 08-16-medium | `git/ai-agent/CursorCline.tsx` | 本文を修正 | inline editのページはAgent modeへ統合され、Cmd Kのインライン編集は廃止されて、選択範囲を参照してAgentを開く操作に置き換わった。 |
| 08-16-medium | `react/storybook/SbFigma.tsx` | 本文は成立 | 文面が変わったが、Copy link to selectionの操作は同じ。 |
| 08-16-medium | `ux-design/prototyping/FigmaPrototype.tsx` | 本文は成立 | 対応クライアントの文は消えて対応表と一覧へ移り、Claude Codeは今も載っていて、教材本文はdesign contextの説明に更新済み。 |
| 08-16-medium | `infra/edge/CdnBasics.tsx` | 本文は成立 | APIリファレンスが書き直され、URL指定はfilesフィールドの説明になった。 |
| 08-16-medium | `infra/hosting/CloudflarePages.tsx` | 本文は成立 | 引数の書き方が[NAMESPACE]から<NAMESPACE>に変わっただけ。 |
| 08-16-medium | `api/basics/Http.tsx` | 本文は成立 | ページがWeb/Security/Defenses配下へ移って書き直されたが、localhostが安全なコンテキストになる点は同じ。 |
| 08-16-medium | `infra/aws/Compute.tsx` | 本文を修正 | 名称がLambda Event Functionsに変わったが、実行時間だけの課金という旧記述の反証には今もなり、教材はリクエスト数と実行時間の記述に修正済み。 |
| 08-16-medium | `api/rest-design/Idempotency.tsx` | 本文は成立 | 引用「Expired Internet-Draft」は反証にならなくなり、現行はActive Internet-Draftの-08（2026-10-22更新、2027-04-25まで有効）なので、標準化を進めるドラフトという元の主張は成り立ち、逆に教材の現在の記述が古い。 |
| 08-16-medium | `api/rest-design/HttpMethods.tsx` | 本文は成立 | API v1とv2の説明に分かれたが、最初の結果を保存して返す設計はv1の記述として残っている。 |
| 08-16-medium | `api/practice/ReactApi.tsx` | 本文は成立 | リファレンスがfunctions/useQueryへ移り、型コメントから生成された表の形になった。 |
| 08-16-medium | `vue/nuxt-server/RenderingModes.tsx` | 本文は成立 | 本文の変更は無く、見出しの型注記が原文に混ざるので説明文だけを引く。 |
| 08-16-medium | `git/advanced/VSCode.tsx` | 本文は成立 | トップのキャッチコピーが変わったが、VS Code内でAPIをテストできる点は同じ。 |
| 08-16-medium | `react/storybook/SbAdvanced.tsx` | 本文は成立 | 本文の変更は無く、見出し直後のゼロ幅文字で切れないよう--saveの語を断片から外した。 |
| 08-16-low | `vue/styling/SfcStyling.tsx` | 本文は成立 | トップのコピーが変わり、Tailwind CSSベースという点は今も書かれている。 |
| 08-16-low | `ai-ml/ai-overview/Landscape.tsx` | 本文は成立 | 文面が少し変わっただけで期間は同じで、教材は「1987年頃〜」と終期の揺れの注記に修正済み。 |
| 08-16-low | `ux-design/ux-foundations/DesignProcess.tsx` | 本文は成立 | 見出しの大文字表記で長い逐語が切れたので断片に分け、内容の変更は無い。 |
| 08-23-reaudit | `infra/foundations/Landscape.tsx` | 本文は成立 | 対応サービスの列挙にOriginが増えたので、列挙の手前までを引く。 |
| 08-23-reaudit | `infra/baas/WhatIsBaas.tsx` | 本文は成立 | social loginの語がsocial sign-inに変わっただけ。 |
| 08-23-reaudit | `api/openapi/SchemaFirst.tsx` | 本文は成立 | 最新版がv3.2.1に上がったので、版番号を含まない定義の文に替える。 |
| 08-23-reaudit | `react/state-events/Events.tsx` | 本文は成立 | MDNの書き出しの形が変わっただけで、内容は同じ。 |
