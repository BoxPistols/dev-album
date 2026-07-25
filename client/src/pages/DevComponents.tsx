/**
 * UI コンポーネントカタログ（開発用）
 * ローカル環境でのみアクセス: /dev/components
 * 全エディタ・プレビュー・UIコンポーネントのパターンを1ページに集約
 */
import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import CodePreview from "@/components/CodePreview";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import Quiz from "@/components/Quiz";
import SliderChallenge from "@/components/SliderChallenge";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">
        {title}
      </h2>
      <div className="space-y-8">{children}</div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
      {children}
    </p>
  );
}

export default function DevComponents() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-8">
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded">
            DEV ONLY
          </span>
          <h1 className="text-4xl font-extrabold text-foreground mt-2">
            UI コンポーネントカタログ
          </h1>
          <p className="text-muted-foreground mt-2">
            全エディタ・プレビュー・UI パターンの動作確認用ページ
          </p>
        </div>

        {/* ═══ CodeBlock ═══ */}
        <Section title="CodeBlock（静的コード表示）">
          <Label>TSX コード</Label>
          <CodeBlock
            code={`function App() {\n  return <h1>Hello World</h1>;\n}`}
            language="tsx"
            title="基本的な TSX"
            showLineNumbers
          />

          <Label>CSS コード</Label>
          <CodeBlock
            code={`.container {\n  display: flex;\n  gap: 16px;\n}`}
            language="css"
            title="CSS サンプル"
          />

          <Label>Bash コマンド</Label>
          <CodeBlock
            code={`npm install react react-dom\nnpm run dev`}
            language="bash"
            title="ターミナル"
          />
        </Section>

        {/* ═══ CodePreview（コード + プレビュー） ═══ */}
        <Section title="CodePreview（コード + プレビュー）">
          <Label>通常モード（左右分割）</Label>
          <CodePreview
            code={`function App() {\n  return (\n    <div style={{ padding: 20, background: 'var(--bg-accent)', borderRadius: 8 }}>\n      <h2 style={{ color: 'var(--text)', margin: 0 }}>プレビュー動作確認</h2>\n      <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>コードを編集するとリアルタイムに反映されます</p>\n    </div>\n  );\n}`}
            language="tsx"
            title="リアルタイムプレビュー"
          />

          <Label>previewOnly モード（プレビューのみ）</Label>
          <CodePreview
            previewOnly
            code={`function App() {\n  const [count, setCount] = React.useState(0);\n  return (\n    <div style={{ padding: 20, textAlign: 'center' }}>\n      <button onClick={() => setCount(c => c + 1)} style={{ padding: '8px 20px', fontSize: 16, background: 'var(--text-accent)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>\n        クリック: {count}\n      </button>\n    </div>\n  );\n}`}
            language="tsx"
            title="インタラクティブデモ（コード非表示）"
          />
        </Section>

        {/* ═══ CodingChallenge ═══ */}
        <Section title="CodingChallenge（穴埋めエディタ）">
          <Label>プレビュー付き（穴埋め式）</Label>
          <CodingChallenge
            title="Flexbox 中央寄せ"
            description="display と alignItems を埋めてください。"
            preview={true}
            initialCode={`function App() {\n  return (\n    <div style={{\n      display: '___',           // ← ここを埋める\n      alignItems: '___',        // ← ここを埋める\n      justifyContent: 'center',\n      minHeight: 120,\n      background: 'var(--bg-accent)',\n      borderRadius: 8,\n    }}>\n      <span style={{ color: 'var(--text)', fontWeight: 600 }}>中央</span>\n    </div>\n  );\n}`}
            answer={`function App() {\n  return (\n    <div style={{\n      display: 'flex',\n      alignItems: 'center',\n      justifyContent: 'center',\n      minHeight: 120,\n      background: 'var(--bg-accent)',\n      borderRadius: 8,\n    }}>\n      <span style={{ color: 'var(--text)', fontWeight: 600 }}>中央</span>\n    </div>\n  );\n}`}
            hints={[
              "display: flex を指定します",
              "alignItems: center で縦方向の中央寄せ",
            ]}
            keywords={["flex", "center"]}
          />

          <Label>プレビューなし（コードのみ）</Label>
          <CodingChallenge
            title="Git コマンド"
            description="ブランチを作成するコマンドを埋めてください。"
            initialCode={`git ___ -b feature/login`}
            answer={`git checkout -b feature/login`}
            hints={["新しいブランチを作成して切り替えるコマンドです"]}
            keywords={["checkout"]}
          />

          <Label>config プレビュー</Label>
          <CodingChallenge
            title="JSON 設定"
            description="name フィールドを埋めてください。"
            preview
            previewType="config"
            initialCode={`{\n  "name": "___",\n  "version": "1.0.0"\n}`}
            answer={`{\n  "name": "my-app",\n  "version": "1.0.0"\n}`}
            hints={["プロジェクト名を入力します"]}
            keywords={["my-app"]}
          />
        </Section>

        {/* ═══ SliderChallenge ═══ */}
        <Section title="SliderChallenge（パラメータ探索）">
          <Label>line-height / letter-spacing の動的調整</Label>
          <SliderChallenge
            title="テキストの読みやすさを触って比べる"
            description="スライダーを動かして、行間と字間が読みやすさに与える影響を体感してください。"
            sliders={[
              {
                id: "lineHeight",
                label: "line-height",
                min: 1,
                max: 2.5,
                step: 0.1,
                defaultValue: 1.5,
              },
              {
                id: "letterSpacing",
                label: "letter-spacing",
                min: -0.05,
                max: 0.3,
                step: 0.01,
                defaultValue: 0,
                unit: "em",
              },
            ]}
            render={(v) => (
              <p
                className="text-foreground text-sm"
                style={{
                  lineHeight: v.lineHeight,
                  letterSpacing: `${v.letterSpacing}em`,
                }}
              >
                本文は行間 1.5〜1.7、見出しは 1.2〜1.3
                が読みやすい目安です。字間は本文では 0em
                付近が自然で、見出しだけ少し広げると締まって見えます。
              </p>
            )}
            explanation="WCAG 1.4.12 では line-height 1.5 以上、letter-spacing 0.12em 以上を指定可能にすることが求められています。"
          />
        </Section>

        {/* ═══ InfoBox ═══ */}
        <Section title="InfoBox">
          <div className="space-y-4">
            <InfoBox type="info" title="情報">
              <p>補足情報を表示します。</p>
            </InfoBox>
            <InfoBox type="warning" title="注意">
              <p>注意が必要な内容を表示します。</p>
            </InfoBox>
            <InfoBox type="error" title="エラー">
              <p>避けるべきパターンを表示します。</p>
            </InfoBox>
            <InfoBox type="success" title="成功">
              <p>推奨パターンを表示します。</p>
            </InfoBox>
          </div>
        </Section>

        {/* ═══ Quiz ═══ */}
        <Section title="Quiz">
          <Quiz
            question="React のコンポーネントはどれですか？"
            options={[
              { label: "<div>" },
              { label: "function App() {}", correct: true },
              { label: "document.getElementById" },
              { label: "console.log" },
            ]}
            explanation="function で定義された PascalCase の関数がコンポーネントです。"
          />
        </Section>

        {/* ═══ フォーム要素（ダークモード） ═══ */}
        <Section title="フォーム要素（ダークモード確認）">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>テキスト入力</Label>
              <input
                type="text"
                placeholder="テキスト入力"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
              />
              <Label>セレクト</Label>
              <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground">
                <option>オプション 1</option>
                <option>オプション 2</option>
              </select>
              <Label>テキストエリア</Label>
              <textarea
                rows={3}
                placeholder="テキストエリア"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
              />
            </div>
            <div className="space-y-4">
              <Label>チェックボックス</Label>
              <label className="flex items-center gap-2 text-foreground">
                <input type="checkbox" /> チェック項目
              </label>
              <Label>ラジオボタン</Label>
              <label className="flex items-center gap-2 text-foreground">
                <input type="radio" name="demo" /> 選択肢 A
              </label>
              <label className="flex items-center gap-2 text-foreground">
                <input type="radio" name="demo" /> 選択肢 B
              </label>
              <Label>ボタン</Label>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                  Primary
                </button>
                <button className="px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium border border-border">
                  Secondary
                </button>
                <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium">
                  Danger
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ カラートークン ═══ */}
        <Section title="カラートークン">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "--primary", class: "bg-primary" },
              { name: "--foreground", class: "bg-foreground" },
              { name: "--muted", class: "bg-muted" },
              { name: "--muted-foreground", class: "bg-muted-foreground" },
              {
                name: "--background",
                class: "bg-background border border-border",
              },
              { name: "--card", class: "bg-card border border-border" },
              { name: "--border", class: "bg-border" },
              { name: "--accent", class: "bg-accent" },
            ].map((t) => (
              <div key={t.name} className="text-center">
                <div className={`h-12 rounded-lg ${t.class}`} />
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  {t.name}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══ カウンター（状態管理テスト） ═══ */}
        <Section title="状態管理テスト">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCount((c) => c - 1)}
              className="px-4 py-2 bg-muted text-foreground rounded-lg border border-border"
            >
              -
            </button>
            <span className="text-2xl font-bold text-foreground w-16 text-center">
              {count}
            </span>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              +
            </button>
            <button
              onClick={() => setCount(0)}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              リセット
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}
