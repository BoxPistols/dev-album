import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

export default function Collections() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 5</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          配列・スライス・マップ
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          値をまとめて扱う配列・スライス・mapを確認します。
          TypeScriptの配列に当たるのはスライス、オブジェクトやMapに当たるのはmapです。
          スライスが裏の配列を共有する仕組みと、mapの反復順が決まっていない点を、実行結果で確かめます。
        </p>

        <WhyNowBox tags={["[]T", "append", "map[K]V", "slices"]}>
          <p>
            スライスとmapは、JSONの配列とオブジェクトを受け取るときにも、関数の引数や戻り値にも出てきます。
            見た目はTypeScriptの配列とオブジェクトに近いものの、コピーされる範囲やnilの扱いが違うので、ここで挙動を押さえておくとバグを避けやすくなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              配列は長さまで含めて1つの型
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Goの配列
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                [3]int
              </code>
              は長さが固定で、長さも型の一部です。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                [3]int
              </code>
              と
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                [4]int
              </code>
              は別の型として扱われます。
              また配列は値なので、代入や関数への受け渡しで中身が丸ごとコピーされます。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	a := [3]int{1, 2, 3}
	b := a // 配列は代入で丸ごとコピーされる
	b[0] = 100
	fmt.Println(a, b) // [1 2 3] [100 2 3]

	c := [...]string{"x", "y"}  // 要素数から長さを決めさせる
	fmt.Printf("%T %T\\n", a, c) // [3]int [2]string
}`}
              language="go"
              title="array.go"
              showLineNumbers
            />
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	a := [3]int{1, 2, 3}
	var d [4]int = a
	fmt.Println(d)
}`}
              language="go"
              title="array_len.go"
            />
            <CodeBlock
              code={`go run array_len.go
# ./array_len.go:7:17: cannot use a (variable of type [3]int) as [4]int value in variable declaration`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              長さを型に持つので、配列を直接使う場面は多くありません。ふだん使うのは次のスライスです。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              スライスの長さと容量
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              スライス
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                []int
              </code>
              は、裏にある配列の一部を指す「窓」です。 要素数を表す
              <code className="bg-muted px-1 py-0.5 rounded text-xs">len</code>
              と、裏の配列にあと何個まで入るかを表す
              <code className="bg-muted px-1 py-0.5 rounded text-xs">cap</code>
              （容量）を持ちます。 要素の追加は
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                append
              </code>
              で行い、戻り値を受け取り直します。TypeScriptの
              <code className="bg-muted px-1 py-0.5 rounded text-xs">push</code>
              と違い、元のスライスをその場で書き換えるわけではないからです。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	s := []int{1, 2, 3}    // 長さを書かないとスライス
	s = append(s, 4)       // appendは新しいスライスを返すので、必ず受け取る
	fmt.Println(s, len(s)) // [1 2 3 4] 4

	// make([]型, 長さ, 容量)
	buf := make([]int, 3, 10)
	fmt.Println(buf, len(buf), cap(buf)) // [0 0 0] 3 10

	// 容量が足りなくなると、より大きい配列を確保して移し替える
	var grow []int
	for i := range 5 {
		grow = append(grow, i)
		fmt.Print(len(grow), "/", cap(grow), " ")
	}
	fmt.Println()
	// 1/1 2/2 3/4 4/4 5/8（Go 1.24.7での例）
}`}
              language="go"
              title="slice.go"
              showLineNumbers
            />
            <InfoBox type="info" title="容量の増え方は決まっていない">
              <p>
                仕様では、appendは容量が足りないときに新しい配列を確保するとだけ定めていて、どれだけ増やすかは決めていません。
                実測では1, 2, 4,
                8と倍々に増えて見えますが、これはGo 1.24.7の実装での結果で、要素の型やサイズ、Goのバージョンによって変わることがあります。
                容量の値に依存するコードは書かず、要素数が分かっているときは
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  make([]int, 0, n)
                </code>
                で先に確保しておきます。
              </p>
            </InfoBox>

            <p className="text-muted-foreground my-4 leading-relaxed">
              検索や並べ替えは、Go 1.21で標準ライブラリに入った
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                slices
              </code>
              パッケージを使います。TypeScriptの
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                includes
              </code>
              ・
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                indexOf
              </code>
              ・
              <code className="bg-muted px-1 py-0.5 rounded text-xs">sort</code>
              に当たります。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"slices"
)

func main() {
	names := []string{"carol", "alice", "bob"}

	fmt.Println(slices.Contains(names, "bob")) // true
	fmt.Println(slices.Index(names, "alice"))  // 1
	fmt.Println(slices.Index(names, "dave"))   // -1

	slices.Sort(names) // その場で並べ替える（戻り値はない）
	fmt.Println(names) // [alice bob carol]
}`}
              language="go"
              title="slices_pkg.go"
              showLineNumbers
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              スライス式は元の配列を共有する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                s[1:3]
              </code>
              はインデックス1以上3未満を取り出したスライスを作ります。
              TypeScriptの
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                arr.slice(1, 3)
              </code>
              は新しい配列を返しますが、Goのスライス式は
              <strong>コピーせず、同じ配列を指します</strong>
              。そのため、切り出した側への書き込みが元にも見えます。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	nums := []int{10, 20, 30, 40, 50}
	// インデックス1以上3未満。コピーではなく同じ配列を指す
	sub := nums[1:3]
	fmt.Println(sub, len(sub), cap(sub)) // [20 30] 2 4

	sub[0] = 999
	fmt.Println(nums) // [10 999 30 40 50]（元も変わる）

	sub = append(sub, 777) // 容量に余裕があるので、元の配列の次の位置に書き込む
	fmt.Println(nums)      // [10 999 30 777 50]
}`}
              language="go"
              title="share.go"
              showLineNumbers
            />
            <p className="text-muted-foreground my-4 leading-relaxed">
              最後のappendに注目してください。subの容量は4あるので、appendは新しい配列を作らず、元の配列のインデックス3（40があった場所）に777を書き込みます。
              subに足しただけのつもりで、numsの別の要素が書き換わります。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              元と切り離したいときは、
              <code className="bg-muted px-1 py-0.5 rounded text-xs">copy</code>
              で別のスライスに写すか、
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                slices.Clone
              </code>
              （Go 1.21）で複製します。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"slices"
)

func main() {
	nums := []int{10, 20, 30, 40, 50}

	// copyで別の配列に写す（戻り値はコピーした要素数）
	dst := make([]int, 2)
	n := copy(dst, nums[1:3])
	dst[0] = 999
	fmt.Println(n, dst, nums) // 2 [999 30] [10 20 30 40 50]

	// slices.Clone（Go 1.21）でも同じことができる
	c := slices.Clone(nums[1:3])
	c[0] = 0
	fmt.Println(c, nums) // [0 30] [10 20 30 40 50]
}`}
              language="go"
              title="copy.go"
              showLineNumbers
            />
            <p className="text-muted-foreground my-4 leading-relaxed">
              3つ目の値を書く
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                s[low:high:max]
              </code>
              の形では、容量を
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                max - low
              </code>
              に制限できます。容量に余裕がなくなるので、appendは元の配列に書き込まず新しい配列に移ります。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	nums := []int{10, 20, 30, 40, 50}
	sub := nums[1:3:3]              // 3つ目の値で容量を切り詰める
	fmt.Println(len(sub), cap(sub)) // 2 2

	sub = append(sub, 777) // 容量が足りないので新しい配列に移る
	fmt.Println(nums)      // [10 20 30 40 50]（元は変わらない）
	fmt.Println(sub)       // [20 30 777]
}`}
              language="go"
              title="full_slice.go"
              showLineNumbers
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">map</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                map[string]int
              </code>
              は、stringのキーとintの値を持つmapです。TypeScriptの
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                Record&lt;string, number&gt;
              </code>
              や
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                Map&lt;string, number&gt;
              </code>
              に当たります。
              存在しないキーを読むとエラーではなく値の型のゼロ値が返るので、「キーがあるか」は2つ目の戻り値
              <code className="bg-muted px-1 py-0.5 rounded text-xs">ok</code>
              で確かめます。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	ages := map[string]int{"alice": 30, "bob": 25}
	ages["carol"] = 35

	fmt.Println(ages["alice"]) // 30
	fmt.Println(ages["dave"])  // 0（無いキーはゼロ値が返る）

	// 2つ目の戻り値で「キーがあるか」を確かめる
	v, ok := ages["dave"]
	fmt.Println(v, ok) // 0 false

	if age, ok := ages["bob"]; ok {
		fmt.Println("bob:", age) // bob: 25
	}

	delete(ages, "bob")
	fmt.Println(len(ages), ages) // 2 map[alice:30 carol:35]

	// 空のmapはmakeかリテラルで作る
	tags := make(map[string][]string)
	tags["go"] = append(tags["go"], "backend")
	fmt.Println(tags) // map[go:[backend]]
}`}
              language="go"
              title="map.go"
              showLineNumbers
            />

            <InfoBox type="warning" title="仕様値と実測値: mapの反復順">
              <p>
                仕様ではmapの反復順は決まっておらず、同じ順になる保証もありません。
                実測でも、同じプログラムを実行するたびに順番が変わります。実装が反復の開始位置を意図的にランダムにしているためで、順番に依存したコードを書かせないための設計です。
                一方、
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  fmt.Println
                </code>
                でmapを丸ごと表示したときはキーの順に並べて出すので、上の例の表示順は毎回同じです。
              </p>
            </InfoBox>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	m := map[string]int{"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}
	for range 3 {
		for k := range m {
			fmt.Print(k, " ")
		}
		fmt.Println()
	}
}`}
              language="go"
              title="order.go"
            />
            <CodeBlock
              code={`go run order.go
