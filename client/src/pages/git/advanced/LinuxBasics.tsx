import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import { useLocation } from 'wouter';

/**
 * 実践的な環境構築 - Linux/Ubuntu 基礎
 * デザイン方針: ジャーニーマップ
 * - ターミナルの基本操作
 * - よく使うコマンド
 * - ファイルシステムの理解
 * - ユーザーと権限
 */

export default function LinuxBasics() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 14 / 16
          </div>
          <h1 className="text-4xl font-poppins font-bold text-foreground mb-4">
            Linux/Ubuntu 基礎を学ぼう
          </h1>
          <p className="text-lg text-muted-foreground">
            ターミナルで使う基本的なコマンドとファイルシステムの仕組みを理解します。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* Terminal Basics */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            ターミナルの基本
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              ターミナルは、コマンド（テキスト）でコンピュータに指示を出すツールです。GUI（マウスで操作する画面）と異なり、キーボードだけで操作します。
            </p>
            <div className="bg-muted/50 border border-border rounded p-4">
              <p className="font-mono text-sm text-foreground">
                username@hostname:~$
              </p>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              このような表示が出たら、コマンドを入力する準備ができています。<code className="bg-muted px-2 py-1 rounded text-primary">$</code> の後にコマンドを入力して Enter キーを押します。
            </p>
          </div>
        </section>

        {/* File System */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            ファイルシステムの理解
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Linux のファイルシステムは、ツリー構造になっています。最上位のディレクトリを「ルート」（<code className="bg-muted px-2 py-1 rounded text-primary">/</code>）と呼びます。
            </p>
            <div className="bg-muted/50 border border-border rounded p-4 font-mono text-sm space-y-1">
              <p className="text-foreground">/ (ルート)</p>
              <p className="text-foreground ml-4">├── home/ (ユーザーのホームディレクトリ)</p>
              <p className="text-foreground ml-8">└── username/</p>
              <p className="text-foreground ml-4">├── var/ (ログファイルなど)</p>
              <p className="text-foreground ml-4">├── etc/ (設定ファイル)</p>
              <p className="text-foreground ml-4">└── usr/ (プログラムやライブラリ)</p>
            </div>
            <InfoBox type="info">
              ホームディレクトリ（<code className="bg-muted px-1 rounded text-primary">~</code>）は、ユーザーの個人用ディレクトリです。ここにファイルやプロジェクトを保存します。
            </InfoBox>
          </div>
        </section>

        {/* Essential Commands */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            よく使うコマンド
          </h2>

          {/* pwd */}
          <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">pwd - 現在のディレクトリを表示</h3>
            <CodeBlock
              code={`pwd`}
              language="bash"
              title="現在地を確認"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              現在いるディレクトリのパスを表示します。「どこにいるのか」を確認するときに使います。
            </p>
          </div>

          {/* ls */}
          <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">ls - ファイル一覧を表示</h3>
            <CodeBlock
              code={`ls              # 現在のディレクトリのファイル一覧
ls -la          # 詳細情報を表示（隠しファイルも含む）
ls -lh          # ファイルサイズを人間が読みやすい形式で表示`}
              language="bash"
              title="ファイル一覧を確認"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              ディレクトリ内のファイルやフォルダを一覧表示します。
            </p>
          </div>

          {/* cd */}
          <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">cd - ディレクトリを移動</h3>
            <CodeBlock
              code={`cd Documents    # Documents フォルダに移動
cd ..           # 親ディレクトリに移動
cd ~            # ホームディレクトリに移動
cd /            # ルートディレクトリに移動`}
              language="bash"
              title="ディレクトリ移動"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              別のディレクトリに移動します。<code className="bg-muted px-2 py-1 rounded text-primary">..</code> は親ディレクトリを表します。
            </p>
          </div>

          {/* mkdir */}
          <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">mkdir - 新しいディレクトリを作成</h3>
            <CodeBlock
              code={`mkdir my-project        # my-project フォルダを作成
mkdir -p a/b/c          # ネストされたフォルダを作成`}
              language="bash"
              title="ディレクトリ作成"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              新しいフォルダを作成します。<code className="bg-muted px-2 py-1 rounded text-primary">-p</code> オプションで、親ディレクトリも同時に作成できます。
            </p>
          </div>

          {/* touch */}
          <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">touch - 空のファイルを作成</h3>
            <CodeBlock
              code={`touch README.md         # README.md ファイルを作成
touch index.html        # index.html ファイルを作成`}
              language="bash"
              title="ファイル作成"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              空のファイルを作成します。ファイルの内容を後で追加できます。
            </p>
          </div>

          {/* cat */}
          <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">cat - ファイルの内容を表示</h3>
            <CodeBlock
              code={`cat README.md           # README.md の内容を表示
cat file1.txt file2.txt # 複数ファイルの内容を表示`}
              language="bash"
              title="ファイル内容表示"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              ファイルの内容をターミナルに表示します。
            </p>
          </div>

          {/* nano */}
          <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">nano - テキストエディタ</h3>
            <CodeBlock
              code={`nano README.md          # README.md をエディタで開く`}
              language="bash"
              title="ファイル編集"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              ターミナル内でテキストファイルを編集できます。編集後は Ctrl+X で終了し、Y を入力して保存します。
            </p>
          </div>

          {/* rm */}
          <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">rm - ファイルを削除</h3>
            <CodeBlock
              code={`rm file.txt             # ファイルを削除
rm -r folder/           # フォルダとその中身を削除`}
              language="bash"
              title="ファイル削除"
            />
            <InfoBox type="warning">
              削除したファイルはゴミ箱に入らず、完全に削除されます。慎重に使用してください。
            </InfoBox>
          </div>

          {/* cp */}
          <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">cp - ファイルをコピー</h3>
            <CodeBlock
              code={`cp file.txt file_copy.txt       # ファイルをコピー
cp -r folder/ folder_copy/      # フォルダをコピー`}
              language="bash"
              title="ファイルコピー"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              ファイルやフォルダをコピーします。
            </p>
          </div>

          {/* mv */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">mv - ファイルを移動・名前変更</h3>
            <CodeBlock
              code={`mv file.txt new_name.txt       # ファイルを名前変更
mv file.txt Documents/          # ファイルを移動
mv old_folder/ new_folder/      # フォルダを移動・名前変更`}
              language="bash"
              title="ファイル移動・名前変更"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              ファイルを移動したり、名前を変更したりします。
            </p>
          </div>
        </section>

        {/* Permissions */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            ユーザーと権限
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Linux では、ファイルやコマンドに対して「誰が何をできるか」という権限が設定されています。
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">sudo - 管理者権限で実行</h3>
              <CodeBlock
                code={`sudo apt update         # パッケージリストを更新（管理者権限が必要）
sudo apt install git    # Git をインストール`}
                language="bash"
                title="管理者権限での実行"
              />
              <p className="text-lg text-muted-foreground leading-relaxed">
                <code className="bg-muted px-2 py-1 rounded text-primary">sudo</code> を付けると、コマンドを管理者権限で実行できます。パスワードの入力が求められることがあります。
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">chmod - ファイルの権限を変更</h3>
              <CodeBlock
                code={`chmod +x script.sh      # ファイルを実行可能にする
chmod 755 file.txt      # 権限を数値で指定`}
                language="bash"
                title="権限変更"
              />
              <p className="text-lg text-muted-foreground leading-relaxed">
                ファイルの読み取り、書き込み、実行権限を変更します。
              </p>
            </div>
          </div>
        </section>

        {/* Practice */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            実践練習
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              以下の手順で、実際にコマンドを使ってみましょう。
            </p>
            <ol className="space-y-4 list-decimal list-inside">
              <li className="text-lg text-muted-foreground">
                <code className="bg-muted px-2 py-1 rounded text-primary">mkdir my-project</code> でフォルダを作成
              </li>
              <li className="text-lg text-muted-foreground">
                <code className="bg-muted px-2 py-1 rounded text-primary">cd my-project</code> でそのフォルダに移動
              </li>
              <li className="text-lg text-muted-foreground">
                <code className="bg-muted px-2 py-1 rounded text-primary">touch README.md</code> でファイルを作成
              </li>
              <li className="text-lg text-muted-foreground">
                <code className="bg-muted px-2 py-1 rounded text-primary">nano README.md</code> でファイルを編集
              </li>
              <li className="text-lg text-muted-foreground">
                <code className="bg-muted px-2 py-1 rounded text-primary">cat README.md</code> でファイルの内容を確認
              </li>
            </ol>
            <InfoBox type="success">
              これらのコマンドが使えるようになれば、Linux の基本操作はマスターです！
            </InfoBox>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="Linux 基本コマンドで プロジェクトを作成してみよう"
            description="フォルダを作成し、ファイルを追加して内容を確認するまでのコマンドを書いてください。"
            initialCode={`# 1. my-project フォルダを作成\n\n# 2. my-project フォルダに移動\n\n# 3. README.md ファイルを作成\n\n# 4. README.md にテキストを書き込む\n\n# 5. README.md の内容を表示\n`}
            answer={`# 1. my-project フォルダを作成\nmkdir my-project\n\n# 2. my-project フォルダに移動\ncd my-project\n\n# 3. README.md ファイルを作成\ntouch README.md\n\n# 4. README.md にテキストを書き込む\necho "# My Project" > README.md\n\n# 5. README.md の内容を表示\ncat README.md`}
            keywords={['mkdir', 'cd', 'touch', 'echo', 'cat']}
            hints={[
              'mkdir でフォルダ作成、cd で移動します',
              'touch で空ファイル作成、echo "テキスト" > ファイル名 で書き込みます',
              'cat でファイルの内容を表示できます',
            ]}
            preview
          />
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
            <h2 className="text-2xl font-poppins font-bold text-foreground mb-4">
              次のステップ
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Linux の基本コマンドをマスターしました。次は VSCode をセットアップして、より実践的な開発環境を構築しましょう。
            </p>
            <Button
              onClick={() => navigate('/git/advanced/vscode')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              VSCode 導入へ進む
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
