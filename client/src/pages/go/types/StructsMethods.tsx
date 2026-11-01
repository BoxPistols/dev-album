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

export default function StructsMethods() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 6</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          構造体とメソッド
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Goにclassはありません。データは構造体（struct）にまとめ、振る舞いはメソッドとして型に結び付けます。
          TypeScriptのオブジェクトとの最大の違いである「代入すると値がコピーされる」点と、ポインタの使い方をここで押さえます。
        </p>

        <WhyNowBox tags={["struct", "ポインタ", "メソッド", "埋め込み"]}>
          <p>
            次のSTEPで扱うインターフェースは「どのメソッドを持っているか」で型を判定します。
            その前提になるメソッドの定義方法と、値レシーバ・ポインタレシーバの違いを先に固めておくと、インターフェースの充足ルールがすんなり理解できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              構造体を定義して使う
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={INLINE_CODE}>type User struct {"{ ... }"}</code>
              で、名前付きのフィールドを持つ型を定義します。TypeScriptの
              <code className={INLINE_CODE}>
                type User = {"{ name: string }"}
              </code>
              に近いですが、Goでは型名を伴う値として生成します。
              値を作る構造体リテラルは、フィールド名を付けて書くのが慣習です。
              フィールド名を省いて定義順に並べる書き方もできますが、フィールドを追加したときに壊れやすいため避けます。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

type User struct {
	Name  string
	Age   int
	Admin bool
}

func main() {
	// フィールド名を付けて書く（推奨）
	u1 := User{Name: "Gopher", Age: 16}
	fmt.Printf("%+v\\n", u1)

	// 書かなかったフィールドはゼロ値になる
	var u2 User
	fmt.Printf("%+v\\n", u2)

	// フィールドへのアクセスはドット
	u1.Age++
	fmt.Println(u1.Name, u1.Age)
}`}
              language="go"
              title="struct.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run struct.go
# {Name:Gopher Age:16 Admin:false}
# {Name: Age:0 Admin:false}
# Gopher 17`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Goにはundefinedがなく、書かなかったフィールドは型ごとのゼロ値（数値は0、文字列は""、boolはfalse、ポインタ・スライス・マップはnil）で埋まります。
              <code className={INLINE_CODE}>%+v</code>
              はフィールド名付きで中身を表示する書式で、デバッグに便利です。
            </p>
            <InfoBox type="info" title="ゼロ値をそのまま使える設計">
              <p>
                標準ライブラリには、ゼロ値のままで使える型が多くあります（
                <code className={INLINE_CODE}>sync.Mutex</code>や
                <code className={INLINE_CODE}>bytes.Buffer</code>
                など）。自分で型を作るときも「ゼロ値で壊れないか」を意識すると、初期化忘れのバグを減らせます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              値のコピーとポインタ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TypeScriptのオブジェクトは参照なので、
              <code className={INLINE_CODE}>const b = a</code>
              のあとに
              <code className={INLINE_CODE}>b.x = 100</code>
              とするとaも変わります。Goの構造体は値なので、代入や関数への受け渡しで中身がまるごとコピーされます。
              呼び出し元の値を書き換えたいときは、
              <code className={INLINE_CODE}>&amp;</code>
              でアドレスを取ってポインタを渡します。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

type Point struct {
	X, Y int
}

func move(p Point) {
	p.X += 10
}

func movePtr(p *Point) {
	p.X += 10
}

