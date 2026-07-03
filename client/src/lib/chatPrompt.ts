import type { EnrichedPageContext } from "./chatContext";

// Layer 1: ベースシステムプロンプト
const BASE_SYSTEM_PROMPT = `あなたは Dev Album（Web 開発の実践リファレンスサイト）の学習サポートアシスタントです。

役割:
- ユーザーが現在閲覧しているページの内容について、質問に回答する
- Web 開発（React, Git, Three.js, Claude Code）に関する実践的なアドバイスを提供する
- 該当する関連ページがあれば、パスを提示して誘導する

応答ルール:
- 日本語で回答する
- フラットで実用的なトーン（教材として自然な表現）
- コード例を含む場合はマークダウンのコードブロックを使用する
- 回答は簡潔に（200文字〜500文字程度）。必要に応じて箇条書きを使う
- Dev Album で扱っている範囲（React, Git, Three.js, Claude Code）の質問に回答する
- 範囲外の質問には「このサイトでは扱っていないトピックです」と丁寧に伝える

マニュアル構成:
- Git / GitHub 入門: Git・GitHub・AIエージェント連携
- React / TypeScript / Next.js 入門: React・TypeScript・Tailwind・MUI・Next.js・アクセシビリティ
- Claude Code & 開発環境: Claude Code・AI コーディングエージェント・MCP・CI/CD
- Three.js / React Three Fiber 入門: 3Dグラフィックス・WebGL`;

// Layer 2: マニュアル構造のコンテキスト
function buildManualContext(ctx: EnrichedPageContext): string {
  if (!ctx.manualTitle || ctx.manualSections.length === 0) return "";

  const sectionList = ctx.manualSections
    .map((s) => `  - ${s.title}`)
    .join("\n");

  return `\n現在のマニュアル: ${ctx.manualTitle}\nセクション構成:\n${sectionList}`;
}

// Layer 3: ランタイムページコンテキスト
function buildPageContext(ctx: EnrichedPageContext): string {
  const parts: string[] = [];

  if (ctx.title) {
    parts.push(`現在のページ: 「${ctx.title}」`);
  }

  if (ctx.sectionTitle) {
    parts.push(`セクション: ${ctx.sectionTitle}`);
  }

  if (ctx.step && ctx.totalSteps) {
    parts.push(`進捗: ステップ ${ctx.step} / ${ctx.totalSteps}`);
  }

  if (ctx.keywords.length > 0) {
    parts.push(`このページのキーワード: ${ctx.keywords.join("、")}`);
  }

  if (ctx.sectionPages.length > 1) {
    const pageList = ctx.sectionPages
      .map((p) => `  - ${p.title} (${p.path})`)
      .join("\n");
    parts.push(`このセクションのページ:\n${pageList}`);
  }

  if (ctx.previousPage) {
    parts.push(
      `前のページ: ${ctx.previousPage.title} (${ctx.previousPage.path})`,
    );
  }
  if (ctx.nextPage) {
    parts.push(`次のページ: ${ctx.nextPage.title} (${ctx.nextPage.path})`);
  }

  return parts.length > 0 ? "\n" + parts.join("\n") : "";
}

export function buildSystemPrompt(ctx: EnrichedPageContext): string {
  return BASE_SYSTEM_PROMPT + buildManualContext(ctx) + buildPageContext(ctx);
}
