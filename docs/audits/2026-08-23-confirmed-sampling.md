# CONFIRMED の引用が主張を支えているかの抜き取り検査（2026-08-23）

2026-08-16 の主張監査で CONFIRMED とした判定について、`pnpm check:verdicts` が機械的に
保証しているのは「引用が原文に文字列として存在する」ところまでで、「その引用がその主張を
支えているか」は保証していない。この隔たりの大きさを抜き取りで測った記録。

背景と依頼は https://github.com/BoxPistols/dev-album/issues/61 に書いてある。

## 方法

母集団は `docs/audits/2026-08-16-medium-verdicts.json` と
`docs/audits/2026-08-16-low-verdicts.json` の CONFIRMED 全件。実データでは
medium 696 件 / low 86 件の計 782 件だった（issue 本文の 780 件は執筆時点の値）。

抽出は固定シードで再現できるようにした。ワークフロー用のスクリプトではないので Python の
`random` をそのまま使い、シードと手順を残す。

- シード: `61`
- 並び順の固定: `(layer, file, claim, sourceUrl)` で昇順ソートしてから `random.sample`
- 標本サイズ: 40

```bash
python3 -c '
import json, random
c = []
for f, L in (("docs/audits/2026-08-16-medium-verdicts.json","medium"), ("docs/audits/2026-08-16-low-verdicts.json","low")):
    c += [dict(v, _layer=L) for v in json.load(open(f)) if v["verdict"] == "CONFIRMED"]
c.sort(key=lambda v: (v["_layer"], v["file"], v["claim"], v["sourceUrl"]))
random.seed(61)
for i, v in enumerate(random.sample(c, 40), 1):
    print(i, v["file"], "|", v["claim"][:50].replace("\n", " "))
'
```

判定は盲検で行った。抽出した 40 件から `claim` と `quote` だけを取り出した一時ファイルを作り、
ファイル名・`verdict`・`evidence`・`correction`・`category` を伏せた状態でそれだけを読んで
判定した。`evidence` を見ながら判定すると、対応が取れていない引用にも「取れている」と
読んでしまう。判定を全件書き終えてから `category` と `file` を突き合わせた。

引用が原文に存在するかは機械が済ませているので再確認していない。見たのは対応だけ。

判定は 3 値にした。

| 判定 | 定義 |
|---|---|
| SUPPORTS | 主張の中で外部情報に照らして確かめられる断定が、すべて引用の中にある |
| PARTIAL | 一部は引用にあるが、確かめられる断定が少なくとも 1 つ引用の外に残っている |
| DOES-NOT-SUPPORT | 主張の断定を 1 つも裏づけていない、または矛盾している |

「1 行で書ける」のような評価・推奨は確かめられる断定に数えない。裏づけ済みの一般則を
そのまま当てはめただけの例示（モジュールを `modules` に 1 行足す仕組みの適用例など）も
別立ての断定とはみなさない。

## 結果

| 判定 | 件数 | 割合 | 95% 信頼区間（Wilson） |
|---|---|---|---|
| SUPPORTS | 25 | 62.5% | 47.0% - 75.8% |
| PARTIAL | 13 | 32.5% | 20.1% - 48.0% |
| DOES-NOT-SUPPORT | 2 | 5.0% | 1.4% - 16.5% |
| 計 | 40 | | |

引用が主張を完全に支えていたのは 62.5%。何かしら支え切れていないものが 37.5%
（95% 信頼区間 24.2% - 53.0%）、まったく支えていないものが 5.0% だった。

40 件の抜き取りなので区間は広い。「完全一致は 6 割強、うち完全に外しているのは
1 割未満」という粒度までが、この標本から言える範囲になる。

### category 別

`category` は `docs/audits/2026-08-16-unverified-claims.json` の値を `(file, claim)` で
突き合わせて付けた（782 件すべてが一意に対応した）。

| category | 標本 | SUPPORTS | PARTIAL | DOES-NOT-SUPPORT | 母集団 |
|---|---|---|---|---|---|
| tool-behavior | 16 | 10 | 6 | 0 | 317 |
| external-service-detail | 12 | 6 | 4 | 2 | 171 |
| spec-or-standard | 8 | 6 | 2 | 0 | 160 |
| version-or-release | 4 | 3 | 1 | 0 | 42 |
| official-recommendation | 0 | - | - | - | 44 |
| statistic-or-number | 0 | - | - | - | 33 |
| universal-or-superlative | 0 | - | - | - | 15 |

