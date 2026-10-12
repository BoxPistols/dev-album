# specs/go-manual.md

## 概要
Go言語の入門マニュアル（`go`）を新設する。対象はTypeScript/JavaScriptでフロントエンドを書いている人。
TSとの対比で文法を押さえ、型・インターフェース・エラー・並行処理を経て、標準ライブラリだけでJSON APIを書くところまで進める。

## 入力
- マニュアル: `go`（新規。`ManualId`に追加）
- セクションとページ（stepは1から連番）

| section | ページ | path |
|---|---|---|
| go-intro（はじめに） | このマニュアルについて | `/go` |
| go-basics（Goの基礎） | 環境構築とHello World | `/go/basics/setup` |
| | 変数・型・制御構文 | `/go/basics/syntax` |
| | 関数・複数戻り値・defer | `/go/basics/functions` |
| | 配列・スライス・マップ | `/go/basics/collections` |
| go-types（型とインターフェース） | 構造体とメソッド | `/go/types/structs-methods` |
| | インターフェース | `/go/types/interfaces` |
| | ジェネリクス | `/go/types/generics` |
| | エラーハンドリング | `/go/types/errors` |
| go-concurrency（並行処理） | goroutineとchannel | `/go/concurrency/goroutines-channels` |
| | contextとsync | `/go/concurrency/context-sync` |
| go-practice（実践） | モジュールと標準ツール | `/go/practice/modules-tooling` |
| | テスト | `/go/practice/testing` |
| | net/httpでJSON API | `/go/practice/http-server` |

## 処理フロー
1. `navigation.ts`にManualInfo・SectionInfo・PageInfoを追加し、`navigation.test.ts`の期待値を更新
2. `ManualId`を網羅する`Record`（`SectionBadge`・`Landing`）に`go`を追加
3. `index.css`にブランド色（Goのシアン系）を3テーマ分追加し、`theme-contrast.test.ts`の対象に足す
4. `App.tsx`にlazy importとRoute
5. ページを`client/src/pages/go/**`に作成
6. `searchIndex.ts`・`e2e/manuals.spec.ts`・`e2e/a11y.spec.ts`（代表1ページ）に追加
7. `announcements.ts`の先頭にお知らせを追加

## エッジケース
- GoはブラウザでGoを実行できない → `CodePreview`は使わず`CodeBlock`で示し、出力はコメントか別の`CodeBlock`で添える。`CodingChallenge`は`preview={false}` `previewType="terminal"`（`editor-validation.test.ts`のJSXトランスパイル検証から外すため）
- コード例の正しさ → 全コード例を手元の`go`で`go vet`と`go run`（またはテスト）に通してから載せる。出力コメントは実行結果と一致させる
- バージョン依存の機能 → 導入されたバージョンを本文に書く（例: ループ変数のイテレーションごとの束縛とServeMuxのメソッド付きパターンは1.22、`min`/`max`は1.21、ジェネリクスは1.18）。「最新」とは書かない
- 仕様値と実測値のズレ → goroutineの実行順・`map`の反復順は不定であることを先に書く

## 出力
- 正常系: Goマニュアルがマニュアル一覧・切り替えに出て、14ページが3テーマで描画され、前後ナビでつながる

## 完了条件
- [x] `pnpm check`・`pnpm test`・`pnpm build`が緑
- [x] `pnpm check:prose`が緑（新しい文章に和欧間スペースを入れない）
- [x] 全コード例が`go vet`を通り、出力コメントが実行結果と一致する
- [x] `e2e/manuals.spec.ts`で全ページの描画を確認
