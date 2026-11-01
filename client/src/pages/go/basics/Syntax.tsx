import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

export default function Syntax() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 3</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          変数・型・制御構文
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          変数と定数の宣言、基本の型、ifとforとswitchを、TypeScriptと見比べながら確認します。
          書き方は似ていても、ゼロ値・明示的な型変換・文字列の長さなど、挙動が違う箇所があります。
        </p>

        <WhyNowBox tags={[":=", "ゼロ値", "for", "switch"]}>
          <p>
            Goの制御構文はif・for・switchの3つでほぼすべてです。 ループは
            <code className="bg-muted px-1 py-0.5 rounded text-xs">for</code>
            だけ、三項演算子もありません。
            覚える量が少ないぶん、TypeScriptとの違いを最初に押さえておくと、以降のページのコードがそのまま読めます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              変数と定数を宣言する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              変数は
              <code className="bg-muted px-1 py-0.5 rounded text-xs">var</code>
              か短縮形の
              <code className="bg-muted px-1 py-0.5 rounded text-xs">:=</code>
              で宣言します。型は名前の後ろに書きます（
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                var name string
              </code>
              ）。 関数の中では
              <code className="bg-muted px-1 py-0.5 rounded text-xs">:=</code>
              が一般的で、TypeScriptの
              <code className="bg-muted px-1 py-0.5 rounded text-xs">let</code>
              に近い感覚で使えます。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

// パッケージレベルではvarを使う（:=は関数の中だけ）
var count int

const Pi = 3.14

const (
	Sunday  = iota // 0
	Monday         // 1
	Tuesday        // 2
)

func main() {
	var name string = "Gopher" // 型を明示
	var age = 16               // 型を推論（int）
	city := "Tokyo"            // 短縮形。関数の中で最もよく使う
	x, y := 1, 2               // 複数まとめて宣言できる

	fmt.Println(name, age, city, x, y, count)
	fmt.Println(Pi, Sunday, Monday, Tuesday)
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# Gopher 16 Tokyo 1 2 0
# 3.14 0 1 2`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                const
              </code>
              はコンパイル時に決まる値（数値・文字列・真偽値）だけを持てます。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">iota</code>
              は
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                const ( ... )
              </code>
              のブロック内で0から1ずつ増える連番で、TypeScriptの数値enumに当たる定数を作るときに使います。
            </p>
            <InfoBox type="info" title="TypeScriptのconstとの違い">
              <p>
                TypeScriptの
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  const
                </code>
                は「再代入できない変数」で、配列やオブジェクトも入ります。Goの
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  const
                </code>
                はコンパイル時定数なので、スライスや構造体は入れられません。再代入しない変数も、Goでは
                <code className="bg-muted px-1 py-0.5 rounded text-xs">:=</code>
                で宣言します。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              基本の型とゼロ値
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TypeScriptの
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                number
              </code>
              は1つですが、Goは整数と浮動小数点数を分けます。よく使うのは次の型です。
            </p>

            <div className="overflow-x-auto rounded-xl border border-border mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th
                      scope="col"
                      className="text-left px-4 py-3 font-semibold text-foreground border-b border-border"
                    >
                      型
                    </th>
                    <th
                      scope="col"
                      className="text-left px-4 py-3 font-semibold text-foreground border-b border-border"
                    >
                      内容
                    </th>
                    <th
                      scope="col"
                      className="text-left px-4 py-3 font-semibold text-foreground border-b border-border"
                    >
                      ゼロ値
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
                        int
                      </code>
                    </td>
                    <td className="px-4 py-3">整数。64bit環境では64bit幅</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3">number</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        float64
                      </code>
                    </td>
                    <td className="px-4 py-3">倍精度の浮動小数点数</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3">number</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        string
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      変更できないバイト列（通常はUTF-8）
                    </td>
                    <td className="px-4 py-3">""（空文字列）</td>
                    <td className="px-4 py-3">string</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        bool
                      </code>
                    </td>
                    <td className="px-4 py-3">trueかfalse</td>
                    <td className="px-4 py-3">false</td>
                    <td className="px-4 py-3">boolean</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        byte
                      </code>
                    </td>
                    <td className="px-4 py-3">uint8の別名。1バイトを表す</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3">Uint8Arrayの要素</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        rune
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      int32の別名。Unicodeのコードポイント1つを表す
                    </td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3">codePointAt()の戻り値に近い</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              値を代入せずに宣言した変数には、型ごとの「ゼロ値」が入ります。
              Goには
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                undefined
              </code>
              がなく、宣言した変数は必ず何かの値を持っています。
              ポインタ・スライス・map・関数などのゼロ値は
              <code className="bg-muted px-1 py-0.5 rounded text-xs">nil</code>
              です。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	var i int
	var f float64
	var s string
	var b bool
	var p *int

	fmt.Printf("%v %v %q %v %v\\n", i, f, s, b, p)
}`}
              language="go"
              title="zero.go"
            />
            <CodeBlock
              code={`go run zero.go
