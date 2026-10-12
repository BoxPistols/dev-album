import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

export default function Setup() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 2</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          環境構築とHello World
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Goをインストールし、モジュールを作ってHello
          Worldを実行します。npmとpackage.jsonに当たる仕組みも、ここで一緒に確認します。
        </p>

        <WhyNowBox tags={["go mod", "go run", "go build"]}>
          <p>
            GoはNode.jsと違い、コンパイラ・フォーマッタ・テストランナー・依存管理が
            <code className="bg-muted px-1 py-0.5 rounded text-xs">go</code>
            コマンド1つにまとまっています。
            最初にこのコマンドの使い方を押さえると、以降のページのコードをすべて手元で動かせます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Goをインストールする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              公式サイトのダウンロードページから、OSに合うインストーラーを入れます。macOSならHomebrewでも入ります。
              入ったら
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                go version
              </code>
              で確認します。
            </p>
            <CodeBlock
              code={`# macOS（Homebrew）
brew install go

# インストールできたか確認する
go version
# go version go<版> <OS>/<CPU>の形で出る`}
              language="bash"
              title="インストールと確認"
            />

            <InfoBox type="info" title="エディタの設定">
              <p>
                VS
                CodeならGoチームが提供する拡張機能「Go」を入れます。補完や定義ジャンプは言語サーバーのgoplsが担い、保存時の整形もこの拡張機能が行います。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              モジュールを作る
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Goのプロジェクトは「モジュール」単位で管理します。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                go mod init
              </code>
              にモジュールのパスを渡すと、 package.jsonに当たる
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                go.mod
              </code>
              ができます。 パスは公開するならリポジトリのURL（
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                github.com/you/hello
              </code>
              ）、手元で試すだけなら
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                example.com/hello
              </code>
              のような名前で構いません。
            </p>
            <CodeBlock
              code={`mkdir hello && cd hello
go mod init example.com/hello
# go: creating new go.mod: module example.com/hello`}
              language="bash"
              title="モジュールの作成"
            />
            <CodeBlock
              code={`module example.com/hello

go <go mod initを実行したGoの版>`}
              language="text"
              title="go.mod"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">go</code>
              の行は、このモジュールが前提とするGoのバージョンです。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                go mod init
              </code>
              は手元のGoのバージョンを書き込みます。 依存を追加すると
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                require
              </code>
              の行と、ロックファイルに当たる
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                go.sum
              </code>
              が増えます（STEP 12で扱います）。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Hello Worldを書いて実行する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              同じディレクトリに
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                main.go
              </code>
              を作ります。 実行できるプログラムは
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                package main
              </code>
              に置き、
              <code className="bg-muted px-1 py-0.5 rounded text-xs">main</code>
              関数から始まります。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	name := "Gopher"
	fmt.Println("Hello,", name)
	fmt.Printf("%sさん、ようこそ\\n", name)
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# Hello, Gopher
# Gopherさん、ようこそ`}
              language="bash"
              title="実行"
            />

            <div className="overflow-x-auto rounded-xl border border-border mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th
                      scope="col"
                      className="text-left px-4 py-3 font-semibold text-foreground border-b border-border"
                    >
                      コード
                    </th>
                    <th
                      scope="col"
                      className="text-left px-4 py-3 font-semibold text-foreground border-b border-border"
                    >
                      意味
                    </th>
                    <th
                      scope="col"
                      className="text-left px-4 py-3 font-semibold text-foreground border-b border-border"
                    >
                      TypeScriptでは
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        package main
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      このファイルが属するパッケージ。実行ファイルになるのはmainだけ
                    </td>
                    <td className="px-4 py-3">
                      相当するものはない（ファイル＝モジュール）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        import "fmt"
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      標準ライブラリの書式付き入出力パッケージを読み込む
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        import
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        name := "Gopher"
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      型を推論して変数を宣言し、代入する（関数の中だけで使える）
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        let name = "Gopher"
                      </code>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        fmt.Println
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      大文字で始まる名前はパッケージの外へ公開される
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        export
                      </code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="ブラウザで試す">
              <p>
                手元に環境がなくても、公式のGo
                Playground（go.dev/play）にコードを貼れば実行できます。1ファイルで完結するコード例はPlaygroundでも動きます。
                -raceを使う例、複数のパッケージや外部モジュールを使う例、手元のファイルを読む例、STEP 14のサーバーは手元で実行します。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ビルドして単一のバイナリを作る
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                go run
              </code>
              は一時ディレクトリでビルドしてから実行します。
              配布用の実行ファイルは
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                go build
              </code>
              で作ります。
              できたファイルは依存をすべて含むので、実行する側にGoやnode_modulesは要りません。
            </p>
            <CodeBlock
              code={`go build        # 実行ファイルhelloができる（名前はモジュールパスの末尾）
./hello
# Hello, Gopher

# 環境変数でOSとCPUを指定すると、別の環境向けにビルドできる
GOOS=windows GOARCH=amd64 go build   # hello.exeができる
GOOS=linux GOARCH=arm64 go build`}
              language="bash"
              title="ビルドとクロスコンパイル"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              使っていないものはコンパイルエラーになる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TypeScriptではリンターの警告で済む「使っていないimport」と「使っていないローカル変数」が、Goではコンパイルエラーです。
              書きかけのコードを動かそうとして最初につまずきやすい点なので、先に知っておくと慌てずに済みます。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"os"
)

