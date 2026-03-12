import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';


/**
 * React 実践 - React 開発環境セットアップ
 * デザイン方針: ジャーニーマップ
 * - React プロジェクトの作成
 * - 開発サーバーの起動
 * - プロジェクト構造の理解
 */

export default function ReactSetup() {
  const [, navigate] = useLocation();
  const { selectedOS } = useOS();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 15 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            React 開発環境をセットアップしよう
          </h1>
          <p className="text-lg text-muted-foreground">
            React プロジェクトを作成し、開発サーバーを起動します。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* OS Toggle */}
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {/* What is React */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            React とは
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              React は、Facebook が開発した JavaScript ライブラリです。Web ページのインタラクティブな部分（ボタンをクリックしたときの動作など）を簡単に実装できます。
            </p>

            <div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-lg">
              <h3 className="font-semibold text-foreground mb-3">React の特徴</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>コンポーネント指向 - UI を再利用可能なパーツに分割</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>効率的な更新 - 必要な部分だけを更新</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>大規模プロジェクトに対応 - 企業でも使用</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>豊富なエコシステム - 多くのライブラリが利用可能</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
              <h3 className="font-semibold text-foreground mb-3">このセクションの目的</h3>
              <p className="text-muted-foreground">
                React の「ハローワールド」を作成することが目的ではなく、React プロジェクトを起動し、デザイン変更を行い、Git で管理することで、実際の開発体験を得ることです。
              </p>
            </div>
          </div>
        </section>

        {/* Create React Project */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            React プロジェクトを作成
          </h2>

          <div className="space-y-8">
            {/* Step 1: Create Project */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  React プロジェクトを作成
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Cursor のターミナルで、作業用フォルダに移動してから、以下のコマンドを実行してください。
              </p>

              {selectedOS === 'mac' ? (
                <CodeBlock
                  code={`cd ~/Documents\nnpx create-react-app my-react-app`}
                  language="bash"
                  title="React プロジェクトを作成"
                />
              ) : (
                <CodeBlock
                  code={`cd $env:USERPROFILE\\Documents\nnpx create-react-app my-react-app`}
                  language="powershell"
                  title="React プロジェクトを作成"
                />
              )}

              <p className="text-muted-foreground mt-4">
                このコマンドは、「my-react-app」という名前の React プロジェクトを作成します。初回は少し時間がかかります（3～5分程度）。
              </p>

              <InfoBox type="info">
                「create-react-app」は、React 公式が提供するプロジェクト作成ツールです。
              </InfoBox>
            </div>

            {/* Step 2: Navigate to Project */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  プロジェクトフォルダに移動
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                作成されたプロジェクトフォルダに移動します。
              </p>

              <CodeBlock
                code={`cd my-react-app`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="プロジェクトフォルダに移動"
              />
            </div>

            {/* Step 3: Open in Cursor */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  Cursor でプロジェクトを開く
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Cursor でプロジェクトを開きます。
              </p>

              <CodeBlock
                code={`cursor .`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="Cursor でプロジェクトを開く"
              />
            </div>
          </div>
        </section>

        {/* Start Development Server */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            開発サーバーを起動
          </h2>

          <div className="space-y-8">
            {/* Step 1: Start Server */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  開発サーバーを起動
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Cursor のターミナルで、以下のコマンドを実行してください。
              </p>

              <CodeBlock
                code={`npm start`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="開発サーバーを起動"
              />

              <p className="text-muted-foreground mt-4">
                サーバーが起動すると、自動的にブラウザが開いて、React アプリが表示されます。
              </p>

              <InfoBox type="info">
                開発サーバーが起動している間は、ファイルを編集するとブラウザが自動的に更新されます。
              </InfoBox>
            </div>

            {/* Step 2: Verify Server */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  ブラウザで確認
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                ブラウザで http://localhost:3000 にアクセスして、React アプリが表示されているか確認してください。
              </p>

              <p className="text-muted-foreground">
                「Learn React」というテキストが表示されれば、成功です。
              </p>

              <InfoBox type="success">
                React 開発サーバーが正常に起動しました！
              </InfoBox>
            </div>
          </div>
        </section>

        {/* Project Structure */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            React プロジェクトの構造
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              create-react-app で作成されたプロジェクトの主要なファイル・フォルダは以下の通りです：
            </p>

            <CodeBlock
              code={`my-react-app/\n├── node_modules/        # インストールされたライブラリ\n├── public/              # 静的ファイル（HTML など）\n│   └── index.html       # メインの HTML ファイル\n├── src/                 # React コンポーネント（ここを編集）\n│   ├── App.js           # メインコンポーネント\n│   ├── App.css          # スタイル\n│   └── index.js         # エントリーポイント\n├── package.json         # プロジェクト設定\n└── README.md            # プロジェクト説明`}
              language="bash"
              title="React プロジェクトの基本構造"
            />

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-foreground mb-1">src/</h4>
                <p className="text-muted-foreground text-sm">
                  React コンポーネントを配置するフォルダです。ここのファイルを編集すると、ブラウザが自動的に更新されます。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">public/</h4>
                <p className="text-muted-foreground text-sm">
                  静的ファイル（HTML、画像など）を配置するフォルダです。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">package.json</h4>
                <p className="text-muted-foreground text-sm">
                  プロジェクトの設定ファイルです。使用しているライブラリなどが記載されています。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="React プロジェクトの作成と起動コマンドを書いてみよう"
            description="React プロジェクトを作成し、フォルダに移動して開発サーバーを起動するまでのコマンドを書いてください。"
            initialCode={`# 1. React プロジェクトを作成\n\n# 2. プロジェクトフォルダに移動\n\n# 3. 開発サーバーを起動\n`}
            answer={`# 1. React プロジェクトを作成\nnpx create-react-app my-react-app\n\n# 2. プロジェクトフォルダに移動\ncd my-react-app\n\n# 3. 開発サーバーを起動\nnpm start`}
            keywords={['npx', 'create-react-app', 'cd', 'npm start']}
            hints={[
              'npx create-react-app でプロジェクトを作成します',
              'cd でフォルダに移動してから npm start で起動します',
            ]}
            preview
          />
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <InfoBox type="success" title="React 開発環境セットアップ完了！">
            React プロジェクトを作成し、開発サーバーを起動しました。次は、デザイン変更を行い、Git で管理します。
          </InfoBox>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/git/workflow/branch')}>戻る</Button>
          <Button className="gap-2" onClick={() => navigate('/git/react/modify')}>
              次へ：デザイン変更と Git 管理
              
              <ArrowRight size={20} />
            </Button>
        </div>
      </div>
    </div>
  );
}
