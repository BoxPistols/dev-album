import { Link } from 'wouter';
import { Bug, Camera, ExternalLink, MessageSquare, ArrowLeft } from 'lucide-react';

const GITHUB_REPO = 'BoxPistols/unified-manual';
const BUG_URL = `https://github.com/${GITHUB_REPO}/issues/new?template=bug_report.yml`;
const FEATURE_URL = `https://github.com/${GITHUB_REPO}/issues/new?template=feature_request.yml`;

export default function BugReport() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={14} />
          トップに戻る
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bug size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">バグ報告・改善提案</h1>
            <p className="text-sm text-muted-foreground">見つけた問題やアイデアを教えてください</p>
          </div>
        </div>

        {/* 報告の流れ */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">報告の流れ（3ステップ）</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Camera size={16} />
                  スクリーンショットを撮る
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  問題が起きている画面のスクリーンショットを撮ってください。
                  Mac: <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">Cmd + Shift + 4</kbd>、
                  Windows: <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">Win + Shift + S</kbd>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">ページの URL をコピー</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ブラウザのアドレスバーから URL をコピーしてください。
                  例: <code className="text-xs bg-muted px-1.5 py-0.5 rounded">https://dev-album.vercel.app/react/storybook/structure</code>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">フォームから報告</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  下のボタンから GitHub のフォームを開き、スクリーンショットと URL を貼り付けてください。
                  GitHub アカウントが必要です（無料）。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 報告ボタン */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a
            href={BUG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-5 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
              <Bug size={20} className="text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground flex items-center gap-1.5">
                バグを報告する
                <ExternalLink size={12} className="text-muted-foreground" />
              </h3>
              <p className="text-xs text-muted-foreground">プレビューの不具合、表示崩れなど</p>
            </div>
          </a>
          <a
            href={FEATURE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-5 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <MessageSquare size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground flex items-center gap-1.5">
                改善を提案する
                <ExternalLink size={12} className="text-muted-foreground" />
              </h3>
              <p className="text-xs text-muted-foreground">新機能のアイデア、内容の改善など</p>
            </div>
          </a>
        </div>

        {/* よくある問題 */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">よくある問題と対処法</h2>
          <div className="space-y-4 text-sm">
            <div className="pb-4 border-b border-border">
              <h3 className="font-semibold text-foreground mb-1">プレビューに何も表示されない</h3>
              <p className="text-muted-foreground">ページをリロード（F5 / Cmd+R）してみてください。CDN からの読み込みに時間がかかる場合があります。</p>
            </div>
            <div className="pb-4 border-b border-border">
              <h3 className="font-semibold text-foreground mb-1">「React is not defined」と表示される</h3>
              <p className="text-muted-foreground">インターネット接続を確認してください。プレビューは外部 CDN から React を読み込みます。</p>
            </div>
            <div className="pb-4 border-b border-border">
              <h3 className="font-semibold text-foreground mb-1">コードを編集してもプレビューが変わらない</h3>
              <p className="text-muted-foreground">入力後 0.4 秒待つと自動更新されます。構文エラーがある場合はプレビューにエラーが表示されます。</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">3D プレビュー（Three.js）が真っ暗</h3>
              <p className="text-muted-foreground">WebGL に対応したブラウザ（Chrome / Firefox 推奨）をご利用ください。</p>
            </div>
          </div>
        </div>

        {/* フッター */}
        <p className="text-xs text-muted-foreground text-center">
          問題の報告には <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub アカウント（無料）</a> が必要です
        </p>
      </div>
    </div>
  );
}