# 0 0 "" false <nil>`}
              language="bash"
              title="実行結果"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              型変換は明示的に書く
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Goは異なる型どうしの演算を、暗黙に変換しません。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">int</code>
              と
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                float64
              </code>
              を足すだけでもコンパイルエラーになります。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	n := 10
	f := 2.5
	fmt.Println(n + f)
}`}
              language="go"
              title="mismatch.go"
            />
            <CodeBlock
              code={`go run mismatch.go
# ./mismatch.go:8:14: invalid operation: n + f (mismatched types int and float64)`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground my-4 leading-relaxed">
              数値どうしは
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                float64(n)
              </code>
              のように「型名(値)」で変換します。 数値と文字列の変換は
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                strconv
              </code>
              パッケージを使います。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"strconv"
)

func main() {
	n := 10
	f := 2.5
	fmt.Println(float64(n) + f) // 12.5
	fmt.Println(int(f))         // 2（小数点以下は切り捨て）

	s := strconv.Itoa(n)
	fmt.Println(s + "件") // 10件

	m, err := strconv.Atoi("42")
	fmt.Println(m+1, err) // 43 <nil>

	fmt.Println(string(rune(65))) // A（数値をそのまま文字列にするわけではない）
}`}
              language="go"
              title="convert.go"
              showLineNumbers
            />
            <InfoBox type="warning" title="string(数値)は文字列化ではない">
              <p>
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  string(rune(65))
                </code>
                はコードポイント65の文字「A」になり、「65」にはなりません。
                数値を10進数の文字列にするときは
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  strconv.Itoa
                </code>
                か
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  fmt.Sprint
                </code>
                を使います。intを直接
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  string(n)
                </code>
                と書くと、go vetが警告します。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              文字列はUTF-8のバイト列
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Goの
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                string
              </code>
              はバイト列で、
              <code className="bg-muted px-1 py-0.5 rounded text-xs">len</code>
              はバイト数を返します。日本語の文字はUTF-8で3バイトなので、
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                len("日本")
              </code>
              は6です。TypeScriptの
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                "日本".length
              </code>
              はUTF-16のコード単位を数えるので2になり、同じ「長さ」でも数えているものが違います。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"unicode/utf8"
)

func main() {
	s := "Go日本"
	fmt.Println(len("日本"))                 // 6（バイト数）
	fmt.Println(len(s))                    // 8
	fmt.Println(utf8.RuneCountInString(s)) // 4（文字数）
	fmt.Println(s[2])                      // 230（3バイト目のbyte値）

	for i, r := range s {
		fmt.Printf("(%d:%c) ", i, r)
	}
	fmt.Println()
	// (0:G) (1:o) (2:日) (5:本)
}`}
              language="go"
              title="strings.go"
              showLineNumbers
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">s[i]</code>
              はi番目のバイト（
              <code className="bg-muted px-1 py-0.5 rounded text-xs">byte</code>
              ）を返します。 文字単位で扱うときは
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                for i, r := range s
              </code>
              で回します。rangeは文字列をUTF-8として解釈し、
              <code className="bg-muted px-1 py-0.5 rounded text-xs">r</code>
              に1文字分の
              <code className="bg-muted px-1 py-0.5 rounded text-xs">rune</code>
              、<code className="bg-muted px-1 py-0.5 rounded text-xs">i</code>
              にその文字の先頭バイトの位置を入れます。インデックスが2の次に5へ飛ぶのはこのためです。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">ifとfor</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              条件式に丸括弧は付けず、波括弧は省略できません。 ifには
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                if v, err := f(); err != nil {"{"}
              </code>
              の形で、条件の前に短い文を置けます。ここで宣言した変数はif/elseのブロックの中だけで有効なので、エラー処理でよく使います。
              条件はbool型でなければならず、TypeScriptのように0や空文字列をfalseとして扱うことはできません。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"strconv"
)

