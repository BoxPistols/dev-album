import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

// 本文中のインラインコードの見た目をSetup.tsxに揃える
const INLINE_CODE = "bg-muted px-1 py-0.5 rounded text-xs";
const TH =
  "text-left px-4 py-3 font-semibold text-foreground border-b border-border";

export default function Interfaces() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 7</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          インターフェース
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Goのインターフェースは「このメソッドを持っていれば、この型として扱える」という約束です。
          implementsを書かずに満たせる点はTypeScriptの構造的型付けに似ていますが、判定に使うのはメソッドだけです。
          小さいインターフェースの使い方と、型アサーション、nilの扱いまでを確認します。
        </p>

        <WhyNowBox tags={["interface", "io.Reader", "any", "型スイッチ"]}>
          <p>
            標準ライブラリはio.Readerやerrorなどのインターフェースを軸に組み立てられています。
            次のSTEPのジェネリクスの「制約」もインターフェースで書き、STEP
            9のerrorもインターフェースです。ここで仕組みを押さえると、以降のページと標準ライブラリのドキュメントが読みやすくなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              暗黙の実装
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              インターフェースはメソッドのシグネチャを並べて定義します。
              ある型がそのメソッドをすべて持っていれば、宣言なしでそのインターフェースを満たします。
              Goには
              <code className={INLINE_CODE}>implements</code>
              というキーワード自体がありません。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"math"
)

type Shape interface {
	Area() float64
}

type Rect struct {
	W, H float64
}

func (r Rect) Area() float64 { return r.W * r.H }

type Circle struct {
	R float64
}

func (c Circle) Area() float64 { return math.Pi * c.R * c.R }

func printArea(s Shape) {
	fmt.Printf("%T: %.2f\\n", s, s.Area())
}

func main() {
	// implementsを書かなくても、Areaを持つのでShapeとして渡せる
	printArea(Rect{W: 3, H: 4})
	printArea(Circle{R: 1})

	shapes := []Shape{Rect{W: 1, H: 2}, Circle{R: 2}}
	total := 0.0
	for _, s := range shapes {
		total += s.Area()
	}
	fmt.Printf("合計: %.2f\\n", total)
}`}
              language="go"
              title="shape.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run shape.go
# main.Rect: 12.00
# main.Circle: 3.14
# 合計: 14.57`}
              language="bash"
              title="実行結果"
            />

            <div className="overflow-x-auto rounded-xl border border-border mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th scope="col" className={TH}>
                      観点
                    </th>
                    <th scope="col" className={TH}>
                      TypeScript
                    </th>
                    <th scope="col" className={TH}>
                      Go
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">宣言</td>
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>implements</code>
                      は任意（なくても構造が合えば通る）
                    </td>
                    <td className="px-4 py-3">宣言する構文がない</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">判定に使うもの</td>
                    <td className="px-4 py-3">プロパティとメソッドの形</td>
                    <td className="px-4 py-3">
                      メソッド集合だけ（フィールドは書けない）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">判定のタイミング</td>
                    <td className="px-4 py-3">
                      コンパイル時のみ（実行時には型が消える）
                    </td>
                    <td className="px-4 py-3">
                      コンパイル時。値は実行時も具体的な型を保持する
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">オブジェクトリテラル</td>
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>{"{ area: () => 1 }"}</code>
                      をそのまま渡せる
                    </td>
                    <td className="px-4 py-3">
                      メソッドを定義した名前付きの型が必要
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              インターフェース型の変数は、中に入っている具体的な型の情報を実行時も持ち続けます。
              上の
              <code className={INLINE_CODE}>%T</code>が
              <code className={INLINE_CODE}>main.Rect</code>
              と表示できたのはそのためで、後述の型アサーションもこの情報を使います。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              小さいインターフェース
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Goのインターフェースは、メソッド1〜2個の小さいものが好まれます。標準ライブラリの代表例が次の3つです。
            </p>
            <CodeBlock
              code={`// パッケージio
type Reader interface {
	Read(p []byte) (n int, err error)
}

type Writer interface {
	Write(p []byte) (n int, err error)
}

// パッケージfmt
type Stringer interface {
	String() string
}`}
              language="go"
              title="標準ライブラリの定義（抜粋）"
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              ファイル・ネットワーク接続・HTTPのボディ・文字列は、どれもio.Readerを満たします。
              そのため
              <code className={INLINE_CODE}>io.Copy</code>
              のような関数1つで、読み込み元と書き出し先の組み合わせをすべて扱えます。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

