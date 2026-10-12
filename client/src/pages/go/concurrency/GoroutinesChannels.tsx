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

export default function GoroutinesChannels() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 10</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          goroutineとchannel
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Goの並行処理は、軽量なスレッドであるgoroutineと、goroutine同士で値を受け渡すchannelの2つで組み立てます。
          async/awaitとの違いを確かめながら、送受信のブロック・select・デッドロック・ワーカープールまで進めます。
        </p>

        <WhyNowBox tags={["go", "chan", "select", "close"]}>
          <p>
            JavaScriptはシングルスレッドのイベントループで、待ち時間を
            <Code>await</Code>
            で譲り合います。Goは複数のgoroutineを複数のCPUコアで同時に動かせます。
            HTTPサーバーは1リクエストごとにgoroutineを使うので、仕組みを知っておくとSTEP
            14のサーバーのコードも読みやすくなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              goroutineを起動する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              関数呼び出しの前に<Code>go</Code>
              を付けると、その関数は新しいgoroutineで動き始め、呼び出し側は終わりを待たずに次の行へ進みます。
              goroutineはOSのスレッドではなく、Goのランタイムが少数のOSスレッドの上に割り振る軽量な実行単位で、数千〜数万個を起動しても動きます。
            </p>
            <div className="overflow-x-auto rounded-xl border border-border mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th scope="col" className={TH_CLASS}>
                      観点
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      TypeScript（async/await）
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      Go（goroutine）
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">実行のされ方</td>
                    <td className="px-4 py-3">
                      1スレッドのイベントループで、awaitの地点で切り替わる
                    </td>
                    <td className="px-4 py-3">
                      ランタイムが複数のOSスレッドへ割り振り、同時に動く
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">関数の書き分け</td>
                    <td className="px-4 py-3">
                      <Code>async</Code>
                      を付けた関数は呼び出し側も<Code>await</Code>
                      が要る（関数に「色」が付く）
                    </td>
                    <td className="px-4 py-3">
                      普通の関数を<Code>go f()</Code>
                      で呼ぶだけ。関数側に印は要らない
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">結果の受け取り</td>
                    <td className="px-4 py-3">Promiseの戻り値</td>
                    <td className="px-4 py-3">
                      戻り値は捨てられる。channelで受け渡す
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              注意点は、<Code>main</Code>
              関数が返るとプログラム全体が終わることです。ほかのgoroutineが動いている途中でも待ちません。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"time"
)

func say(msg string) {
	time.Sleep(10 * time.Millisecond)
	fmt.Println(msg)
}

