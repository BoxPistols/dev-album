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

const VITEST_COMPARISON = [
  {
    topic: "テストの置き場所",
    vitest: "xxx.test.ts",
    go: "xxx_test.go（同じディレクトリ）",
  },
  {
    topic: "テストの単位",
    vitest: "test('...', () => {})",
    go: "func TestXxx(t *testing.T)",
  },
  {
    topic: "グループ化",
    vitest: "describe",
    go: "t.Run（サブテスト）",
  },
  {
    topic: "同じ検証を入力違いで回す",
    vitest: "test.each",
    go: "テーブル駆動テスト",
  },
  {
    topic: "検証",
    vitest: "expect(got).toBe(want)",
    go: "if got != want { t.Errorf(...) }",
  },
  {
    topic: "絞り込み実行",
    vitest: "vitest -t <名前>",
    go: "go test -run <正規表現>",
  },
  {
    topic: "カバレッジ",
    vitest: "vitest --coverage",
    go: "go test -cover",
  },
  {
    topic: "ベンチマーク",
    vitest: "bench",
    go: "func BenchmarkXxx(b *testing.B)",
  },
];

export default function Testing() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 13</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          テスト
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Goはテストの仕組みを標準ライブラリの
          <code className="bg-muted px-1 py-0.5 rounded text-xs">testing</code>
          パッケージと
          <code className="bg-muted px-1 py-0.5 rounded text-xs">go test</code>
          コマンドで提供しています。
          テーブル駆動テストを中心に、ベンチマーク・Example・レース検出までを手元で動かしながら確認します。
        </p>

        <WhyNowBox tags={["testing", "t.Run", "go test", "-race"]}>
          <p>
            JavaScriptではVitestやJestを選んで入れるところから始まりますが、Goはテストランナー・カバレッジ・ベンチマークが
            <code className={CODE_CLASS}>go</code>
            コマンドに入っています。 アサーションライブラリを使わず
            <code className={CODE_CLASS}>if</code>
            文で書く流儀も、ここで慣れておくと次のSTEPのHTTPハンドラのテストにそのまま使えます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              最初のテストを書く
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              テストは、対象と同じディレクトリに
              <code className={CODE_CLASS}>_test.go</code>
              で終わるファイルを作って書きます。
              <code className={CODE_CLASS}>Test</code>
              で始まり
              <code className={CODE_CLASS}>*testing.T</code>
              を受け取る関数が1つのテストです。
              <code className={CODE_CLASS}>_test.go</code>
              のファイルは
              <code className={CODE_CLASS}>go build</code>
              の対象から外れるので、本番のバイナリには入りません。
            </p>
            <CodeBlock
              code={`// Package mathxは小さな計算関数をまとめる。
package mathx

import "strings"

// Addは2つの整数の和を返す。
func Add(a, b int) int {
	return a + b
}

// Slugはタイトルを小文字のハイフン区切りに変換する。
func Slug(title string) string {
	words := strings.Fields(strings.ToLower(title))
	return strings.Join(words, "-")
}`}
              language="go"
              title="mathx/mathx.go"
              showLineNumbers
            />
            <CodeBlock
              code={`package mathx

import "testing"

func TestAdd(t *testing.T) {
	got := Add(2, 3)
	want := 5
	if got != want {
		t.Errorf("Add(2, 3) = %d, want %d", got, want)
	}
}`}
              language="go"
              title="mathx/mathx_test.go"
              showLineNumbers
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className={CODE_CLASS}>expect</code>
              のようなアサーション関数はなく、比較は普通の
              <code className={CODE_CLASS}>if</code>
              文で書きます。失敗メッセージは
              <code className={CODE_CLASS}>
                {"Add(2, 3) = 4, want 5"}
              </code>
              のように、呼び出し・実際の値・期待値の順に並べる慣習があり、どの入力で何が違ったかが1行で読めます。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              t.Errorfとt.Fatalfの違い
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              失敗の報告には2種類あります。
              <code className={CODE_CLASS}>t.Errorf</code>
              は失敗を記録してテストを続け、
              <code className={CODE_CLASS}>t.Fatalf</code>
              は失敗を記録してそのテスト関数をすぐに終えます。
              「この先の検証が意味をなさない」ときだけFatalfを使い、それ以外はErrorfで1回の実行で多くの失敗を拾います。
            </p>
            <CodeBlock
              code={`package atoi

import (
	"strconv"
	"testing"
)

func TestAtoi(t *testing.T) {
	n, err := strconv.Atoi("4x")
	if err != nil {
		// 変換に失敗したらnの検証は意味がないので、ここで止める
		t.Fatalf("Atoi: %v", err)
	}
	if n != 4 {
		t.Errorf("n = %d, want 4", n)
	}
}`}
              language="go"
              title="atoi/atoi_test.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go test .
