import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function Maintenance() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 60</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          長期運用とチーム開発
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          デザインシステムは「作って終わり」ではありません。
          長期的に価値を生み続けるためには、運用の仕組み、テスト戦略、チーム開発のルール、
          そしてパフォーマンスへの意識が不可欠です。このマニュアルの最終章として、
          「実装者」から「設計者」へのステップアップを完成させましょう。
        </p>

        <WhyNowBox tags={['長期運用', 'チーム開発', 'テスト', 'パフォーマンス', '学習の次のステップ']}>
          <p>
            55ステップの最後にたどり着きました。
            技術を「学ぶ」段階から「育てる」段階へ。コードを「書く」だけでなく「守る」方法を学びます。
            ここで身につける知識は、チームの一員として、そしてプロダクトの品質の番人として、
            長く活きるスキルになるはずです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: デザインシステムの長期運用 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デザインシステムの長期運用</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              デザインシステムを長期的に維持するためには、変更の管理方法を仕組み化する必要があります。
              「いつ」「何を」「なぜ」変えたかを追跡し、利用者への影響を最小限に抑える方法を学びましょう。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">バージョニング（Semantic Versioning）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザインシステムをパッケージとして公開する場合、Semantic Versioning（セマンティック バージョニング）で
              バージョンを管理するのが標準です。バージョン番号の各桁に意味を持たせることで、
              利用者が「アップデートしても大丈夫か」を判断できます。
            </p>

            <CodeBlock
              language="text"
              title="Semantic Versioning: MAJOR.MINOR.PATCH"
              code={`バージョン: 2.3.1
          │  │  └── PATCH: バグ修正（後方互換あり）
          │  └───── MINOR: 機能追加（後方互換あり）
          └──────── MAJOR: 破壊的変更（後方互換なし）

例:
  1.0.0 → 1.0.1  Button のホバー色を修正（PATCH）
  1.0.1 → 1.1.0  Tooltip コンポーネントを追加（MINOR）
  1.1.0 → 2.0.0  Button の variant 名を変更（MAJOR = 破壊的変更）
                  → 利用者のコードが壊れる可能性がある

ルール:
  - PATCH: 利用者は何も変えなくてよい
  - MINOR: 利用者は何も変えなくてよい（新機能が使える）
  - MAJOR: 利用者はコードの修正が必要かもしれない`}
            />

            <InfoBox type="info" title="生徒の疑問: 「個人プロジェクトでもバージョン管理は必要？」">
              <p>
                個人プロジェクトでは厳密な Semantic Versioning は不要です。
                ただし、Git のコミットメッセージに「何を変えたか」を記録する習慣は、
                規模に関係なく大切です。3ヶ月後の自分は「他人」と同じ。
                「なぜこの変更をしたのか」が分からなくなることは、本当によくあります。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">変更履歴の管理（CHANGELOG）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CHANGELOG は「何がいつ変わったか」を利用者に伝えるためのドキュメントです。
              手動で書くこともありますが、コミットメッセージのルール（Conventional Commits）と
              自動生成ツールを使うのが効率的です。
            </p>

            <CodeBlock
              language="text"
              title="Conventional Commits の形式"
              code={`# コミットメッセージの規約
<type>(<scope>): <description>

# type の種類
feat:     新機能（→ MINOR バージョンアップ）
fix:      バグ修正（→ PATCH バージョンアップ）
docs:     ドキュメントのみの変更
style:    コードの意味に影響しない変更（空白、フォーマット等）
refactor: バグ修正でも機能追加でもないコード変更
test:     テストの追加・修正
chore:    ビルドプロセスやツールの変更

# 破壊的変更は BREAKING CHANGE: を含める
feat(Button)!: variant 名を変更

BREAKING CHANGE: "primary" → "filled" に変更。
既存の <Button variant="primary"> を <Button variant="filled"> に修正してください。

# 例
feat(Tooltip): Tooltip コンポーネントを追加
fix(Button): disabled 時のホバースタイルを修正
docs(Input): error prop の使用例を追加`}
            />

            <CodeBlock
              language="markdown"
              title="CHANGELOG.md の例"
              code={`# Changelog

## [2.0.0] - 2026-03-01

### ⚠ BREAKING CHANGES
- **Button**: \`variant\` の値を変更
  - "primary" → "filled"
  - "secondary" → "tonal"
  - 移行ガイド: docs/migration/v2.md を参照

### 追加
- **Tooltip**: 新コンポーネント
- **Avatar**: \`fallback\` prop を追加

### 修正
- **Input**: フォーカス時のアウトライン色が正しくない問題を修正
- **Card**: ダークモードでの背景色を修正

## [1.1.0] - 2026-02-15

### 追加
- **Badge**: \`dot\` バリアントを追加
- **Stack**: \`wrap\` prop を追加`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Breaking Changes への対処</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              破壊的変更（Breaking Change）は利用者に修正コストを発生させるため、慎重に行います。
              以下のステップで影響を最小限に抑えましょう。
            </p>

            <div className="rounded-lg border border-border p-5 mb-6">
              <div className="space-y-3 text-sm text-foreground/80">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">1</span>
                  <div>
                    <p className="font-semibold text-foreground">非推奨（Deprecation）を先に出す</p>
                    <p>いきなり削除せず、まず「非推奨」にして警告を出す。利用者に移行の時間を与える。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs">2</span>
                  <div>
                    <p className="font-semibold text-foreground">移行ガイドを用意する</p>
                    <p>変更内容、影響範囲、修正方法を具体的に文書化する。コード例を含める。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">3</span>
                  <div>
                    <p className="font-semibold text-foreground">Codemod を提供する（可能なら）</p>
                    <p>自動的にコードを書き換えるスクリプトを用意する。jscodeshift などのツールを使う。</p>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              title="非推奨警告の実装例"
              code={`// 旧 API を残しつつ、警告を出す
interface ButtonProps {
  /** @deprecated variant="primary" は v3.0 で削除予定。"filled" を使用してください */
  variant?: 'primary' | 'secondary' | 'filled' | 'tonal' | 'outline';
}

function Button({ variant, ...props }: ButtonProps) {
  // 開発環境でのみ警告を表示
  if (process.env.NODE_ENV === 'development') {
    if (variant === 'primary') {
      console.warn(
        '[DesignSystem] Button: variant="primary" は非推奨です。' +
        'variant="filled" に移行してください。v3.0 で削除予定です。'
      );
    }
  }

  // 旧名を内部的に新名にマッピング
  const mappedVariant = variant === 'primary' ? 'filled' : variant;
  // ...
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">依存関係のアップデート戦略</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              プロジェクトが依存するライブラリ（React、Next.js、Tailwind など）は定期的にアップデートされます。
              放置すると、セキュリティリスクや互換性の問題が蓄積されます。
            </p>

            <CodeBlock
              language="bash"
              title="依存関係の管理コマンド"
              code={`# 古くなったパッケージを確認
pnpm outdated

# セキュリティ脆弱性をチェック
pnpm audit

# パッチ・マイナーアップデート（安全）
pnpm update

# メジャーアップデート（注意が必要）
npx npm-check-updates -u  # package.json を更新
pnpm install               # インストール

# 特定のパッケージだけアップデート
pnpm add react@latest react-dom@latest

# Renovate / Dependabot を設定して自動 PR を受け取る
# → GitHub の Settings > Security > Dependabot で有効化`}
            />

            <InfoBox type="warning" title="アップデートの頻度">
              <p>
                月1回程度、依存関係を確認してパッチ/マイナーアップデートを適用するのがおすすめです。
                メジャーアップデート（React 18→19 など）は、CHANGELOG とマイグレーションガイドを読み、
                テストが通ることを確認してから適用します。
                「いつか一気にやろう」と先延ばしにすると、変更が膨大になって手がつけられなくなります。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: チーム開発のベストプラクティス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">チーム開発のベストプラクティス</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              一人で開発するのと、チームで開発するのでは、必要なスキルが大きく異なります。
              コードの品質だけでなく、コミュニケーションとプロセスが成功の鍵を握ります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">コードレビューのポイント</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              コードレビューは「間違い探し」ではなく、「知識の共有」と「品質の維持」のための活動です。
              レビューする側もされる側も、以下のポイントを意識しましょう。
            </p>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h4 className="font-bold text-foreground mb-3">レビューする側のチェックリスト</h4>
                <div className="space-y-2 text-sm text-foreground/80">
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded border border-border flex items-center justify-center text-xs">1</span>
                    <p><strong>意図の確認:</strong> PR の説明を読み、「何を」「なぜ」変更したかを理解する</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded border border-border flex items-center justify-center text-xs">2</span>
                    <p><strong>命名:</strong> 変数名・関数名・コンポーネント名は意図を表しているか</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded border border-border flex items-center justify-center text-xs">3</span>
                    <p><strong>型安全性:</strong> any の使用はないか。適切な型定義がされているか</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded border border-border flex items-center justify-center text-xs">4</span>
                    <p><strong>エッジケース:</strong> null / undefined / 空配列 / 長い文字列への対応</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded border border-border flex items-center justify-center text-xs">5</span>
                    <p><strong>アクセシビリティ:</strong> aria 属性、キーボード操作、フォーカス管理</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded border border-border flex items-center justify-center text-xs">6</span>
                    <p><strong>テスト:</strong> テストが書かれているか。テスト内容は適切か</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <h4 className="font-bold text-foreground mb-3">良いコードレビューコメントの例</h4>
                <div className="space-y-3 text-sm text-foreground/80">
                  <div className="rounded bg-red-50 dark:bg-red-950/20 p-3">
                    <p className="font-semibold text-red-700 dark:text-red-400 mb-1">悪い例</p>
                    <p>「ここ、変だと思います」「なんでこうしたんですか？」</p>
                  </div>
                  <div className="rounded bg-green-50 dark:bg-green-950/20 p-3">
                    <p className="font-semibold text-green-700 dark:text-green-400 mb-1">良い例</p>
                    <p>「この関数は products が空配列のとき undefined を返しそうです。
                      早期リターンで空配列を返すのはいかがでしょうか？」</p>
                  </div>
                  <div className="rounded bg-green-50 dark:bg-green-950/20 p-3">
                    <p className="font-semibold text-green-700 dark:text-green-400 mb-1">良い例</p>
                    <p>「[nit] このコンポーネントは ProductCard と命名した方が、
                      他の *Card コンポーネントとの一貫性が保てると思います。
                      ※ ブロッカーではないので、対応は任意です。」</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">コンポーネントの命名規則と一貫性</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              チームでの開発では、命名規則を統一することが非常に重要です。
              以下のルールをチームで合意し、ドキュメント化しましょう。
            </p>

            <CodeBlock
              language="text"
              title="命名規則の例"
              code={`# コンポーネント命名
- PascalCase を使用: ProductCard, UserAvatar, SearchInput
- 役割を表す名前: 「何であるか」ではなく「何をするか」
  ○ ProductCard（この UI は商品情報を表示する）
  × Box1, Component2（何をするか分からない）

# ファイル命名
- コンポーネント: PascalCase.tsx (Button.tsx, ProductCard.tsx)
- フック: camelCase.ts (useAuth.ts, useProducts.ts)
- ユーティリティ: camelCase.ts (formatDate.ts, cn.ts)
- 型定義: camelCase.ts / PascalCase.ts (types.ts, Product.ts)
- テスト: *.test.tsx / *.spec.tsx (Button.test.tsx)
- Story: *.stories.tsx (Button.stories.tsx)

# Props 命名
- イベントハンドラ: on + 動詞 (onClick, onChange, onSubmit)
- 状態: is/has + 形容詞 (isOpen, isLoading, hasError)
- バリアント: variant, size, color（デザインシステム全体で統一）

# CSS クラス（Tailwind 以外の場合）
- BEM: block__element--modifier
- 例: card__header--highlighted`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Storybook を「生きたドキュメント」として維持する</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Storybook は作っただけでは価値が半減します。コンポーネントの変更に合わせて
              Story も更新し、常に最新の状態を保つことが重要です。
            </p>

            <div className="rounded-lg border border-border p-5 mb-6">
              <h4 className="font-bold text-foreground mb-3">Storybook を最新に保つための仕組み</h4>
              <div className="space-y-3 text-sm text-foreground/80">
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-mono text-xs">CI</span>
                  <p>PR で Storybook のビルドチェックを行い、ビルドエラーのある Story を検知する</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-green-100 text-green-700 font-mono text-xs">ルール</span>
                  <p>「新しいコンポーネント = Story も必須」というレビュー基準を設ける</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-mono text-xs">公開</span>
                  <p>Chromatic や GitHub Pages で Storybook をデプロイし、デザイナーも閲覧可能にする</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-mono text-xs">定期</span>
                  <p>月1回、古い Story や未文書化コンポーネントがないか棚卸しする</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">デザイナーとエンジニアの定期的な同期</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザインシステムの運用で最も大切なのは、デザイナーとエンジニアの継続的なコミュニケーションです。
            </p>

            <div className="rounded-lg border-2 border-blue-200 dark:border-blue-800 p-6">
              <h4 className="font-bold text-foreground mb-3">推奨する同期の仕組み</h4>
              <div className="space-y-4 text-sm text-foreground/80">
                <div>
                  <p className="font-semibold text-foreground">週次: Design System Sync（15-30分）</p>
                  <p>新しいコンポーネントの要望、既存コンポーネントの課題、デザインの変更予定を共有。
                    Figma の変更と Storybook の差異がないか確認。</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">月次: Design System Review（1時間）</p>
                  <p>トークンの見直し、非推奨コンポーネントの整理、次期バージョンの計画。
                    実際のプロダクト画面を見ながら「デザインシステムでカバーすべき新パターン」を議論。</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">随時: Slack / Teams チャンネル</p>
                  <p>#design-system チャンネルで日常的な質問・提案をやり取り。
                    「このコンポーネントの使い方」「このパターンはデザインシステムに入れるべき？」など。</p>
                </div>
              </div>
            </div>
          </section>

          {/* セクション 3: テスト戦略 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">テスト戦略</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              テストは「品質を保証する」だけでなく、「安心して変更できる」環境を作ります。
              特にデザインシステムのように多くのプロダクトが依存するコードでは、テストの重要性は極めて高いです。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">テストピラミッドの考え方</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テストには複数のレイヤーがあり、「テストピラミッド」の形でバランスを取るのが理想です。
              下層ほど数が多く、上層ほど数が少ない（が重要なシナリオをカバーする）。
            </p>

            <CodeBlock
              language="text"
              title="テストピラミッド"
              code={`            ┌─────┐
           │ E2E │           少数・遅い・高コスト
          │  テスト │          ユーザー操作の再現
         ├─────────┤
        │  ビジュアル  │        中程度
       │ リグレッション │      スクリーンショット比較
      ├───────────────┤
     │                 │      多数・速い・低コスト
    │  ユニットテスト    │     コンポーネント単体の動作
   └───────────────────┘

コスト対効果:
  ユニットテスト     → 書きやすい、速い、最も多く書く（70-80%）
  ビジュアルテスト   → 見た目の変化を検知（10-20%）
  E2Eテスト         → ユーザーシナリオの検証（5-10%）`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">ユニットテスト（Vitest + Testing Library）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              コンポーネントの「振る舞い」をテストします。
              Testing Library の「ユーザーが実際に行う操作」をテストする思想に従い、
              実装の詳細ではなく、ユーザーの視点でテストを書きます。
            </p>

            <CodeBlock
              language="tsx"
              title="ユニットテストの実践例"
              code={`// Dialog.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  it('開くと内容が表示される', async () => {
    render(
      <Dialog>
        <Dialog.Trigger>設定を開く</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>設定</Dialog.Title>
          <Dialog.Description>アプリの設定を変更します</Dialog.Description>
        </Dialog.Content>
      </Dialog>
    );

    // 初期状態: ダイアログは非表示
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // トリガーをクリック
    await userEvent.click(screen.getByRole('button', { name: '設定を開く' }));

    // ダイアログが表示される
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('アプリの設定を変更します')).toBeVisible();
  });

  it('Escape キーで閉じる', async () => {
    render(
      <Dialog defaultOpen>
        <Dialog.Content>
          <Dialog.Title>設定</Dialog.Title>
        </Dialog.Content>
      </Dialog>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('オーバーレイクリックで閉じる', async () => {
    const onClose = vi.fn();
    render(
      <Dialog defaultOpen onOpenChange={onClose}>
        <Dialog.Content>
          <Dialog.Title>設定</Dialog.Title>
        </Dialog.Content>
      </Dialog>
    );

    // オーバーレイ（背景）をクリック
    await userEvent.click(screen.getByTestId('dialog-overlay'));
    expect(onClose).toHaveBeenCalledWith(false);
  });
});`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">ビジュアルリグレッション（Chromatic）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              「コードの変更でUIの見た目が意図せず変わっていないか」を検知するテストです。
              Chromatic は Storybook と統合し、Story のスクリーンショットを自動撮影・比較します。
            </p>

            <CodeBlock
              language="bash"
              title="Chromatic のセットアップ"
              code={`# Chromatic のインストール
pnpm add -D chromatic

# スナップショットの撮影・比較
npx chromatic --project-token=<your-token>

# CI（GitHub Actions）での自動実行
# .github/workflows/chromatic.yml
name: Chromatic
on: push
jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
      - run: npm ci
      - uses: chromaui/action@latest
        with:
          projectToken: \${{ secrets.CHROMATIC_PROJECT_TOKEN }}`}
            />

            <InfoBox type="info" title="Chromatic の仕組み">
              <p>
                Chromatic は PR ごとに全 Story のスクリーンショットを撮影し、
                前回のスクリーンショットと比較します。差異があれば「ビジュアル変更あり」として
                レビューが必要な画面を一覧表示します。意図した変更なら「Accept」、
                意図しない変更（リグレッション）なら「Deny」してコードを修正します。
                これにより、CSS の変更が他のコンポーネントに影響していないかを確実にチェックできます。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">E2Eテスト（Playwright）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ユーザーが実際にブラウザで行う操作をシミュレートするテストです。
              「ログインしてダッシュボードを表示する」「フォームに入力して送信する」
              など、エンドツーエンドのシナリオを検証します。
            </p>

            <CodeBlock
              language="tsx"
              title="Playwright のテスト例"
              code={`// tests/login.spec.ts
import { test, expect } from '@playwright/test';

test('ログインフロー', async ({ page }) => {
  // ログインページに移動
  await page.goto('/login');

  // フォームに入力
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password123');

  // 送信
  await page.click('button[type="submit"]');

  // ダッシュボードにリダイレクトされることを確認
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('ようこそ')).toBeVisible();
});

test('バリデーションエラーの表示', async ({ page }) => {
  await page.goto('/login');

  // 空のまま送信
  await page.click('button[type="submit"]');

  // エラーメッセージが表示される
  await expect(page.getByText('メールアドレスは必須です')).toBeVisible();
  await expect(page.getByText('パスワードは必須です')).toBeVisible();
});`}
            />
          </section>

          {/* セクション 4: パフォーマンスの維持 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">パフォーマンスの維持</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              機能が増えるにつれて、アプリのパフォーマンスは自然と低下していきます。
              定期的に計測し、問題を早期発見・対処する習慣を身につけましょう。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">バンドルサイズの監視</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ユーザーがダウンロードする JavaScript のサイズは、表示速度に直結します。
              不要なライブラリの削除、コード分割、Tree Shaking を意識しましょう。
            </p>

            <CodeBlock
              language="bash"
              title="バンドルサイズの確認ツール"
              code={`# Next.js のバンドル分析
# next.config.js に追加
pnpm add @next/bundle-analyzer
# ANALYZE=true pnpm build でビジュアル分析

# パッケージ単位のサイズ確認（ブラウザで確認）
# https://bundlephobia.com/ にパッケージ名を入力

# import のコストを VS Code で確認
# 拡張機能: Import Cost（インストールするだけ）

# バンドルサイズの目標値（目安）
# - 初期ロード: < 200KB（gzip後）
# - ルートごとの JS: < 50KB（gzip後）
# - 画像を含む合計: < 1MB`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">React.memo / lazy / Suspense の適切な使用</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              React のパフォーマンス最適化 API は強力ですが、「必要な場面でのみ」使うのが重要です。
              過度な最適化はかえってコードを複雑にし、逆効果になることもあります。
            </p>

            <CodeBlock
              language="tsx"
              title="パフォーマンス最適化の適切な使用例"
              code={`// 1. React.memo: 再レンダリングが高コストなコンポーネントに
// 使うべき場面: リスト内の各アイテム、重い計算を含むコンポーネント
const ProductCard = memo(function ProductCard({ product }: Props) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}円</p>
    </div>
  );
});

// 使わなくてよい場面: 小さなコンポーネント、Props が頻繁に変わるもの

// 2. React.lazy + Suspense: ルートレベルのコード分割
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}

// 3. useMemo / useCallback: 高コストな計算・子への安定した参照
function ProductList({ products, filter }: Props) {
  // 使うべき: フィルタリングが重い計算の場合
  const filtered = useMemo(
    () => products.filter(p => matchesFilter(p, filter)),
    [products, filter]
  );

  // 使うべき: memo化された子コンポーネントに渡すコールバック
  const handleSelect = useCallback((id: string) => {
    setSelected(id);
  }, []);

  return filtered.map(p => (
    <ProductCard key={p.id} product={p} onSelect={handleSelect} />
  ));
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Core Web Vitals への意識</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Google が定義するユーザー体験の指標です。SEO にも影響するため、意識して計測・改善しましょう。
            </p>

            <div className="rounded-lg border border-border p-5">
              <div className="space-y-4 text-sm text-foreground/80">
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-3 py-1 rounded bg-green-100 text-green-700 font-bold text-xs">LCP</span>
                  <div>
                    <p className="font-semibold text-foreground">Largest Contentful Paint（最大コンテンツの表示）</p>
                    <p>ページの主要コンテンツが表示されるまでの時間。目標: 2.5秒以内。</p>
                    <p className="mt-1">対策: 画像の最適化（next/image）、フォントの事前読み込み、Server Components の活用。</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-3 py-1 rounded bg-yellow-100 text-yellow-700 font-bold text-xs">INP</span>
                  <div>
                    <p className="font-semibold text-foreground">Interaction to Next Paint（インタラクションの応答速度）</p>
                    <p>ユーザーの操作に対する応答の速さ。目標: 200ミリ秒以内。</p>
                    <p className="mt-1">対策: 重い計算を Web Worker に移す、useState の更新を最適化、startTransition の活用。</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-3 py-1 rounded bg-blue-100 text-blue-700 font-bold text-xs">CLS</span>
                  <div>
                    <p className="font-semibold text-foreground">Cumulative Layout Shift（レイアウトのずれ）</p>
                    <p>ページ読み込み中にレイアウトがガタつく量。目標: 0.1以下。</p>
                    <p className="mt-1">対策: 画像に width/height を指定、フォントの display: swap、Skeleton UI の活用。</p>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock
              language="bash"
              title="Core Web Vitals の計測方法"
              code={`# Lighthouse（Chrome DevTools に内蔵）
# DevTools → Lighthouse タブ → Generate report

# PageSpeed Insights（Web ツール）
# https://pagespeed.web.dev/ にURLを入力

# web-vitals ライブラリ（プログラマティックに計測）
pnpm add web-vitals

# 計測コード
import { onLCP, onINP, onCLS } from 'web-vitals';
onLCP(console.log);   // LCP の計測結果
onINP(console.log);   // INP の計測結果
onCLS(console.log);   // CLS の計測結果`}
            />
          </section>

          {/* セクション 5: 学習の次のステップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">学習の次のステップ</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              55ステップの学習を終えたあなたは、フロントエンド開発の基礎から応用まで、
              幅広い知識を身につけています。ここからは、さらに深く学び、実践する段階です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">推奨する学習リソース</h3>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h4 className="font-bold text-foreground mb-2">公式ドキュメント（最も信頼できる情報源）</h4>
                <div className="space-y-2 text-sm text-foreground/80">
                  <p><strong>React:</strong> react.dev ― チュートリアル、API リファレンス、ベストプラクティス</p>
                  <p><strong>Next.js:</strong> nextjs.org/docs ― App Router のガイド、レシピ集</p>
                  <p><strong>TypeScript:</strong> typescriptlang.org ― ハンドブック、型の詳細</p>
                  <p><strong>MDN Web Docs:</strong> developer.mozilla.org ― HTML / CSS / JavaScript の基礎リファレンス</p>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <h4 className="font-bold text-foreground mb-2">書籍・コース</h4>
                <div className="space-y-2 text-sm text-foreground/80">
                  <p><strong>「プロを目指す人のための TypeScript 入門」</strong> ― TypeScript を深く学ぶなら</p>
                  <p><strong>Josh Comeau のブログ</strong> ― CSS と React の深い理解。視覚的な解説が秀逸</p>
                  <p><strong>Kent C. Dodds の EpicReact.dev</strong> ― React のパターンと実践を体系的に</p>
                  <p><strong>「Refactoring UI」</strong> ― UI デザインの実践的なティップス</p>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <h4 className="font-bold text-foreground mb-2">GitHub リポジトリ</h4>
                <div className="space-y-2 text-sm text-foreground/80">
                  <p><strong>bulletproof-react:</strong> React アプリのアーキテクチャ参考実装</p>
                  <p><strong>shadcn/ui:</strong> コンポーネント設計の教科書。ソースコードを読むだけで勉強になる</p>
                  <p><strong>taxonomy (shadcn):</strong> Next.js + shadcn/ui の実践的な使用例</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">コミュニティへの参加</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              一人で学び続けるのは限界があります。コミュニティに参加して、
              他のエンジニアやデザイナーと知識を共有しましょう。
            </p>

            <div className="rounded-lg border border-border p-5 mb-6">
              <div className="space-y-3 text-sm text-foreground/80">
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-mono text-xs">国内</span>
                  <p>React Tokyo、Next.js meetup、Figma Japan Community、Qiita / Zenn での記事執筆</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-green-100 text-green-700 font-mono text-xs">海外</span>
                  <p>React Conf、Next.js Conf、X (Twitter) のエンジニアコミュニティ、Discord サーバー</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-mono text-xs">発信</span>
                  <p>学んだことを記事にまとめる、LT（ライトニングトーク）で発表する。
                    アウトプットは最強のインプット。</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">OSS へのコントリビューション</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              OSS（オープンソースソフトウェア）への貢献は、技術力を飛躍的に伸ばす方法です。
              最初は大きなコード変更ではなく、以下のような小さな貢献から始めましょう。
            </p>

            <div className="space-y-2 text-sm text-foreground/80 mb-6">
              <div className="flex gap-3 items-start rounded-lg border border-border p-3">
                <span className="flex-shrink-0 text-green-600 font-bold">Easy</span>
                <p>ドキュメントの誤字修正、翻訳、README の改善</p>
              </div>
              <div className="flex gap-3 items-start rounded-lg border border-border p-3">
                <span className="flex-shrink-0 text-yellow-600 font-bold">Medium</span>
                <p>バグ報告（再現手順を明確に書く）、テストの追加</p>
              </div>
              <div className="flex gap-3 items-start rounded-lg border border-border p-3">
                <span className="flex-shrink-0 text-red-600 font-bold">Hard</span>
                <p>新機能の提案・実装、パフォーマンス改善</p>
              </div>
            </div>

            <InfoBox type="info" title="生徒の疑問: 「自分のレベルでOSSに貢献できるの？」">
              <p>
                できます。実際に多くの OSS メンテナーが「ドキュメントの修正」や「テストの追加」を
                歓迎しています。GitHub で「good first issue」ラベルが付いた Issue を探すと、
                初心者向けのタスクが見つかります。
                コードを書かなくても、バグ報告（丁寧な再現手順つき）は非常に価値のある貢献です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 6: 55ステップの振り返り */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">55ステップの振り返り</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              ここで、このマニュアル全体で学んだことを振り返りましょう。
              あなたが歩んできた道のりを整理することで、知識が定着します。
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">1</span>
                  <h3 className="font-bold text-foreground">第1部: React + Vite + TypeScript（Step 1-30）</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  HTML/CSS/JavaScript の基礎から始めて、React のコア概念を身につけました。
                  コンポーネント、Props、State、Hooks、そして複数の CSS 手法を学び、
                  実践アプリを作るまでに成長しました。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">JSX</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">コンポーネント</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Props / State</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Hooks</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">CSS / Tailwind / MUI</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">API連携</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">ルーティング</span>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">2</span>
                  <h3 className="font-bold text-foreground">第2部: Next.js（Step 31-46）</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  React の知識を基盤に、Next.js の App Router を学びました。
                  Server Components、データフェッチ、Server Actions、デプロイまで、
                  プロダクション品質のアプリを作るための知識を習得しました。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">App Router</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Server Components</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">データフェッチ</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Server Actions</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">ミドルウェア</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Vercel デプロイ</span>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm">3</span>
                  <h3 className="font-bold text-foreground">第3部: Storybook（Step 47-52）</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  コンポーネントカタログとしての Storybook を導入し、
                  Story の書き方、CSS 環境ごとの設定、Figma 連携、Chromatic でのビジュアルテストまでを学びました。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">Storybook 導入</span>
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">Story の書き方</span>
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">CSS 連携</span>
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">Figma / Chromatic</span>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">4</span>
                  <h3 className="font-bold text-foreground">第4部: アーキテクチャとデザインシステム（Step 53-55）</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  個々の技術を統合し、プロジェクト全体を設計する力を身につけました。
                  ディレクトリ構成、状態管理戦略、デザインシステムの構築、
                  そして長期運用の方法論を学び、「実装者」から「設計者」への一歩を踏み出しました。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">アーキテクチャ</span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">デザインシステム</span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">テスト戦略</span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">パフォーマンス</span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">チーム開発</span>
                </div>
              </div>
            </div>
          </section>

          {/* セクション 7: 最後のメッセージ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">最後のメッセージ</h2>

            <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-violet-500/5 p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                技術を味方にすることで、可能性は広がる
              </h3>

              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  55ステップの学習、お疲れさまでした。
                </p>

                <p>
                  あなたがデザイナーであれば、この学習を通じてコードの世界が「壁」ではなく「扉」に変わったはずです。
                  Figma で描いた理想のデザインを、自分の手でブラウザ上に再現できる。
                  エンジニアと同じ言語で会話し、技術的な制約を理解した上で、より良いデザインを提案できる。
                  それは、デザイナーとしての可能性を大きく広げることを意味します。
                </p>

                <p>
                  あなたがエンジニアであれば、デザインシステムの思想やデザイナーの視点を学ぶことで、
                  「ただ動くコード」ではなく「ユーザーに価値を届けるコード」を書く意識が芽生えたのではないでしょうか。
                  Props の命名一つ、コンポーネントの分け方一つに、デザインの意図を汲み取る力。
                  それは、エンジニアとしての品質を一段引き上げるスキルです。
                </p>

                <p>
                  技術は日々進化します。React も Next.js も、1年後にはまた新しい機能が加わっているでしょう。
                  しかし、このマニュアルで身につけた「考え方」は変わりません。
                </p>

                <div className="rounded-lg bg-background/50 p-5 my-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-primary font-bold flex-shrink-0">-</span>
                      <span>コンポーネントに分解して考える力</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold flex-shrink-0">-</span>
                      <span>データの流れを設計する力</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold flex-shrink-0">-</span>
                      <span>一貫性のある UI を構築する力</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold flex-shrink-0">-</span>
                      <span>チームで持続的に開発を続ける力</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold flex-shrink-0">-</span>
                      <span>新しい技術を学び続ける力</span>
                    </li>
                  </ul>
                </div>

                <p>
                  これらの力は、どんなフレームワークが流行しても、どんな新しいツールが登場しても、
                  あなたのキャリアの土台として機能し続けます。
                </p>

                <p>
                  最後に、一つだけお願いがあります。
                  <strong>学んだことを、誰かに伝えてください。</strong>
                  記事を書く、勉強会で発表する、後輩に教える。形は何でも構いません。
                  教えることは最高の学習法であり、コミュニティを豊かにする行為です。
                </p>

                <p className="font-semibold text-foreground text-lg mt-6">
                  デザインとエンジニアリングの境界を超えて、素晴らしいプロダクトを作ってください。
                  あなたの成長を、心から応援しています。
                </p>
              </div>
            </div>
          </section>

          {/* セクション 8: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="rounded-lg border border-border p-6 bg-muted/30">
              <div className="space-y-3 text-foreground/80">
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">1.</span>
                  <p><strong>長期運用には仕組みが必要</strong> ― バージョニング、CHANGELOG、非推奨プロセス</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">2.</span>
                  <p><strong>チーム開発は「ルール」と「コミュニケーション」</strong> ― 命名規則、レビュー文化、定期同期</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">3.</span>
                  <p><strong>テストはピラミッド型で</strong> ― ユニット(多) → ビジュアル(中) → E2E(少)</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">4.</span>
                  <p><strong>パフォーマンスは定期的に計測</strong> ― バンドルサイズ、Core Web Vitals</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">5.</span>
                  <p><strong>学習は終わらない</strong> ― 公式ドキュメント、コミュニティ、OSS 貢献で成長を続ける</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">6.</span>
                  <p><strong>55ステップの知識は土台</strong> ― フレームワークが変わっても、考え方は活き続ける</p>
                </div>
              </div>
            </div>

            <p className="text-foreground/80 mt-6 leading-relaxed text-center font-semibold text-lg">
              全55ステップ、完走おめでとうございます。
            </p>
          </section>
        </div>

        {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Vitest 公式ドキュメント',
                  url: 'https://vitest.dev/',
                  description: 'Vite ネイティブのテストフレームワーク',
                },
                {
                  title: 'Testing Library',
                  url: 'https://testing-library.com/docs/react-testing-library/intro/',
                  description: 'ユーザー視点のテストライブラリ',
                },
                {
                  title: 'Playwright 公式ドキュメント',
                  url: 'https://playwright.dev/',
                  description: 'E2E テストフレームワーク',
                },
                {
                  title: 'Web Vitals',
                  url: 'https://web.dev/articles/vitals',
                  description: 'Core Web Vitals の解説と計測方法',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