DOES-NOT-SUPPORT の 2 件はどちらも `external-service-detail` に落ちた。この層は
標本 12 件中 6 件（50%）が SUPPORTS で、他の層より低い。`spec-or-standard` は
8 件中 6 件（75%）で、仕様書からの引用は主張との対応が取りやすい。

ただし標本が 1 桁の層の差は誤差の範囲を出ない。層ごとの比較として意味が読めるのは
`tool-behavior` と `external-service-detail` の 2 つまで。

母集団の 92 件（11.8%）を占める `official-recommendation` / `statistic-or-number` /
`universal-or-superlative` は、40 件の無作為抽出に 1 件も入らなかった。この 3 層は
今回の測定の対象外で、確度は分かっていない。

### マニュアル別

| マニュアル | 標本 | SUPPORTS | PARTIAL | DOES-NOT-SUPPORT |
|---|---|---|---|---|
| git | 9 | 6 | 3 | 0 |
| react | 8 | 4 | 4 | 0 |
| api | 5 | 4 | 1 | 0 |
| devflow | 5 | 3 | 2 | 0 |
| infra | 4 | 1 | 2 | 1 |
| threejs | 3 | 3 | 0 | 0 |
| vue | 3 | 2 | 1 | 0 |
| ai-ml | 2 | 1 | 0 | 1 |
| claude-code | 1 | 1 | 0 | 0 |

マニュアル単位の偏りは読み取れない。1 マニュアルあたり最大 9 件では、どの差も
誤差に埋もれる。`infra` と `ai-ml` に DOES-NOT-SUPPORT が 1 件ずつ出ているが、
これは category（`external-service-detail`）の偏りが写っているだけと見るのが素直で、
外部サービスの説明が両マニュアルに集中していることの帰結にすぎない。

### 監査層別

| 層 | 標本 | SUPPORTS | PARTIAL | DOES-NOT-SUPPORT |
|---|---|---|---|---|
| medium | 36 | 23 | 11 | 2 |
| low | 4 | 2 | 2 | 0 |

low は標本 4 件で、比較できる数ではない。

## DOES-NOT-SUPPORT 2 件の後追い

盲検を解いた後、この 2 件について実際の教材ページを見て、記述そのものが裏づけを
欠いているかを確かめた。結論としては、どちらも教材の記述は成り立っており、
引用の選び方だけが外れていた。教材ページの修正は行っていない。

### #13 `infra/baas/Comparison.tsx`

比較表の「OSS / セルフホスト」行にある Firebase 側のセル「マネージド（セルフホストは
前提でない）」。判定に付けられた引用は Local Emulator Suite の説明文の断片で、
マネージドかどうかにも自己ホストの可否にも触れていない。

一方で判定の `evidence` 欄には「本番をセルフホストする手段は提供されておらず、
ローカル実行の公式手段は Local Emulator Suite のみ」と、確認の経緯が書かれている。
確認自体は行われていて、それを 1 文の逐語引用に落とすところで対応が切れた。

Firestore の公式ドキュメント（https://firebase.google.com/docs/firestore）を取得すると
"Cloud Firestore is a cloud-hosted, NoSQL database that your Apple, Android, and web apps
can access directly using native SDKs." とあり、マネージドである点はこちらで直接裏づく。
教材の記述は残し、引用を差し替えるべき事例。

### #22 `ai-ml/lmops/LmopsWorkflow.tsx`

RAG パイプラインの手順にある `pip install` の 2 行。引用は PyPI の JSON API から取った
`"classifiers":["Development Status :: 5 - Production/Stable"` という断片で、パッケージ名すら
含まれておらず、どのパッケージについての情報かが引用の中で閉じていない。

なお監査時の主張は `langchain-community` を含む行だったが、現在のページは
`langchain-chroma langchain-huggingface` に変わっている。監査後にページが更新されており、
判定と現物がずれている。

