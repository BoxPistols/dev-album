# specs/fullstack-lab.md（草案）

## 概要
フルスタックコース（[fullstack-course.md](./fullstack-course.md)）の演習を、ブラウザだけで完結するオンラインの開発環境（以下「ラボ」）で行う。ラボはDev Albumとは別のアプリとして作り、Dev Albumの教材ページから課題単位で開く。

いまのDev Albumの演習は穴埋めが中心で、正誤はキーワードの一致で見ている。ラボでは受講者が自分で考えたコードや、AIと壁打ちして書いたコードを提出し、次の2段で見る。

1. 機械で決められること（テストが通るか、型が合うか、lintに引っかかるか）は機械で判定する
2. 機械で決められないこと（設計の妥当さ、読みやすさ、なぜそう書いたかを説明できるか）はAIがレビューし、プログラミング教室の講師のように助言と次の一歩を返す

ローカルに開発環境は作らない。エディタ・ターミナル・プレビューがブラウザの中にある、VS Codeをブラウザで開いたような画面にする。

## 入力

### 課題の種類

| 種類 | 受講者が出すもの | 判定 |
|---|---|---|
| 実装課題 | 自由に書いたコード（AIと書いたものも可） | テスト・型・lintで合否、AIが設計と読みやすさをレビュー |
| 設計課題 | ER図（Mermaid）、APIの設計、ADRなどの文章 | AIがルーブリックに沿ってレビュー（合否は出さず、達成度と助言） |
| 説明課題 | 自分のコードについての説明（なぜそう書いたか、他の案と比べて何を選んだか） | AIが説明とコードの食い違いを指摘し、理解を確かめる質問を返す |
| 穴埋め | 既存と同じ | 既存と同じ（ラボでは扱わなくてよい） |

AIと壁打ちして書いたコードを出すことは禁止しない。代わりに説明課題を実装課題とセットにし、「自分の言葉で説明できるか」で理解を確かめる。

### 課題の定義（1課題 = 1ディレクトリ）

```
exercises/fullstack/<step-id>/
├── exercise.md        # 課題文（何を作るか、受け入れ条件）
├── starter/           # 開始時のファイル一式（前の課題の模範解答から作る）
├── tests/             # 受け入れテスト（Vitest）。受講者にも見える
├── rubric.json        # AIレビューの観点（観点ID、説明、達成の目安）
└── solution/          # 模範解答（受講者が「見る」を押したときだけ出す）
```

`rubric.json`の観点は課題ごとに3〜5個に絞る。CodingChallengeのヒント設計（1 keyword = 1 hint）と同じで、観点が多すぎるのは課題が大きすぎる合図として分割する。

## 処理フロー

### 画面
1. 左にファイルツリー、中央にエディタ（Monaco。VS Codeと同じエディタ部品）、下にターミナル（xterm.js）、右にプレビューと課題文・レビュー結果のタブ
2. 受講者のコードはWebContainer（ブラウザの中で動くNode.js）で動かす。`npm install`・開発サーバー・テストはすべてブラウザ内で走り、受講者ごとのサーバーは要らない
3. ファイルはブラウザのIndexedDBに保存し、タブを閉じても続きから再開できる。zipで書き出せる

### 提出とレビュー
1. 受講者が「提出」を押す
2. 機械判定: WebContainerの中で`tsc --noEmit`・`eslint`・`vitest run --reporter=json`を走らせ、結果をJSONで集める
3. AIレビュー: 課題文・`rubric.json`・受講者のコード（starterからの差分）・機械判定の結果・説明課題の文章をサーバー側のAPIに送る
4. サーバーはAIに、決めたJSONスキーマで返させる。Zodで検証し（`advice`は`z.array(z.string()).max(3)`、`questions`も同じく上限を付ける）、形が合わない応答は捨てて1回だけ再試行する

```ts
type Review = {
  rubric: { id: string; level: "met" | "partial" | "not_met"; evidence: { file: string; line: number }[]; comment: string }[];
  advice: string[];          // 次に直すとよい点（多くても3つ）
  nextHint: string | null;   // 答えそのものではなく、次の一歩
  questions: string[];       // 理解を確かめる質問（説明課題）
};
```