# --- FAIL: TestAtoi (0.00s)
#     atoi_test.go:12: Atoi: strconv.Atoi: parsing "4x": invalid syntax
# FAIL
# FAIL	example.com/demo/atoi	<所要時間>
# FAIL`}
              language="bash"
              title="実行結果"
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
              t.Helperで失敗した行を呼び出し側にする
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              比較を補助関数にまとめると、失敗の行番号が補助関数の中を指してしまいます。
              補助関数の先頭で
              <code className={CODE_CLASS}>t.Helper()</code>
              を呼ぶと、その関数は報告の対象から外れ、呼び出した行が表示されます。
            </p>
            <CodeBlock
              code={`package slug

import "testing"

func assertEqual(t *testing.T, got, want string) {
	t.Helper()
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestSlug(t *testing.T) {
	assertEqual(t, Slug("Hello World"), "hello-world")
	assertEqual(t, Slug("  Learn Go  "), "learn-go")
}`}
              language="go"
              title="slug/slug_test.go（Slugは前後の空白を残す誤った実装）"
              showLineNumbers
            />
            <CodeBlock
              code={`# t.Helper()あり：呼び出した14行目が出る
#     slug_test.go:14: got "--learn-go--", want "learn-go"

# t.Helper()なし：補助関数の中の8行目が出る
#     slug_test.go:8: got "--learn-go--", want "learn-go"`}
              language="bash"
              title="失敗時の表示の違い"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              テーブル駆動テストとサブテスト
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Goのテストで最もよく見る形が
              <strong className="text-foreground">テーブル駆動テスト</strong>
              です。入力と期待値の組を構造体のスライスに並べ、ループで同じ検証を回します。
              ケースを足すときはテーブルに1行加えるだけで済み、検証のロジックは1か所にまとまります。
              ループの中で
              <code className={CODE_CLASS}>t.Run</code>
              を使うと、各ケースが名前付きのサブテストになります。
            </p>
            <CodeBlock
              code={`func TestSlug(t *testing.T) {
	tests := []struct {
		name  string
		input string
		want  string
	}{
		{name: "単語1つ", input: "Go", want: "go"},
		{name: "空白区切り", input: "Hello World", want: "hello-world"},
		{name: "前後の空白", input: "  Learn Go  ", want: "learn-go"},
		{name: "空文字", input: "", want: ""},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := Slug(tt.input)
			if got != tt.want {
				t.Errorf("Slug(%q) = %q, want %q", tt.input, got, tt.want)
			}
		})
	}
}`}
              language="go"
              title="mathx/mathx_test.go（追加）"
              showLineNumbers
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              サブテストの中で
              <code className={CODE_CLASS}>t.Fatalf</code>
              を呼んでも止まるのはそのケースだけで、残りのケースは実行されます。
              Vitestの
              <code className={CODE_CLASS}>test.each</code>と
              <code className={CODE_CLASS}>describe</code>
              を合わせたものに近い使い方です。
            </p>
            <InfoBox type="info" title="ループ変数とクロージャ（Go 1.22）">
              <p>
                Go
                1.22からループ変数はイテレーションごとに新しく作られます。そのため、クロージャの中で
                <code className={CODE_CLASS}>tt</code>
                をそのまま使えます。 古いコードで見かける
                <code className={CODE_CLASS}>tt := tt</code>
                は、1.21以前で必要だったコピーです。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              go testを実行する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={CODE_CLASS}>./...</code>
              は「このディレクトリ以下のすべてのパッケージ」を表します。
              成功したときはパッケージごとに1行だけ出ます。
            </p>
            <CodeBlock
              code={`go test ./...
# ok  	example.com/calc/mathx	<所要時間>`}
              language="bash"
              title="すべてのパッケージをテストする"
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className={CODE_CLASS}>-v</code>
              を付けると、テストとサブテストごとの結果が出ます。サブテストの名前は
              <code className={CODE_CLASS}>親/子</code>
              の形で表示されます。
            </p>
            <CodeBlock
              code={`go test -v ./...
# === RUN   TestAdd
# --- PASS: TestAdd (0.00s)
# === RUN   TestSlug
# === RUN   TestSlug/単語1つ
# === RUN   TestSlug/空白区切り
# === RUN   TestSlug/前後の空白
# === RUN   TestSlug/空文字
# --- PASS: TestSlug (0.00s)
#     --- PASS: TestSlug/単語1つ (0.00s)
#     --- PASS: TestSlug/空白区切り (0.00s)
#     --- PASS: TestSlug/前後の空白 (0.00s)
#     --- PASS: TestSlug/空文字 (0.00s)
# PASS
# ok  	example.com/calc/mathx	<所要時間>`}
              language="bash"
              title="詳細表示"
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className={CODE_CLASS}>-run</code>
              は実行するテストを正規表現で絞り込みます。
              <code className={CODE_CLASS}>/</code>
              で区切るとサブテストの名前にも当てられます。
              正規表現は部分一致なので、
              <code className={CODE_CLASS}>空白</code>
              は「空白区切り」と「前後の空白」の両方に当たります。
            </p>
            <CodeBlock
              code={`go test -v -run 'TestSlug/空白' ./...
# === RUN   TestSlug
# === RUN   TestSlug/空白区切り
# === RUN   TestSlug/前後の空白
# --- PASS: TestSlug (0.00s)
#     --- PASS: TestSlug/空白区切り (0.00s)
#     --- PASS: TestSlug/前後の空白 (0.00s)
# PASS
# ok  	example.com/calc/mathx	<所要時間>`}
              language="bash"
              title="絞り込み"
            />
            <CodeBlock
              code={`go test -cover ./...
# ok  	example.com/calc/mathx	<所要時間>	coverage: 100.0% of statements`}
              language="bash"
              title="カバレッジ"
            />
            <InfoBox
              type="warning"
              title="2回目は(cached)と表示されることがある"
            >
              <p>
                <code className={CODE_CLASS}>go test ./...</code>
                のようにパッケージを指定した実行では、ソースが変わっていなければ前回の結果が再利用され、時間の欄に
                <code className={CODE_CLASS}>(cached)</code>
                と出ます。テストが実際に走ったわけではありません。
                外部の状態に依存するテストなどで毎回実行したいときは
                <code className={CODE_CLASS}>-count=1</code>
                を付けます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ベンチマークとExample
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={CODE_CLASS}>Benchmark</code>
              で始まり
              <code className={CODE_CLASS}>*testing.B</code>
              を受け取る関数がベンチマークです。Go 1.24で入った
              <code className={CODE_CLASS}>b.Loop()</code>
              を条件にしたループの中に、測りたい処理を書きます。
              それより前のバージョンでは
              <code className={CODE_CLASS}>for i := 0; i &lt; b.N; i++</code>
              と書きます。
            </p>
            <CodeBlock
              code={`package mathx

import "testing"

func BenchmarkSlug(b *testing.B) {
	for b.Loop() {
		Slug("Hello Go World")
	}
}`}
              language="go"
              title="mathx/bench_test.go"
            />
            <CodeBlock
              code={`# -run='^$'で通常のテストを外し、ベンチマークだけ走らせる
go test -bench=. -benchmem -run='^$' ./mathx
# goos: linux
# goarch: amd64
# pkg: example.com/calc/mathx
# cpu: <CPUの名前>
# BenchmarkSlug-<P>   <回数>   <時間> ns/op   <バイト数> B/op   <回数> allocs/op
# PASS
# ok  	example.com/calc/mathx	<所要時間>`}
              language="bash"
              title="ベンチマークの実行"
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              名前の後ろの<code className={CODE_CLASS}>-P</code>は実行に使ったCPU数（GOMAXPROCS）、続く列は左から、繰り返した回数・1回あたりの時間・1回あたりに確保したメモリ量・確保の回数です。
              繰り返す回数は、計測が安定するまでテストランナーが自動で増やすので、自分では決めません。
              値はマシン・負荷・Goのバージョンで変わるため、絶対値ではなく、同じマシンで変更前後を比べる用途に使います。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={CODE_CLASS}>Example</code>
              で始まる関数は、ドキュメントの使用例とテストを兼ねます。 末尾の
              <code className={CODE_CLASS}>// Output:</code>
              コメントと標準出力が一致するかを
              <code className={CODE_CLASS}>go test</code>
              が検証し、
              <code className={CODE_CLASS}>go doc</code>
              やpkg.go.devには使用例として表示されます。 パッケージ名を
              <code className={CODE_CLASS}>mathx_test</code>
              にすると、利用者と同じ立場（公開された名前だけ）で書けます。
            </p>
            <CodeBlock
              code={`package mathx_test

import (
	"fmt"

	"example.com/calc/mathx"
)

func ExampleSlug() {
	fmt.Println(mathx.Slug("Hello World"))
	// Output: hello-world
}`}
              language="go"
              title="mathx/example_test.go"
            />
            <CodeBlock
              code={`go test -v -run Example ./mathx
# === RUN   ExampleSlug
# --- PASS: ExampleSlug (0.00s)
# PASS
# ok  	example.com/calc/mathx	<所要時間>`}
              language="bash"
              title="Exampleの実行"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              -raceでデータ競合を見つける
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              複数のgoroutineが同じ変数をロックなしで読み書きする「データ競合」は、普通に実行しても毎回は表に出ません。
              <code className={CODE_CLASS}>-race</code>
              を付けると、実行中のメモリアクセスを監視して競合を報告します。
            </p>
            <CodeBlock
              code={`package counter

// Counterは数を数える（ロックなしの誤った版）。
type Counter struct {
	n int
}

// Incは1増やす。
func (c *Counter) Inc() {
	c.n++
}

// Valueは現在の値を返す。
func (c *Counter) Value() int {
	return c.n
}`}
              language="go"
              title="counter.go"
            />
            <CodeBlock
              code={`package counter

import (
	"sync"
	"testing"
)

func TestCounter(t *testing.T) {
	var c Counter
	var wg sync.WaitGroup
	for range 100 {
		wg.Add(1)
		go func() {
			defer wg.Done()
			c.Inc()
		}()
	}
	wg.Wait()
	if got := c.Value(); got != 100 {
		t.Errorf("Value() = %d, want 100", got)
	}
}`}
              language="go"
              title="counter_test.go"
            />
            <InfoBox
              type="warning"
              title="仕様では競合、実測では通ることがある"
            >
              <p>
                このテストは仕様上は誤りですが、
                <code className={CODE_CLASS}>-race</code>
                なしで実行すると、失敗するときと通るときがあります。
                goroutineの実行の順序とタイミングは実行ごとに変わり、更新がぶつかって消えるかどうかもそれに左右されるためです。
                「手元で通った」は競合がない証拠にならないので、並行処理を含むテストは
                <code className={CODE_CLASS}>-race</code>
                付きで回します。
              </p>
            </InfoBox>
            <CodeBlock
              code={`go test -race -count=1 .
# ==================
# WARNING: DATA RACE
# Read at 0x00c00009a228 by goroutine 11:
#   example.com/race.(*Counter).Inc()
#       .../race/counter.go:10 +0x84
#   ...
# Previous write at 0x00c00009a228 by goroutine 8:
#   example.com/race.(*Counter).Inc()
#       .../race/counter.go:10 +0x96
#   ...
# ==================
# --- FAIL: TestCounter (0.00s)
#     counter_test.go:20: Value() = 93, want 100
#     testing.go:1490: race detected during execution of test
# FAIL`}
              language="bash"
              title="-race付きの実行（抜粋）"
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              報告には、競合した読み書きの行（
              <code className={CODE_CLASS}>counter.go:10</code>の
              <code className={CODE_CLASS}>c.n++</code>
              ）が出ます。STEP 11の
              <code className={CODE_CLASS}>sync.Mutex</code>
              で保護すると報告は消えます。
            </p>
            <CodeBlock
              code={`package counter

import "sync"

// Counterは数を数える。muで保護する。
type Counter struct {
	mu sync.Mutex
	n  int
}

// Incは1増やす。
func (c *Counter) Inc() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.n++
}

// Valueは現在の値を返す。
func (c *Counter) Value() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.n
}`}
              language="go"
              title="counter.go（修正後）"
            />
            <CodeBlock
              code={`go test -race -count=1 .
# ok  	example.com/race	<所要時間>`}
              language="bash"
              title="修正後の実行"
            />

            <div className="overflow-x-auto rounded-xl border border-border mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th scope="col" className={TH_CLASS}>
                      項目
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      Vitest
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      Go
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {VITEST_COMPARISON.map((row, i) => (
                    <tr
                      key={row.topic}
                      className={
                        i < VITEST_COMPARISON.length - 1
                          ? "border-b border-border"
                          : undefined
                      }
                    >
                      <td className={TD_CLASS}>{row.topic}</td>
                      <td className={TD_CLASS}>
                        <code className={TABLE_CODE_CLASS}>{row.vitest}</code>
                      </td>
                      <td className={TD_CLASS}>
                        <code className={TABLE_CODE_CLASS}>{row.go}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              チャレンジ
            </h2>
            <CodingChallenge
              title="テーブル駆動テストを完成させる"
              description="Double(n int) intは引数を2倍にする関数です。___ を埋めて、3つのケースをサブテストとして実行するテーブル駆動テストを完成させてください。"
              preview={false}
              previewType="terminal"
              initialCode={`package double

import "testing"

func TestDouble(t *testing.T) {
	tests := []struct {
		name string
		in   int
		want int
	}{
		{name: "正の数", in: 3, want: 6},
		{name: "ゼロ", in: 0, want: 0},
		{name: "負の数", in: -4, want: -8},
	}

	for _, tt := range tests {
		t.___(tt.name, func(t ___) {
			if got := Double(tt.in); got != tt.want {
				t.___("Double(%d) = %d, want %d", tt.in, got, tt.want)
			}
		})
	}
}`}
              answer={`package double

import "testing"

func TestDouble(t *testing.T) {
	tests := []struct {
		name string
		in   int
		want int
	}{
		{name: "正の数", in: 3, want: 6},
		{name: "ゼロ", in: 0, want: 0},
		{name: "負の数", in: -4, want: -8},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Double(tt.in); got != tt.want {
				t.Errorf("Double(%d) = %d, want %d", tt.in, got, tt.want)
			}
		})
	}
}`}
              hints={[
                "名前付きのサブテストを作るメソッドはt.Runです",
                "サブテストの関数も、テスト関数と同じく*testing.Tを受け取ります",
                "失敗を記録してほかのケースの検証を続けるにはt.Errorfを使います",
              ]}
              keywords={["t.Run", "*testing.T", "t.Errorf"]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="テストの途中でt.Fatalfを呼んだときの動作は？"
              options={[
                { label: "失敗を記録して、そのテスト関数の残りも実行する" },
                {
                  label:
                    "失敗を記録して、そのテスト関数（サブテストならそのケース）をすぐに終える",
                  correct: true,
                },
                { label: "go testのプロセス全体を終了する" },
                { label: "警告を出すだけで、テストは成功扱いになる" },
              ]}
              explanation="t.Fatalfは失敗を記録してから、呼んだテスト関数を終えます。サブテストの中なら止まるのはそのケースだけで、ほかのケースやテスト関数は続けて実行されます。続けて検証したいときはt.Errorfを使います。"
            />
            <Quiz
              question="-raceなしでgo testを実行したら成功した。このとき言えることは？"
              options={[
                { label: "データ競合はない" },
                {
                  label:
                    "今回の実行では値が合ったが、データ競合がないとは言えない",
                  correct: true,
                },
                { label: "goroutineは順番に実行される" },
                { label: "-raceを付けても結果は変わらない" },
              ]}
              explanation="goroutineの実行の順序とタイミングは実行ごとに変わるので、競合があっても成功することがあります。-raceを付けると実行中のメモリアクセスを監視し、競合した読み書きの位置を報告します。"
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
                    テストは<strong>xxx_test.go</strong>の
                    <strong>TestXxx(t *testing.T)</strong>
                    に書き、比較はif文で行う
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
                    続けるなら<strong>t.Errorf</strong>、止めるなら
                    <strong>t.Fatalf</strong>。補助関数には
                    <strong>t.Helper()</strong>
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
                    <strong>テーブル駆動テスト</strong>と<strong>t.Run</strong>
                    のサブテストが定番。-runで名前を絞り込める
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
                    ベンチマークは<strong>b.Loop()</strong>（Go
                    1.24）、Exampleはドキュメントとテストを兼ね、並行処理は
                    <strong>-race</strong>で確かめる
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Package testing",
                  url: "https://pkg.go.dev/testing",
                  description:
                    "T・B・サブテスト・Example・ベンチマークの公式リファレンス",
                },
                {
                  title: "Add a test（Go tutorial）",
                  url: "https://go.dev/doc/tutorial/add-a-test",
                  description: "最初のテストを書く公式チュートリアル",
                },
                {
                  title: "Data Race Detector",
                  url: "https://go.dev/doc/articles/race_detector",
                  description: "-raceの仕組みと使い方",
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
