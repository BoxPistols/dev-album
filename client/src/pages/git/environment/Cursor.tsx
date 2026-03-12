import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';

/**
 * 環境準備 - Cursor インストール
 * デザイン方針: ジャーニーマップ
 * - Mac/Windows 両対応のインストール手順
 * - スクリーンショット付きで詳細に説明
 * - インストール確認方法を提供
 */

export default function CursorInstall() {
  const [, navigate] = useLocation();
  const { selectedOS } = useOS();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 3 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            Cursor をインストールしよう
          </h1>
          <p className="text-lg text-muted-foreground">
            AI を搭載したコードエディタ Cursor をインストールします。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* OS Toggle */}
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {/* What is Cursor */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Cursor とは
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cursor は、AI を搭載した高機能なコードエディタです。コードの自動補完、エラーの自動修正、コードの説明など、AI がコーディングをサポートしてくれます。コーディング未経験でも、AI の助けを借りながら学習することができます。
            </p>

            <div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-lg">
              <h3 className="font-semibold text-foreground mb-3">Cursor の特徴</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>AI による自動補完とコード生成</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>エラーの自動修正</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>コードの説明と質問への回答</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>VS Code と同じ操作感</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Installation Steps */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            インストール手順
          </h2>

          {selectedOS === 'mac' ? (
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground self-center">
                    Cursor の公式サイトにアクセス
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  以下のリンクから Cursor の公式サイトにアクセスしてください。
                </p>
                <a
                  href="https://www.cursor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Download size={18} />
                  Cursor 公式サイト
                </a>
              </div>

              {/* Step 2 */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground self-center">
                    Mac 版をダウンロード
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  ページの「Download」ボタンをクリックすると、Mac 版の Cursor がダウンロードされます。
                </p>
                <InfoBox type="info">
                  M1/M2 Mac と Intel Mac の両方に対応しています。自動的に正しいバージョンがダウンロードされます。
                </InfoBox>
              </div>

              {/* Step 3 */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground self-center">
                    インストール
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  ダウンロードされた Cursor.app をアプリケーションフォルダにドラッグ&ドロップします。
                </p>
                <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                  <li>ダウンロードフォルダから Cursor.app を見つける</li>
                  <li>Finder でアプリケーションフォルダを開く</li>
                  <li>Cursor.app をアプリケーションフォルダにドラッグ&ドロップ</li>
                </ol>
              </div>

              {/* Step 4 */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground self-center">
                    Cursor を起動
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  アプリケーションフォルダから Cursor をダブルクリックして起動します。
                </p>
                <InfoBox type="info">
                  初回起動時は「開発元が未確認のため開けません」と表示される場合があります。その場合は、Cursor を右クリック → 「開く」を選択してください。
                </InfoBox>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground self-center">
                    Cursor の公式サイトにアクセス
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  以下のリンクから Cursor の公式サイトにアクセスしてください。
                </p>
                <a
                  href="https://www.cursor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Download size={18} />
                  Cursor 公式サイト
                </a>
              </div>

              {/* Step 2 */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground self-center">
                    Windows 版をダウンロード
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  ページの「Download」ボタンをクリックすると、Windows 版の Cursor インストーラーがダウンロードされます。
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground self-center">
                    インストーラーを実行
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  ダウンロードされた CursorSetup.exe をダブルクリックして実行します。
                </p>
                <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                  <li>CursorSetup.exe をダブルクリック</li>
                  <li>インストールウィザードに従う</li>
                  <li>「Install」ボタンをクリック</li>
                </ol>
              </div>

              {/* Step 4 */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground self-center">
                    Cursor を起動
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  インストール完了後、自動的に Cursor が起動します。スタートメニューから「Cursor」を検索して起動することもできます。
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Verification */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            インストール確認
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-muted-foreground">
              Cursor が正しくインストールされたか確認しましょう。
            </p>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">確認方法</h3>
              <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                <li>Cursor を起動する</li>
                <li>
                  メニューから「Help」→「About Cursor」を選択
                  {selectedOS === 'windows' && '（または「Help」→「About」）'}
                </li>
                <li>バージョン情報が表示されれば、インストール成功です</li>
              </ol>
            </div>

            <InfoBox type="success">
              Cursor が正常に起動できれば、次のステップに進む準備ができています。
            </InfoBox>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/git/environment/prerequisites')}>戻る</Button>
          <Button className="gap-2" onClick={() => navigate('/git/environment/git')}>
              次へ：Git をインストール
              
              <ArrowRight size={20} />
            </Button>
        </div>
      </div>
    </div>
  );
}
