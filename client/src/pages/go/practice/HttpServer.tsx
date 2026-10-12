import { Link } from "wouter";
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
const LINK_CLASS = "text-primary underline underline-offset-2";

// 構造体タグにバッククォートを使うので、コード例は定数に分けてエスケープを1か所にまとめる
const JSON_DEMO_CODE = `package main

import (
	"encoding/json"
	"fmt"
)

type Todo struct {
	ID       int    \`json:"id"\`
	Title    string \`json:"title"\`
	Done     bool   \`json:"done"\`
	Note     string \`json:"note,omitempty"\`
	password string
}

func main() {
	b, err := json.Marshal(Todo{ID: 1, Title: "牛乳を買う", password: "secret"})
	if err != nil {
		fmt.Println("error:", err)
		return
	}
	fmt.Println(string(b))

	var t Todo
	err = json.Unmarshal([]byte(\`{"id":2,"title":"Learn Go","extra":true}\`), &t)
	fmt.Printf("%+v %v\\n", t, err)
}`;

const STORE_CODE = `package main

import "sync"

// Todoは1件のTODO。タグでJSONのキー名を決める。
type Todo struct {
	ID    int    \`json:"id"\`
	Title string \`json:"title"\`
	Done  bool   \`json:"done"\`
}

// TodoStoreはメモリ上のTODO一覧。複数のリクエストから同時に触られるのでmuで守る。
type TodoStore struct {
	mu     sync.Mutex
	todos  map[int]Todo
	nextID int
}

func NewTodoStore() *TodoStore {
	return &TodoStore{todos: make(map[int]Todo), nextID: 1}
}

func (s *TodoStore) List() []Todo {
	s.mu.Lock()
	defer s.mu.Unlock()
	list := make([]Todo, 0, len(s.todos))
	for id := 1; id < s.nextID; id++ {
		if t, ok := s.todos[id]; ok {
			list = append(list, t)
		}
	}
	return list
}

func (s *TodoStore) Get(id int) (Todo, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	t, ok := s.todos[id]
	return t, ok
}

func (s *TodoStore) Create(title string) Todo {
	s.mu.Lock()
	defer s.mu.Unlock()
	t := Todo{ID: s.nextID, Title: title}
	s.todos[t.ID] = t
	s.nextID++
	return t
}`;

const HANDLER_CODE = `package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
)

// writeJSONはステータスコードとJSONの本文を書き込む。
func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}

// writeErrorはエラーを{"error": "..."}の形で返す。
func writeError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}

type createTodoRequest struct {
	Title string \`json:"title"\`
}

func newMux(store *TodoStore) *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /todos", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, store.List())
	})

	mux.HandleFunc("GET /todos/{id}", func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			writeError(w, http.StatusBadRequest, "idは整数で指定してください")
			return
		}
		todo, ok := store.Get(id)
		if !ok {
			writeError(w, http.StatusNotFound, "todoが見つかりません")
			return
		}
		writeJSON(w, http.StatusOK, todo)
	})

	mux.HandleFunc("POST /todos", func(w http.ResponseWriter, r *http.Request) {
		var req createTodoRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeError(w, http.StatusBadRequest, "JSONを読み取れません")
			return
		}
		title := strings.TrimSpace(req.Title)
		if title == "" {
			writeError(w, http.StatusBadRequest, "titleは必須です")
			return
		}
		writeJSON(w, http.StatusCreated, store.Create(title))
	})

	return mux
}`;

const MAIN_CODE = `package main

import (
	"log"
	"net/http"
	"time"
)

func main() {
	store := NewTodoStore()

	srv := &http.Server{
		Addr:              ":8080",
		Handler:           newMux(store),
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      10 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	log.Println("listening on :8080")
	log.Fatal(srv.ListenAndServe())
}`;

