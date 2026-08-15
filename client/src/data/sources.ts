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
  /** この出典に依拠している教材ページのパス (navigation.ts の path) */
  usedBy: string[];
}

const AGENT_DOCS = "/claude-mux/multi-ai/agent-docs";
const DESIGN_MD = "/claude-mux/multi-ai/design-md";
const MULTI_AI = "/claude-mux/multi-ai/multi-ai-coexistence";
const SSOT = "/claude-mux/multi-ai/single-source-of-truth";

export const SOURCES: Source[] = [
  {
    id: "claude-code-memory",
    title: "Claude Code — How Claude remembers your project",
    url: "https://code.claude.com/docs/en/memory",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Claude Code reads `CLAUDE.md`, not `AGENTS.md`.",
      "Imported files can recursively import other files, with a maximum depth of four hops.",
      "target under 200 lines per CLAUDE.md file",
      "Splitting into [`@path` imports](#import-additional-files) helps organization but doesn't reduce context, since imported files load at launch.",
      "Project-root CLAUDE.md survives compaction: after `/compact`, Claude re-reads it from disk and re-injects it into the session.",
      "if two rules contradict each other, Claude may pick one arbitrarily",
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

export function getSourcesForPage(path: string): Source[] {
  return SOURCES.filter((s) => s.usedBy.includes(path));
}
