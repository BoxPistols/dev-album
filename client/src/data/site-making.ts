// implementation-mirror: .claude/
/**
 * トップページの「このサイトの作り方」に載せる事実。
 * サブエージェント・スキル・コマンドの名前は .claude/ の実ファイルと
 * implementation-drift.test.tsで突き合わせ、増減したら落ちるようにしてある。
 */

export const REPO_URL = "https://github.com/BoxPistols/dev-album";

export const AUTHOR = {
  name: "Ito Atsushi",
  role: "Product Engineer / Frontend",
  portfolioUrl: "https://asagiri-design.carrd.co/",
  githubUrl: "https://github.com/BoxPistols",
} as const;

export interface NamedRole {
  name: string;
  role: string;
}

/** .claude/subagents/<name>.md */
export const SUBAGENTS: readonly NamedRole[] = [
  { name: "content-writer", role: "教材の執筆・修正" },
  { name: "fact-checker", role: "公式ドキュメントとの照合・校正" },
  { name: "qa-tester", role: "テスト実行・プレビューの不具合修正" },
  { name: "ui-reviewer", role: "Storybook・デザイン品質・a11yのレビュー" },
  { name: "graphic-designer", role: "UIビジュアル・アニメーション" },
  { name: "scenario-writer", role: "学習シナリオの進行設計" },
  { name: "growth-marketer", role: "続けて学べる仕組みの設計" },
];

/** .claude/skills/<name>/SKILL.md */
export const SKILLS: readonly string[] = [
  "academic-page",
  "evidence-check",
  "create-page",
  "fix-preview",
  "review",
  "test",
  "build-check",
  "commit",
];

/** .claude/commands/<name>.md */
export const COMMANDS: readonly string[] = [
  "fact-check",
  "audit-previews",
  "deploy-check",
];

export interface PipelineStep {
  title: string;
  body: string;
  /** 実装しているファイル（リポジトリのルートからの相対パス） */
  path: string;
}

/** AIが書いた内容を確かめる流れ。package.jsonのスクリプト名はテストで実在を確認する */
export const VERIFY_STEPS: readonly PipelineStep[] = [
  {
    title: "判定を書く",
    body: "教材の主張ごとに、出典URLと原文の逐語引用をJSONに残す。書くのは人でもLLMでもよい",
    path: "docs/audits",
  },
  {
    title: "引用を機械で照合する",
    body: "pnpm check:verdictsが出典を実際に取得し、引用が原文にあるかを確かめる。言い換えや捏造はここで落ちる",
    path: "scripts/verify-verdicts.mjs",
  },
  {
    title: "定期的に測り直す",
    body: "出典の照合は月次、外部リンクは週次でGitHub Actionsが回す。出典側の改稿もここで拾う",
    path: ".github/workflows/source-checks.yml",
  },
  {
    title: "判断が要るものだけ人へ",
    body: "リダイレクトなど機械で直せるものは自動でPRにし、残りは固定タイトルのissue1本に集約する",
    path: ".github/workflows/link-maintenance.yml",
  },
];

/** 変更の進め方 */
export const FLOW_STEPS: readonly PipelineStep[] = [
  {
    title: "仕様を書く",
    body: "複数ページにまたがる機能は、先にspecs/へ自然言語の仕様を書く",
    path: "specs/README.md",
  },
  {
    title: "共通の規約で実装する",
    body: "AIツールと人が同じAGENTS.mdを読む。設計判断はARCHITECTURE.mdに残す",
    path: "AGENTS.md",
  },
  {
    title: "PRでCIとレビューを通す",
    body: "型・単体テスト・ビルドとPlaywright（a11y検査を3テーマ）がすべて通り、レビューを受けてからマージする",
    path: "CONTRIBUTING.md",
  },
];

export function repoFileUrl(path: string): string {
  // ディレクトリはtree、ファイルはblobで開く（拡張子の有無で見分ける）
  const kind = /\.[a-z]+$/i.test(path) ? "blob" : "tree";
  return `${REPO_URL}/${kind}/main/${path}`;
}
