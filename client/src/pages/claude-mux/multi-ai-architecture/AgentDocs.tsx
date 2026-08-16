import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import PageSources from "@/components/PageSources";

export default function AgentDocs() {
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
            CLAUDE.md / AGENTS.md / ARCHITECTURE.md
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            エージェント向けのメタドキュメントを、読者と更新頻度で分ける。
            ツール固有の指示・ツール横断の規約・設計の事実を別ファイルに置く構成を、
            公式ドキュメントの記述に沿って確認する。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* ── 出典 ── */}
          <section>
            <p className="text-foreground mb-4 leading-relaxed">
              このページの挙動に関する記述は、以下の一次情報に基づく。
              記載のない挙動については「公式に記述がない」と明示する。
            </p>
            <PageSources path="/claude-mux/multi-ai/agent-docs" />
          </section>

          {/* ── 概要 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              何を分けるのか
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              1 ファイルに全部書くと、性質の違うものが混ざる。 「Claude Code
              にだけ効く操作の指示」「どのツールでも守ってほしい規約」
              「なぜこの構成なのかという設計の事実」は、読む相手も更新の頻度も違う。
              分ける基準はここに置くと迷わない。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      ファイル
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      読む相手
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      内容
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      更新のきっかけ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      CLAUDE.md
                    </td>
                    <td className="p-3 text-muted-foreground">Claude Code</td>
                    <td className="p-3 text-muted-foreground">
                      ツール固有の指示・操作流儀
                    </td>
                    <td className="p-3 text-muted-foreground">
                      同じ訂正を 2 回打った時
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      AGENTS.md
                    </td>
                    <td className="p-3 text-muted-foreground">
                      AGENTS.md に対応した各ツール + 人間
                    </td>
                    <td className="p-3 text-muted-foreground">
                      コーディング規約・テスト方針・PR ルール
                    </td>
                    <td className="p-3 text-muted-foreground">
                      規約が変わった時
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      ARCHITECTURE.md
                    </td>
                    <td className="p-3 text-muted-foreground">人間 + AI</td>
                    <td className="p-3 text-muted-foreground">
                      アーキテクチャ・意思決定・制約
                    </td>
                    <td className="p-3 text-muted-foreground">
                      設計上の事実が変わった時
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="まず CLAUDE.md だけで構わない">
              分割そのものに価値があるわけではない。1
              ファイルで運用が破綻していないなら
              そのままでよく、「他ツールを併用し始めた」「設計判断の記録が指示に埋もれてきた」
              といった具体的な不都合が出た段階で切り出すと無理がない。
            </InfoBox>

            <InfoBox type="warning" title="ARCHITECTURE.md という名前について">
              第 3 層の名前は公式に決まったものではない。ここで
              <code className="text-primary mx-1">ARCHITECTURE.md</code>
              を使うのは、<code className="text-primary mx-1">DESIGN.md</code>が
              Google Labs の公開したフォーマット名として実在し、内容が別物
              （色や書体などのデザイントークンを書くファイル）だからである。
              詳細は次ページの「DESIGN.md」を参照。
            </InfoBox>
          </section>

          {/* ── CLAUDE.md ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              CLAUDE.md
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              Claude Code
              がセッション開始時に読むファイル。置き場所によってスコープが変わり、
              公式ドキュメントは広いスコープから順に次の 4 種類を挙げている。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      スコープ
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      置き場所
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      共有範囲
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      管理ポリシー
                    </td>
                    <td className="p-3 text-muted-foreground font-mono text-xs">
                      /Library/Application Support/ClaudeCode/CLAUDE.md（macOS）
                    </td>
                    <td className="p-3 text-muted-foreground">組織全員</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      ユーザー
                    </td>
                    <td className="p-3 text-muted-foreground font-mono text-xs">
                      ~/.claude/CLAUDE.md
                    </td>
                    <td className="p-3 text-muted-foreground">
                      自分の全プロジェクト
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      プロジェクト
                    </td>
                    <td className="p-3 text-muted-foreground font-mono text-xs">
                      ./CLAUDE.md または ./.claude/CLAUDE.md
                    </td>
                    <td className="p-3 text-muted-foreground">
                      バージョン管理でチーム共有
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      ローカル
                    </td>
                    <td className="p-3 text-muted-foreground font-mono text-xs">
                      ./CLAUDE.local.md
                    </td>
                    <td className="p-3 text-muted-foreground">
                      自分だけ（.gitignore 対象）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-foreground mb-6 leading-relaxed">
              作業ディレクトリから上へ親をたどって見つかったものは、起動時にすべて読み込まれる。
              内容は上書きではなく連結され、ファイルシステムのルート側から作業ディレクトリ側へ
              順に並ぶ。つまり起動した場所に近いものほど後に読まれる。
              作業ディレクトリより下のサブディレクトリにあるものは起動時には読まれず、
              そのディレクトリのファイルを読んだ時に読み込まれる。
            </p>

            <CodeBlock
              language="markdown"
              code={`# CLAUDE.md（Claude Code 固有）

# このプロジェクト固有の運用
- パッケージマネージャは pnpm（npm ではない）
- テスト: pnpm test / 型チェック: pnpm check
- 教材ページを追加したら announcements.ts の先頭にエントリを足す

# 触る前に確認するもの
- src/billing/ 配下の変更は plan mode で進める`}
            />

            <InfoBox type="info" title="長さの目安は 200 行">
              公式ドキュメントは 1 ファイルあたり 200 行未満を目標に挙げている。
              長いファイルはコンテキストを食い、指示の遵守率も下がる。
              超えそうなら次に出てくる
              <code className="text-primary mx-1">.claude/rules/</code>
              のパススコープ機能に逃がす。
            </InfoBox>
          </section>

          {/* ── AGENTS.md ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              AGENTS.md
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              公式サイトはこれを「エージェント向けの README」と説明している。
              README に書くと human の読者にとってノイズになる情報
              （ビルド手順・テスト・規約）を置く場所として定義されており、
              特定ベンダーのファイルを増やさないために共通の名前と形式が選ばれた、と述べている。
            </p>

            <CodeBlock
              language="markdown"
              code={`# AGENTS.md（ツール横断）

# コーディング規約
- TypeScript の any は使わない
- React コンポーネントは PascalCase
- hook は use プレフィックス

# テスト方針
- 単体テストは Vitest
- E2E は Playwright
- 新規実装には少なくとも 1 ケースのテストを添える

# PR ルール
- PR タイトルは日本語、簡潔に
- 1 PR = 1 関心事`}
            />

            <p className="text-foreground mb-6 leading-relaxed">
              モノレポではパッケージごとに AGENTS.md を置ける。
              公式サイトは「エージェントはディレクトリツリー上で最も近いファイルを読むので、
              最も近いものが優先される」としている。
            </p>

            <InfoBox type="warning" title="Claude Code は AGENTS.md を読まない">
              公式ドキュメントは
              <span className="font-semibold">
                「Claude Code reads CLAUDE.md, not AGENTS.md.」
              </span>
              と明記している。すでに AGENTS.md がある場合は、CLAUDE.md から
              import して 同じ内容を両方のツールに読ませる。Claude Code
              固有の指示は import の下に足す。
            </InfoBox>

            <CodeBlock
              language="markdown"
              code={`@AGENTS.md

## Claude Code

Use plan mode for changes under \`src/billing/\`.`}
            />

            <p className="text-foreground leading-relaxed">
              Claude Code
              固有の内容を足す必要がなければ、シンボリックリンクでもよい （
              <code className="text-primary">ln -s AGENTS.md CLAUDE.md</code>
              ）。 ただし Windows
              ではシンボリックリンクの作成に管理者権限か開発者モードが要るため、
              公式は
              <code className="text-primary mx-1">@AGENTS.md</code>の import
              を使うよう案内している。
            </p>
          </section>

          {/* ── import の実際 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              @import で分割してもコンテキストは減らない
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              CLAUDE.md は
              <code className="text-primary mx-1">@path/to/import</code>
              で他のファイルを取り込める。相対パスは「その import
              を書いたファイル」からの相対で解決され、
              取り込まれたファイルはさらに import できる（最大 4 ホップ）。
              バッククォートで囲んだ
              <code className="text-primary mx-1">`@README`</code>は import
              されず、ただの文字列として扱われる。
            </p>

            <InfoBox type="warning" title="よくある誤解">
              「3 層に分けると各ファイルが軽くなる」のは
              <span className="font-semibold">
                編集と所有の話であって、コンテキスト消費の話ではない
              </span>
              。 公式ドキュメントは「imports に分けるのは整理には役立つが、
              import
              されたファイルは起動時に読み込まれるためコンテキストは減らない」と述べている。
              実際にコンテキストを減らすのは、次の
              <code className="text-primary mx-1">paths:</code>
              を持つルールのほうである。
            </InfoBox>

            <CodeBlock
              language="markdown"
              code={`---
paths:
  - "src/api/**/*.ts"
---

# API Development Rules

- All API endpoints must include input validation
- Use the standard error response format`}
            />

            <p className="text-foreground leading-relaxed">
              <code className="text-primary">.claude/rules/</code>
              に置いたファイルは、frontmatter の
              <code className="text-primary mx-1">paths</code>
              に書いたパターンに一致するファイルを Claude
              が読んだ時にだけ読み込まれる。
              <code className="text-primary mx-1">paths</code>
              を持たないルールは起動時に無条件で読み込まれ、
              <code className="text-primary mx-1">.claude/CLAUDE.md</code>
              と同じ優先度になる。
            </p>
          </section>

          {/* ── ARCHITECTURE.md ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ARCHITECTURE.md
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              アーキテクチャ・意思決定・制約。コードを読めば分かることは書かない。
              「なぜこう作ったか」「何が前提か」だけを残す。 AI
              への指示というより、人間も含めた関係者のための事実集にあたる。
            </p>

            <CodeBlock
              language="markdown"
              code={`# ARCHITECTURE.md

# アーキテクチャ
- フロントエンド: React 19 + Vite
- 状態管理: server state は TanStack Query、UI 状態は Zustand
- ルーティング: wouter
- 国際化: 現状なし（将来 i18next）

# 主要な制約
- ローカル LLM 用に Ollama 連携を残す（クラウドのみにしない）
- IE 非対応、Safari 16+

# 意思決定の記録（採用・不採用）
## 採用: pnpm
- 理由: monorepo の共有パッケージが多い、symlink ベースが軽い
## 不採用: tRPC
- 理由: GraphQL の既存資産があるため

# 既知の課題
- ビルド時間が長い（5 分超）→ Turbopack 移行を検討中`}
            />

            <p className="text-foreground mt-6 leading-relaxed">
              内容としては ADR（Architecture Decision
              Record）として書かれてきたものに近い。
              「過去に検討して見送った選択肢」を書いておくと、
              エージェントが同じ提案を繰り返すのを減らせる。
            </p>

            <InfoBox
              type="info"
              title="第 3 層は CLAUDE.md / AGENTS.md のどちらの仕様にも含まれない"
            >
              Claude Code の公式ドキュメントは「Claude Code reads CLAUDE.md, not
              AGENTS.md.」と述べ、agents.md はリポジトリのルートに AGENTS.md
              を置く形式を定めている。 3 つ目のファイルはそのどちらにも登場しない。
              読ませたいなら CLAUDE.md / AGENTS.md から明示的に参照する。
              置くだけで読まれることを前提にしない。
            </InfoBox>
          </section>

          {/* ── 運用例 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              3 層を組み合わせる
            </h2>

            <CodeBlock
              language="markdown"
              code={`# CLAUDE.md（最小構成）

@AGENTS.md

このプロジェクトの設計判断は ARCHITECTURE.md に記録している。
アーキテクチャに関わる変更を提案する前に読むこと。

## Claude Code 固有
- Skills は .claude/skills/ 配下を参照
- パススコープのルールは .claude/rules/ に置く`}
            />

            <InfoBox type="info" title="/compact のあとに何が残るか">
              「compact 後に再読込せよ」と CLAUDE.md
              に書く必要はない。公式ドキュメントは プロジェクトルートの
              CLAUDE.md は compaction を生き延び、
              <span className="font-semibold">
                ディスクから再読込されてセッションに再注入される
              </span>
              としている。一方、サブディレクトリの CLAUDE.md と
              <code className="text-primary mx-1">paths:</code>
              付きのルールは自動では再注入されず、
              該当するファイルを次に読んだ時に読み込まれる。
            </InfoBox>

            <p className="text-foreground leading-relaxed">
              どのファイルが実際に読み込まれたかはセッション中に
              <code className="text-primary mx-1">/context</code>の Memory files
              で確認できる。分割の効果を測るなら、
              構成を議論する前にまずここを見る。
            </p>
          </section>

          {/* ── 注意 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">注意点</h2>

            <div className="space-y-4">
              <InfoBox type="info" title="ファイルを増やしすぎない">
                3 つで足りるのにメタドキュメントを 10 個に分けると、
                どこに何が書いてあるか追えなくなる。 3
                層を超える分割は、追加のたびに「なぜ既存ファイルに収まらないか」を説明できる時だけ。
              </InfoBox>

              <InfoBox type="info" title="矛盾を残さない">
                公式ドキュメントは「2 つのルールが矛盾していると、Claude
                はどちらかを任意に選ぶことがある」
                としている。同じ事実が複数ファイルにあると、片方の更新漏れがそのまま矛盾になる。
                重複を見つけたら、どちらかを正にして、もう一方からは参照だけ残す。
              </InfoBox>

              <InfoBox type="info" title="指示は context であって強制ではない">
                公式ドキュメントは CLAUDE.md をシステムプロンプトではなく
                システムプロンプト後のユーザーメッセージとして届くものと説明しており、
                厳密な遵守は保証されないと明記している。 必ず実行させたい処理は
                hooks、ツールやパスの禁止は permissions と、
                強制力のある層に置く。
              </InfoBox>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
