import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import PageSources from "@/components/PageSources";

export default function DesignMd() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            DESIGN.md
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Google Labs
            が公開した、ビジュアルアイデンティティをコーディングエージェントに
            伝えるためのフォーマット。YAML front matter のデザイントークンと、
            Markdown
            の根拠で構成される。何ができて何ができないかを、仕様と実測で確認する。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* ── 出典 ── */}
          <section>
            <p className="text-foreground mb-4 leading-relaxed">
              このページは公式リポジトリの仕様と、
              <code className="text-primary mx-1">@google/design.md@0.4.0</code>
              を実際に動かした結果に基づく。仕様の記述と実装の挙動が食い違う箇所は、
              そのことを明示する。
            </p>
            <PageSources path="/claude-mux/multi-ai/design-md" />
          </section>

          {/* ── 何のファイルか ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              何のファイルか
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              公式 README はこう定義している。「A format specification for
              describing a visual identity to coding agents.」
              エージェントに、デザインシステムの永続的で構造化された理解を与えるためのもの。
              出自は Google Labs の UI 生成ツール Stitch
              で、そこで使っていた内部フォーマットが 切り出された。
            </p>

            <p className="text-foreground mb-6 leading-relaxed">
              ファイルは 2 層になっている。上部の YAML front matter
              が機械可読なデザイントークン、 その下の Markdown
              が人間可読な根拠。README は 「The tokens are the normative
              values.（トークンが規範的な値である）」とし、
              散文は適用方法の文脈を与えるものと位置づけている。
            </p>

            <CodeBlock
              language="markdown"
              code={`---
name: Heritage
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  tertiary: "#B8422E"
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 3rem
rounded:
  sm: 4px
spacing:
  sm: 8px
---

## Overview

Architectural Minimalism meets Journalistic Gravitas.

## Colors

- **Primary (#1A1C1E):** Deep ink for headlines and core text.
- **Tertiary (#B8422E):** "Boston Clay" — the sole driver for interaction.`}
            />

            <InfoBox type="warning" title="第 3 のメタドキュメントではない">
              名前が似ているため CLAUDE.md / AGENTS.md
              と並ぶ「設計判断を書くファイル」と
              誤解されやすいが、別物である。DESIGN.md
              に書くのは色・書体・角丸・余白といった
              ビジュアルの値であって、アーキテクチャや技術選定の記録ではない。
              後者は前ページの ARCHITECTURE.md にあたる。
            </InfoBox>
          </section>

          {/* ── スキーマ ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              書ける範囲
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              front matter のトップレベルキーは仕様で決まっている。
              セクションは省略できるが、書く場合は次の順序に従う必要がある （
              <code className="text-primary">section-order</code> が warning
              を出す）。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      #
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      セクション
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      別名
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["1", "Overview", "Brand & Style"],
                    ["2", "Colors", "—"],
                    ["3", "Typography", "—"],
                    ["4", "Layout", "Layout & Spacing"],
                    ["5", "Elevation & Depth", "Elevation"],
                    ["6", "Shapes", "—"],
                    ["7", "Components", "—"],
                    ["8", "Do's and Don'ts", "—"],
                  ].map(([n, section, alias]) => (
                    <tr key={n} className="border-b border-border">
                      <td className="p-3 text-muted-foreground">{n}</td>
                      <td className="p-3 font-semibold text-foreground">
                        {section}
                      </td>
                      <td className="p-3 text-muted-foreground">{alias}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-foreground mb-6 leading-relaxed">
              コンポーネントに書けるプロパティは 8 つに限られる。
              仕様が挙げているのは
              <code className="text-primary mx-1">backgroundColor</code>
              <code className="text-primary mx-1">textColor</code>
              <code className="text-primary mx-1">typography</code>
              <code className="text-primary mx-1">rounded</code>
              <code className="text-primary mx-1">padding</code>
              <code className="text-primary mx-1">size</code>
              <code className="text-primary mx-1">height</code>
              <code className="text-primary mx-1">width</code>
              のみ。hover や active
              などのバリアントは、別のコンポーネントエントリとして書く。
            </p>

            <InfoBox type="warning" title="ボタン 1 個を書ききれない">
              普通のボタンが持つ
              <code className="text-primary mx-1">gap</code>
              <code className="text-primary mx-1">border</code>
              <code className="text-primary mx-1">transition</code>
              <code className="text-primary mx-1">display</code>
              <code className="text-primary mx-1">align-items</code>
              は、いずれもこの 8 つに含まれない。
              <code className="text-primary mx-1">padding: 0 16px</code>
              のような 2 値も範囲外である。散文で「高さは 34px
              にして」と書くことはできるが、
              後述のとおり散文はほとんど検証されない。 「DESIGN.md
              を直せば実装の見た目が変わる」という期待は、仕様の能力として成立しない。
            </InfoBox>
          </section>

          {/* ── CLI ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              CLI にあるのは検証と変換だけ
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              CLI は UI を生成しない。サブコマンドは
              <code className="text-primary mx-1">lint</code>
              <code className="text-primary mx-1">diff</code>
              <code className="text-primary mx-1">export</code>
              <code className="text-primary mx-1">spec</code>の 4 つ。
              既定の出力形式はコマンドごとに違い、0.4.0 の
              <code className="text-primary mx-1">--help</code>
              では
              <code className="text-primary mx-1">lint</code>と
              <code className="text-primary mx-1">diff</code>が
              <code className="text-primary mx-1">--format=&quot;json&quot;</code>、
              <code className="text-primary mx-1">spec</code>が
              <code className="text-primary mx-1">--format=&quot;markdown&quot;</code>、
              <code className="text-primary mx-1">export</code>は既定を持たず必須指定になる。
            </p>

            <CodeBlock
              language="bash"
              code={`# 構造の検証（エラーがあれば exit 1）
npx @google/design.md lint DESIGN.md

# 2 版を比較してトークンの増減と退行を報告
npx @google/design.md diff DESIGN.md DESIGN-v2.md

# Tailwind v4 の @theme ブロックとして書き出し
npx @google/design.md export --format css-tailwind DESIGN.md > theme.css

# W3C Design Tokens Format Module として書き出し
npx @google/design.md export --format dtcg DESIGN.md > tokens.json

# --format に指定できるのは css-tailwind / json-tailwind / tailwind / dtcg / css-vars
# （css-vars は README のフォーマット表に無いが 0.4.0 の --help には出る）

# 仕様そのものを出力（エージェントのプロンプトに流し込む用途）
npx @google/design.md spec --rules`}
            />

            <p className="text-foreground mb-6 leading-relaxed">
              lint が走らせるルールは 11 個。うち WCAG に関わるのは
              <code className="text-primary mx-1">contrast-ratio</code>
              で、コンポーネントの
              <code className="text-primary">backgroundColor</code> と
              <code className="text-primary">textColor</code> の組が AA の 4.5:1
              を 下回る場合に warning を出す。
            </p>

            <InfoBox type="warning" title="検査対象は DESIGN.md 自身">
              ESLint と違い、このツールはプロジェクトのコードを 1 行も読まない。
              11 個のルールが見ているのは DESIGN.md というファイルの書式と、
              その中に閉じたトークンの整合性だけである。
              公式アナウンスの表現も控えめで、検証できるものとして名前が挙がっているのは
              WCAG だけ（「can validate their choices against WCAG accessibility
              rules」）。
              「デザインとして正しいか検証できる」とは書かれていない。
            </InfoBox>

            <p className="text-foreground leading-relaxed">
              散文部分もほぼ検証されない。11 ルールのうち Markdown
              本文を見るのは
              <code className="text-primary mx-1">section-order</code>
              だけで、それも見出しの並び順しか見ない。
            </p>
          </section>

          {/* ── 落とし穴 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              仕様どおりに書くと壊れる箇所
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              フォーマットは
              <code className="text-primary mx-1">alpha</code>
              段階で、README 自身が「Expect changes to the format as it
              matures.」と 書いている。実装との食い違いも残っている。 次は
              <code className="text-primary mx-1">@google/design.md@0.4.0</code>
              で再現を確認したもの。
            </p>

            <p className="text-foreground mb-4 leading-relaxed">
              仕様のトークンスキーマは
              <code className="text-primary mx-1">
                spacing: &lt;Dimension | number&gt;
              </code>
              と数値を許可している。しかし YAML の数値として書くと export
              から落ちる。
            </p>

            <CodeBlock
              language="yaml"
              code={`typography:
  body:
    lineHeight: 1.5      # 数値のまま
  body2:
    lineHeight: "1.5"    # 文字列
spacing:
  sm: 8                  # 数値のまま
  md: 16px               # 単位つき`}
            />

            <CodeBlock
              language="bash"
              code={`$ npx @google/design.md@0.4.0 export --format css-tailwind P.md
@theme {
  --color-primary: #1a1c1e;
  --font-body: "Public Sans";
  --font-body2: "Public Sans";
  --leading-body2: 1.5;    # body は出力されていない
  --spacing-md: 16px;      # sm は出力されていない
}

$ npx @google/design.md@0.4.0 lint P.md
  "summary": { "errors": 0, "warnings": 0, "infos": 2 }
$ echo $?
0`}
            />

            <InfoBox type="error" title="エラーにならずに消える">
              lint は errors 0 / warnings 0 を返し、終了コードも 0。
              値が失われたことを知らせる出力はどこにもない。 CI
              に組み込んでいれば、当然のように緑になる。
            </InfoBox>

            <div className="space-y-4 mb-6">
              <InfoBox
                type="info"
                title="対策 1: front matter の値はクォートで囲む"
              >
                数値に見えるものを引用符で囲めば、この落ち方は避けられる。
              </InfoBox>

              <InfoBox
                type="info"
                title="対策 2: {参照} は components の中だけで使う"
              >
                README のルール表は
                <code className="text-primary mx-1">broken-ref</code>
                を「error / 解決しないトークン参照」と説明している。
                しかし colors の中に
                <code className="text-primary mx-1">
                  accent: &quot;&#123;colors.nope&#125;&quot;
                </code>
                と書いて 0.4.0 で試すと、lint の findings に broken-ref は現れず
                errors は 0、export では
                <code className="text-primary mx-1">--color-accent</code>
                が出力されないままになる。
              </InfoBox>

              <InfoBox type="info" title="対策 3: 色は #RRGGBB で書く">
                トークンの型定義は任意の CSS カラーを認めているが、
                <code className="text-primary mx-1">
                  hsl(120 100% 50% / -1)
                </code>
                を 0.4.0 で export すると
                <code className="text-primary mx-1">
                  --color-bad: #00ff00-ff;
                </code>
                という CSS として不正な宣言が出力される（lint は errors 0）。
                これがテーマファイルに混ざると、その宣言ごと無効になる。
                仕様も互換性の理由で hex を推奨している。
              </InfoBox>
            </div>

            <p className="text-foreground leading-relaxed">
              仕様の「Consumer Behavior」表は「Duplicate section heading → Error;
              reject the file」と定めている。しかし
              <code className="text-primary mx-1">## Overview</code>
              を 2 つ持つファイルを 0.4.0 の lint にかけても errors は 0
              で、終了コードも 0 だった。重複見出しを弾きたいなら自分で足す（
              <code className="text-primary">
                grep -E &apos;^## &apos; DESIGN.md | sort | uniq -d
              </code>
              ）。
            </p>
          </section>

          {/* ── 実測 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              実物はどう書かれているか
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              以下はこのページ独自の観測ではなく、
              <a
                href="https://github.com/BoxPistols/design-md-docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                design-md-docs
              </a>
              が公開している測定結果を引用したものである（測定スクリプトと対象リストは
              同リポジトリにあり、再現できる）。コミュニティのコレクション
              <code className="text-primary mx-1">awesome-design-md</code>
              に集まった 74 件のうち、64 件は frontmatter に色や書体の値を書いており、
              残り 10 件は frontmatter を 1 行も持たず、色コードも散文の中に地の文として書かれている。
              どちらも lint は通る。
            </p>

            <InfoBox
              type="info"
              title="値が決まっていないなら文章だけで始めてよい"
            >
              決まっていない値を先に埋めると、根拠のない数字が固定化される。
              トークンは後から足せる。
            </InfoBox>

            <p className="text-foreground mb-6 leading-relaxed">
              同じ物差しで本家同梱のサンプル 3 件も測ると、散文の量が実物と大きく違う。
              実物 64 件の散文行数の中央値が 206 行なのに対し、公式サンプルは 37 行。
              同測定は、公式サンプルが実物の分布の外にあると報告している。
              手本にするなら公式サンプルではなく実物の中央値のほうが近い。
            </p>

            <p className="text-foreground leading-relaxed">
              仕様の 8 セクションに入っていないのに過半数が使っている見出しも 3
              つある。
              <code className="text-primary mx-1">Responsive Behavior</code>
              <code className="text-primary mx-1">Iteration Guide</code>
              <code className="text-primary mx-1">Known Gaps</code>
              のうち、後ろの 2 つは仕様が想定していない。 とくに Known Gaps
              は効く。「まだ決めていない」と明示しておかないと、
              エージェントが勝手に、しかも毎回違うやり方で埋める。
            </p>
          </section>

          {/* ── 検証の層 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              従っているかは別に確かめる
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              DESIGN.md
              は実装を見ないので、実装が従っているかを確かめる仕組みは自分で作ることになる。
              判定を 1 種類に絞ると必ず取りこぼすので、性質で分けるのが実際的。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      層
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      向いている判定
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      手段
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">lint</td>
                    <td className="p-3 text-muted-foreground">
                      DESIGN.md 自体の書式
                    </td>
                    <td className="p-3 text-muted-foreground">
                      @google/design.md
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      CSS を読む判定
                    </td>
                    <td className="p-3 text-muted-foreground">
                      数値で書いた決めごと（角丸・影・色の用途）
                    </td>
                    <td className="p-3 text-muted-foreground">
                      computed style の走査（自作）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      画像を見る判定
                    </td>
                    <td className="p-3 text-muted-foreground">
                      余白の印象、全体の調和
                    </td>
                    <td className="p-3 text-muted-foreground">LLM</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-foreground mb-6 leading-relaxed">
              この切り分けには実験の裏づけがある。前掲の design-md-docs が公開している
              <a
                href="https://github.com/BoxPistols/design-md-docs/blob/main/docs/07-machine-verification.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 mx-1"
              >
                検証記録
              </a>
              によれば、同じカード UI を「違反なし」「5 つ全部違反」「2 つだけ違反」の
              3 通りで実装して両方の判定にかけた結果、computed style を走査する判定は
              誤検出も見逃しもゼロで、画像を見る判定も判定できた 12 項目はすべて正解した。
            </p>

            <p className="text-foreground mb-6 leading-relaxed">
              ただし
              <code className="text-primary mx-1">font-weight</code>
              だけは画像から判定できなかった。書体にそのウェイトが無いとブラウザが
              600 も 800 も合成ボールドで描くため、CSS 上は明確な違反でも
              ピクセル上に差が存在しない（見出しのインク画素数が一致することで確認できる）。
              決めごとには「CSS を見ないと分からないもの」と
              「画像を見ないと分からないもの」がある。
            </p>

            <InfoBox
              type="info"
              title="LLM に判定させるなら「分からない」を選択肢に置く"
            >
              上の実験で LLM が font-weight について正直に棄権したのは、
              <code className="text-primary mx-1">undetermined</code>
              という選択肢を用意し、棄権を推奨すると明記し、根拠の記述を必須にし、
              正解を推測できる情報（ファイル名・順序・ラベル）を消したから。
              二択しか渡さなければ、判定できない項目にも必ずどちらかを答える。
              そしてそれは根拠のない推測になる。
            </InfoBox>
          </section>

          {/* ── まとめ ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              一番危ないのは緑になっていること
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              ここまでに挙げた落とし穴は、どれも同じ形をしている。
              数値が消えても、参照が壊れても、散文が 1
              文字も読まれていなくても、 lint は成功し、終了コードは 0 で、CI
              は緑になる。
            </p>

            <p className="text-foreground mb-6 leading-relaxed">
              緑が意味するのは「DESIGN.md
              というファイルの書式が正しい」ことであって、
              画面が意図どおりかとは無関係である。 経路で見ると、DESIGN.md
              からトークン、テーマ、画面へと至る各工程は個別に正しく、
              それぞれの CI も緑で、それでも端から端までは繋がっていない。
            </p>

            <p className="text-foreground mb-6 leading-relaxed">
              抽象論で終わらせないために、いま自分のリポジトリで測れる数字を挙げる。
            </p>

            <CodeBlock
              language="bash"
              code={`# 1. テーマを参照しているファイルの割合
grep -rl "your-theme-package" src --include='*.tsx' | wc -l
find src -name '*.tsx' | wc -l

# 2. 個別指定の量
grep -rho "sx={{\\|style={{" src --include='*.tsx' | wc -l

# 3. デザイン定義から画面までの間にある検証の数`}
            />

            <p className="text-foreground leading-relaxed">
              1 が低くて 2 が高いなら、トークンを直しても画面は変わらない。
              その状態でデザイン定義を整備しても成果は出ない。3 はたいてい 0
              である。
            </p>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
