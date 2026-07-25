import type { ManualId } from "@/lib/navigation";

export interface FaqEntry {
  id: string;
  manualId: ManualId | null;
  question: string;
  keywords: string[];
  answer: string;
  relatedPages: string[];
}

export const faqEntries: FaqEntry[] = [
  // ── 全般 ──
  {
    id: "general-about",
    manualId: null,
    question: "このサイトは何ですか",
    keywords: ["サイト", "Dev Album", "概要", "何"],
    answer:
      "Dev Album は Web 開発の実践リファレンスです。Git・React・Claude Code・Three.js から AI・ML、UX デザイン、API 設計、Vue / Nuxt、インフラ、開発フローまでの各領域を、コードを書きながら学べます。",
    relatedPages: ["/react", "/git", "/threejs", "/claude-mux"],
  },
  {
    id: "general-start",
    manualId: null,
    question: "どのマニュアルから始めればいいですか",
    keywords: ["始め", "おすすめ", "最初", "初心者", "順番"],
    answer:
      "Web 開発が初めてなら **Git マニュアル** → **React マニュアル** の順がおすすめです。AI ツールに興味があれば **Claude Code マニュアル**、3D 表現を学びたいなら **Three.js マニュアル** へ進んでください。",
    relatedPages: ["/git", "/react", "/claude-mux", "/threejs"],
  },
  {
    id: "general-progress",
    manualId: null,
    question: "学習の進め方は",
    keywords: ["進め方", "学習", "進捗", "順番", "ステップ"],
    answer:
      "各マニュアルはステップ順に構成されています。上から順に進めるのが基本ですが、興味のあるトピックに直接飛んでも問題ありません。コーディングチャレンジがあるページでは、実際にコードを書いて結果を確認できます。",
    relatedPages: [],
  },
  {
    id: "general-challenge",
    manualId: null,
    question: "コーディングチャレンジとは",
    keywords: ["チャレンジ", "コーディング", "練習", "エディタ", "プレビュー"],
    answer:
      "ページ内のインタラクティブなコードエディタです。コードを編集するとリアルタイムでプレビューが更新されます。JSX / HTML / CSS を試せます。",
    relatedPages: [],
  },

  // ── React マニュアル ──
  {
    id: "react-what",
    manualId: "react",
    question: "React とは何ですか",
    keywords: ["React", "とは", "概要", "ライブラリ", "UI"],
    answer:
      "React は Meta が開発した UI ライブラリです。コンポーネントベースで画面を構築し、状態が変わると必要な部分だけを効率的に再描画します。",
    relatedPages: ["/react", "/react/react-basics/hello-react"],
  },
  {
    id: "react-setup",
    manualId: "react",
    question: "React の環境構築方法は",
    keywords: ["環境構築", "セットアップ", "インストール", "Node.js", "Vite"],
    answer:
      "Node.js をインストール後、`npm create vite@latest` でプロジェクトを作成します。詳しくは環境構築ページをご覧ください。",
    relatedPages: ["/react/intro/setup"],
  },
  {
    id: "react-jsx",
    manualId: "react",
    question: "JSX とは何ですか",
    keywords: ["JSX", "構文", "HTML", "JavaScript", "テンプレート"],
    answer:
      "JSX は JavaScript 内で HTML ライクな構文を書ける React の記法です。ブラウザが直接理解できないため、ビルド時に JavaScript に変換されます。",
    relatedPages: ["/react/react-basics/jsx"],
  },
  {
    id: "react-usestate",
    manualId: "react",
    question: "useState の使い方は",
    keywords: ["useState", "状態", "state", "ステート", "フック"],
    answer:
      "`const [value, setValue] = useState(初期値)` で状態を定義します。`setValue` で更新すると、コンポーネントが再レンダリングされます。",
    relatedPages: ["/react/state-events/use-state"],
  },
  {
    id: "react-useeffect",
    manualId: "react",
    question: "useEffect はいつ使いますか",
    keywords: ["useEffect", "副作用", "API", "ライフサイクル", "マウント"],
    answer:
      "API 呼び出し、DOM 操作、タイマーなど副作用を扱うときに使います。第2引数の依存配列で実行タイミングを制御します。",
    relatedPages: ["/react/hooks-deep/use-effect"],
  },
  {
    id: "react-props",
    manualId: "react",
    question: "props と state の違いは",
    keywords: ["props", "state", "違い", "プロパティ", "データ"],
    answer:
      "**props** は親コンポーネントから渡される読み取り専用のデータです。**state** はコンポーネント内部で管理する変更可能なデータです。",
    relatedPages: [
      "/react/react-basics/props",
      "/react/state-events/use-state",
    ],
  },
  {
    id: "react-nextjs",
    manualId: "react",
    question: "Next.js とは何ですか",
    keywords: ["Next.js", "フレームワーク", "SSR", "サーバー", "ルーティング"],
    answer:
      "Next.js は React ベースのフルスタックフレームワークです。ファイルベースルーティング、SSR/SSG、API Routes などを提供します。",
    relatedPages: ["/react/nextjs-basics/what-is-nextjs"],
  },
  {
    id: "react-tailwind",
    manualId: "react",
    question: "Tailwind CSS とは",
    keywords: ["Tailwind", "CSS", "ユーティリティ", "スタイル", "クラス"],
    answer:
      "Tailwind CSS はユーティリティファーストの CSS フレームワークです。`bg-blue-500` のようなクラスを組み合わせてスタイルを構築します。",
    relatedPages: ["/react/tailwind/tailwind-intro"],
  },
  {
    id: "react-typescript",
    manualId: "react",
    question: "TypeScript は必要ですか",
    keywords: ["TypeScript", "型", "タイプ", "必要", "メリット"],
    answer:
      "必須ではありませんが強く推奨されます。型チェックによりバグを事前に防ぎ、エディタの補完も強力になります。このマニュアルでは TypeScript を使用しています。",
    relatedPages: ["/react/intro/setup"],
  },

  // ── Git マニュアル ──
  {
    id: "git-what",
    manualId: "git",
    question: "Git とは何ですか",
    keywords: ["Git", "バージョン管理", "概要", "とは"],
    answer:
      "Git はファイルの変更履歴を管理するバージョン管理システムです。コードの変更を記録し、過去の状態に戻したり、チームで並行作業したりできます。",
    relatedPages: ["/git"],
  },
  {
    id: "git-setup",
    manualId: "git",
    question: "Git のインストール方法は",
    keywords: ["インストール", "セットアップ", "設定", "初期設定"],
    answer:
      "macOS なら `brew install git`、Windows なら Git for Windows をインストールします。初期設定で `git config` でユーザー名とメールを設定してください。",
    relatedPages: ["/git/environment/git"],
  },
  {
    id: "git-branch",
    manualId: "git",
    question: "ブランチの使い方は",
    keywords: ["ブランチ", "branch", "分岐", "マージ", "merge"],
    answer:
      "`git branch 名前` で作成、`git checkout 名前` で切り替えます。作業が完了したら `git merge` でメインブランチに統合します。",
    relatedPages: ["/git/git-workflow/branch-workflow"],
  },
  {
    id: "git-pr",
    manualId: "git",
    question: "プルリクエストとは",
    keywords: ["プルリクエスト", "PR", "pull request", "レビュー", "マージ"],
    answer:
      "ブランチの変更をメインブランチに統合する提案です。GitHub 上でコードレビューを受けてからマージします。チーム開発の基本ワークフローです。",
    relatedPages: ["/git/github-basics/pull-request"],
  },
  {
    id: "git-markdown",
    manualId: "git",
    question: "Markdown の書き方は",
    keywords: ["Markdown", "マークダウン", "記法", "README", "書き方"],
    answer:
      "Markdown は `#` で見出し、`**太字**`、`` `コード` `` などの記法でテキストを装飾します。GitHub の README や Issue で広く使われています。",
    relatedPages: ["/git/github-basics/markdown"],
  },

  // ── Three.js マニュアル ──
  {
    id: "threejs-what",
    manualId: "threejs",
    question: "Three.js とは何ですか",
    keywords: ["Three.js", "3D", "WebGL", "グラフィックス", "概要"],
    answer:
      "Three.js はブラウザ上で 3D グラフィックスを描画する JavaScript ライブラリです。WebGL を抽象化し、シーン・カメラ・ライトなどの概念で 3D を構築します。",
    relatedPages: ["/threejs"],
  },
  {
    id: "threejs-r3f",
    manualId: "threejs",
    question: "React Three Fiber とは",
    keywords: [
      "React Three Fiber",
      "R3F",
      "React",
      "Three.js",
      "バインディング",
    ],
    answer:
      "React Three Fiber は Three.js の React バインディングです。JSX で 3D シーンを宣言的に記述でき、React の状態管理やライフサイクルをそのまま活用できます。",
    relatedPages: ["/threejs/practical/r3f-basics"],
  },
  {
    id: "threejs-scene",
    manualId: "threejs",
    question: "シーン・カメラ・レンダラーとは",
    keywords: ["シーン", "カメラ", "レンダラー", "基本", "構成"],
    answer:
      "**シーン**はオブジェクトを配置する空間、**カメラ**は視点、**レンダラー**はシーンを画面に描画する役割です。この 3 つが Three.js の基本構成です。",
    relatedPages: ["/threejs/basics/scene-camera-renderer"],
  },

  // ── Claude Code マニュアル ──
  {
    id: "claude-what",
    manualId: "claude-mux",
    question: "Claude Code とは何ですか",
    keywords: ["Claude Code", "AI", "ツール", "概要", "コーディング"],
    answer:
      "Claude Code は Anthropic が提供する AI コーディングアシスタントの CLI ツールです。ターミナルで直接コードの生成・編集・レビューができます。",
    relatedPages: ["/claude-mux/claude-intro/claude-code-intro"],
  },
  {
    id: "claude-install",
    manualId: "claude-mux",
    question: "Claude Code のインストール方法は",
    keywords: ["インストール", "セットアップ", "導入", "始め方"],
    answer:
      "`npm install -g @anthropic-ai/claude-code` でインストールします。API キーの設定後、`claude` コマンドで起動できます。",
    relatedPages: ["/claude-mux/claude-intro/claude-code-install"],
  },
  {
    id: "claude-claudemd",
    manualId: "claude-mux",
    question: "CLAUDE.md とは何ですか",
    keywords: ["CLAUDE.md", "コンテキスト", "設定", "プロジェクト", "指示"],
    answer:
      "プロジェクトルートに配置する設定ファイルです。プロジェクトのルール・技術スタック・コーディング規約を記述すると、Claude Code がそれに従って作業します。",
    relatedPages: ["/claude-mux/claude-core/context-management"],
  },
  {
    id: "claude-mcp",
    manualId: "claude-mux",
    question: "MCP とは何ですか",
    keywords: ["MCP", "Model Context Protocol", "連携", "ツール", "サーバー"],
    answer:
      "Model Context Protocol は AI モデルに外部ツールやデータソースを接続する標準プロトコルです。ファイルシステム、データベース、API などと Claude Code を連携できます。",
    relatedPages: ["/claude-mux/mcp/mcp-setup"],
  },
];
