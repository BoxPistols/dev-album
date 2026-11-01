import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

export default function Functions() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 4</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          関数・複数戻り値・defer
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          関数の宣言、複数の値を返す書き方、可変長引数、クロージャ、deferを確認します。
          特に複数戻り値は、Goのエラー処理の土台になる書き方です。
        </p>

        <WhyNowBox tags={["func", "v, err :=", "defer"]}>
          <p>
            Goには例外（try/catch）がなく、失敗しうる関数は戻り値でエラーを返します。
            <code className="bg-muted px-1 py-0.5 rounded text-xs">
              v, err := f()
            </code>
            の形は標準ライブラリのいたるところに出てくるので、関数の書き方と一緒に読み方を押さえておきます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              関数を宣言する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              関数は
              <code className="bg-muted px-1 py-0.5 rounded text-xs">func</code>
              で宣言します。変数と同じく型は名前の後ろに書き、戻り値の型は引数リストの後ろに置きます。
              TypeScriptの
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                function add(a: number, b: number): number
              </code>
              は、Goでは
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                func add(a int, b int) int
              </code>
              です。 戻り値を複数返すときは型を丸括弧でまとめます。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"strconv"
)

// 型は引数名の後ろ、戻り値の型は引数リストの後ろに書く
func add(a int, b int) int {
	return a + b
}

// 同じ型が続くときはまとめて書ける
func divmod(a, b int) (int, int) {
	return a / b, a % b
}

// 失敗しうる処理は、最後の戻り値でerrorを返す
func parseAge(s string) (int, error) {
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0, err
	}
	return n, nil
}

func main() {
	fmt.Println(add(2, 3)) // 5

	q, r := divmod(17, 5)
	fmt.Println(q, r) // 3 2

	_, rest := divmod(10, 3) // 使わない値は _ で捨てる
	fmt.Println(rest)        // 1

	for _, s := range []string{"20", "abc"} {
		age, err := parseAge(s)
		if err != nil {
			fmt.Println("エラー:", err)
			continue
		}
		fmt.Println("年齢:", age)
	}
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# 5
# 3 2
# 1
# 年齢: 20
# エラー: strconv.Atoi: parsing "abc": invalid syntax`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                parseAge
              </code>
              のように、最後の戻り値を
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                error
              </code>
              にして、呼び出し側で
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                if err != nil
              </code>
              を確かめるのがGoの慣習です。成功したときは
              <code className="bg-muted px-1 py-0.5 rounded text-xs">nil</code>
              を返します。 エラーの作り方・包み方・判定の仕方はSTEP
              9で詳しく扱います。
            </p>
            <InfoBox type="info" title="TypeScriptで書くなら">
              <p>
                TypeScriptでは
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  return [q, r]
                </code>
                のようにタプルを返して分割代入しますが、Goの複数戻り値はタプルという値ではありません。
                そのため
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  x := divmod(17, 5)
                </code>
                のように1つの変数で受け取ることはできず、戻り値の数だけ変数を並べます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              名前付き戻り値
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              戻り値に名前を付けると、その名前の変数がゼロ値で用意され、値を書かない
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                return
              </code>
              でそのまま返せます。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

// 戻り値に名前を付けると、関数の先頭でゼロ値の変数として用意される
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return // 値を書かないreturnは、xとyの現在値を返す
}

func main() {
	fmt.Println(split(17)) // 7 10
}`}
              language="go"
              title="named.go"
            />
            <InfoBox type="warning" title="使いどころは限られる">
              <p>
                値を書かないreturnは、関数が長くなると「何を返しているか」が読み取りにくくなります。
                名前付き戻り値は、同じ型の戻り値が並んで意味を名前で示したいときや、後で説明するdeferの中で戻り値を書き換えたいときに使い、ふだんは
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  return x, y
                </code>
                と明示して返すのが読みやすい書き方です。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              可変長引数
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              最後の引数の型の前に
              <code className="bg-muted px-1 py-0.5 rounded text-xs">...</code>
              を付けると、任意個の引数を受け取れます。TypeScriptのレストパラメータ
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                ...nums: number[]
              </code>
              に当たり、関数の中ではスライスとして扱えます。
              手元のスライスを渡すときは、呼び出し側で
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                scores...
              </code>
              と後ろに
              <code className="bg-muted px-1 py-0.5 rounded text-xs">...</code>
              を付けて展開します（TypeScriptのスプレッドは前に付けます）。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

// ...intで任意個の引数を受け取る。関数の中ではnumsは[]int
func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

func main() {
	fmt.Println(sum())        // 0
	fmt.Println(sum(1, 2, 3)) // 6

	scores := []int{80, 90, 70}
	fmt.Println(sum(scores...)) // 240（スライスを展開して渡す）
}`}
              language="go"
              title="variadic.go"
              showLineNumbers
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                fmt.Println
              </code>
              も可変長引数の関数です。引数をいくつでも渡せるのはこのためです。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              関数は値として扱える
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TypeScriptと同じく、関数は変数に入れたり、引数で渡したり、戻り値で返したりできます。
              名前のない関数は
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                func(n int) int {"{ ... }"}
              </code>
              と書き、アロー関数に当たります。 関数の型は
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                func(int) int
              </code>
              のように引数と戻り値の型で表します。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

