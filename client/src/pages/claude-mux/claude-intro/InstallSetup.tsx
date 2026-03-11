import { Download, Key, FileText, Settings } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function InstallSetup() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            インストールと初期設定
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            Claude Code のインストールから、プロジェクトへの初期設定までの手順。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* インストール */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Download className="text-[var(--claude-primary)]" />
              インストール
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code は npm パッケージとして配布されています。Node.js 18 以上が必要です。
            </p>
            <CodeBlock code={`# npm でグローバルインストール
$ npm install -g @anthropic-ai/claude-code

# バージョン確認
$ claude --version`} language="bash" />
            <InfoBox type="info" title="前提条件">
              Node.js 18+、Git、macOS 12+ / Ubuntu 20.04+ / Windows (WSL2) が必要です。
            </InfoBox>
          </section>

          {/* 認証 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Key className="text-[var(--claude-primary)]" />
              認証の設定
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              初回起動時にブラウザが開き、Anthropic アカウントで認証します。Max プランまたは API キーが必要です。
            </p>
            <CodeBlock code={`# 初回起動（ブラウザ認証が開始）
$ claude

# API キーを使用する場合
$ export ANTHROPIC_API_KEY="sk-ant-..."
$ claude`} language="bash" />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h4 className="font-bold text-sm mb-2">Max プラン（推奨）</h4>
                <p className="text-xs text-muted-foreground">Anthropic Console から Max サブスクリプションに加入。月額定額で利用可能。</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h4 className="font-bold text-sm mb-2">API キー</h4>
                <p className="text-xs text-muted-foreground">従量課金。<code>ANTHROPIC_API_KEY</code> 環境変数で設定。チームでの共有には向かない。</p>
              </div>
            </div>
          </section>

          {/* /init によるプロジェクト初期化 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FileText className="text-[var(--claude-primary)]" />
              プロジェクトの初期化
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              <code>/init</code> コマンドで、プロジェクトのルートに <code>CLAUDE.md</code> を自動生成します。Claude Code はこのファイルをシステムプロンプトとして読み込み、プロジェクト固有のルールや慣例を記憶します。
            </p>
            <CodeBlock code={`# プロジェクトディレクトリで Claude Code を起動
$ cd ~/projects/my-app
$ claude

# CLAUDE.md を自動生成
> /init`} language="bash" />
            <div className="mt-4 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-bold text-sm mb-3">CLAUDE.md に含まれる情報</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex gap-2">
                  <span className="text-[var(--claude-primary)] font-bold">1.</span>
                  <span>プロジェクトの技術スタック（言語、フレームワーク、ビルドツール）</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[var(--claude-primary)] font-bold">2.</span>
                  <span>ディレクトリ構造の概要</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[var(--claude-primary)] font-bold">3.</span>
                  <span>テスト・ビルド・lint の実行コマンド</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[var(--claude-primary)] font-bold">4.</span>
                  <span>コーディング規約（命名規則、スタイルガイド）</span>
                </div>
              </div>
            </div>
          </section>

          {/* 基本的な使い方 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Settings className="text-[var(--claude-primary)]" />
              基本的な起動オプション
            </h2>
            <div className="space-y-4">
              <CodeBlock code={`# 対話モード（デフォルト）
$ claude

# 非対話モード（パイプライン向き）
$ claude -p "このプロジェクトの構造を説明して"

# 直前のセッションを再開
$ claude -c

# 特定のモデルを指定
$ claude --model claude-sonnet-4-6`} language="bash" />
              <InfoBox type="info" title="IDE統合">
                VS Code では公式拡張「Claude Code」が提供されています。ターミナルパネルに Claude Code が統合され、エディタのコンテキストを自動共有します。JetBrains IDE にも対応。
              </InfoBox>
            </div>
          </section>
          <CodingChallenge
            preview
            previewType="markdown"
            title="CLAUDE.md を作成してみよう"
            description="プロジェクトの CLAUDE.md に記載する内容を書いてください。技術スタック、ビルドコマンド、コーディング規約を含めてください。"
            initialCode={`# CLAUDE.md\n\n## 技術スタック\n# ここに使用技術を書いてください\n\n## コマンド\n# ビルド・テスト・lint のコマンドを書いてください\n\n## コーディング規約\n# プロジェクトのルールを書いてください`}
            answer={`# CLAUDE.md\n\n## 技術スタック\n- TypeScript + React 18\n- Vite でビルド\n- Tailwind CSS でスタイリング\n\n## コマンド\n- ビルド: npm run build\n- テスト: npm test\n- lint: npm run lint\n- 開発サーバー: npm run dev\n\n## コーディング規約\n- 関数コンポーネントと hooks を使用\n- 命名規則: camelCase（変数・関数）、PascalCase（コンポーネント）\n- コミットメッセージは日本語で簡潔に`}
            hints={[
              'CLAUDE.md はエージェントへのシステムプロンプトとして機能します',
              'よく使うコマンド（ビルド、テスト、lint）を明記しましょう',
              'コーディング規約を記載するとコード生成の品質が向上します',
            ]}
            keywords={['TypeScript', 'npm', 'ビルド', 'テスト']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