5. 画面には機械判定の結果を先に、AIレビューをその下に出す。合否は機械判定だけで決め、AIは合否を変えない
6. 受講者はAIの指摘ごとに「納得した / 違うと思う」を返せる。「違うと思う」は理由と一緒に記録し、ルーブリックとプロンプトの見直しに使う

### AIレビューの方針
- 答えを書かない。「ここを直すとよい」は指摘するが、直したコードは出さない。模範解答は受講者が明示的に開いたときだけ見せる
- 根拠の行を必ず付ける（`evidence`）。行を示せない指摘は出さない
- 観点ごとの判定（met / partial / not_met）は分類の問題なので、Jev（TypeSafe AI）の中継サーバーに寄せられるかを第0段階で試す。寄せられれば、自由文の助言だけをLLMに書かせる
- 利用枠と自分のAPIキー（BYOK）はDev Albumの`/api/chat`と同じ仕組みにする（`api/lib/chatLimits.ts`の上限と匿名の1日枠）

### ラボの中で動かすスタック
WebContainerで動くものに限る。第0段階の調査で次がわかっている。

- Next.jsは15.4より新しい版がWebContainerで動かない。15.5以降が`AsyncLocalStorage`に依存し、WebContainerが未実装のため。16の`next dev --webpack`も実行時エラーになる報告がある（stackblitz/starters#122）
- TurbopackはネイティブバイナリでWebContainerでは使えない。WASM版は`next dev`に必要なAPIが欠けている

そこでラボの中は次の構成にする（決定事項を参照）。

| 層 | ラボの中 | 本番（shipセクション） |
|---|---|---|
| フロント | Vite + React + TypeScript + Tailwind | Next.js（App Router）に載せ替える手順を教材で示す |
| API | Hono（Node.js） | 同じHonoをCloud Run / Vercel Functionsに配備 |
| DB | PGlite（WASM版のPostgres）+ Drizzle | Supabase / NeonのPostgres |
| 認証 | 課題用の簡易セッション。RLSは`set_config('app.user_id', …)`と`current_setting`で組む | Supabase Auth（`auth.uid()`に置き換えるだけで同じポリシーが効く） |
| 非同期 | `FOR UPDATE SKIP LOCKED`のジョブテーブルを自分で書く。pg-bossがPGliteで動くなら差し替え | pg-boss + ワーカー |
| テスト | Vitest | Vitest + Playwright（GitHub Actions） |

RLSを`auth.uid()`ではなく`current_setting`で組むのは、Supabaseを外しても動くことと、`auth.uid()`の中身が同じ仕組みであることを先に見せられるため。

## エッジケース
- ブラウザがWebContainerに対応していない（Firefoxはプレビューに制限、Safariはベータ） → 入口で`crossOriginIsolated`を確かめ、使えないときは「Chrome / Edgeで開く」案内と、教材ページの読み物だけで進める道を出す
- サイトの配信ヘッダー → WebContainerはクロスオリジン分離（`SharedArrayBuffer`）が要る。ラボのホスティングでCOOP / COEPのヘッダーを付ける。Dev Album本体には付けない（外部の埋め込みが壊れるため。別アプリにする理由の1つ）
- テストは受講者から見える → 採点の不正防止はしない。目的は学習で、テストを読んで仕様を知ることも学習の一部とする
- AIが間違える → 合否は機械判定だけで決める。AIの指摘は「参考」と明記し、「違うと思う」で反論できる
- 受講者のコードにAIへの指示が書かれている（プロンプトインジェクション） → 受講者のコードはデータとして区切って渡す。合否はAIが決めないので、影響は助言の質に留まる
- AIの費用 → 1回のレビューで送る量をサーバー側で制限する（差分だけ、ファイル数と文字数の上限）。匿名は1日の回数に上限、BYOKなら上限なし
- 受講者のコードと進捗 → IndexedDBにだけ保存し、サーバーには提出時のレビュー用データ以外を送らない。送ったデータを保存しないことをプライバシーページに書く
- WebContainer APIのライセンス → 公式は「営利目的の商用環境での本番利用」にライセンスが要るとし、プロトタイプやPoCには不要としている。公開前に、無料の学習サイトとして使う場合の扱いをStackBlitzに確認する（下の「判断を仰ぎたい点」2）

