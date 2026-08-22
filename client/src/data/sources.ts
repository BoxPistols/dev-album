// 教材が依拠する一次情報のレジストリ。
//
// 目的は「書いてある根拠を後から機械で確かめられる状態にすること」。
// quotes に入れた文字列は、scripts/verify-sources.mjs が実際に URL を取得して
// 逐語で含まれるかを照合する。捏造した引用・言い換えた引用はそこで落ちる。
//
// 追加時のルール
// - 引用は逐語のみ。要約・翻訳を quotes に入れない（訳す場合は本文側で「訳は筆者」と書く）
// - kind: "measured" は手元で再現した観測。reproduce に再現コマンドを必ず書く
// - kind: "secondary" は他者の測定・記事。note に「何を根拠に信頼するか」を書く

export type SourceKind =
  /** ベンダーの公式ドキュメント */
  | "official-docs"
  /** 公式リポジトリ・仕様書本体 */
  | "official-repo"
  /** 公式のアナウンス・ブログ */
  | "official-post"
  /** 標準化団体・オープン仕様 */
  | "standard"
  /** 自分の手元で再現した観測 */
  | "measured"
  /** 他者の測定・記事などの二次情報 */
  | "secondary";

export interface Source {
  /** kebab-case の一意な識別子 */
  id: string;
  title: string;
  /** kind が "measured" 以外では必須 */
  url?: string;
  kind: SourceKind;
  /** 一次情報を最後に照合した日 (YYYY-MM-DD) */
  verifiedAt: string;
  /** 出典本文に逐語で含まれるはずの文字列。要約・翻訳を入れない */
  quotes?: string[];
  /** kind が "measured" の場合の再現コマンド */
  reproduce?: string;
  /** kind が "secondary" の場合に、何を根拠に信頼するかを書く */
  note?: string;
  /** この出典に依拠している教材ページのパス (navigation.ts の path)。ページに出典欄を出す用 */
  usedBy?: string[];
  /** この出典に依拠しているファイル (リポジトリ相対)。監査から機械生成した分で使う */
  usedByFiles?: string[];
}

const AGENT_DOCS = "/claude-code/multi-ai/agent-docs";
const DESIGN_MD = "/claude-code/multi-ai/design-md";
const MULTI_AI = "/claude-code/multi-ai/multi-ai-coexistence";
const SSOT = "/claude-code/multi-ai/single-source-of-truth";

import { resolvePagePathFromFile } from "../lib/source-paths";
import { GENERATED_SOURCES } from "./sources.generated";