func main() {
	go say("goroutineから") // 新しいgoroutineで実行し、すぐ次の行へ進む
	fmt.Println("mainの終わり")
	// mainが返るとプログラム全体が終了する。sayの出力を待たない
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# mainの終わり`}
              language="bash"
              title="実行結果（「goroutineから」は表示されない）"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Node.jsは保留中のタイマーやI/Oが残っている間はプロセスを終えずに待ちますが、Goは待ちません。
              終わりを待つにはchannelか、次のSTEPで扱う
              <Code>sync.WaitGroup</Code>を使います。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              channelで値を受け渡す
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              channelは、goroutine同士で値を送受信する型付きの管です。
              <Code>make(chan int)</Code>で作り、
              <Code>ch &lt;- v</Code>で送信、<Code>v := &lt;-ch</Code>
              で受信します。
              バッファなしのchannelでは、送信は相手が受信するまで、受信は相手が送信するまでブロックします。
              この「待ち合わせ」が、そのまま同期の手段になります。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func square(n int, out chan<- int) {
	out <- n * n // 受信側が受け取るまで、ここでブロックする
}

func main() {
	ch := make(chan int) // バッファなし
	go square(7, ch)
	result := <-ch // 値が届くまで、ここでブロックする
	fmt.Println(result)
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# 49`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground my-4 leading-relaxed">
              引数の<Code>chan&lt;- int</Code>
              は「送信専用」の意味で、関数の中で受信しようとするとコンパイルエラーになります。受信専用は
              <Code>&lt;-chan int</Code>です。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <Code>make(chan T, n)</Code>
              のように容量を渡すとバッファ付きになり、バッファに空きがある間は受信側がいなくても送信が進みます。
              満杯なら送信が、空なら受信がブロックします。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	ch := make(chan string, 2) // バッファ2
	ch <- "a"                  // 空きがあるので受信側がいなくても進む
	ch <- "b"
	fmt.Println(len(ch), cap(ch))
	fmt.Println(<-ch, <-ch)
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# 2 2
# a b`}
              language="bash"
              title="実行結果"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              closeとrange、selectとタイムアウト
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              送信側が<Code>close(ch)</Code>
              を呼ぶと「もう送らない」ことを伝えられます。 受信側の
              <Code>for v := range ch</Code>
              は、closeされてバッファが空になった時点でループを抜けます。
              closeは送信側の役目で、受信側からは呼びません（closeしたchannelへ送信するとpanicします）。
              なお<Code>for i := range n</Code>は、0からn-1まで回すGo
              1.22からの書き方です。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func produce(n int, out chan<- int) {
	defer close(out) // もう送らないことを受信側へ知らせる
	for i := range n {
		out <- i
	}
}

func main() {
	ch := make(chan int)
	go produce(3, ch)
	for v := range ch { // closeされるまで受信を続ける
		fmt.Println(v)
	}
	v, ok := <-ch // close後の受信はゼロ値とfalse
	fmt.Println(v, ok)
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# 0
# 1
# 2
# 0 false`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground my-4 leading-relaxed">
              <Code>select</Code>
              は、複数のchannel操作のうち先に進めるものを1つ選んで実行します。
              <Code>time.After(d)</Code>
              は時間dが過ぎると値が届くchannelを返すので、selectに並べるとタイムアウトになります。
              TypeScriptの<Code>Promise.race</Code>
              に近い書き方です。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"time"
)

func fetch(d time.Duration) <-chan string {
	ch := make(chan string, 1)
	go func() {
		time.Sleep(d)
		ch <- fmt.Sprintf("%vで完了", d)
	}()
	return ch
}

func main() {
	for _, d := range []time.Duration{50 * time.Millisecond, 300 * time.Millisecond} {
		select {
		case msg := <-fetch(d):
			fmt.Println(msg)
		case <-time.After(100 * time.Millisecond):
			fmt.Println("タイムアウト")
		}
	}
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# 50msで完了
# タイムアウト`}
              language="bash"
              title="実行結果"
            />
            <InfoBox type="info" title="バッファを1にしている理由">
              <p>
                <Code>fetch</Code>
                のchannelをバッファなしにすると、タイムアウトした後は誰も受信しないため、送信しようとしたgoroutineがずっとブロックしたまま残ります（goroutineリーク）。
                容量1のバッファがあれば、送信は受信側を待たずに終わります。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              実行順は決まっていない
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              仕様では、goroutineがどの順番で動くかは決められていません。実測では、同じプログラムでも実行するたびに順番が変わることがあり、逆に何度実行しても同じ順に見えることもあります。
              理由は、どのgoroutineをどのOSスレッドでいつ動かすかを、CPUの数や負荷に応じてランタイムのスケジューラーが決めるためです。
              手元で毎回同じ順に出ても、それに頼ったコードは別の環境で壊れることがあります。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"time"
)

func main() {
	for i := range 3 {
		go fmt.Println("goroutine", i)
	}
	time.Sleep(100 * time.Millisecond) // 説明用。実際の待ち合わせはsync.WaitGroupを使う
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`# 6回実行した結果（Go 1.24.7、linux/amd64）。順番は環境と実行ごとに変わる
goroutine 2 / goroutine 0 / goroutine 1   # 5回
goroutine 2 / goroutine 1 / goroutine 0   # 1回`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              順番が必要なら、channelで受け渡すか、結果をインデックス付きで集めてから並べ直します。
              <Code>time.Sleep</Code>
              での待ち合わせは「その時間内に終わるはず」という推測なので、説明以外では使いません。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              デッドロック
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              すべてのgoroutineがchannelの送受信などで止まり、どれも先へ進めなくなった状態がデッドロックです。
              よくあるのは、バッファなしのchannelへ同じgoroutineの中で送信してしまう形です。受信する相手がいないので、送信が永遠に終わりません。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func main() {
	ch := make(chan int)
	ch <- 1 // 受信するgoroutineがいないので、永遠に進めない
	fmt.Println(<-ch)
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# fatal error: all goroutines are asleep - deadlock!
#
# goroutine 1 [chan send]:
# main.main()
# 	.../main.go:7 +0x36
# exit status 2`}
              language="bash"
              title="実行結果（パスと+0x...の値は環境によって変わる）"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              <Code>[chan send]</Code>
              は、そのgoroutineがchannelへの送信で止まっていることを示します。行番号から止まった場所をたどれます。
              ランタイムがこのエラーを出せるのは「全員が止まった」ときだけです。ほかのgoroutineが動いている間は、一部が止まったままでもエラーにならず、goroutineリークとして残ります。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ワーカープール
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまでの部品を組み合わせると、決まった数のgoroutineで仕事を分担する「ワーカープール」が書けます。
              仕事を流すchannelをワーカーが<Code>range</Code>
              で受け取り、送信側がcloseするとワーカーのループが終わります。同時に動く数を制限できるので、外部APIを呼ぶ処理などで使います。
            </p>
            <CodeBlock
              code={`package main

import "fmt"

func worker(id int, jobs <-chan int, results chan<- string) {
	for n := range jobs {
		results <- fmt.Sprintf("worker%d: %d*%d=%d", id, n, n, n*n)
	}
}

func main() {
	jobs := make(chan int)
	results := make(chan string)

	for id := 1; id <= 3; id++ {
		go worker(id, jobs, results)
	}

	go func() {
		for n := 1; n <= 5; n++ {
			jobs <- n
		}
		close(jobs) // ワーカーのrangeを終わらせる
	}()

	for range 5 { // 送った件数だけ受け取る
		fmt.Println(<-results)
	}
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# 出力の一例。どのワーカーが担当するかと順番は実行ごとに変わる
# worker1: 1*1=1
# worker2: 4*4=16
# worker1: 2*2=4
# worker3: 3*3=9
# worker3: 5*5=25`}
              language="bash"
              title="実行結果"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              チャレンジ
            </h2>
            <CodingChallenge
              title="channelで値を受け取る"
              description="___ を埋めて、goroutineが送った10・20・30をmainで順に表示するプログラムを完成させてください。送り終えたらchannelを閉じ、mainはrangeで受け取ります。"
              preview={false}
              previewType="terminal"
              initialCode={`package main

import "fmt"

func main() {
	ch := make(___)
	___ func() {
		for i := 1; i <= 3; i++ {
			ch <- i * 10
		}
		___(ch)
	}()
	for v := range ch {
		fmt.Println(v)
	}
}`}
              answer={`package main

import "fmt"

func main() {
	ch := make(chan int)
	go func() {
		for i := 1; i <= 3; i++ {
			ch <- i * 10
		}
		close(ch)
	}()
	for v := range ch {
		fmt.Println(v)
	}
}`}
              hints={[
                "int型のchannelはmake(chan int)で作ります",
                "goroutineを起動するキーワードはgoです",
                "もう送らないことを伝える組み込み関数はcloseです",
              ]}
              keywords={["chan int", "go func", "close(ch)"]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="main関数の中で「go work()」と書き、直後にmainが返った。work()の処理はどうなる？"
              options={[
                { label: "work()が終わるまでプログラムは終了しない" },
                {
                  label: "プログラムが終了し、work()は途中でも打ち切られる",
                  correct: true,
                },
                { label: "コンパイルエラーになる" },
                { label: "work()がmainの代わりに実行を続ける" },
              ]}
              explanation="mainが返るとプログラム全体が終了し、ほかのgoroutineは待たれません。終わりを待つには、channelで受け取るかsync.WaitGroupを使います。"
            />
            <Quiz
              question="「ch := make(chan int)」のあと、同じgoroutineで「ch <- 1」を実行し、ほかにgoroutineがないとき何が起こる？"
              options={[
                { label: "1がバッファに入り、次の行へ進む" },
                { label: "送信は無視され、次の行へ進む" },
                {
                  label:
                    "受信する相手がいないので止まり、deadlockのfatal errorで終了する",
                  correct: true,
                },
                { label: "コンパイルエラーになる" },
              ]}
              explanation="バッファなしのchannelへの送信は、受信側が受け取るまでブロックします。すべてのgoroutineが止まったので、ランタイムが「all goroutines are asleep - deadlock!」を出して終了します。"
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
                    <strong>go f()</strong>
                    で軽量なgoroutineを起動する。関数にasyncのような印は要らないが、mainが返ると全体が終わる
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
                    <strong>channel</strong>
                    で値を受け渡す。バッファなしは送受信がそろうまでブロックし、
                    <strong>close</strong>と<strong>range</strong>
                    で終わりを伝える
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
                    <strong>select</strong>と<strong>time.After</strong>
                    でタイムアウトを書く
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
                    goroutineの<strong>実行順は不定</strong>
                    。全員が止まるとdeadlockで終了する
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "A Tour of Go: Concurrency",
                  url: "https://go.dev/tour/concurrency/1",
                  description: "goroutine・channel・selectを試せる公式ツアー",
                },
                {
                  title: "Effective Go: Concurrency",
                  url: "https://go.dev/doc/effective_go#concurrency",
                  description: "channelで共有する考え方と使い方",
                },
                {
                  title: "The Go Memory Model",
                  url: "https://go.dev/ref/mem",
                  description: "goroutine間で何が保証されるかの仕様",
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
