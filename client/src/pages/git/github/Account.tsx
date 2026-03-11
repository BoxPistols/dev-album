import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import { useLocation } from 'wouter';

/**
 * GitHub 基礎 - GitHub アカウント作成
 * デザイン方針: ジャーニーマップ
 * - GitHub アカウント作成の手順を詳しく説明
 * - プロフィール設定のポイントを解説
 */

export default function GitHubAccount() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 5 / 8
          </div>
          <h1 className="text-4xl font-poppins font-bold text-foreground mb-4">
            GitHub アカウントを作成しよう
          </h1>
          <p className="text-lg text-muted-foreground">
            GitHub にアカウントを登録して、プロジェクトをクラウド上に保存できるようにします。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <WhyNowBox
          title="GitHub アカウントとは"
          tags={['AI ツール連携', 'コード共有', 'バックアップ']}
        >
          <p>
            GitHub アカウントは、作ったプロジェクトをオンラインで管理するための ID です。Cursor や Claude Code などの AI ツールも、GitHub アカウントと連携して動きます。
          </p>
          <p>
            メールアドレスがないとオンラインサービスに登録できないのと同じで、GitHub アカウントがないとコードのオンライン管理を始められません。登録自体は数分で完了します。
          </p>
        </WhyNowBox>

        {/* Why GitHub Account */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            GitHub アカウントが必要な理由
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              GitHub アカウントがあれば、以下のことができます：
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">プロジェクトの保存</h4>
                  <p className="text-muted-foreground text-sm">
                    ローカルで作成したプロジェクトをクラウド上に保存できます。
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">バージョン管理</h4>
                  <p className="text-muted-foreground text-sm">
                    変更履歴を記録し、過去のバージョンに戻すことができます。
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">セルフレビュー</h4>
                  <p className="text-muted-foreground text-sm">
                    変更内容を GitHub 上で確認し、自分でレビューできます。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">バックアップ</h4>
                  <p className="text-muted-foreground text-sm">
                    パソコンが壊れてもクラウド上にバックアップが残ります。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Account Creation Steps */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            アカウント作成手順
          </h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  GitHub 公式サイトにアクセス
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                以下のリンクから GitHub 公式サイトにアクセスしてください。
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Mail size={18} />
                GitHub 公式サイト
              </a>
            </div>

            {/* Step 2 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  「Sign up」をクリック
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                ページ右上の「Sign up」ボタンをクリックしてください。
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  メールアドレスを入力
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                使用するメールアドレスを入力してください。
              </p>
              <InfoBox type="info">
                GitHub からのお知らせを受け取りたくない場合は、後で通知設定を変更できます。
              </InfoBox>
            </div>

            {/* Step 4 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  パスワードを設定
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                安全なパスワードを設定してください。大文字、小文字、数字を含めることをお勧めします。
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  ユーザー名を設定
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                GitHub 上で使用するユーザー名を設定してください。このユーザー名は公開されます。
              </p>
              <InfoBox type="info">
                ユーザー名は英数字とハイフン、アンダースコアのみ使用可能です。URL に表示されるので、本名またはブランド名に近いものを推奨します（例: yamada-taro, design-studio-x）。後から変更もできますが、URL が変わるため早めに決めた方が良いです。
              </InfoBox>
            </div>

            {/* Step 6 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  6
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  メール確認
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                登録したメールアドレスに確認メールが送られます。メール内のリンクをクリックしてアカウントを確認してください。
              </p>
            </div>

            {/* Step 7 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  7
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  プロフィール設定（オプション）
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                GitHub ページ右上のアイコンをクリック → 「Settings」で、プロフィール情報を設定できます。
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p className="font-semibold">設定できる項目：</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>プロフィール画像</li>
                  <li>自己紹介</li>
                  <li>場所</li>
                  <li>ウェブサイト</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Completion */}
        <section className="mb-12">
          <InfoBox type="success" title="GitHub アカウント作成完了！">
            GitHub アカウントが作成できました。次は、ローカルで Git を設定して、GitHub と連携させます。
          </InfoBox>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/git/environment/nodejs')}>戻る</Button>
          <Button className="gap-2" onClick={() => navigate('/git/github/setup')}>
              次へ：Git ローカル設定
              
              <ArrowRight size={20} />
            </Button>
        </div>
      </div>
    </div>
  );
}