const TEST_CODE = `package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestCreateAndGetTodo(t *testing.T) {
	mux := newMux(NewTodoStore())

	// POST /todosで1件作る
	body := strings.NewReader(\`{"title":"牛乳を買う"}\`)
	req := httptest.NewRequest(http.MethodPost, "/todos", body)
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusCreated)
	}
	var created Todo
	if err := json.NewDecoder(rec.Body).Decode(&created); err != nil {
		t.Fatalf("decode: %v", err)
	}
	if created.ID != 1 || created.Title != "牛乳を買う" {
		t.Errorf("created = %+v", created)
	}

	// GET /todos/1で取り出せる
	req = httptest.NewRequest(http.MethodGet, "/todos/1", nil)
	rec = httptest.NewRecorder()
	mux.ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}
}

func TestGetTodoErrors(t *testing.T) {
	mux := newMux(NewTodoStore())

	tests := []struct {
		name string
		path string
		want int
	}{
		{name: "存在しないid", path: "/todos/99", want: http.StatusNotFound},
		{name: "整数でないid", path: "/todos/abc", want: http.StatusBadRequest},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, tt.path, nil)
			rec := httptest.NewRecorder()
			mux.ServeHTTP(rec, req)
			if rec.Code != tt.want {
				t.Errorf("status = %d, want %d", rec.Code, tt.want)
			}
			if ct := rec.Header().Get("Content-Type"); ct != "application/json" {
				t.Errorf("Content-Type = %q", ct)
			}
		})
	}
}`;

const ROUTES = [
  {
    pattern: "GET /todos",
    status: "200 OK",
    body: "TODOの配列",
  },
  {
    pattern: "GET /todos/{id}",
    status: "200 OK / 400 / 404",
    body: "TODO1件、またはエラー",
  },
  {
    pattern: "POST /todos",
    status: "201 Created / 400",
    body: "作成したTODO、またはエラー",
  },
];