func main() {
	count := 10
	fmt.Println("hi")
}`}
              language="go"
              title="unused.go"
            />
            <CodeBlock
              code={`go run unused.go
# ./unused.go:5:2: "os" imported and not used
# ./unused.go:9:2: declared and not used: count`}
              language="bash"
              title="実行結果"
            />
            <InfoBox type="success" title="一時的に残したいとき">
              <p>
                変数は
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  _ = count
                </code>
                のようにブランク識別子へ代入すると、使ったことになります。
                importはエディタの保存時整形（goimports）が自動で足し引きするので、手で管理する場面は多くありません。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              チャレンジ
            </h2>
            <CodingChallenge
              title="名前と年齢を表示する"
              description="___ を埋めて、「Gopherは16歳です」と表示するプログラムを完成させてください。文字列の書式指定は%s、整数は%dです。"
              preview={false}
              previewType="terminal"
              initialCode={`package main

import "___"

func main() {
	name := "Gopher"
	age := 16
	fmt.Printf("___は___歳です\\n", name, age)
}`}
              answer={`package main

import "fmt"

func main() {
	name := "Gopher"
	age := 16
	fmt.Printf("%sは%d歳です\\n", name, age)
}`}
              hints={[
                "Printfを持つ標準パッケージの名前はfmtです",
                "文字列を埋め込む書式指定子は%sです",
                "整数を埋め込む書式指定子は%dです",
              ]}
              keywords={['"fmt"', "%s", "%d"]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="package.jsonに当たる、モジュールの名前と依存を記録するファイルは？"
              options={[
                { label: "go.sum" },
                { label: "go.mod", correct: true },
                { label: "main.go" },
                { label: "go.work" },
              ]}
              explanation="go.modにモジュールのパス・前提とするGoのバージョン・依存（require）を書きます。go.sumは依存の中身のハッシュを記録するファイルで、ロックファイルに近い役割です。"
            />
            <Quiz
              question="使っていないローカル変数があるとき、Goはどう扱う？"
              options={[
                { label: "警告を出して実行する" },
                { label: "何も言わずに実行する" },
                { label: "コンパイルエラーにする", correct: true },
                { label: "自動で削除する" },
              ]}
              explanation="Goでは使っていないローカル変数とimportはコンパイルエラーです。_ に代入すると「使った」ことになります。"
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
                    <strong>go mod init</strong>
                    でモジュールを作り、go.modで名前とGoのバージョンを管理する
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
                    実行できるプログラムは<strong>package main</strong>の
                    <strong>main関数</strong>から始まる
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
                    <strong>go run</strong>で実行、<strong>go build</strong>
                    で依存込みの単一バイナリを作る
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
                    大文字で始まる名前が公開され、使っていない変数とimportはコンパイルエラーになる
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Download and install",
                  url: "https://go.dev/doc/install",
                  description: "公式のインストール手順",
                },
                {
                  title: "Tutorial: Get started with Go",
                  url: "https://go.dev/doc/tutorial/getting-started",
                  description:
                    "go mod initからHello Worldまでの公式チュートリアル",
                },
                {
                  title: "A Tour of Go",
                  url: "https://go.dev/tour/",
                  description: "ブラウザで文法を一通り試せる公式ツアー",
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