// 関数を受け取る関数。引数の型はfunc(int) int
func apply(nums []int, f func(int) int) []int {
	result := make([]int, 0, len(nums))
	for _, n := range nums {
		result = append(result, f(n))
	}
	return result
}

// 関数を返す関数。返した関数がcountを捕まえ続ける（クロージャ）
func newCounter() func() int {
	count := 0
	return func() int {
		count++
		return count
	}
}

func main() {
	square := func(n int) int { return n * n } // 無名関数を変数に入れる
	fmt.Println(apply([]int{1, 2, 3}, square)) // [1 4 9]

	c1 := newCounter()
	c2 := newCounter()
	fmt.Println(c1(), c1(), c1()) // 1 2 3
	fmt.Println(c2())             // 1（c1とは別のcount）
}`}
              language="go"
              title="closure.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run closure.go
# [1 4 9]
# 1 2 3
# 1`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                newCounter
              </code>
              が返した関数は、外側の変数
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                count
              </code>
              を参照し続けます。呼び出すたびに新しい
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                count
              </code>
              が作られるので、c1とc2は別々に数えます。JavaScriptのクロージャと同じ動きです。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              deferで後始末を予約する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                defer
              </code>
              を付けた関数呼び出しは、囲んでいる関数が終わる直前に実行されます。
              複数あるときは、後から登録したものが先に実行されます（LIFO）。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	fmt.Println("開始")
	defer fmt.Println("1つ目のdefer")
	defer fmt.Println("2つ目のdefer")
	fmt.Println("終了")
}`}
              language="go"
              title="defer.go"
            />
            <CodeBlock
              code={`go run defer.go
