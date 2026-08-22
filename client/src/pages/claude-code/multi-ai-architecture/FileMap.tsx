import { Link } from "wouter";
import {
  Table2,
  ArrowDownWideNarrow,
  AlertTriangle,
  Compass,
  Stethoscope,
  ExternalLink,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import VerifiedBox from "@/components/VerifiedBox";

// 早見表の行。個別解説があるものは内部リンクを持たせ、この表を目次として使えるようにする。
const FILES: {
  file: string;
  where: string;
  reader: string;
  when: string;
  scope: string;
  href?: string;
}[] = [
  {
    file: "CLAUDE.md",
    where: "./CLAUDE.md または ./.claude/CLAUDE.md",
    reader: "Claude Code",
    when: "毎セッションの開始時",
    scope: "プロジェクト（チーム共有）",
    href: "/claude-code/claude-core/project-rules",
  },
  {
    file: "CLAUDE.local.md",
    where: "./CLAUDE.local.md",
    reader: "Claude Code",
    when: "毎セッションの開始時（CLAUDE.md の後）",
    scope: "自分だけ（gitignore する）",
    href: "/claude-code/claude-core/project-rules",
  },
  {
    file: "~/.claude/CLAUDE.md",
    where: "ホーム直下",
    reader: "Claude Code",
    when: "毎セッションの開始時（プロジェクトより先）",
    scope: "自分の全プロジェクト",
    href: "/claude-code/claude-core/project-rules",
  },
  {
    file: ".claude/rules/*.md",
    where: "プロジェクトまたは ~/.claude/rules/",
    reader: "Claude Code",
    when: "paths なし → 開始時 / paths あり → 一致するファイルを読んだとき",
    scope: "トピック別・パス別",
    href: "/claude-code/claude-core/project-rules",
  },
  {
    file: ".claude/skills/*/SKILL.md",
    where: "プロジェクトまたはユーザー",
    reader: "Claude Code",
    when: "呼び出したとき、または関連があると判断されたとき",
    scope: "手順そのもの",
    href: "/claude-code/agent-extensions/skills-deep-dive",
  },
  {
    file: ".claude/settings.json",
    where: "プロジェクト / ユーザー / 管理ポリシー",
    reader: "Claude Code（クライアント）",
    when: "常時。指示ではなく設定として効く",
    scope: "権限・フック・環境変数",
    href: "/claude-code/claude-core/security-permissions",
  },
  {
    file: "AGENTS.md",
    where: "リポジトリ直下",
    reader: "他のコーディングエージェント（Claude Code は読まない）",
    when: "CLAUDE.md から @import するか symlink したときだけ",
    scope: "ツール非依存の共通規約",
    href: "/claude-code/multi-ai/agent-docs",
  },
  {
    file: "ARCHITECTURE.md",
    where: "リポジトリ直下",
    reader: "人間 + 参照させたときの AI",
    when: "自動では載らない。読ませたいときに指示する",
    scope: "設計判断と制約",
    href: "/claude-code/multi-ai/agent-docs",
  },
  {
    file: "DESIGN.md",
    where: "リポジトリ直下",
    reader: "人間 + 参照させたときの AI",
    when: "自動では載らない。読ませたいときに指示する",
    scope: "デザイン仕様",
    href: "/claude-code/multi-ai/design-md",
  },
  {
    file: "MEMORY.md（自動メモリ）",
    where: "~/.claude/projects/<project>/memory/",
    reader: "Claude Code",
    when: "毎セッションの開始時（先頭 200 行 / 25KB まで）",
    scope: "Claude 自身が書き足す学習メモ",
  },
];

export default function FileMap() {
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
            ファイル早見表 — どれが何に効くか
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            AI 向けの指示ファイルは増えました。同じ場所に並べて、誰が読むのか・
            いつ載るのか・どこまで効くのかで見比べます。
          </p>
          <VerifiedBox
            verifiedAt="2026-08-23"
            cmuxVersion="Claude Code 2.1.239"
            platform="macOS (Apple Silicon)"
            officialDocs="https://code.claude.com/docs/en/memory"
            officialDocsLabel="公式: How Claude remembers your project"
          />
        </div>

        <div className="space-y-12 mt-8">
          {/* 早見表 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Table2 className="text-[var(--claude-primary)]" />
              一覧で見比べる
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              迷ったときに効く問いは 3 つです。
              <strong>そのファイルを誰が読むのか</strong>、
              <strong>いつコンテキストに載るのか</strong>、
              <strong>どこまで効くのか</strong>。ファイル名を覚えるより、
              この 3 つで並べたほうが選べます。
            </p>
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm min-w-[52rem]">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">ファイル</th>
                    <th className="text-left p-3 font-semibold">置き場所</th>
                    <th className="text-left p-3 font-semibold">誰が読むか</th>
                    <th className="text-left p-3 font-semibold">いつ載るか</th>
                    <th className="text-left p-3 font-semibold">効く範囲</th>
                  </tr>
                </thead>
                <tbody>
                  {FILES.map((f) => (
                    <tr
                      key={f.file}
                      className="border-t border-slate-200 dark:border-slate-800"
                    >
                      <td className="p-3 font-mono text-xs whitespace-nowrap">
                        {f.href ? (
                          <Link
                            href={f.href}
                            className="text-[var(--claude-primary)] underline underline-offset-2"
                          >
                            {f.file}
                          </Link>
                        ) : (
                          f.file
                        )}
                      </td>
                      <td className="p-3 font-mono text-xs text-muted-foreground">
                        {f.where}
                      </td>
                      <td className="p-3 text-muted-foreground">{f.reader}</td>
                      <td className="p-3 text-muted-foreground">{f.when}</td>
                      <td className="p-3 text-muted-foreground">{f.scope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 読み込み順 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <ArrowDownWideNarrow className="text-[var(--claude-primary)]" />
              読み込み順は「広い → 狭い」。上書きではなく連結
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code は見つけた指示ファイルを
              <strong>すべて連結してコンテキストに載せます</strong>。
              狭いほうが広いほうを消すわけではありません。後に読むものほど
              直前に置かれるので、矛盾したときに効きやすいだけです。
              つまり<strong>矛盾は残ります</strong>。定期的に見直してください。
            </p>
            <CodeBlock
              language="text"
              code={`管理ポリシー   /Library/Application Support/ClaudeCode/CLAUDE.md   (macOS)
  ↓
ユーザー       ~/.claude/CLAUDE.md  /  ~/.claude/rules/*.md
  ↓
プロジェクト   ./CLAUDE.md  または  ./.claude/CLAUDE.md  /  .claude/rules/*.md
  ↓
ローカル       ./CLAUDE.local.md            ← 最後に読まれる`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              作業ディレクトリより上の階層にある CLAUDE.md も、ルート側から順に
              すべて載ります。逆に<strong>下の階層にあるものは起動時には載らず</strong>、
              Claude がそのディレクトリのファイルを読んだ時点で追加されます。
            </p>
          </section>

          {/* よくある勘違い */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <AlertTriangle className="text-[var(--claude-primary)]" />
              取り違えやすい 3 点
            </h2>

            <InfoBox type="warning" title="AGENTS.md は Claude Code が読まない">
              置いてあっても載りません。他のエージェントと同じ内容を共有したい
              ときは、CLAUDE.md から <code>@AGENTS.md</code> で import するか、
              symlink を張ります。実際に載ったかは <code>/context</code> の
              Memory files で確かめられます。
            </InfoBox>

            <div className="mt-6">
              <CodeBlock
                language="markdown"
                title="CLAUDE.md"
                code={`@AGENTS.md

## Claude Code

ここに Claude Code 固有の指示を足す`}
              />
            </div>

            <div className="mt-8">
              <InfoBox
                type="warning"
                title="@import で分けてもコンテキストは減らない"
              >
                import されたファイルは起動時に展開されて載ります。分割は整理の
                ための手段で、削減にはなりません。<strong>本当に減らしたい</strong>
                なら、<code>paths</code> を付けた rules（一致するファイルを読んだ
                ときだけ載る）か Skills（呼ばれたときだけ載る）へ移します。
                import は 4 ホップまでです。
              </InfoBox>
            </div>

            <div className="mt-8">
              <InfoBox type="warning" title="CLAUDE.md は強制ではない">
                指示は文脈として渡るだけで、必ず守られる保証はありません。
                <strong>確実に止めたい・必ず走らせたい</strong>ものは、
                <Link
                  href="/claude-code/hooks-advanced/hooks-guide"
                  className="text-[var(--claude-primary)] underline underline-offset-2 mx-1"
                >
                  Hooks
                </Link>
                か settings の権限設定で書きます。書き方の層が違います。
              </InfoBox>
            </div>
          </section>

          {/* どこに書くか */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Compass className="text-[var(--claude-primary)]" />
              どこに書くかの決め方
            </h2>
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm min-w-[40rem]">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">書きたいこと</th>
                    <th className="text-left p-3 font-semibold">置き場所</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["毎回必ず効いてほしい短い規約", "CLAUDE.md"],
                    ["一部のファイルにだけ効く規約", ".claude/rules/ に paths 付きで"],
                    ["手順が長い、たまにしか使わない", "Skills"],
                    ["必ず実行させたい・必ず止めたい", "Hooks / settings の permissions"],
                    ["自分だけの設定、共有したくない", "CLAUDE.local.md（gitignore）"],
                    ["他のエージェントとも共有したい", "AGENTS.md を CLAUDE.md から @import"],
                    ["設計の背景や制約", "ARCHITECTURE.md（読ませたいときに指示する）"],
                  ].map(([what, where]) => (
                    <tr
                      key={what}
                      className="border-t border-slate-200 dark:border-slate-800"
                    >
                      <td className="p-3">{what}</td>
                      <td className="p-3 font-mono text-xs text-muted-foreground">
                        {where}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed mt-6 text-muted-foreground">
              CLAUDE.md は 200 行を目安にします。長いほどコンテキストを食い、
              かえって守られにくくなります。4 MiB を超えるファイルは読み込まれません。
            </p>
          </section>

          {/* 確かめ方 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Stethoscope className="text-[var(--claude-primary)]" />
              本当に読まれたかを確かめる
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              「置いたのに効かない」の大半は、そもそも載っていません。
              推測せずに現物を見ます。
            </p>
            <CodeBlock
              language="bash"
              code={`# いま何が読まれているか（Memory files の一覧に出る）
/context

# 指示ファイルを一覧して開く。存在しないものは選ぶと作られる
/memory`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              paths 付き rules やサブディレクトリの CLAUDE.md のように後から
              載るものを追うときは、<code>InstructionsLoaded</code> hook で
              「いつ・なぜ読まれたか」を記録できます。
            </p>
          </section>

          {/* 参考リンク */}
          <section className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-xl font-bold mb-4">参考リンク</h2>
            <ul className="space-y-2 text-sm">
              {[
                {
                  label:
                    "How Claude remembers your project（公式・読み込み順と rules の正本）",
                  url: "https://code.claude.com/docs/en/memory",
                },
                {
                  label: "Explore the .claude directory（公式）",
                  url: "https://code.claude.com/docs/en/claude-directory",
                },
                {
                  label: "Extend Claude Code — 機能の使い分け（公式）",
                  url: "https://code.claude.com/docs/en/features-overview",
                },
                {
                  label: "Hooks reference — InstructionsLoaded（公式）",
                  url: "https://code.claude.com/docs/en/hooks",
                },
              ].map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--claude-primary)] underline underline-offset-2"
                  >
                    {item.label}
                    <ExternalLink size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