export default function HttpServer() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 14</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          net/httpでJSON API
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          標準ライブラリだけで、TODOを登録・取得するJSON
          APIを作ります。ルーティング・JSONの読み書き・排他制御・タイムアウト・テストまで、ここまでのSTEPで扱った要素を1つのプログラムにまとめます。
        </p>

        <WhyNowBox tags={["net/http", "ServeMux", "encoding/json", "httptest"]}>
          <p>
            Node.jsではExpressやHonoを入れてAPIを書くことが多いですが、Goは標準の
            <code className={CODE_CLASS}>net/http</code>
            だけで本番運用に耐えるHTTPサーバーを書けます。 Go
            1.22でルーティングのパターンにHTTPメソッドとパスの変数が書けるようになり、小さなAPIなら外部のルーターを入れなくても済みます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作るAPIとファイル構成
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              エンドポイントは3つです。データはメモリ上に持つので、サーバーを止めると消えます。
            </p>
            <div className="overflow-x-auto rounded-xl border border-border mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th scope="col" className={TH_CLASS}>
                      パターン
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      ステータス
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      レスポンス
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {ROUTES.map((row, i) => (
                    <tr
                      key={row.pattern}
                      className={
                        i < ROUTES.length - 1
                          ? "border-b border-border"
                          : undefined
                      }
                    >
                      <td className={TD_CLASS}>
                        <code className={TABLE_CODE_CLASS}>{row.pattern}</code>
                      </td>
                      <td className={TD_CLASS}>{row.status}</td>
                      <td className={TD_CLASS}>{row.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <CodeBlock
              code={`todoapi/
├── go.mod           module example.com/todoapi
├── store.go         Todo型とメモリ上のストア
├── handler.go       ルーティングとハンドラ
├── handler_test.go  httptestを使ったテスト
└── main.go          http.Serverの設定と起動`}
              language="text"
              title="ファイル構成（すべてpackage main）"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              JSONと構造体タグ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={CODE_CLASS}>encoding/json</code>
              は構造体とJSONを相互に変換します。JSONのキー名は、フィールドの後ろに書く
              <strong className="text-foreground">構造体タグ</strong>
              <code className={CODE_CLASS}>{'`json:"id"`'}</code>
              で決めます。タグがなければフィールド名（
              <code className={CODE_CLASS}>ID</code>
              ）がそのままキーになります。
            </p>
            <CodeBlock
              code={JSON_DEMO_CODE}
              language="go"
              title="jsondemo/main.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go run .
# {"id":1,"title":"牛乳を買う","done":false}
# {ID:2 Title:Learn Go Done:false Note: password:} <nil>`}
              language="bash"
              title="実行結果"
            />
            <ul className="space-y-2 text-muted-foreground mt-4 mb-4 leading-relaxed list-disc pl-6">
              <li>
                <code className={CODE_CLASS}>omitempty</code>
                を付けたNoteは、空文字なので出力から省かれた
              </li>
              <li>
                小文字で始まる
                <code className={CODE_CLASS}>password</code>
                は非公開なので、jsonパッケージから見えず出力されない
              </li>
              <li>
                読み込み側では、構造体にないキー（
                <code className={CODE_CLASS}>extra</code>
                ）はエラーにならず無視される
              </li>
            </ul>
            <InfoBox type="info" title="TypeScriptとの違い">
              <p>
                <code className={CODE_CLASS}>JSON.parse</code>
                は形を確かめずに値を返しますが、Goでは受け取る構造体の型が決まっているので、
                <code className={CODE_CLASS}>{'"id":"abc"'}</code>
                のように型が合わない値はエラーになります。
                未知のキーもエラーにしたいときは、Decoderの
                <code className={CODE_CLASS}>DisallowUnknownFields</code>
                を呼びます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ストアをsync.Mutexで守る
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={CODE_CLASS}>net/http</code>
              のサーバーはリクエストごとにgoroutineを起こして、ハンドラを並行に実行します。
              Node.jsのように1つのスレッドで順番に処理されるわけではないので、共有するmapはSTEP
              11の
              <code className={CODE_CLASS}>sync.Mutex</code>
              で保護します。保護しないままmapへ同時に書き込むと、ランタイムがプログラムを停止させることがあります。
            </p>
            <CodeBlock
              code={STORE_CODE}
              language="go"
              title="store.go"
              showLineNumbers
            />
            <InfoBox type="warning" title="仕様ではmapの反復順は不定">
              <p>
                <code className={CODE_CLASS}>for id, t := range s.todos</code>
                でmapを回すと、順序は実行ごとに変わることがあります。
                一覧の順序をIDの昇順で固定するため、Listは
                <code className={CODE_CLASS}>1</code>
                から
                <code className={CODE_CLASS}>nextID</code>
                まで順にキーを引いています。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ServeMuxのパターンでルーティングする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={CODE_CLASS}>http.NewServeMux</code>
              で作ったルーターに、
              <code className={CODE_CLASS}>"メソッド パス"</code>
              の形のパターンとハンドラ関数を登録します。 パスの
              <code className={CODE_CLASS}>{"{id}"}</code>
              はワイルドカードで、ハンドラの中で
              <code className={CODE_CLASS}>r.PathValue("id")</code>
              として文字列で取り出します。メソッドの指定とワイルドカードは、Go
              1.22で入った書き方です。
            </p>
            <CodeBlock
              code={HANDLER_CODE}
              language="go"
              title="handler.go"
              showLineNumbers
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              レスポンスは
              <code className={CODE_CLASS}>Header().Set</code>→
              <code className={CODE_CLASS}>WriteHeader</code>→
              本文の順に書きます。
              <code className={CODE_CLASS}>WriteHeader</code>
              や本文を書いた後に設定したヘッダーは送られないので、
              <code className={CODE_CLASS}>writeJSON</code>
              のように1つの関数にまとめておくと順序を誤りません。 エラーも
              <code className={CODE_CLASS}>{'{"error": "..."}'}</code>
              の決まった形にしておくと、クライアント側で扱いやすくなります。
            </p>
            <InfoBox
              type="warning"
              title="go.modのgoの行が1.22未満だと動きが変わる"
            >
              <p>
                メソッド付きのパターンとワイルドカードが有効になるのは、ビルドするモジュール（mainモジュール）のgo.modで
                <code className={CODE_CLASS}>go</code>
                の行が1.22以上のときです。
                それより古い宣言では互換性のため以前の解釈になり、<code className={CODE_CLASS}>{'"GET /todos/{id}"'}</code>は、先頭の<code className={CODE_CLASS}>GET </code>がホスト名、<code className={CODE_CLASS}>{"{id}"}</code>がただの文字列として解釈されます。そのため実際のリクエストはどのパターンにも一致せず、404が返ります。
                ルーティングが期待どおりに動かないときは、go.modを確認します。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              http.Serverにタイムアウトを設定して起動する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={CODE_CLASS}>
                http.ListenAndServe(":8080", mux)
              </code>
              でも起動できますが、この形ではタイムアウトがすべて未設定（無制限）になります。
              ゆっくり送り続ける接続でサーバーの資源を占有されないよう、
              <code className={CODE_CLASS}>http.Server</code>
              を自分で組み立てて上限を決めます。
            </p>
            <CodeBlock
              code={MAIN_CODE}
              language="go"
              title="main.go"
              showLineNumbers
            />
            <div className="overflow-x-auto rounded-xl border border-border mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th scope="col" className={TH_CLASS}>
                      フィールド
                    </th>
                    <th scope="col" className={TH_CLASS}>
                      上限を決める対象
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className={TD_CLASS}>
                      <code className={TABLE_CODE_CLASS}>
                        ReadHeaderTimeout
                      </code>
                    </td>
                    <td className={TD_CLASS}>
                      リクエストヘッダーを読み終えるまで
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className={TD_CLASS}>
                      <code className={TABLE_CODE_CLASS}>ReadTimeout</code>
                    </td>
                    <td className={TD_CLASS}>
                      本文を含むリクエスト全体を読み終えるまで
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className={TD_CLASS}>
                      <code className={TABLE_CODE_CLASS}>WriteTimeout</code>
                    </td>
                    <td className={TD_CLASS}>レスポンスを書き終えるまで</td>
                  </tr>
                  <tr>
                    <td className={TD_CLASS}>
                      <code className={TABLE_CODE_CLASS}>IdleTimeout</code>
                    </td>
                    <td className={TD_CLASS}>
                      keep-aliveの接続で次のリクエストを待つ間
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="info" title="止めるときの作法">
              <p>
                本番では、SIGTERMを受けたら
                <code className={CODE_CLASS}>srv.Shutdown(ctx)</code>
                を呼び、処理中のリクエストが終わるのを待ってから止めます（グレースフルシャットダウン）。
                待つ時間の上限はSTEP 11の
                <code className={CODE_CLASS}>context</code>
                で指定します。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              curlで叩いてみる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              1つ目の端末でサーバーを起動し、2つ目の端末からcurlでリクエストを送ります。
              以下は実際に送ったときのレスポンスです（
              <code className={CODE_CLASS}>Date</code>
              ヘッダーの行は省略しています）。
            </p>
            <CodeBlock
              code={`go run .
# 2026/10/12 08:11:07 listening on :8080`}
              language="bash"
              title="端末1：サーバーを起動する（Ctrl+Cで止める）"
            />
            <CodeBlock
              code={`curl -i -X POST localhost:8080/todos \\
  -H 'Content-Type: application/json' \\
  -d '{"title":"牛乳を買う"}'
# HTTP/1.1 201 Created
# Content-Type: application/json
# Content-Length: 48
#
# {"id":1,"title":"牛乳を買う","done":false}

curl -i -X POST localhost:8080/todos -d '{"title":"Goを学ぶ"}'
# HTTP/1.1 201 Created
# Content-Type: application/json
# Content-Length: 44
#
# {"id":2,"title":"Goを学ぶ","done":false}

curl -i localhost:8080/todos
# HTTP/1.1 200 OK
# Content-Type: application/json
# Content-Length: 94
#
# [{"id":1,"title":"牛乳を買う","done":false},{"id":2,"title":"Goを学ぶ","done":false}]

curl -i localhost:8080/todos/2
# HTTP/1.1 200 OK
# Content-Type: application/json
# Content-Length: 44
#
# {"id":2,"title":"Goを学ぶ","done":false}`}
              language="bash"
              title="端末2：作成と取得"
            />
            <CodeBlock
              code={`curl -i localhost:8080/todos/99
# HTTP/1.1 404 Not Found
# Content-Type: application/json
# Content-Length: 41
#
# {"error":"todoが見つかりません"}

curl -i localhost:8080/todos/abc
# HTTP/1.1 400 Bad Request
# Content-Type: application/json
# Content-Length: 51
#
# {"error":"idは整数で指定してください"}

curl -i -X POST localhost:8080/todos -d '{"title":""}'
# HTTP/1.1 400 Bad Request
# Content-Type: application/json
# Content-Length: 33
#
# {"error":"titleは必須です"}

curl -i -X DELETE localhost:8080/todos/1
# HTTP/1.1 405 Method Not Allowed
# Allow: GET, HEAD
# Content-Type: text/plain; charset=utf-8
# X-Content-Type-Options: nosniff
# Content-Length: 19
#
# Method Not Allowed`}
              language="bash"
              title="端末2：エラーになるリクエスト"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              登録していないメソッドで送ると、ServeMuxが405と
              <code className={CODE_CLASS}>Allow</code>
              ヘッダーを自動で返します。
              <code className={CODE_CLASS}>GET</code>
              のパターンはHEADリクエストにも一致するので、Allowには
              <code className={CODE_CLASS}>GET, HEAD</code>
              が並びます。
              この405だけは自前のエラー形式ではなくプレーンテキストになる点も、実際に叩くと確認できます。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              httptestでハンドラをテストする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={CODE_CLASS}>net/http/httptest</code>
              を使うと、ポートを開かずにハンドラを呼び出せます。
              <code className={CODE_CLASS}>NewRequest</code>
              でリクエストを作り、
              <code className={CODE_CLASS}>NewRecorder</code>
              でレスポンスを受け取り、ステータス・ヘッダー・本文を検証します。
              エラー系はSTEP 13のテーブル駆動テストで並べます。
            </p>
            <CodeBlock
              code={TEST_CODE}
              language="go"
              title="handler_test.go"
              showLineNumbers
            />
            <CodeBlock
              code={`go test -v .
# === RUN   TestCreateAndGetTodo
# --- PASS: TestCreateAndGetTodo (0.00s)
# === RUN   TestGetTodoErrors
# === RUN   TestGetTodoErrors/存在しないid
# === RUN   TestGetTodoErrors/整数でないid
# --- PASS: TestGetTodoErrors (0.00s)
#     --- PASS: TestGetTodoErrors/存在しないid (0.00s)
#     --- PASS: TestGetTodoErrors/整数でないid (0.00s)
# PASS
# ok  	example.com/todoapi	<所要時間>`}
              language="bash"
              title="実行結果"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              ストアをMutexで守っているので、
              <code className={CODE_CLASS}>go test -race .</code>
              でも競合は報告されません。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              チャレンジ
            </h2>
            <CodingChallenge
              title="パスの変数を返すハンドラ"
              description='GET /hello/{name}に応えて{"message":"Hello, 名前"}をJSONで返すハンドラを、httptestで呼び出して確かめます。___ を埋めてください。実行すると「200 application/json {"message":"Hello, Gopher"}」と表示されます。'
              preview={false}
              previewType="terminal"
              initialCode={`package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("___ /hello/{name}", func(w http.ResponseWriter, r *http.Request) {
		name := r.___("name")
		w.Header().Set("Content-Type", "___")
		json.NewEncoder(w).Encode(map[string]string{"message": "Hello, " + name})
	})

	// サーバーを起動せずにハンドラを呼んで確かめる
	req := httptest.NewRequest(http.MethodGet, "/hello/Gopher", nil)
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)
	fmt.Print(rec.Code, " ", rec.Header().Get("Content-Type"), " ", rec.Body.String())
}`}
              answer={`package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /hello/{name}", func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("name")
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"message": "Hello, " + name})
	})

	// サーバーを起動せずにハンドラを呼んで確かめる
	req := httptest.NewRequest(http.MethodGet, "/hello/Gopher", nil)
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)
	fmt.Print(rec.Code, " ", rec.Header().Get("Content-Type"), " ", rec.Body.String())
}`}
              hints={[
                "パターンの先頭にHTTPメソッドを書きます。取得のリクエストなのでGETです",
                "パスのワイルドカード{name}の値はr.PathValueで取り出します",
                "JSONを返すときのContent-Typeはapplication/jsonです",
              ]}
              keywords={["GET /hello", "PathValue", "application/json"]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="net/httpのサーバーでハンドラから共有のmapを更新するとき、sync.Mutexが必要な理由は？"
              options={[
                { label: "mapはポインタで渡せないから" },
                {
                  label:
                    "リクエストごとにgoroutineが起き、ハンドラが並行に実行されるから",
                  correct: true,
                },
                { label: "JSONに変換するときにロックが要るから" },
                { label: "Go 1.22以降のServeMuxが要求するから" },
              ]}
              explanation="net/httpはリクエストごとにgoroutineでハンドラを実行します。複数のハンドラが同じmapへ同時に書き込むとデータ競合になり、ランタイムがプログラムを停止させることもあるので、Mutexで読み書きを1つずつに制限します。"
            />
            <Quiz
              question='mux.HandleFunc("GET /todos/{id}", h)だけを登録したサーバーに、DELETE /todos/1を送るとどうなる？'
              options={[
                { label: 'hが呼ばれ、r.Methodが"DELETE"になる' },
                { label: "404 Not Foundが返る" },
                {
                  label: "405 Method Not AllowedとAllowヘッダーが返る",
                  correct: true,
                },
                { label: "サーバーがpanicする" },
              ]}
              explanation="パスは一致するがメソッドが一致しないとき、ServeMuxは405を返し、Allowヘッダーに受け付けるメソッド（GETのパターンならGET, HEAD）を並べます。"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このマニュアルのまとめと次の一歩
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
                    <strong>基礎</strong>
                    ：goコマンド1つでビルド・実行・整形を行い、型は静的に決まり、使っていない変数はエラーになる
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
                    <strong>型とインターフェース</strong>
                    ：構造体とメソッドでデータと振る舞いをまとめ、インターフェースは暗黙に満たす。エラーは値として返して扱う
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
                    <strong>並行処理</strong>
                    ：goroutineとchannelで並行に動かし、contextで止め、共有データはMutexで守る
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
                    <strong>実践</strong>
                    ：モジュールで依存を管理し、テーブル駆動テストで検証し、net/httpだけでJSON
                    APIを書ける
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-muted-foreground mt-6 mb-4 leading-relaxed">
              ここから先は、作ったAPIを設計の面と運用の面から広げていくのがおすすめです。
            </p>
            <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-6">
              <li>
                リソース設計・エラー形式・バージョニングなど、APIの形を詰める：
                <Link href="/api" className={LINK_CLASS}>
                  API設計マニュアル
                </Link>
              </li>
              <li>
                作ったバイナリをコンテナに入れてデプロイする：
                <Link href="/infra" className={LINK_CLASS}>
                  インフラマニュアル
                </Link>
              </li>
              <li>
                このAPIに、STEP
                13の書き方でPUTとDELETEのハンドラとテストを足してみる
              </li>
            </ul>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Package net/http",
                  url: "https://pkg.go.dev/net/http",
                  description:
                    "ServeMuxのパターン・http.Serverのタイムアウトの公式リファレンス",
                },
                {
                  title: "Routing Enhancements for Go 1.22",
                  url: "https://go.dev/blog/routing-enhancements",
                  description:
                    "メソッド付きパターンとワイルドカードを紹介する公式ブログ",
                },
                {
                  title: "Package encoding/json",
                  url: "https://pkg.go.dev/encoding/json",
                  description: "構造体タグとomitemptyの仕様",
                },
                {
                  title: "Package net/http/httptest",
                  url: "https://pkg.go.dev/net/http/httptest",
                  description: "NewRequestとNewRecorderのリファレンス",
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