func main() {
	// 条件に丸括弧は付けない。波括弧は必須
	age := 20
	if age >= 18 {
		fmt.Println("成人")
	} else {
		fmt.Println("未成年")
	}

	// 初期化文つきif。nとerrはこのif/elseの中だけで使える
	if n, err := strconv.Atoi("42"); err != nil {
		fmt.Println("変換できません:", err)
	} else {
		fmt.Println(n * 2)
	}
}`}
              language="go"
              title="if.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run if.go
# 成人
# 84`}
              language="bash"
              title="実行結果"
            />

            <p className="text-muted-foreground my-4 leading-relaxed">
              ループは
              <code className="bg-muted px-1 py-0.5 rounded text-xs">for</code>
              だけです。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                while
              </code>
              も
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                for...of
              </code>
              も、
              <code className="bg-muted px-1 py-0.5 rounded text-xs">for</code>
              の書き方を変えて表します。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	// 1. 3つの要素を持つfor
	for i := 0; i < 3; i++ {
		fmt.Print(i, " ")
	}
	fmt.Println() // 0 1 2

	// 2. 条件だけ書くとwhile相当
	n := 1
	for n < 100 {
		n *= 2
	}
	fmt.Println(n) // 128

	// 3. 何も書かないと無限ループ。breakで抜ける
	count := 0
	for {
		count++
		if count == 3 {
			break
		}
	}
	fmt.Println(count) // 3

	// 4. rangeでインデックスと値を取り出す
	langs := []string{"Go", "TS", "Rust"}
	for i, lang := range langs {
		fmt.Print(i, ":", lang, " ")
	}
	fmt.Println() // 0:Go 1:TS 2:Rust

	// 5. 整数に対するrange（Go 1.22から）
	for i := range 3 {
		fmt.Print(i, " ")
	}
	fmt.Println() // 0 1 2
}`}
              language="go"
              title="loop.go"
              showLineNumbers
            />
            <InfoBox type="info" title="バージョンで変わったfor">
              <p>
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  for i := range 3
                </code>
                のように整数をrangeに渡す書き方はGo
                1.22で入りました。同じく1.22から、forで宣言したループ変数はイテレーションごとに別の変数になります（それ以前は全イテレーションで1つの変数を共有していました）。
                どちらもgo.modの
                <code className="bg-muted px-1 py-0.5 rounded text-xs">go</code>
                行が1.22以上のモジュールで有効です。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              switchはbreakを書かない
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Goのswitchは、一致したcaseを実行したら自動で抜けます。TypeScriptのように
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                break
              </code>
              を書き忘れて次のcaseへ落ちることはありません。
              次のcaseへ進めたいときだけ
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                fallthrough
              </code>
              を書きます。
              switchの後ろの式を省くと、各caseに条件式を書けるので、長いif-elseの連鎖を読みやすく書き換えられます。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	day := "sat"
	switch day {
	case "sat", "sun": // 複数の値をカンマで並べる
		fmt.Println("休日")
	default:
		fmt.Println("平日")
	}

	// 式を書かないswitchはif-elseの連鎖として使える
	score := 85
	switch {
	case score >= 90:
		fmt.Println("A")
	case score >= 70:
		fmt.Println("B")
	default:
		fmt.Println("C")
	}

	// 次のcaseへ進めたいときだけfallthroughを書く
	switch n := 1; n {
	case 1:
		fmt.Println("one")
		fallthrough
	case 2:
		fmt.Println("two")
	case 3:
		fmt.Println("three")
	}
}`}
              language="go"
              title="switch.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run switch.go
