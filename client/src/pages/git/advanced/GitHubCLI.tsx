import { useOS } from '@/contexts/OSContext';
import OSToggle from '@/components/OSToggle';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function GitHubCLI() {
  const { selectedOS } = useOS();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="text-sm font-medium text-muted-foreground mb-4">STEP 19 / 27</div>

        <div className="mt-8 mb-12">
          <div className="inline-block px-4 py-2 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-full text-sm font-medium mb-6">
            生産性向上
          </div>

          <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6">
            GitHub CLI を導入しよう
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            GitHub CLI（gh）は、ターミナルから GitHub を操作できる強力なツールです。リポジトリの作成、プルリクエストの作成・マージ、Issue の管理など、Web ブラウザを使わずにすべてを実行できます。開発効率が大きく向上します。
          </p>
        </div>

        <OSToggle />

        {selectedOS === 'windows' && (
          <div className="space-y-12 mt-8">
            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                GitHub CLI のインストール
              </h2>

              <p className="text-foreground mb-6 leading-relaxed">
                WSL2 のターミナルで以下のコマンドを実行して、GitHub CLI をインストールします。
              </p>

              <CodeBlock
                code={`sudo apt update
sudo apt install gh`}
                language="bash"
              />

              <InfoBox
                type="info"
                title="インストール確認"
              >
                以下のコマンドでバージョンを確認できます：gh --version
              </InfoBox>
            </section>

            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                GitHub CLI で認証
              </h2>

              <p className="text-foreground mb-6 leading-relaxed">
                GitHub CLI を使用する前に、GitHub アカウントで認証します。以下のコマンドを実行してください。
              </p>

              <CodeBlock
                code={`gh auth login`}
                language="bash"
              />

              <div className="mt-8 bg-muted rounded-lg p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">対話的なセットアップ</h3>
                <p className="text-muted-foreground mb-4">以下の質問に答えていきます：</p>
                <CodeBlock
                  code={`? What is your preferred protocol for Git operations? [Use arrows to move, type to filter]
> HTTPS
  SSH

? Authenticate with your GitHub credentials? [Y/n]
Y

? How would you like to authenticate GitHub CLI?
> Login with a web browser
  Paste an authentication token`}
                  language="bash"
                />
              </div>

              <InfoBox
                type="success"
                title="認証完了"
              >
                ブラウザが開き、GitHub のログイン画面が表示されます。指示に従ってログインすれば、認証が完了します。
              </InfoBox>
            </section>

            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                GitHub CLI の基本コマンド
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    1. リポジトリを作成
                  </h3>
                  <p className="text-foreground mb-4 leading-relaxed">
                    ターミナルから新しいリポジトリを作成できます。
                  </p>
                  <CodeBlock
                    code={`gh repo create my-new-project --public --source=. --remote=origin --push`}
                    language="bash"
                  />
                  <p className="text-muted-foreground mt-4">
                    --public: 公開リポジトリ（--private で非公開）<br />
                    --source=.: 現在のディレクトリをソースに<br />
                    --remote=origin: リモート名を origin に<br />
                    --push: 自動的に push
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    2. リポジトリをクローン
                  </h3>
                  <p className="text-foreground mb-4 leading-relaxed">
                    GitHub のリポジトリをクローンします。
                  </p>
                  <CodeBlock
                    code={`gh repo clone username/repository`}
                    language="bash"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    3. プルリクエストを作成
                  </h3>
                  <p className="text-foreground mb-4 leading-relaxed">
                    ブランチからプルリクエストを作成します。
                  </p>
                  <CodeBlock
                    code={`gh pr create --title "新機能を追加" --body "この PR では新しい機能を追加しました。"`}
                    language="bash"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    4. プルリクエストをマージ
                  </h3>
                  <p className="text-foreground mb-4 leading-relaxed">
                    プルリクエストをマージします。
                  </p>
                  <CodeBlock
                    code={`gh pr merge <PR_NUMBER> --merge`}
                    language="bash"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    5. Issue を作成
                  </h3>
                  <p className="text-foreground mb-4 leading-relaxed">
                    新しい Issue を作成します。
                  </p>
                  <CodeBlock
                    code={`gh issue create --title "バグを報告" --body "このバグを修正してください。"`}
                    language="bash"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    6. Issue を一覧表示
                  </h3>
                  <p className="text-foreground mb-4 leading-relaxed">
                    リポジトリの Issue を一覧表示します。
                  </p>
                  <CodeBlock
                    code={`gh issue list
gh issue list --state=open
gh issue list --state=closed`}
                    language="bash"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                実践例：GitHub CLI でのワークフロー
              </h2>

              <p className="text-foreground mb-6 leading-relaxed">
                GitHub CLI を使った実践的なワークフローの例です。
              </p>

              <CodeBlock
                code={`# 1. 新しいブランチを作成
git checkout -b feature/new-feature

# 2. ファイルを編集して commit
echo "新しい機能" > feature.txt
git add .
git commit -m "新機能を追加"

# 3. GitHub に push
git push origin feature/new-feature

# 4. GitHub CLI でプルリクエストを作成
gh pr create --title "新機能を追加" --body "この PR では新しい機能を追加しました。"

# 5. プルリクエストを確認
gh pr view

# 6. プルリクエストをマージ
gh pr merge --merge`}
                language="bash"
              />

              <InfoBox
                type="success"
                title="Web ブラウザを使わずに完結"
              >
                このワークフロー全体をターミナルだけで実行できます。GitHub CLI を使うことで、開発効率が大幅に向上します。
              </InfoBox>
            </section>

            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                便利なエイリアス設定
              </h2>

              <p className="text-foreground mb-6 leading-relaxed">
                よく使うコマンドにエイリアスを設定すると、さらに効率が上がります。
              </p>

              <CodeBlock
                code={`# ~/.bashrc または ~/.zshrc に追加
alias gpr='gh pr create'
alias gpm='gh pr merge'
alias gil='gh issue list'
alias gic='gh issue create'`}
                language="bash"
              />

              <p className="text-foreground mt-6 leading-relaxed">
                設定後、以下のコマンドでエイリアスを有効にします：
              </p>

              <CodeBlock
                code={`source ~/.bashrc  # bash の場合
# または
source ~/.zshrc   # zsh の場合`}
                language="bash"
              />
            </section>
          </div>
        )}

        {selectedOS === 'mac' && (
          <div className="space-y-12 mt-8">
            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                GitHub CLI のインストール
              </h2>

              <p className="text-foreground mb-6 leading-relaxed">
                Homebrew を使用して GitHub CLI をインストールします。
              </p>

              <CodeBlock
                code={`brew install gh`}
                language="bash"
              />

              <InfoBox
                type="info"
                title="インストール確認"
              >
                以下のコマンドでバージョンを確認できます：gh --version
              </InfoBox>
            </section>

            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                GitHub CLI で認証
              </h2>

              <p className="text-foreground mb-6 leading-relaxed">
                GitHub CLI を使用する前に、GitHub アカウントで認証します。以下のコマンドを実行してください。
              </p>

              <CodeBlock
                code={`gh auth login`}
                language="bash"
              />

              <div className="mt-8 bg-muted rounded-lg p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">対話的なセットアップ</h3>
                <p className="text-muted-foreground mb-4">以下の質問に答えていきます：</p>
                <CodeBlock
                  code={`? What is your preferred protocol for Git operations? [Use arrows to move, type to filter]
> HTTPS
  SSH

? Authenticate with your GitHub credentials? [Y/n]
Y

? How would you like to authenticate GitHub CLI?
> Login with a web browser
  Paste an authentication token`}
                  language="bash"
                />
              </div>

              <InfoBox
                type="success"
                title="認証完了"
              >
                ブラウザが開き、GitHub のログイン画面が表示されます。指示に従ってログインすれば、認証が完了します。
              </InfoBox>
            </section>

            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                GitHub CLI の基本コマンド
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    1. リポジトリを作成
                  </h3>
                  <p className="text-foreground mb-4 leading-relaxed">
                    ターミナルから新しいリポジトリを作成できます。
                  </p>
                  <CodeBlock
                    code={`gh repo create my-new-project --public --source=. --remote=origin --push`}
                    language="bash"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    2. リポジトリをクローン
                  </h3>
                  <p className="text-foreground mb-4 leading-relaxed">
                    GitHub のリポジトリをクローンします。
                  </p>
                  <CodeBlock
                    code={`gh repo clone username/repository`}
                    language="bash"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    3. プルリクエストを作成
                  </h3>
                  <p className="text-foreground mb-4 leading-relaxed">
                    ブランチからプルリクエストを作成します。
                  </p>
                  <CodeBlock
                    code={`gh pr create --title "新機能を追加" --body "この PR では新しい機能を追加しました。"`}
                    language="bash"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    4. プルリクエストをマージ
                  </h3>
                  <p className="text-foreground mb-4 leading-relaxed">
                    プルリクエストをマージします。
                  </p>
                  <CodeBlock
                    code={`gh pr merge <PR_NUMBER> --merge`}
                    language="bash"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    5. Issue を作成
                  </h3>
                  <p className="text-foreground mb-4 leading-relaxed">
                    新しい Issue を作成します。
                  </p>
                  <CodeBlock
                    code={`gh issue create --title "バグを報告" --body "このバグを修正してください。"`}
                    language="bash"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    6. Issue を一覧表示
                  </h3>
                  <p className="text-foreground mb-4 leading-relaxed">
                    リポジトリの Issue を一覧表示します。
                  </p>
                  <CodeBlock
                    code={`gh issue list
gh issue list --state=open
gh issue list --state=closed`}
                    language="bash"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                実践例：GitHub CLI でのワークフロー
              </h2>

              <p className="text-foreground mb-6 leading-relaxed">
                GitHub CLI を使った実践的なワークフローの例です。
              </p>

              <CodeBlock
                code={`# 1. 新しいブランチを作成
git checkout -b feature/new-feature

# 2. ファイルを編集して commit
echo "新しい機能" > feature.txt
git add .
git commit -m "新機能を追加"

# 3. GitHub に push
git push origin feature/new-feature

# 4. GitHub CLI でプルリクエストを作成
gh pr create --title "新機能を追加" --body "この PR では新しい機能を追加しました。"

# 5. プルリクエストを確認
gh pr view

# 6. プルリクエストをマージ
gh pr merge --merge`}
                language="bash"
              />

              <InfoBox
                type="success"
                title="Web ブラウザを使わずに完結"
              >
                このワークフロー全体をターミナルだけで実行できます。GitHub CLI を使うことで、開発効率が大幅に向上します。
              </InfoBox>
            </section>

            <section>
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                便利なエイリアス設定
              </h2>

              <p className="text-foreground mb-6 leading-relaxed">
                よく使うコマンドにエイリアスを設定すると、さらに効率が上がります。
              </p>

              <CodeBlock
                code={`# ~/.zshrc に追加
alias gpr='gh pr create'
alias gpm='gh pr merge'
alias gil='gh issue list'
alias gic='gh issue create'`}
                language="bash"
              />

              <p className="text-foreground mt-6 leading-relaxed">
                設定後、以下のコマンドでエイリアスを有効にします：
              </p>

              <CodeBlock
                code={`source ~/.zshrc`}
                language="bash"
              />
            </section>
          </div>
        )}

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="GitHub CLI でプルリクエストを作成・マージしてみよう"
            description="GitHub CLI を使って、ブランチを Push し、プルリクエストを作成してマージするまでのコマンドを書いてください。"
            initialCode={`# 1. GitHub CLI で認証\n\n# 2. ブランチを GitHub に Push\n\n# 3. プルリクエストを作成\n\n# 4. プルリクエストをマージ\n`}
            answer={`# 1. GitHub CLI で認証\ngh auth login\n\n# 2. ブランチを GitHub に Push\ngit push origin feature/new-feature\n\n# 3. プルリクエストを作成\ngh pr create --title "新機能を追加" --body "この PR では新しい機能を追加しました。"\n\n# 4. プルリクエストをマージ\ngh pr merge --merge`}
            keywords={['gh auth login', 'gh pr create', 'gh pr merge']}
            hints={[
              'gh auth login で GitHub CLI の認証を行います',
              'gh pr create --title --body でプルリクエストを作成します',
              'gh pr merge --merge でプルリクエストをマージします',
            ]}
            preview
          />
        </section>

        <div className="flex gap-4 mt-16 pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={() => navigate('/git/advanced/wsl2-ssh')}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            前へ
          </Button>
          <Button
            onClick={() => navigate('/git/advanced/integration')}
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