type Temperature float64

// fmt.StringerはString() stringだけを持つインターフェース
func (t Temperature) String() string {
	return fmt.Sprintf("%.1f℃", float64(t))
}

func main() {
	// strings.Readerはio.Reader、os.Stdoutはio.Writerを満たす
	var r io.Reader = strings.NewReader("hello, reader\\n")
	var w io.Writer = os.Stdout
	n, err := io.Copy(w, r)
	fmt.Println(n, err)

	// Printlnは引数がStringerならString()の結果を使う
	t := Temperature(21.5)
	fmt.Println(t)
}`}
              language="go"
              title="small.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run small.go
# hello, reader
# 14 <nil>
# 21.5℃`}
              language="bash"
              title="実行結果"
            />
            <InfoBox type="info" title="構造体以外にもメソッドを付けられる">
              <p>
                Temperatureはfloat64を基にした型です。Goでは、同じパッケージで定義した型であれば、構造体でなくてもメソッドを付けられます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              インターフェースは使う側で定義する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TypeScriptでは、実装する側が
              <code className={INLINE_CODE}>interface UserRepository</code>
              を用意してclassに
              <code className={INLINE_CODE}>implements</code>
              させる書き方が一般的です。Goでは逆に、提供する側は具体的な型を返し、
              <strong>
                使う側が自分に必要なメソッドだけのインターフェースを定義する
              </strong>
              のが慣習です。暗黙の実装なので、提供側のパッケージを変更せずに済みます。
            </p>
            <CodeBlock
              code={`package store

import "errors"

// 提供する側は具体的な型を返す（インターフェースを返さない）
type DB struct {
	users map[int]string
}

func New() *DB {
	return &DB{users: map[int]string{1: "Gopher"}}
}

func (d *DB) FindName(id int) (string, error) {
	name, ok := d.users[id]
	if !ok {
		return "", errors.New("not found")
	}
	return name, nil
}

func (d *DB) Save(id int, name string) {
	d.users[id] = name
}`}
              language="go"
              title="store/store.go"
              showLineNumbers
            />
            <CodeBlock
              code={`package main

import (
	"fmt"

	"example.com/i3/store"
)

// 使う側が、必要なメソッドだけのインターフェースを定義する
type UserFinder interface {
	FindName(id int) (string, error)
}

func greet(f UserFinder, id int) string {
	name, err := f.FindName(id)
	if err != nil {
		return "ゲストさん"
	}
	return name + "さん"
}

// テスト用の偽物も、同じメソッドを持てば渡せる
type fakeFinder struct{}

func (fakeFinder) FindName(id int) (string, error) { return "Fake", nil }

func main() {
	db := store.New()
	fmt.Println(greet(db, 1))
	fmt.Println(greet(db, 2))
	fmt.Println(greet(fakeFinder{}, 1))
}`}
              language="go"
              title="main.go（モジュール名はexample.com/i3）"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# Gopherさん
# ゲストさん
# Fakeさん`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              greetはSaveを使わないので、UserFinderにも含めません。
              必要なメソッドが少ないほど満たせる型が増え、テスト用の偽物も小さく書けます（STEP
              13のテストで使う考え方です）。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              any・型アサーション・型スイッチ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              メソッドを1つも持たない空のインターフェース
              <code className={INLINE_CODE}>interface{"{}"}</code>
              は、すべての型が満たします。Go 1.18からは別名の
              <code className={INLINE_CODE}>any</code>
              が使えます。ただしTypeScriptの
              <code className={INLINE_CODE}>any</code>
              と違い、中身をそのまま使うことはできません。
              <code className={INLINE_CODE}>unknown</code>
              と同じく、型を確かめてから取り出します。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func describe(v any) string {
	switch x := v.(type) {
	case int:
		return fmt.Sprintf("int: %d", x*2)
	case string:
		return fmt.Sprintf("string: %q", x)
	case fmt.Stringer:
		return "Stringer: " + x.String()
	case nil:
		return "nil"
	default:
		return fmt.Sprintf("その他: %T", x)
	}
}