# 実行した例（順番は実行ごとに変わる）
# c d e a b
# a b c d e
# d e a b c`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground my-4 leading-relaxed">
              決まった順で出力したいときは、キーを取り出して並べ替えてから回します。Go
              1.23以降は、キーを順に返す
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                maps.Keys
              </code>
              と、それを並べ替えたスライスにする
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                slices.Sorted
              </code>
              を組み合わせられます。
              それより前のバージョンでは、forでキーをスライスに集めて
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                slices.Sort
              </code>
              します（下のチャレンジの書き方です）。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"maps"
	"slices"
)

func main() {
	m := map[string]int{"b": 2, "c": 3, "a": 1}

	// Go 1.23以降: キーを取り出してソートしてから回す
	for _, k := range slices.Sorted(maps.Keys(m)) {
		fmt.Println(k, m[k])
	}
	// a 1
	// b 2
	// c 3
}`}
              language="go"
              title="sorted_keys.go"
              showLineNumbers
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              nilスライスとnil map
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              スライスとmapのゼロ値は
              <code className="bg-muted px-1 py-0.5 rounded text-xs">nil</code>
              です。nilスライスは長さ0の空のスライスとして使え、appendもできます。
              nil mapも読み取りはできますが、<strong>書き込むとpanic</strong>
              になります。mapは
              <code className="bg-muted px-1 py-0.5 rounded text-xs">make</code>
              かリテラルで作ってから使います。
            </p>
            <CodeBlock
              code={`package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	var s []int                   // nilスライス
	fmt.Println(s == nil, len(s)) // true 0
	s = append(s, 1)              // nilスライスにもappendできる
	fmt.Println(s)                // [1]

	// JSONにするとnilはnull、空スライスは[]になる
	var nilSlice []int
	empty := []int{}
	a, _ := json.Marshal(nilSlice)
	b, _ := json.Marshal(empty)
	fmt.Println(string(a), string(b)) // null []

	var m map[string]int          // nil map
	fmt.Println(m == nil, m["x"]) // true 0（読み取りはできる）
	m["x"] = 1                    // panic
}`}
              language="go"
              title="nil.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run nil.go
# true 0
# [1]
# null []
# true 0
# panic: assignment to entry in nil map
#
# goroutine 1 [running]:
# main.main()
# （以下、スタックトレースが続く）`}
              language="bash"
              title="実行結果"
            />
            <InfoBox type="info" title="JSONではnullと[]が分かれる">
              <p>
                encoding/jsonは、nilスライスを
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  null
                </code>
                、空のスライスを
                <code className="bg-muted px-1 py-0.5 rounded text-xs">[]</code>
                に変換します。フロントエンドが配列を期待しているAPIでは、
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  []int{"{}"}
                </code>
                や
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  make([]int, 0)
                </code>
                で空スライスを作っておくと、受け取る側で
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  null
                </code>
                の分岐が要りません。
              </p>
            </InfoBox>
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
                    <td className="px-4 py-3">可変長の配列</td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        number[]
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        []int
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">末尾に追加</td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        arr.push(x)
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        s = append(s, x)
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">一部を取り出す</td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        arr.slice(1, 3)
                      </code>
                      （コピー）
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        s[1:3]
                      </code>
                      （共有）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">含まれるか</td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        arr.includes(x)
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        slices.Contains(s, x)
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">キーと値の組</td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        Record&lt;string, number&gt;
                      </code>
                      ・
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        Map
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        map[string]int
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">キーがあるか</td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        m.has(k)
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        _, ok := m[k]
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">キーを削除</td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        m.delete(k)
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        delete(m, k)
                      </code>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">反復の順番</td>
                    <td className="px-4 py-3">Mapは挿入順</td>
                    <td className="px-4 py-3">決まっていない</td>
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
              title="単語の出現回数を数える"
              description="___ を埋めて、単語ごとの出現回数をmapで数え、キーの順に表示するプログラムを完成させてください。mapの反復順は決まっていないので、キーをスライスに集めて並べ替えてから表示します。"
              preview={false}
              previewType="terminal"
              initialCode={`package main

import (
	"fmt"
	"slices"
)

func main() {
	words := []string{"go", "ts", "go", "rust", "go", "ts"}

	counts := ___(map[string]int)
	for _, w := range words {
		counts[w]++
	}

	if n, ___ := counts["go"]; ok {
		fmt.Println("goの出現数:", n)
	}

	var keys []string
	for k := range counts {
		keys = ___(keys, k)
	}
	slices.Sort(keys)
	for _, k := range keys {
		fmt.Println(k, counts[k])
	}
}`}
              answer={`package main

import (
	"fmt"
	"slices"
)

func main() {
	words := []string{"go", "ts", "go", "rust", "go", "ts"}

	counts := make(map[string]int)
	for _, w := range words {
		counts[w]++
	}

	if n, ok := counts["go"]; ok {
		fmt.Println("goの出現数:", n)
	}

	var keys []string
	for k := range counts {
		keys = append(keys, k)
	}
	slices.Sort(keys)
	for _, k := range keys {
		fmt.Println(k, counts[k])
	}
}`}
              hints={[
                "書き込めるmapはmakeで作ります。nil mapへの書き込みはpanicになります",
                "mapから読むときの2つ目の戻り値は、キーがあったかを表すboolでokと名付けるのが慣習です",
                "スライスへの追加はappendで行い、戻り値を受け取り直します",
              ]}
              keywords={["make", "ok", "append"]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="nums := []int{1, 2, 3}; sub := nums[0:2]; sub[0] = 9としたあと、nums[0]の値は？"
              options={[
                { label: "1" },
                { label: "9", correct: true },
                { label: "0" },
                { label: "panicになる" },
              ]}
              explanation="スライス式はコピーを作らず、元と同じ配列を指します。sub[0]への書き込みはnums[0]にも反映されるので9です。切り離したいときはcopyやslices.Cloneを使います。"
            />
            <Quiz
              question='var m map[string]intと宣言しただけのmにm["a"] = 1と書き込むとどうなる？'
              options={[
                { label: "キーaに1が入る" },
                { label: "コンパイルエラーになる" },
                { label: "実行時にpanicになる", correct: true },
                { label: "何も起きない" },
              ]}
              explanation="mapのゼロ値はnilで、nil mapは読み取りはできても書き込むとpanicになります。コンパイルは通るので、makeかリテラルで作ってから使う習慣を付けます。"
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
                    配列は長さが型の一部で、代入するとコピーされる。ふだんは
                    <strong>スライス</strong>を使う
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
                    スライスはlenとcapを持ち、<strong>append</strong>
                    の戻り値を受け取り直す。検索や並べ替えはslicesパッケージ
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
                    スライス式は元の配列を<strong>共有</strong>
                    する。切り離すならcopyかslices.Clone
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
                    mapは<strong>v, ok := m[k]</strong>
                    で存在を確かめる。反復順は決まっていないので、順番が要るならキーを並べ替える
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
                    nilスライスにはappendできるが、nil
                    mapへの書き込みはpanicになる
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Go Slices: usage and internals",
                  url: "https://go.dev/blog/slices-intro",
                  description:
                    "スライスと裏の配列の関係を図で解説した公式ブログ",
                },
                {
                  title: "Go maps in action",
                  url: "https://go.dev/blog/maps",
                  description: "mapの使い方と反復順についての公式ブログ",
                },
                {
                  title: "slices package",
                  url: "https://pkg.go.dev/slices",
                  description: "Contains・Index・Sort・Sortedなどの一覧",
                },
                {
                  title: "maps package",
                  url: "https://pkg.go.dev/maps",
                  description: "Keys・Values・Cloneなどの一覧",
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
