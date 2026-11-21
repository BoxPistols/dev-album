# specs/p5js-manual.md

## 概要
p5.jsを軸に、ジェネラティブアートとメディアアートを基礎から応用まで扱うマニュアル（`p5js`）を新設する。
対象はプログラミングの経験を問わない。文法の習得より「動くものを見て、数字を変えて、自分の作品として公開する」ことを目的に置く。
そのため全ページを、ページ内で動いて編集できるスケッチを中心に組み立てる。

## 要件定義

### 目的と成功の状態
- 読み手がページを開いた時点で動く作品が見え、数値を1つ変えるだけで絵が変わる
- 各ページを終えると、そのページの技法を使った自分の作品が1つ手元に残る
- 最後のセクションまで進むと、作品を書き出して公開する手順が分かる

### 対象読者
- デザイナー・学生・フロントエンド開発者。JavaScriptは変数とfor文を見たことがある程度でよい
- 数学は中学の関数の記憶があればよい。三角関数・ベクトルは絵と一緒に導入する

### 機能要件
- F1: p5.jsのスケッチをページ内で実行・編集できる（`CodePreview` / `CodingChallenge`がp5を自動判定する）
- F2: スケッチはグローバルモードのまま載せる。p5 Web EditorやOpenProcessingに貼っても同じに動く
- F3: 動き続けるスケッチは一時停止でき（WCAG 2.2.2）、画面外では自動で止まる
- F4: ページ上の作品をPNGで保存できる
- F5: カメラ・マイクを使うスケッチは、利用者の操作（ボタン）で初めて権限を求める
- F6: 画像を使うスケッチは、コードで描いた絵か利用者が選んだ手元のファイルを素材にする（外部ホストから読まない）

### 非機能要件
- p5.jsは`client/public/vendor/`にセルフホストする（2.4.0。ほかのプレビュー用ライブラリと同じ方針）
- プレビューiframeのCSPは外部ホストへの送信を遮断したままにする
- 全スケッチを実ブラウザで走らせる検査（`pnpm check:p5`）を持ち、描画時エラーを機械で検出する
- 光の点滅は1秒に3回を超えない（WCAG 2.3.1）。強い明滅を伴う例は載せない

## 詳細定義

### 入力
- マニュアル: `p5js`（新規。`ManualId`に追加）。ブランド色はフクシア系（p5.jsのマゼンタに近く、既存マニュアルと重ならない色相）
- セクションとページ（stepは1から連番）

