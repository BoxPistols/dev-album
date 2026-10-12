import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

// 表の見出しセルと本文セルのクラスを1か所にまとめる
const TH_CLASS =
  "text-left px-4 py-3 font-semibold text-foreground border-b border-border";
const TD_CLASS = "px-4 py-3";
const CODE_CLASS = "bg-muted px-1 py-0.5 rounded text-xs";
const TABLE_CODE_CLASS = "bg-muted px-1.5 py-0.5 rounded text-xs";

const NPM_COMPARISON = [
  {
    task: "プロジェクトを始める",
    npm: "npm init",
    go: "go mod init example.com/app",
  },
  {
    task: "依存を追加する",
    npm: "npm install uuid",
    go: "go get github.com/google/uuid",
  },
  {
    task: "依存の一覧",
    npm: "package.jsonのdependencies",
    go: "go.modのrequire",
  },
  {
    task: "中身の固定・検証",
    npm: "package-lock.json",
    go: "go.sum（ハッシュのみ。版の決定はgo.modが担う）",
  },
  {
    task: "不要な依存の掃除",
    npm: "npm prune",
    go: "go mod tidy",
  },
  {
    task: "依存の置き場所",
    npm: "プロジェクトごとのnode_modules",
    go: "マシン共通のモジュールキャッシュ",
  },
  {
    task: "CLIを入れる",
    npm: "npm install -g",
    go: "go install <パス>@<バージョン>",
  },
];

const TOOLS = [
  {
    command: "gofmt / go fmt",
    role: "コードを公式の書式に整える",
    ts: "Prettier（ただし設定項目がない）",
  },
  {
    command: "goimports",
    role: "gofmtに加えて、importの追加と削除を行う",
    ts: "Prettier＋ESLintのimport整理",
  },
  {
    command: "go vet",
    role: "コンパイルは通るが誤りの可能性が高いコードを報告する",
    ts: "ESLintの一部のルール",
  },
  {
    command: "go doc",
    role: "パッケージや関数のドキュメントを端末で読む",
    ts: "エディタのホバー表示、型定義ファイル",
  },
];

export default function ModulesTooling() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 12</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          モジュールと標準ツール
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          複数のパッケージに分けたプロジェクトの組み立て方と、外部の依存の入れ方を確認します。
          あわせて、整形・静的検査・ドキュメント参照といった
          <code className={CODE_CLASS}>go</code>
          コマンドに同梱のツールを、npmのエコシステムと対比しながら使ってみます。
        </p>

        <WhyNowBox tags={["go.mod", "go.sum", "internal", "gofmt", "go vet"]}>
          <p>
            ここまでは1つのファイルで完結するコードを書いてきました。
            次のSTEPのテストやHTTPサーバーは、パッケージを分けて書くと見通しがよくなります。
            ディレクトリとimportパスの対応、公開範囲の決まり方を先に押さえておくと、どこに何を置くかで迷わずに済みます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              パッケージはディレクトリ単位
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TypeScriptでは1ファイルが1モジュールですが、Goでは
              <strong className="text-foreground">
                1ディレクトリが1パッケージ
              </strong>
              です。同じディレクトリの
              <code className={CODE_CLASS}>.go</code>
              ファイルはすべて同じ
              <code className={CODE_CLASS}>package</code>
              名を宣言し、互いの関数や型をimportなしで使えます。
              ほかのパッケージを使うときは、
              <code className={CODE_CLASS}>go.mod</code>
              のモジュールパスにディレクトリをつなげたパスでimportします。
            </p>
            <CodeBlock
              code={`app/
├── go.mod                  module example.com/app
├── cmd/
│   └── server/
│       └── main.go         package main（実行ファイルの入口）
└── internal/
    └── store/
        └── store.go        package store
                            importパス: example.com/app/internal/store`}
              language="text"
              title="ディレクトリとimportパスの対応"
            />
            <CodeBlock
              code={`// Package storeはTODOをメモリ上に保持する。
package store

// Todoは1件のTODOを表す。
type Todo struct {
	ID    int
	Title string
}

// Storeはメモリ上のTODO一覧。
type Store struct {
	todos  []Todo
	nextID int
}

// Newは空のStoreを返す。
func New() *Store {
	return &Store{nextID: 1}
}

// AddはTODOを追加して、振ったIDを返す。
func (s *Store) Add(title string) int {
	id := s.nextID
	s.todos = append(s.todos, Todo{ID: id, Title: title})
	s.nextID++
	return id
}

// Countは件数を返す。
func (s *Store) Count() int {
	return len(s.todos)
}`}
              language="go"
              title="internal/store/store.go"
              showLineNumbers
            />
            <CodeBlock
              code={`package main

import (
	"fmt"

	"example.com/app/internal/store"
)

func main() {
	s := store.New()
	s.Add("牛乳を買う")
	s.Add("Goを学ぶ")
	fmt.Println("件数:", s.Count())
}`}
              language="go"
              title="cmd/server/main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run ./cmd/server
