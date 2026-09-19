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
  {
    id: "typesafe-sdk-python-pypi-readme",
    title: "typesafe-sdk（TypeSafe AI公式Python SDK）— PyPIに掲載されたREADME",
    url: "https://pypi.org/project/typesafe-sdk/",
    kind: "official-repo",
    verifiedAt: "2026-09-19",
    quotes: [
      "Set TYPESAFE_API_KEY in your environment, then instantiate and use the client:",
      "learn what TypeSafe is, what it can do, and how to use it in TypeSafe docs",
    ],
    usedBy: ["/ai-ml/jev/jev-setup", "/ai-ml/jev/jev-overview", "/ai-ml/jev/jev-account"],
  },
  {
    id: "typesafe-sdk-js-0-6-0-types",
    title: "@typesafe-ai/sdk 0.6.0（TypeSafe AI公式JavaScript SDK）の型定義とREADME（npmから取得して展開）",
    kind: "measured",
    verifiedAt: "2026-09-19",
    reproduce:
      "npm pack @typesafe-ai/sdk@0.6.0 && tar xzf typesafe-ai-sdk-0.6.0.tgz && cat package/README.md package/dist/index.d.mts",
    note:
      "READMEは「Install the SDK (Node.js 20 or newer)」「Set `TYPESAFE_API_KEY` in your environment, then create and use the client」「Answer types are inferred from your questions.」と書く。index.d.mtsはNoulResponseのnoulを「Probability of a yes answer, from zero to one.」、ChoiceResponseのconfidenceを「Reported confidence in the selected label.」、ScoreResponseのscoreを「Expected score, which may fall between integer rubric levels.」、SystemOneRequestPayloadを「Request body for `POST /v1/systemone`」、baseURLの既定を「https://api.typesafe.ai」、defaultModel の既定を「jev-latest」、timeoutを「Timeout per attempt in milliseconds, without a total retry budget. Default: 10000.」、RetryPolicyのmaxRetriesを「Default: 2.」、httpStatusesを「Default: 408, 429, and 500–599.」、dangerouslyAllowBrowserを「Allow browser use, exposing the API key to page users. Default: false.」と定義している。package.jsonのenginesはnode >=20、publish日時は2026-09-15T18:17:19Z（npmレジストリのtimeフィールド）",
    usedBy: ["/ai-ml/jev/jev-overview", "/ai-ml/jev/jev-account", "/ai-ml/jev/jev-setup", "/ai-ml/jev/jev-primitives", "/ai-ml/jev/jev-state-design", "/ai-ml/jev/jev-app-ideas", "/ai-ml/jev/jev-triage-app", "/ai-ml/jev/jev-chart-picker-app", "/ai-ml/jev/jev-dashboard-app", "/ai-ml/jev/jev-clinic-app", "/ai-ml/jev/jev-leads-app", "/ai-ml/jev/jev-advanced"],
  },
  {
    id: "typesafe-sdk-python-0-7-0-schemas",
    title: "typesafe-sdk 0.7.0（TypeSafe AI公式Python SDK）のOpenAPI生成スキーマ（PyPIから取得して展開）",
    kind: "measured",
    verifiedAt: "2026-09-19",
    reproduce:
      "pip download --no-deps --no-binary :all: typesafe-sdk==0.7.0 && tar xzf typesafe_sdk-0.7.0.tar.gz && cat typesafe_sdk-0.7.0/src/typesafe_sdk/_schemas/models.py typesafe_sdk-0.7.0/src/typesafe_sdk/constants.py",
    note:
      "models.pyの先頭に「generated by datamodel-codegen: filename: https://api.typesafe.ai/openapi.json」とあり、API のOpenAPI定義から生成されている。NoulAnswer.noulは「Probability of a yes answer or a true statement, from 0 to 1. Values near 1 favor yes or true, values near 0 favor no or false, and values near 0.5 indicate uncertainty.」、ChoiceAnswer.choiceは「The name of the choice with the highest probability among the question's criteria.」、ChoiceAnswer.probabilitiesは「values sum to approximately 1」、ScoreAnswer.scoreは「Expected score: the probability-weighted average of the rubric levels. May fall between integer levels.」、ScoreQuestion.criteriaは「Each description's position determines its score, starting at zero.」、Usage.output_tokensは「Output tokens are currently free of charge.」、SystemOneRequest.modelは「Available names are returned by GET /v1/models.」、ModelMetadata.release_dateの例は「2026-09-15」と書かれている。constants.pyはDEFAULT_BASE_URL = https://api.typesafe.ai、DEFAULT_MODEL = jev-latest、DEFAULT_TIMEOUT = 10.0（秒）。pyprojectのrequires-pythonは >=3.10",
    usedBy: ["/ai-ml/jev/jev-overview", "/ai-ml/jev/jev-account", "/ai-ml/jev/jev-setup", "/ai-ml/jev/jev-primitives", "/ai-ml/jev/jev-state-design", "/ai-ml/jev/jev-app-ideas", "/ai-ml/jev/jev-triage-app", "/ai-ml/jev/jev-chart-picker-app", "/ai-ml/jev/jev-dashboard-app", "/ai-ml/jev/jev-clinic-app", "/ai-ml/jev/jev-leads-app", "/ai-ml/jev/jev-advanced"],
  },
  {
    id: "typesafe-docs-models",
    title: "TypeSafe AI Docs — Models",
    url: "https://docs.typesafe.ai/models",
    kind: "official-docs",
    verifiedAt: "2026-09-20",
    quotes: [
      "Charged per input token. Output tokens are free.",
      "The response's `model` field reports the versioned ID that answered, so you can log which model produced each result.",
      "English is the primary training language and where accuracy is currently best. Other languages, including CJK scripts, are handled but not equally well; test on your own content before relying on Jev for a non-English workload",
      "`GET /v1/models` returns the names your account can send in the `model` field, with a description and release date for each.",
      "64k tokens per request; 32k tokens for `state` plus the longest question",
      "The 64k budget covers the `state` plus all questions combined; the 32k budget applies to the `state` plus the single longest question.",
      "An alias moves when a new release ships, so the answers behind it can change without a change on your side.",
      "pin that version's ID instead of the alias and move to the new one on your own schedule",
      "Versioned IDs such as `jev-1.13.0` are accepted by the `model` field whether or not they appear in the list.",
    ],
    usedBy: ["/ai-ml/jev/jev-account", "/ai-ml/jev/jev-overview", "/ai-ml/jev/jev-setup", "/ai-ml/jev/jev-primitives", "/ai-ml/jev/jev-state-design", "/ai-ml/jev/jev-advanced"],
  },
  {
    id: "typesafe-docs-quickstart",
    title: "TypeSafe AI Docs — Quick start",
    url: "https://docs.typesafe.ai/introduction/quickstart",
    kind: "official-docs",
    verifiedAt: "2026-09-20",
    quotes: [
      "**Get your API key** from the [dashboard](https://console.typesafe.ai/keys)",
      "**Open the [Playground](https://console.typesafe.ai/playground)** and log in.",
    ],
    usedBy: ["/ai-ml/jev/jev-account", "/ai-ml/jev/jev-overview", "/ai-ml/jev/jev-setup"],
  },
  {
    id: "typesafe-docs-api-errors",
    title: "TypeSafe AI Docs — API reference",
    url: "https://docs.typesafe.ai/api",
    kind: "official-docs",
    verifiedAt: "2026-09-20",
    quotes: [
      "Missing or invalid API key. Check the `Authorization` header.",
      "You have exceeded your rate limit. Back off and retry after a short delay.",
      "TypeSafe is temporarily overloaded. Retry after a short delay.",
    ],
    usedBy: ["/ai-ml/jev/jev-account"],
  },
  {
    id: "typesafe-docs-system-one",
    title: "TypeSafe AI Docs — System One",
    url: "https://docs.typesafe.ai/concepts/system-one",
    kind: "official-docs",
    verifiedAt: "2026-09-20",
    quotes: [
      "System 1 thinking is fast and intuitive. System 2 is slower and more deliberate. Here, the emphasis is on fast, focused judgments.",
    ],
    usedBy: ["/ai-ml/jev/jev-overview"],
  },
  {
    id: "typesafe-docs-confidence",
    title: "TypeSafe AI Docs — Confidence",
    url: "https://docs.typesafe.ai/confidence",
    kind: "official-docs",
    verifiedAt: "2026-09-20",
    quotes: [
      "`confidence` is a statistic computed from the probability distribution the answer already gives you.",
      "Confidence is derived from the probabilities",
      "In both cases a flatter distribution means lower confidence",
      "Thresholds scale with risk",
      "(Noul answers don't carry one.)",
    ],
    usedBy: ["/ai-ml/jev/jev-overview", "/ai-ml/jev/jev-primitives", "/ai-ml/jev/jev-advanced"],
  },
  {
    id: "typesafe-docs-python-usage",
    title: "TypeSafe AI Docs — Python SDK usage",
    url: "https://docs.typesafe.ai/sdk/python/usage",
    kind: "official-docs",
    verifiedAt: "2026-09-20",
    quotes: [
      "Or set `TYPESAFE_LOG_LEVEL` to one of `debug`, `info`, `warning`, `error`, or `off` before importing the SDK.",
      "`typesafe_sdk` logger level, applied once at import",
    ],
    usedBy: ["/ai-ml/jev/jev-setup"],
  },
  {
    id: "vercel-ai-gateway-typesafe-api",
    title: "Vercel Docs — TypeSafe API with AI Gateway",
    url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/typesafe",
    kind: "official-docs",
    verifiedAt: "2026-09-20",
    quotes: [
      "Keep using the [TypeSafe SDK](https://docs.typesafe.ai/introduction) and route requests through AI Gateway by changing one setting.",
      "Change the base URL and the API key:",
      "Everything else stays the same:",
      "The response uses TypeSafe's field names:",
    ],
    usedBy: ["/ai-ml/jev/jev-account"],
  },
  {
    id: "vercel-ai-gateway-budgets",
    title: "Vercel Docs — AI Gateway budgets",
    url: "https://vercel.com/docs/ai-gateway/observability-and-spend/budgets",
    kind: "official-docs",
    verifiedAt: "2026-09-20",
    quotes: [
      "vercel ai-gateway api-keys create --name my-api-key --limit 10 --refresh-period monthly",
    ],
    usedBy: ["/ai-ml/jev/jev-account"],
  },
  {
    id: "vercel-cli-ai-gateway",
    title: "Vercel Docs — vercel ai-gateway (CLI)",
    url: "https://vercel.com/docs/cli/ai-gateway",
    kind: "official-docs",
    verifiedAt: "2026-09-20",
    quotes: [
      "`--limit` is available in Vercel CLI v59.13.0 and later.",
    ],
    usedBy: ["/ai-ml/jev/jev-account"],
  },
  {
    id: "vercel-kb-jev-ai-sdk",
    title: "Vercel KB — How to classify, route, and score with Jev and AI SDK",
    url: "https://vercel.com/kb/guide/typesafe-jev-and-ai-sdk",
    kind: "official-docs",
    verifiedAt: "2026-09-20",
    quotes: [
      "keyed by question ID.",
    ],
    usedBy: ["/ai-ml/jev/jev-account"],
  },
  {
    id: "typesafe-docs-primitives-choice",
    title: "TypeSafe AI Docs — Choice",
    url: "https://docs.typesafe.ai/primitives/choice",
    kind: "official-docs",
    verifiedAt: "2026-09-20",
    quotes: [
      "The `department` answer is `returns` with a 0.60 probability, but `billing` has 0.38 probability because of the double charge. This lowers the confidence to 0.39.",
      "Use an object when a description needs several kinds of guidance, such as what an option covers, what it doesn't cover, and some examples.",
      "The `tone` answer is `frustrated` with a probability of 0.92 and a confidence of 0.88.",
    ],
    usedBy: ["/ai-ml/jev/jev-primitives", "/ai-ml/jev/jev-state-design"],
  },
  {
    id: "typesafe-docs-primitives-score",
    title: "TypeSafe AI Docs — Score",
    url: "https://docs.typesafe.ai/primitives/score",
    kind: "official-docs",
    verifiedAt: "2026-09-20",
    quotes: [
      "Different distributions can produce the same score.",
      "A score of 1.0 can mean all probability is on level 1, or half is on each of levels 0 and 2.",
      "This describes the model's answer, not a guarantee that the answer is correct.",
      "You can use it to rank reports by severity, or round it to the nearest level when your code needs one outcome.",
      "0 x 0.0 + 1 x 0.70 + 2 x 0.30 = 1.30",
      "Read `probabilities` and `confidence` alongside the score to distinguish these cases.",
    ],
    usedBy: ["/ai-ml/jev/jev-primitives", "/ai-ml/jev/jev-advanced"],
  },
  {
    id: "typesafe-docs-jaggedness-jev-1-13",
    title: "TypeSafe AI Docs — Jev 1.13 jaggedness",
    url: "https://docs.typesafe.ai/model-jaggedness/jev-1.13",
    kind: "official-docs",
    verifiedAt: "2026-09-20",
    quotes: [
      "Accuracy falls as the state grows with content unrelated to the decision.",
      "Jev is not a calculator.",
      "`jev-1.13` does not count reliably.",
      "`jev-1.13` reads dates as text, not as ordered quantities.",
      "Given RGB triples or hex values it cannot reliably judge whether two values are near each other.",
      "retrieve and filter in code first, and send only the fields the question needs.",
    ],
    usedBy: ["/ai-ml/jev/jev-state-design", "/ai-ml/jev/jev-advanced"],
  },
  {
    id: "typesafe-docs-python-retries",
    title: "TypeSafe AI Docs — Python SDK Retries",
    url: "https://docs.typesafe.ai/sdk/python/api/retries",
    kind: "official-docs",
    verifiedAt: "2026-09-20",
    quotes: [
      "Total retry budget in seconds per SDK call, including the initial attempt and delays; `None` disables the limit.",
    ],
    usedBy: ["/ai-ml/jev/jev-state-design"],
  },
  {
    id: "typesafe-docs-cookbook-classifying-rag-passages",
    title: "TypeSafe AI Docs — Classifying RAG passages",
    url: "https://docs.typesafe.ai/cookbooks/classifying_rag_passages",
    kind: "official-docs",
    verifiedAt: "2026-09-20",
    quotes: [
      "One request per passage, so cost scales with `k`.",
    ],
    usedBy: ["/ai-ml/jev/jev-state-design"],
  },
  {
    id: "typesafe-home-faq",
    title: "TypeSafe AI — 公式サイトのFAQ",
    url: "https://typesafe.ai/",
    kind: "measured",
    verifiedAt: "2026-09-20",
    reproduce:
      "ブラウザで https://typesafe.ai/ を開き、開発者ツールのNetworkで読み込まれた.mjs（配信元はframerusercontent.com）を保存して「Is Jev deterministic?」を検索する",
    note: "FAQの回答はページの描画用JSの中にあり、HTTPの応答にも、ブラウザで描画した後の本文にも出ない（質問を開いても本文に入らない）。ブラウザでページを開いて読み込まれたJSを保存し、質問と回答の組を取り出して確かめた。確かめた原文: 「Jev guarantees the shape of its answers, not that every decision is correct.」 / 「Join the waitlist!」 / 「Some tasks requiring extended reasoning, such as complex mathematics or chess-like planning, may be better suited to large reasoning models.」 / 「System One Models are trained for structured decisions from the start, returning typed answers with calibrated probabilities.」",
    usedBy: ["/ai-ml/jev/jev-account", "/ai-ml/jev/jev-overview", "/ai-ml/jev/jev-advanced"],
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
