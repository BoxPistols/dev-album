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
const MUI_INTRO = "/react/mui/intro";
const MUI_COMPONENTS = "/react/mui/components";
const MUI_CUSTOMIZATION = "/react/mui/customization";
const TAILWIND_MUI = "/react/nextjs-css/tailwind-mui";

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
    verifiedAt: "2026-11-07",
    quotes: [
      "By default, Claude reads `AGENTS.md` only when you have no `CLAUDE.md` in your working directory or above it.",
      "Imported files can recursively import other files, with a maximum depth of four hops.",
      "target under 200 lines per CLAUDE.md file",
      "help you organize a long file but don't reduce its context cost, because imported files load together with the CLAUDE.md that imports them.",
      "Project-root CLAUDE.md survives compaction: after `/compact`, Claude re-reads it from disk and re-injects it into the session.",
      "if two instructions contradict each other, Claude may pick one arbitrarily",
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
    verifiedAt: "2026-11-07",
    quotes: [
      "You modify Gemini Code Assist on GitHub behavior by adding a config.yaml file to a .gemini/ folder located in the root of each of your repositories.",
      "The minimum severity of review comments to consider",
      "pull_request_opened : help : false summary : false code_review : true include_drafts : true",
    ],
    usedBy: [MULTI_AI],
  },
  {
    id: "gemini-code-assist-style-guide",
    title: "Gemini Code Assist on GitHub — Style guide（.gemini/styleguide.md）",
    url: "https://docs.cloud.google.com/gemini/docs/code-review/style-guide?hl=en",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "You can apply a style guide directly to an individual repository by adding a styleguide.md Markdown file to the .gemini/ root folder of your repository",
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
    usedBy: ["/ai-ml/jev/jev-overview", "/ai-ml/jev/jev-account", "/ai-ml/jev/jev-setup", "/ai-ml/jev/jev-primitives", "/ai-ml/jev/jev-state-design", "/ai-ml/jev/jev-app-ideas", "/ai-ml/jev/jev-triage-app", "/ai-ml/jev/jev-chart-picker-app", "/ai-ml/jev/jev-dashboard-app", "/ai-ml/jev/jev-design-search-app", "/ai-ml/jev/jev-flight-app", "/ai-ml/jev/jev-advanced"],
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
    usedBy: ["/ai-ml/jev/jev-overview", "/ai-ml/jev/jev-account", "/ai-ml/jev/jev-setup", "/ai-ml/jev/jev-primitives", "/ai-ml/jev/jev-state-design", "/ai-ml/jev/jev-app-ideas", "/ai-ml/jev/jev-triage-app", "/ai-ml/jev/jev-chart-picker-app", "/ai-ml/jev/jev-dashboard-app", "/ai-ml/jev/jev-design-search-app", "/ai-ml/jev/jev-flight-app", "/ai-ml/jev/jev-advanced"],
  },
  {
    id: "typesafe-docs-models",
    title: "TypeSafe AI Docs — Models",
    url: "https://docs.typesafe.ai/models",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "You pay per input token. Output tokens are free.",
      "Each response's `model` field gives the versioned ID that answered, so you can log which model produced each result.",
      "`GET /v1/models` returns the names your account can send in the `model` field, each with a description and a release date.",
      "64k per-request / 32k per-question",
      "Per-request context (`per_request_context`): the `state` plus all questions combined. Per-question context (`per_question_context`): the `state` plus any one question.",
      "An alias moves when a new release ships, so its answers can change without any change to your code.",
      "If you have tuned confidence thresholds against one version, send that version's ID instead of the alias, and switch to the new version when you are ready.",
      "are accepted by the `model` field whether or not they appear in the list.",
    ],
    usedBy: ["/ai-ml/jev/jev-account", "/ai-ml/jev/jev-overview", "/ai-ml/jev/jev-setup", "/ai-ml/jev/jev-primitives", "/ai-ml/jev/jev-state-design", "/ai-ml/jev/jev-advanced"],
  },
  {
    id: "typesafe-docs-quickstart",
    title: "TypeSafe AI Docs — Quick start",
    url: "https://docs.typesafe.ai/introduction/quickstart",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "Get an API key from the [TypeSafe console](https://console.typesafe.ai/keys).",
      "**Open the [Playground](https://console.typesafe.ai/playground)** and log in.",
    ],
    usedBy: ["/ai-ml/jev/jev-account", "/ai-ml/jev/jev-overview", "/ai-ml/jev/jev-setup"],
  },
  {
    id: "typesafe-docs-api-errors",
    title: "TypeSafe AI Docs — Request rules and errors",
    url: "https://docs.typesafe.ai/api/errors",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
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
    verifiedAt: "2026-11-07",
    quotes: [
      "`confidence` is a statistic computed from the probability distribution the answer already gives you.",
      "Confidence is derived from the probabilities",
      "In both cases a flatter distribution means lower confidence",
      "Thresholds scale with risk",
      "A Noul answer is a single probability $p$ that the answer is yes, and TypeSafe returns no separate `confidence` for it.",
    ],
    usedBy: ["/ai-ml/jev/jev-overview", "/ai-ml/jev/jev-primitives", "/ai-ml/jev/jev-advanced"],
  },
  {
    id: "typesafe-docs-python-usage",
    title: "TypeSafe AI Docs — Python SDK usage",
    url: "https://docs.typesafe.ai/sdk/python/usage",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "`typesafe_sdk` logger level, applied once at import",
    ],
    usedBy: ["/ai-ml/jev/jev-setup"],
  },
  {
    id: "typesafe-docs-python-usage-advanced",
    title: "TypeSafe AI Docs — Python SDK advanced usage",
    url: "https://docs.typesafe.ai/sdk/python/usage/advanced",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "Or set `TYPESAFE_LOG_LEVEL` to one of `debug`, `info`, `warning`, `error`, or `off` before importing the SDK.",
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
    verifiedAt: "2026-11-07",
    quotes: [
      "A ticket that mentions a wrong size and a missing refund would split probability between `returns` and `billing`, and confidence would drop.",
      "Use an object when a description needs several kinds of guidance, such as what an option covers, what it doesn't cover, and some examples.",
      "The `tone` question uses `null` descriptions because the option names are clear on their own.",
    ],
    usedBy: ["/ai-ml/jev/jev-primitives", "/ai-ml/jev/jev-state-design"],
  },
  {
    id: "typesafe-docs-primitives-score",
    title: "TypeSafe AI Docs — Score",
    url: "https://docs.typesafe.ai/primitives/score",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "Different distributions can produce the same score.",
      "A score of 1.0 can mean all probability is on level 1, or half is on each of levels 0 and 2.",
      "This describes the model's answer, not a guarantee that the answer is correct.",
      "You can use it to rank reports by severity, or round it to the nearest level when your code needs one outcome.",
      "It's each level number multiplied by its probability, added up",
      "Read `probabilities` and `confidence` alongside the score to distinguish these cases.",
    ],
    usedBy: ["/ai-ml/jev/jev-primitives", "/ai-ml/jev/jev-advanced"],
  },
  {
    id: "typesafe-docs-jaggedness-jev-1-13",
    title: "TypeSafe AI Docs — Model jaggedness",
    url: "https://docs.typesafe.ai/model-jaggedness",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "Accuracy falls as the state grows with content unrelated to the decision.",
      "Jev is not a calculator.",
      "Jev does not count reliably.",
      "Jev reads dates as text, not as ordered quantities.",
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
  {
    id: "nextjs-blog-16",
    title: "Next.js 16",
    url: "https://nextjs.org/blog/next-16",
    kind: "official-post",
    verifiedAt: "2026-11-07",
    quotes: [
      "Turbopack has reached stability for both development and production builds, and is now the default bundler for all new Next.js projects.",
      "2–5× faster production builds",
      "Up to 10× faster Fast Refresh",
      "`proxy.ts` replaces `middleware.ts` and makes the app’s network boundary explicit.",
      "The `middleware.ts` file is still available for Edge runtime use cases, but it is deprecated and will be removed in a future version.",
      "It is not enabled by default as we continue gathering build performance data across different application types.",
      "Minimum version now 20.9.0 (LTS); Node.js 18 no longer supported",
      "Chrome 111+, Edge 111+, Firefox 111+, Safari 16.4+",
    ],
    usedBy: ["/react/nextjs-advanced/next15-features", "/react/nextjs-basics/what-is-nextjs"],
  },
  {
    id: "nextjs-blog-16-4",
    title: "Next.js 16.4",
    url: "https://nextjs.org/blog/next-16-4",
    kind: "official-post",
    verifiedAt: "2026-11-07",
    quotes: [
      "This new programming model is called Cache Components, and it will become the default in Next.js 17.",
      "As of today, all new apps created with `create-next-app` will have Cache Components enabled by default.",
      "Starting with Next.js 16.4, we’re excited to recommend Cache Components as the best choice for every Next.js app.",
    ],
    usedBy: ["/react/nextjs-advanced/next15-features", "/react/nextjs-basics/project-setup", "/react/nextjs-basics/what-is-nextjs"],
  },
  {
    id: "nextjs-upgrade-version-16",
    title: "How to upgrade to version 16",
    url: "https://nextjs.org/docs/app/guides/upgrading/version-16",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "Turbopack is stable and used by default with `next dev` and `next build`",
      "Use the `--webpack` flag to opt out of Turbopack and build with Webpack.",
      "The `edge` runtime is NOT supported in `proxy`.",
      "The `proxy` runtime is `nodejs`, and it cannot be configured.",
      "synchronous access is fully removed",
      "The `upgrade` codemod does not run every migration codemod.",
      "The `experimental.dynamicIO` and `experimental.useCache` flags have been removed.",
    ],
    usedBy: ["/react/nextjs-advanced/next15-features", "/react/nextjs-advanced/next15-ppr"],
  },
  {
    id: "nextjs-docs-turbopack",
    title: "Turbopack - Next.js Docs",
    url: "https://nextjs.org/docs/app/api-reference/turbopack",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "Turbopack support for `build` is stable, and Turbopack becomes the default bundler for Next.js.",
      "Turbopack support for `build` beta",
      "Experimental support for `build`",
      "Turbopack for `dev` stable",
      "Turbopack does not support webpack plugins.",
    ],
    usedBy: ["/react/nextjs-advanced/next15-features"],
  },
  {
    id: "nextjs-docs-cache-components",
    title: "cacheComponents - Next.js Docs",
    url: "https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "Data fetching is dynamic by default, and you choose what to cache at the page, component, or function level.",
      "Leaving it unset logs a warning, because the first release of Cache Components did not include Partial Prefetching.",
    ],
    usedBy: ["/react/nextjs-advanced/next15-features", "/react/nextjs-advanced/next15-ppr"],
  },
  {
    id: "nextjs-docs-partial-prefetching",
    title: "partialPrefetching - Next.js Docs",
    url: "https://nextjs.org/docs/app/api-reference/config/next-config-js/partialPrefetching",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "`partialPrefetching` introduced. Requires `cacheComponents` to be enabled.",
    ],
    usedBy: ["/react/nextjs-advanced/next15-features", "/react/nextjs-advanced/next15-ppr"],
  },
  {
    id: "nextjs-docs-react-compiler",
    title: "reactCompiler - Next.js Docs",
    url: "https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "`reactCompiler` stabilized and moved from `experimental.reactCompiler` to the top-level `reactCompiler` option.",
    ],
    usedBy: ["/react/nextjs-advanced/next15-features"],
  },
  {
    id: "nextjs-docs-proxy",
    title: "proxy.js - Next.js Docs",
    url: "https://nextjs.org/docs/app/api-reference/file-conventions/proxy",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "Middleware is deprecated and renamed to Proxy.",
      "npx @next/codemod@canary middleware-to-proxy .",
    ],
    usedBy: ["/react/nextjs-advanced/next15-features"],
  },
  {
    id: "nextjs-docs-create-next-app",
    title: "create-next-app - Next.js Docs",
    url: "https://nextjs.org/docs/app/api-reference/cli/create-next-app",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "Force enable Webpack in generated package.json",
      "Initialize with Cache Components enabled (default for App Router)",
      "Which linter would you like to use? ESLint / Biome / None",
      "Would you like to use Cache Components? No / Yes",
    ],
    usedBy: ["/react/nextjs-basics/project-setup"],
  },
  {
    id: "nextjs-create-next-app-16-4-5-output",
    title: "create-next-app 16.4.5の生成物とnext dev / next buildの出力（実測）",
    kind: "measured",
    verifiedAt: "2026-11-07",
    reproduce:
      "npx create-next-app@16.4.5 my-app --yes --use-npm --disable-git && cd my-app && npm run dev（別の端末でcurl http://localhost:3000/）。続けてnpm run build。実測時は@latestで実行し、16.4.5に解決された",
    note: "2026-11-07、macOS、Node.js 26.13.0、next 16.4.5、react 19.3.0で実行した。next.config.tsにcacheComponents: trueとpartialPrefetching: trueが入り、devとbuildは成功した。--no-cache-componentsを付けるとこの2行が消え、next devとnext buildの出力からCache Components enabledとPartial Prefetching enabledの行も消えた",
    usedBy: ["/react/nextjs-basics/project-setup", "/react/nextjs-advanced/next15-features"],
  },
  {
    id: "nextjs-create-next-app-webpack-flag-ignored",
    title: "create-next-app 16.4.5の--turbopack / --webpackは生成物を変えない（実測）",
    kind: "measured",
    verifiedAt: "2026-11-07",
    reproduce:
      "`npx create-next-app@16.4.5 --help`で両フラグの有無を見る。`npx create-next-app@16.4.5 t --yes --skip-install --webpack`で作り、フラグなしの生成物とpackage.json・next.config.tsをdiffする",
    note: "--helpに--turbopackと--webpackは無かった。どちらも付けてエラーにならず、package.jsonはnameだけが違い、next.config.tsは同一だった。公式リファレンスには両方のフラグが載っている。無視される理由の公式の説明は見つけられなかった",
    usedBy: ["/react/nextjs-basics/project-setup"],
  },
  {
    id: "nextjs-webpack-build-skips-tailwind",
    title: "既定テンプレートをnext build --webpackするとTailwindのユーティリティが生成されない（実測）",
    kind: "measured",
    verifiedAt: "2026-11-07",
    reproduce:
      "create-next-app 16.4.5の既定で作り、`npx next build --webpack`を実行して.next/static/cssの出力を見る。`npx next build`の出力と比べる",
    note: "どちらのビルドも終了コード0だった。Turbopackの出力CSSには.flexがあり、webpackの出力CSSには無く、@themeが処理されずに残っていた。テンプレートのTailwindはnext.config.tsのturbopack.rulesにある@tailwindcss/turbopackで処理される",
    usedBy: ["/react/nextjs-basics/project-setup"],
  },
  {
    id: "nextjs-cache-components-build-errors",
    title: "Cache Components有効時のビルドエラー（実測）",
    kind: "measured",
    verifiedAt: "2026-11-07",
    reproduce:
      "create-next-app 16.4.5の既定で作り、ページに`export const revalidate = 3600`、`export const dynamic = 'force-static'`、Suspenseの外の`await fetch`をそれぞれ書いて`npx next build`を実行する。--no-cache-componentsで作った設定で同じページをビルドする",
    note: "有効時はどれも終了コード1。revalidateとdynamicは「Route segment config ... is not compatible with `nextConfig.cacheComponents`」で止まり、fetchはプリレンダーのエラーで止まった。無効時はrevalidateとfetchを書いたページのビルドが終了コード0で通った",
    usedBy: ["/react/nextjs-basics/project-setup", "/react/nextjs-advanced/next15-features"],
  },
  {
    id: "mui-upgrade-to-v9",
    title: "Upgrade to v9 — Material UI",
    url: "https://raw.githubusercontent.com/mui/material-ui/v9.5.0/docs/data/material/migration/upgrade-to-v9/upgrade-to-v9.md",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "This guide explains how to upgrade from Material UI v7 to v9.",
      "The `xs`, `sm`, `md`, `lg`, `xl` props are replaced by the `size` prop.",
      "The `Grid` component no longer accepts `direction=\"column\"` or `direction=\"column-reverse\"`.",
      "The `ListItemIcon` default min-width has changed to `36px` (previously `56px`)",
      "23 legacy icon exports that ended with `Outline` (without the \"d\") have been removed.",
      "The deprecated system props have been removed from the following components:",
      "`inputProps` — use `slotProps.input` instead",
      "If you were using these deprecated class names as `styleOverrides` keys in your theme, use the `variants` array in the `root` override instead:",
    ],
    usedBy: [MUI_INTRO, MUI_COMPONENTS, MUI_CUSTOMIZATION, TAILWIND_MUI],
  },
  {
    id: "mui-release-v9-0-0",
    title: "Material UI v9.0.0のリリースノート",
    url: "https://github.com/mui/material-ui/releases/tag/v9.0.0",
    kind: "official-repo",
    verifiedAt: "2026-11-07",
    quotes: ["This major release focuses on accessibility improvements, sx prop performance, and cleanup of deprecated APIs."],
    usedByFiles: ["docs/audits/2026-11-07-mui-v9-verdicts.json"],
  },
  {
    id: "mui-release-v9-0-0-beta-1",
    title: "Material UI v9.0.0-beta.1のリリースノート",
    url: "https://github.com/mui/material-ui/releases/tag/v9.0.0-beta.1",
    kind: "official-repo",
    verifiedAt: "2026-11-07",
    quotes: [
      "Remove 'column' and 'column-reverse' options from `direction` prop",
      "Use theme spacing instead of hardcoded minWidth",
    ],
    usedBy: [MUI_COMPONENTS],
  },
  {
    id: "mui-blog-introducing-mui-v9",
    title: "Introducing MUI v9 — MUI Blog",
    url: "https://raw.githubusercontent.com/mui/material-ui/v9.5.0/docs/pages/blog/introducing-mui-v9.md",
    kind: "official-post",
    verifiedAt: "2026-11-07",
    quotes: ["Material UI moves from v7 straight to v9 (there is no Material UI v8, like there is no v2)"],
    usedBy: [MUI_INTRO],
  },
  {
    id: "mui-blog-2026-and-beyond",
    title: "MUI Update: What we've been working on (and why) — MUI Blog",
    url: "https://raw.githubusercontent.com/mui/material-ui/v9.5.0/docs/pages/blog/2026-and-beyond.md",
    kind: "official-post",
    verifiedAt: "2026-11-07",
    quotes: ["Pigment CSS remains in alpha phase and is currently on hold."],
    // 本文にPigment CSSの記述は無い。Issue #162の確認項目として監査で使った
    usedByFiles: ["docs/audits/2026-11-07-mui-v9-verdicts.json"],
  },
  {
    id: "mui-versions",
    title: "Material UI Versions",
    url: "https://raw.githubusercontent.com/mui/material-ui/v9.5.0/docs/data/material/getting-started/versions/versions.md",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: ["The most recent stable version (✓) is recommended for use in production."],
    usedBy: [MUI_INTRO],
  },
  {
    id: "mui-overview-material-design-2",
    title: "Material UI Overview",
    url: "https://raw.githubusercontent.com/mui/material-ui/v9.5.0/docs/data/material/getting-started/overview/overview.md",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: ["Material UI supports Material Design 2."],
    usedBy: [MUI_INTRO],
  },
  {
    id: "mui-upgrade-to-v6-umd",
    title: "Upgrade to v6 — Material UI",
    url: "https://raw.githubusercontent.com/mui/material-ui/v9.5.0/docs/data/material/migration/upgrade-to-v6/upgrade-to-v6.md",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: ["To align with React 19's removal of UMD builds, Material UI has also removed its UMD bundle."],
    usedBy: [MUI_INTRO],
  },
  {
    id: "mui-integration-nextjs",
    title: "Next.js integration — Material UI",
    url: "https://raw.githubusercontent.com/mui/material-ui/v9.5.0/docs/data/material/integrations/nextjs/nextjs.md",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "or `v1X-appRouter` if you are using Next.js v1X",
      "Create a theme file with the `'use client'` directive:",
    ],
    usedBy: [TAILWIND_MUI],
  },
  {
    id: "mui-integration-tailwindcss-v4",
    title: "Tailwind CSS v4 integration — Material UI",
    url: "https://raw.githubusercontent.com/mui/material-ui/v9.5.0/docs/data/material/integrations/tailwindcss/tailwindcss-v4.md",
    kind: "official-docs",
    verifiedAt: "2026-11-07",
    quotes: [
      "allowing Tailwind CSS classes to override Material UI styles.",
      "@layer theme, base, mui, components, utilities;",
    ],
    usedBy: [TAILWIND_MUI],
  },
  {
    id: "npm-mui-material-9-5-0",
    title: "@mui/material 9.5.0（npm registry）",
    url: "https://registry.npmjs.org/@mui/material/9.5.0",
    kind: "official-repo",
    verifiedAt: "2026-11-07",
    quotes: ["\"_id\":\"@mui/material@9.5.0\""],
    note: "引用が示すのは9.5.0の存在まで。latestであることは2026-11-07にnpm view @mui/material dist-tagsで確認した",
    usedBy: [MUI_INTRO],
  },
  {
    id: "npm-downloads-mui-material-2026-10",
    title: "@mui/materialのダウンロード数（2026年10月、npm）",
    url: "https://api.npmjs.org/downloads/point/2026-10-01:2026-10-31/@mui/material",
    kind: "official-repo",
    verifiedAt: "2026-11-07",
    quotes: ["\"downloads\":43207517"],
    note: "npmのダウンロード数はCIやミラーの取得も含む代理指標で、利用者数ではない",
    usedBy: [MUI_INTRO],
  },
  {
    id: "mui-github-repository",
    title: "mui/material-ui（GitHub API）",
    url: "https://api.github.com/repos/mui/material-ui",
    kind: "official-repo",
    verifiedAt: "2026-11-07",
    quotes: ["\"created_at\": \"2014-08-18T19:11:54Z\""],
    usedBy: [MUI_INTRO],
  },
  {
    id: "mui-v9-demo-typography-color",
    title: "Material UI v9のCardのデモ（BasicCard.tsx）",
    url: "https://raw.githubusercontent.com/mui/material-ui/v9.5.0/docs/data/material/components/cards/BasicCard.tsx",
    kind: "official-repo",
    verifiedAt: "2026-11-07",
    quotes: ["<Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>"],
    usedBy: [MUI_INTRO],
  },
  {
    id: "mui-v9-typography-color-render",
    title: "@mui/material 9.5.0のTypographyがcolorの値ごとに出すCSS",
    kind: "measured",
    verifiedAt: "2026-11-07",
    reproduce:
      "@mui/material@9.5.0のTypographyをEmotionのキャッシュ付きでrenderToStringし、color=\"text.secondary\"とsx={{ color: 'text.secondary' }}で挿入されるCSSを比べる",
    note: "color=\"text.secondary\"は色のルールを出さず、color=\"textSecondary\"とsxはrgba(0, 0, 0, 0.6)を出す。型はstringを許すのでtscでは検出できない",
    usedBy: [MUI_INTRO, MUI_COMPONENTS, MUI_CUSTOMIZATION, TAILWIND_MUI],
  },
  {
    id: "mui-v9-typecheck-of-examples",
    title: "教材のコード例を@mui/material 9.5.0の型定義で検査した結果",
    kind: "measured",
    verifiedAt: "2026-11-07",
    reproduce:
      "@mui/material@9.5.0、@mui/material-nextjs@9.5.0、@mui/icons-material@9.5.0、react@19.1.0、typescript@5.8.3を入れた空のプロジェクトに、4ページのcode={...}のうちMUIを使うものを.tsxとして書き出す。useStateなど例が省略しているimportを補い、単独では構文にならないMuiIntroの最初の断片を除いて、strict: falseでtsc --noEmitを回す",
    note: "修正前は40件のエラー。修正後に残る10件は、v5の記法のまま残したプレビューのGrid 4件、教材の外のファイルをimportする例5件、useState('light')の型推論1件。型を通っても効かない指定は検出できない（Typographyのcolorは別の実測で確認した）。パッケージ側の'use client'は、同じプロジェクトに入れた@mui/material/Button/Button.jsの先頭2行で確認した",
    usedBy: [MUI_INTRO, MUI_COMPONENTS, MUI_CUSTOMIZATION, TAILWIND_MUI],
  },
  {
    id: "mui-v5-preview-render",
    title: "MUIページのプレビューをv5.18のUMDで実描画した結果",
    kind: "measured",
    verifiedAt: "2026-11-07",
    reproduce:
      "devサーバを起動し、Playwrightのchromiumで/react/mui/intro、/react/mui/components、/react/mui/customizationを開いて全iframeのconsoleエラーと描画を確認する",
    note: "/vendor/mui-material-5.18.0.umd.min.jsを読むプレビュー24件が描画され、consoleエラーは0件。containedのhoverのboxShadowとSwitchの名前も確認した。UMDはversionを公開しないので、版はファイル名で判断している",
    usedBy: [MUI_INTRO, MUI_COMPONENTS, MUI_CUSTOMIZATION],
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
