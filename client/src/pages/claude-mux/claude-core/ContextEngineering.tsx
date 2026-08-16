import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

export default function ContextEngineering() {
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
            コンテキストエンジニアリング
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            トークンは有限資源。何を入れて何を外すかを設計する。
            ハーネスの中で「Inform」を担う層。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* ── 基本原則 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              基本原則: コンテキストは有限
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              Claude Code 公式が最初に強調するのは
              「コンテキストウィンドウは最重要のリソース」という事実。
              会話・読み込んだファイル・コマンド出力のすべてが入り、
              埋まるほどモデルの性能が下がる。
            </p>

            <p className="text-foreground mb-6 leading-relaxed">
              コンテキストエンジニアリングは「何を入れるか」と同じくらい
              「何を入れないか」を考える設計作業。 Skills や Subagents
              は「必要な時だけロード」「別 context で実行」
              という形で、この問題に答えている。
            </p>

            <InfoBox type="info" title="判断基準">
              ある情報を CLAUDE.md に書こうとした時に 「これを抜いたら Claude
              が間違うか？」と自問する。
              間違わないなら入れない。これが最も実用的なフィルタ。
            </InfoBox>
          </section>

          {/* ── 4 つの操作 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              コンテキストを操作する 4 つのコマンド
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              Claude Code は会話中のコンテキストを能動的に操作する手段を備える。
              使い分けを理解すると、長時間セッションでも性能を保てる。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      コマンド
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      動作
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      使い時
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      /clear
                    </td>
                    <td className="p-3 text-muted-foreground">履歴を全消去</td>
                    <td className="p-3 text-muted-foreground">
                      別タスクに切り替える時
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      /compact
                    </td>
                    <td className="p-3 text-muted-foreground">要約に圧縮</td>
                    <td className="p-3 text-muted-foreground">
                      コンテキスト上限が近い時
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      /rewind (Esc Esc)
                    </td>
                    <td className="p-3 text-muted-foreground">
                      過去の checkpoint に戻す
                    </td>
                    <td className="p-3 text-muted-foreground">
                      失敗を巻き戻したい時
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">/btw</td>
                    <td className="p-3 text-muted-foreground">
                      履歴に残らない側問
                    </td>
                    <td className="p-3 text-muted-foreground">
                      ちょっと聞きたい時
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-foreground leading-relaxed">
              特に <code className="text-primary">/btw</code> は
              「ちょい聞き」を会話本体に混ぜずに済む。
              質問と回答は会話履歴に入らず、親会話の prompt cache
              を再利用するため追加コストも小さい。
            </p>
          </section>

          {/* ── CLAUDE.md ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              CLAUDE.md の規律
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              CLAUDE.md は毎回のセッション冒頭に必ず読まれる。
              つまり「全タスクで普遍的に必要な指示だけ」入れる場所。
              ドメイン固有の知識やレシピは Skills に分離する。
            </p>

            <CodeBlock
              language="markdown"
              code={`# 良い CLAUDE.md（短く、抽象でなく具体）
- ESM 構文を使う（require ではなく import / export）
- import は分割代入で書く: import { foo } from 'bar'
- 一連の編集後は必ず型チェックする
- テストは可能なら全実行ではなく対象テストだけ

# CLAUDE.md に書かない方がよいもの
- 言語標準の常識（「クリーンコードを書く」等）
- 頻繁に変わる情報
- 細かい API ドキュメント（リンクで十分）
- ファイルごとの説明（コードを読めば分かる）`}
            />

            <InfoBox type="info" title="場所">
              CLAUDE.md は複数階層に置ける。
              <code className="text-primary">~/.claude/CLAUDE.md</code>{" "}
              は全セッション、 プロジェクトルートの{" "}
              <code className="text-primary">CLAUDE.md</code> はチーム共有、
              <code className="text-primary">CLAUDE.local.md</code>{" "}
              は個人専用（gitignore 推奨）。
            </InfoBox>
          </section>

          {/* ── @import 構文 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              @import で分割管理
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              CLAUDE.md は <code className="text-primary">@path/to/file</code>{" "}
              構文で
              他ファイルを取り込める。長くなりすぎないよう、トピック別に分割する。
            </p>

            <CodeBlock
              language="markdown"
              code={`# CLAUDE.md（プロジェクトルート）

プロジェクトの基本方針は以下を参照:

- @docs/git-workflow.md
- @docs/code-style.md
- @package.json （npm scripts の確認用）

# 個人専用設定
- @~/.claude/my-overrides.md`}
            />

            <p className="text-foreground mt-6 leading-relaxed">
              ただし @import は再帰的に読み込まれて context を膨らませる。
              「常に必要」なものだけ参照する。詳細レシピは Skills に置いて
              必要な時だけロードする方が筋が良い。
            </p>
          </section>

          {/* ── Subagents で隔離 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Subagents で context を隔離する
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              「コードベース全体を調べてほしい」「ログを大量に読んでほしい」
              といった調査系タスクは、メイン会話の context を圧迫する。 Subagent
              に委ねれば、調査のノイズは subagent 側の context に閉じ、
              メイン会話には要約だけが返る。
            </p>

            <CodeBlock
              language="markdown"
              code={`# Claude Code への指示例

# 良い: 調査を subagent に委ねる
subagent を使って auth/ の token refresh の実装を調べて、
既存の OAuth utility が再利用できるかも確認して。要点だけ要約してほしい。

# 悪い: メイン会話で全部読ませる
auth/ 配下の全ファイルを読んで...（ファイル一覧と中身が全部 context に入る）`}
            />
          </section>

          {/* ── Repository Impact Map ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Repository Impact Map
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              プランを立てる前に「実際のコードで何に触れるか」を
              シンボル単位で先に洗い出す。
            </p>

            <CodeBlock
              language="markdown"
              code={`# 指示例: Plan Mode で先にインパクトマップを作る

Plan Mode に入って:

1. ログイン機能に Google OAuth を追加したい
2. まず影響を受けるシンボルを列挙して
   - 認証ミドルウェア
   - セッション管理
   - 環境変数の扱い
3. それぞれが定義されているファイルと行番号を確認
4. その上で、変更が必要な箇所を一覧化してから plan を作る`}
            />

            <p className="text-foreground mt-6 leading-relaxed">
              「いきなり書く」前に「実際のコードに何回触れるか」を
              シンボルレベルで明示すると、推測の幅が減って精度が上がる。
            </p>
          </section>

          {/* ── 1-hour prompt cache ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Prompt Cache の活用
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              Claude Code は prompt cache を自動的に利用する。
              毎回同じ prefix（CLAUDE.md、@import 群、Skills）を
              読み込むセッションでは、キャッシュ読み取りは通常の入力トークンより
              大幅に安価になり、レイテンシも下がる。
            </p>

            <p className="text-foreground mb-6 leading-relaxed">
              つまり「コンテキストの前半（システム側の指示群）を安定させる」ことが
              そのままコスト最適化になる。キャッシュ読み取り・書き込みを含む使用量の内訳は{" "}
              <code className="text-primary">/usage</code> で確認できる。
            </p>

            <InfoBox type="info" title="効果が出る条件">
              CLAUDE.md や Skills
              が安定していて、毎回同じプレフィックスで読み込まれる場合に効く。
              逆に CLAUDE.md を会話中に書き換えると毎回キャッシュミスになる。
              「書く時は計画的に、いじり倒さない」運用が前提。
            </InfoBox>
          </section>

          {/* ── 失敗パターン ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              よくある失敗パターン
            </h2>

            <div className="space-y-4">
              <InfoBox type="info" title="Kitchen sink セッション">
                1 つのセッションで関係ない複数タスクを混ぜる。 解決:
                タスク切替時に <code className="text-primary">/clear</code>。
              </InfoBox>

              <InfoBox type="info" title="繰り返し訂正">
                同じ間違いを 3 回訂正している。context が失敗で汚れている。
                解決: <code className="text-primary">/clear</code> +
                学んだことを盛り込んだ 新しい初期プロンプト。
              </InfoBox>

              <InfoBox type="info" title="肥大化した CLAUDE.md">
                ルールが多すぎて Claude が大事な指示を見落とす。 解決:
                「これを抜いたら間違えるか？」を全行に問い、ノーなら削除。 or
                hook に置き換える。
              </InfoBox>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