func main() {
	var v any = "hello"

	// 型アサーション。okで成否を受け取る
	s, ok := v.(string)
	fmt.Println(s, ok)
	n, ok := v.(int)
	fmt.Println(n, ok) // 失敗するとゼロ値とfalse

	fmt.Println(describe(21))
	fmt.Println(describe("go"))
	fmt.Println(describe(nil))
	fmt.Println(describe(3.14))
}`}
              language="go"
              title="assert.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run assert.go
# hello true
# 0 false
# int: 42
# string: "go"
# nil
# その他: float64`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className={INLINE_CODE}>v.(T)</code>を
              <code className={INLINE_CODE}>ok</code>
              なしの1値で受けると、型が違ったときにpanic（実行時エラー）になります。確実に分かっている場面以外では
              <code className={INLINE_CODE}>v, ok := x.(T)</code>
              の形を使います。 型スイッチ
              <code className={INLINE_CODE}>switch x := v.(type)</code>
              は、TypeScriptで
              <code className={INLINE_CODE}>typeof</code>
              による絞り込みを並べる書き方に当たり、各caseの中でxがその型として使えます。
              caseにはfmt.Stringerのようなインターフェースも書けます。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              nilを入れたインターフェースはnilと一致しない
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              インターフェースの値は「具体的な型」と「値」の組です。
              <code className={INLINE_CODE}>== nil</code>
              が真になるのは、型も値も空のときだけです。
              nilのポインタをインターフェースに入れると「型は*MyError、値はnil」となり、nilとは比較で一致しません。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

type MyError struct{}

func (e *MyError) Error() string { return "my error" }

func find(fail bool) error {
	var p *MyError // nilポインタ
	if fail {
		p = &MyError{}
	}
	return p // 失敗していなくても、型付きのnilが返る
}

func findOK(fail bool) error {
	if fail {
		return &MyError{}
	}
	return nil // インターフェースのnilを直接返す
}

func main() {
	err := find(false)
	fmt.Println(err == nil)
	fmt.Printf("%T\\n", err)

	err = findOK(false)
	fmt.Println(err == nil)
}`}
              language="go"
              title="nil.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run nil.go
# false
# *main.MyError
# true`}
              language="bash"
              title="実行結果"
            />
            <InfoBox type="warning" title="errorを返す関数では、nilを直接返す">
              <p>
                findは失敗していないのに、呼び出し側の
                <code className={INLINE_CODE}>if err != nil</code>
                に入ってしまいます。
                戻り値の型がインターフェース（errorなど）の関数では、具体的な型の変数を経由せず、成功時は
                <code className={INLINE_CODE}>return nil</code>
                と書きます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ポインタレシーバとインターフェースの充足
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              STEP 6では、ポインタレシーバのメソッドも
              <code className={INLINE_CODE}>c.Inc()</code>
              と値から呼べました。ところがインターフェースの充足では、この自動変換が働きません。
              ポインタレシーバで定義したメソッドは、型Tではなく型*Tのメソッド集合にだけ含まれるためです。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

type Stringer interface {
	String() string
}

type Counter struct {
	n int
}

func (c *Counter) String() string {
	return fmt.Sprint(c.n)
}