func main() {
	a := Point{X: 1, Y: 2}
	b := a // 値がまるごとコピーされる
	b.X = 100
	fmt.Println(a, b)

	move(a) // コピーが渡るので、aは変わらない
	fmt.Println(a)

	movePtr(&a) // &でアドレスを渡すと、呼び出し元のaが変わる
	fmt.Println(a)

	p := &a  // pは*Point型
	p.Y = 50 // (*p).Yと書かなくてよい
	fmt.Println(a, *p)
}`}
              language="go"
              title="pointer.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run pointer.go
# {1 2} {100 2}
# {1 2}
# {11 2}
# {11 50} {11 50}`}
              language="bash"
              title="実行結果"
            />

            <div className="overflow-x-auto rounded-xl border border-border mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th scope="col" className={TH}>
                      書き方
                    </th>
                    <th scope="col" className={TH}>
                      意味
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>*Point</code>
                    </td>
                    <td className="px-4 py-3">「Pointへのポインタ」という型</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>&amp;a</code>
                    </td>
                    <td className="px-4 py-3">
                      変数aのアドレスを取り、ポインタを作る
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>*p</code>
                    </td>
                    <td className="px-4 py-3">
                      ポインタpが指す先の値を取り出す
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>p.X</code>
                    </td>
                    <td className="px-4 py-3">
                      構造体へのポインタは、フィールドアクセス時に自動で
                      <code className={INLINE_CODE}>(*p).X</code>
                      として扱われる
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox
              type="warning"
              title="スライスとマップはコピーしても中身を共有する"
            >
              <p>
                構造体のフィールドにスライスやマップがある場合、コピーされるのは「中身を指す情報」だけです。
                構造体をコピーしても、スライスの要素やマップのエントリは元と共有されます（STEP
                5の内容と同じ仕組みです）。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              メソッドと2種類のレシーバ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              メソッドは、関数名の前に「レシーバ」を書いて型に結び付けた関数です。classの中に書くのではなく、型の外に並べて定義します。
              レシーバには値（
              <code className={INLINE_CODE}>c Counter</code>
              ）とポインタ（
              <code className={INLINE_CODE}>c *Counter</code>
              ）の2種類があり、値レシーバはコピーを受け取るため、フィールドを書き換えても呼び出し元には反映されません。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

type Counter struct {
	name  string
	count int
}

// 値レシーバ: 読むだけのメソッド
func (c Counter) String() string {
	return fmt.Sprintf("%s=%d", c.name, c.count)
}

// ポインタレシーバ: フィールドを書き換えるメソッド
func (c *Counter) Inc() {
	c.count++
}

// 値レシーバで書き換えても、コピーが変わるだけ
func (c Counter) IncWrong() {
	c.count++
}

func main() {
	c := Counter{name: "clicks"}
	c.Inc() // (&c).Inc()と自動で解釈される
	c.Inc()
	c.IncWrong()
	fmt.Println(c.String())
}`}
              language="go"
              title="method.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run method.go
# clicks=2`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              IncWrongを呼んでもcountは2のままです。どちらのレシーバにするかは、次の基準で決めます。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                フィールドを書き換えるなら<strong>ポインタレシーバ</strong>
              </li>
              <li>
                構造体が大きく、コピーのコストを避けたいときも
                <strong>ポインタレシーバ</strong>
              </li>
              <li>
                小さく、書き換えない型（時刻や座標のような値）は
                <strong>値レシーバ</strong>
              </li>
              <li>
                1つの型の中では、どちらかに揃えるのが慣習。迷ったらポインタレシーバ
              </li>
            </ul>
            <InfoBox type="info" title="thisやselfは使わない">
              <p>
                レシーバ名は
                <code className={INLINE_CODE}>this</code>
                ではなく、型名の頭文字1〜2文字（Counterならc）にするのがGoの慣習です。
                TypeScriptのメソッドのように、
                <code className={INLINE_CODE}>this</code>
                の束縛が呼び出し方で変わる問題は起きません。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              コンストラクタ関数NewXxx
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Goには
              <code className={INLINE_CODE}>constructor</code>
              がありません。既定値の設定や入力の検証が必要なときは、
              <code className={INLINE_CODE}>New型名</code>
              という名前の普通の関数を用意するのが慣習です。
              検証に失敗しうるなら、STEP 4で見た複数戻り値でerrorも返します。
            </p>
            <CodeBlock
              code={`package main

import (
	"errors"
	"fmt"
)

type Server struct {
	host    string
	port    int
	timeout int
}

// NewServerは既定値を埋めたServerを返す
func NewServer(host string, port int) (*Server, error) {
	if port <= 0 {
		return nil, errors.New("portは1以上にしてください")
	}
	return &Server{host: host, port: port, timeout: 30}, nil
}

func (s *Server) Addr() string {
	return fmt.Sprintf("%s:%d", s.host, s.port)
}

func main() {
	s, err := NewServer("localhost", 8080)
	if err != nil {
		fmt.Println("エラー:", err)
		return
	}
	fmt.Println(s.Addr(), s.timeout)

	_, err = NewServer("localhost", 0)
	fmt.Println("エラー:", err)
}`}
              language="go"
              title="constructor.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run constructor.go