# 開始
# 終了
# 2つ目のdefer
# 1つ目のdefer`}
              language="bash"
              title="実行結果"
            />

            <p className="text-muted-foreground my-4 leading-relaxed">
              典型的な使い方は、ファイルやロックなどの後始末です。 開いた直後に
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                defer f.Close()
              </code>
              と書いておくと、途中でreturnしても閉じ忘れません。TypeScriptの
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                try {"{ ... }"} finally {"{ ... }"}
              </code>
              に近い役割です。
            </p>
            <CodeBlock
              code={`package main

import (
	"bufio"
	"fmt"
	"os"
)

func firstLine(path string) (string, error) {
	f, err := os.Open(path)
	if err != nil {
		return "", err
	}
	defer f.Close() // 開いた直後に閉じる処理を予約する

	sc := bufio.NewScanner(f)
	if sc.Scan() {
		return sc.Text(), nil // returnのどの経路でもf.Close()が走る
	}
	return "", sc.Err()
}

func main() {
	line, err := firstLine("go.mod")
	fmt.Println(line, err)
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# module example.com/hello <nil>（go.modの1行目。モジュール名は環境による）`}
              language="bash"
              title="実行結果（STEP 2のhelloモジュールで実行した例）"
            />

            <p className="text-muted-foreground my-4 leading-relaxed">
              注意したいのは、deferした関数の
              <strong>引数はdeferを書いた時点で評価される</strong>
              ことです。実行時の値を読みたいときは、無名関数で包んでクロージャにします。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	x := 1
	defer fmt.Println("defer（引数）:", x) // xの値はこの行で評価される
	defer func() {
		fmt.Println("defer（クロージャ）:", x) // 実行時のxを読む
	}()
	x = 2
	fmt.Println("main:", x)
}`}
              language="go"
              title="defer_args.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run defer_args.go
# main: 2
# defer（クロージャ）: 2
# defer（引数）: 1`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              1つ目のdeferは登録した時点のx（1）を受け取っているので1を表示し、クロージャは実行時のx（2）を読みます。
              表示順はLIFOなので、後から登録したクロージャが先です。
            </p>

            <InfoBox
              type="info"
              title="panicとrecoverは例外処理の代わりではない"
            >
              <p>
                Goには
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  panic
                </code>
                （プログラムを異常終了させる）と、deferの中でそれを止める
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  recover
                </code>
                があります。ただし、try/catchのように通常のエラー処理に使うものではありません。
                範囲外のインデックスアクセスのような「起きてはいけない」状態で使われ、想定内の失敗はerrorを戻り値で返します。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              チャレンジ
            </h2>
            <CodingChallenge
              title="最小値と最大値を返す"
              description="___ を埋めて、任意個の整数を受け取り最小値と最大値を返す関数minMaxを完成させてください。main関数の最後に「終了」と表示するよう、deferで予約します。min・maxはGo 1.21からの組み込み関数です。"
              preview={false}
              previewType="terminal"
              initialCode={`package main

import "fmt"

func minMax(nums ___int) ___ {
	lo, hi := nums[0], nums[0]
	for _, n := range nums {
		lo = min(lo, n)
		hi = max(hi, n)
	}
	return lo, hi
}

func main() {
	___ fmt.Println("終了")
	lo, hi := minMax(3, 1, 4, 1, 5)
	fmt.Println(lo, hi)
}`}
              answer={`package main

import "fmt"

func minMax(nums ...int) (int, int) {
	lo, hi := nums[0], nums[0]
	for _, n := range nums {
		lo = min(lo, n)
		hi = max(hi, n)
	}
	return lo, hi
}

func main() {
	defer fmt.Println("終了")
	lo, hi := minMax(3, 1, 4, 1, 5)
	fmt.Println(lo, hi)
}`}
              hints={[
                "任意個の引数を受け取るには、型の前に...を付けます",
                "2つのintを返す関数の戻り値の型は(int, int)と書きます",
                "関数の終わりに実行したい呼び出しの前にはdeferを付けます",
              ]}
              keywords={["...int", "(int, int)", "defer"]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="次のコードを実行すると何が表示される？ x := 1; defer fmt.Println(x); x = 2"
              options={[
                { label: "1", correct: true },
                { label: "2" },
                { label: "何も表示されない" },
                { label: "コンパイルエラー" },
              ]}
              explanation="deferした関数の引数は、deferを書いた時点で評価されます。そのため関数の終わりに1が表示されます。実行時の値を使いたいときはdefer func() { fmt.Println(x) }()のようにクロージャで包みます。"
            />
            <Quiz
              question="Goで失敗しうる処理を書くときの一般的な方法は？"
              options={[
                { label: "throwで例外を投げる" },
                { label: "panicを起こし、呼び出し側でrecoverする" },
                {
                  label: "最後の戻り値でerrorを返し、呼び出し側でnilか確かめる",
                  correct: true,
                },
                { label: "グローバル変数にエラーを書き込む" },
              ]}
              explanation="Goにはthrowがなく、失敗しうる関数は(値, error)のように最後の戻り値でerrorを返します。呼び出し側はif err != nilで確かめます。panic/recoverは想定外の状態のためのものです。"
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
                    型は名前の後ろに書き、戻り値は<strong>複数</strong>
                    返せる。失敗しうる関数は最後にerrorを返す
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
                    名前付き戻り値は使いどころを絞り、ふだんは値を明示してreturnする
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
                    <strong>...int</strong>
                    で可変長引数を受け取り、スライスはs...で展開して渡す
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
                    関数は値で、外側の変数を捕まえるクロージャを作れる
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
                    <strong>defer</strong>
                    はLIFOで実行され、引数はdeferを書いた時点で評価される
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "A Tour of Go: Functions",
                  url: "https://go.dev/tour/basics/4",
                  description: "関数と複数戻り値を試せる公式ツアー",
                },
                {
                  title: "Defer, Panic, and Recover",
                  url: "https://go.dev/blog/defer-panic-and-recover",
                  description:
                    "deferの評価規則とpanic/recoverを解説した公式ブログ",
                },
                {
                  title: "Effective Go: Functions",
                  url: "https://go.dev/doc/effective_go#functions",
                  description: "複数戻り値・名前付き戻り値・deferの慣習",
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
