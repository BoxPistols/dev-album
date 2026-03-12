import { ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';

/**
 * 実践的な環境構築 - WSL2 導入
 * デザイン方針: ジャーニーマップ
 * - Windows ユーザー向けの WSL2 セットアップ
 * - Linux 環境の構築
 * - Ubuntu ディストリビューションの選択と設定
 */

export default function WSL2Setup() {
  const { selectedOS } = useOS();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 17 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            WSL2 を導入しよう
          </h1>
          <p className="text-lg text-muted-foreground">
            Windows で Linux 環境を使うための WSL2（Windows Subsystem for Linux 2）をセットアップします。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* OS Toggle */}
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {selectedOS === 'windows' ? (
          <>
            {/* What is WSL2 */}
            <section className="mb-12">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                WSL2 とは
              </h2>
              <div className="bg-card border border-border rounded-lg p-8 space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  WSL2（Windows Subsystem for Linux 2）は、Windows 上で Linux 環境を動かすための技術です。仮想マシンのような重さがなく、ネイティブに近い性能で Linux コマンドを使用できます。
                </p>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">WSL2 の利点</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-muted-foreground">Windows と Linux の両方のツールが使える</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-muted-foreground">軽量で高速（仮想マシンより効率的）</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-muted-foreground">Git、Node.js などのツールがネイティブで動作</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-muted-foreground">VSCode と統合でき、シームレスな開発が可能</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Prerequisites */}
            <section className="mb-12">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                前提条件
              </h2>
              <div className="bg-card border border-border rounded-lg p-8 space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  WSL2 を使用するには、以下の条件を満たす必要があります。
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground"><strong>Windows 10 バージョン 2004 以上</strong>または<strong>Windows 11</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">BIOS で仮想化が有効になっていること</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">管理者権限でのアクセス</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Installation Steps */}
            <section className="mb-12">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                インストール手順
              </h2>

              {/* Step 1 */}
              <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    PowerShell を管理者として開く
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  スタートメニューから「PowerShell」を検索し、右クリックして「管理者として実行」を選択します。
                </p>
                <InfoBox type="info">
                  管理者権限が必要です。権限がない場合は、システム管理者に相談してください。
                </InfoBox>
              </div>

              {/* Step 2 */}
              <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    WSL2 を有効化
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  PowerShell に以下のコマンドを入力して、WSL2 を有効化します。
                </p>
                <CodeBlock
                  code={`wsl --install -d Ubuntu`}
                  language="powershell"
                  title="WSL2 と Ubuntu のインストール"
                />
                <InfoBox type="info">
                  このコマンドで WSL2 と Ubuntu が自動的にインストールされます。インストール中は、コンピュータが再起動される場合があります。
                </InfoBox>
              </div>

              {/* Step 3 */}
              <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Ubuntu のセットアップ
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  インストール完了後、Ubuntu が自動的に起動します。初回起動時は、ユーザー名とパスワードを設定します。
                </p>
                <CodeBlock
                  code={`Enter new UNIX username: your_username
New password: 
Retype new password:`}
                  language="bash"
                  title="Ubuntu ユーザー設定"
                />
                <InfoBox type="warning">
                  パスワードは入力しても画面に表示されません。これは正常な動作です。
                </InfoBox>
              </div>

              {/* Step 4 */}
              <div className="bg-card border border-border rounded-lg p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    4
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    WSL2 のバージョン確認
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  PowerShell で以下のコマンドを実行して、WSL2 が正しくインストールされたか確認します。
                </p>
                <CodeBlock
                  code={`wsl --list --verbose`}
                  language="powershell"
                  title="WSL バージョン確認"
                />
                <p className="text-lg text-muted-foreground leading-relaxed">
                  出力結果に Ubuntu が表示され、VERSION が 2 になっていれば成功です。
                </p>
              </div>
            </section>

            {/* Troubleshooting */}
            <section className="mb-12">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                トラブルシューティング
              </h2>
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    「仮想化が有効ではありません」というエラーが出る場合
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    BIOS で仮想化を有効にする必要があります。以下の手順を参考にしてください。
                  </p>
                  <ol className="space-y-3 list-decimal list-inside">
                    <li className="text-muted-foreground">コンピュータを再起動し、BIOS 画面に入る（通常 F2、F10、Del キーなど）</li>
                    <li className="text-muted-foreground">「Virtualization」または「VT-x」という項目を探す</li>
                    <li className="text-muted-foreground">その項目を「Enabled」に設定</li>
                    <li className="text-muted-foreground">変更を保存して再起動</li>
                  </ol>
                </div>

                <div className="bg-card border border-border rounded-lg p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Ubuntu が起動しない場合
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    以下のコマンドで Ubuntu を再インストールしてみてください。
                  </p>
                  <CodeBlock
                    code={`wsl --unregister Ubuntu
wsl --install -d Ubuntu`}
                    language="powershell"
                    title="Ubuntu の再インストール"
                  />
                </div>
              </div>
            </section>

            {/* コーディングチャレンジ */}
            <section className="mb-12">
              <CodingChallenge
                title="WSL2 のインストールと確認コマンドを書いてみよう"
                description="WSL2 に Ubuntu をインストールし、正しくインストールされたか確認するコマンドを書いてください。"
                initialCode={`# 1. WSL2 に Ubuntu をインストール\n\n# 2. インストールされた WSL のバージョンを確認\n`}
                answer={`# 1. WSL2 に Ubuntu をインストール\nwsl --install -d Ubuntu\n\n# 2. インストールされた WSL のバージョンを確認\nwsl --list --verbose`}
                keywords={['wsl', '--install', '--list', '--verbose']}
                hints={[
                  'wsl --install -d でディストリビューションを指定してインストールします',
                  'wsl --list --verbose でインストール済みのディストリビューションとバージョンを確認できます',
                ]}
                preview
              />
            </section>

            {/* Next Steps */}
            <section className="mb-12">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  次のステップ
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  WSL2 のセットアップが完了しました。次は Linux/Ubuntu の基本コマンドを学びましょう。
                </p>
                <Button
                  onClick={() => navigate('/git/advanced/linux-basics')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Linux/Ubuntu 基礎へ進む
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
            </section>
          </>
        ) : (
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="text-accent flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Mac ユーザー向けの情報
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  WSL2 は Windows 専用の機能です。Mac ユーザーは、すでに Unix ベースのシステムを使用しているため、WSL2 は不要です。
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  Mac で Linux 環境が必要な場合は、Docker や Homebrew を使用することをお勧めします。
                </p>
                <Button
                  onClick={() => navigate('/git/advanced/linux-basics')}
                  className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Linux/Ubuntu 基礎へ進む
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
