import { useOS } from '@/contexts/OSContext';
import StepIndicator from '@/components/StepIndicator';
import OSToggle from '@/components/OSToggle';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function WSL2SSH() {
  const { selectedOS } = useOS();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="text-sm font-medium text-muted-foreground mb-4">STEP 18 / 27</div>

        <div className="mt-8 mb-12">
          <div className="inline-block px-4 py-2 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium mb-6">
            Windows ユーザー向け
          </div>

          <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6">
            WSL2 で GitHub SSH キー接続
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            WSL2 内で GitHub にアクセスするために、SSH キーを生成・登録します。Windows 上の Cursor や VSCode から WSL2 内のリポジトリにアクセスする際に必要な設定です。
          </p>
        </div>

        <OSToggle />

        {selectedOS === 'windows' && (
          <div className="space-y-12 mt-8">
            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                SSH キーの生成
              </h2>

              <p className="text-foreground mb-6 leading-relaxed">
                WSL2 のターミナルで SSH キーを生成します。以下のコマンドを実行してください。
              </p>

              <CodeBlock
                code={`ssh-keygen -t ed25519 -C "your-email@example.com"`}
                language="bash"
              />

              <InfoBox
                type="info"
                title="メールアドレスを置き換えてください"
              >
                上記の your-email@example.com をあなたの GitHub に登録しているメールアドレスに置き換えてください。
              </InfoBox>

              <div className="mt-8 bg-muted rounded-lg p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">実行結果の例</h3>
                <CodeBlock
                  code={`Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/username/.ssh/id_ed25519): [Enter キーを押す]
Enter passphrase (empty for no passphrase): [パスフレーズを入力、または Enter]
Enter same passphrase again: [パスフレーズを再入力]
Your identification has been saved in /home/username/.ssh/id_ed25519
Your public key has been saved in /home/username/.ssh/id_ed25519.pub`}
                  language="bash"
                />
              </div>

              <InfoBox
                type="success"
                title="パスフレーズについて"
              >
                セキュリティを高めるため、パスフレーズを設定することをお勧めします。ただし、学習用途であれば空のままでも構いません。
              </InfoBox>
            </section>

            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                SSH キーの確認
              </h2>

              <p className="text-foreground mb-6 leading-relaxed">
                生成された公開キーを確認します。以下のコマンドで公開キーの内容を表示します。
              </p>

              <CodeBlock
                code={`cat ~/.ssh/id_ed25519.pub`}
                language="bash"
              />

              <div className="mt-8 bg-muted rounded-lg p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">実行結果の例</h3>
                <CodeBlock
                  code={`ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKz... your-email@example.com`}
                  language="bash"
                />
              </div>

              <InfoBox
                type="warning"
                title="公開キーをコピーしてください"
              >
                上記の出力全体（ssh-ed25519 から your-email@example.com まで）をコピーしておきます。次のステップで GitHub に登録します。
              </InfoBox>
            </section>

            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                GitHub に公開キーを登録
              </h2>

              <p className="text-foreground mb-6 leading-relaxed">
                GitHub のウェブサイトで、生成した公開キーを登録します。
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      GitHub にログイン
                    </h3>
                    <p className="text-muted-foreground">
                      GitHub の公式サイト（https://github.com）にログインします。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Settings にアクセス
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      右上のプロフィールアイコンをクリックして、「Settings」を選択します。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      SSH and GPG keys
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      左側メニューから「SSH and GPG keys」をクリックします。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      New SSH key
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      「New SSH key」ボタンをクリックします。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      キーを貼り付け
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Title に「WSL2 SSH Key」などと入力し、Key フィールドに先ほどコピーした公開キーを貼り付けます。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    6
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Add SSH key
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      「Add SSH key」ボタンをクリックして登録完了です。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                SSH 接続のテスト
              </h2>

              <p className="text-foreground mb-6 leading-relaxed">
                SSH キーが正しく登録されたか確認します。WSL2 のターミナルで以下のコマンドを実行します。
              </p>

              <CodeBlock
                code={`ssh -T git@github.com`}
                language="bash"
              />

              <div className="mt-8 bg-muted rounded-lg p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">成功時の出力</h3>
                <CodeBlock
                  code={`Hi username! You've successfully authenticated, but GitHub does not provide shell access.`}
                  language="bash"
                />
              </div>

              <InfoBox
                type="success"
                title="接続成功！"
              >
                上記のメッセージが表示されれば、SSH キーが正しく登録されています。これで WSL2 から GitHub にアクセスできるようになりました。
              </InfoBox>
            </section>

            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                Git の SSH 設定確認
              </h2>

              <p className="text-foreground mb-6 leading-relaxed">
                Git がローカル設定で SSH を使用するように設定されているか確認します。
              </p>

              <CodeBlock
                code={`git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
git config --global core.sshCommand "ssh -i ~/.ssh/id_ed25519"`}
                language="bash"
              />

              <InfoBox
                type="info"
                title="設定確認"
              >
                以下のコマンドで設定を確認できます：git config --global --list
              </InfoBox>
            </section>

            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                リポジトリをクローン
              </h2>

              <p className="text-foreground mb-6 leading-relaxed">
                これで SSH を使用してリポジトリをクローンできます。GitHub のリポジトリページで「Code」ボタンをクリックし、「SSH」タブを選択してコマンドをコピーします。
              </p>

              <CodeBlock
                code={`git clone git@github.com:username/repository.git`}
                language="bash"
              />

              <InfoBox
                type="success"
                title="SSH クローン完了"
              >
                パスワードを求められずにリポジトリがクローンされれば、SSH 接続は完全に機能しています。
              </InfoBox>
            </section>
            {/* コーディングチャレンジ */}
            <section className="mt-12">
              <CodingChallenge
                title="SSH キーの生成と接続テストコマンドを書いてみよう"
                description="WSL2 で SSH キーを生成し、GitHub への接続をテストするコマンドを書いてください。"
                initialCode={`# 1. SSH キーを生成（ed25519 方式）\n\n# 2. 公開キーの内容を表示\n\n# 3. GitHub への SSH 接続をテスト\n`}
                answer={`# 1. SSH キーを生成（ed25519 方式）\nssh-keygen -t ed25519 -C "your-email@example.com"\n\n# 2. 公開キーの内容を表示\ncat ~/.ssh/id_ed25519.pub\n\n# 3. GitHub への SSH 接続をテスト\nssh -T git@github.com`}
                keywords={['ssh-keygen', 'ed25519', 'cat', 'id_ed25519.pub', 'ssh -T']}
                hints={[
                  'ssh-keygen -t ed25519 -C でメールアドレス付きの SSH キーを生成します',
                  'cat ~/.ssh/id_ed25519.pub で公開キーを表示します',
                  'ssh -T git@github.com で GitHub への接続をテストします',
                ]}
                preview
              />
            </section>
          </div>
        )}

        {selectedOS === 'mac' && (
          <div className="space-y-12 mt-8">
            <InfoBox
              type="info"
              title="Mac ユーザーへのお知らせ"
            >
              このセクションは Windows + WSL2 ユーザー向けです。Mac ユーザーは、すでに前のセクション (GitHub 基礎 - Git ローカル設定) で SSH キーの設定が完了しています。そのままご利用ください。
            </InfoBox>          </div>
        )}

        <div className="flex gap-4 mt-16 pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={() => navigate('/git/advanced/wsl2')}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            前へ
          </Button>
          <Button
            onClick={() => navigate('/git/advanced/github-cli')}
            className="ml-auto flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            次へ
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