# 件数: 2`}
              language="bash"
              title="実行"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              呼び出し側はパッケージ名を前に付けて
              <code className={CODE_CLASS}>store.New()</code>
              のように書きます。TypeScriptの
              <code className={CODE_CLASS}>
                import * as store from "./store"
              </code>
              に近い書き味です。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              公開範囲は大文字とinternalで決まる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Goに
              <code className={CODE_CLASS}>export</code>
              キーワードはありません。名前が
              <strong className="text-foreground">大文字で始まれば公開</strong>
              、小文字ならパッケージの中だけで使えます。構造体のフィールドも同じ規則です。
              上の
              <code className={CODE_CLASS}>Store</code>の
              <code className={CODE_CLASS}>nextID</code>
              をmainから読もうとすると、コンパイルエラーになります。
            </p>
            <CodeBlock
              code={`func peek(s *store.Store) int {
	return s.nextID
}`}
              language="go"
              title="cmd/server/bad.go（抜粋）"
            />
            <CodeBlock
              code={`go build ./...
# cmd/server/bad.go:6:11: s.nextID undefined (cannot refer to unexported field nextID)`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              もう1段広い単位の制限が
              <code className={CODE_CLASS}>internal</code>
              ディレクトリです。
              <code className={CODE_CLASS}>internal/</code>
              の下のパッケージは、
              <code className={CODE_CLASS}>internal</code>
              の親ディレクトリ以下からしかimportできません。 別のモジュールが
              <code className={CODE_CLASS}>example.com/app/internal/store</code>
              をimportすると、ビルドの時点で止まります。
            </p>
            <CodeBlock
              code={`# 別モジュール（example.com/other）からimportした場合
go build .
# package example.com/other
# 	main.go:6:2: use of internal package example.com/app/internal/store not allowed`}
              language="bash"
              title="internalの外からのimport"
            />
            <InfoBox type="info" title="ディレクトリ構成は小さく始める">
              <p>
                アプリケーションなら、実行ファイルの入口を
                <code className={CODE_CLASS}>cmd/名前/</code>
                に、外へ公開しないコードを
                <code className={CODE_CLASS}>internal/</code>
                に置く形で十分に回ります。入口が1つだけならルートに
                <code className={CODE_CLASS}>main.go</code>
                を置く形も一般的です。
                ネットで見かける深いディレクトリ構成のテンプレートは公式の決まりではないので、パッケージが増えてから必要な分だけ分けます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              依存を追加する：go getとgo.sum
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              外部のモジュールは
              <code className={CODE_CLASS}>go get</code>
              で追加します。ここではUUIDを作るモジュールを入れてみます（ダウンロードにネットワーク接続が要ります）。
            </p>
            <CodeBlock
              code={`go get github.com/google/uuid@v1.6.0
# go: downloading github.com/google/uuid v1.6.0
# go: added github.com/google/uuid v1.6.0`}
              language="bash"
              title="依存の追加"
            />
            <CodeBlock
              code={`module example.com/app

go 1.24.7

require github.com/google/uuid v1.6.0 // indirect`}
              language="text"
              title="go.mod（追加直後）"
            />
            <CodeBlock
              code={`github.com/google/uuid v1.6.0 h1:NIvaJDMOsjHA8n1jAhLSgzrAzy1Hgr+hNrb57e+94F0=
github.com/google/uuid v1.6.0/go.mod h1:TIyPZe4MgqvfeYDBFedMoGGpEw/LqOeaOT+nhxU+yHo=`}
              language="text"
              title="go.sum"
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className={CODE_CLASS}>require</code>
              に依存とバージョンが入り、
              <code className={CODE_CLASS}>go.sum</code>
              にはその中身のハッシュが記録されます。
              次回以降のダウンロードでハッシュが合わなければ
              <code className={CODE_CLASS}>go</code>
              コマンドはビルドを止めるので、途中で中身がすり替わっていないことを確かめられます。
              go.modとgo.sumはどちらもGitにコミットします。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={CODE_CLASS}>// indirect</code>
              は「まだコードからimportされていない」という印です。コードで使ってから
              <code className={CODE_CLASS}>go mod tidy</code>
              を実行すると、印が外れます。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"

	"example.com/app/internal/store"
	"github.com/google/uuid"
)

