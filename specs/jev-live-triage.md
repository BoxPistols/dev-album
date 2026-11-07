# specs/jev-live-triage.md — サイト上からJevを呼ぶ（問い合わせの選別）

## 概要

Jevセクションの読者が、自分の入力に対するJevの応答をページ上で確かめられるようにする。`api/jev.ts`を追加し、問い合わせの選別のページに実行ボタンを1本置く。Issue #137の実装。

判断が要った点は次で確定した。

- 予算: 月の上限は設けず、AIチャットの利用枠（`api/lib/quota.ts`）を共用する。Redis未設定時の扱いも`api/chat.ts`と同じ
- 実行ボタン: まず1本、`client/src/pages/ai-ml/jev/JevTriageApp.tsx`のみ
- 実行できないとき: 理由を明示し、ページの記録（実測の固定値）へ案内する。実呼び出しの結果と記録は見た目で区別する

## 入力

- `POST /api/jev`、ボディは`{ "message": string }`。1〜2,000文字で、空白だけの文字列は受けない
- `message`以外のフィールドは読まない。質問の定義はサーバ側の固定値で、リクエストから変えられない
- `TYPESAFE_API_KEY`はサーバの環境変数だけに置く

## 処理フロー

1. メソッドと入力を検証する（`api/lib/jevRequest.ts`）。ここで弾いた入力は枠を消費しない
2. キーの有無を確かめる。無ければ枠を消費せず503を返す
3. `consumeQuota`で枠を消費する。層は常に`anonymous`
4. リクエストの中でクライアントを作り、`systemOne`を1回呼ぶ（`api/lib/jevTriage.ts`）。タイムアウトは5秒、リトライなし、SDKのログは切る
5. 応答の形を検証し、`department` / `confidence` / `urgent` / `route` / `model` / `elapsedMs` / `inputTokens`を返す

## エッジケース

- キーが無い → 503（`not_configured`）。枠は消費しない
- 入力が不正、JSONが壊れている → 400（`invalid_request`）。枠は消費しない
- 枠を超えた → 429（`quota_exhausted`）。全体枠に達した → 503（`global_kill`）
- SDKが例外を投げた、応答の形が想定と違う → 503（`judgement_failed`）。例外の文面は返さない
- `usage.input_tokens`が`null` → `inputTokens: null`で返し、画面に「報告なし」と出す
- `/api/jev`が無い環境（`vite preview`や静的配信）で404、またはJSON以外が返る → 実行できない理由を出す
- Redis未設定 → `api/chat.ts`と同じくカウントせず実行する

## 出力

- 正常系: 200で判定結果。画面には実呼び出しの札とともに、担当チーム、confidence、緊急度、振り分け、応答時間、入力トークン数、モデルを出す
- 異常系: `route: "review"`を付け、判定の値は返さない。画面には理由、記録の札を付けた固定値、記録の節へのリンクを出す

## 完了条件

- [ ] 検証関数とハンドラの分岐（503、400、429、SDK例外、成功）をSDKのモックで単体テストにする
- [ ] 結果の各状態をstoryにし、`pnpm test:storybook`のaxeを通す
- [ ] 入力が外部API（TypeSafe）へ送られることと枠の共用を、PolicyPrivacyとPolicyChatQuotaに書く
- [ ] 実APIでの動作確認（キーと通信が通る環境が要る）