現在ページに書かれている 6 パッケージを PyPI で確認したところ、すべて実在した
（2026-08-23 時点の版: langchain 1.3.16 / langchain-anthropic 1.6.1 / langchain-chroma 1.1.0 /
langchain-huggingface 1.2.2 / chromadb 1.5.9 / sentence-transformers 6.0.0）。
インストール手順としての記述に問題はない。

## SUPPORTS でなかった 15 件

### #13 DOES-NOT-SUPPORT（external-service-detail / infra）

- 対象: `infra/baas/Comparison.tsx`
- 主張: マネージド（セルフホストは前提でない）
- 引用: Local development with Local Emulator Suite can be a good fit for your
- 出典: https://firebase.google.com/docs/emulator-suite
- 判断: 引用はローカルエミュレータの説明の断片で、マネージドかどうかに触れていない

### #22 DOES-NOT-SUPPORT（external-service-detail / ai-ml）

- 対象: `ai-ml/lmops/LmopsWorkflow.tsx`
- 主張: pip install langchain langchain-anthropic langchain-community / pip install chromadb sentence-transformers
- 引用: "classifiers":["Development Status :: 5 - Production/Stable"
- 出典: https://pypi.org/pypi/langchain-anthropic/json
- 判断: 引用はパッケージ名すら含まない classifiers の断片で、インストール対象の組み合わせを何も裏づけない

### #5 PARTIAL（tool-behavior / git）

- 対象: `git/advanced/WSL2.tsx`
- 主張: このコマンドで WSL2 と Ubuntu が自動的にインストールされます。インストール中は、コンピュータが再起動される場合があります。
- 引用: This command will enable the features necessary to run WSL and install the Ubuntu distribution of Linux.
- 出典: https://learn.microsoft.com/en-us/windows/wsl/install
- 判断: WSL と Ubuntu の導入は裏づけられるが、再起動が起きる点と WSL2 という版の指定は引用に無い

### #8 PARTIAL（spec-or-standard / devflow）

- 対象: `devflow/pm/Backlog.tsx`
- 主張: 書いたストーリーが扱いやすいかどうかは、INVEST という 6 つの観点でチェックできます。
- 引用: Independent Stories are easiest to work with if they are independent. […] Testable A good story is testable.
- 出典: https://xp123.com/invest-in-good-stories-and-smart-tasks/
- 判断: 引用は Independent と Testable の 2 つだけで、6 観点であることは引用から読めない

### #11 PARTIAL（tool-behavior / git）

- 対象: `git/github-actions/CiPractice.tsx`
- 主張: npm ci は package-lock.json の内容を厳密に再現し、node_modules を作り直します。
- 引用: * If a `node_modules` is already present, it will be automatically removed before `npm ci` begins its install.
- 出典: https://raw.githubusercontent.com/npm/cli/latest/docs/lib/content/commands/npm-ci.md
- 判断: node_modules を作り直す点は裏づくが、lockfile を厳密に再現する点は引用に無い

### #14 PARTIAL（external-service-detail / react）

- 対象: `react/accessibility/FormA11y.tsx`
- 主張: reCAPTCHA v3: ユーザー操作不要で透過的。問題が最も少ない
- 引用: reCAPTCHA v3 will never interrupt your users, so you can run it whenever you like without affecting conversion.
- 出典: https://developers.google.com/recaptcha/docs/v3?hl=en
- 判断: ユーザーを遮らない点は裏づくが、「最も少ない」という比較優位は引用に無い

### #20 PARTIAL（version-or-release / react）

- 対象: `react/css-basics/CssPatterns.tsx`
- 主張: Container クエリは 2023 年以降すべてのモダンブラウザ（Chrome, Firefox, Safari, Edge）でサポートされています。
- 引用: "firefox": { "version_added": "110" },
- 出典: https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/at-rules/container.json
- 判断: Firefox 110 の 1 ブラウザ分しか無く、4 ブラウザ全部と 2023 年という時期は引用から出ない

### #23 PARTIAL（tool-behavior / react）

- 対象: `react/testing/PlaywrightE2E.tsx`
- 主張: reuseExistingServer: true は、すでにサーバーが動いていればそれを使い回す指定です。
- 引用: it will re-use an existing server on the
- 出典: https://playwright.dev/docs/test-webserver
- 判断: 既存サーバーを再利用する挙動は読めるが、オプション名が引用に含まれず対応づけが引用内で閉じない

### #26 PARTIAL（spec-or-standard / devflow）

- 対象: `devflow/pm/Backlog.tsx`
- 主張: バックログリファインメント（グルーミングとも呼ばれます）は、バックログの上位項目を継続的に整える活動です。
- 引用: Product Backlog refinement is the act of breaking down and further defining Product Backlog items into smaller more precise items. This is an ongoing activity to add details, such as a description, order, and size.
- 出典: https://scrumguides.org/scrum-guide.html
- 判断: 継続的に整える活動である点は裏づくが、グルーミングという別称と「上位項目」は引用に無い

### #28 PARTIAL（tool-behavior / api）

- 対象: `api/practice/NuxtApi.tsx`
- 主張: $fetch は Nuxt が同梱する HTTP クライアント（ofetch）そのものです。JSON を自動でパースし、エラー時は例外を投げます。
- 引用: ofetch smartly parse JSON responses. […] ofetch Automatically throws errors when response.ok is false with a friendly error message and compact stack (hiding internals).
- 出典: https://github.com/unjs/ofetch
- 判断: JSON 自動パースと例外送出は裏づくが、$fetch が ofetch そのものという同一性は引用に無い

### #31 PARTIAL（external-service-detail / infra）

- 対象: `infra/aws/StorageCdn.tsx`
- 主張: アクセス状況を監視して自動でクラスを移し替えるため、手動でライフサイクルを設計しなくても保管コストを抑えやすくなります。少額の監視料金がかかる点だけ把握しておきましょう。
- 引用: For a small monthly object monitoring and automation fee
- 出典: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html
- 判断: 少額の監視料金は読めるが、アクセス状況に応じてクラスを移す挙動は断片からは確定しない

### #35 PARTIAL（tool-behavior / git）

- 対象: `git/flow-automation/Labels.tsx`
- 主張: actions/labeler は、PR が変更したファイルのパスを見て、ルールに沿ってラベルを自動で付けます。ルールは .github/labeler.yml に書きます。
- 引用: Automatically label new pull requests based on the paths of files being changed or the branch name.
- 出典: https://github.com/actions/labeler/blob/main/README.md
- 判断: パスを見てラベルを付ける点は裏づくが、ルールを .github/labeler.yml に書く点は引用に無い

### #36 PARTIAL（external-service-detail / infra）

- 対象: `infra/hosting/CloudflarePages.tsx`
- 主張: S3 互換のオブジェクトストレージ。画像やファイルの保存に使い、外向き転送（egress）料金がかからないのが特徴。
- 引用: There are no charges for egress bandwidth for any storage class.
- 出典: https://developers.cloudflare.com/r2/pricing/
- 判断: egress 無料は裏づくが、S3 互換であることは引用に無い

### #38 PARTIAL（external-service-detail / react）

- 対象: `react/storybook/SbIntro.tsx`
- 主張: Storybook の開発元が提供する、ビジュアルリグレッションテストの SaaS サービスです。PR ごとに UI のスクリーンショットを撮影し、前回との差分をピクセル単位で検出します。無料プランもあります。
- 引用: [Storybook](https://storybook.js.org) is an open source workshop for developing components and pages in isolation. Chromatic is built and maintained by the team behind Storybook, ensuring a seamless integration.
- 出典: https://www.chromatic.com/docs/visual
- 判断: Storybook の開発元である点だけが裏づき、PR ごとの撮影・ピクセル単位の差分・無料プランは引用に無い。標本の中では裏づけの割合が最も低い

### #40 PARTIAL（tool-behavior / vue）

- 対象: `vue/styling/SfcStyling.tsx`
- 主張: `<style scoped>` を付けると、Vue コンパイラが各要素に data-v-xxxxxxxx のような一意の属性を付与し、CSS セレクタにもその属性を合成します。
- 引用: `<style>` タグに scoped 属性が指定されている場合、その CSS は現在のコンポーネントの要素のみに適用されます。これは、Shadow DOM に見られるスタイルのカプセル化に似ています。これはいくつかの注意点がありますが、ポリフィルは必要ありません。これは、PostCSS を使って変換することで実現されます。
- 出典: https://ja.vuejs.org/api/sfc-css-features.html
- 判断: スコープが効くことは裏づくが、data-v-xxxxxxxx 属性を付与しセレクタに合成するという機構は引用に無い

## 所見

15 件を並べると、外し方は 1 種類ではなく 4 つに分かれる。

複合主張の片脚だけが引用されている型がいちばん多い（#5 #11 #26 #28 #35 #36 #38 #40 の
8 件）。1 つの `claim` に断定が 2 つ以上あるのに、引用は片方しか押さえていない。教材の
1 文が複数のことを言っていて、監査が主張を文単位で切り出したことの帰結で、判定の質と
いうより主張の切り出し粒度の問題に近い。

列挙や全称のうち一部だけを引用している型が続く（#8 #14 #20 の 3 件）。「INVEST の 6 観点」
「最も少ない」「すべてのモダンブラウザ」のような文は、1 本の逐語引用で丸ごと支えることが
構造的に難しい。今回の標本には `universal-or-superlative` の項目が 1 件も入らなかったが、
他の category に分類された主張の中にも比較・全称の表現が混ざっていて、そこで対応が
切れていた。

引用の切り詰めで主語が落ちた型が 2 件（#23 #31）。`fix:quotes` が「原文に連続して現れる
部分」まで短くした結果、何についての記述かが引用の中で閉じなくなった。切り詰め自体は
逐語照合を通すための正しい処理だが、短くしすぎると対応の判断材料としては機能しなくなる。

引用が別の話題を指している型が残る 2 件で、これが DOES-NOT-SUPPORT になった。
#13 #22 はどちらも `evidence` 欄には妥当な確認手順が書かれていて、それを 1 本の逐語引用に
落とすところで対応が切れている。捏造ではなく、引用の選定の失敗。

## 推奨

層を絞った再照合を行う価値がある。優先順は次のとおり。

1. **`external-service-detail`（母集団 171 件）** — DOES-NOT-SUPPORT が 2 件ともここに落ち、
   SUPPORTS 率も標本内で最低（12 件中 6 件）。外部サービスの説明は「サービスの性質を
   1 文で言い切る」記述になりやすく、公式ドキュメントの 1 文と対応させにくい。加えて
   料金・プラン・機能は変わるので、鮮度の面でも再確認の価値が重なる。
2. **比較優位・全称・数値を含む主張** — `category` が
   `universal-or-superlative`（15 件）/ `statistic-or-number`（33 件）/
   `official-recommendation`（44 件）の計 92 件は、今回の抽出に 1 件も入らず確度が
   分かっていない。構造的に引用と対応させにくい層でもあるので、抜き取りではなく
   全件を対象にしてよい規模（92 件）。
3. **1 文に満たない断片が引用になっている CONFIRMED** — #23 #31 のように、文の途中で
   切れていて主語を失った引用は、末尾が句点で終わっているかで機械的に洗い出せる。
   件数を数えて、多ければ引用を取り直す。

一方で `spec-or-standard`（母集団 160 件）と `tool-behavior`（同 317 件）は、
標本の範囲では DOES-NOT-SUPPORT が出ておらず、優先度は下げてよい。

測定そのものについては、次に同じことをやるなら主張の切り出し粒度を変えたい。
今回 PARTIAL の過半は「1 つの `claim` に断定が複数ある」ことに由来していて、監査の
入口で 1 主張 1 断定に割っておけば、判定は SUPPORTS か DOES-NOT-SUPPORT の 2 値に
近づき、どの断定が浮いているかも直接見える。

## 記録の限界

- 標本 40 件は母集団 782 件の 5.1%。層別の比較は `tool-behavior` と
  `external-service-detail` 以外は数が足りない。
- 判定者は 1 名（1 エージェント）で、2 人目との突き合わせをしていない。SUPPORTS と
  PARTIAL の境目は判定基準を先に固定して揃えたが、境界例の扱いには判定者の癖が残る。
- 引用が原文にあるかは再確認していない。そこは `pnpm check:verdicts` が保証している
  範囲として扱った。
- 監査（2026-08-16）以降にページが更新されている場合がある（#22 で実際に起きた）。
  判定と現在のページ内容は必ずしも一致しない。