func main() {
	s := store.New()
	s.Add("牛乳を買う")
	s.Add("Goを学ぶ")
	fmt.Println("件数:", s.Count())
	fmt.Println("リクエストID:", uuid.NewString())
}`}
              language="go"
              title="cmd/server/main.go（依存を使う）"
            />
            <CodeBlock
              code={`go mod tidy
go run ./cmd/server
# 件数: 2
# リクエストID: 4d7ac91e-f1bb-40d3-b6ad-64708dfcb51a（実行するたびに変わる）`}
              language="bash"
              title="go mod tidyと実行"
            />
            <CodeBlock
              code={`module example.com/app

go 1.24.7

require github.com/google/uuid v1.6.0`}
              language="text"
              title="go.mod（tidy後）"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className={CODE_CLASS}>go mod tidy</code>
              はコードのimportを読み、足りない依存を追加し、使われていない依存をgo.modとgo.sumから取り除きます。
              importを書き換えたら実行する、と覚えておけば十分です。
            </p>

            <div className="overflow-x-auto rounded-xl border border-border mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th scope="col" className={TH_CLASS}>
                      やりたいこと
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      npm
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      Go
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {NPM_COMPARISON.map((row, i) => (
                    <tr
                      key={row.task}
                      className={
                        i < NPM_COMPARISON.length - 1
                          ? "border-b border-border"
                          : undefined
                      }
                    >
                      <td className={TD_CLASS}>{row.task}</td>
                      <td className={TD_CLASS}>
                        <code className={TABLE_CODE_CLASS}>{row.npm}</code>
                      </td>
                      <td className={TD_CLASS}>
                        <code className={TABLE_CODE_CLASS}>{row.go}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox
              type="warning"
              title="仕様は「最小バージョン」、実測は全体で1つの版"
            >
              <p>
                <code className={CODE_CLASS}>require</code>
                に書く版は「この版以上が要る」という最小要件です。npmの
                <code className={CODE_CLASS}>^1.2.3</code>
                のような範囲指定はなく、依存ツリー全体の要件のうち最も高い版がビルドに使われます（Minimal
                Version Selection）。
                そのため、go.modに書いた版と実際に使われる版がずれることがあります。理由は、別の依存がより新しい版を要求しているためです。
                実際の版は
                <code className={CODE_CLASS}>go list -m all</code>
                で確認できます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              整形とチェック：gofmt・go vet・goimports
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Goのコードの書式は
              <code className={CODE_CLASS}>gofmt</code>
              が決めます。インデントはタブ、括弧の位置も固定で、
              <strong className="text-foreground">設定項目がありません</strong>
              。Prettierの設定をチームで調整する、といった議論そのものが起きない設計です。
              <code className={CODE_CLASS}>gofmt -l</code>
              は整形が必要なファイル名を、
              <code className={CODE_CLASS}>gofmt -d</code>
              は差分を表示します。
            </p>
            <CodeBlock
              code={`gofmt -d fmtdemo.go
# --- fmtdemo.go.orig
# +++ fmtdemo.go
# @@ -1,6 +1,8 @@
#  package main
# +
#  import "fmt"
# -func main(){
# -x:=1
# -  fmt.Println( x )
# +
# +func main() {
# +	x := 1
# +	fmt.Println(x)
#  }

gofmt -w .   # ディレクトリ以下を上書きで整形する
go fmt ./... # パッケージ単位で同じことを行う`}
              language="bash"
              title="gofmt"
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className={CODE_CLASS}>go vet</code>
              は、コンパイルは通るものの誤りである可能性が高いコードを報告します。
              代表例はPrintfの書式指定子と引数の型の不一致です。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	count := 3
	fmt.Printf("件数: %s\\n", count)
}`}
              language="go"
              title="main.go（誤りを含む）"
            />
            <CodeBlock
              code={`go run .
# 件数: %!s(int=3)

go vet .
# ./main.go:7:2: fmt.Printf format %s has arg count of wrong type int`}
              language="bash"
              title="実行とgo vet"
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              実行はできてしまい、出力が崩れるだけなので気づきにくい誤りです。
              <code className={CODE_CLASS}>go test</code>
              はテストの前に
              <code className={CODE_CLASS}>go vet</code>
              の一部の検査を自動で走らせますが、CIでは
              <code className={CODE_CLASS}>go vet ./...</code>
              を単独でも実行しておくと確実です。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={CODE_CLASS}>goimports</code>
              はgofmtの整形に加えて、使っている標準パッケージのimportを足し、使っていないimportを消します。
              エディタの保存時に実行する設定にしておくと、STEP
              2で見た「使っていないimportはコンパイルエラー」に手で対応する場面がほぼなくなります。
            </p>
            <CodeBlock
              code={`package main

func main() {
	fmt.Println(strings.ToUpper("go"))
}`}
              language="go"
              title="gi.go（importを書いていない）"
            />
            <CodeBlock
              code={`goimports gi.go
# package main
#
# import (
# 	"fmt"
# 	"strings"
# )
#
# func main() {
# 	fmt.Println(strings.ToUpper("go"))
# }`}
              language="bash"
              title="goimportsの出力"
            />

            <div className="overflow-x-auto rounded-xl border border-border mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th scope="col" className={TH_CLASS}>
                      ツール
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      役割
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      TypeScriptでは
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {TOOLS.map((row, i) => (
                    <tr
                      key={row.command}
                      className={
                        i < TOOLS.length - 1
                          ? "border-b border-border"
                          : undefined
                      }
                    >
                      <td className={TD_CLASS}>
                        <code className={TABLE_CODE_CLASS}>{row.command}</code>
                      </td>
                      <td className={TD_CLASS}>{row.role}</td>
                      <td className={TD_CLASS}>{row.ts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              go docで読み、go installでCLIを入れる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              宣言の直前に書いたコメントは、そのままドキュメントになります。
              慣習として「名前＋説明」の形で書き始めます。
              <code className={CODE_CLASS}>go doc</code>
              で、自分のパッケージも標準ライブラリも同じ形式で読めます。
            </p>
            <CodeBlock
              code={`go doc ./internal/store
# package store // import "example.com/app/internal/store"
#
# Package storeはTODOをメモリ上に保持する。
#
# type Store struct{ ... }
#     func New() *Store
# type Todo struct{ ... }

go doc ./internal/store Store.Add
# package store // import "example.com/app/internal/store"
#
# func (s *Store) Add(title string) int
#     AddはTODOを追加して、振ったIDを返す。

go doc strings.TrimSpace
# package strings // import "strings"
#
# func TrimSpace(s string) string
#     TrimSpace returns a slice of the string s, with all leading and trailing
#     white space removed, as defined by Unicode.`}
              language="bash"
              title="go doc"
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              公開されているモジュールのドキュメントは、同じ内容がpkg.go.devにも載ります。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Goで書かれたCLIツールは
              <code className={CODE_CLASS}>go install</code>
              でソースからビルドして入れます。
              <code className={CODE_CLASS}>@</code>
              の後ろにはバージョンか
              <code className={CODE_CLASS}>latest</code>
              を指定します。できた実行ファイルは
              <code className={CODE_CLASS}>$(go env GOPATH)/bin</code>
              （既定では
              <code className={CODE_CLASS}>~/go/bin</code>
              ）に置かれるので、このディレクトリをPATHに入れておきます。
            </p>
            <CodeBlock
              code={`go install golang.org/x/tools/cmd/goimports@latest

ls $(go env GOPATH)/bin
# goimports`}
              language="bash"
              title="goimportsを入れる"
            />
            <InfoBox type="info" title="go installはgo.modを変えない">
              <p>
                <code className={CODE_CLASS}>パス@バージョン</code>
                の形の
                <code className={CODE_CLASS}>go install</code>
                は、今いるモジュールのgo.modに依存を書き足しません。
                プロジェクトの依存を増やすのは
                <code className={CODE_CLASS}>go get</code>
                、道具を入れるのは
                <code className={CODE_CLASS}>go install</code>
                、と使い分けます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              チャレンジ
            </h2>
            <CodingChallenge
              title="internalのパッケージを使う"
              description="モジュールexample.com/appのcmd/server/main.goから、internal/storeパッケージを使ってTODOを1件追加し、件数を表示します。___ を埋めてください。"
              preview={false}
              previewType="terminal"
              initialCode={`package main

import (
	"fmt"

	"example.com/app/___/store"
)

func main() {
	s := store.___()
	s.___("牛乳を買う")
	fmt.Println("件数:", s.Count())
}`}
              answer={`package main

import (
	"fmt"

	"example.com/app/internal/store"
)

func main() {
	s := store.New()
	s.Add("牛乳を買う")
	fmt.Println("件数:", s.Count())
}`}
              hints={[
                "importパスはモジュールパスにディレクトリ名をつなげたものです。storeはinternalディレクトリの下にあります",
                "空のStoreを作る関数は大文字で始まるNewです",
                "TODOを追加するメソッドはAddです。小文字のaddだとパッケージの外から呼べません",
              ]}
              keywords={["internal", "New", "Add"]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="モジュールexample.com/appのinternal/store/store.goで定義した型Storeについて、cmd/server/main.goから使える名前は？"
              options={[
                { label: "nextID" },
                { label: "todos" },
                { label: "Count（メソッド）", correct: true },
                { label: "すべて読める" },
              ]}
              explanation="パッケージの外から使えるのは大文字で始まる名前だけです。nextIDとtodosは小文字なのでstoreパッケージの中でしか使えません。cmd/serverはinternalの親（モジュールのルート）以下にあるので、internal/storeのimport自体は許可されます。"
            />
            <Quiz
              question="go.sumの役割として正しいものは？"
              options={[
                { label: "使う依存のバージョン範囲を指定する" },
                {
                  label:
                    "ダウンロードした依存の中身のハッシュを記録し、改ざんや取り違えを検出する",
                  correct: true,
                },
                { label: "インストール済みのCLIツールを記録する" },
                { label: "生成物なのでGitにはコミットしない" },
              ]}
              explanation="使う版を決めるのはgo.modのrequireで、go.sumは各版の中身のハッシュを記録します。ハッシュが合わないとgoコマンドはビルドを止めます。go.modとgo.sumはどちらもコミットします。"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span
                    className="text-primary font-bold mt-0.5"
                    aria-hidden="true"
                  >
                    &#10003;
                  </span>
                  <span>
                    <strong>1ディレクトリが1パッケージ</strong>
                    。importパスは「モジュールパス＋ディレクトリ」
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="text-primary font-bold mt-0.5"
                    aria-hidden="true"
                  >
                    &#10003;
                  </span>
                  <span>
                    大文字で始まる名前が公開され、<strong>internal</strong>
                    の下は親ディレクトリ以下からしかimportできない
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="text-primary font-bold mt-0.5"
                    aria-hidden="true"
                  >
                    &#10003;
                  </span>
                  <span>
                    <strong>go get</strong>で依存を足し、
                    <strong>go mod tidy</strong>
                    でimportとgo.mod・go.sumを揃える
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="text-primary font-bold mt-0.5"
                    aria-hidden="true"
                  >
                    &#10003;
                  </span>
                  <span>
                    書式は<strong>gofmt</strong>
                    に任せ、<strong>go vet</strong>
                    で誤りを拾い、<strong>go doc</strong>で読む
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "How to Write Go Code",
                  url: "https://go.dev/doc/code",
                  description:
                    "モジュール・パッケージ・importパスの関係を説明する公式ドキュメント",
                },
                {
                  title: "Go Modules Reference",
                  url: "https://go.dev/ref/mod",
                  description:
                    "go.mod・go.sum・Minimal Version Selectionの仕様",
                },
                {
                  title: "Organizing a Go module",
                  url: "https://go.dev/doc/modules/layout",
                  description: "cmdやinternalを使った構成の公式ガイド",
                },
                {
                  title: "cmd/vet",
                  url: "https://pkg.go.dev/cmd/vet",
                  description: "go vetが行う検査の一覧",
                },
              ]}
            />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
