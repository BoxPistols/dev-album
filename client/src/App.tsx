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
import { useAutoHeadingIds } from "./hooks/useAutoHeadingIds";
import { Toaster } from "sonner";

// ── ランディング ──
const Landing = lazy(() => import("./pages/Landing"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ── React マニュアル (69ページ) ──
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

                {/* 404 */}
                <Route component={NotFound} />
              </Switch>
            </MainContent>
          </div>
          <HelpModal />
          <SettingsPopup />
          <Toaster position="bottom-right" />
          </LayoutProvider>
        </OSProvider>
      </PlatformProvider>
    </ThemeProvider>
  );
}

export default App;
