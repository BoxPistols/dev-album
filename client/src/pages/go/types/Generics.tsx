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

export default function Generics() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 8</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          ジェネリクス
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Go 1.18で型パラメータ（ジェネリクス）が導入されました。
          書き方はTypeScriptの
          <code className="bg-muted px-1 py-0.5 rounded text-xs">{"<T>"}</code>
          を角括弧
          <code className="bg-muted px-1 py-0.5 rounded text-xs">[T any]</code>
          にしたものに近く、制約はインターフェースで表します。
          TypeScriptより機能を絞った設計なので、できることとできないことを対比しながら確認します。
        </p>

        <WhyNowBox
          tags={["型パラメータ", "comparable", "cmp.Ordered", "slices"]}
        >
          <p>
            ジェネリクス以前のGoでは、型ごとに同じ関数を書くか、anyで受けて型アサーションする必要がありました。
            標準ライブラリのslices・mapsパッケージもジェネリクスで書かれています。
            前のSTEPのインターフェースを「制約」として使うので、続けて読むと理解しやすい内容です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              型パラメータ付きの関数
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              関数名の直後の角括弧に型パラメータと制約を書きます。
              <code className={INLINE_CODE}>[T, U any]</code>
              は「TとUはどんな型でもよい」という意味です。 TypeScriptの
              <code className={INLINE_CODE}>{"function map<T, U>(...)"}</code>
              に当たります。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"strconv"
)

// Tを受け取りUを返す関数fを、スライスの全要素に適用する
func Map[T, U any](s []T, f func(T) U) []U {
	result := make([]U, 0, len(s))
	for _, v := range s {
		result = append(result, f(v))
	}
	return result
}

func Filter[T any](s []T, keep func(T) bool) []T {
	var result []T
	for _, v := range s {
		if keep(v) {
			result = append(result, v)
		}
	}
	return result
}

func main() {
	nums := []int{1, 2, 3, 4, 5}

	// 型引数は引数から推論される
	evens := Filter(nums, func(n int) bool { return n%2 == 0 })
	labels := Map(evens, func(n int) string { return "#" + strconv.Itoa(n) })
	fmt.Println(evens, labels)

	// 明示的に書くこともできる
	doubled := Map[int, int](nums, func(n int) int { return n * 2 })
	fmt.Println(doubled)
}`}
              language="go"
              title="mapfilter.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run mapfilter.go
# [2 4] [#2 #4]
# [2 4 6 8 10]`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              呼び出し時の型引数は、TypeScriptと同じく引数から推論されるので、通常は省略します。
              ただしGoには
              <code className={INLINE_CODE}>{"(n) => n * 2"}</code>
              のような引数の型を省いた無名関数がないため、渡す関数の型は
              <code className={INLINE_CODE}>func(n int) int</code>
              と書きます。
              戻り値からだけ決まる型引数のように、推論できないときは
              <code className={INLINE_CODE}>Map[int, int](...)</code>
              と明示します。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              制約: any・comparable・cmp.Ordered
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              制約は「型パラメータに対してどの演算ができるか」を決めます。
              <code className={INLINE_CODE}>any</code>
              の型パラメータには
              <code className={INLINE_CODE}>==</code>も
              <code className={INLINE_CODE}>{"<"}</code>
              も使えません。比較したいときは、それを許す制約を指定します。
            </p>
            <CodeBlock
              code={`package main

import (
	"cmp"
	"fmt"
)

// comparable: ==と!=が使える型
func Index[T comparable](s []T, target T) int {
	for i, v := range s {
		if v == target {
			return i
		}
	}
	return -1
}

// cmp.Ordered: <や>で比べられる型（Go 1.21から）
func MaxOf[T cmp.Ordered](s []T) T {
	m := s[0]
	for _, v := range s[1:] {
		if v > m {
			m = v
		}
	}
	return m
}

// 独自の制約。~intは「基になる型がintの型すべて」
type Number interface {
	~int | ~float64
}

func Sum[T Number](s []T) T {
	var total T
	for _, v := range s {
		total += v
	}
	return total
}

type Yen int // 基になる型はint

func main() {
	fmt.Println(Index([]string{"a", "b", "c"}, "b"))
	fmt.Println(MaxOf([]float64{1.5, 3.2, 2.8}))
	fmt.Println(MaxOf([]string{"pear", "apple", "zebra"}))
	fmt.Println(Sum([]int{1, 2, 3}))
	fmt.Println(Sum([]Yen{100, 250}))
}`}
              language="go"
              title="constraints.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run constraints.go
