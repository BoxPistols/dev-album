import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function ServerActions() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 43</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Server Actions</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Server Actions を使えば、クライアントから直接サーバー側の関数を呼び出せます。
          フォーム送信やデータ更新を、API エンドポイントなしでシンプルに実装する方法を学びましょう。
        </p>

        <WhyNowBox tags={['use server', 'Server Actions', 'フォーム', 'revalidatePath', 'Progressive Enhancement']}>
          <p>
            従来の Web 開発では、フォームの送信には API エンドポイントの作成が必要でした。
            Server Actions は「サーバーで実行される関数」をコンポーネントから直接呼び出す仕組みです。
            JavaScript が無効な環境でも動作するプログレッシブエンハンスメントも自動的にサポートされます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: Server Actions とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Server Actions とは</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Server Actions は、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use server'</code> ディレクティブで
              マークされた非同期関数です。フォームの <code className="text-sm bg-muted px-1.5 py-0.5 rounded">action</code> 属性や、
              イベントハンドラから呼び出すことができます。
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">従来のアプローチ</h3>
                <div className="space-y-2 text-sm text-foreground/80">
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground font-mono w-4">1.</span>
                    <span>API エンドポイントを作成（route.ts）</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground font-mono w-4">2.</span>
                    <span>クライアントで fetch を呼ぶ</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground font-mono w-4">3.</span>
                    <span>ローディング・エラー状態を管理</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground font-mono w-4">4.</span>
                    <span>送信後にデータを再取得</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                <h3 className="font-bold text-foreground mb-3">Server Actions</h3>
                <div className="space-y-2 text-sm text-foreground/80">
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-mono w-4">1.</span>
                    <span>サーバー関数を定義</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-mono w-4">2.</span>
                    <span>フォームの action に渡す</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-mono w-4">3.</span>
                    <span>自動で送信・再検証される</span>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`// app/actions.ts - Server Actions を定義するファイル
'use server';

// このファイル内のすべての関数が Server Action になる
export async function createTodo(formData: FormData) {
  const title = formData.get('title') as string;

  // サーバー側で直接データベースに保存
  await db.todo.create({
    data: { title, completed: false },
  });

  // キャッシュを再検証して最新データを表示
  revalidatePath('/todos');
}`}
              language="tsx"
              title="Server Actions の基本的な定義"
            />

            <InfoBox type="info" title="'use server' の2つの使い方">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use server'</code> はファイルの先頭に書くとファイル全体が Server Actions になります。
                関数の先頭に書くとその関数だけが Server Action になります。
                実務では専用ファイル（actions.ts）にまとめるパターンが多いです。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: フォームでの使い方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">フォームでの使い方</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Server Actions の最も基本的な使い方は、HTML フォームの
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">action</code> 属性に渡すパターンです。
              フォームが送信されると、自動的にサーバー側で関数が実行されます。
            </p>

            <CodeBlock
              code={`// app/contact/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function submitContact(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // バリデーション
  if (!name || !email || !message) {
    throw new Error('すべての項目を入力してください');
  }

  // メール送信やデータベース保存
  await db.contact.create({
    data: { name, email, message },
  });

  // 送信完了後にページを再検証
  revalidatePath('/contact');
}`}
              language="tsx"
              title="お問い合わせフォームの Server Action"
            />

            <CodeBlock
              code={`// app/contact/page.tsx - Server Component
import { submitContact } from './actions';

export default function ContactPage() {
  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">お問い合わせ</h1>

      {/* action に Server Action を渡す */}
      <form action={submitContact} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            お名前
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            メールアドレス
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            メッセージ
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          送信する
        </button>
      </form>
    </div>
  );
}

// ポイント:
// - JavaScript 無効でも動作（プログレッシブエンハンスメント）
// - API エンドポイント不要
// - Server Component のままでOK`}
              language="tsx"
              title="フォームから Server Action を呼ぶ"
              showLineNumbers
            />

            <InfoBox type="success" title="プログレッシブエンハンスメント">
              <p>
                フォームの <code className="text-sm bg-muted px-1.5 py-0.5 rounded">action</code> に Server Action を渡すと、
                JavaScript が読み込まれる前でもフォーム送信が動作します。
                これはアクセシビリティと UX の両方で大きなメリットです。
              </p>
            </InfoBox>
          </section>

          {/* セクション 3: useFormStatus と useActionState */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">送信状態の管理</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              フォーム送信中のローディング表示やバリデーションエラーの表示には、
              React の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useFormStatus</code> と
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useActionState</code> を使います。
            </p>

            <CodeBlock
              code={`// app/contact/SubmitButton.tsx
'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  // useFormStatus は form の子コンポーネントで使う
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-2 rounded-lg
                 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed
                 transition-colors"
    >
      {pending ? '送信中...' : '送信する'}
    </button>
  );
}

// 注意: useFormStatus は form 要素の「子コンポーネント」でのみ動作する
// form と同じコンポーネント内では使えない`}
              language="tsx"
              title="useFormStatus で送信中の状態を表示"
            />

            <CodeBlock
              code={`// app/contact/ContactForm.tsx
'use client';

import { useActionState } from 'react';
import { submitContact } from './actions';
import { SubmitButton } from './SubmitButton';

// Server Action の戻り値を型定義
type ActionState = {
  success?: boolean;
  error?: string;
};

export function ContactForm() {
  // useActionState: Action の結果を状態として管理
  const [state, formAction] = useActionState<ActionState, FormData>(
    async (_prevState, formData) => {
      try {
        await submitContact(formData);
        return { success: true };
      } catch (error) {
        return { error: (error as Error).message };
      }
    },
    {} // 初期状態
  );

  return (
    <form action={formAction} className="space-y-4">
      {/* 成功メッセージ */}
      {state.success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg">
          送信が完了しました！
        </div>
      )}

      {/* エラーメッセージ */}
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
          {state.error}
        </div>
      )}

      <input name="name" placeholder="お名前" className="w-full border rounded-lg px-3 py-2" />
      <input name="email" type="email" placeholder="メール" className="w-full border rounded-lg px-3 py-2" />
      <textarea name="message" placeholder="メッセージ" className="w-full border rounded-lg px-3 py-2" />

      <SubmitButton />
    </form>
  );
}`}
              language="tsx"
              title="useActionState でエラー・成功状態を管理"
              showLineNumbers
            />
          </section>

          {/* セクション 4: revalidatePath と revalidateTag */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">データの再検証</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Server Action でデータを変更した後、画面に最新のデータを反映する必要があります。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">revalidatePath</code> と
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">revalidateTag</code> を使って、
              キャッシュを更新します。
            </p>

            <CodeBlock
              code={`// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

// パターン 1: パスで再検証
export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  const post = await db.post.create({
    data: { title, content },
  });

  // /blog ページのキャッシュを無効化
  revalidatePath('/blog');

  // 作成した記事のページにリダイレクト
  redirect(\`/blog/\${post.slug}\`);
}

// パターン 2: タグで再検証
export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const price = Number(formData.get('price'));

  await db.product.update({
    where: { id },
    data: { name, price },
  });

  // 'products' タグがついた fetch キャッシュを無効化
  revalidateTag('products');
}

// パターン 3: レイアウト全体を再検証
export async function updateTheme(formData: FormData) {
  const theme = formData.get('theme') as string;
  await db.settings.update({
    where: { key: 'theme' },
    data: { value: theme },
  });

  // レイアウトを含む全体を再検証
  revalidatePath('/', 'layout');
}`}
              language="tsx"
              title="再検証のパターン"
            />

            <InfoBox type="info" title="revalidatePath vs revalidateTag">
              <p>
                <strong>revalidatePath</strong>: 特定のパスのキャッシュを無効化します。そのページが次にアクセスされたとき再生成されます。<br />
                <strong>revalidateTag</strong>: タグで関連するキャッシュをまとめて無効化します。fetch にタグを付けておくと便利です。<br />
                どちらも Server Action 内と Route Handler 内で使えます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: Server Actions の実践パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践パターン: TODO アプリ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Server Actions を使った TODO アプリの実装例で、追加・完了・削除の一連の操作を見てみましょう。
            </p>

            <CodeBlock
              code={`// app/todos/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/database';

export async function addTodo(formData: FormData) {
  const title = formData.get('title') as string;

  if (!title?.trim()) {
    throw new Error('タイトルを入力してください');
  }

  await db.todo.create({
    data: {
      title: title.trim(),
      completed: false,
    },
  });

  revalidatePath('/todos');
}

export async function toggleTodo(id: string) {
  const todo = await db.todo.findUnique({ where: { id } });
  if (!todo) throw new Error('Todo が見つかりません');

  await db.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  });

  revalidatePath('/todos');
}

export async function deleteTodo(id: string) {
  await db.todo.delete({ where: { id } });
  revalidatePath('/todos');
}`}
              language="tsx"
              title="TODO アプリの Server Actions"
            />

            <CodeBlock
              code={`// app/todos/page.tsx - Server Component
import { db } from '@/lib/database';
import { addTodo } from './actions';
import { TodoItem } from './TodoItem';

export default async function TodosPage() {
  const todos = await db.todo.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">TODO リスト</h1>

      {/* 追加フォーム */}
      <form action={addTodo} className="flex gap-2 mb-8">
        <input
          name="title"
          placeholder="新しいタスクを入力..."
          className="flex-1 border rounded-lg px-3 py-2"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          追加
        </button>
      </form>

      {/* TODO リスト */}
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          タスクがありません。上のフォームから追加してください。
        </p>
      )}
    </div>
  );
}

// ---

// app/todos/TodoItem.tsx - Client Component
'use client';

import { toggleTodo, deleteTodo } from './actions';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg group">
      {/* bind で引数を渡す */}
      <form action={toggleTodo.bind(null, todo.id)}>
        <button
          type="submit"
          className={\`w-5 h-5 rounded border-2 flex items-center justify-center
            \${todo.completed
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-gray-300 hover:border-blue-400'
            }\`}
        >
          {todo.completed && '✓'}
        </button>
      </form>

      <span className={\`flex-1 \${todo.completed ? 'line-through text-gray-400' : ''}\`}>
        {todo.title}
      </span>

      <form action={deleteTodo.bind(null, todo.id)}>
        <button
          type="submit"
          className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          削除
        </button>
      </form>
    </div>
  );
}`}
              language="tsx"
              title="TODO アプリの完全な実装"
              showLineNumbers
            />
          </section>

          {/* セクション 6: Server Actions のセキュリティ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">セキュリティの注意点</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Server Actions はパブリックな HTTP エンドポイントとして公開されます。
              認証チェックやバリデーションを必ず行いましょう。
            </p>

            <CodeBlock
              code={`// app/actions.ts
'use server';

import { auth } from '@/lib/auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Zod でバリデーションスキーマを定義
const PostSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(100, '100文字以内'),
  content: z.string().min(10, '10文字以上入力してください'),
});

export async function createPost(formData: FormData) {
  // 1. 認証チェック
  const session = await auth();
  if (!session?.user) {
    throw new Error('ログインが必要です');
  }

  // 2. バリデーション
  const rawData = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  const result = PostSchema.safeParse(rawData);
  if (!result.success) {
    // バリデーションエラーを返す
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // 3. データ保存
  await db.post.create({
    data: {
      ...result.data,
      authorId: session.user.id,
    },
  });

  revalidatePath('/posts');
  return { success: true };
}`}
              language="tsx"
              title="認証とバリデーション付き Server Action"
            />

            <InfoBox type="warning" title="Server Actions はパブリック API">
              <p>
                Server Actions は内部的に POST リクエストのエンドポイントです。
                悪意のあるユーザーが直接リクエストを送ることも可能なため、
                必ずサーバー側でバリデーションと認証チェックを行ってください。
                クライアント側のバリデーションだけに頼ってはいけません。
              </p>
            </InfoBox>
          </section>

          {/* セクション 7: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">Server Actions の特徴</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span><code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use server'</code> で定義</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>API エンドポイントが不要</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>フォームの action に直接渡せる</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>プログレッシブエンハンスメント対応</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">注意点</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">&#9679;</span>
                    <span>必ずサーバー側でバリデーション</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">&#9679;</span>
                    <span>認証チェックを忘れない</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">&#9679;</span>
                    <span>revalidatePath / Tag でキャッシュ更新</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">&#9679;</span>
                    <span>シリアライズ可能な引数のみ渡せる</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Server Actions - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations',
                  description: 'Server Actions によるデータ変更',
                },
                {
                  title: 'useActionState - React',
                  url: 'https://ja.react.dev/reference/react/useActionState',
                  description: 'フォームアクションの状態管理フック',
                },
                {
                  title: 'useFormStatus - React DOM',
                  url: 'https://ja.react.dev/reference/react-dom/hooks/useFormStatus',
                  description: 'フォーム送信状態の取得',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