# localhost:8080 30
# エラー: portは1以上にしてください`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              フィールドを小文字で始めると、パッケージの外からは読み書きできません（TypeScriptの
              <code className={INLINE_CODE}>private</code>
              に近い役割）。外部のパッケージにNewServer経由での生成を促せるので、検証を通らない値が作られにくくなります。
              関数内のローカル変数のアドレスを返しても問題ありません。Goはその値をヒープに置くかどうかをコンパイラが判断します。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              埋め込みで機能を組み合わせる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Goには継承（
              <code className={INLINE_CODE}>extends</code>
              ）がありません。代わりに、構造体の中にフィールド名なしで別の型を書く「埋め込み」を使います。
              埋め込んだ型のフィールドとメソッドは外側の型へ「昇格」し、
              <code className={INLINE_CODE}>s.Log()</code>
              のように直接呼べます。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

type Logger struct {
	prefix string
}

func (l Logger) Log(msg string) {
	fmt.Println(l.prefix + msg)
}

type Service struct {
	Logger // 型名だけを書くと埋め込みになる
	name   string
}

func main() {
	s := Service{
		Logger: Logger{prefix: "[svc] "},
		name:   "users",
	}
	s.Log("started")         // s.Logger.Log("started")の省略形
	s.Logger.Log("explicit") // 明示的にも呼べる
	fmt.Println(s.prefix)    // フィールドも昇格する
}`}
              language="go"
              title="embed.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run embed.go
# [svc] started
# [svc] explicit
# [svc]`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              見た目は継承に似ていますが、仕組みは「委譲」です。
              <code className={INLINE_CODE}>s.Log()</code>は
              <code className={INLINE_CODE}>s.Logger.Log()</code>
              の省略形にすぎず、Logのレシーバは常にLoggerです。Logの中からServiceのフィールドは見えず、メソッドのオーバーライドによる多態もありません。
              ServiceはLogger型の変数には代入できない点も、継承との違いです（型として扱いを揃えたいときは、STEP
              7のインターフェースを使います）。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              構造体タグとclassとの対比
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              フィールドの後ろにバッククォートで書く文字列を「構造体タグ」と呼びます。
              <code className={INLINE_CODE}>encoding/json</code>
              などのパッケージがこれを読み取り、JSONのキー名や省略の有無を決めます。STEP
              14のJSON APIで本格的に使うので、ここでは形だけ確認します。
            </p>
            <CodeBlock
              code={`package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID       int    \`json:"id"\`
	Name     string \`json:"name"\`
	Email    string \`json:"email,omitempty"\`
	password string // 小文字のフィールドはJSONに出ない
}

func main() {
	u := User{ID: 1, Name: "Gopher", password: "secret"}
	b, _ := json.Marshal(u)
	fmt.Println(string(b))
}`}
              language="go"
              title="tag.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run tag.go
