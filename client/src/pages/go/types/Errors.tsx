import type { ReactNode } from "react";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

// 本文中のインラインコード。Setup.tsxと同じ見た目にそろえる
function Code({ children }: { children: ReactNode }) {
  return (
    <code className="bg-muted px-1 py-0.5 rounded text-xs">{children}</code>
  );
}

const TH_CLASS =
  "text-left px-4 py-3 font-semibold text-foreground border-b border-border";

export default function Errors() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 9</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          エラーハンドリング
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Goには例外の仕組み（try/catch）がなく、エラーは関数の戻り値として返します。
          このページでは、エラーの作り方・包み方・見分け方と、panicを使う場面を確認します。
        </p>

        <WhyNowBox tags={["error", "errors.Is", "errors.As", "%w"]}>
          <p>
            Goのコードを読むと、<Code>if err != nil</Code>
            が何度も出てきます。
            これは例外を投げる代わりに、失敗を値として呼び出し元へ渡しているためです。
            書き方の型を押さえると、標準ライブラリやほかの人のコードが読みやすくなり、次の並行処理のページでもそのまま使えます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              エラーは値として返す
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Goのエラーは、組み込みの<Code>error</Code>
              インターフェースを満たす値です。 中身は「エラーメッセージを返す
              <Code>Error()</Code>
              メソッドを持つ」という1つの約束だけです。
            </p>
            <CodeBlock
              code={`type error interface {
	Error() string
}`}
              language="go"
              title="組み込みのerror型（定義）"
            />
            <p className="text-muted-foreground my-4 leading-relaxed">
              失敗しうる関数は、最後の戻り値で<Code>error</Code>
              を返します。成功したときは<Code>nil</Code>
              です。呼び出し側はすぐ<Code>if err != nil</Code>
              で確かめ、失敗なら処理を打ち切ります。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"strconv"
)