# 休日
# B
# one
# two`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              fallthroughは次のcaseの条件を評価せずに、その中身を実行します。上の例でcase
              2の中身が表示され、case 3は表示されないのはこのためです。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              TypeScriptとの対応
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th
                      scope="col"
                      className="text-left px-4 py-3 font-semibold text-foreground border-b border-border"
                    >
                      やりたいこと
                    </th>
                    <th
                      scope="col"
                      className="text-left px-4 py-3 font-semibold text-foreground border-b border-border"
                    >
                      TypeScript
                    </th>
                    <th
                      scope="col"
                      className="text-left px-4 py-3 font-semibold text-foreground border-b border-border"
                    >
                      Go
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">変数の宣言</td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        let n = 1
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        n := 1
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">型の注釈</td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        let s: string
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        var s string
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">未初期化の値</td>
                    <td className="px-4 py-3">undefined</td>
                    <td className="px-4 py-3">型ごとのゼロ値</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">数値の文字列化</td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        String(n)
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        strconv.Itoa(n)
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">配列を回す</td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        for (const v of arr)
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        for _, v := range arr
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">while</td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        while (n &lt; 100)
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        for n &lt; 100
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">三項演算子</td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        a ? b : c
                      </code>
                    </td>
                    <td className="px-4 py-3">なし。if/elseで書く</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">switchの抜け方</td>
                    <td className="px-4 py-3">breakが必要</td>
                    <td className="px-4 py-3">
                      自動で抜ける。続けるならfallthrough
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
              title="forとswitchでFizzBuzz"
              description="___ を埋めて、1から15までの数を表示し、3の倍数ならFizz、5の倍数ならBuzz、両方の倍数ならFizzBuzzと表示するプログラムを完成させてください。整数のrangeはGo 1.22以降で使えます。"
              preview={false}
              previewType="terminal"
              initialCode={`package main

import "fmt"

func main() {
	for i := ___ 15 {
		n := i + 1
		___ {
		case n%15 == 0:
			fmt.Println("FizzBuzz")
		case n%3 == 0:
			fmt.Println("Fizz")
		case n%5 == 0:
			fmt.Println("Buzz")
		default:
			fmt.Println(___)
		}
	}
}`}
              answer={`package main

import "fmt"

func main() {
	for i := range 15 {
		n := i + 1
		switch {
		case n%15 == 0:
			fmt.Println("FizzBuzz")
		case n%3 == 0:
			fmt.Println("Fizz")
		case n%5 == 0:
			fmt.Println("Buzz")
		default:
			fmt.Println(n)
		}
	}
}`}
              hints={[
                "整数nをrangeに渡すと、0からn-1までを順に回せます",
                "式を書かないswitchは、各caseの条件を上から順に評価します",
                "どの条件にも当たらないときは、数そのものnを表示します",
              ]}
              keywords={["range", "switch", "Println(n)"]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question={'len("日本")の値は？'}
              options={[
                { label: "2" },
                { label: "3" },
                { label: "6", correct: true },
                { label: "コンパイルエラー" },
              ]}
              explanation="Goの文字列はUTF-8のバイト列で、lenはバイト数を返します。日本語の文字はUTF-8で3バイトなので6です。文字数を数えるときはutf8.RuneCountInStringを使うか、rangeでruneごとに回します。"
            />
            <Quiz
              question="var count intと宣言しただけの変数countの値は？"
              options={[
                { label: "undefined" },
                { label: "nil" },
                { label: "0", correct: true },
                { label: "使う前に代入しないとコンパイルエラー" },
              ]}
              explanation="Goの変数は宣言した時点で型ごとのゼロ値を持ちます。intのゼロ値は0、stringは空文字列、boolはfalseです。nilはポインタ・スライス・mapなどのゼロ値です。"
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
                    関数の中では<strong>:=</strong>
                    で宣言する。constはコンパイル時定数で、iotaで連番を作れる
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
                    宣言した変数は<strong>ゼロ値</strong>
                    を持ち、undefinedは存在しない
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
                    型変換は<strong>明示的</strong>
                    に書く。文字列のlenはバイト数で、文字単位ならrangeでruneを取り出す
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
                    ループは<strong>for</strong>
                    だけ。switchは自動で抜け、続けるときだけfallthroughを書く
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "A Tour of Go: Basics",
                  url: "https://go.dev/tour/basics/1",
                  description: "変数・型・定数を順に試せる公式ツアー",
                },
                {
                  title: "A Tour of Go: Flow control",
                  url: "https://go.dev/tour/flowcontrol/1",
                  description: "for・if・switch・deferの公式ツアー",
                },
                {
                  title: "Strings, bytes, runes and characters in Go",
                  url: "https://go.dev/blog/strings",
                  description: "文字列・byte・runeの関係を解説した公式ブログ",
                },
                {
                  title: "The Go Programming Language Specification",
                  url: "https://go.dev/ref/spec",
                  description: "言語仕様。ゼロ値や型変換の正確な定義",
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