/** 手で書いた出典。ページの出典欄に出す */
export const CURATED_SOURCES: Source[] = [
  {
    id: "github-slack-use-in-slack",
    title: "Using GitHub in Slack",
    url: "https://docs.github.com/en/integrations/how-tos/slack/use-github-in-slack",
    kind: "official-docs",
    verifiedAt: "2026-08-20",
    quotes: [
      "Subscribes the channel to notifications for the specified repository.",
      "Unsubscribes the channel from notifications for the specified repository.",
      "Lists all repositories the channel is subscribed to.",
      "You, or any other member of the channel, can re-enable threading at any time by following the same steps",
    ],
    usedBy: ["/git/flow-automation/notifications"],
  },
  {
    id: "github-slack-label-filter-survives-unsubscribe",
    title:
      "ラベルフィルタはイベント種別の unsubscribe では消えない（Slack ワークスペースでの実測）",
    kind: "measured",
    verifiedAt: "2026-08-20",
    reproduce:
      '対象チャンネルで /github subscribe owner/repo pulls +label:"X" を実行 → /github unsubscribe owner/repo pulls → /github subscribe list features の出力にラベルフィルタが残る。/github unsubscribe owner/repo +label:"X" を実行すると消える',
    note: "公式ドキュメントには unsubscribe とラベルフィルタの関係の記載がない。手元の Slack ワークスペースで実際に打って確認した挙動",
    usedBy: ["/git/flow-automation/notifications"],
  },
  {
    id: "github-slack-customize-notifications-2026-08",
    title: "Customizing notifications for GitHub in Slack",
    url: "https://docs.github.com/en/integrations/how-tos/slack/customize-notifications",
    kind: "official-docs",
    verifiedAt: "2026-08-20",
    quotes: [
      "If you have previously set up the `commits:all` filter, it will continue to work until you update your configuration to use the `commits:*` filter.",
      "You can update an existing label filter by specifying a new label value",
      "To view the currently active label filters for a channel, use the following command",
    ],
    usedBy: ["/git/flow-automation/notifications"],
  },
  {
    id: "claude-code-memory",
    title: "Claude Code — How Claude remembers your project",
    url: "https://code.claude.com/docs/en/memory",
    kind: "official-docs",
    verifiedAt: "2026-08-23",
    quotes: [
      "Claude Code reads `CLAUDE.md`, not `AGENTS.md`.",
      "Imported files can recursively import other files, with a maximum depth of four hops.",
      "target under 200 lines per CLAUDE.md file",
      "Splitting into [`@path` imports](#import-additional-files) helps organization but doesn't reduce context, since imported files load at launch.",
      "Project-root CLAUDE.md survives compaction: after `/compact`, Claude re-reads it from disk and re-injects it into the session.",
      "if two rules contradict each other, Claude may pick one arbitrarily",
      "For larger projects, you can organize instructions into multiple files using the `.claude/rules/` directory.",
    ],
    usedBy: [AGENT_DOCS, MULTI_AI, SSOT],
  },
  {
    id: "agents-md",
    title: "AGENTS.md",
    url: "https://agents.md/",
    kind: "standard",
    verifiedAt: "2026-08-16",
    quotes: [
      "a dedicated, predictable place to provide the context and instructions to help AI coding agents work on your project",
      "Agents automatically read the nearest file in the directory tree, so the closest one takes precedence",
    ],
    usedBy: [AGENT_DOCS, MULTI_AI],
  },
  {
    id: "claude-code-commands-deep-research",
    title: "Claude Code — Commands reference（/deep-research と /code-review はバンドル済み）",
    url: "https://code.claude.com/docs/en/commands",
    kind: "official-docs",
    verifiedAt: "2026-08-23",
    quotes: [
      "`/deep-research <question>` | **[Workflow](/docs/en/workflows#bundled-workflows).** Fan out web searches on a question, fetch and cross-check sources, and synthesize a cited report",
      "`/deep-research` runs only when you invoke it.",
      "Not every command appears for every user. Availability depends on your platform, plan, and environment.",
    ],
    usedBy: [MULTI_AI],
  },
  {
    id: "cursor-skills-directories",
    title: "Cursor Docs — Skills（.cursor/skills/ と互換読み込み）",
    url: "https://cursor.com/docs/skills",
    kind: "official-docs",
    verifiedAt: "2026-08-23",
    quotes: [
      "Skills are automatically loaded from these locations:",
      "`.cursor/skills/` | Project-level",
      "For compatibility, Cursor also loads skills from Claude and Codex directories: .claude/skills/ , .codex/skills/ , ~/.claude/skills/ , and ~/.codex/skills/ .",
      "Each skill should be a folder containing a SKILL.md file",
    ],
    usedBy: [MULTI_AI],
  },
  {
    id: "gemini-cli-settings-files",
    title: "Gemini CLI — Configuration（設定ファイルは .gemini/settings.json）",
    url: "https://geminicli.com/docs/reference/configuration/",
    kind: "official-docs",
    verifiedAt: "2026-08-23",
    quotes: [
      "Project settings file: Location: .gemini/settings.json within your project’s root directory. Scope: Applies only when running Gemini CLI from that specific project.",
    ],
    usedBy: [MULTI_AI],
  },
  {
    id: "gemini-code-assist-github-config",
    title: "Gemini Code Assist on GitHub — Customize behavior（PR レビューは .gemini/config.yaml）",
    url: "https://docs.cloud.google.com/gemini/docs/code-review/customize-repo-review?hl=en",
    kind: "official-docs",
    verifiedAt: "2026-08-23",
    quotes: [
      "You can modify Gemini Code Assist on GitHub behavior for individual repositories by adding a config.yaml file to a .gemini/ folder located in the root of the repository.",
      "Gemini Code Assist also supports adding a styleguide.md file to the .gemini/ folder",
      "The minimum severity of review comments to consider",
      "pull_request_opened : help : false summary : false code_review : true include_drafts : true",
    ],
    usedBy: [MULTI_AI],
  },
  {
    id: "design-md-repo",
    title: "google-labs-code/design.md — README",
    url: "https://raw.githubusercontent.com/google-labs-code/design.md/main/README.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "A format specification for describing a visual identity to coding agents.",
      "The tokens are the normative values.",
      "Valid component properties: `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`.",
      "The linter runs eleven rules against a parsed DESIGN.md.",
      "The DESIGN.md format is at version `alpha`.",
      "Expect changes to the format as it matures.",
      "| Duplicate section heading | Error; reject the file |",
    ],
    usedBy: [DESIGN_MD],
  },
  {
    id: "design-md-announcement",
    title:
      "Stitch's DESIGN.md format is now open-source（Google 公式アナウンス）",
    url: "https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/",
    kind: "official-post",
    verifiedAt: "2026-08-16",
    quotes: ["can validate their choices against WCAG accessibility rules"],
    usedBy: [DESIGN_MD],
  },
  {
    id: "design-md-cli-drops-unquoted-numbers",
    title: "クォートしない数値が lint 無警告のまま export から消える",
    kind: "measured",
    verifiedAt: "2026-08-16",
    reproduce:
      "printf '%s\\n' '---' 'name: R' 'colors:' '  primary: \"#1A1C1E\"' 'spacing:' '  sm: 8' '  md: 16px' '---' '' '## Overview' '' 'x' > P.md && npx @google/design.md@0.4.0 export --format css-tailwind P.md && npx @google/design.md@0.4.0 lint P.md",
    note: "export に --spacing-sm が現れず、lint は errors 0 / warnings 0、終了コードは 0。仕様のスキーマは spacing に number を許可している。",
    usedBy: [DESIGN_MD],
  },
  {
    id: "design-md-cli-broken-ref-outside-components",
    title: "colors 内の壊れた参照は broken-ref に検出されず export から消える",
    kind: "measured",
    verifiedAt: "2026-08-16",
    reproduce:
      "printf '%s\\n' '---' 'name: R' 'colors:' '  primary: \"#1A1C1E\"' '  accent: \"{colors.nope}\"' '---' '' '## Overview' '' 'x' > ref.md && npx @google/design.md@0.4.0 lint ref.md && npx @google/design.md@0.4.0 export --format css-tailwind ref.md",
    note: "lint の findings に broken-ref は現れず errors 0。export に --color-accent が出力されない。",
    usedBy: [DESIGN_MD],
  },
  {
    id: "design-md-cli-emits-invalid-css",
    title: "範囲外の色関数が CSS として不正な宣言になって出力される",
    kind: "measured",
    verifiedAt: "2026-08-16",
    reproduce:
      "printf '%s\\n' '---' 'name: R' 'colors:' '  bad: \"hsl(120 100% 50% / -1)\"' '---' '' '## Overview' '' 'x' > color.md && npx @google/design.md@0.4.0 export --format css-tailwind color.md",
    note: "--color-bad: #00ff00-ff; が出力される。lint は errors 0。",
    usedBy: [DESIGN_MD],
  },
  {
    id: "design-md-cli-allows-duplicate-headings",
    title: "重複見出しは仕様では Error だが 0.4.0 の lint は素通しする",
    kind: "measured",
    verifiedAt: "2026-08-16",
    reproduce:
      "printf '%s\\n' '---' 'name: R' 'colors:' '  primary: \"#1A1C1E\"' '---' '' '## Overview' '' 'a' '' '## Overview' '' 'b' > dup.md && npx @google/design.md@0.4.0 lint dup.md; echo \"exit=$?\"",
    note: "errors 0 / exit 0。仕様の Consumer Behavior 表は Error; reject the file と定めている。",
    usedBy: [DESIGN_MD],
  },
  {
    id: "design-md-docs-measurements",
    title: "design-md-docs — 実物 74 件の測定と機械検証の実験記録",
    url: "https://github.com/BoxPistols/design-md-docs",
    kind: "secondary",
    verifiedAt: "2026-08-16",
    note: "測定スクリプトと対象コレクション（VoltAgent/awesome-design-md）が公開されており、第三者が同じ数字を再現できる。教材側では引用であることを本文に明示している。",
    usedBy: [DESIGN_MD],
  },
];