# 1
# 3.2
# zebra
# 6
# 350`}
              language="bash"
              title="実行結果"
            />

            <div className="overflow-x-auto rounded-xl border border-border mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th scope="col" className={TH}>
                      制約
                    </th>
                    <th scope="col" className={TH}>
                      使える演算
                    </th>
                    <th scope="col" className={TH}>
                      備考
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>any</code>
                    </td>
                    <td className="px-4 py-3">代入・受け渡しなど</td>
                    <td className="px-4 py-3">組み込み（Go 1.18から）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>comparable</code>
                    </td>
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>==</code>{" "}
                      <code className={INLINE_CODE}>!=</code>
                    </td>
                    <td className="px-4 py-3">
                      組み込み。数値・文字列・ポインタ・比較できるフィールドだけの構造体など
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>cmp.Ordered</code>
                    </td>
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>{"< <= > >="}</code>
                    </td>
                    <td className="px-4 py-3">
                      標準パッケージcmp（Go
                      1.21から）。整数・浮動小数点数・文字列
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>~int | ~float64</code>
                    </td>
                    <td className="px-4 py-3">
                      列挙した型すべてに共通の演算（+など）
                    </td>
                    <td className="px-4 py-3">型の集合を書く独自の制約</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mt-6 mb-4 leading-relaxed">
              <code className={INLINE_CODE}>~</code>
              は「基になる型（underlying
              type）がそれである型すべて」を表します。
              <code className={INLINE_CODE}>~</code>
              を外して
              <code className={INLINE_CODE}>int | float64</code>
              とすると、
              <code className={INLINE_CODE}>type Yen int</code>
              は別の型として扱われ、制約を満たしません。
            </p>
            <CodeBlock
              code={`go run constraints_no_tilde.go
# ./constraints_no_tilde.go:49:17: Yen does not satisfy Number (possibly missing ~ for int in Number)`}
              language="bash"
              title="~を外したときの実行結果"
            />
            <InfoBox
              type="info"
              title="型の集合を書いたインターフェースは制約専用"
            >
              <p>
                <code className={INLINE_CODE}>~int | ~float64</code>
                のように型を列挙したインターフェースは、型パラメータの制約にだけ使えます。
                普通の変数や引数の型には指定できません。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ジェネリックな型
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              型の定義にも型パラメータを付けられます。メソッドのレシーバには
              <code className={INLINE_CODE}>*Stack[T]</code>
              のように型パラメータを並べて書き、型として使う側では
              <code className={INLINE_CODE}>Stack[string]</code>
              と型引数を指定します。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

type Stack[T any] struct {
	items []T
}

func (s *Stack[T]) Push(v T) {
	s.items = append(s.items, v)
}

// 空のときはゼロ値とfalseを返す
func (s *Stack[T]) Pop() (T, bool) {
	var zero T
	if len(s.items) == 0 {
		return zero, false
	}
	v := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	return v, true
}

func (s *Stack[T]) Len() int { return len(s.items) }