## 出力
- 正常系: Dev Albumの`fullstack`の各ページから「ラボで開く」を押すと、その課題のstarterが入った状態でラボが開く。提出すると機械判定とAIレビューが出る
- 異常系: ラボが開けない（ブラウザ非対応・ライセンス・障害） → 教材ページの読み物と模範解答のリポジトリで進められる

## 段階
0. 調査（実装の前に1週間以内）: 次を小さなプロトタイプで確かめ、結果をこの仕様に書き戻す
   - Vite + Hono + PGlite + Drizzle + VitestがWebContainerで動くか
   - PGliteでRLS（`set_config` / `current_setting`）が効くか
   - pg-bossがPGliteで動くか（動かなければジョブテーブルを手で書く案で確定）
   - VercelでCOOP / COEPを付けたときに、Monaco・xterm.js・AIのAPI呼び出しが動くか
   - Jevの中継サーバーで観点ごとの判定を返せるか
1. ラボの骨格: エディタ・ターミナル・プレビュー・IndexedDB保存・課題の読み込み。課題1つ（fullstack-dataの最初）で通す
2. 機械判定とAIレビュー: 提出・`rubric.json`・レビューAPI・「違うと思う」の記録
3. 教材と接続: Dev Albumの`fullstack`の第1段階（fullstack-course.mdの処理フロー2）と同時に出す

## 完了条件（検証可能な形で）
- [ ] 第0段階の5項目の結果がこの仕様に書き戻されている
- [ ] Chrome / Edgeで、課題を開く → 編集 → 提出 → 機械判定とAIレビューが出るまでがE2Eテストで通る
- [ ] 非対応ブラウザで開くと案内が出る（E2E）
- [ ] AIの応答がスキーマに合わないとき、受講者にエラーではなく「レビューを取得できなかった。機械判定の結果は有効」と出る（単体テスト）
- [ ] 合否が機械判定だけで決まる（AIの応答を書き換えても合否が変わらないことを単体テストで確かめる）
- [ ] レビューAPIが上限を超えた入力を400で返し、利用枠を減らさない

## 決定事項
1. 演習はDev Albumとは別のアプリ（ラボ）で行う（2026-11-07決定）
2. エディタはWebContainer方式にする（2026-11-07決定）。GitHub Codespacesは受講者ごとにGitHubアカウントと利用枠が要るため採らない
3. 合否は機械判定（テスト・型・lint）だけで決め、AIは設計・読みやすさ・説明への助言を返す（2026-11-07、推奨案）
4. ラボの中のスタックはVite + React + Hono + PGliteにする（2026-11-07、推奨案で確定。実装前なら変更できる）。Next.js 16がWebContainerで動かないため。Next.jsの載せ替えはshipセクションで手順として教える。ラボだけNext.js 15.4に固定する案は、古い版を教えることになるので採らない
5. ラボのリポジトリ名は`dev-album-lab`にする（2026-11-07、推奨案で確定。実装前なら変更できる）。URLは公開時に決める

## 公開前に解決が要る点（未決）
1. WebContainer APIのライセンス。Dev Albumを無料の学習サイトとして公開し続けるなら、商用ライセンスが要るかをStackBlitzに問い合わせる。回答が出るまでラボを公開しない。要る場合の代替は、StackBlitz本体の埋め込み（`@stackblitz/sdk`）で、エディタはStackBlitzの画面になる

## 参考
- WebContainerのライセンス: https://webcontainers.io/enterprise
- WebContainerの対応ブラウザ: https://webcontainers.io/guides/browser-support
- Next.jsがWebContainerで15.4までに留まる件: https://github.com/stackblitz/starters/pull/122
- PGlite: https://pglite.dev/docs/about
- PGlite Socket（通常のPostgresクライアントから接続する場合）: https://pglite.dev/docs/pglite-socket
