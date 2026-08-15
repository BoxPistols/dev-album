// 2026-08-16 の主張監査で確認した一次情報。経緯は docs/audits/2026-08-16-claim-audit.md。
//
// このファイルは監査結果から機械生成した。手で編集せず、監査をやり直して作り直す。
// quotes は pnpm check:sources が実際に URL を取得して逐語照合する。
// 照合を通らなかった引用は登録しない（通すために正規化を緩めない）。

import type { Source } from "./sources";

export const GENERATED_SOURCES: Source[] = [
  {
    id: "aws-amazon-com-blogs-devops-amazon-q-developer-end-of-support-announce",
    title: "aws.amazon.com/blogs/devops/amazon-q-developer-end-of-support-announcement/",
    url: "https://aws.amazon.com/blogs/devops/amazon-q-developer-end-of-support-announcement/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "New signups will no longer available starting May 15, 2026. New Q Developer Free Tier account creation (via Builder ID in IDE plugins) and new Q Developer subscription creation (via the AWS Console) will be blocked.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ai-coding-agents/AmazonQDeveloper.tsx",
    ],
  },
  {
    id: "aws-amazon-com-q-developer-pricing",
    title: "aws.amazon.com/q/developer/pricing/",
    url: "https://aws.amazon.com/q/developer/pricing/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "4,000 lines of code per month per user pooled at account level. Extra lines of code available at $.003 per line of code submitted.",
      "Amazon Q Developer transformation capability for Java upgrades *",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ai-coding-agents/AmazonQDeveloper.tsx",
    ],
  },
  {
    id: "blog-google-technology-developers-introducing-gemini-cli-open-source-a",
    title: "blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/",
    url: "https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/",
    kind: "official-post",
    verifiedAt: "2026-08-16",
    quotes: [
      "To use Gemini CLI free-of-charge, simply login with a personal Google account to get a free Gemini Code Assist license. That free license gets you access to Gemini 2.5 Pro and its massive 1 million token context window. To ensure you rarely, if ever, hit a limit during this preview, we offer the industry's largest allowance: 60 model requests per minute and 1,000 requests per day at no charge.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ai-coding-agents/GeminiCli.tsx",
    ],
  },
  {
    id: "blog-vuejs-org-posts-vue-3-4",
    title: "blog.vuejs.org/posts/vue-3-4",
    url: "https://blog.vuejs.org/posts/vue-3-4",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "defineModel is a new <script setup> macro that aims to simplify the implementation of components that support v-model. It was previously shipped in 3.3 as an experimental feature, and has graduated to stable status in 3.4.",
    ],
    usedByFiles: [
      "client/src/pages/vue/basics/PropsEmits.tsx",
    ],
  },
  {
    id: "blog-vuejs-org-posts-vue-3-5",
    title: "blog.vuejs.org/posts/vue-3-5",
    url: "https://blog.vuejs.org/posts/vue-3-5",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "3.5 introduces a globally imported API, onWatcherCleanup(), for registering cleanup callbacks in watchers",
      "Reactive Props Destructure has been stabilized in 3.5. With the feature now enabled by default, variables destructured from a defineProps call in <script setup> are now reactive. Notably, this feature significantly simplifies declaring props with default values by leveraging JavaScript's native default value syntax:",
      "useId() is an API that can be used to generate unique-per-application IDs that are guaranteed to be stable across the server and client renders. They can be used to generate IDs for form elements and accessibility attributes, and can be used in SSR applications without leading to hydration mismatches:",
    ],
    usedByFiles: [
      "client/src/pages/vue/advanced/LatestFeatures.tsx",
      "client/src/pages/vue/basics/Reactivity.tsx",
      "client/src/pages/vue/composition/ComputedWatch.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-agent-teams",
    title: "code.claude.com/docs/en/agent-teams",
    url: "https://code.claude.com/docs/en/agent-teams",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "As of v2.1.186, set \"iterm2\" to use iTerm2 native split panes explicitly. This mode requires the it2 CLI and shows an error with the install command if it2 is missing.",
      "Teammates work independently, each in its own context window, and communicate directly with each other.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ide-agent-teams/AgentOrchestration.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-authentication",
    title: "code.claude.com/docs/en/authentication",
    url: "https://code.claude.com/docs/en/authentication",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "On first launch, Claude Code opens a browser window for you to log in. If you've set the ANTHROPIC_API_KEY environment variable, Claude Code skips the login prompt and asks you to approve the key instead.",
    ],
    usedByFiles: [
      "client/src/pages/git/ai-agent/ClaudeCodeSetup.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-checkpointing",
    title: "code.claude.com/docs/en/checkpointing",
    url: "https://code.claude.com/docs/en/checkpointing",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "These file modifications cannot be undone through rewind. Only direct file edits made through Claude's file editing tools are tracked.",
      "change the period with cleanupPeriodDays",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/claude-intro/SlashCommands.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-claude-directory-cleaned-up-automatically",
    title: "code.claude.com/docs/en/claude-directory#cleaned-up-automatically",
    url: "https://code.claude.com/docs/en/claude-directory#cleaned-up-automatically",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Claude Code deletes the files in the paths below once they're older than cleanupPeriodDays, as long as it can safely determine the retention period. The default is 30 days and the minimum is 1; setting 0 fails with a validation error.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/claude-intro/SlashCommands.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-cli-reference",
    title: "code.claude.com/docs/en/cli-reference",
    url: "https://code.claude.com/docs/en/cli-reference",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "| --max-budget-usd | Maximum dollar amount to spend on API calls",
      "| claude auth login | Sign in to your Anthropic",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/cicd-headless/HeadlessMode.tsx",
      "client/src/pages/claude-mux/claude-core/TokenOptimization.tsx",
      "client/src/pages/claude-mux/claude-intro/ClaudeCodeIntro.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-commands",
    title: "code.claude.com/docs/en/commands",
    url: "https://code.claude.com/docs/en/commands",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Write a JavaScript heap snapshot and a memory breakdown to ~/Desktop, or your home directory on Linux without a Desktop folder, for diagnosing high memory usage. Attach only the -diagnostics.json file when reporting a memory issue; the.heapsnapshot contains your full conversation and credentials, so don't share it. Doesn't appear in the command menu; type it in full.",
      "/clear [name] | Start a new conversation with empty context. Pass a name to label the previous conversation in the /resume picker. To free up context while continuing the same conversation, use /compact instead. Resume the previous conversation with /resume, or, in the same Claude Code process, restore it from the rewind menu's previous-session entry. Aliases: /reset, /new",
      "/init | Initialize project with a CLAUDE.md guide. Set CLAUDE_CODE_NEW_INIT=1 for an interactive flow that also walks through skills, hooks, and personal memory files. If /init finds configuration from a coding agent that /import supports, it offers to carry it over with /import",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/claude-core/TokenOptimization.tsx",
      "client/src/pages/claude-mux/claude-intro/SlashCommands.tsx",
      "client/src/pages/claude-mux/multi-ai-architecture/MultiAICoexistence.tsx",
      "client/src/pages/claude-mux/reference/ClaudeCheatsheet.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-costs",
    title: "code.claude.com/docs/en/costs",
    url: "https://code.claude.com/docs/en/costs",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "You can also customize compaction behavior in your CLAUDE.md file at the root of your project:",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/claude-intro/SlashCommands.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-hooks",
    title: "code.claude.com/docs/en/hooks",
    url: "https://code.claude.com/docs/en/hooks",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "* **Agent hooks** (type: \"agent\"): spawn a subagent that can use tools like Read, Grep, and Glob to verify conditions before returning a decision. Agent hooks are experimental and may change.",
      "Hook events receive these fields as JSON, in addition to event-specific fields documented in each hook event section. For command hooks, this JSON arrives via stdin.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/agent-extensions/CustomSkills.tsx",
      "client/src/pages/claude-mux/hooks-advanced/HooksGuide.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-interactive-mode",
    title: "code.claude.com/docs/en/interactive-mode",
    url: "https://code.claude.com/docs/en/interactive-mode",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Use /btw to ask a question about your current work without adding to the conversation history.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/claude-core/ContextEngineering.tsx",
      "client/src/pages/claude-mux/claude-intro/ClaudeCodeIntro.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-mcp",
    title: "code.claude.com/docs/en/mcp",
    url: "https://code.claude.com/docs/en/mcp",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "* **Output warning threshold**: Claude Code displays a warning when any MCP tool output exceeds 10,000 tokens * **Configurable limit**: you can adjust the maximum allowed MCP output tokens using the MAX_MCP_OUTPUT_TOKENS environment variable * **Default limit**: the default maximum is 25,000 tokens",
      "Local scope is the default. A local-scoped server loads only in the project where you added it and stays private to you. Claude Code stores it in ~/.claude.json under that project's path, so the same server won't appear in your other projects. Use local scope for personal development servers, experimental configurations, or servers with credentials you don't want in version control.",
      "Project-scoped servers from.mcp.json that are awaiting your approval appear in claude mcp list and claude mcp get <name> as ⏸ Pending approval (run claude to approve). Run claude interactively to review and approve them.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/mcp/MCPSetup.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-memory",
    title: "code.claude.com/docs/en/memory",
    url: "https://code.claude.com/docs/en/memory",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Both relative and absolute paths are allowed. Relative paths resolve relative to the file containing the import, not the working directory. Imported files can recursively import other files, with a maximum depth of four hops.",
      "Claude Code reads CLAUDE.md files by walking up the directory tree from your current working directory, checking each directory along the way for CLAUDE.md and CLAUDE.local.md files.",
      "Claude Code reads CLAUDE.md, not AGENTS.md. If your repository already uses AGENTS.md for other coding agents, create a CLAUDE.md that imports it so both tools read the same instructions without duplicating them.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/claude-core/ContextManagement.tsx",
      "client/src/pages/claude-mux/multi-ai-architecture/MultiAICoexistence.tsx",
      "client/src/pages/claude-mux/multi-ai-architecture/SingleSourceOfTruth.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-memory-md",
    title: "code.claude.com/docs/en/memory.md",
    url: "https://code.claude.com/docs/en/memory.md",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "**Size**: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence.",
      "All discovered files are concatenated into context rather than overriding each other. Across the directory tree, content is ordered from the filesystem root down to your working directory. For the foo/bar/ example, foo/CLAUDE.md appears in context before foo/bar/CLAUDE.md, so instructions closer to where you launched Claude are read last. Within each directory, CLAUDE.local.md is appended after CLAUDE.md, so your personal notes are the last thing Claude reads at that level.",
      "Both relative and absolute paths are allowed. Relative paths resolve relative to the file containing the import, not the working directory. Imported files can recursively import other files, with a maximum depth of four hops.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/multi-ai-architecture/AgentDocs.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-model-config",
    title: "code.claude.com/docs/en/model-config",
    url: "https://code.claude.com/docs/en/model-config",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "* **Max, Team Premium, Enterprise pay-as-you-go, and Anthropic API**: defaults to Opus 5 * **Claude Platform on AWS, Amazon Bedrock, and Google Cloud's Agent Platform**: defaults to Opus 5 * **Pro, Team Standard, and Enterprise subscription seats**: defaults to Sonnet 5 * **Microsoft Foundry**: defaults to Sonnet 4.5",
      "2. **At startup**: launch with claude --model <alias|name>",
      "Aliases point to the recommended version for your provider and update over time. To pin to a specific version, use the full model name, for example claude-opus-5, or set the corresponding environment variable like ANTHROPIC_DEFAULT_OPUS_MODEL.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/claude-core/ExtendedThinking.tsx",
      "client/src/pages/claude-mux/reference/ClaudeCheatsheet.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-permission-modes",
    title: "code.claude.com/docs/en/permission-modes",
    url: "https://code.claude.com/docs/en/permission-modes",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "**During a session**: press Shift+Tab to cycle modes. From auto, the first press switches to default, and the cycle then runs default → acceptEdits → plan.",
      "If you set dontAsk mode, Claude Code auto-denies every tool call that would otherwise prompt you. Claude runs only actions matching your permissions.allow rules, read-only Bash commands, and calls approved by a PreToolUse hook. Use this mode for CI pipelines or restricted environments where you pre-define exactly what Claude may do; the session never waits for input.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/reference/ClaudeCheatsheet.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-permissions",
    title: "code.claude.com/docs/en/permissions",
    url: "https://code.claude.com/docs/en/permissions",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Rules are evaluated in order: deny, then ask, then allow. The first match in that order determines the outcome, and rule specificity doesn't change the order.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/claude-core/SecurityPermissions.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-plugins",
    title: "code.claude.com/docs/en/plugins",
    url: "https://code.claude.com/docs/en/plugins",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Skills live in the skills/ directory. Each skill is a folder containing a SKILL.md file. The folder name becomes the skill name, prefixed with the plugin's namespace (hello/ in a plugin named my-first-plugin creates /my-first-plugin:hello).",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ide-agent-teams/PluginsEcosystem.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-settings",
    title: "code.claude.com/docs/en/settings",
    url: "https://code.claude.com/docs/en/settings",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "1. **Managed** (highest): can't be overridden by any other scope, apart from the exceptions to managed settings precedence 2. **Command line arguments**: temporary session overrides 3. **Local**: overrides project and user settings 4. **Project**: overrides user settings 5. **User** (lowest): applies when nothing else specifies the setting",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/claude-core/SecurityPermissions.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-setup",
    title: "code.claude.com/docs/en/setup",
    url: "https://code.claude.com/docs/en/setup",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "* **Operating system**: * macOS 13.0+ * Windows 10 1809+ or Windows Server 2019+ * Ubuntu 20.04+ * Debian 10+ * Alpine Linux 3.19+ * **Hardware**: 4 GB+ RAM, x64 or ARM64 processor",
      "Claude Code requires a Pro, Max, Team, Enterprise, or Console account. The free Claude.ai plan does not include Claude Code access.",
      "You can also install Claude Code as a global npm package. As of v2.1.198, the npm package requires Node.js 22 or later. On an older Node.js version, npm prints an EBADENGINE warning during install rather than failing; the install completes and claude still runs, since the package downloads a native binary that doesn't use your Node.js at runtime.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/claude-intro/ClaudeCodeIntro.tsx",
      "client/src/pages/claude-mux/claude-intro/InstallSetup.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-skills",
    title: "code.claude.com/docs/en/skills",
    url: "https://code.claude.com/docs/en/skills",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "**Custom commands have been merged into skills.** A file at.claude/commands/deploy.md and a skill at.claude/skills/deploy/SKILL.md both create /deploy and work the same way. Your existing.claude/commands/ files keep working. Skills add optional features: a directory for supporting files, frontmatter to control whether you or Claude invokes them, and the ability for Claude to load them automatically when relevant.",
      "Claude Code skills follow the Agent Skills open standard, which works across multiple AI tools. Claude Code extends the standard with additional features like invocation control, subagent execution, and dynamic context injection.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/agent-extensions/CustomSkills.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-sub-agents",
    title: "code.claude.com/docs/en/sub-agents",
    url: "https://code.claude.com/docs/en/sub-agents",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "| model | No | Model to use: sonnet, opus, haiku, fable, a full model ID (for example, claude-opus-5), or inherit. Defaults to inherit",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/agent-extensions/Subagents.tsx",
    ],
  },
  {
    id: "code-claude-com-docs-en-vs-code",
    title: "code.claude.com/docs/en/vs-code",
    url: "https://code.claude.com/docs/en/vs-code",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "The VS Code extension includes a graphical interface for installing and managing plugins. Type /plugins in the prompt box to open the **Manage plugins** interface.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ide-agent-teams/PluginsEcosystem.tsx",
    ],
  },
  {
    id: "datatracker-ietf-org-doc-draft-ietf-httpapi-ratelimit-headers",
    title: "datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/",
    url: "https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "RateLimit header fields for HTTP draft-ietf-httpapi-ratelimit-headers-11",
    ],
    usedByFiles: [
      "client/src/pages/api/build/RateLimiting.tsx",
    ],
  },
  {
    id: "developers-cloudflare-com-r2-pricing",
    title: "developers.cloudflare.com/r2/pricing/",
    url: "https://developers.cloudflare.com/r2/pricing/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "There are no charges for egress bandwidth for any storage class.",
    ],
    usedByFiles: [
      "client/src/pages/infra/database/BeyondRelational.tsx",
      "client/src/pages/infra/edge/Cloudflare.tsx",
    ],
  },
  {
    id: "developers-figma-com-docs-code-connect",
    title: "developers.figma.com/docs/code-connect/",
    url: "https://developers.figma.com/docs/code-connect/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Code Connect is a bridge between your codebase and Figma's Dev Mode, connecting components in your repositories directly to components in your design files.",
    ],
    usedByFiles: [
      "client/src/pages/devflow/designops/Handoff.tsx",
    ],
  },
  {
    id: "developers-figma-com-docs-figma-mcp-server-code-to-canvas",
    title: "developers.figma.com/docs/figma-mcp-server/code-to-canvas/",
    url: "https://developers.figma.com/docs/figma-mcp-server/code-to-canvas/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Using the remote Figma MCP server, you can convert live UI from your browser into editable Figma frames. Capture a single screen or an entire flow in one session.",
    ],
    usedByFiles: [
      "client/src/pages/react/cdd-flow/DesignCodeSync.tsx",
    ],
  },
  {
    id: "developers-figma-com-docs-figma-mcp-server-remote-server-installation",
    title: "developers.figma.com/docs/figma-mcp-server/remote-server-installation/",
    url: "https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "claude mcp add --transport http figma https://mcp.figma.com/mcp",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/mcp/MCPPractical.tsx",
    ],
  },
  {
    id: "docs-aws-amazon-com-amazons3-latest-userguide-usingobjects-html",
    title: "docs.aws.amazon.com/AmazonS3/latest/userguide/UsingObjects.html",
    url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingObjects.html",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Amazon S3 is an object store that uses unique key-values to store as many objects as you want. You store these objects in one or more buckets, and each object can be up to 50 TB in size.",
    ],
    usedByFiles: [
      "client/src/pages/infra/aws/StorageCdn.tsx",
    ],
  },
  {
    id: "docs-github-com-en-actions-concepts-workflows-and-actions-workflows",
    title: "docs.github.com/en/actions/concepts/workflows-and-actions/workflows",
    url: "https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Workflows are defined in the.github/workflows directory in a repository. A repository can have multiple workflows, each of which can perform a different set of tasks",
    ],
    usedByFiles: [
      "client/src/pages/git/github-actions/Intro.tsx",
    ],
  },
  {
    id: "docs-github-com-en-actions-get-started-quickstart",
    title: "docs.github.com/en/actions/get-started/quickstart",
    url: "https://docs.github.com/en/actions/get-started/quickstart",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "For GitHub to discover any GitHub Actions workflows in your repository, you must save the workflow files in a directory called.github/workflows.",
    ],
    usedByFiles: [
      "client/src/pages/git/github-actions/WorkflowBasics.tsx",
    ],
  },
  {
    id: "docs-github-com-en-actions-how-tos-monitor-workflows-enable-debug-logg",
    title: "docs.github.com/en/actions/how-tos/monitor-workflows/enable-debug-logging",
    url: "https://docs.github.com/en/actions/how-tos/monitor-workflows/enable-debug-logging",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "To enable step debug logging, set the following secret or variable in the repository that contains the workflow: ACTIONS_STEP_DEBUG to true. If both the secret and variable are set, the value of the secret takes precedence over the variable.",
    ],
    usedByFiles: [
      "client/src/pages/git/github-actions/ReuseTroubleshoot.tsx",
    ],
  },
  {
    id: "docs-github-com-en-actions-how-tos-write-workflows-choose-when-workflo",
    title: "docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-wor",
    url: "https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "For all other events, this behavior prevents you from accidentally creating recursive workflow runs. For example, if a workflow run pushes code using the repository's GITHUB_TOKEN, a new workflow will not run even when the repository contains a workflow configured to run when push events occur.",
    ],
    usedByFiles: [
      "client/src/pages/git/flow-automation/AutoTestRefactor.tsx",
    ],
  },
  {
    id: "docs-github-com-en-actions-reference-security-oidc",
    title: "docs.github.com/en/actions/reference/security/oidc",
    url: "https://docs.github.com/en/actions/reference/security/oidc",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "The job or workflow must grant the id-token: write permission to allow GitHub's OIDC provider to create a JSON Web Token (JWT):",
    ],
    usedByFiles: [
      "client/src/pages/git/github-actions/SecretsCd.tsx",
    ],
  },
  {
    id: "docs-github-com-en-actions-reference-security-securely-using-pull-requ",
    title: "docs.github.com/en/actions/reference/security/securely-using-pull_request_target",
    url: "https://docs.github.com/en/actions/reference/security/securely-using-pull_request_target",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Workflows triggered by pull_request_target run with elevated trust: the job receives the base repository's GITHUB_TOKEN and access to repository and organization secrets. This is the same trust given to events like push that only collaborators can trigger, and it is what makes pull_request_target useful for automation that responds to pull requests from forks, such as labeling, triage, or for posting authenticated status checks.",
      "pull_request_target makes one critical and subtle change: the workflow, and any subsequent actions/checkout call that does not specify a ref, is taken from the",
    ],
    usedByFiles: [
      "client/src/pages/git/flow-automation/Labels.tsx",
      "client/src/pages/git/github-actions/Reference.tsx",
    ],
  },
  {
    id: "docs-github-com-en-actions-reference-workflows-and-actions-events-that",
    title: "docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows",
    url: "https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "The GITHUB_TOKEN has read-only permissions in pull requests from forked repositories.",
      "This event runs in the context of the default branch of the base repository, rather than in the context of the merge commit, as the pull_request event does. This prevents execution of unsafe code from the head of the pull request that could alter your repository or steal any secrets you use in your workflow. This event allows your workflow to do things like label or comment on pull requests from forks.",
      "With the exception of GITHUB_TOKEN, secrets are not passed to the runner when a workflow is triggered from a forked repository. The GITHUB_TOKEN has read-only permissions in pull requests from forked repositories.",
    ],
    usedByFiles: [
      "client/src/pages/git/flow-automation/AutoTestRefactor.tsx",
      "client/src/pages/git/github-actions/Reference.tsx",
      "client/src/pages/git/github-actions/SecretsPermissions.tsx",
    ],
  },
  {
    id: "docs-github-com-en-actions-reference-workflows-and-actions-workflow-sy",
    title: "docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idsteps",
    url: "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsif",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "When you use expressions in an if conditional, you can, optionally, omit the ${{ }} expression syntax because GitHub Actions automatically evaluates the if conditional as an expression. However, this exception does not apply everywhere. You must always use the ${{ }} expression syntax or escape with '', \"\", or () when the expression starts with!, since! is reserved notation in YAML",
    ],
    usedByFiles: [
      "client/src/pages/git/github-actions/TriggersJobs.tsx",
    ],
  },
  {
    id: "docs-github-com-en-actions-reference-workflows-and-actions-workflow-sy-2",
    title: "docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstrat",
    url: "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstrategyfail-fast",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "jobs.<job_id>.strategy.fail-fast applies to the entire matrix. If jobs.<job_id>.strategy.fail-fast is set to true or its expression evaluates to true, GitHub will cancel all in-progress and queued jobs in the matrix if any job in the matrix fails. This property defaults to true.",
    ],
    usedByFiles: [
      "client/src/pages/git/github-actions/TriggersJobs.tsx",
    ],
  },
  {
    id: "docs-github-com-en-actions-reference-workflows-and-actions-workflow-sy-3",
    title: "docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#name",
    url: "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#name",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "The name of the workflow. GitHub displays the names of your workflows under your repository's \"Actions\" tab. If you omit name, GitHub displays the workflow file path relative to the root of the repository.",
    ],
    usedByFiles: [
      "client/src/pages/git/github-actions/WorkflowBasics.tsx",
    ],
  },
  {
    id: "docs-github-com-en-actions-security-for-github-actions-security-guides",
    title: "docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-gi",
    url: "https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "With the exception of GITHUB_TOKEN, secrets are not passed to the runner when a workflow is triggered from a forked repository.",
    ],
    usedByFiles: [
      "client/src/pages/git/github-actions/SecretsPermissions.tsx",
    ],
  },
  {
    id: "docs-github-com-en-authentication-keeping-your-account-and-data-secure",
    title: "docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-perso",
    url: "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "In the upper-right corner of any page on GitHub, click your profile picture, then click",
    ],
    usedByFiles: [
      "client/src/pages/git/github-actions/SecretsPermissions.tsx",
    ],
  },
  {
    id: "docs-github-com-en-billing-concepts-product-billing-github-actions",
    title: "docs.github.com/en/billing/concepts/product-billing/github-actions",
    url: "https://docs.github.com/en/billing/concepts/product-billing/github-actions",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "GitHub Actions usage is **free** for **self-hosted runners** and for **public repositories** that use standard GitHub-hosted runners.",
    ],
    usedByFiles: [
      "client/src/pages/git/github-actions/Intro.tsx",
    ],
  },
  {
    id: "docs-github-com-en-code-security-tutorials-secure-your-dependencies-au",
    title: "docs.github.com/en/code-security/tutorials/secure-your-dependencies/automate-dependabot-wi",
    url: "https://docs.github.com/en/code-security/tutorials/secure-your-dependencies/automate-dependabot-with-actions",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Your secrets are available in Dependabot secrets rather than as GitHub Actions secrets.",
    ],
    usedByFiles: [
      "client/src/pages/git/github-actions/SecretsPermissions.tsx",
    ],
  },
  {
    id: "docs-github-com-en-communities-using-templates-to-encourage-useful-iss",
    title: "docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-request",
    url: "https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "When blank_issues_enabled is set to false, users with write access or above (Write, Maintain, or Admin roles) will still see the **Blank issue** option in the template chooser, labeled **Maintainers only**. Contributors with Read or Triage roles will only see the configured templates.",
    ],
    usedByFiles: [
      "client/src/pages/git/flow-automation/Templates.tsx",
    ],
  },
  {
    id: "docs-github-com-en-communities-using-templates-to-encourage-useful-iss-2",
    title: "docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-request",
    url: "https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "When you add a pull request template to your repository, project contributors will automatically see the template's contents in the pull request body.",
    ],
    usedByFiles: [
      "client/src/pages/devflow/review/PullRequest.tsx",
    ],
  },
  {
    id: "docs-github-com-en-copilot-concepts-agents-cloud-agent-about-cloud-age",
    title: "docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent",
    url: "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "While working on a coding task, Copilot cloud agent has access to its own ephemeral development environment, powered by GitHub Actions, where it can explore your code, make changes, execute automated tests and linters and more.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ai-coding-agents/GithubCopilot.tsx",
    ],
  },
  {
    id: "docs-github-com-en-copilot-concepts-prompting-response-customization",
    title: "docs.github.com/en/copilot/concepts/prompting/response-customization",
    url: "https://docs.github.com/en/copilot/concepts/prompting/response-customization",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "These are specified in files called AGENTS.md, CLAUDE.md, or GEMINI.md.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ai-coding-agents/ChoosingTools.tsx",
    ],
  },
  {
    id: "docs-github-com-en-copilot-how-tos-copilot-cli-set-up-copilot-cli-inst",
    title: "docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli",
    url: "https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "shell copy brew install --cask copilot-cli",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ai-coding-agents/GithubCopilot.tsx",
    ],
  },
  {
    id: "docs-github-com-en-copilot-how-tos-copilot-on-github-customize-copilot",
    title: "docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instruct",
    url: "https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "You can create one or more AGENTS.md files, stored anywhere within the repository. When Copilot is working, the nearest AGENTS.md file in the directory tree will take precedence.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ai-coding-agents/GithubCopilot.tsx",
    ],
  },
  {
    id: "docs-github-com-en-enterprise-cloud-latest-admin-managing-iam-iam-conf",
    title: "docs.github.com/en/enterprise-cloud@latest/admin/managing-iam/iam-configuration-reference/",
    url: "https://docs.github.com/en/enterprise-cloud@latest/admin/managing-iam/iam-configuration-reference/username-considerations-for-external-authentication",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Usernames for user accounts on GitHub can only contain alphanumeric characters and dashes (-).",
    ],
    usedByFiles: [
      "client/src/pages/git/github/Account.tsx",
    ],
  },
  {
    id: "docs-github-com-en-integrations-how-tos-slack-customize-notifications",
    title: "docs.github.com/en/integrations/how-tos/slack/customize-notifications",
    url: "https://docs.github.com/en/integrations/how-tos/slack/customize-notifications",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "By default, when you configure workflow notifications without passing any filters, it is configured for workflows triggered via pull requests targeting your default branch. You can pass one or multiple entries.",
      "Currently, it is only possible to have one required label filter per repository.",
      "When a label filter is set, only notifications for events including the specified label will be sent.",
    ],
    usedByFiles: [
      "client/src/pages/git/flow-automation/Notifications.tsx",
    ],
  },
  {
    id: "docs-github-com-en-issues-planning-and-tracking-with-projects-automati",
    title: "docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/auto",
    url: "https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/automating-projects-using-actions",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "GITHUB_TOKEN is scoped to the repository level and cannot access projects. To access projects you can either create a GitHub App (recommended for organization projects) or a personal access token (recommended for user projects).",
    ],
    usedByFiles: [
      "client/src/pages/git/flow-automation/Projects.tsx",
    ],
  },
  {
    id: "docs-github-com-en-pull-requests-how-tos-review-pull-requests-approvin",
    title: "docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-wit",
    url: "https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Pull request authors cannot approve their own pull requests.",
    ],
    usedByFiles: [
      "client/src/pages/git/flow-automation/MergeGovernance.tsx",
    ],
  },
  {
    id: "docs-github-com-en-repositories-managing-your-repositorys-settings-and",
    title: "docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizin",
    url: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "# Order is important; the last matching pattern takes the most # precedence. When someone opens a pull request that only # modifies JS files, only @js-owner and not the global # owner(s) will be requested for a review.",
      "Code owners are automatically requested for review when someone opens a pull request that modifies code that they own.",
      "To use a CODEOWNERS file, create a new file called CODEOWNERS in the.github/, root, or docs/ directory of the repository, in the branch where you'd like to add the code owners.",
    ],
    usedByFiles: [
      "client/src/pages/devflow/review/PullRequest.tsx",
      "client/src/pages/git/flow-automation/Assignment.tsx",
    ],
  },
  {
    id: "dora-dev-insights-dora-metrics-history",
    title: "dora.dev/insights/dora-metrics-history/",
    url: "https://dora.dev/insights/dora-metrics-history/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "In 2023, DORA made a significant adjustment to the stability metrics. The metric historically known as \"mean time to recover (MTTR)\" or \"time to restore service\" was renamed and redefined as failed deployment recovery time.",
    ],
    usedByFiles: [
      "client/src/pages/devflow/devops/Dora.tsx",
    ],
  },
  {
    id: "github-blog-changelog-2023-02-02-github-actions-updating-the-default-g",
    title: "github.blog/changelog/2023-02-02-github-actions-updating-the-default-github_token-permissi",
    url: "https://github.blog/changelog/2023-02-02-github-actions-updating-the-default-github_token-permissions-to-read-only/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "As a default, this is too permissive, so to improve security we would like to change the default going forward to a read-only token. You can still flip it to read/write if needed. This change will not impact any existing enterprises, organizations or repositories.",
    ],
    usedByFiles: [
      "client/src/pages/git/github-actions/Reference.tsx",
    ],
  },
  {
    id: "github-blog-security-application-security-token-authentication-require",
    title: "github.blog/security/application-security/token-authentication-requirements-for-git-operat",
    url: "https://github.blog/security/application-security/token-authentication-requirements-for-git-operations/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Beginning August 13, 2021, we will no longer accept account passwords when authenticating Git operations on GitHub.com.",
    ],
    usedByFiles: [
      "client/src/pages/git/github-actions/SecretsPermissions.tsx",
    ],
  },
  {
    id: "github-com-actions-labeler-blob-main-readme-md",
    title: "github.com/actions/labeler/blob/main/README.md",
    url: "https://github.com/actions/labeler/blob/main/README.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "# Add 'Documentation' label to any file changes within 'docs' or 'guides' folders Documentation: - changed-files: - any-glob-to-any-file: - docs/* - guides/*",
    ],
    usedByFiles: [
      "client/src/pages/git/flow-automation/Labels.tsx",
    ],
  },
  {
    id: "github-com-anthropics-claude-code-action",
    title: "github.com/anthropics/claude-code-action",
    url: "https://github.com/anthropics/claude-code-action",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "A general-purpose Claude Code action for GitHub PRs and issues that can answer questions and implement code changes. This action intelligently detects when to activate based on your workflow context-whether responding to @claude mentions, issue assignments, or executing automation tasks with explicit prompts.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/cicd-headless/GitHubActions.tsx",
    ],
  },
  {
    id: "github-com-anthropics-claude-code-action-blob-main-docs-usage-md",
    title: "github.com/anthropics/claude-code-action/blob/main/docs/usage.md",
    url: "https://github.com/anthropics/claude-code-action/blob/main/docs/usage.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "- uses: anthropics/claude-code-action@v1 with: anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }} # Or use OAuth token instead: # claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}",
    ],
    usedByFiles: [
      "client/src/pages/git/flow-automation/AutoTestRefactor.tsx",
    ],
  },
  {
    id: "github-com-features-copilot-plans",
    title: "github.com/features/copilot/plans",
    url: "https://github.com/features/copilot/plans",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "Free For getting started with GitHub Copilot. $ 0 USD Get started Open in VS Code What's included: 2,000 completions per month Access to Haiku 4.5, GPT-5 mini, and more Copilot CLI Community Support No credit card required. Verified students have access to the GitHub Copilot Student plan. Learn more Pro For everyday coding with agents in GitHub Copilot. $ 10 USD per user",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ai-coding-agents/GithubCopilot.tsx",
    ],
  },
  {
    id: "github-com-google-gemini-gemini-cli-blob-main-docs-cli-checkpointing-m",
    title: "github.com/google-gemini/gemini-cli/blob/main/docs/cli/checkpointing.md",
    url: "https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/checkpointing.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "Gemini CLI includes a Checkpointing feature that automatically saves a snapshot of your project's state before any file modifications are made by AI-powered tools. This lets you safely experiment with and apply code changes, knowing you can instantly revert back to the state before the tool was run.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ai-coding-agents/GeminiCli.tsx",
    ],
  },
  {
    id: "github-com-google-gemini-gemini-cli-blob-main-docs-reference-configura",
    title: "github.com/google-gemini/gemini-cli/blob/main/docs/reference/configuration.md",
    url: "https://github.com/google-gemini/gemini-cli/blob/main/docs/reference/configuration.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "--approval-mode <mode>: Sets the approval mode for tool calls. Available modes: default: Prompt for approval on each tool call (default behavior) auto_edit: Automatically approve edit tools (replace, write_file) while prompting for others yolo: Automatically approve all tool calls (equivalent to --yolo) plan: Read-only mode for tool calls (requires experimental planning to be enabled).",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ai-coding-agents/GeminiCli.tsx",
    ],
  },
  {
    id: "github-com-google-labs-code-design-md-blob-main-docs-spec-md",
    title: "github.com/google-labs-code/design.md/blob/main/docs/spec.md",
    url: "https://github.com/google-labs-code/design.md/blob/main/docs/spec.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "spacing: <scale-level>: <Dimension | number>",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/multi-ai-architecture/DesignMd.tsx",
    ],
  },
  {
    id: "github-com-manaflow-ai-cmux",
    title: "github.com/manaflow-ai/cmux",
    url: "https://github.com/manaflow-ai/cmux",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "Terminal keybindings are read from your Ghostty config file (~/.config/ghostty/config). cmux-specific shortcuts (workspaces, splits, browser, notifications) can be customized in Settings.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/cmux/CmuxAgentTeams.tsx",
      "client/src/pages/claude-mux/cmux/CmuxSetup.tsx",
    ],
  },
  {
    id: "github-com-mdn-browser-compat-data-blob-main-css-properties-gap-json",
    title: "github.com/mdn/browser-compat-data/blob/main/css/properties/gap.json",
    url: "https://github.com/mdn/browser-compat-data/blob/main/css/properties/gap.json",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "support\": { \"chrome\": { \"version_added\":",
    ],
    usedByFiles: [
      "client/src/pages/react/css-layout/Flexbox.tsx",
    ],
  },
  {
    id: "github-com-openai-codex-blob-main-readme-md",
    title: "github.com/openai/codex/blob/main/README.md",
    url: "https://github.com/openai/codex/blob/main/README.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "Codex CLI can also be installed via the following package managers:",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ai-coding-agents/OpenAiCodex.tsx",
    ],
  },
  {
    id: "github-com-openai-codex-blob-main-docs-install-md",
    title: "github.com/openai/codex/blob/main/docs/install.md",
    url: "https://github.com/openai/codex/blob/main/docs/install.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "Codex is written in Rust, so it honors the RUST_LOG environment variable to configure its logging behavior.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ai-coding-agents/OpenAiCodex.tsx",
    ],
  },
  {
    id: "github-com-stoplightio-prism-blob-master-docs-getting-started-03-cli-m",
    title: "github.com/stoplightio/prism/blob/master/docs/getting-started/03-cli.md",
    url: "https://github.com/stoplightio/prism/blob/master/docs/getting-started/03-cli.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "prism mock https://raw.githack.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml ✔ success Prism is listening on http://127.0.0.1:4010 ● note GET http://127.0.0.1:4010/pets",
    ],
    usedByFiles: [
      "client/src/pages/react/api-design/OpenApiSwagger.tsx",
    ],
  },
  {
    id: "github-com-stoplightio-prism-blob-master-docs-guides-01-mocking-md",
    title: "github.com/stoplightio/prism/blob/master/docs/guides/01-mocking.md",
    url: "https://github.com/stoplightio/prism/blob/master/docs/guides/01-mocking.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "If a response has an example, it will be used for that response. If there are multiple examples, then they can be selected by name. In the following OpenAPI description, the operation has a 200 OK response and multiple examples:",
    ],
    usedByFiles: [
      "client/src/pages/api/build/MockServer.tsx",
    ],
  },
  {
    id: "github-com-vercel-next-js-blob-v15-5-4-docs-01-app-03-api-reference-05",
    title: "github.com/vercel/next.js/blob/v15.5.4/docs/01-app/03-api-reference/05-config/01-next-conf",
    url: "https://github.com/vercel/next.js/blob/v15.5.4/docs/01-app/03-api-reference/05-config/01-next-config-js/ppr.mdx",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "In Next.js 15, you can incrementally adopt Partial Prerendering in layouts and pages by setting the ppr option in next.config.js to incremental, and exporting the experimental_ppr route config option at the top of the file:",
    ],
    usedByFiles: [
      "client/src/pages/react/nextjs-advanced/Next15Ppr.tsx",
    ],
  },
  {
    id: "github-com-vercel-next-js-blob-v15-5-4-packages-next-src-server-lib-ex",
    title: "github.com/vercel/next.js/blob/v15.5.4/packages/next/src/server/lib/experimental/ppr.ts",
    url: "https://github.com/vercel/next.js/blob/v15.5.4/packages/next/src/server/lib/experimental/ppr.ts",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "/** * If set to incremental, only those leaf pages that export * experimental_ppr = true will have partial prerendering enabled. If any * page exports this value as false or does not export it at all will not * have partial prerendering enabled. If set to a boolean, the options for * experimental_ppr will be ignored. */",
    ],
    usedByFiles: [
      "client/src/pages/react/nextjs-advanced/Next15Ppr.tsx",
    ],
  },
  {
    id: "help-figma-com-hc-en-us-articles-15023124644247-guide-to-dev-mode",
    title: "help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode",
    url: "https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Dev Mode in Figma gives you everything you need to navigate design files and transform designs into code. With Dev Mode, designers and developers can stay on the same page, making sure important details aren't lost in the handoff process.",
    ],
    usedByFiles: [
      "client/src/pages/devflow/designops/Handoff.tsx",
    ],
  },
  {
    id: "kiro-dev-docs-upgrade-guides-migrating-from-q",
    title: "kiro.dev/docs/upgrade-guides/migrating-from-q/",
    url: "https://kiro.dev/docs/upgrade-guides/migrating-from-q/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Kiro CLI is the next update of the Q CLI. Your existing Q Developer CLI workflows, subscription, and authentication continue to work without any changes.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ai-coding-agents/AmazonQDeveloper.tsx",
    ],
  },
  {
    id: "learn-chatgpt-com-docs-agent-approvals-security",
    title: "learn.chatgpt.com/docs/agent-approvals-security",
    url: "https://learn.chatgpt.com/docs/agent-approvals-security",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "OS-level sandbox Codex enforces the sandbox differently depending on your OS:",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/ai-coding-agents/OpenAiCodex.tsx",
    ],
  },
  {
    id: "learn-microsoft-com-en-us-windows-wsl-compare-versions",
    title: "learn.microsoft.com/en-us/windows/wsl/compare-versions",
    url: "https://learn.microsoft.com/en-us/windows/wsl/compare-versions",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "A traditional VM experience can be slow to boot up, is isolated, consumes a lot of resources, and requires your time to manage it. WSL 2 does not have these attributes.",
    ],
    usedByFiles: [
      "client/src/pages/git/advanced/WSL2.tsx",
    ],
  },
  {
    id: "learn-microsoft-com-en-us-windows-wsl-install",
    title: "learn.microsoft.com/en-us/windows/wsl/install",
    url: "https://learn.microsoft.com/en-us/windows/wsl/install",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "You must be running Windows 10 version 2004 and higher (Build 19041 and higher) or Windows 11 to use the commands below.",
    ],
    usedByFiles: [
      "client/src/pages/git/advanced/WSL2.tsx",
    ],
  },
  {
    id: "nextjs-org-blog-next-10",
    title: "nextjs.org/blog/next-10",
    url: "https://nextjs.org/blog/next-10",
    kind: "official-post",
    verifiedAt: "2026-08-16",
    quotes: [
      "- **Built-in Image Component and Automatic Image Optimization**: Automatically optimize images using the new next/image component",
    ],
    usedByFiles: [
      "client/src/pages/react/nextjs-basics/WhatIsNextjs.tsx",
    ],
  },
  {
    id: "nextjs-org-blog-next-15",
    title: "nextjs.org/blog/next-15",
    url: "https://nextjs.org/blog/next-15",
    kind: "official-post",
    verifiedAt: "2026-08-16",
    quotes: [
      "Next.js now supports the TypeScript next.config.ts file type and provides a NextConfig type for autocomplete and type-safe options:",
      "We are happy to announce that next dev --turbo is now **stable and ready** to speed up your development experience.",
      "npx @next/codemod@canary next-async-request-api.",
    ],
    usedByFiles: [
      "client/src/pages/react/nextjs-advanced/Next15Features.tsx",
    ],
  },
  {
    id: "nextjs-org-blog-next-15-1",
    title: "nextjs.org/blog/next-15-1",
    url: "https://nextjs.org/blog/next-15-1",
    kind: "official-post",
    verifiedAt: "2026-08-16",
    quotes: [
      "The after() API is now stable following its introduction in the first Next.js 15 RC.",
    ],
    usedByFiles: [
      "client/src/pages/react/nextjs-advanced/Next15Features.tsx",
    ],
  },
  {
    id: "nextjs-org-blog-turbopack-for-development-stable",
    title: "nextjs.org/blog/turbopack-for-development-stable",
    url: "https://nextjs.org/blog/turbopack-for-development-stable",
    kind: "official-post",
    verifiedAt: "2026-08-16",
    quotes: [
      "This release specifically marks the next dev --turbo command as stable. Production builds (next build --turbo) are not supported yet, but keep reading for an update as they are in progress.",
    ],
    usedByFiles: [
      "client/src/pages/react/nextjs-advanced/Next15Features.tsx",
    ],
  },
  {
    id: "nextjs-org-docs-app-api-reference-components-link",
    title: "nextjs.org/docs/app/api-reference/components/link",
    url: "https://nextjs.org/docs/app/api-reference/components/link",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Prefetching happens when a <Link /> component enters the user's viewport (initially or through scroll). Next.js prefetches and loads the linked route (denoted by the href) and its data in the background to improve the performance of client-side navigations. If the prefetched data has expired by the time the user hovers over a <Link />, Next.js will attempt to prefetch it again. **Prefetching is only enabled in production**.",
    ],
    usedByFiles: [
      "client/src/pages/react/nextjs-basics/NextRouting.tsx",
    ],
  },
  {
    id: "nextjs-org-docs-app-api-reference-config-next-config-js-authinterrupts",
    title: "nextjs.org/docs/app/api-reference/config/next-config-js/authInterrupts",
    url: "https://nextjs.org/docs/app/api-reference/config/next-config-js/authInterrupts",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "The authInterrupts configuration option allows you to use forbidden and unauthorized APIs in your application.",
    ],
    usedByFiles: [
      "client/src/pages/react/nextjs-advanced/Next15Features.tsx",
    ],
  },
  {
    id: "nextjs-org-docs-app-api-reference-file-conventions-error",
    title: "nextjs.org/docs/app/api-reference/file-conventions/error",
    url: "https://nextjs.org/docs/app/api-reference/file-conventions/error",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Error boundaries must be Client Components",
    ],
    usedByFiles: [
      "client/src/pages/react/architecture/ArchOverview.tsx",
    ],
  },
  {
    id: "nextjs-org-docs-app-api-reference-functions-cachelife",
    title: "nextjs.org/docs/app/api-reference/functions/cacheLife",
    url: "https://nextjs.org/docs/app/api-reference/functions/cacheLife",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "tsx filename=\"app/blog/page.tsx\" highlight={1,5} 'use cache' import { cacheLife } from 'next/cache'",
    ],
    usedByFiles: [
      "client/src/pages/react/nextjs-advanced/Next15Ppr.tsx",
    ],
  },
  {
    id: "nextjs-org-docs-app-api-reference-functions-fetch",
    title: "nextjs.org/docs/app/api-reference/functions/fetch",
    url: "https://nextjs.org/docs/app/api-reference/functions/fetch",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "* **false** - Cache the resource indefinitely. Semantically equivalent to revalidate: Infinity. The HTTP cache may evict older resources over time. * **0** - Prevent the resource from being cached. * **number** - (in seconds) Specify the resource should have a cache lifetime of at most n seconds.",
    ],
    usedByFiles: [
      "client/src/pages/api/practice/NextApi.tsx",
    ],
  },
  {
    id: "nextjs-org-docs-app-api-reference-functions-forbidden",
    title: "nextjs.org/docs/app/api-reference/functions/forbidden",
    url: "https://nextjs.org/docs/app/api-reference/functions/forbidden",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "| Version | Changes | | --------- | ----------------------- | | v15.1.0 | forbidden introduced. |",
    ],
    usedByFiles: [
      "client/src/pages/react/nextjs-advanced/Next15Features.tsx",
    ],
  },
  {
    id: "nextjs-org-docs-app-guides-data-security",
    title: "nextjs.org/docs/app/guides/data-security",
    url: "https://nextjs.org/docs/app/guides/data-security",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "By default, when a Server Action is created and exported, it is reachable via a direct POST request, not just through your application's UI. This means, even if a Server Action or utility function is not imported elsewhere in your code, it can still be called externally.",
    ],
    usedByFiles: [
      "client/src/pages/api/practice/NextApi.tsx",
    ],
  },
  {
    id: "nextjs-org-docs-app-guides-upgrading-version-15",
    title: "nextjs.org/docs/app/guides/upgrading/version-15",
    url: "https://nextjs.org/docs/app/guides/upgrading/version-15",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "* cookies * headers * draftMode",
    ],
    usedByFiles: [
      "client/src/pages/react/nextjs-advanced/Next15Features.tsx",
    ],
  },
  {
    id: "nuxt-com-docs-3-x-getting-started-upgrade",
    title: "nuxt.com/docs/3.x/getting-started/upgrade",
    url: "https://nuxt.com/docs/3.x/getting-started/upgrade",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "When you set your compatibilityVersion to 4, defaults throughout your Nuxt configuration will change to opt in to Nuxt v4 behavior, but you can granularly re-enable Nuxt v3 behavior when testing, following the commented out lines above.",
    ],
    usedByFiles: [
      "client/src/pages/vue/nuxt-basics/WhatIsNuxt.tsx",
    ],
  },
  {
    id: "nuxt-com-docs-4-x-directory-structure-app-layouts",
    title: "nuxt.com/docs/4.x/directory-structure/app/layouts",
    url: "https://nuxt.com/docs/4.x/directory-structure/app/layouts",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Layouts are enabled by adding <NuxtLayout> to your app.vue:",
    ],
    usedByFiles: [
      "client/src/pages/vue/nuxt-basics/RoutingLayouts.tsx",
    ],
  },
  {
    id: "nuxt-com-docs-4-x-directory-structure-app-pages",
    title: "nuxt.com/docs/4.x/directory-structure/app/pages",
    url: "https://nuxt.com/docs/4.x/directory-structure/app/pages",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "If you need a catch-all route, you create it by using a file named like [",
    ],
    usedByFiles: [
      "client/src/pages/vue/nuxt-basics/RoutingLayouts.tsx",
    ],
  },
  {
    id: "nuxt-com-docs-4-x-directory-structure-tsconfig",
    title: "nuxt.com/docs/4.x/directory-structure/tsconfig",
    url: "https://nuxt.com/docs/4.x/directory-structure/tsconfig",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Nuxt automatically generates multiple TypeScript configuration files (.nuxt/tsconfig.app.json,.nuxt/tsconfig.server.json,.nuxt/tsconfig.node.json and.nuxt/tsconfig.shared.json) that include recommended basic TypeScript configuration for your project, references to auto-imports, API route types, path aliases, and more.",
    ],
    usedByFiles: [
      "client/src/pages/vue/advanced/LatestFeatures.tsx",
      "client/src/pages/vue/nuxt-basics/WhatIsNuxt.tsx",
    ],
  },
  {
    id: "nuxt-com-docs-4-x-getting-started-data-fetching",
    title: "nuxt.com/docs/4.x/getting-started/data-fetching",
    url: "https://nuxt.com/docs/4.x/getting-started/data-fetching",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "The payload is a JavaScript object accessible through useNuxtApp().payload. It is used on the client to avoid refetching the same data when the code is executed in the browser during hydration.",
    ],
    usedByFiles: [
      "client/src/pages/vue/nuxt-basics/DataFetching.tsx",
    ],
  },
  {
    id: "nuxt-com-docs-4-x-getting-started-deployment",
    title: "nuxt.com/docs/4.x/getting-started/deployment",
    url: "https://nuxt.com/docs/4.x/getting-started/deployment",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "When running nuxt build with the Node server preset, the result will be an entry point that launches a ready-to-run Node server.",
    ],
    usedByFiles: [
      "client/src/pages/vue/nuxt-server/Deploy.tsx",
    ],
  },
  {
    id: "nuxt-com-docs-4-x-getting-started-upgrade",
    title: "nuxt.com/docs/4.x/getting-started/upgrade",
    url: "https://nuxt.com/docs/4.x/getting-started/upgrade",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Nuxt now defaults to a new directory structure, with backwards compatibility (so if Nuxt detects you are using the old structure, such as with a top-level app/pages/ directory, this new structure will not apply).",
    ],
    usedByFiles: [
      "client/src/pages/vue/nuxt-basics/WhatIsNuxt.tsx",
      "client/src/pages/vue/nuxt-server/ServerApi.tsx",
    ],
  },
  {
    id: "openapi-ts-dev-openapi-fetch",
    title: "openapi-ts.dev/openapi-fetch/",
    url: "https://openapi-ts.dev/openapi-fetch/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "only present if 4XX or 5XX response } = await",
    ],
    usedByFiles: [
      "client/src/pages/api/practice/ReactApi.tsx",
    ],
  },
  {
    id: "opentelemetry-io-docs-what-is-opentelemetry",
    title: "opentelemetry.io/docs/what-is-opentelemetry/",
    url: "https://opentelemetry.io/docs/what-is-opentelemetry/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Open source, as well as vendor- and tool-agnostic, meaning that it can be used with a broad variety of observability backends, including open source tools like Jaeger and Prometheus, as well as commercial offerings.",
    ],
    usedByFiles: [
      "client/src/pages/infra/observability/Monitoring.tsx",
    ],
  },
  {
    id: "owasp-org-api-security-editions-2023-en-0x11-t10",
    title: "owasp.org/API-Security/editions/2023/en/0x11-t10/",
    url: "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "API1:2023 - Broken Object Level Authorization",
    ],
    usedByFiles: [
      "client/src/pages/api/quality/Security.tsx",
    ],
  },
  {
    id: "platform-claude-com-docs-en-build-with-claude-prompt-caching",
    title: "platform.claude.com/docs/en/build-with-claude/prompt-caching",
    url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Cache read tokens are 0.1 times the base input tokens price",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/claude-core/TokenOptimization.tsx",
    ],
  },
  {
    id: "r3f-docs-pmnd-rs-getting-started-your-first-scene",
    title: "r3f.docs.pmnd.rs/getting-started/your-first-scene",
    url: "https://r3f.docs.pmnd.rs/getting-started/your-first-scene",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Note that we don't need to import anything, All three.js objects will be treated as native JSX elements, just like you can just write <div /> or <span /> in regular ReactDOM. The general rule is that Fiber components are available under the camel-case version of their name in three.js.",
    ],
    usedByFiles: [
      "client/src/pages/threejs/practical/r3f-basics.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-boxpistols-dev-album-main-client-src-hooks-u",
    title: "raw.githubusercontent.com/BoxPistols/dev-album/main/client/src/hooks/useChatHistory.ts",
    url: "https://raw.githubusercontent.com/BoxPistols/dev-album/main/client/src/hooks/useChatHistory.ts",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "function saveMessages(messages: ChatMessage[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); }",
    ],
    usedByFiles: [
      "client/src/pages/PolicyChatQuota.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-google-labs-code-design-md-main-readme-md",
    title: "raw.githubusercontent.com/google-labs-code/design.md/main/README.md",
    url: "https://raw.githubusercontent.com/google-labs-code/design.md/main/README.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "The linter runs eleven rules against a parsed DESIGN.md. Each rule produces findings at a fixed severity level.",
      "Valid component properties: backgroundColor, textColor, typography, rounded, padding, size, height, width.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/multi-ai-architecture/DesignMd.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-integrations-slack-master-readme-md",
    title: "raw.githubusercontent.com/integrations/slack/master/README.md",
    url: "https://raw.githubusercontent.com/integrations/slack/master/README.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "| Event | Is filtered | | ---------------------- | ----------------- | | Pull | ✅ Yes | | Comment (PR and Issue) | ✅ Yes | | Issue | ✅ Yes | | Review | ✅ Yes | | Commit/Push | ❌ No | | Branch | ❌ No |",
    ],
    usedByFiles: [
      "client/src/pages/git/flow-automation/Notifications.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-mrdoob-three-js-dev-examples-jsm-controls-ma",
    title: "raw.githubusercontent.com/mrdoob/three.js/dev/examples/jsm/controls/MapControls.js",
    url: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/jsm/controls/MapControls.js",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "/** * This class is intended for transforming a camera over a map from bird's eye perspective. * The class shares its implementation with {@link OrbitControls} but uses a specific preset * for mouse/touch interaction and disables screen space panning by default. * * - Orbit: Right mouse, or left mouse + ctrl/meta/shiftKey",
    ],
    usedByFiles: [
      "client/src/pages/threejs/applied/orbit-controls.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-mrdoob-three-js-dev-src-materials-meshphongm",
    title: "raw.githubusercontent.com/mrdoob/three.js/dev/src/materials/MeshPhongMaterial.js",
    url: "https://raw.githubusercontent.com/mrdoob/three.js/dev/src/materials/MeshPhongMaterial.js",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "* @type {number} * @default 30 */ this.shininess = 30;",
    ],
    usedByFiles: [
      "client/src/pages/threejs/basics/material.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-mui-material-ui-master-docs-data-material-in",
    title: "raw.githubusercontent.com/mui/material-ui/master/docs/data/material/integrations/nextjs/ne",
    url: "https://raw.githubusercontent.com/mui/material-ui/master/docs/data/material/integrations/nextjs/nextjs.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "Start by ensuring that you already have @mui/material and next installed. Then, run one of the following commands to install the dependencies:",
      "diff title=\"app/layout.tsx\" +import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';",
    ],
    usedByFiles: [
      "client/src/pages/react/nextjs-css/TailwindMui.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-mui-material-ui-master-docs-data-material-mi",
    title: "raw.githubusercontent.com/mui/material-ui/master/docs/data/material/migration/upgrade-to-v",
    url: "https://raw.githubusercontent.com/mui/material-ui/master/docs/data/material/migration/upgrade-to-v7/upgrade-to-v7.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "The deprecated Grid component has been renamed to GridLegacy. The Grid2 component has been moved to the Grid namespace.",
    ],
    usedByFiles: [
      "client/src/pages/react/mui/MuiComponents.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-mui-material-ui-master-packages-mui-material",
    title: "raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/styles/createTy",
    url: "https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/styles/createTypography.js",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "const variants = { h1: buildVariant(fontWeightLight, 96, 1.167, -1.5), h2: buildVariant(fontWeightLight, 60, 1.2, -0.5), h3: buildVariant(fontWeightRegular, 48, 1.167, 0),",
    ],
    usedByFiles: [
      "client/src/pages/react/mui/MuiIntro.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-nitrojs-nitro-main-docs-2-deploy-0-index-md",
    title: "raw.githubusercontent.com/nitrojs/nitro/main/docs/2.deploy/0.index.md",
    url: "https://raw.githubusercontent.com/nitrojs/nitro/main/docs/2.deploy/0.index.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "When deploying to production using CI/CD, Nitro tries to automatically detect the provider environment and set the right one without any additional configuration required. Currently, the providers below can be auto-detected with zero config.",
    ],
    usedByFiles: [
      "client/src/pages/vue/nuxt-server/Deploy.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-nuxt-nuxt-3-x-docs-1-getting-started-18-upgr",
    title: "raw.githubusercontent.com/nuxt/nuxt/3.x/docs/1.getting-started/18.upgrade.md",
    url: "https://raw.githubusercontent.com/nuxt/nuxt/3.x/docs/1.getting-started/18.upgrade.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "Until the release, it is possible to test many of Nuxt 4's breaking changes from Nuxt version 3.12+.",
    ],
    usedByFiles: [
      "client/src/pages/vue/advanced/LatestFeatures.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-nuxt-nuxt-main-docs-1-getting-started-15-pre",
    title: "raw.githubusercontent.com/nuxt/nuxt/main/docs/1.getting-started/15.prerendering.md",
    url: "https://raw.githubusercontent.com/nuxt/nuxt/main/docs/1.getting-started/15.prerendering.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "You can now deploy the.output/public directory to any static hosting service or preview it locally with npx serve.output/public.",
    ],
    usedByFiles: [
      "client/src/pages/vue/nuxt-server/RenderingModes.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-nuxt-nuxt-main-docs-2-directory-structure-1",
    title: "raw.githubusercontent.com/nuxt/nuxt/main/docs/2.directory-structure/1.app/1.middleware.md",
    url: "https://raw.githubusercontent.com/nuxt/nuxt/main/docs/2.directory-structure/1.app/1.middleware.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "3. Global route middleware, placed in the app/middleware/ with a.global suffix and is run on every route change.",
    ],
    usedByFiles: [
      "client/src/pages/vue/nuxt-server/MiddlewarePlugins.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-nuxt-nuxt-main-docs-2-directory-structure-1-2",
    title: "raw.githubusercontent.com/nuxt/nuxt/main/docs/2.directory-structure/1.app/1.plugins.md",
    url: "https://raw.githubusercontent.com/nuxt/nuxt/main/docs/2.directory-structure/1.app/1.plugins.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "You can use.server or.client suffix in the file name to load a plugin only on the server or client side.",
    ],
    usedByFiles: [
      "client/src/pages/vue/nuxt-server/MiddlewarePlugins.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-nuxt-nuxt-main-docs-3-guide-1-concepts-1-ren",
    title: "raw.githubusercontent.com/nuxt/nuxt/main/docs/3.guide/1.concepts/1.rendering.md",
    url: "https://raw.githubusercontent.com/nuxt/nuxt/main/docs/3.guide/1.concepts/1.rendering.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "- isr: number | boolean{lang=ts} - The behavior is the same as swr except that we are able to add the response to the CDN cache on platforms that support this (currently Netlify or Vercel). If true is used, the content persists until the next deploy inside the CDN.",
    ],
    usedByFiles: [
      "client/src/pages/vue/nuxt-server/RenderingModes.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-nuxt-nuxt-main-docs-3-guide-6-going-further",
    title: "raw.githubusercontent.com/nuxt/nuxt/main/docs/3.guide/6.going-further/10.runtime-config.md",
    url: "https://raw.githubusercontent.com/nuxt/nuxt/main/docs/3.guide/6.going-further/10.runtime-config.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "- On client-side, only keys in runtimeConfig.public and runtimeConfig.app (which is used by Nuxt internally) are available, and the object is both writable and reactive.",
      "Only a specially-named environment variable can override a runtime config property. That is, an uppercase environment variable starting with NUXT_ which uses _ to separate keys and case changes.",
    ],
    usedByFiles: [
      "client/src/pages/vue/nuxt-server/Deploy.tsx",
      "client/src/pages/vue/nuxt-server/ServerApi.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-nuxt-nuxt-main-docs-4-api-2-composables-use",
    title: "raw.githubusercontent.com/nuxt/nuxt/main/docs/4.api/2.composables/use-fetch.md",
    url: "https://raw.githubusercontent.com/nuxt/nuxt/main/docs/4.api/2.composables/use-fetch.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "It automatically generates a key for the request, provides type hints for request url based on server routes, and infers API response type.",
    ],
    usedByFiles: [
      "client/src/pages/vue/nuxt-server/ServerApi.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-storybookjs-storybook-v8-6-14-migration-md",
    title: "raw.githubusercontent.com/storybookjs/storybook/v8.6.14/MIGRATION.md",
    url: "https://raw.githubusercontent.com/storybookjs/storybook/v8.6.14/MIGRATION.md",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "In Storybook 8, we have dropped Node.js 16 support since it reached end-of-life on 2023-09-11. Storybook 8 supports Node.js 18 and above.",
    ],
    usedByFiles: [
      "client/src/pages/react/storybook/SbSetup.tsx",
    ],
  },
  {
    id: "raw-githubusercontent-com-vueuse-vueuse-main-packages-core-usefetch-in",
    title: "raw.githubusercontent.com/vueuse/vueuse/main/packages/core/useFetch/index.ts",
    url: "https://raw.githubusercontent.com/vueuse/vueuse/main/packages/core/useFetch/index.ts",
    kind: "official-repo",
    verifiedAt: "2026-08-16",
    quotes: [
      "/** * Will automatically refetch when: * - the URL is changed if the URL is a ref * - the payload is changed if the payload is a ref * * @default false */ refetch?: MaybeRefOrGetter<boolean>",
    ],
    usedByFiles: [
      "client/src/pages/api/practice/VueApi.tsx",
    ],
  },
  {
    id: "react-dev-blog-2024-04-25-react-19-upgrade-guide",
    title: "react.dev/blog/2024/04/25/react-19-upgrade-guide",
    url: "https://react.dev/blog/2024/04/25/react-19-upgrade-guide",
    kind: "official-post",
    verifiedAt: "2026-08-16",
    quotes: [
      "Run all codemods listed in this guide with the React 19 codemod recipe:",
    ],
    usedByFiles: [
      "client/src/pages/react/react19/React19Upgrade.tsx",
    ],
  },
  {
    id: "react-dev-blog-2024-12-05-react-19",
    title: "react.dev/blog/2024/12/05/react-19",
    url: "https://react.dev/blog/2024/12/05/react-19",
    kind: "official-post",
    verifiedAt: "2026-08-16",
    quotes: [
      "New function components will no longer need forwardRef, and we will be publishing a codemod to automatically update your components to use the new ref prop. In future versions we will deprecate and remove forwardRef.",
    ],
    usedByFiles: [
      "client/src/pages/react/architecture/DesignSystem.tsx",
    ],
  },
  {
    id: "react-dev-learn-react-compiler",
    title: "react.dev/learn/react-compiler",
    url: "https://react.dev/learn/react-compiler",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Learn what React Compiler does and how it automatically optimizes your React application by handling memoization for you, eliminating the need for manual useMemo, useCallback, and React.memo.",
    ],
    usedByFiles: [
      "client/src/pages/react/nextjs-advanced/Next15Ppr.tsx",
    ],
  },
  {
    id: "react-dev-learn-react-compiler-installation",
    title: "react.dev/learn/react-compiler/installation",
    url: "https://react.dev/learn/react-compiler/installation",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "<TerminalBlock> npm install -D babel-plugin-react-compiler@latest </TerminalBlock>",
    ],
    usedByFiles: [
      "client/src/pages/react/react19/React19Features.tsx",
    ],
  },
  {
    id: "react-dev-learn-reusing-logic-with-custom-hooks",
    title: "react.dev/learn/reusing-logic-with-custom-hooks",
    url: "https://react.dev/learn/reusing-logic-with-custom-hooks",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "If your linter is configured for React, it will enforce this naming convention. Scroll up to the sandbox above and rename useOnlineStatus to getOnlineStatus. Notice that the linter won't allow you to call useState or useEffect inside of it anymore. Only Hooks and components can call other Hooks!",
    ],
    usedByFiles: [
      "client/src/pages/react/hooks-deep/CustomHooks.tsx",
    ],
  },
  {
    id: "router-vuejs-org-guide-essentials-dynamic-matching-html",
    title: "router.vuejs.org/guide/essentials/dynamic-matching.html",
    url: "https://router.vuejs.org/guide/essentials/dynamic-matching.html",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "One thing to note when using routes with params is that when the user navigates from /users/johnny to /users/jolyne,",
    ],
    usedByFiles: [
      "client/src/pages/vue/state-routing/Router.tsx",
    ],
  },
  {
    id: "schemathesis-readthedocs-io-en-stable-reference-cli",
    title: "schemathesis.readthedocs.io/en/stable/reference/cli/",
    url: "https://schemathesis.readthedocs.io/en/stable/reference/cli/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "-u, --url URL Type: String Default: null Specifies the base URL for the API under test. Required for file-based schemas. $ st run openapi.yaml --url https://api.example.com",
    ],
    usedByFiles: [
      "client/src/pages/api/quality/ContractTesting.tsx",
    ],
  },
  {
    id: "spec-openapis-org-oas-v3-0-3",
    title: "spec.openapis.org/oas/v3.0.3",
    url: "https://spec.openapis.org/oas/v3.0.3",
    kind: "standard",
    verifiedAt: "2026-08-16",
    quotes: [
      "null is not supported as a type (see nullable for an alternative solution).",
    ],
    usedByFiles: [
      "client/src/pages/api/openapi/SchemaComponents.tsx",
    ],
  },
  {
    id: "spec-openapis-org-oas-v3-1-0",
    title: "spec.openapis.org/oas/v3.1.0",
    url: "https://spec.openapis.org/oas/v3.1.0",
    kind: "standard",
    verifiedAt: "2026-08-16",
    quotes: [
      "A self-contained or composite resource which defines or describes an API or elements of an API. The OpenAPI document MUST contain at least one paths field, a components field or a webhooks field.",
      "Determines whether this parameter is mandatory. If the parameter location is \"path\", this property is REQUIRED and its value MUST be true. Otherwise, the property MAY be included and its default value is false.",
      "This object is a superset of the JSON Schema Specification Draft 2020-12.",
    ],
    usedByFiles: [
      "client/src/pages/api/openapi/DocumentStructure.tsx",
      "client/src/pages/api/openapi/WhatIsOpenApi.tsx",
    ],
  },
  {
    id: "storybook-js-org-docs-8-builders-vite",
    title: "storybook.js.org/docs/8/builders/vite",
    url: "https://storybook.js.org/docs/8/builders/vite",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Out of the box, Storybook's Vite builder includes a set of configuration defaults for the supported frameworks, which are merged alongside your existing configuration file. For an optimal experience when using the Vite builder, we recommend applying any configuration directly inside Vite's configuration file (i.e., vite.config.js|ts). When Storybook loads, it automatically merges the configuration into its own.",
    ],
    usedByFiles: [
      "client/src/pages/react/storybook/SbSetup.tsx",
    ],
  },
  {
    id: "storybook-js-org-docs-8-essentials",
    title: "storybook.js.org/docs/8/essentials",
    url: "https://storybook.js.org/docs/8/essentials",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "A major strength of Storybook are addons that extend Storybook's UI and behavior. Storybook ships by default with a set of \"essential\" addons that add to the initial user experience. There are many third-party addons as well as \"official\" addons developed by the Storybook core team.",
    ],
    usedByFiles: [
      "client/src/pages/react/storybook/SbIntro.tsx",
    ],
  },
  {
    id: "storybook-js-org-docs-8-writing-tests-test-addon",
    title: "storybook.js.org/docs/8/writing-tests/test-addon",
    url: "https://storybook.js.org/docs/8/writing-tests/test-addon",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Storybook's Test addon allows you to test your components directly inside Storybook. On its own, it transforms your stories into component tests, which test the rendering and behavior of your components in a real browser environment.",
    ],
    usedByFiles: [
      "client/src/pages/react/storybook/SbAdvanced.tsx",
    ],
  },
  {
    id: "styled-components-com-docs-faqs",
    title: "styled-components.com/docs/faqs",
    url: "https://styled-components.com/docs/faqs",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "If you're using styled-components v6+, TypeScript types are included out of the box and you should not need a separate types package.",
    ],
    usedByFiles: [
      "client/src/pages/react/css-basics/StyledComponents.tsx",
    ],
  },
  {
    id: "tailwindcss-com-docs-dark-mode",
    title: "tailwindcss.com/docs/dark-mode",
    url: "https://tailwindcss.com/docs/dark-mode",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "If you want your dark theme to be driven by a CSS selector instead of the prefers-color-scheme media query, override the dark variant to use your custom selector:",
    ],
    usedByFiles: [
      "client/src/pages/react/design-tokens/DarkModeImpl.tsx",
    ],
  },
  {
    id: "tailwindcss-com-docs-installation-framework-guides-nextjs",
    title: "tailwindcss.com/docs/installation/framework-guides/nextjs",
    url: "https://tailwindcss.com/docs/installation/framework-guides/nextjs",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "02 Install Tailwind CSS Install @tailwindcss/postcss and its peer dependencies via npm. Terminal npm install tailwindcss @tailwindcss/postcss postcss",
    ],
    usedByFiles: [
      "client/src/pages/react/nextjs-css/TailwindMui.tsx",
    ],
  },
  {
    id: "tailwindcss-com-docs-theme",
    title: "tailwindcss.com/docs/theme",
    url: "https://tailwindcss.com/docs/theme",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Use @theme when you want a design token to map directly to a utility class, and use:root for defining regular CSS variables that shouldn't have corresponding utility classes.",
    ],
    usedByFiles: [
      "client/src/pages/react/design-tokens/TokensPractice.tsx",
    ],
  },
  {
    id: "tailwindcss-com-docs-upgrade-guide",
    title: "tailwindcss.com/docs/upgrade-guide",
    url: "https://tailwindcss.com/docs/upgrade-guide",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Using a JavaScript config file JavaScript config files are still supported for backward compatibility, but they are no longer detected automatically in v4. If you still need to use a JavaScript config file, you can load it explicitly using the @config directive: CSS @config \"../../tailwind.config.js\";",
    ],
    usedByFiles: [
      "client/src/pages/react/tailwind/Intro.tsx",
    ],
  },
  {
    id: "vercel-com-docs-functions-runtimes-edge",
    title: "vercel.com/docs/functions/runtimes/edge",
    url: "https://vercel.com/docs/functions/runtimes/edge",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "We recommend migrating from edge to Node.js for improved performance and",
    ],
    usedByFiles: [
      "client/src/pages/infra/edge/EdgeFunctions.tsx",
    ],
  },
  {
    id: "vercel-com-docs-plans-hobby",
    title: "vercel.com/docs/plans/hobby",
    url: "https://vercel.com/docs/plans/hobby",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Optionally, add team members. Developer seats cost **$20 per user",
    ],
    usedByFiles: [
      "client/src/pages/react/deploy/Vercel.tsx",
    ],
  },
  {
    id: "vercel-com-kb-guide-a-record-and-caa-with-vercel",
    title: "vercel.com/kb/guide/a-record-and-caa-with-vercel",
    url: "https://vercel.com/kb/guide/a-record-and-caa-with-vercel",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Always use the value shown in your project's domain card. For most projects that value is 76.76.21.21, a general-purpose anycast address. Newer projects draw a value from a pool of anycast IPs matched to the plan and project, so your card may show a different address such as 216.198.79.1. The card is the source of truth, so use whatever it displays.",
    ],
    usedByFiles: [
      "client/src/pages/react/deploy/Vercel.tsx",
    ],
  },
  {
    id: "vite-dev-config-server-options-server-port",
    title: "vite.dev/config/server-options#server-port",
    url: "https://vite.dev/config/server-options#server-port",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Specify server port. Note if the port is already being used, Vite will automatically try the next available port so this may not be the actual port the server ends up listening on.",
    ],
    usedByFiles: [
      "client/src/pages/vue/nuxt-basics/WhatIsNuxt.tsx",
    ],
  },
  {
    id: "vuejs-org-guide-scaling-up-state-management-html",
    title: "vuejs.org/guide/scaling-up/state-management.html",
    url: "https://vuejs.org/guide/scaling-up/state-management.html",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Existing users may be familiar with Vuex, the previous official state management library for Vue. With Pinia serving the same role in the ecosystem, Vuex is now in maintenance mode. It still works, but will no longer receive new features. It is recommended to use Pinia for new applications.",
    ],
    usedByFiles: [
      "client/src/pages/vue/state-routing/Pinia.tsx",
    ],
  },
  {
    id: "www-anthropic-com-engineering-managed-agents",
    title: "www.anthropic.com/engineering/managed-agents",
    url: "https://www.anthropic.com/engineering/managed-agents",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Managed Agents is a meta-harness in the same spirit, unopinionated about the specific harness that Claude will need in the future. Rather, it is a system with general interfaces that allow many different harnesses. For example, Claude Code is an excellent harness that we use widely across tasks.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/best-practices/HarnessEngineering.tsx",
    ],
  },
  {
    id: "www-chromatic-com-docs-threshold",
    title: "www.chromatic.com/docs/threshold/",
    url: "https://www.chromatic.com/docs/threshold/",
    kind: "official-docs",
    verifiedAt: "2026-08-16",
    quotes: [
      "Diff threshold values closer to 0 are more sensitive, but more likely to have false positives, while values closer to 1 are less sensitive, but less likely to have false positives. Chromatic's default threshold is.063, which balances high visual accuracy with low false positives (for example, from artifacts like anti-aliasing).",
    ],
    usedByFiles: [
      "client/src/pages/react/cdd-flow/DesignQA.tsx",
    ],
  },
  {
    id: "www-langchain-com-blog-improving-deep-agents-with-harness-engineering",
    title: "www.langchain.com/blog/improving-deep-agents-with-harness-engineering",
    url: "https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering",
    kind: "official-post",
    verifiedAt: "2026-08-16",
    quotes: [
      "We used a simple recipe to iteratively improve deepagents-cli (our coding agent) 13.7 points from 52.8 to 66.5 on Terminal Bench 2.0. We only tweaked the harness and kept the model fixed, gpt-5.2-codex.",
    ],
    usedByFiles: [
      "client/src/pages/claude-mux/best-practices/HarnessEngineering.tsx",
    ],
  },
  {
    id: "www-openapis-org-blog-2016-01-09-next-steps-for-the-oai-an-exciting-20",
    title: "www.openapis.org/blog/2016/01/09/next-steps-for-the-oai-an-exciting-2016-looms-ahead",
    url: "https://www.openapis.org/blog/2016/01/09/next-steps-for-the-oai-an-exciting-2016-looms-ahead",
    kind: "standard",
    verifiedAt: "2026-08-16",
    quotes: [
      "1. OADF renamed to \"OpenAPI Specification\" The initially suggested name for the harbored specification was OADF (\"Open API Definition Format\") - a name that seemingly begged to be replaced by something catchier; the members of the OAI have decided on \"OpenAPI Specification\" (abbreviated to \"OAS\") to be the new name going forward.",
    ],
    usedByFiles: [
      "client/src/pages/react/api-design/OpenApiSwagger.tsx",
    ],
  },
  {
    id: "www-rfc-editor-org-rfc-rfc9111",
    title: "www.rfc-editor.org/rfc/rfc9111",
    url: "https://www.rfc-editor.org/rfc/rfc9111",
    kind: "standard",
    verifiedAt: "2026-08-16",
    quotes: [
      "The public response directive indicates that a cache MAY store the response even if it would otherwise be prohibited, subject to the constraints defined in Section 3. In other words, public explicitly marks the response as cacheable. For example, public permits a shared cache to reuse a response to a request containing an Authorization header field (Section 3.5).",
    ],
    usedByFiles: [
      "client/src/pages/api/rest-design/Caching.tsx",
    ],
  },
  {
    id: "www-rfc-editor-org-rfc-rfc9457",
    title: "www.rfc-editor.org/rfc/rfc9457",
    url: "https://www.rfc-editor.org/rfc/rfc9457",
    kind: "standard",
    verifiedAt: "2026-08-16",
    quotes: [
      "The canonical model for problem details is a JSON",
    ],
    usedByFiles: [
      "client/src/pages/api/advanced/Summary.tsx",
    ],
  },
  {
    id: "www-rfc-editor-org-rfc-rfc9745",
    title: "www.rfc-editor.org/rfc/rfc9745",
    url: "https://www.rfc-editor.org/rfc/rfc9745",
    kind: "standard",
    verifiedAt: "2026-08-16",
    quotes: [
      "The Deprecation HTTP response header field is used to signal to consumers of a resource (identified by a URI) that the resource will be or has been deprecated.",
      "The following example shows that the resource in context was deprecated on Friday, June 30, 2023 at 23:59:59 UTC:",
    ],
    usedByFiles: [
      "client/src/pages/api/build/Versioning.tsx",
    ],
  },
];