| section | ページ | path | 中心になる作品・題材 |
|---|---|---|---|
| p5-intro（はじめに） | このマニュアルについて | `/p5js` | 全体の道筋、作品の見本、p5.jsとProcessingの由来 |
| p5-basics（描いて動かす） | はじめてのスケッチ | `/p5js/basics/first-sketch` | setup / draw、座標、マウスで描く |
| | 図形と色 | `/p5js/basics/shapes-color` | 基本図形、HSB、透明度、blendMode |
| | 動きとインタラクション | `/p5js/basics/motion-interaction` | 変数、frameCount、残像、マウスとキー |
| | 繰り返しとパターン | `/p5js/basics/loops-patterns` | for、グリッド、10 PRINT、Truchetタイル |
| | 座標変換 | `/p5js/basics/transform` | translate / rotate / scale、push / pop、万華鏡 |
| p5-math（数学で描く） | 関数とイージング | `/p5js/math/functions-easing` | 一次・二次関数、放物線、map / lerp、イージング |
| | 三角関数と波 | `/p5js/math/trigonometry` | sin / cos、円運動、極座標、リサージュ、バラ曲線 |
| | ベクトルと力 | `/p5js/math/vectors-forces` | p5.Vector、速度と加速度、引力 |
| p5-random（偶然を設計する） | 乱数と確率 | `/p5js/random/randomness` | random / randomSeed / randomGaussian、ランダムウォーク |
| | ノイズ | `/p5js/random/noise` | noise()、地形、フローフィールド |
| | パーティクルと群れ | `/p5js/random/particles` | class、パーティクルシステム、Boids |
| p5-media（メディアを素材にする） | 画像とピクセル | `/p5js/media/image-pixels` | pixels、点描、ハーフトーン、ピクセルソート |
| | 文字とタイポグラフィ | `/p5js/media/typography` | text、文字のグリッド、キネティックタイポグラフィ |
| | カメラ | `/p5js/media/camera` | createCapture、ミラー、文字で描く映像、動きの検出 |
| | 音 | `/p5js/media/sound` | Web Audio、音量と周波数、音を出す |
| p5-systems（生成のアルゴリズム） | フラクタル | `/p5js/systems/fractals` | 再帰の木、コッホ雪片、シェルピンスキー、バーンズリーのシダ、マンデルブロ集合 |
| | L-systemとセルオートマトン | `/p5js/systems/lsystem-automata` | 文字列の書き換えで育つ植物、1次元CA、ライフゲーム |
| | 美しく仕上げる | `/p5js/systems/composition` | 配色、構図、質感、重ね、円充填 |
| p5-3d（3D表現） | WEBGLの基礎 | `/p5js/three-d/webgl-basics` | 立体、ライト、マテリアル、カメラ操作 |
| | 形を作る・シェーダー | `/p5js/three-d/shaders` | 頂点から作る地形、p5.strandsによるシェーダー |
| p5-game（ゲームを作る） | ゲームの骨格 | `/p5js/game/game-loop` | 状態、入力、当たり判定で1本作る |
| | 手ざわりを仕上げる | `/p5js/game/game-polish` | 画面遷移、スコア、演出、効果音 |
| p5-lab（研究の現場を再現する） | 落下と数値計算 | `/p5js/lab/falling-bodies` | オイラー法、空気抵抗と終端速度、反発 |
| | 流体 | `/p5js/lab/fluids` | 格子による流体の計算、煙のシミュレーション |
| | 建物の揺れ | `/p5js/lab/seismic` | ばね・質点モデル、固有周期、共振、免震 |
| | 音響解析 | `/p5js/lab/acoustics` | スペクトログラム、定在波、クラドニ図形 |
| p5-publish（作品を世に出す） | 書き出す | `/p5js/publish/export` | PNG・GIF・高解像度・印刷 |
| | 公開する | `/p5js/publish/share` | 公開先、ライセンス、クレジット、説明文（describe） |

### ページの構成（全ページ共通）
1. 冒頭に、そのページの完成形になる作品を動く状態で置く
2. 概念を小さなスケッチに分けて導入する。1スケッチ1概念
3. 「数字を変えてみる」案を具体的な行と値で示す
4. `CodingChallenge`で手を動かす（keyword対応ヒント）
5. 「作品にする」: そのページの技法で自分の作品にするための発展案
6. `Quiz`、まとめ、`ReferenceLinks`（公式リファレンスの該当ページ・一次情報）

### 処理フロー
1. `preview.ts`に`isP5Sketch` / `buildP5PreviewHtml`を追加し、`CodePreview`と`CodingChallenge`から使う
2. `client/public/vendor/p5-2.4.0.min.js`を置く
3. `scripts/check-p5-sketches.mjs`（`pnpm check:p5`）を追加する
4. `navigation.ts`にManualInfo・SectionInfo・PageInfoを追加し、`navigation.test.ts`の期待値を更新
5. `ManualId`を網羅する`Record`（`SectionBadge`・`Landing`）に`p5js`を追加
6. `index.css`にブランド色を3テーマ分追加し、`theme-contrast.test.ts`の対象に足す
7. `App.tsx`にlazy importとRoute
8. ページを`client/src/pages/p5js/**`に作成
9. `searchIndex.ts`・`sources.ts`・`e2e/manuals.spec.ts`・`e2e/a11y.spec.ts`に追加
10. `announcements.ts`の先頭にお知らせを追加
11. `README.md`・`ARCHITECTURE.md`・`CLAUDE.md`のセルフホスト一覧・色の表・ディレクトリ構成を更新

