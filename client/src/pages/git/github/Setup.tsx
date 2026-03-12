import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import WhyNowBox from '@/components/WhyNowBox';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';


/**
 * GitHub 基礎 - Git ローカル設定
 * デザイン方針: ジャーニーマップ
 * - Git のユーザー情報設定
 * - SSH キーの生成と登録
 * - GitHub との連携設定
 */

export default function GitSetup() {
  const [, navigate] = useLocation();
  const { selectedOS } = useOS();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 7 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            Git ローカル設定をしよう
          </h1>
          <p className="text-lg text-muted-foreground">
            ローカルの Git を設定して、GitHub と連携させます。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <WhyNowBox
          title="このページで設定すること"
          tags={['ユーザー情報', 'SSH キー', '初回のみ']}
        >
          <p>
            Git の設定では「誰が変更したか」を記録するための名前とメールアドレスを登録します。これが設定されていないと commit ができません。
          </p>
          <p>
            SSH キーはパスワード認証の代わりに使う仕組みです。公開鍵を GitHub に登録すると、以降はパスワードなしで接続できます。鍵と鍵穴の関係と同じで、手元の秘密鍵が鍵、GitHub 側の公開鍵が鍵穴になります。
          </p>
          <p>
            いずれも一度設定すれば、以後の操作で改めて設定し直す必要はありません。
          </p>
        </WhyNowBox>

        {/* OS Toggle */}
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {/* Git User Configuration */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Git ユーザー情報を設定
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Git を使う前に、ユーザー情報を設定する必要があります。これは、コミット（変更の記録）を作成する際に、誰が変更したかを記録するためです。
            </p>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">設定コマンド</h3>
              <p className="text-muted-foreground">
                以下のコマンドを実行して、ユーザー名とメールアドレスを設定してください。
                <strong>メールアドレスは GitHub に登録したものと同じにしてください。</strong>
              </p>

              <CodeBlock
                code={`git config --global user.name "Your Name"\ngit config --global user.email "your.email@example.com"`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="Git ユーザー情報設定"
              />

              <p className="text-muted-foreground text-sm">
                例：
              </p>
              <CodeBlock
                code={`git config --global user.name "Taro Yamada"\ngit config --global user.email "taro@example.com"`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="設定例"
              />

              <InfoBox type="info">
                「Your Name」と「your.email@example.com」を、自分の名前と GitHub に登録したメールアドレスに置き換えてください。
              </InfoBox>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">設定確認</h3>
              <p className="text-muted-foreground">
                設定が正しく保存されたか確認するには、以下のコマンドを実行してください。
              </p>

              <CodeBlock
                code={`git config --global user.name\ngit config --global user.email`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="設定確認コマンド"
              />

              <p className="text-muted-foreground">
                設定したユーザー名とメールアドレスが表示されれば、設定成功です。
              </p>
            </div>
          </div>
        </section>

        {/* SSH Key Setup */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            SSH キーを生成・登録
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              SSH キーは、GitHub とローカルの Git を安全に連携させるための暗号化キーです。SSH キーを使うことで、毎回パスワードを入力しなくても GitHub にアクセスできます。
            </p>

            <InfoBox type="info" title="SSH キーとは">
              SSH キーは、鍵と鍵穴のような関係です。公開鍵（鍵穴）を GitHub に登録し、秘密鍵（鍵）をローカルに保管することで、安全に認証できます。
            </InfoBox>

            <div className="space-y-8">
              {/* Step 1: Generate SSH Key */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Step 1: SSH キーを生成</h3>
                <p className="text-muted-foreground mb-4">
                  以下のコマンドを実行して、SSH キーを生成します。
                </p>

                <CodeBlock
                  code={`ssh-keygen -t ed25519 -C "your.email@example.com"`}
                  language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                  title="SSH キー生成コマンド"
                />

                <p className="text-muted-foreground mt-4">
                  実行後、以下のような質問が表示されます：
                </p>

                <CodeBlock
                  code={`Enter file in which to save the key (/Users/username/.ssh/id_ed25519): [Press Enter]\nEnter passphrase (empty for no passphrase): [Press Enter]\nEnter same passphrase again: [Press Enter]`}
                  language="bash"
                  title="SSH キー生成時の質問"
                />

                <InfoBox type="info">
                  すべてそのまま Enter キーを押してください。デフォルト設定で問題ありません。
                </InfoBox>
              </div>

              {/* Step 2: Copy Public Key */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Step 2: 公開鍵をコピー</h3>
                <p className="text-muted-foreground mb-4">
                  生成された公開鍵を表示して、コピーします。
                </p>

                {selectedOS === 'mac' ? (
                  <CodeBlock
                    code={`cat ~/.ssh/id_ed25519.pub | pbcopy`}
                    language="bash"
                    title="Mac: 公開鍵をコピー"
                  />
                ) : (
                  <CodeBlock
                    code={`Get-Content $env:USERPROFILE\\.ssh\\id_ed25519.pub | Set-Clipboard`}
                    language="powershell"
                    title="Windows: 公開鍵をコピー"
                  />
                )}

                <InfoBox type="info">
                  上のコマンドを実行すると、公開鍵がクリップボードにコピーされます。
                </InfoBox>
              </div>

              {/* Step 3: Register on GitHub */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Step 3: GitHub に公開鍵を登録</h3>
                <p className="text-muted-foreground mb-4">
                  GitHub にログインして、公開鍵を登録します。
                </p>

                <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                  <li>GitHub にログイン</li>
                  <li>ページ右上のアイコンをクリック → 「Settings」</li>
                  <li>左メニューから「SSH and GPG keys」をクリック</li>
                  <li>「New SSH key」ボタンをクリック</li>
                  <li>Title に「My Computer」など、わかりやすい名前を入力</li>
                  <li>Key に、コピーした公開鍵を貼り付け</li>
                  <li>「Add SSH key」をクリック</li>
                </ol>
              </div>

              {/* Step 4: Verify Connection */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Step 4: 接続確認</h3>
                <p className="text-muted-foreground mb-4">
                  SSH キーが正しく登録されたか確認します。
                </p>

                <CodeBlock
                  code={`ssh -T git@github.com`}
                  language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                  title="GitHub 接続確認コマンド"
                />

                <p className="text-muted-foreground mt-4">
                  実行後、以下のようなメッセージが表示されれば、接続成功です：
                </p>

                <CodeBlock
                  code={`Hi username! You've successfully authenticated, but GitHub does not provide shell access.`}
                  language="bash"
                  title="成功時のメッセージ"
                />

                <InfoBox type="success">
                  SSH キーが正しく登録されました。これで GitHub と安全に連携できます。
                </InfoBox>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            トラブルシューティング
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                「Permission denied (publickey)」と表示される場合
              </h3>
              <p className="text-muted-foreground">
                SSH キーが GitHub に正しく登録されていない可能性があります。以下を確認してください：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>公開鍵が GitHub に登録されているか</li>
                <li>コピーした公開鍵が完全か（最後の改行を含む）</li>
                <li>秘密鍵が ~/.ssh/id_ed25519 に存在するか</li>
              </ul>
            </div>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="SSH キー生成と接続確認のコマンドを書いてみよう"
            description="SSH キーを生成するコマンドと、GitHub への接続を確認するコマンドを書いてください。メールアドレスは「taro@example.com」とします。"
            initialCode={`# 1. SSH キーを生成\n\n# 2. GitHub への接続確認\n`}
            answer={`# 1. SSH キーを生成\nssh-keygen -t ed25519 -C "taro@example.com"\n\n# 2. GitHub への接続確認\nssh -T git@github.com`}
            keywords={['ssh-keygen', 'ed25519', 'ssh -T', 'git@github.com']}
            hints={[
              'ssh-keygen コマンドで鍵を生成します。-t で鍵の種類を指定します',
              'ssh -T git@github.com で GitHub への接続をテストできます',
            ]}
            preview
          />
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <InfoBox type="success" title="Git ローカル設定完了！">
            Git がローカルで設定され、GitHub と安全に連携できるようになりました。次は、最初のリポジトリを作成します。
          </InfoBox>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/git/github/account')}>戻る</Button>
          <Button className="gap-2" onClick={() => navigate('/git/github/first-repo')}>
              次へ：最初のリポジトリ作成
              
              <ArrowRight size={20} />
            </Button>
        </div>
      </div>
    </div>
  );
}