func main() {
	n, err := strconv.Atoi("42")
	if err != nil {
		fmt.Println("変換できませんでした:", err)
		return
	}
	fmt.Println(n + 1)

	_, err = strconv.Atoi("abc")
	if err != nil {
		fmt.Println("変換できませんでした:", err)
		return
	}
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# 43
# 変換できませんでした: strconv.Atoi: parsing "abc": invalid syntax`}
              language="bash"
              title="実行結果"
            />

            <div className="overflow-x-auto rounded-xl border border-border mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th scope="col" className={TH_CLASS}>
                      観点
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      TypeScript（try/catch）
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      Go（戻り値のerror）
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">失敗の伝え方</td>
                    <td className="px-4 py-3">
                      <Code>throw</Code>で呼び出し元をさかのぼる
                    </td>
                    <td className="px-4 py-3">
                      <Code>return</Code>で1段ずつ返す
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">失敗しうるかの見分け</td>
                    <td className="px-4 py-3">
                      シグネチャには現れない（JSDocや実装を読む）
                    </td>
                    <td className="px-4 py-3">
                      戻り値に<Code>error</Code>があれば失敗しうる
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">受け取った値の型</td>
                    <td className="px-4 py-3">
                      <Code>catch (e)</Code>の<Code>e</Code>は
                      <Code>unknown</Code>
                    </td>
                    <td className="px-4 py-3">
                      常に<Code>error</Code>インターフェース
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">処理し忘れ</td>
                    <td className="px-4 py-3">
                      catchがなければ上へ伝わり続ける
                    </td>
                    <td className="px-4 py-3">
                      確かめなければそのまま次の行へ進む
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="Promiseのrejectとの対応">
              <p>
                <Code>async</Code>
                関数の<Code>await</Code>
                が例外を投げるのに対し、Goの関数は結果とエラーを同時に返します。
                TypeScriptで
                <Code>{"{ ok: true, value } | { ok: false, error }"}</Code>
                のようなResult型を自作した経験があれば、それが言語の標準になっていると考えると近いです。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              エラーを作る・包む・見分ける
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              固定のメッセージなら<Code>errors.New</Code>
              、値を埋め込むなら<Code>fmt.Errorf</Code>
              でエラーを作ります。
              <Code>fmt.Errorf</Code>の書式に<Code>%w</Code>
              を使うと、元のエラーを内側に包んだまま文脈を足せます（ラップ）。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              包んだエラーは<Code>==</Code>
              では比べられないので、見分けるときは次の2つを使います。どちらも包まれた内側までたどって調べます。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>
                <Code>errors.Is(err, target)</Code>
                ：特定のエラー値と一致するものが含まれているか
              </li>
              <li>
                <Code>errors.As(err, &amp;target)</Code>
                ：特定の型のエラーが含まれていれば、targetに取り出す
              </li>
            </ul>
            <CodeBlock
              code={`package main

import (
	"errors"
	"fmt"
)

// センチネルエラー: 比較用にパッケージ変数として公開する
var ErrNotFound = errors.New("user not found")

// 独自エラー型: 追加の情報を持たせられる
type ValidationError struct {
	Field string
}

func (e *ValidationError) Error() string {
	return "invalid " + e.Field
}

func findUser(id int) (string, error) {
	if id <= 0 {
		return "", &ValidationError{Field: "id"}
	}
	if id != 1 {
		return "", ErrNotFound
	}
	return "Gopher", nil
}

func loadProfile(id int) (string, error) {
	name, err := findUser(id)
	if err != nil {
		// %wで包むと、元のエラーを後から取り出せる
		return "", fmt.Errorf("load profile %d: %w", id, err)
	}
	return name, nil
}

func main() {
	for _, id := range []int{1, 2, -1} {
		name, err := loadProfile(id)
		var ve *ValidationError
		switch {
		case err == nil:
			fmt.Println("ok:", name)
		case errors.Is(err, ErrNotFound):
			fmt.Println("見つからない:", err)
		case errors.As(err, &ve):
			fmt.Println("入力が不正:", ve.Field, "/", err)
		default:
			fmt.Println("想定外:", err)
		}
	}
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# ok: Gopher
# 見つからない: load profile 2: user not found
# 入力が不正: id / load profile -1: invalid id`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              独自エラー型は、<Code>Error() string</Code>
              メソッドを持つ構造体です。TypeScriptで
              <Code>class ValidationError extends Error</Code>
              を作り<Code>instanceof</Code>
              で見分けるのと同じ目的で、Goでは<Code>errors.As</Code>
              を使います。
            </p>

            <InfoBox type="warning" title="%vと%wの違い">
              <p>
                <Code>fmt.Errorf("...: %v", err)</Code>
                でもメッセージは同じになりますが、元のエラーは文字列に変わり、
                <Code>errors.Is</Code>や<Code>errors.As</Code>
                で取り出せなくなります。呼び出し元に見分けてほしいエラーは
                <Code>%w</Code>で包みます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              センチネルエラーとerrors.Join
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              上の<Code>ErrNotFound</Code>
              のように、比べるためにパッケージ変数として公開したエラーを「センチネルエラー」と呼びます。
              標準ライブラリの代表が<Code>io.EOF</Code>
              で、「もう読むものがない」という正常な終わりを表します。 名前は
              <Code>Err</Code>で始めるのが慣習です（
              <Code>io.EOF</Code>は例外的な名前）。
            </p>
            <CodeBlock
              code={`package main

import (
	"errors"
	"fmt"
	"io"
	"strings"
)

func main() {
	r := strings.NewReader("Go")
	for {
		b, err := r.ReadByte()
		if errors.Is(err, io.EOF) {
			fmt.Println("読み終わり")
			break
		}
		if err != nil {
			fmt.Println("読み込みエラー:", err)
			return
		}
		fmt.Println(string(b))
	}
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# G
# o
# 読み終わり`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground my-4 leading-relaxed">
              Go 1.20で追加された<Code>errors.Join</Code>
              は、複数のエラーを1つにまとめます。入力チェックのように、最初の失敗で止めずにすべての問題を返したいときに使います。
              まとめたエラーにも<Code>errors.Is</Code>
              がそのまま使えます。
            </p>
            <CodeBlock
              code={`package main

import (
	"errors"
	"fmt"
)

var (
	ErrNameEmpty = errors.New("name is empty")
	ErrAgeRange  = errors.New("age out of range")
)

func validate(name string, age int) error {
	var errs []error
	if name == "" {
		errs = append(errs, ErrNameEmpty)
	}
	if age < 0 || age > 150 {
		errs = append(errs, ErrAgeRange)
	}
	return errors.Join(errs...) // 要素がなければnilを返す
}

func main() {
	err := validate("", 200)
	fmt.Println(err)
	fmt.Println(errors.Is(err, ErrAgeRange))
	fmt.Println(validate("Gopher", 16) == nil)
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# name is empty
# age out of range
# true
# true`}
              language="bash"
              title="実行結果（Joinしたエラーは改行区切りで表示される）"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              エラーメッセージの慣習
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Goのエラーは、ラップされて
              <Code>load profile 2: user not found</Code>
              のように前へつながっていきます。
              途中で大文字や句点が混ざると読みにくいため、メッセージは小文字で始め、末尾に句読点を付けないのが慣習です。
              静的解析ツールのstaticcheckも、この形から外れたメッセージを指摘します。
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th scope="col" className={TH_CLASS}>
                      書き方
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      理由
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <Code>errors.New("user not found")</Code>
                    </td>
                    <td className="px-4 py-3">
                      小文字始まり・句読点なし。ラップされても自然につながる
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <Code>fmt.Errorf("load profile %d: %w", id, err)</Code>
                    </td>
                    <td className="px-4 py-3">
                      「何をしていて失敗したか」を前に足し、コロンで区切る
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <Code>errors.New("Failed.")</Code>
                    </td>
                    <td className="px-4 py-3">
                      避ける。つなげると「load profile 2:
                      Failed.」のように途中で文が切れる
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              エラーを握りつぶさない・panicは回復不能なときだけ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              戻り値のエラーは、確かめなくてもコンパイルが通ります。
              <Code>_</Code>
              で捨てると失敗に気づけないまま先へ進むので、扱うか、文脈を足して呼び出し元へ返します。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"os"
)

func main() {
	// 悪い例: エラーを_で捨てると、失敗しても気づけない
	data, _ := os.ReadFile("config.json")
	fmt.Println(len(data))

	// よい例: 扱うか、文脈を足して呼び出し元へ返す
	data, err := os.ReadFile("config.json")
	if err != nil {
		fmt.Println("設定を読めませんでした:", err)
		return
	}
	fmt.Println(len(data))
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .   # config.jsonがないディレクトリで実行
# 0
# 設定を読めませんでした: open config.json: no such file or directory`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground my-4 leading-relaxed">
              <Code>panic</Code>
              はプログラムをその場で止める仕組みで、例外のように通常のエラー処理には使いません。
              使うのは、範囲外アクセスのようなプログラム自体のバグや、起動時の設定が壊れていて続けても意味がない場合です。
              標準ライブラリの<Code>regexp.MustCompile</Code>
              のように、<Code>Must</Code>
              で始まる関数は失敗時にpanicします。ソースに埋め込んだ定数を渡す場面に限って使います。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"regexp"
)

// 正規表現はプログラムに埋め込んだ定数なので、間違いはバグ。起動時に止めてよい
var validID = regexp.MustCompile(\`^[a-z]+[0-9]+$\`)

func main() {
	fmt.Println(validID.MatchString("go124"))
	fmt.Println(validID.MatchString("Go"))

	nums := []int{1, 2, 3}
	i := 5
	fmt.Println(nums[i]) // 範囲外アクセスはランタイムがpanicを起こす
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# true
# false
# panic: runtime error: index out of range [5] with length 3
#
# goroutine 1 [running]:
# main.main()
# 	.../main.go:17 +0x11e
# exit status 2`}
              language="bash"
              title="実行結果（パスと+0x...の値は環境によって変わる）"
            />
            <InfoBox type="info" title="recoverについて">
              <p>
                <Code>defer</Code>の中で<Code>recover()</Code>
                を呼ぶと、panicを止めて処理を続けられます。HTTPサーバーが1つのリクエストのpanicでプロセスごと落ちないようにする、といった枠組み側の用途が中心で、アプリケーションのエラー処理には戻り値の
                <Code>error</Code>を使います。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              チャレンジ
            </h2>
            <CodingChallenge
              title="エラーを包んで見分ける"
              description="___ を埋めて、parseが返したErrEmptyに文脈を足して返し、mainでErrEmptyかどうかを見分けるプログラムを完成させてください。出力は「run: empty input」「入力が空です」の2行です。"
              preview={false}
              previewType="terminal"
              initialCode={`package main

import (
	"errors"
	"fmt"
)

var ErrEmpty = errors.New("empty input")

func parse(s string) error {
	if s == "" {
		return ErrEmpty
	}
	return ___
}

func run(s string) error {
	if err := parse(s); err != nil {
		return fmt.Errorf("run: ___", err)
	}
	return nil
}

func main() {
	err := run("")
	fmt.Println(err)
	if ___(err, ErrEmpty) {
		fmt.Println("入力が空です")
	}
}`}
              answer={`package main

import (
	"errors"
	"fmt"
)

var ErrEmpty = errors.New("empty input")

func parse(s string) error {
	if s == "" {
		return ErrEmpty
	}
	return nil
}

func run(s string) error {
	if err := parse(s); err != nil {
		return fmt.Errorf("run: %w", err)
	}
	return nil
}

func main() {
	err := run("")
	fmt.Println(err)
	if errors.Is(err, ErrEmpty) {
		fmt.Println("入力が空です")
	}
}`}
              hints={[
                "元のエラーを内側に残したまま包む書式指定子は%wです",
                "特定のエラー値が含まれているかを調べる関数はerrors.Isです",
                "失敗していないときの戻り値はnilです",
              ]}
              keywords={["%w", "errors.Is", "nil"]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question={
                'fmt.Errorf("save: %w", err) で包んだエラーから、元のエラーがErrNotFoundかどうかを調べる正しい方法は？'
              }
              options={[
                { label: "err == ErrNotFound" },
                { label: "errors.Is(err, ErrNotFound)", correct: true },
                { label: 'strings.Contains(err.Error(), "not found")' },
                { label: "errors.As(err, ErrNotFound)" },
              ]}
              explanation="errors.Isは%wで包まれた内側までたどって比べます。==は外側の値しか比べないので、包んだ後はfalseになります。メッセージの文字列で判定すると、文言を変えたときに壊れます。"
            />
            <Quiz
              question="Goでpanicを使うのがふさわしい場面は？"
              options={[
                { label: "ユーザーが入力した値が不正だったとき" },
                { label: "ファイルが見つからなかったとき" },
                {
                  label: "ソースに埋め込んだ正規表現が文法的に誤っていたとき",
                  correct: true,
                },
                { label: "APIがタイムアウトしたとき" },
              ]}
              explanation="入力の不正・ファイルがない・タイムアウトは起こりうる失敗なので、errorを返して呼び出し元に判断を任せます。ソースに書いた定数の誤りはプログラムのバグなので、regexp.MustCompileのように起動時にpanicで止めて構いません。"
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
                    エラーは<strong>error</strong>
                    インターフェースの値。最後の戻り値で返し、
                    <strong>if err != nil</strong>で確かめる
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
                    <strong>fmt.Errorf</strong>の<strong>%w</strong>
                    で文脈を足して包み、<strong>errors.Is</strong>（値）と
                    <strong>errors.As</strong>（型）で見分ける
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
                    比べるためのエラーはErrで始まる変数で公開し、複数のエラーは
                    <strong>errors.Join</strong>（Go 1.20）でまとめる
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
                    メッセージは小文字始まり・句読点なし。エラーは捨てず、
                    <strong>panic</strong>は回復できないバグに限る
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Package errors",
                  url: "https://pkg.go.dev/errors",
                  description: "errors.New・Is・As・Joinの公式リファレンス",
                },
                {
                  title: "Working with Errors in Go 1.13",
                  url: "https://go.dev/blog/go1.13-errors",
                  description:
                    "%wによるラップとIs/Asの導入を解説した公式ブログ",
                },
                {
                  title: "Effective Go: Errors",
                  url: "https://go.dev/doc/effective_go#errors",
                  description: "エラーとpanic/recoverの使い分け",
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