func main() {
	var s Stringer = Counter{n: 1}
	fmt.Println(s)
}`}
              language="go"
              title="receiver.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run receiver.go
# ./receiver.go:18:19: cannot use Counter{…} (value of struct type Counter) as Stringer value in variable declaration: Counter does not implement Stringer (method String has pointer receiver)`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              エラーメッセージのとおり、Stringはポインタレシーバです。
              <code className={INLINE_CODE}>
                var s Stringer = &amp;Counter{"{n: 1}"}
              </code>
              とポインタを入れると通り、
              <code className={INLINE_CODE}>1</code>
              と表示されます。逆に値レシーバのメソッドは、Tと*Tのどちらのメソッド集合にも含まれます。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              チャレンジ
            </h2>
            <CodingChallenge
              title="Stringerを実装して取り出す"
              description="___ を埋めて、Money型にfmt.Stringerを実装し、「1200円」「2400円」と表示するプログラムを完成させてください。後半は型アサーションでMoneyを取り出します。"
              preview={false}
              previewType="terminal"
              initialCode={`package main

import "fmt"

type Money int

func (m Money) ___() string {
	return fmt.Sprintf("%d円", int(m))
}

func main() {
	var s fmt.Stringer = Money(1200)
	fmt.Println(s)

	if m, ___ := s.(___); ok {
		fmt.Println(m * 2)
	}
}`}
              answer={`package main

import "fmt"

type Money int

func (m Money) String() string {
	return fmt.Sprintf("%d円", int(m))
}

func main() {
	var s fmt.Stringer = Money(1200)
	fmt.Println(s)

	if m, ok := s.(Money); ok {
		fmt.Println(m * 2)
	}
}`}
              hints={[
                "fmt.Stringerが求めるメソッドの名前はStringです",
                "型アサーションの成否は2つ目の戻り値okで受け取ります",
                "取り出したい具体的な型の名前Moneyを丸括弧の中に書きます",
              ]}
              keywords={["String()", "ok :=", "s.(Money)"]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="型RectがインターフェースShapeを満たすために必要なものは？"
              options={[
                { label: "「type Rect struct implements Shape」と宣言する" },
                {
                  label: "Shapeが持つメソッドをすべてRectに定義する",
                  correct: true,
                },
                { label: "Shapeと同じフィールドをRectに持たせる" },
                { label: "Shapeを埋め込む" },
              ]}
              explanation="Goのインターフェースは暗黙に実装されます。宣言は不要で、インターフェースのメソッドをすべて持っていれば満たします。判定にフィールドは使いません。"
            />
            <Quiz
              question="nilの「var p *MyError」をerrorとして返したとき、呼び出し側の「err == nil」は？"
              options={[
                { label: "true" },
                { label: "false", correct: true },
                { label: "コンパイルエラー" },
                { label: "panicする" },
              ]}
              explanation="インターフェースの値は型と値の組です。型*MyErrorが入っているため、値がnilでもインターフェースとしてはnilではありません。成功時はreturn nilと直接書きます。"
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
                    メソッドをすべて持てば<strong>暗黙に実装</strong>
                    される。判定に使うのは<strong>メソッド集合</strong>だけ
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
                    io.Reader・io.Writer・fmt.Stringerのような
                    <strong>小さいインターフェース</strong>を、
                    <strong>使う側で定義</strong>する
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
                    <strong>any</strong>の中身は
                    <strong>v, ok := x.(T)</strong>
                    や型スイッチで確かめてから使う
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
                    型付きnilを入れたインターフェースは
                    <strong>nilではない</strong>
                    。ポインタレシーバのメソッドは<strong>*T</strong>だけが持つ
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "A Tour of Go: Interfaces",
                  url: "https://go.dev/tour/methods/9",
                  description: "インターフェースと型アサーションの公式ツアー",
                },
                {
                  title: "Effective Go: Interfaces and other types",
                  url: "https://go.dev/doc/effective_go#interfaces_and_types",
                  description: "小さいインターフェースと型スイッチの考え方",
                },
                {
                  title: "Go FAQ: Why is my nil error value not equal to nil?",
                  url: "https://go.dev/doc/faq#nil_error",
                  description: "型付きnilがnilと一致しない理由の公式解説",
                },
                {
                  title: "Package io",
                  url: "https://pkg.go.dev/io",
                  description: "io.Readerとio.Writerの定義と関連関数",
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
