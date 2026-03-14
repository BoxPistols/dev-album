import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function RouteHandlers() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 42</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Route Handlers</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Next.js の Route Handlers を使って、アプリケーション内に API エンドポイントを作成する方法を学びます。
          GET、POST、PUT、DELETE の各メソッドの実装と、リクエスト・レスポンスの扱い方を理解しましょう。
        </p>

        <WhyNowBox tags={['route.ts', 'API', 'GET', 'POST', 'REST']}>
          <p>
            フロントエンドとバックエンドを同じプロジェクトで管理できるのは Next.js の大きな利点です。
            Route Handlers を使えば、Express のようなバックエンドフレームワークなしで API を構築できます。
            フォームの送信先、外部 API のプロキシ、Webhook の受信など、様々な用途に使えます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: route.ts の基本 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">route.ts の基本</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">app/</code> ディレクトリ内に
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">route.ts</code> ファイルを配置すると、
              そのパスが API エンドポイントになります。HTTP メソッド名の関数をエクスポートして、リクエストを処理します。
            </p>

            <CodeBlock
              code={`app/
├── api/
│   ├── hello/
│   │   └── route.ts          → GET /api/hello
│   ├── users/
│   │   ├── route.ts          → GET/POST /api/users
│   │   └── [id]/
│   │       └── route.ts      → GET/PUT/DELETE /api/users/:id
│   └── contact/
│       └── route.ts          → POST /api/contact
└── page.tsx`}
              language="plaintext"
              title="Route Handlers のファイル構造"
            />

            <CodeBlock
              code={`// app/api/hello/route.ts
import { NextResponse } from 'next/server';

// GET /api/hello
export async function GET() {
  return NextResponse.json({
    message: 'こんにちは！Next.js API です。',
    timestamp: new Date().toISOString(),
  });
}

// ブラウザで http://localhost:3000/api/hello にアクセスすると
// → { "message": "こんにちは！...", "timestamp": "2025-..." }`}
              language="typescript"
              title="最初の Route Handler"
            />

            <InfoBox type="warning" title="route.ts と page.tsx は共存できない">
              <p>
                同じフォルダに <code className="text-sm bg-muted px-1.5 py-0.5 rounded">route.ts</code> と
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">page.tsx</code> を両方置くことはできません。
                API エンドポイントは <code className="text-sm bg-muted px-1.5 py-0.5 rounded">app/api/</code> 以下にまとめるのが慣例です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: GET / POST / PUT / DELETE */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">HTTP メソッドの実装</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              1つの route.ts ファイルに複数の HTTP メソッドを定義できます。
              RESTful API の設計パターンに沿って実装しましょう。
            </p>

            <CodeBlock
              code={`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 仮のデータストア（実際にはデータベースを使う）
let users = [
  { id: '1', name: '田中太郎', email: 'tanaka@example.com' },
  { id: '2', name: '佐藤花子', email: 'sato@example.com' },
];

// GET /api/users - ユーザー一覧を取得
export async function GET(request: NextRequest) {
  // クエリパラメータを取得
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search');

  let result = users;
  if (search) {
    result = users.filter(u =>
      u.name.includes(search) || u.email.includes(search)
    );
  }

  return NextResponse.json(result);
}

// POST /api/users - 新しいユーザーを作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // バリデーション
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: '名前とメールアドレスは必須です' },
        { status: 400 }
      );
    }

    const newUser = {
      id: String(users.length + 1),
      name: body.name,
      email: body.email,
    };
    users.push(newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'リクエストの処理に失敗しました' },
      { status: 500 }
    );
  }
}`}
              language="typescript"
              title="GET と POST の実装"
              showLineNumbers
            />

            <CodeBlock
              code={`// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  params: Promise<{ id: string }>;
};

// GET /api/users/:id - 特定のユーザーを取得
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const user = users.find(u => u.id === id);

  if (!user) {
    return NextResponse.json(
      { error: 'ユーザーが見つかりません' },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

// PUT /api/users/:id - ユーザーを更新
export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: 'ユーザーが見つかりません' },
      { status: 404 }
    );
  }

  users[index] = { ...users[index], ...body };
  return NextResponse.json(users[index]);
}

// DELETE /api/users/:id - ユーザーを削除
export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: 'ユーザーが見つかりません' },
      { status: 404 }
    );
  }

  users.splice(index, 1);
  return NextResponse.json(
    { message: 'ユーザーを削除しました' },
    { status: 200 }
  );
}`}
              language="typescript"
              title="PUT と DELETE の実装"
            />
          </section>

          {/* セクション 3: リクエスト・レスポンスの詳細 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">リクエストとレスポンスの詳細</h2>

            <CodeBlock
              code={`import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // --- リクエストの読み取り ---

  // JSON ボディ
  const json = await request.json();

  // フォームデータ
  const formData = await request.formData();
  const name = formData.get('name');

  // ヘッダー
  const authHeader = request.headers.get('authorization');
  const contentType = request.headers.get('content-type');

  // クッキー
  const token = request.cookies.get('session-token');

  // URL 情報
  const url = request.nextUrl;
  const pathname = url.pathname;     // /api/users
  const search = url.searchParams;   // ?page=1&limit=10

  // --- レスポンスの作成 ---

  // JSON レスポンス
  return NextResponse.json(
    { data: 'value' },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
        'X-Custom-Header': 'custom-value',
      },
    }
  );
}

// その他のレスポンス形式
export async function GET() {
  // テキストレスポンス
  return new Response('Hello, World!', {
    headers: { 'Content-Type': 'text/plain' },
  });

  // リダイレクト
  return NextResponse.redirect(new URL('/login', request.url));

  // ストリーミングレスポンス
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue('data: hello\\n\\n');
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}`}
              language="typescript"
              title="リクエスト・レスポンスの詳細"
            />
          </section>

          {/* セクション 4: 実践: お問い合わせ API */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践: お問い合わせフォーム API</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              実際のプロジェクトでよく使う「お問い合わせフォーム」の API エンドポイントを作ってみましょう。
            </p>

            <CodeBlock
              code={`// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: ContactForm = await request.json();

    // バリデーション
    const errors: string[] = [];
    if (!body.name?.trim()) errors.push('名前は必須です');
    if (!body.email?.trim()) errors.push('メールアドレスは必須です');
    if (!body.message?.trim()) errors.push('メッセージは必須です');
    if (body.email && !body.email.includes('@')) {
      errors.push('有効なメールアドレスを入力してください');
    }

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // 実際のアプリでは:
    // - メール送信（Resend, SendGrid など）
    // - データベースに保存
    // - Slack に通知
    console.log('お問い合わせ受信:', body);

    // 成功レスポンス
    return NextResponse.json(
      { message: 'お問い合わせを受け付けました。' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}`}
              language="typescript"
              title="お問い合わせ API"
            />

            <CodeBlock
              code={`// app/contact/page.tsx（フォームの UI）
'use client';

import { useState, FormEvent } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">送信完了</h2>
        <p className="text-gray-600">お問い合わせありがとうございます。</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">お問い合わせ</h1>

      <div>
        <label className="block text-sm font-medium mb-1">お名前</label>
        <input name="name" required className="w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">メールアドレス</label>
        <input name="email" type="email" required className="w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">メッセージ</label>
        <textarea name="message" required rows={5} className="w-full border rounded px-3 py-2" />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {status === 'sending' ? '送信中...' : '送信する'}
      </button>
    </form>
  );
}`}
              language="tsx"
              title="お問い合わせフォーム UI"
            />

            <InfoBox type="info" title="Route Handler vs Server Actions">
              <p>
                フォームの送信には Route Handler の代わりに Server Actions（次のステップ）を使うこともできます。
                Route Handlers は外部からの API アクセスや Webhook の受信に適しており、
                Server Actions はフォーム送信やデータ更新に適しています。用途に応じて使い分けましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: CORS とセキュリティ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CORS とセキュリティ</h2>

            <CodeBlock
              code={`// app/api/public/route.ts
// 外部サイトからアクセスを許可する場合
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const data = { message: 'Public API' };

  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*', // すべてのオリジンを許可
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// OPTIONS メソッド（プリフライトリクエスト）への対応
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// レート制限の簡易実装
const rateLimit = new Map<string, { count: number; resetTime: number }>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const now = Date.now();
  const limit = rateLimit.get(ip);

  if (limit && limit.resetTime > now && limit.count >= 10) {
    return NextResponse.json(
      { error: 'リクエスト回数の上限に達しました' },
      { status: 429 }
    );
  }

  if (!limit || limit.resetTime <= now) {
    rateLimit.set(ip, { count: 1, resetTime: now + 60000 }); // 1分間
  } else {
    limit.count++;
  }

  // ... 通常の処理
}`}
              language="typescript"
              title="CORS とレート制限"
            />
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Route Handlers - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
                  description: 'API エンドポイントの作成方法',
                },
                {
                  title: 'NextRequest / NextResponse - Next.js',
                  url: 'https://nextjs.org/docs/app/api-reference/functions/next-request',
                  description: 'Web API を拡張したリクエスト/レスポンスオブジェクト',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
