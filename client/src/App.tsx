import { lazy, Suspense, type ReactNode } from "react";
import { Switch, Route } from "wouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PlatformProvider } from "./contexts/PlatformContext";
import { LayoutProvider, useLayout } from "./contexts/LayoutContext";
import { OSProvider } from "./contexts/OSContext";
import Navigation from "./components/Navigation";
import KeyboardNav from "./components/KeyboardNav";
import HelpModal from "./components/HelpModal";
import SettingsPopup from "./components/SettingsPopup";
import AchievementToastContainer from "./components/AchievementToast";
import ChatWidget from "./components/ChatWidget";
import { useAutoHeadingIds } from "./hooks/useAutoHeadingIds";
import { useManualTheme } from "./hooks/useManualTheme";
import { Toaster } from "sonner";

// ── ランディング ──
const Landing = lazy(() => import("./pages/Landing"));
const Announcements = lazy(() => import("./pages/Announcements"));
const PolicyChatQuota = lazy(() => import("./pages/PolicyChatQuota"));
const BugReport = lazy(() => import("./pages/BugReport"));
const DevComponents = lazy(() => import("./pages/DevComponents"));
const DevTestResults = lazy(() => import("./pages/DevTestResults"));
const Training = lazy(() => import("./pages/Training"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ── React マニュアル (77ページ) ──
const ReactHome = lazy(() => import("./pages/react/Home"));
const ReactSetup = lazy(() => import("./pages/react/intro/Setup"));
const HelloReact = lazy(() => import("./pages/react/react-basics/HelloReact"));
const Jsx = lazy(() => import("./pages/react/react-basics/Jsx"));
const Components = lazy(() => import("./pages/react/react-basics/Components"));
const Props = lazy(() => import("./pages/react/react-basics/Props"));
const TypeScriptBasics = lazy(() => import("./pages/react/react-basics/TypeScriptBasics"));
const UseState = lazy(() => import("./pages/react/state-events/UseState"));
const Events = lazy(() => import("./pages/react/state-events/Events"));
const ConditionalList = lazy(() => import("./pages/react/state-events/ConditionalList"));
const Forms = lazy(() => import("./pages/react/state-events/Forms"));
const UseEffect = lazy(() => import("./pages/react/hooks-deep/UseEffect"));
const UseContext = lazy(() => import("./pages/react/hooks-deep/UseContext"));
const UseReducer = lazy(() => import("./pages/react/hooks-deep/UseReducer"));
const MemoCallback = lazy(() => import("./pages/react/hooks-deep/MemoCallback"));
const CustomHooks = lazy(() => import("./pages/react/hooks-deep/CustomHooks"));
const React19Hooks = lazy(() => import("./pages/react/react19/React19Hooks"));
const React19Features = lazy(() => import("./pages/react/react19/React19Features"));
const React19Upgrade = lazy(() => import("./pages/react/react19/React19Upgrade"));
const PlainCss = lazy(() => import("./pages/react/css-basics/PlainCss"));
const CssInJs = lazy(() => import("./pages/react/css-basics/CssInJs"));
const StyledComponents = lazy(() => import("./pages/react/css-basics/StyledComponents"));
const EmotionPage = lazy(() => import("./pages/react/css-basics/EmotionPage"));
const CssPatterns = lazy(() => import("./pages/react/css-basics/CssPatterns"));
const TailwindIntro = lazy(() => import("./pages/react/tailwind/Intro"));
const ResponsiveDark = lazy(() => import("./pages/react/tailwind/ResponsiveDark"));
const Shadcn = lazy(() => import("./pages/react/tailwind/Shadcn"));
const MuiIntro = lazy(() => import("./pages/react/mui/MuiIntro"));
const MuiComponents = lazy(() => import("./pages/react/mui/MuiComponents"));
const MuiCustomization = lazy(() => import("./pages/react/mui/MuiCustomization"));
const Api = lazy(() => import("./pages/react/practice-app/Api"));
const Routing = lazy(() => import("./pages/react/practice-app/Routing"));
const Portfolio = lazy(() => import("./pages/react/practice-app/Portfolio"));
const GraphQL = lazy(() => import("./pages/react/api-design/GraphQL"));
const OpenApiSwagger = lazy(() => import("./pages/react/api-design/OpenApiSwagger"));
const WhatIsNextjs = lazy(() => import("./pages/react/nextjs-basics/WhatIsNextjs"));
const ProjectSetup = lazy(() => import("./pages/react/nextjs-basics/ProjectSetup"));
const NextRouting = lazy(() => import("./pages/react/nextjs-basics/NextRouting"));
const ReactLayout = lazy(() => import("./pages/react/nextjs-basics/Layout"));
const Rsc = lazy(() => import("./pages/react/nextjs-server/Rsc"));
const ClientComponents = lazy(() => import("./pages/react/nextjs-server/ClientComponents"));
const DataFetching = lazy(() => import("./pages/react/nextjs-server/DataFetching"));
const LoadingError = lazy(() => import("./pages/react/nextjs-server/LoadingError"));
const RouteHandlers = lazy(() => import("./pages/react/nextjs-practice/RouteHandlers"));
const ServerActions = lazy(() => import("./pages/react/nextjs-practice/ServerActions"));
const Middleware = lazy(() => import("./pages/react/nextjs-practice/Middleware"));
const Optimization = lazy(() => import("./pages/react/nextjs-practice/Optimization"));
const Next15Features = lazy(() => import("./pages/react/nextjs-advanced/Next15Features"));
const Next15Ppr = lazy(() => import("./pages/react/nextjs-advanced/Next15Ppr"));
const TailwindMui = lazy(() => import("./pages/react/nextjs-css/TailwindMui"));
const CssModulesSc = lazy(() => import("./pages/react/nextjs-css/CssModulesSc"));
const Vercel = lazy(() => import("./pages/react/deploy/Vercel"));
const Summary = lazy(() => import("./pages/react/deploy/Summary"));
const SbIntro = lazy(() => import("./pages/react/storybook/SbIntro"));
const SbSetup = lazy(() => import("./pages/react/storybook/SbSetup"));
const SbStructure = lazy(() => import("./pages/react/storybook/SbStructure"));
const SbCss = lazy(() => import("./pages/react/storybook/SbCss"));
const SbFigma = lazy(() => import("./pages/react/storybook/SbFigma"));
const SbAdvanced = lazy(() => import("./pages/react/storybook/SbAdvanced"));
const ArchOverview = lazy(() => import("./pages/react/architecture/ArchOverview"));
const DesignSystem = lazy(() => import("./pages/react/architecture/DesignSystem"));
const Maintenance = lazy(() => import("./pages/react/architecture/Maintenance"));
const Flexbox = lazy(() => import("./pages/react/css-layout/Flexbox"));
const CssGrid = lazy(() => import("./pages/react/css-layout/CssGrid"));
const DialogPatterns = lazy(() => import("./pages/react/ui-patterns/DialogPatterns"));
const SnackbarPatterns = lazy(() => import("./pages/react/ui-patterns/SnackbarPatterns"));
const FormGroup = lazy(() => import("./pages/react/ui-patterns/FormGroup"));
const SemanticAria = lazy(() => import("./pages/react/accessibility/SemanticAria"));
const TableDesign = lazy(() => import("./pages/react/accessibility/TableDesign"));
const FormA11y = lazy(() => import("./pages/react/accessibility/FormA11y"));
const WebEthics = lazy(() => import("./pages/react/web-quality/WebEthics"));
const WhyDarkMode = lazy(() => import("./pages/react/design-tokens/WhyDarkMode"));
const TokensPractice = lazy(() => import("./pages/react/design-tokens/TokensPractice"));
const DarkModeImpl = lazy(() => import("./pages/react/design-tokens/DarkModeImpl"));
const ComponentDriven = lazy(() => import("./pages/react/cdd-flow/ComponentDriven"));
const DesignCodeSync = lazy(() => import("./pages/react/cdd-flow/DesignCodeSync"));
const DesignQA = lazy(() => import("./pages/react/cdd-flow/DesignQA"));

// ── Git マニュアル (27ページ) ──
const GitHome = lazy(() => import("./pages/git/Home"));
const GitPrerequisites = lazy(() => import("./pages/git/environment/Prerequisites"));
const GitCursor = lazy(() => import("./pages/git/environment/Cursor"));
const GitInstall = lazy(() => import("./pages/git/environment/Git"));
const GitNodejs = lazy(() => import("./pages/git/environment/Nodejs"));
const GitAccount = lazy(() => import("./pages/git/github/Account"));
const GitSetup = lazy(() => import("./pages/git/github/Setup"));
const GitFirstRepo = lazy(() => import("./pages/git/github/FirstRepo"));
const GitMarkdown = lazy(() => import("./pages/git/github/Markdown"));
const GitPromptEng = lazy(() => import("./pages/git/markdown-prompt/PromptEngineering"));
const GitCommit = lazy(() => import("./pages/git/workflow/Commit"));
const GitPushPull = lazy(() => import("./pages/git/workflow/PushPull"));
const GitHistory = lazy(() => import("./pages/git/workflow/History"));
const GitBranch = lazy(() => import("./pages/git/workflow/Branch"));
const GitReactSetup = lazy(() => import("./pages/git/react/Setup"));
const GitReactModify = lazy(() => import("./pages/git/react/Modify"));
const GitWSL2 = lazy(() => import("./pages/git/advanced/WSL2"));
const GitWSL2SSH = lazy(() => import("./pages/git/advanced/WSL2SSH"));
const GitGitHubCLI = lazy(() => import("./pages/git/advanced/GitHubCLI"));
const GitLinuxBasics = lazy(() => import("./pages/git/advanced/LinuxBasics"));
const GitVSCode = lazy(() => import("./pages/git/advanced/VSCode"));
const GitIntegration = lazy(() => import("./pages/git/advanced/Integration"));
const GitAIOverview = lazy(() => import("./pages/git/ai-agent/Overview"));
const GitClaudeSetup = lazy(() => import("./pages/git/ai-agent/ClaudeCodeSetup"));
const GitClaudeBasics = lazy(() => import("./pages/git/ai-agent/ClaudeCodeBasics"));
const GitCursorCline = lazy(() => import("./pages/git/ai-agent/CursorCline"));
const GitSubTools = lazy(() => import("./pages/git/ai-agent/SubTools"));

// ── Three.js マニュアル (23ページ) ──
const ThreejsHome = lazy(() => import("./pages/threejs/Home"));
const ThreejsScene = lazy(() => import("./pages/threejs/basics/scene"));
const ThreejsCamera = lazy(() => import("./pages/threejs/basics/camera"));
const ThreejsRenderer = lazy(() => import("./pages/threejs/basics/renderer"));
const ThreejsGeometry = lazy(() => import("./pages/threejs/basics/geometry"));
const ThreejsMaterial = lazy(() => import("./pages/threejs/basics/material"));
const ThreejsLight = lazy(() => import("./pages/threejs/basics/light"));
const ThreejsAnimation = lazy(() => import("./pages/threejs/basics/animation"));
const ThreejsTextures = lazy(() => import("./pages/threejs/applied/textures"));
const ThreejsModelLoading = lazy(() => import("./pages/threejs/applied/model-loading"));
const ThreejsInteraction = lazy(() => import("./pages/threejs/applied/interaction"));
const ThreejsResponsive = lazy(() => import("./pages/threejs/applied/responsive"));
const ThreejsOrbitControls = lazy(() => import("./pages/threejs/applied/orbit-controls"));
const ThreejsPostProcessing = lazy(() => import("./pages/threejs/applied/post-processing"));
const ThreejsR3fBasics = lazy(() => import("./pages/threejs/practical/r3f-basics"));
const ThreejsR3fDrei = lazy(() => import("./pages/threejs/practical/r3f-drei"));
const ThreejsPortfolioScene = lazy(() => import("./pages/threejs/practical/portfolio-scene"));
const ThreejsGameOverview = lazy(() => import("./pages/threejs/game-dev/overview"));
const ThreejsAircraft = lazy(() => import("./pages/threejs/game-dev/aircraft"));
const ThreejsTerrain = lazy(() => import("./pages/threejs/game-dev/terrain"));
const ThreejsPhysics = lazy(() => import("./pages/threejs/game-dev/physics"));
const ThreejsGameCamera = lazy(() => import("./pages/threejs/game-dev/camera"));
const ThreejsHudGameloop = lazy(() => import("./pages/threejs/game-dev/hud-gameloop"));

// ── Claude+tmux マニュアル (44ページ) ──
// ClaudeMuxHome は /claude-mux が CmWelcome (step 1) に統合されたため削除
const CmWelcome = lazy(() => import("./pages/claude-mux/getting-started/Welcome"));
const CmWhyClaudeCode = lazy(() => import("./pages/claude-mux/getting-started/WhyClaudeCode"));
const CmClaudeCodeIntro = lazy(() => import("./pages/claude-mux/claude-intro/ClaudeCodeIntro"));
const CmInstallSetup = lazy(() => import("./pages/claude-mux/claude-intro/InstallSetup"));
const CmSlashCommands = lazy(() => import("./pages/claude-mux/claude-intro/SlashCommands"));
const CmContextMgmt = lazy(() => import("./pages/claude-mux/claude-core/ContextManagement"));
const CmSecurity = lazy(() => import("./pages/claude-mux/claude-core/SecurityPermissions"));
const CmTokenOpt = lazy(() => import("./pages/claude-mux/claude-core/TokenOptimization"));
const CmExtThinking = lazy(() => import("./pages/claude-mux/claude-core/ExtendedThinking"));
const CmMCPSetup = lazy(() => import("./pages/claude-mux/mcp/MCPSetup"));
const CmMCPPractical = lazy(() => import("./pages/claude-mux/mcp/MCPPractical"));
const CmSubagents = lazy(() => import("./pages/claude-mux/agent-extensions/Subagents"));
const CmCustomSkills = lazy(() => import("./pages/claude-mux/agent-extensions/CustomSkills"));
const CmWhyTmux = lazy(() => import("./pages/claude-mux/tmux-intro/WhyTmux"));
const CmItermVsTmux = lazy(() => import("./pages/claude-mux/tmux-intro/ItermVsTmux"));
const CmTmuxPrereq = lazy(() => import("./pages/claude-mux/tmux-intro/Prerequisites"));
const CmInstallTmux = lazy(() => import("./pages/claude-mux/tmux-setup/InstallTmux"));
const CmVerifyInstall = lazy(() => import("./pages/claude-mux/tmux-setup/VerifyInstall"));
const CmCoreConcepts = lazy(() => import("./pages/claude-mux/tmux-basics/CoreConcepts"));
const CmFirstSession = lazy(() => import("./pages/claude-mux/tmux-basics/FirstSession"));
const CmPrefixKey = lazy(() => import("./pages/claude-mux/tmux-basics/PrefixKey"));
const CmWindowsPanes = lazy(() => import("./pages/claude-mux/tmux-basics/WindowsPanes"));
const CmTmuxConfig = lazy(() => import("./pages/claude-mux/tmux-customize/TmuxConfig"));
const CmProdConfig = lazy(() => import("./pages/claude-mux/tmux-customize/ProductivityConfig"));
const CmPlugins = lazy(() => import("./pages/claude-mux/tmux-customize/Plugins"));
const CmTmuxIntegration = lazy(() => import("./pages/claude-mux/integration/TmuxIntegration"));
const CmTmuxpAutomation = lazy(() => import("./pages/claude-mux/integration/TmuxpAutomation"));
const CmPracticalWorkflow = lazy(() => import("./pages/claude-mux/integration/PracticalWorkflow"));
const CmContextEngineering = lazy(() => import("./pages/claude-mux/claude-core/ContextEngineering"));
const CmHarnessEngineering = lazy(() => import("./pages/claude-mux/best-practices/HarnessEngineering"));
const CmDesignMd = lazy(() => import("./pages/claude-mux/multi-ai-architecture/DesignMd"));
const CmCmuxIntro = lazy(() => import("./pages/claude-mux/cmux/CmuxIntro"));
const CmCmuxSetup = lazy(() => import("./pages/claude-mux/cmux/CmuxSetup"));
const CmCmuxAgentTeams = lazy(() => import("./pages/claude-mux/cmux/CmuxAgentTeams"));
const CmCmuxBrowserAPI = lazy(() => import("./pages/claude-mux/cmux/CmuxBrowserAPI"));
const CmCmuxWorktrees = lazy(() => import("./pages/claude-mux/cmux/CmuxWorktrees"));
const CmSessionMgmt = lazy(() => import("./pages/claude-mux/reference/SessionManagement"));
const CmTroubleshooting = lazy(() => import("./pages/claude-mux/reference/Troubleshooting"));
const CmClaudeCheatsheet = lazy(() => import("./pages/claude-mux/reference/ClaudeCheatsheet"));
const CmTmuxCheatsheet = lazy(() => import("./pages/claude-mux/reference/TmuxCheatsheet"));
const CmEffectiveWorkflows = lazy(() => import("./pages/claude-mux/best-practices/EffectiveWorkflows"));
const CmSpecDrivenDev = lazy(() => import("./pages/claude-mux/best-practices/SpecDrivenDev"));
const CmTestingDebugging = lazy(() => import("./pages/claude-mux/best-practices/TestingDebugging"));
const CmHooksGuide = lazy(() => import("./pages/claude-mux/hooks-advanced/HooksGuide"));
const CmHooksRecipes = lazy(() => import("./pages/claude-mux/hooks-advanced/HooksRecipes"));
const CmGitHubActions = lazy(() => import("./pages/claude-mux/cicd-headless/GitHubActions"));
const CmHeadlessMode = lazy(() => import("./pages/claude-mux/cicd-headless/HeadlessMode"));
const CmIdeIntegration = lazy(() => import("./pages/claude-mux/ide-agent-teams/IdeIntegration"));
const CmAgentOrch = lazy(() => import("./pages/claude-mux/ide-agent-teams/AgentOrchestration"));
const CmPluginsEco = lazy(() => import("./pages/claude-mux/ide-agent-teams/PluginsEcosystem"));
const CmMultiAI = lazy(() => import("./pages/claude-mux/multi-ai-architecture/MultiAICoexistence"));
const CmSingleSource = lazy(() => import("./pages/claude-mux/multi-ai-architecture/SingleSourceOfTruth"));

// ── AI / Python / 機械学習マニュアル (10ページ) ──
const AiMlHome = lazy(() => import("./pages/ai-ml/Home"));
const AiLandscape = lazy(() => import("./pages/ai-ml/ai-overview/Landscape"));
const AiMlConcepts = lazy(() => import("./pages/ai-ml/ai-overview/MlConcepts"));
const AiPythonSetup = lazy(() => import("./pages/ai-ml/python-ml/PythonSetup"));
const AiPythonBasics = lazy(() => import("./pages/ai-ml/python-ml/PythonBasics"));
const AiDataLibraries = lazy(() => import("./pages/ai-ml/python-ml/DataLibraries"));
const AiPythonPractice = lazy(() => import("./pages/ai-ml/python-ml/PythonPractice"));
const AiSupervised = lazy(() => import("./pages/ai-ml/ml-fundamentals/Supervised"));
const AiDeepLearning = lazy(() => import("./pages/ai-ml/ml-fundamentals/DeepLearning"));
const AiLlmBasics = lazy(() => import("./pages/ai-ml/lmops/LlmBasics"));
const AiLmopsWorkflow = lazy(() => import("./pages/ai-ml/lmops/LmopsWorkflow"));

// ── UX デザインマニュアル (12ページ) ──
const UxHome = lazy(() => import("./pages/ux-design/Home"));
const UxWhatIsUx = lazy(() => import("./pages/ux-design/ux-foundations/WhatIsUx"));
const UxDesignProcess = lazy(() => import("./pages/ux-design/ux-foundations/DesignProcess"));
const UxDesignThinking = lazy(() => import("./pages/ux-design/ux-foundations/DesignThinking"));
const UxUserResearch = lazy(() => import("./pages/ux-design/research/UserResearch"));
const UxPersonaJourney = lazy(() => import("./pages/ux-design/research/PersonaJourney"));
const UxIA = lazy(() => import("./pages/ux-design/ia-wireframe/InformationArchitecture"));
const UxWireframe = lazy(() => import("./pages/ux-design/ia-wireframe/Wireframe"));
const UxVisualDesign = lazy(() => import("./pages/ux-design/ui-design/VisualDesign"));
const UxDesignSystem = lazy(() => import("./pages/ux-design/ui-design/DesignSystem"));
const UxFigmaPrototype = lazy(() => import("./pages/ux-design/prototyping/FigmaPrototype"));
const UxUsabilityTesting = lazy(() => import("./pages/ux-design/evaluation/UsabilityTesting"));

// ── API 設計マニュアル (24ページ) ──
const ApiHome = lazy(() => import("./pages/api/Home"));
const ApiQuickstart = lazy(() => import("./pages/api/Quickstart"));
const ApiWhatIs = lazy(() => import("./pages/api/basics/WhatIsApi"));
const ApiHttp = lazy(() => import("./pages/api/basics/Http"));
const ApiRest = lazy(() => import("./pages/api/basics/Rest"));
const ApiResources = lazy(() => import("./pages/api/basics/Resources"));
const ApiErDiagram = lazy(() => import("./pages/api/data-modeling/ErDiagram"));
const ApiNormalization = lazy(() => import("./pages/api/data-modeling/Normalization"));
const ApiDesignFlow = lazy(() => import("./pages/api/data-modeling/DesignFlow"));
const ApiWorkedExample = lazy(() => import("./pages/api/data-modeling/WorkedExample"));

// ── Vue / Nuxt マニュアル (22ページ) ──
const VueHome = lazy(() => import("./pages/vue/Home"));
const VueSetup = lazy(() => import("./pages/vue/basics/Setup"));
const VueTemplateSyntax = lazy(() => import("./pages/vue/basics/TemplateSyntax"));
const VueReactivity = lazy(() => import("./pages/vue/basics/Reactivity"));
const VueComponents = lazy(() => import("./pages/vue/basics/Components"));
const VuePropsEmits = lazy(() => import("./pages/vue/basics/PropsEmits"));
const VueScriptSetup = lazy(() => import("./pages/vue/composition/ScriptSetup"));
const VueComputedWatch = lazy(() => import("./pages/vue/composition/ComputedWatch"));
const VueLifecycle = lazy(() => import("./pages/vue/composition/Lifecycle"));
const VueComposables = lazy(() => import("./pages/vue/composition/Composables"));
const VueProvideInject = lazy(() => import("./pages/vue/composition/ProvideInject"));
const VueRouter = lazy(() => import("./pages/vue/state-routing/Router"));
const VuePinia = lazy(() => import("./pages/vue/state-routing/Pinia"));
const VueSfcStyling = lazy(() => import("./pages/vue/styling/SfcStyling"));
const VueWhatIsNuxt = lazy(() => import("./pages/vue/nuxt-basics/WhatIsNuxt"));
const VueRoutingLayouts = lazy(() => import("./pages/vue/nuxt-basics/RoutingLayouts"));
const VueDataFetching = lazy(() => import("./pages/vue/nuxt-basics/DataFetching"));
const VueServerApi = lazy(() => import("./pages/vue/nuxt-server/ServerApi"));
const VueRenderingModes = lazy(() => import("./pages/vue/nuxt-server/RenderingModes"));
const VueMiddlewarePlugins = lazy(() => import("./pages/vue/nuxt-server/MiddlewarePlugins"));
const VueDeploy = lazy(() => import("./pages/vue/nuxt-server/Deploy"));
const VueLatestFeatures = lazy(() => import("./pages/vue/advanced/LatestFeatures"));

// === バックエンド / インフラ / DevOps マニュアル ===
const InfraHome = lazy(() => import("./pages/infra/Home"));
const InfraLandscape = lazy(() => import("./pages/infra/foundations/Landscape"));
const InfraComputeModels = lazy(() => import("./pages/infra/foundations/ComputeModels"));
const InfraChoosing = lazy(() => import("./pages/infra/foundations/Choosing"));
const InfraVercel = lazy(() => import("./pages/infra/hosting/Vercel"));
const InfraNetlify = lazy(() => import("./pages/infra/hosting/Netlify"));
const InfraCloudflarePages = lazy(() => import("./pages/infra/hosting/CloudflarePages"));
const InfraHostingComparison = lazy(() => import("./pages/infra/hosting/Comparison"));
const InfraCdnBasics = lazy(() => import("./pages/infra/edge/CdnBasics"));
const InfraCloudflare = lazy(() => import("./pages/infra/edge/Cloudflare"));
const InfraEdgeFunctions = lazy(() => import("./pages/infra/edge/EdgeFunctions"));
const InfraWhatIsBaas = lazy(() => import("./pages/infra/baas/WhatIsBaas"));
const InfraSupabase = lazy(() => import("./pages/infra/baas/Supabase"));
const InfraFirebase = lazy(() => import("./pages/infra/baas/Firebase"));
const InfraBaasComparison = lazy(() => import("./pages/infra/baas/Comparison"));
const InfraRelational = lazy(() => import("./pages/infra/database/Relational"));
const InfraServerlessDb = lazy(() => import("./pages/infra/database/ServerlessDb"));
const InfraOrm = lazy(() => import("./pages/infra/database/Orm"));
const InfraBeyondRelational = lazy(() => import("./pages/infra/database/BeyondRelational"));
const InfraWhatIsBff = lazy(() => import("./pages/infra/bff/WhatIsBff"));
const InfraAuth = lazy(() => import("./pages/infra/bff/Auth"));
const InfraApiGateway = lazy(() => import("./pages/infra/bff/ApiGateway"));
const InfraCicd = lazy(() => import("./pages/infra/devops/Cicd"));
const InfraIac = lazy(() => import("./pages/infra/devops/Iac"));
const InfraContainers = lazy(() => import("./pages/infra/devops/Containers"));
const InfraMonitoring = lazy(() => import("./pages/infra/observability/Monitoring"));
const InfraSre = lazy(() => import("./pages/infra/observability/Sre"));
const InfraAwsOverview = lazy(() => import("./pages/infra/aws/Overview"));
const InfraAwsIam = lazy(() => import("./pages/infra/aws/IamAccount"));
const InfraAwsNetwork = lazy(() => import("./pages/infra/aws/NetworkVpc"));
const InfraAwsCompute = lazy(() => import("./pages/infra/aws/Compute"));
const InfraAwsStorage = lazy(() => import("./pages/infra/aws/StorageCdn"));
const InfraAwsDatabase = lazy(() => import("./pages/infra/aws/Database"));
const InfraAwsCostOps = lazy(() => import("./pages/infra/aws/CostOps"));

// === 開発フロー / チーム / DesignOps マニュアル ===
const FlowHome = lazy(() => import("./pages/devflow/Home"));
const FlowWhatIsAgile = lazy(() => import("./pages/devflow/agile/WhatIsAgile"));
const FlowScrum = lazy(() => import("./pages/devflow/agile/Scrum"));
const FlowSprint = lazy(() => import("./pages/devflow/agile/Sprint"));
const FlowKanban = lazy(() => import("./pages/devflow/agile/Kanban"));
const FlowBacklog = lazy(() => import("./pages/devflow/pm/Backlog"));
const FlowEstimation = lazy(() => import("./pages/devflow/pm/Estimation"));
const FlowRoadmap = lazy(() => import("./pages/devflow/pm/Roadmap"));
const FlowCulture = lazy(() => import("./pages/devflow/devops/Culture"));
const FlowDora = lazy(() => import("./pages/devflow/devops/Dora"));
const FlowBranching = lazy(() => import("./pages/devflow/devops/Branching"));
const FlowWhyReview = lazy(() => import("./pages/devflow/review/WhyReview"));
const FlowPullRequest = lazy(() => import("./pages/devflow/review/PullRequest"));
const FlowPerspectives = lazy(() => import("./pages/devflow/review/Perspectives"));
const FlowReviewCulture = lazy(() => import("./pages/devflow/review/Culture"));
const FlowWhatIsDesignOps = lazy(() => import("./pages/devflow/designops/WhatIsDesignOps"));
const FlowDesignReview = lazy(() => import("./pages/devflow/designops/DesignReview"));
const FlowHandoff = lazy(() => import("./pages/devflow/designops/Handoff"));
const FlowDocumentation = lazy(() => import("./pages/devflow/team/Documentation"));
const FlowRetrospective = lazy(() => import("./pages/devflow/team/Retrospective"));
const FlowIncident = lazy(() => import("./pages/devflow/team/Incident"));
const ApiHttpMethods = lazy(() => import("./pages/api/rest-design/HttpMethods"));
const ApiStatusCodes = lazy(() => import("./pages/api/rest-design/StatusCodes"));
const ApiReqRes = lazy(() => import("./pages/api/rest-design/RequestResponse"));
const ApiPagination = lazy(() => import("./pages/api/rest-design/Pagination"));
const ApiErrors = lazy(() => import("./pages/api/rest-design/ErrorHandling"));
const ApiCaching = lazy(() => import("./pages/api/rest-design/Caching"));
const ApiIdempotency = lazy(() => import("./pages/api/rest-design/Idempotency"));
const ApiRateLimiting = lazy(() => import("./pages/api/build/RateLimiting"));
const ApiWebhooks = lazy(() => import("./pages/api/build/Webhooks"));
const ApiObservability = lazy(() => import("./pages/api/quality/Observability"));
const ApiDebugTools = lazy(() => import("./pages/api/quality/DebuggingTools"));
const ApiBackendFrontend = lazy(() => import("./pages/api/collaboration/BackendFrontend"));
const ApiDesignAndApi = lazy(() => import("./pages/api/collaboration/DesignAndApi"));
const ApiPracticeReact = lazy(() => import("./pages/api/practice/ReactApi"));
const ApiPracticeNext = lazy(() => import("./pages/api/practice/NextApi"));
const ApiPracticeVue = lazy(() => import("./pages/api/practice/VueApi"));
const ApiPracticeNuxt = lazy(() => import("./pages/api/practice/NuxtApi"));
const ApiWhatIsOpenApi = lazy(() => import("./pages/api/openapi/WhatIsOpenApi"));
const ApiDocStructure = lazy(() => import("./pages/api/openapi/DocumentStructure"));
const ApiSchemaComponents = lazy(() => import("./pages/api/openapi/SchemaComponents"));
const ApiSwaggerUi = lazy(() => import("./pages/api/openapi/SwaggerUi"));
const ApiSchemaFirst = lazy(() => import("./pages/api/openapi/SchemaFirst"));
const ApiMockServer = lazy(() => import("./pages/api/build/MockServer"));
const ApiValidation = lazy(() => import("./pages/api/build/Validation"));
const ApiAuth = lazy(() => import("./pages/api/build/Auth"));
const ApiVersioning = lazy(() => import("./pages/api/build/Versioning"));
const ApiContractTesting = lazy(() => import("./pages/api/quality/ContractTesting"));
const ApiLinting = lazy(() => import("./pages/api/quality/Linting"));
const ApiSecurity = lazy(() => import("./pages/api/quality/Security"));
const ApiBeyondRest = lazy(() => import("./pages/api/advanced/BeyondRest"));
const ApiSummary = lazy(() => import("./pages/api/advanced/Summary"));

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function MainContent({ children }: { children: ReactNode }) {
  const { layoutMode } = useLayout();
  useAutoHeadingIds();
  useManualTheme();
  return (
    <main className={`flex-1 md:ml-64 w-full ${layoutMode === 'wide' ? 'layout-wide' : ''}`}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PlatformProvider>
        <OSProvider>
          <LayoutProvider>
          <div className="flex min-h-screen bg-background text-foreground font-sans">
            <Navigation />
            <KeyboardNav />
            <MainContent>
              <Switch>
                {/* ランディング */}
                <Route path="/" component={Landing} />
                <Route path="/announcements" component={Announcements} />
                <Route path="/policy/chat-quota" component={PolicyChatQuota} />
                <Route path="/bug-report" component={BugReport} />
                {import.meta.env.DEV && <Route path="/dev/components" component={DevComponents} />}
                {import.meta.env.DEV && <Route path="/dev/test-results" component={DevTestResults} />}
                <Route path="/training" component={Training} />

                {/* === React マニュアル === */}
                <Route path="/react" component={ReactHome} />
                <Route path="/react/intro/setup" component={ReactSetup} />
                <Route path="/react/react-basics/hello-react" component={HelloReact} />
                <Route path="/react/react-basics/jsx" component={Jsx} />
                <Route path="/react/react-basics/components" component={Components} />
                <Route path="/react/react-basics/props" component={Props} />
                <Route path="/react/react-basics/typescript" component={TypeScriptBasics} />
                <Route path="/react/state-events/use-state" component={UseState} />
                <Route path="/react/state-events/events" component={Events} />
                <Route path="/react/state-events/conditional-list" component={ConditionalList} />
                <Route path="/react/state-events/forms" component={Forms} />
                <Route path="/react/hooks-deep/use-effect" component={UseEffect} />
                <Route path="/react/hooks-deep/use-context" component={UseContext} />
                <Route path="/react/hooks-deep/use-reducer" component={UseReducer} />
                <Route path="/react/hooks-deep/memo-callback" component={MemoCallback} />
                <Route path="/react/hooks-deep/custom-hooks" component={CustomHooks} />
                <Route path="/react/react19/hooks" component={React19Hooks} />
                <Route path="/react/react19/features" component={React19Features} />
                <Route path="/react/react19/upgrade" component={React19Upgrade} />
                <Route path="/react/css-basics/plain-css" component={PlainCss} />
                <Route path="/react/css-basics/css-in-js" component={CssInJs} />
                <Route path="/react/css-basics/styled-components" component={StyledComponents} />
                <Route path="/react/css-basics/emotion" component={EmotionPage} />
                <Route path="/react/css-basics/css-patterns" component={CssPatterns} />
                <Route path="/react/tailwind/intro" component={TailwindIntro} />
                <Route path="/react/tailwind/responsive-dark" component={ResponsiveDark} />
                <Route path="/react/tailwind/shadcn" component={Shadcn} />
                <Route path="/react/mui/intro" component={MuiIntro} />
                <Route path="/react/mui/components" component={MuiComponents} />
                <Route path="/react/mui/customization" component={MuiCustomization} />
                <Route path="/react/practice-app/api" component={Api} />
                <Route path="/react/practice-app/routing" component={Routing} />
                <Route path="/react/practice-app/portfolio" component={Portfolio} />
                <Route path="/react/api-design/graphql" component={GraphQL} />
                <Route path="/react/api-design/openapi-swagger" component={OpenApiSwagger} />
                <Route path="/react/nextjs-basics/what-is-nextjs" component={WhatIsNextjs} />
                <Route path="/react/nextjs-basics/project-setup" component={ProjectSetup} />
                <Route path="/react/nextjs-basics/routing" component={NextRouting} />
                <Route path="/react/nextjs-basics/layout" component={ReactLayout} />
                <Route path="/react/nextjs-server/rsc" component={Rsc} />
                <Route path="/react/nextjs-server/client" component={ClientComponents} />
                <Route path="/react/nextjs-server/data-fetching" component={DataFetching} />
                <Route path="/react/nextjs-server/loading-error" component={LoadingError} />
                <Route path="/react/nextjs-practice/route-handlers" component={RouteHandlers} />
                <Route path="/react/nextjs-practice/server-actions" component={ServerActions} />
                <Route path="/react/nextjs-practice/middleware" component={Middleware} />
                <Route path="/react/nextjs-practice/optimization" component={Optimization} />
                <Route path="/react/nextjs-advanced/next15-features" component={Next15Features} />
                <Route path="/react/nextjs-advanced/next15-ppr" component={Next15Ppr} />
                <Route path="/react/nextjs-css/tailwind-mui" component={TailwindMui} />
                <Route path="/react/nextjs-css/css-modules-sc" component={CssModulesSc} />
                <Route path="/react/deploy/vercel" component={Vercel} />
                <Route path="/react/deploy/summary" component={Summary} />
                <Route path="/react/storybook/intro" component={SbIntro} />
                <Route path="/react/storybook/setup" component={SbSetup} />
                <Route path="/react/storybook/structure" component={SbStructure} />
                <Route path="/react/storybook/css" component={SbCss} />
                <Route path="/react/storybook/figma" component={SbFigma} />
                <Route path="/react/storybook/advanced" component={SbAdvanced} />
                <Route path="/react/architecture/overview" component={ArchOverview} />
                <Route path="/react/architecture/design-system" component={DesignSystem} />
                <Route path="/react/architecture/maintenance" component={Maintenance} />
                <Route path="/react/css-layout/flexbox" component={Flexbox} />
                <Route path="/react/css-layout/grid" component={CssGrid} />
                <Route path="/react/ui-patterns/dialog" component={DialogPatterns} />
                <Route path="/react/ui-patterns/snackbar" component={SnackbarPatterns} />
                <Route path="/react/ui-patterns/form-group" component={FormGroup} />
                <Route path="/react/accessibility/semantic-aria" component={SemanticAria} />
                <Route path="/react/accessibility/table-design" component={TableDesign} />
                <Route path="/react/accessibility/form-a11y" component={FormA11y} />
                <Route path="/react/web-quality/ethics" component={WebEthics} />
                <Route path="/react/design-tokens/why-dark-mode" component={WhyDarkMode} />
                <Route path="/react/design-tokens/tokens-practice" component={TokensPractice} />
                <Route path="/react/design-tokens/dark-mode-impl" component={DarkModeImpl} />
                <Route path="/react/cdd-flow/component-driven" component={ComponentDriven} />
                <Route path="/react/cdd-flow/design-code-sync" component={DesignCodeSync} />
                <Route path="/react/cdd-flow/design-qa" component={DesignQA} />

                {/* === Git マニュアル === */}
                <Route path="/git" component={GitHome} />
                <Route path="/git/environment/prerequisites" component={GitPrerequisites} />
                <Route path="/git/environment/cursor" component={GitCursor} />
                <Route path="/git/environment/git" component={GitInstall} />
                <Route path="/git/environment/nodejs" component={GitNodejs} />
                <Route path="/git/github/account" component={GitAccount} />
                <Route path="/git/github/setup" component={GitSetup} />
                <Route path="/git/github/first-repo" component={GitFirstRepo} />
                <Route path="/git/github/markdown" component={GitMarkdown} />
                <Route path="/git/markdown-prompt/prompt-engineering" component={GitPromptEng} />
                <Route path="/git/workflow/commit" component={GitCommit} />
                <Route path="/git/workflow/push-pull" component={GitPushPull} />
                <Route path="/git/workflow/history" component={GitHistory} />
                <Route path="/git/workflow/branch" component={GitBranch} />
                <Route path="/git/react/setup" component={GitReactSetup} />
                <Route path="/git/react/modify" component={GitReactModify} />
                <Route path="/git/advanced/wsl2" component={GitWSL2} />
                <Route path="/git/advanced/wsl2-ssh" component={GitWSL2SSH} />
                <Route path="/git/advanced/github-cli" component={GitGitHubCLI} />
                <Route path="/git/advanced/linux-basics" component={GitLinuxBasics} />
                <Route path="/git/advanced/vscode" component={GitVSCode} />
                <Route path="/git/advanced/integration" component={GitIntegration} />
                <Route path="/git/ai-agent/overview" component={GitAIOverview} />
                <Route path="/git/ai-agent/claude-code-setup" component={GitClaudeSetup} />
                <Route path="/git/ai-agent/claude-code-basics" component={GitClaudeBasics} />
                <Route path="/git/ai-agent/cursor-cline" component={GitCursorCline} />
                <Route path="/git/ai-agent/sub-tools" component={GitSubTools} />

                {/* === Three.js マニュアル === */}
                <Route path="/threejs" component={ThreejsHome} />
                <Route path="/threejs/basics/scene" component={ThreejsScene} />
                <Route path="/threejs/basics/camera" component={ThreejsCamera} />
                <Route path="/threejs/basics/renderer" component={ThreejsRenderer} />
                <Route path="/threejs/basics/geometry" component={ThreejsGeometry} />
                <Route path="/threejs/basics/material" component={ThreejsMaterial} />
                <Route path="/threejs/basics/light" component={ThreejsLight} />
                <Route path="/threejs/basics/animation" component={ThreejsAnimation} />
                <Route path="/threejs/applied/textures" component={ThreejsTextures} />
                <Route path="/threejs/applied/model-loading" component={ThreejsModelLoading} />
                <Route path="/threejs/applied/interaction" component={ThreejsInteraction} />
                <Route path="/threejs/applied/responsive" component={ThreejsResponsive} />
                <Route path="/threejs/applied/orbit-controls" component={ThreejsOrbitControls} />
                <Route path="/threejs/applied/post-processing" component={ThreejsPostProcessing} />
                <Route path="/threejs/practical/r3f-basics" component={ThreejsR3fBasics} />
                <Route path="/threejs/practical/r3f-drei" component={ThreejsR3fDrei} />
                <Route path="/threejs/practical/portfolio-scene" component={ThreejsPortfolioScene} />
                <Route path="/threejs/game-dev/overview" component={ThreejsGameOverview} />
                <Route path="/threejs/game-dev/aircraft" component={ThreejsAircraft} />
                <Route path="/threejs/game-dev/terrain" component={ThreejsTerrain} />
                <Route path="/threejs/game-dev/physics" component={ThreejsPhysics} />
                <Route path="/threejs/game-dev/camera" component={ThreejsGameCamera} />
                <Route path="/threejs/game-dev/hud-gameloop" component={ThreejsHudGameloop} />

                {/* === Claude+tmux マニュアル === */}
                <Route path="/claude-mux" component={CmWelcome} />
                <Route path="/claude-mux/getting-started/why-claude-code" component={CmWhyClaudeCode} />
                <Route path="/claude-mux/claude-intro/claude-code-intro" component={CmClaudeCodeIntro} />
                <Route path="/claude-mux/claude-intro/install-setup" component={CmInstallSetup} />
                <Route path="/claude-mux/claude-intro/slash-commands" component={CmSlashCommands} />
                <Route path="/claude-mux/claude-core/context-management" component={CmContextMgmt} />
                <Route path="/claude-mux/claude-core/security-permissions" component={CmSecurity} />
                <Route path="/claude-mux/claude-core/token-optimization" component={CmTokenOpt} />
                <Route path="/claude-mux/claude-core/extended-thinking" component={CmExtThinking} />
                <Route path="/claude-mux/mcp/mcp-setup" component={CmMCPSetup} />
                <Route path="/claude-mux/mcp/mcp-practical" component={CmMCPPractical} />
                <Route path="/claude-mux/agent-extensions/subagents" component={CmSubagents} />
                <Route path="/claude-mux/agent-extensions/custom-skills" component={CmCustomSkills} />
                <Route path="/claude-mux/tmux-intro/why-tmux" component={CmWhyTmux} />
                <Route path="/claude-mux/tmux-intro/iterm-vs-tmux" component={CmItermVsTmux} />
                <Route path="/claude-mux/tmux-intro/prerequisites" component={CmTmuxPrereq} />
                <Route path="/claude-mux/tmux-setup/install-tmux" component={CmInstallTmux} />
                <Route path="/claude-mux/tmux-setup/verify-install" component={CmVerifyInstall} />
                <Route path="/claude-mux/tmux-basics/core-concepts" component={CmCoreConcepts} />
                <Route path="/claude-mux/tmux-basics/first-session" component={CmFirstSession} />
                <Route path="/claude-mux/tmux-basics/prefix-key" component={CmPrefixKey} />
                <Route path="/claude-mux/tmux-basics/windows-panes" component={CmWindowsPanes} />
                <Route path="/claude-mux/tmux-customize/tmux-config" component={CmTmuxConfig} />
                <Route path="/claude-mux/tmux-customize/productivity-config" component={CmProdConfig} />
                <Route path="/claude-mux/tmux-customize/plugins" component={CmPlugins} />
                <Route path="/claude-mux/integration/tmux-integration" component={CmTmuxIntegration} />
                <Route path="/claude-mux/integration/tmuxp-automation" component={CmTmuxpAutomation} />
                <Route path="/claude-mux/integration/practical-workflow" component={CmPracticalWorkflow} />
                <Route path="/claude-mux/claude-core/context-engineering" component={CmContextEngineering} />
                <Route path="/claude-mux/best-practices/harness-engineering" component={CmHarnessEngineering} />
                <Route path="/claude-mux/multi-ai/design-md" component={CmDesignMd} />
                <Route path="/claude-mux/cmux/cmux-intro" component={CmCmuxIntro} />
                <Route path="/claude-mux/cmux/cmux-setup" component={CmCmuxSetup} />
                <Route path="/claude-mux/cmux/agent-teams" component={CmCmuxAgentTeams} />
                <Route path="/claude-mux/cmux/browser-api" component={CmCmuxBrowserAPI} />
                <Route path="/claude-mux/cmux/worktrees" component={CmCmuxWorktrees} />
                <Route path="/claude-mux/reference/session-management" component={CmSessionMgmt} />
                <Route path="/claude-mux/reference/troubleshooting" component={CmTroubleshooting} />
                <Route path="/claude-mux/reference/claude-cheatsheet" component={CmClaudeCheatsheet} />
                <Route path="/claude-mux/reference/tmux-cheatsheet" component={CmTmuxCheatsheet} />
                <Route path="/claude-mux/best-practices/effective-workflows" component={CmEffectiveWorkflows} />
                <Route path="/claude-mux/best-practices/spec-driven-dev" component={CmSpecDrivenDev} />
                <Route path="/claude-mux/best-practices/testing-debugging" component={CmTestingDebugging} />
                <Route path="/claude-mux/hooks-advanced/hooks-guide" component={CmHooksGuide} />
                <Route path="/claude-mux/hooks-advanced/hooks-recipes" component={CmHooksRecipes} />
                <Route path="/claude-mux/ci-cd/github-actions" component={CmGitHubActions} />
                <Route path="/claude-mux/ci-cd/headless-mode" component={CmHeadlessMode} />
                <Route path="/claude-mux/ide-agent-teams/ide-integration" component={CmIdeIntegration} />
                <Route path="/claude-mux/ide-agent-teams/agent-orchestration" component={CmAgentOrch} />
                <Route path="/claude-mux/ide-agent-teams/plugins-ecosystem" component={CmPluginsEco} />
                <Route path="/claude-mux/multi-ai/multi-ai-coexistence" component={CmMultiAI} />
                <Route path="/claude-mux/multi-ai/single-source-of-truth" component={CmSingleSource} />

                {/* === AI / Python / 機械学習マニュアル === */}
                <Route path="/ai-ml" component={AiMlHome} />
                <Route path="/ai-ml/ai-overview/landscape" component={AiLandscape} />
                <Route path="/ai-ml/ai-overview/ml-concepts" component={AiMlConcepts} />
                <Route path="/ai-ml/python-ml/python-setup" component={AiPythonSetup} />
                <Route path="/ai-ml/python-ml/python-basics" component={AiPythonBasics} />
                <Route path="/ai-ml/python-ml/data-libraries" component={AiDataLibraries} />
                <Route path="/ai-ml/python-ml/python-practice" component={AiPythonPractice} />
                <Route path="/ai-ml/ml-fundamentals/supervised" component={AiSupervised} />
                <Route path="/ai-ml/ml-fundamentals/deep-learning" component={AiDeepLearning} />
                <Route path="/ai-ml/lmops/llm-basics" component={AiLlmBasics} />
                <Route path="/ai-ml/lmops/lmops-workflow" component={AiLmopsWorkflow} />

                {/* === UX デザインマニュアル === */}
                <Route path="/ux-design" component={UxHome} />
                <Route path="/ux-design/ux-foundations/what-is-ux" component={UxWhatIsUx} />
                <Route path="/ux-design/ux-foundations/design-process" component={UxDesignProcess} />
                <Route path="/ux-design/ux-foundations/design-thinking" component={UxDesignThinking} />
                <Route path="/ux-design/research/user-research" component={UxUserResearch} />
                <Route path="/ux-design/research/persona-journey" component={UxPersonaJourney} />
                <Route path="/ux-design/ia-wireframe/information-architecture" component={UxIA} />
                <Route path="/ux-design/ia-wireframe/wireframe" component={UxWireframe} />
                <Route path="/ux-design/ui-design/visual-design" component={UxVisualDesign} />
                <Route path="/ux-design/ui-design/design-system" component={UxDesignSystem} />
                <Route path="/ux-design/prototyping/figma-prototype" component={UxFigmaPrototype} />
                <Route path="/ux-design/evaluation/usability-testing" component={UxUsabilityTesting} />

                {/* === API 設計マニュアル === */}
                <Route path="/api" component={ApiHome} />
                <Route path="/api/quickstart" component={ApiQuickstart} />
                <Route path="/api/basics/what-is-api" component={ApiWhatIs} />
                <Route path="/api/basics/http" component={ApiHttp} />
                <Route path="/api/basics/rest" component={ApiRest} />
                <Route path="/api/basics/resources" component={ApiResources} />
                <Route path="/api/data-modeling/er-diagram" component={ApiErDiagram} />
                <Route path="/api/data-modeling/normalization" component={ApiNormalization} />
                <Route path="/api/data-modeling/design-flow" component={ApiDesignFlow} />
                <Route path="/api/data-modeling/worked-example" component={ApiWorkedExample} />
                <Route path="/api/rest-design/http-methods" component={ApiHttpMethods} />
                <Route path="/api/rest-design/status-codes" component={ApiStatusCodes} />
                <Route path="/api/rest-design/request-response" component={ApiReqRes} />
                <Route path="/api/rest-design/pagination" component={ApiPagination} />
                <Route path="/api/rest-design/error-handling" component={ApiErrors} />
                <Route path="/api/rest-design/caching" component={ApiCaching} />
                <Route path="/api/rest-design/idempotency" component={ApiIdempotency} />
                <Route path="/api/openapi/what-is-openapi" component={ApiWhatIsOpenApi} />
                <Route path="/api/openapi/document-structure" component={ApiDocStructure} />
                <Route path="/api/openapi/schema-components" component={ApiSchemaComponents} />
                <Route path="/api/openapi/swagger-ui" component={ApiSwaggerUi} />
                <Route path="/api/openapi/schema-first" component={ApiSchemaFirst} />
                <Route path="/api/build/mock-server" component={ApiMockServer} />
                <Route path="/api/build/validation" component={ApiValidation} />
                <Route path="/api/build/auth" component={ApiAuth} />
                <Route path="/api/build/rate-limiting" component={ApiRateLimiting} />
                <Route path="/api/build/webhooks" component={ApiWebhooks} />
                <Route path="/api/build/versioning" component={ApiVersioning} />
                <Route path="/api/quality/contract-testing" component={ApiContractTesting} />
                <Route path="/api/quality/linting" component={ApiLinting} />
                <Route path="/api/quality/security" component={ApiSecurity} />
                <Route path="/api/quality/observability" component={ApiObservability} />
                <Route path="/api/quality/debugging-tools" component={ApiDebugTools} />
                <Route path="/api/collaboration/backend-frontend" component={ApiBackendFrontend} />
                <Route path="/api/collaboration/design-and-api" component={ApiDesignAndApi} />
                <Route path="/api/practice/react" component={ApiPracticeReact} />
                <Route path="/api/practice/nextjs" component={ApiPracticeNext} />
                <Route path="/api/practice/vue" component={ApiPracticeVue} />
                <Route path="/api/practice/nuxt" component={ApiPracticeNuxt} />
                <Route path="/api/advanced/beyond-rest" component={ApiBeyondRest} />
                <Route path="/api/advanced/summary" component={ApiSummary} />

                {/* === Vue / Nuxt マニュアル === */}
                <Route path="/vue" component={VueHome} />
                <Route path="/vue/basics/setup" component={VueSetup} />
                <Route path="/vue/basics/template-syntax" component={VueTemplateSyntax} />
                <Route path="/vue/basics/reactivity" component={VueReactivity} />
                <Route path="/vue/basics/components" component={VueComponents} />
                <Route path="/vue/basics/props-emits" component={VuePropsEmits} />
                <Route path="/vue/composition/script-setup" component={VueScriptSetup} />
                <Route path="/vue/composition/computed-watch" component={VueComputedWatch} />
                <Route path="/vue/composition/lifecycle" component={VueLifecycle} />
                <Route path="/vue/composition/composables" component={VueComposables} />
                <Route path="/vue/composition/provide-inject" component={VueProvideInject} />
                <Route path="/vue/state-routing/router" component={VueRouter} />
                <Route path="/vue/state-routing/pinia" component={VuePinia} />
                <Route path="/vue/styling/sfc-styling" component={VueSfcStyling} />
                <Route path="/vue/nuxt-basics/what-is-nuxt" component={VueWhatIsNuxt} />
                <Route path="/vue/nuxt-basics/routing-layouts" component={VueRoutingLayouts} />
                <Route path="/vue/nuxt-basics/data-fetching" component={VueDataFetching} />
                <Route path="/vue/nuxt-server/server-api" component={VueServerApi} />
                <Route path="/vue/nuxt-server/rendering-modes" component={VueRenderingModes} />
                <Route path="/vue/nuxt-server/middleware-plugins" component={VueMiddlewarePlugins} />
                <Route path="/vue/nuxt-server/deploy" component={VueDeploy} />
                <Route path="/vue/advanced/latest-features" component={VueLatestFeatures} />

                {/* === バックエンド / インフラ / DevOps マニュアル === */}
                <Route path="/infra" component={InfraHome} />
                <Route path="/infra/foundations/landscape" component={InfraLandscape} />
                <Route path="/infra/foundations/compute-models" component={InfraComputeModels} />
                <Route path="/infra/foundations/choosing" component={InfraChoosing} />
                <Route path="/infra/hosting/vercel" component={InfraVercel} />
                <Route path="/infra/hosting/netlify" component={InfraNetlify} />
                <Route path="/infra/hosting/cloudflare-pages" component={InfraCloudflarePages} />
                <Route path="/infra/hosting/comparison" component={InfraHostingComparison} />
                <Route path="/infra/edge/cdn-basics" component={InfraCdnBasics} />
                <Route path="/infra/edge/cloudflare" component={InfraCloudflare} />
                <Route path="/infra/edge/edge-functions" component={InfraEdgeFunctions} />
                <Route path="/infra/baas/what-is-baas" component={InfraWhatIsBaas} />
                <Route path="/infra/baas/supabase" component={InfraSupabase} />
                <Route path="/infra/baas/firebase" component={InfraFirebase} />
                <Route path="/infra/baas/comparison" component={InfraBaasComparison} />
                <Route path="/infra/database/relational" component={InfraRelational} />
                <Route path="/infra/database/serverless-db" component={InfraServerlessDb} />
                <Route path="/infra/database/orm" component={InfraOrm} />
                <Route path="/infra/database/beyond-relational" component={InfraBeyondRelational} />
                <Route path="/infra/bff/what-is-bff" component={InfraWhatIsBff} />
                <Route path="/infra/bff/auth" component={InfraAuth} />
                <Route path="/infra/bff/api-gateway" component={InfraApiGateway} />
                <Route path="/infra/devops/cicd" component={InfraCicd} />
                <Route path="/infra/devops/iac" component={InfraIac} />
                <Route path="/infra/devops/containers" component={InfraContainers} />
                <Route path="/infra/observability/monitoring" component={InfraMonitoring} />
                <Route path="/infra/observability/sre" component={InfraSre} />
                <Route path="/infra/aws/overview" component={InfraAwsOverview} />
                <Route path="/infra/aws/iam-account" component={InfraAwsIam} />
                <Route path="/infra/aws/network-vpc" component={InfraAwsNetwork} />
                <Route path="/infra/aws/compute" component={InfraAwsCompute} />
                <Route path="/infra/aws/storage-cdn" component={InfraAwsStorage} />
                <Route path="/infra/aws/database" component={InfraAwsDatabase} />
                <Route path="/infra/aws/cost-ops" component={InfraAwsCostOps} />

                {/* === 開発フロー / チーム / DesignOps マニュアル === */}
                <Route path="/devflow" component={FlowHome} />
                <Route path="/devflow/agile/what-is-agile" component={FlowWhatIsAgile} />
                <Route path="/devflow/agile/scrum" component={FlowScrum} />
                <Route path="/devflow/agile/sprint" component={FlowSprint} />
                <Route path="/devflow/agile/kanban" component={FlowKanban} />
                <Route path="/devflow/pm/backlog" component={FlowBacklog} />
                <Route path="/devflow/pm/estimation" component={FlowEstimation} />
                <Route path="/devflow/pm/roadmap" component={FlowRoadmap} />
                <Route path="/devflow/devops/culture" component={FlowCulture} />
                <Route path="/devflow/devops/dora" component={FlowDora} />
                <Route path="/devflow/devops/branching" component={FlowBranching} />
                <Route path="/devflow/review/why-review" component={FlowWhyReview} />
                <Route path="/devflow/review/pull-request" component={FlowPullRequest} />
                <Route path="/devflow/review/perspectives" component={FlowPerspectives} />
                <Route path="/devflow/review/culture" component={FlowReviewCulture} />
                <Route path="/devflow/designops/what-is-designops" component={FlowWhatIsDesignOps} />
                <Route path="/devflow/designops/design-review" component={FlowDesignReview} />
                <Route path="/devflow/designops/handoff" component={FlowHandoff} />
                <Route path="/devflow/team/documentation" component={FlowDocumentation} />
                <Route path="/devflow/team/retrospective" component={FlowRetrospective} />
                <Route path="/devflow/team/incident" component={FlowIncident} />

                {/* 404 */}
                <Route component={NotFound} />
              </Switch>
            </MainContent>
          </div>
          <HelpModal />
          <SettingsPopup />
          <ChatWidget />
          <AchievementToastContainer />
          <Toaster position="bottom-right" />
          </LayoutProvider>
        </OSProvider>
      </PlatformProvider>
    </ThemeProvider>
  );
}

export default App;