/** 手書き + 監査から機械生成した分をあわせたもの。check:sources はこれを照合する */
export const SOURCES: Source[] = [...CURATED_SOURCES, ...GENERATED_SOURCES];

export function getSourcesForPage(path: string): Source[] {
  return CURATED_SOURCES.filter((s) => s.usedBy?.includes(path));
}

/**
 * 生成分の出典を読者に出すページ。issue 49 の試行として 2 ページだけに絞る。
 * https://github.com/BoxPistols/dev-album/issues/49
 *
 * 151 件は登録も逐語照合も済んでいるが、これまで画面には出していなかった。
 * 全ページで一斉に出すと、出典が 10 件以上付くページで教材本文が読みにくくなる。
 * まずこの 2 ページで、折りたたみの出し方と分量が読者にとって邪魔にならないかを
 * 見てから、広げるかどうかを決める。広げるときはこの配列を消して
 * getGeneratedSourcesForPage の絞り込みを外す。
 */
export const GENERATED_SOURCES_TRIAL_PATHS: readonly string[] = [
  "/react/nextjs-advanced/next15-features",
  "/git/github-actions/secrets-permissions",
];

/** path -> 生成分の出典。usedByFiles を navigation の path へ解決して引く */
const generatedByPath = new Map<string, Source[]>();
for (const source of GENERATED_SOURCES) {
  for (const file of source.usedByFiles ?? []) {
    const path = resolvePagePathFromFile(file);
    if (!path) continue;
    const bucket = generatedByPath.get(path);
    if (bucket) {
      if (!bucket.includes(source)) bucket.push(source);
    } else {
      generatedByPath.set(path, [source]);
    }
  }
}

/**
 * 監査から機械生成した出典。引用が原文に逐語で存在することは照合済みだが、
 * その引用がページの主張を支えているかまでは人が確認していない。
 * 表示は GENERATED_SOURCES_TRIAL_PATHS のページに限る。
 */
export function getGeneratedSourcesForPage(path: string): Source[] {
  if (!GENERATED_SOURCES_TRIAL_PATHS.includes(path)) return [];
  return generatedByPath.get(path) ?? [];
}
