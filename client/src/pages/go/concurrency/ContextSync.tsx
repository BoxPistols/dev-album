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

export default function ContextSync() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 11</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          contextとsync
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          複数のgoroutineの終わりを待つsync.WaitGroup、共有データを守るsync.Mutex、処理を途中で止めるcontextを扱います。
          データ競合は実際に-raceで検出してから直します。
        </p>

        <WhyNowBox tags={["sync.WaitGroup", "sync.Mutex", "-race", "context"]}>
          <p>
            前のSTEPではchannelで値を受け渡しました。実際のコードでは「全員の終わりを待つ」「同じ変数を安全に更新する」「時間がかかりすぎたら止める」の3つが頻繁に必要になります。
            特にcontextは、HTTPハンドラーやデータベースのAPIの第1引数として至るところに現れます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              sync.WaitGroupで終わりを待つ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <Code>sync.WaitGroup</Code>
              は、終わっていないgoroutineの数を数えるカウンターです。起動前に
              <Code>Add(1)</Code>、終わったら<Code>Done()</Code>
              、待つ側は<Code>Wait()</Code>
              で数が0になるまで止まります。TypeScriptの
              <Code>await Promise.all(tasks)</Code>に当たる使い方です。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	for i := range 3 {
		wg.Add(1) // goroutineを起動する前に数を増やす
		go func() {
			defer wg.Done() // 終わったら数を減らす
			fmt.Println("task", i)
		}()
	}
	wg.Wait() // 数が0になるまで待つ
	fmt.Println("すべて完了")
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# task 2
# task 0
# task 1
# すべて完了
# taskの順番は実行ごとに変わる。「すべて完了」は必ず最後`}
              language="bash"
              title="実行結果"
            />
            <InfoBox type="warning" title="Addはgoroutineの外で呼ぶ">
              <p>
                <Code>wg.Add(1)</Code>
                をgoroutineの中に書くと、goroutineが動き出す前に
                <Code>Wait()</Code>
                が呼ばれ、数が0のまま待たずに抜けることがあります。起動する側で先に数えます。
              </p>
            </InfoBox>
            <InfoBox type="info" title="ループ変数とクロージャ（Go 1.22から）">
              <p>
                上のクロージャはループ変数<Code>i</Code>
                をそのまま使っています。Go
                1.22からループ変数はイテレーションごとに別の変数になったので、各goroutineは自分の回の値を見ます。go.modの
                <Code>go</Code>
                行が1.21以前のモジュールでは古い動作になり、全員が同じ変数を共有します。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              データ競合を-raceで見つける
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              複数のgoroutineが同じ変数を同時に読み書きし、少なくとも1つが書き込みである状態を「データ競合（data
              race）」と呼びます。 JavaScriptは1スレッドで動くので、
              <Code>count++</Code>
              が途中で割り込まれることはありません。Goでは<Code>count++</Code>
              が「読む・足す・書く」に分かれて別々のコアで同時に走るため、更新が失われます。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	count := 0
	for range 1000 {
		wg.Add(1)
		go func() {
			defer wg.Done()
			count++ // 複数のgoroutineが同時に読み書きする
		}()
	}
	wg.Wait()
	fmt.Println(count)
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <p className="text-muted-foreground my-4 leading-relaxed">
              仕様では、データ競合のあるプログラムの結果は保証されません。実測では、1000回足したのに
              <Code>978</Code>や<Code>839</Code>
              のように実行ごとに違う値になり、たまたま1000になることもあります。
              理由は、どの更新が上書きされるかがスケジューリング次第だからです。
              たまたま正しい値が出ても安全とは言えないので、
              <Code>-race</Code>フラグを付けて競合検出器で確かめます。
            </p>
            <CodeBlock
              code={`go run -race .
# ==================
# WARNING: DATA RACE
# Read at 0x00c000012168 by goroutine 12:
#   main.main.func1()
#       .../main.go:15 +0x84
#
# Previous write at 0x00c000012168 by goroutine 8:
#   main.main.func1()
#       .../main.go:15 +0x96
#
# Goroutine 12 (running) created at:
#   main.main()
#       .../main.go:13 +0x7d
# ...（同じ形の報告が続く）
# ==================
# 839
# Found 2 data race(s)
# exit status 66`}
              language="bash"
              title="実行結果（アドレス・goroutine番号・件数は実行ごとに変わる）"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              「15行目の読み込み」と「別のgoroutineによる15行目の書き込み」がぶつかっていること、どちらも13行目で起動したgoroutineであることが読み取れます。
              競合検出器は実際に実行された経路だけを調べるので、テストでも
              <Code>go test -race</Code>として日常的に回します。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              sync.Mutexで守る
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <Code>sync.Mutex</Code>
              は、<Code>Lock()</Code>から<Code>Unlock()</Code>
              までの区間に同時に1つのgoroutineしか入れないようにする鍵です。
              共有するデータとMutexを同じ構造体にまとめ、メソッドの中だけで触るようにすると、ロックのかけ忘れを防げます。
              <Code>defer c.mu.Unlock()</Code>
              と書けば、途中でreturnしても必ず解放されます。
            </p>
            <CodeBlock
              code={`package main

import (
	"fmt"
	"sync"
)

type Counter struct {
	mu sync.Mutex
	n  int
}

func (c *Counter) Inc() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.n++
}

func (c *Counter) Value() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.n
}

func main() {
	var wg sync.WaitGroup
	var c Counter
	for range 1000 {
		wg.Add(1)
		go func() {
			defer wg.Done()
			c.Inc()
		}()
	}
	wg.Wait()
	fmt.Println(c.Value())
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run -race .
# 1000`}
              language="bash"
              title="実行結果（競合の報告は出ない）"
            />
            <InfoBox type="info" title="channelとMutexの使い分け">
              <p>
                値の受け渡しや仕事の分担にはchannel、カウンターやキャッシュのような共有状態の保護にはMutexが向いています。
                読み込みが多い場合は、読み込み同士を同時に許す
                <Code>sync.RWMutex</Code>もあります。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              contextで期限とキャンセルを伝える
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <Code>context.Context</Code>
              は、「この処理はいつまでに終えるべきか」「もう結果は要らないか」を関数の呼び出しの連鎖に沿って伝える値です。
              受け取る関数は<Code>ctx.Done()</Code>
              が返すchannelを<Code>select</Code>
              で見張り、閉じたら作業をやめて<Code>ctx.Err()</Code>
              を返します。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>
                <Code>context.WithTimeout(parent, d)</Code>
                ：時間dが過ぎると自動でDoneが閉じる。Errは
                <Code>context.DeadlineExceeded</Code>
              </li>
              <li>
                <Code>context.WithCancel(parent)</Code>
                ：返された<Code>cancel()</Code>
                を呼ぶとDoneが閉じる。Errは<Code>context.Canceled</Code>
              </li>
              <li>
                どちらも<Code>cancel</Code>
                関数を返す。使い終わったら<Code>defer cancel()</Code>
                で必ず呼ぶ（go vetが呼び忘れを指摘する）
              </li>
            </ul>
            <CodeBlock
              code={`package main

import (
	"context"
	"fmt"
	"time"
)

// ctxは第1引数で受け取るのが慣習
func slowQuery(ctx context.Context, d time.Duration) (string, error) {
	select {
	case <-time.After(d): // 重い処理の代わり
		return "結果", nil
	case <-ctx.Done(): // キャンセルか期限切れで閉じる
		return "", ctx.Err()
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel() // 期限前に終わっても必ず呼んで資源を解放する

	res, err := slowQuery(ctx, 50*time.Millisecond)
	fmt.Println(res, err)

	res, err = slowQuery(ctx, 300*time.Millisecond)
	fmt.Printf("%q %v\\n", res, err)
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# 結果 <nil>
# "" context deadline exceeded`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground my-4 leading-relaxed">
              期限は<Code>ctx</Code>
              に結び付いているので、2回目の呼び出しは残りの約50msで打ち切られます。
              ctxは構造体のフィールドにしまわず、関数の第1引数
              <Code>ctx context.Context</Code>
              として渡すのが慣習です。標準ライブラリの
              <Code>http.NewRequestWithContext</Code>や<Code>database/sql</Code>
              の<Code>QueryContext</Code>
              も同じ形をしています。
            </p>
            <CodeBlock
              code={`package main

import (
	"context"
	"fmt"
	"time"
)

func poll(ctx context.Context) {
	for i := 1; ; i++ {
		select {
		case <-ctx.Done():
			fmt.Println("停止:", ctx.Err())
			return
		case <-time.After(40 * time.Millisecond):
			fmt.Printf("確認%d\\n", i)
		}
	}
}

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	done := make(chan struct{})
	go func() {
		poll(ctx)
		close(done)
	}()

	time.Sleep(100 * time.Millisecond)
	cancel() // 呼び出し側から止める
	<-done
}`}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# 確認1
# 確認2
# 停止: context canceled
# 確認の回数はタイミング次第で前後することがある`}
              language="bash"
              title="実行結果"
            />

            <div className="overflow-x-auto rounded-xl border border-border mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th scope="col" className={TH_CLASS}>
                      やりたいこと
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      TypeScript（AbortController）
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      Go（context）
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">キャンセルできる状態を作る</td>
                    <td className="px-4 py-3">
                      <Code>new AbortController()</Code>
                    </td>
                    <td className="px-4 py-3">
                      <Code>context.WithCancel(ctx)</Code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">キャンセルする</td>
                    <td className="px-4 py-3">
                      <Code>controller.abort()</Code>
                    </td>
                    <td className="px-4 py-3">
                      <Code>cancel()</Code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">受け取る側に渡す</td>
                    <td className="px-4 py-3">
                      <Code>fetch(url, {"{ signal }"})</Code>
                    </td>
                    <td className="px-4 py-3">
                      第1引数に<Code>ctx</Code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">止まったことを知る</td>
                    <td className="px-4 py-3">
                      <Code>signal.aborted</Code>・abortイベント
                    </td>
                    <td className="px-4 py-3">
                      <Code>ctx.Done()</Code>・<Code>ctx.Err()</Code>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">時間で止める</td>
                    <td className="px-4 py-3">
                      <Code>AbortSignal.timeout(ms)</Code>
                    </td>
                    <td className="px-4 py-3">
                      <Code>context.WithTimeout(ctx, d)</Code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              大きな違いは、contextが親子の木になることです。親をキャンセルすると、そこから
              <Code>WithTimeout</Code>や<Code>WithCancel</Code>
              で作った子孫もまとめて止まります。HTTPサーバーではリクエストごとのctxが根になり、クライアントが接続を切るとその先のDB問い合わせまで止められます。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ほかの道具：errgroup
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              「複数のgoroutineを並べて実行し、どれかがエラーを返したら残りをキャンセルして最初のエラーを返す」という定番の形は、
              <Code>golang.org/x/sync/errgroup</Code>
              パッケージにまとまっています。WaitGroup・context・エラーの受け渡しを組み合わせたもので、TypeScriptの
              <Code>Promise.all</Code>
              が1つのrejectで全体を失敗にする動きに近いものです。
              標準ライブラリではなく、Goチームが管理する外部モジュール（golang.org/x）なので、使うときは
              <Code>go get</Code>
              で依存に加えます（依存の追加はSTEP 12で扱います）。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              チャレンジ
            </h2>
            <CodingChallenge
              title="1から10の合計を安全に求める"
              description="___ を埋めて、10個のgoroutineがtotalへ1〜10を足し、すべて終わってから55を表示するプログラムを完成させてください。go run -raceで競合の報告が出ないことが条件です。"
              preview={false}
              previewType="terminal"
              initialCode={`package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	var mu sync.Mutex
	total := 0
	for i := 1; i <= 10; i++ {
		wg.___(1)
		go func() {
			defer wg.Done()
			mu.___()
			total += i
			mu.Unlock()
		}()
	}
	wg.___()
	fmt.Println(total)
}`}
              answer={`package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	var mu sync.Mutex
	total := 0
	for i := 1; i <= 10; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			mu.Lock()
			total += i
			mu.Unlock()
		}()
	}
	wg.Wait()
	fmt.Println(total)
}`}
              hints={[
                "goroutineを1つ起動する前に、WaitGroupの数をAdd(1)で増やします",
                "totalを書き換える前に、MutexのLock()で鍵をかけます",
                "すべてのgoroutineが終わるまで、WaitGroupのWait()で待ちます",
              ]}
              keywords={["wg.Add(1)", "mu.Lock()", "wg.Wait()"]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="go runで何度実行しても期待どおりの値が出るが、複数のgoroutineが同じ変数をロックなしで更新している。正しい理解は？"
              options={[
                { label: "結果が正しいので問題ない" },
                {
                  label:
                    "データ競合があり結果は保証されないので、-raceで確かめてMutexなどで守る",
                  correct: true,
                },
                { label: "コンパイラが自動でロックを入れている" },
                { label: "goroutineの数を減らせば必ず安全になる" },
              ]}
              explanation="データ競合のあるプログラムは、たまたま正しい値が出ても環境や負荷によって結果が変わります。go run -race / go test -raceで検出し、sync.Mutexやchannelで守ります。"
            />
            <Quiz
              question="context.WithTimeoutで作ったctxの期限が切れたとき、ctx.Err()が返すのは？"
              options={[
                { label: "nil" },
                { label: "context.Canceled" },
                { label: "context.DeadlineExceeded", correct: true },
                { label: "io.EOF" },
              ]}
              explanation="期限切れではcontext.DeadlineExceeded、cancel()を呼んだときはcontext.Canceledが返ります。Doneが閉じる前のErr()はnilです。"
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
                    <strong>sync.WaitGroup</strong>
                    のAdd・Done・Waitで複数のgoroutineの終わりを待つ。Addは起動する側で呼ぶ
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
                    データ競合は結果が保証されない。
                    <strong>go run -race</strong>・
                    <strong>go test -race</strong>
                    で見つける
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
                    共有状態は<strong>sync.Mutex</strong>
                    で守り、データと鍵を同じ構造体にまとめる
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
                    <strong>context</strong>
                    は第1引数で渡し、Done・Errで期限とキャンセルを受け取る。cancelはdeferで必ず呼ぶ
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Package sync",
                  url: "https://pkg.go.dev/sync",
                  description: "WaitGroup・Mutex・RWMutexの公式リファレンス",
                },
                {
                  title: "Package context",
                  url: "https://pkg.go.dev/context",
                  description: "WithTimeout・WithCancelと使い方の約束事",
                },
                {
                  title: "Data Race Detector",
                  url: "https://go.dev/doc/articles/race_detector",
                  description: "-raceフラグの使い方と報告の読み方",
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