func main() {
	var s Stack[string] // 型として使うときは型引数を書く
	s.Push("a")
	s.Push("b")
	v, ok := s.Pop()
	fmt.Println(v, ok, s.Len())

	nums := &Stack[int]{}
	_, ok = nums.Pop()
	fmt.Println(ok)
}`}
              language="go"
              title="stack.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run stack.go
# b true 1
# false`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Popの
              <code className={INLINE_CODE}>var zero T</code>
              は、Tのゼロ値を作る定番の書き方です。TypeScriptなら
              <code className={INLINE_CODE}>undefined</code>
              を返すところを、Goではゼロ値と
              <code className={INLINE_CODE}>bool</code>
              の組で「値がない」ことを伝えます。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              TypeScriptのジェネリクスとの違い
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Goのジェネリクスは、TypeScriptの型レベルプログラミングに当たる機能を持ちません。
              特につまずきやすいのは、メソッドに独自の型パラメータを付けられない点です。
            </p>
            <CodeBlock
              code={`package main

type Box[T any] struct {
	v T
}

// メソッドに独自の型パラメータUを足そうとする
func (b Box[T]) Map[U any](f func(T) U) Box[U] {
	return Box[U]{v: f(b.v)}
}

func main() {}`}
              language="go"
              title="method_tparam.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run method_tparam.go
# ./method_tparam.go:8:20: syntax error: method must have no type parameters`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              メソッドが使えるのは、型の定義で宣言した型パラメータ（ここではT）だけです。
              Uが必要な処理は
              <code className={INLINE_CODE}>
                {"func MapBox[T, U any](b Box[T], f func(T) U) Box[U]"}
              </code>
              のように普通の関数として書きます。
            </p>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
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
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>{"<T extends Foo>"}</code>
                    </td>
                    <td className="px-4 py-3">
                      <code className={INLINE_CODE}>[T Foo]</code>
                      （制約はインターフェース）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">メソッドごとの型パラメータ</td>
                    <td className="px-4 py-3">書けない。関数にする</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      条件型（
                      <code className={INLINE_CODE}>T extends U ? X : Y</code>）
                    </td>
                    <td className="px-4 py-3">ない</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">
                      mapped type（
                      <code className={INLINE_CODE}>
                        {"{ [K in keyof T]: ... }"}
                      </code>
                      ）
                    </td>
                    <td className="px-4 py-3">ない</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">型は実行時に消える</td>
                    <td className="px-4 py-3">
                      コンパイル時に検査され、実行時もTの値は具体的な型を持つ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              使いどころ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Go
              1.21で標準ライブラリにslices・maps・cmpパッケージが加わり、よく使うスライスとマップの操作はジェネリック関数として用意されています。
              自分で書く前に、まずここを探します。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"maps"
	"slices"
)