# {"id":1,"name":"Gopher"}`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className={INLINE_CODE}>omitempty</code>
              を付けたEmailはゼロ値（空文字）なので出力から省かれ、小文字のpasswordはパッケージ外のjsonから見えないため出力されません。
              ここまでの内容をTypeScriptのclassと並べると、次のようになります。
            </p>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th scope="col" className={TH}>
                      TypeScriptのclass
                    </th>
                    <th scope="col" className={TH}>
                      Go
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>
                        class User {"{ ... }"}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>
                        type User struct {"{ ... }"}
                      </code>
                      ＋型の外に書くメソッド
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>constructor</code>
                    </td>
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>NewUser</code>
                      関数（慣習）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>this</code>
                    </td>
                    <td className="px-4 py-3">
                      レシーバ（名前は自分で付ける）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>private</code> /{" "}
                      <code className={INLINE_CODE}>public</code>
                    </td>
                    <td className="px-4 py-3">
                      名前の先頭が小文字か大文字か（単位はパッケージ）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>extends</code>
                    </td>
                    <td className="px-4 py-3">なし。埋め込みで委譲する</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">インスタンスは参照で共有</td>
                    <td className="px-4 py-3">
                      構造体は値でコピー。共有するならポインタ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              チャレンジ
            </h2>
            <CodingChallenge
              title="口座に入金するメソッド"
              description="___ を埋めて、NewAccountで作った口座に2回入金し、「Gopherの残高: 800円」と表示するプログラムを完成させてください。Depositはフィールドを書き換えるので、レシーバの種類に注意します。"
              preview={false}
              previewType="terminal"
              initialCode={`package main

import "fmt"

type Account struct {
	Owner   string
	Balance int
}

func NewAccount(owner string) *Account {
	return ___Account{Owner: owner}
}

func (a ___) Deposit(amount int) {
	a.Balance += amount
}

func main() {
	acc := NewAccount("Gopher")
	acc.Deposit(500)
	acc.Deposit(300)
	fmt.Printf("___の残高: %d円\\n", acc.Owner, acc.Balance)
}`}
              answer={`package main

import "fmt"

type Account struct {
	Owner   string
	Balance int
}

func NewAccount(owner string) *Account {
	return &Account{Owner: owner}
}

func (a *Account) Deposit(amount int) {
	a.Balance += amount
}

func main() {
	acc := NewAccount("Gopher")
	acc.Deposit(500)
	acc.Deposit(300)
	fmt.Printf("%sの残高: %d円\\n", acc.Owner, acc.Balance)
}`}
              hints={[
                "構造体リテラルの前に&を付けると、そのポインタが得られます",
                "フィールドを書き換えるメソッドは、レシーバを*Accountにします",
                "文字列を埋め込む書式指定子は%sです",
              ]}
              keywords={["&Account", "*Account", "%s"]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="「a := Point{X: 1}; b := a; b.X = 9」のあと、a.Xの値は？"
              options={[
                { label: "9" },
                { label: "1", correct: true },
                { label: "0" },
                { label: "コンパイルエラー" },
              ]}
              explanation="Goの構造体は値なので、b := aで中身がコピーされます。bを書き換えてもaは1のままです。共有したいときはb := &aのようにポインタを使います。"
            />
            <Quiz
              question="構造体のフィールドを書き換えるメソッドで使うレシーバは？"
              options={[
                { label: "値レシーバ（c Counter）" },
                { label: "ポインタレシーバ（c *Counter）", correct: true },
                { label: "どちらでも同じ結果になる" },
                { label: "レシーバを付けない" },
              ]}
              explanation="値レシーバはコピーを受け取るので、書き換えは呼び出し元に反映されません。フィールドを変更するメソッドはポインタレシーバにします。"
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
                    構造体リテラルは<strong>フィールド名付き</strong>
                    で書き、書かなかったフィールドは<strong>ゼロ値</strong>
                    になる
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
                    構造体は代入や引数で<strong>値がコピー</strong>
                    される。共有・変更したいときは<strong>&amp;</strong>
                    でポインタを渡す
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
                    書き換えるメソッドは<strong>ポインタレシーバ</strong>
                    、生成と検証は<strong>NewXxx</strong>関数にまとめる
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
                    継承の代わりに<strong>埋め込み</strong>
                    で委譲し、JSONの対応は<strong>構造体タグ</strong>で指定する
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "A Tour of Go: Structs",
                  url: "https://go.dev/tour/moretypes/2",
                  description: "構造体とポインタを試せる公式ツアー",
                },
                {
                  title: "A Tour of Go: Methods",
                  url: "https://go.dev/tour/methods/1",
                  description: "メソッドとレシーバの公式ツアー",
                },
                {
                  title: "Effective Go: Embedding",
                  url: "https://go.dev/doc/effective_go#embedding",
                  description: "埋め込みの考え方と使い方",
                },
                {
                  title:
                    "The Go Programming Language Specification: Struct types",
                  url: "https://go.dev/ref/spec#Struct_types",
                  description: "構造体・埋め込み・タグの言語仕様",
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
