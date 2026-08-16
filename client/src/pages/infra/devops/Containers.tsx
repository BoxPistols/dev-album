import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodingChallenge from "@/components/CodingChallenge";

const concepts = [
  {
    title: "イメージ",
    examples: "image",
    description:
      "アプリと実行に必要なものをひとまとめにした、読み取り専用のテンプレート。ビルドして作り、レジストリで配布する。複数のレイヤが重なってできている。",
  },
  {
    title: "コンテナ",
    examples: "container",
    description:
      "イメージを実行した実体。ホストのカーネルを共有しつつ、ファイルやプロセスは分離される。起動が速く、使い捨ての単位として扱える。",
  },
  {
    title: "レジストリ",
    examples: "registry",
    description:
      "イメージを保管・配布する場所。Docker Hub や各クラウドのレジストリがある。タグでバージョンを区別し、push / pull でやり取りする。",
  },
];

export default function Containers() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
            コンテナと実行環境
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            コンテナは、アプリと実行環境をひとまとめにして「どこでも同じように動く」状態を作る技術です。
            VM との違い、Docker イメージとレイヤの仕組み、Dockerfile の書き方、
            レジストリでの配布、マルチステージビルドによる軽量化、 そして
            Kubernetes
            が何を解決し、いつ必要になるのかまでを一通り見ていきます。
          </p>
        </div>

        <WhyNowBox
          tags={["コンテナ", "Docker", "イメージ", "Kubernetes", "実行環境"]}
        >
          <p>
            「自分の環境では動く」という言葉は、環境差異が引き起こす不具合の典型です。
            コンテナは、アプリと依存をイメージとして固めることで、
            開発・CI・本番のどこでも<strong>同じ実行環境</strong>を再現します。
            Docker
            の操作を覚えること以上に、「環境ごと配る」という発想を持つことが大切です。
            その先に Kubernetes のような運用基盤がありますが、
            まずは小さく始めて、必要になってから足すのが現実的です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              コンテナ と 仮想マシン（VM）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              VM は、ハードウェアを仮想化し、その上にゲスト OS
              をまるごと載せます。 分離は強い一方、OS
              の分だけ重く、起動も遅くなります。 コンテナは、ホストの OS
              カーネルを共有しつつ、
              プロセスやファイルシステムだけを分離します。 OS
              を持たない分、軽くて起動が速く、一台のホストに多数を詰められます。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 text-foreground font-bold border-b border-border">
                      観点
                    </th>
                    <th className="text-left p-3 text-foreground font-bold border-b border-border">
                      仮想マシン（VM）
                    </th>
                    <th className="text-left p-3 text-foreground font-bold border-b border-border">
                      コンテナ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">OS</td>
                    <td className="p-3 text-muted-foreground">
                      ゲスト OS を内包
                    </td>
                    <td className="p-3 text-muted-foreground">
                      ホストのカーネルを共有
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">
                      起動速度
                    </td>
                    <td className="p-3 text-muted-foreground">
                      ゲスト OS の起動を伴う
                    </td>
                    <td className="p-3 text-muted-foreground">
                      ゲスト OS の起動が不要
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-foreground font-medium">
                      分離の強さ
                    </td>
                    <td className="p-3 text-muted-foreground">
                      強い（OS 単位）
                    </td>
                    <td className="p-3 text-muted-foreground">プロセス単位</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="どちらかではなく、組み合わせる">
              実運用ではコンテナを VM の上で動かす構成も一般的です。 VM
              で強い分離の境界を作り、その中でコンテナを密に詰める、
              という使い分けで、分離の強さと集約効率の両方を得られます。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              イメージ・レイヤ・レジストリ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Docker の中心にあるのが<strong>イメージ</strong>です。
              イメージは読み取り専用のテンプレートで、 Dockerfile の各命令が
              <strong>レイヤ</strong>として積み重なってできています。
              レイヤはキャッシュされ、変わっていない部分は再ビルドされません。
              完成したイメージは<strong>レジストリ</strong>へ push
              して配布します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {concepts.map((c) => (
                <div
                  key={c.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {c.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {c.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>

            <MermaidDiagram
              title="図: Dockerfile からコンテナ実行までの流れ"
              chart={`flowchart LR
    D["Dockerfile"] -->|"build"| I["イメージ（レイヤの集まり）"]
    I -->|"push"| RG["レジストリ"]
    RG -->|"pull"| H["別ホスト"]
    I -->|"run"| C["コンテナ（実行中の実体）"]`}
            />

            <InfoBox type="info" title="レイヤの順番がキャッシュ効率を決める">
              変わりにくいもの（依存のインストール）を先に、
              変わりやすいもの（アプリのソース）を後に置くと、
              ソースを変えても依存のレイヤはキャッシュが効きます。 Dockerfile
              の命令の順番が、そのままビルド時間に効いてきます。
            </InfoBox>
          </section>

          <section>
            <Quiz
              question="コンテナと仮想マシン（VM）の最も本質的な違いはどれ？"
              options={[
                { label: "コンテナはネットワークを使えないが VM は使える" },
                {
                  label:
                    "VM はゲスト OS をまるごと持つが、コンテナはホストのカーネルを共有する",
                  correct: true,
                },
                { label: "コンテナはコードを書けないがVMは書ける" },
                { label: "VM のほうが常に起動が速い" },
              ]}
              explanation="VM はハードウェアを仮想化してゲスト OS を載せるため重く起動も遅め。コンテナはホスト OS のカーネルを共有し、プロセスやファイルシステムだけを分離するため軽量で起動が速い、という点が本質的な違いです。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Dockerfile とマルチステージビルド
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>Dockerfile</strong>{" "}
              は、イメージの作り方を記述するファイルです。
              ビルドにはコンパイラや開発依存が必要ですが、
              それらを実行時のイメージに含めると無駄に大きくなります。
              <strong>マルチステージビルド</strong>は、
              ビルド用のステージと実行用のステージを分け、
              最終イメージには成果物だけをコピーする手法です。
            </p>

            <CodeBlock
              language="dockerfile"
              title="Dockerfile — マルチステージビルド"
              code={`# build ステージ: 依存とソースから成果物を作る
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# runtime ステージ: 成果物だけを軽量イメージへ
FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>--from=build</code>{" "}
              で前ステージの成果物だけを取り出しています。
              実行イメージにはコンパイラも開発依存も含まれず、
              軽量で攻撃面の小さいイメージになります。
            </p>

            <CodingChallenge
              preview
              previewType="config"
              title="マルチステージ Dockerfile を完成させよう"
              description="build ステージで作った成果物を runtime ステージへコピーする部分を埋めてください。___ を正しい命令・参照に置き換えます。"
              initialCode={`# build ステージ: 成果物を作る
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# runtime ステージ: 成果物だけを軽量イメージへ
FROM nginx:alpine AS runtime
// build ステージの /app/dist だけをコピーする
COPY ___ /app/dist /usr/share/nginx/html
EXPOSE 80
___ ["nginx", "-g", "daemon off;"]`}
              answer={`# build ステージ: 成果物を作る
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# runtime ステージ: 成果物だけを軽量イメージへ
FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}
              hints={[
                "前のステージから取り出すには --from=build を COPY に付ける",
                "コンテナ起動時に実行するコマンドを指定する命令は CMD",
              ]}
              keywords={["--from=build", "CMD"]}
            />
          </section>

          <section>
            <Quiz
              question="マルチステージビルドを使う主な目的はどれ？"
              options={[
                { label: "ビルドを並列化して速くするため" },
                {
                  label:
                    "ビルド専用の依存を最終イメージから除き、軽量で安全なイメージにするため",
                  correct: true,
                },
                { label: "複数のアプリを1つのコンテナにまとめるため" },
                { label: "Dockerfile を書かずに済ませるため" },
              ]}
              explanation="マルチステージビルドは、ビルド用ステージで成果物を作り、実行用ステージにはその成果物だけをコピーします。コンパイラや開発依存を最終イメージから除けるため、サイズが小さく攻撃面も狭いイメージになります。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Kubernetes は何を解決し、いつ必要か
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              コンテナが増えると、「どのホストでいくつ動かすか」「落ちたら作り直す」
              「負荷に応じて増減する」「無停止で入れ替える」といった運用が必要になります。
              <strong>Kubernetes</strong> は、こうしたコンテナの配置・自己修復・
              スケール・ローリング更新を宣言的に扱うオーケストレーション基盤です。
              「あるべき状態」を宣言すると、現実をそこへ寄せ続けます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ただし Kubernetes は学習・運用のコストも相応にかかります。
              単一サービスや小規模なうちは、マネージドなコンテナ実行サービスや
              小さなオーケストレータで十分なことが多いです。
              <strong>規模と運用要件が複雑さを正当化したとき</strong>
              に導入する、 という順序で考えるのが現実的です。
            </p>

            <InfoBox type="warning" title="先に複雑さを買わない">
              Kubernetes は強力ですが、最初から必要とは限りません。
              小さく始めて、スケールや無停止更新が本当に必要になってから足す。
              ツールの強さと、いま抱える運用課題の大きさを見合わせて選びます。
            </InfoBox>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Docker Documentation",
                  url: "https://docs.docker.com/",
                  description:
                    "イメージ・コンテナ・レジストリの概念と CLI の公式リファレンス",
                },
                {
                  title: "Dockerfile reference",
                  url: "https://docs.docker.com/reference/dockerfile/",
                  description:
                    "Dockerfile の各命令とマルチステージビルドの仕様",
                },
                {
                  title: "Kubernetes Documentation",
                  url: "https://kubernetes.io/docs/home/",
                  description:
                    "コンテナオーケストレーションの概念と入門チュートリアル",
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