func main() {
	nums := []int{3, 1, 4, 1, 5}

	fmt.Println(slices.Contains(nums, 4))
	fmt.Println(slices.Index(nums, 5))
	fmt.Println(slices.Max(nums))

	sorted := slices.Clone(nums)
	slices.Sort(sorted)
	fmt.Println(sorted, nums)

	ages := map[string]int{"bob": 30, "alice": 25}
	// maps.Keysはイテレータを返す（Go 1.23から）。slices.Sortedで並べたスライスにする
	keys := slices.Sorted(maps.Keys(ages))
	fmt.Println(keys)
}`}
              language="go"
              title="stdlib.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run stdlib.go
# true
# 4
# 5
# [1 1 3 4 5] [3 1 4 1 5]
# [alice bob]`}
              language="bash"
              title="実行結果"
            />
            <InfoBox type="info" title="maps.Keysの順序">
              <p>
                仕様ではマップの反復順は決まっておらず、実測でも実行のたびに変わることがあります。
                maps.Keysの結果もその順序になるため、上の例ではslices.Sortedで並べてから表示しています。
              </p>
            </InfoBox>
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              自分でジェネリクスを書くかどうかは、次の順で考えます。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>標準のslices・mapsパッケージで足りるなら、それを使う</li>
              <li>
                「このメソッドを呼べればよい」なら、インターフェースで書く（型によって振る舞いが変わる処理に向く）
              </li>
              <li>
                「どの型でも同じ処理をする」コンテナやスライス操作で、型ごとの重複が生じるときにジェネリクスを使う
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              チャレンジ
            </h2>
            <CodingChallenge
              title="条件に合う要素を数える"
              description="___ を埋めて、どんな型のスライスにも使えるCountIfを完成させてください。2文字の単語の数（2）と、60以上の点数の数（3）が表示されます。"
              preview={false}
              previewType="terminal"
              initialCode={`package main

import "fmt"

func CountIf[___](s ___, pred func(T) bool) int {
	count := 0
	for _, v := range s {
		if pred(v) {
			count++
		}
	}
	return count
}

func main() {
	words := []string{"go", "rust", "ts", "zig"}
	n := CountIf(words, func(w ___) bool { return len(w) == 2 })
	fmt.Println(n)

	scores := []int{80, 45, 92, 60}
	fmt.Println(CountIf(scores, func(s int) bool { return s >= 60 }))
}`}
              answer={`package main

import "fmt"

func CountIf[T any](s []T, pred func(T) bool) int {
	count := 0
	for _, v := range s {
		if pred(v) {
			count++
		}
	}
	return count
}

func main() {
	words := []string{"go", "rust", "ts", "zig"}
	n := CountIf(words, func(w string) bool { return len(w) == 2 })
	fmt.Println(n)

	scores := []int{80, 45, 92, 60}
	fmt.Println(CountIf(scores, func(s int) bool { return s >= 60 }))
}`}
              hints={[
                "どんな型でもよい型パラメータTは、制約anyと組にして宣言します",
                "Tの要素を持つスライスの型は[]Tです",
                "wordsの要素の型に合わせて、無名関数の引数の型を書きます",
              ]}
              keywords={["T any", "[]T", "w string"]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="「type Celsius float64」を受け付ける制約として正しいのは？"
              options={[
                { label: "interface { float64 }" },
                { label: "interface { ~float64 }", correct: true },
                { label: "comparable（足し算はできない）" },
                { label: "any" },
              ]}
              explanation="~float64は「基になる型がfloat64の型すべて」を表すので、Celsiusも満たします。~のないfloat64はfloat64そのものだけを表します。anyでも受け取れますが、+や<などの演算はできません。"
            />
            <Quiz
              question="Goのジェネリクスでできないことは？"
              options={[
                { label: "型パラメータ付きの関数を定義する" },
                { label: "型パラメータ付きの構造体を定義する" },
                {
                  label: "メソッドに独自の型パラメータを追加する",
                  correct: true,
                },
                { label: "型引数を引数から推論させる" },
              ]}
              explanation="メソッドは、レシーバの型が宣言した型パラメータしか使えません。別の型パラメータが必要な処理は、普通の関数として書きます。"
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
                    ジェネリクスは<strong>Go 1.18</strong>から。
                    <strong>[T any]</strong>
                    のような角括弧で宣言し、型引数は多くの場合推論される
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
                    比較には<strong>comparable</strong>、大小には
                    <strong>cmp.Ordered</strong>、独自の型を含めるには
                    <strong>~</strong>を使う
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
                    <strong>Stack[T]</strong>
                    のようなジェネリックな型も作れるが、メソッドに独自の型パラメータは付けられない
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
                    まず<strong>slices・maps</strong>
                    パッケージとインターフェースで書けないかを考える
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Tutorial: Getting started with generics",
                  url: "https://go.dev/doc/tutorial/generics",
                  description: "型パラメータと制約を順に試す公式チュートリアル",
                },
                {
                  title: "When To Use Generics",
                  url: "https://go.dev/blog/when-generics",
                  description:
                    "ジェネリクスとインターフェースの使い分けを解説した公式ブログ",
                },
                {
                  title: "Package slices",
                  url: "https://pkg.go.dev/slices",
                  description: "スライス操作のジェネリック関数",
                },
                {
                  title: "Package cmp",
                  url: "https://pkg.go.dev/cmp",
                  description: "cmp.Orderedと比較関数",
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
