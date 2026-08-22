import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import StepHeading from "@/components/StepHeading";
import PageToc from "@/components/PageToc";

export default function WhenStuck() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            詰まったときの手順
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            止まっている時間の長さは、才能ではなく段取りで決まります。
            順番を決めておけば、次に打つ手が必ず残ります。
          </p>
        </div>

        <PageToc
          items={[
            { id: "read", label: "エラーを最後まで読む", step: 1 },
            { id: "reproduce", label: "再現する最小の形にする", step: 2 },
            { id: "bisect", label: "動く状態との差を半分ずつ消す", step: 3 },
            { id: "ask", label: "人に聞く形に書き出す", step: 4 },
            { id: "log", label: "解けたら記録する" },
          ]}
        />

        <div className="space-y-12 mt-8">
          <section>
            <StepHeading step={1} id="read" title="エラーを最後まで読む" />
            <p className="leading-relaxed mb-4 text-muted-foreground">
              エラーが出たとき、最初の 1 行だけ見て検索に貼る人が多いのですが、
              <strong>原因は下のほうに書いてあることが多い</strong>です。
              スタックトレースは呼び出しの順に並ぶので、
              自分が書いたファイル名が出てくる最初の行が起点になります。
            </p>
            <ul className="space-y-2 leading-relaxed text-muted-foreground list-disc pl-5">
              <li>「Caused by」「原因」の後ろを読む</li>
              <li>自分のファイル名が出てくる行を探す。ライブラリ内部の行は飛ばす</li>
              <li>行番号と列番号があれば、そこを直接開く</li>
              <li>
                英語のメッセージは、そのまま読める形に分ける。
                <code>Cannot read properties of undefined (reading &apos;map&apos;)</code>
                なら「undefined に対して map を呼んだ」
              </li>
            </ul>
          </section>

          <section>
            <StepHeading step={2} id="reproduce" title="再現する最小の形にする" />
            <p className="leading-relaxed mb-4 text-muted-foreground">
              直す前に、<strong>いつでも同じように失敗させられる状態</strong>を作ります。
              再現できないものは、直ったかどうかも判定できません。
            </p>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              このとき、関係なさそうな部分を削っていきます。削って再現しなくなったら、
              直前に削ったものが関係していたことがわかります。
              <strong>削る作業そのものが原因の絞り込みになっています</strong>。
            </p>
            <div className="mt-6">
              <InfoBox type="info" title="削るのが怖いときはコピーを作る">
                作業用のブランチを切る、ファイルを複製する、
                新しい空のプロジェクトに問題の部分だけ持っていく。
                戻せる形にしてから削ると、思い切って削れます。
              </InfoBox>
            </div>
          </section>

          <section>
            <StepHeading step={3} id="bisect" title="動く状態との差を半分ずつ消す" />
            <p className="leading-relaxed mb-4 text-muted-foreground">
              動く状態と動かない状態の両方があるなら、その差を半分ずつ潰します。
              10 個の違いがあっても、4 回ほどで 1 つに絞れます。
            </p>
            <CodeBlock
              language="bash"
              title="履歴に対しては git が自動でやってくれる"
              code={`# 「今は壊れている / このコミットでは動いていた」がわかっているとき
git bisect start
git bisect bad                 # 現在の状態は壊れている
git bisect good <動いていたコミット>

# 提示されたコミットで動作を確認し、good か bad を答える
git bisect good   # または git bisect bad

# 原因のコミットが特定されたら終了
git bisect reset`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              履歴に対してだけでなく、設定ファイル、依存関係、環境変数にも同じ手が使えます。
              考え方は<strong>「半分にして、どちらに問題があるか確かめる」</strong>です。
            </p>
          </section>

          <section>
            <StepHeading step={4} id="ask" title="人に聞く形に書き出す" />
            <p className="leading-relaxed mb-4 text-muted-foreground">
              相手が人でも AI でも、書く内容は同じです。
              そして<strong>書いている途中で自分で解決することがよくあります</strong>。
              説明可能な形に整理する過程が、そのまま切り分けになるためです。
            </p>
            <CodeBlock
              language="markdown"
              title="質問に入れる 5 つ"
              code={`## やりたいこと
（最終的に何をしたいのか。手段ではなく目的）

## 起きていること
（エラーの全文。省略しない。個人情報とトークンだけ伏せる）

## 環境
（OS、言語とツールの版。npm ls や --version の出力を貼る）

## 試したこと
（何をして、どうなったか。効かなかったことも書く）

## わかっていること
（ここまでは動く、という起点。切り分けの結果）`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              「試したこと」を書くと、同じ提案を繰り返し受けずに済みます。
              「わかっていること」を書くと、相手は範囲を絞って考えられます。
              この 2 つが、返ってくる答えの質をいちばん変えます。
            </p>
            <div className="mt-6">
              <InfoBox type="warning" title="貼る前に伏せるもの">
                API キー、トークン、接続文字列、社内の URL、顧客名。
                エラーログにはこれらが混ざりやすく、
                一度公開の場に貼ると取り消せません。貼る前に一度読み返します。
              </InfoBox>
            </div>
          </section>

          <section>
            <h2 id="log" className="text-3xl font-bold mb-6 scroll-mt-24">
              解けたら記録する
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              直った直後は「もう忘れない」と思いますが、忘れます。
              残すのは 4 行で足ります。
            </p>
            <CodeBlock
              language="markdown"
              title="4 行で残す"
              code={`症状: pnpm dev がポート衝突で落ちる（EADDRINUSE）
原因: 別プロジェクトの dev サーバが同じ 3000 番を掴んでいた
対処: lsof -ti:3000 で特定して停止。既定ポートを固定値から変更した
教訓: ポートは他プロジェクトと衝突する前提で決める（2026-08-23）`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              大事なのは 4 行目です。症状と対処だけだと、同じ状況でしか使えません。
              <strong>次に似た場面で思い出せる形の一般化</strong>を 1 行足しておくと、
              別の場所で効きます。
            </p>
            <p className="leading-relaxed mt-4 text-muted-foreground">
              置き場所はどこでも構いませんが、
              <strong>検索できる場所に、日付つきで</strong>置きます。
              日付があると、後で読み返したときに情報の古さを自分で判断できます。
            </p>
          </section>
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