### エッジケース
- p5.jsの版 → 2.x系（2.4.0）で実行する。1.x系と書き方が違う箇所（`preload`の廃止と`async setup`、`curveVertex`→`splineVertex`等）は該当ページで先に書く。外の記事の多くは1.x系の書き方である
- 音 → p5.soundアドオンは使わず、ブラウザ標準のWeb Audio APIを直接使う。追加ライブラリなしでp5 Web Editorでも同じに動く。p5.soundは公式アドオンとしてリンクで案内する
- ブラウザの自動再生制限 → 音は利用者のクリックの中で`AudioContext`を開始する
- カメラ・マイクが無い・拒否された → スケッチは落ちずに案内文を出す。検査は`--fake-media`で擬似デバイスを使う
- 画像の読み込み → プレビューのCSPが外部への`fetch`を遮断するので、`loadImage('https://...')`は使わない。コードで描いた絵・`createFileInput`で選んだファイル・カメラを素材にする
- 空欄（`___`）のあるチャレンジ → 埋める前は実行時エラーになるのが正常。エラー表示ではなく案内文を出す
- 仕様値と実測値のズレ → `frameRate`は目標値で、実測は端末と負荷で下がる。`deltaTime`で補正する書き方を物理のページで示す。`random()`は`randomSeed()`で固定しない限り実行ごとに変わる。数値計算（オイラー法）の誤差は刻み幅で変わる
- 研究の再現 → 「現場で使われる手法の原理を、教材の規模で再現したもの」であると書く。実務の解析ソフトと同じ精度であるとは書かない。式と定数の出典を示す
- 既存作品の扱い → 特定の作家の作品や市販ゲームをそのまま再現しない。技法（10 PRINT、Boids等）は出典を示して扱う
- 重いスケッチ → 画面外で止まるが、表示中に60fpsを保てる規模（粒子数・格子数）に抑える

### 出力
- 正常系: p5.jsマニュアルがマニュアル一覧・切り替えに出て、全ページが3テーマで描画され、前後ナビでつながる。全スケッチがページ内で動く

## 実装で判明したこと（仕様へのフィードバック）
- プレビューの一時停止・画面外停止は、スケッチ自身の`noLoop()`と区別して扱う。区別しないと、画面に戻ったときに静止画のスケッチまで回し続ける
- コードが長いスケッチでは結果の枠がコード欄と同じ高さまで伸び、キャンバスが画面の外に出る。枠の高さに上限を設け、スクロールに追従させる
- チャレンジの空欄（`___`）は値の位置にだけ置く。演算子の位置は構文エラーになり、ループの増分・条件に置くと値が進まずタブが固まる（`p5-sketches.test.ts`が検査する）
- p5.js 2.xはGLSL由来の名前（`step`・`mix`等）もグローバルに持つ。同名の関数をスケッチで定義すると「Cannot redefine property」で落ちる（`pnpm check:p5`が検出する）
- `randomSeed()`に隣り合う整数を渡すと、直後の`random()`がほぼ同じ値になる。seedを連番で振る作品は`randomSeed(seed * 1000)`のように離す
- `describe()`は文末にピリオドを自動で足す。日本語の説明文は句点なしで終える
- `textToPoints()`はフォントファイルを読み込んだp5.Fontのメソッドで、外部フォントを読めないプレビューでは使えない。文字の形は`createGraphics`に描いた文字の画素を走査して得る
- p5.jsは読み込み時にエラー文の翻訳ファイルを取りにいく。プレビューでは使わないので、通信の前に断る

## 完了条件
- [x] `pnpm check`・`pnpm test`・`pnpm build`が緑
- [x] `pnpm check:p5`で全スケッチが実行時エラーなしで描画される
- [x] `pnpm check:prose`がerror 0件（新しい文章に和欧間スペースを入れない）
- [x] `pnpm test client/src/lib/theme-contrast.test.ts`が緑（ブランド色がAAを満たす）
- [x] 全ページを実ブラウザで開き、描画時の例外が無いこと、axeのcritical / seriousが3テーマで0件であることを確認（`e2e/manuals.spec.ts`・`e2e/a11y.spec.ts`と同じ判定を手元のChromiumで実行。Playwrightのテストランナーそのものは、作業環境に対応するブラウザが無く未実行）
- [x] `ReferenceLinks`の外部リンクが到達でき、登録した引用が出典に逐語で含まれる（`pnpm check:sources`でp5.jsマニュアル分を全件照合）
