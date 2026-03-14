import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function DialogPatterns() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 63</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Dialog の設計パターン</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Dialog（モーダル）は強力な UI パターンですが、使い方を誤るとアクセシビリティや
          ユーザー体験を大きく損ないます。HTML の dialog 要素の仕組みから、
          React での実装パターン、そして「いつ Dialog を使うべきでないか」まで体系的に学びます。
        </p>

        <WhyNowBox tags={['dialog', 'modal', 'アクセシビリティ', 'aria', 'フォーカストラップ', 'Portal']}>
          <p>
            UI コンポーネントの中でも Dialog は実装の複雑さとアクセシビリティの課題が最も多い要素のひとつです。
            HTML のネイティブ dialog 要素を正しく理解した上で、React での制御パターンと
            アクセシビリティ要件を押さえることで、ユーザーにとって本当に必要な場面でのみ
            適切に Dialog を使えるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: Dialog とは何か */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Dialog とは何か</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Dialog（ダイアログ）は、メインコンテンツの上にオーバーレイ表示される
              独立したウィンドウです。ユーザーに注意を促したり、入力を求めたりするために使います。
              HTML5 では <code>&lt;dialog&gt;</code> 要素としてネイティブにサポートされています。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">Modal と Non-modal の違い</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Dialog には 2 種類の表示モードがあります。この違いを正しく理解することが設計の第一歩です。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">特性</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Modal（モーダル）</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Non-modal（非モーダル）</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">背景操作</td>
                    <td className="py-3 px-4">不可（背景が inert になる）</td>
                    <td className="py-3 px-4">可能</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">backdrop</td>
                    <td className="py-3 px-4">表示される</td>
                    <td className="py-3 px-4">表示されない</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">ESC キー</td>
                    <td className="py-3 px-4">閉じる（デフォルト動作）</td>
                    <td className="py-3 px-4">閉じない（自分で実装が必要）</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">表示 API</td>
                    <td className="py-3 px-4">showModal()</td>
                    <td className="py-3 px-4">show()</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">主な用途</td>
                    <td className="py-3 px-4">確認ダイアログ、ログインフォーム</td>
                    <td className="py-3 px-4">ツールチップ、通知パネル</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="なぜネイティブ dialog 要素を使うべきか">
              <p>
                <code>&lt;dialog&gt;</code> 要素は、ブラウザが以下の機能を自動的に提供します:
                (1) ESC キーによるクローズ、(2) フォーカストラップ（Modal の場合）、
                (3) <code>::backdrop</code> 擬似要素、(4) top layer への配置（z-index 問題の解消）。
                <code>&lt;div&gt;</code> で自作するよりも遥かに少ないコードで
                アクセシブルな Dialog を実現できます。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: Dialog の HTML 構造 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Dialog の HTML 構造</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ネイティブの <code>&lt;dialog&gt;</code> 要素を使った基本的な構造を見ていきましょう。
            </p>

            <CodeBlock
              language="html"
              title="基本的な dialog 要素の構造"
              showLineNumbers
              code={`<!-- dialog 要素はデフォルトで非表示 -->
<dialog id="confirm-dialog">
  <h2>確認</h2>
  <p>この操作を実行しますか？</p>
  <form method="dialog">
    <!-- method="dialog" のフォーム送信で dialog が閉じる -->
    <button value="cancel">キャンセル</button>
    <button value="confirm">確認する</button>
  </form>
</dialog>

<button onclick="document.getElementById('confirm-dialog').showModal()">
  ダイアログを開く
</button>`}
            />

            <CodePreview
              code={`function BasicDialog() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={() => setOpen(true)}
        style={{ padding: '8px 16px', background: 'var(--text-accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
      >
        ダイアログを開く
      </button>
      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: 'var(--bg)', borderRadius: '12px', padding: '24px', maxWidth: '400px', width: '90%', color: 'var(--text)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <h2 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>確認</h2>
            <p style={{ marginBottom: '20px', color: 'var(--text-muted)', fontSize: '14px' }}>この操作を実行しますか？</p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => setOpen(false)} style={{ padding: '8px 16px', border: '1px solid var(--border)', borderRadius: '6px', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontSize: '14px' }}>キャンセル</button>
              <button onClick={() => setOpen(false)} style={{ padding: '8px 16px', background: 'var(--text-accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>確認する</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`}
              language="tsx"
              title="基本的な Dialog の外観"
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">showModal() と show() の違い</h3>

            <CodeBlock
              language="javascript"
              title="2 つの表示メソッド"
              showLineNumbers
              code={`const dialog = document.getElementById('my-dialog');

// Modal として表示
// - ::backdrop が表示される
// - 背景の操作がブロックされる（inert）
// - ESC キーで閉じる
// - フォーカスが dialog 内に閉じ込められる
// - top layer に配置される（z-index 不要）
dialog.showModal();

// Non-modal として表示
// - backdrop なし
// - 背景の操作が可能
// - ESC キーで閉じない
// - フォーカストラップなし
dialog.show();

// 閉じる（両方共通）
dialog.close();

// 戻り値を渡して閉じる
dialog.close('confirm');
console.log(dialog.returnValue); // "confirm"`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">::backdrop 擬似要素のスタイリング</h3>

            <CodeBlock
              language="css"
              title="backdrop のカスタマイズ"
              showLineNumbers
              code={`/* showModal() で表示した場合のみ ::backdrop が有効 */
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

/* dialog 本体のスタイル */
dialog {
  border: none;
  border-radius: 12px;
  padding: 24px;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

/* open 属性で表示中のスタイルを制御 */
dialog[open] {
  animation: dialog-fade-in 0.2s ease-out;
}

@keyframes dialog-fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}`}
            />

            <CodePreview
              code={`function BackdropDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={() => setOpen(true)}
        style={{ padding: '8px 16px', background: 'var(--text-accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
      >
        backdrop 付きダイアログ
      </button>
      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, animation: 'fadeIn 0.2s ease-out' }}
        >
          <div style={{ background: 'var(--bg)', border: 'none', borderRadius: '12px', padding: '24px', maxWidth: '480px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', color: 'var(--text)', animation: 'slideIn 0.2s ease-out' }}>
            <h2 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>Backdrop デモ</h2>
            <p style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '14px' }}>背景のぼかし（backdrop-filter: blur）と半透明オーバーレイを適用しています。backdrop をクリックすると閉じます。</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setOpen(false)} style={{ padding: '8px 16px', background: 'var(--text-accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>閉じる</button>
            </div>
          </div>
        </div>
      )}
      <style>{\`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      \`}</style>
    </div>
  );
}`}
              language="tsx"
              title="backdrop スタイリングのデモ"
            />

            <InfoBox type="warning" title="open 属性を直接操作しない">
              <p>
                <code>&lt;dialog open&gt;</code> のように HTML 属性で直接 open を付けると
                Non-modal として表示されますが、<code>::backdrop</code> が使えず
                アクセシビリティ機能も無効です。
                必ず JavaScript の <code>showModal()</code> または <code>show()</code> を使いましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: 閉じ方パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Dialog の閉じ方パターン 5 つ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Dialog を閉じる方法は複数ありますが、ユーザーが「どうやって閉じるか」を
              直感的に理解できることが最も重要です。
            </p>

            <CodeBlock
              language="javascript"
              title="5 つの閉じ方パターン"
              showLineNumbers
              code={`const dialog = document.getElementById('my-dialog');

// 1. ボタンクリックで閉じる
const closeBtn = dialog.querySelector('.close-btn');
closeBtn.addEventListener('click', () => {
  dialog.close();
});

// 2. ESC キーで閉じる（Modal の場合はデフォルトで有効）
// cancel イベントで検知できる
dialog.addEventListener('cancel', (e) => {
  // e.preventDefault() で ESC による閉じを防止できる
  console.log('ESC キーで閉じられました');
});

// 3. backdrop クリックで閉じる
// ※ ネイティブでは未サポート。自前で実装が必要
dialog.addEventListener('click', (e) => {
  // dialog 要素自体がクリックされた場合（= backdrop 領域）
  if (e.target === dialog) {
    dialog.close();
  }
});

// 4. フォーム送信後に閉じる
// method="dialog" を指定した form の submit で自動的に閉じる
// <form method="dialog">
//   <button value="ok">OK</button>
// </form>
dialog.addEventListener('close', () => {
  console.log('閉じました。戻り値:', dialog.returnValue);
});

// 5. タイマーで閉じる（トースト通知的な使い方）
function showTemporaryDialog(message, duration = 3000) {
  const tempDialog = document.getElementById('temp-dialog');
  tempDialog.textContent = message;
  tempDialog.show(); // Non-modal で表示
  setTimeout(() => tempDialog.close(), duration);
}`}
            />

            <CodePreview
              code={`function ClosePatternDemo() {
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState([]);
  const addLog = (msg) => setLog(prev => [...prev.slice(-4), msg]);
  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={() => { setOpen(true); setLog([]); }}
        style={{ padding: '8px 16px', background: 'var(--text-accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
      >
        閉じ方パターンを試す
      </button>
      {log.length > 0 && (
        <div style={{ marginTop: '12px', padding: '8px 12px', background: 'var(--bg-muted)', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
          {log.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      )}
      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) { addLog('backdrop クリックで閉じました'); setOpen(false); } }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}
        >
          <div style={{ background: 'var(--bg)', borderRadius: '12px', padding: '24px', maxWidth: '420px', width: '90%', color: 'var(--text)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative' }}>
            <button
              onClick={() => { addLog('X ボタンで閉じました'); setOpen(false); }}
              style={{ position: 'absolute', top: '12px', right: '12px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: '4px' }}
              aria-label="閉じる"
            >X</button>
            <h2 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 'bold', paddingRight: '24px' }}>閉じ方を試そう</h2>
            <p style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '14px' }}>以下の方法で閉じることができます:</p>
            <ul style={{ marginBottom: '16px', paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.8 }}>
              <li>右上の X ボタン</li>
              <li>backdrop（背景の暗い部分）をクリック</li>
              <li>下のボタンをクリック</li>
            </ul>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => { addLog('キャンセルボタンで閉じました'); setOpen(false); }} style={{ padding: '8px 16px', border: '1px solid var(--border)', borderRadius: '6px', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontSize: '14px' }}>キャンセル</button>
              <button onClick={() => { addLog('確認ボタンで閉じました'); setOpen(false); }} style={{ padding: '8px 16px', background: 'var(--text-accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>確認</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`}
              language="tsx"
              title="Dialog の閉じ方パターン（インタラクティブ）"
            />

            <InfoBox type="info" title="backdrop クリックの注意点">
              <p>
                backdrop クリックで閉じる実装は、ユーザーが dialog 内のテキストを
                ドラッグ選択した際に意図せず閉じてしまう問題があります。
                <code>mousedown</code> と <code>mouseup</code> の両方が dialog 外であることを
                確認するか、<code>pointerdown</code> イベントの座標を判定するとより堅牢になります。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: React での Dialog 実装 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React での Dialog 実装パターン</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              React ではネイティブの <code>&lt;dialog&gt;</code> を ref で制御するか、
              Portal を使って DOM ツリーの外に描画するアプローチが一般的です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">パターン 1: useRef でネイティブ dialog を制御</h3>

            <CodeBlock
              language="tsx"
              title="ネイティブ dialog + useRef パターン"
              showLineNumbers
              code={`import { useRef, useEffect } from 'react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

function Dialog({ open, onClose, children, title }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      // まだ開いていなければ showModal() で開く
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      dialog.close();
    }
  }, [open]);

  // ESC キーによる閉じを検知
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault(); // ブラウザのデフォルト動作を防止
      onClose();          // React の state を更新
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  // backdrop クリック
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      aria-labelledby="dialog-title"
    >
      <div className="dialog-content">
        <h2 id="dialog-title">{title}</h2>
        {children}
        <button onClick={onClose}>閉じる</button>
      </div>
    </dialog>
  );
}

// 使用例
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>ダイアログを開く</button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="確認"
      >
        <p>この操作を実行しますか？</p>
      </Dialog>
    </>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">パターン 2: createPortal を使った実装</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              React の <code>createPortal</code> を使うと、コンポーネントツリー内の位置に関わらず
              DOM 上の任意の場所に描画できます。これにより CSS の <code>overflow: hidden</code> や
              <code>z-index</code> の影響を回避できます。
            </p>

            <CodeBlock
              language="tsx"
              title="createPortal パターン"
              showLineNumbers
              code={`import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

function Modal({ open, onClose, children, title }: ModalProps) {
  // ESC キーで閉じる
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  // スクロールロック
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return createPortal(
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        // overlay 自体がクリックされた場合のみ閉じる
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content" role="document">
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose} aria-label="閉じる">
          X
        </button>
      </div>
    </div>,
    document.body
  );
}`}
            />

            <InfoBox type="warning" title="Portal パターンの落とし穴">
              <ul className="list-disc pl-4 space-y-1">
                <li>フォーカストラップを自前で実装する必要がある</li>
                <li>aria-modal, role="dialog" を手動で付与する必要がある</li>
                <li>スクロールロックの解除忘れに注意（cleanup 関数で必ず解除）</li>
                <li>ネイティブ dialog 要素を使う方がアクセシビリティ対応のコストが低い</li>
              </ul>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">パターン 3: カスタム Hook で共通化</h3>

            <CodeBlock
              language="tsx"
              title="useDialog カスタム Hook"
              showLineNumbers
              code={`import { useState, useCallback, useRef, useEffect } from 'react';

function useDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  const open = useCallback(() => {
    // 開く前にトリガー要素を記憶（閉じた後にフォーカスを戻すため）
    triggerRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // フォーカスをトリガー要素に戻す
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return { isOpen, open, close, dialogRef };
}

// 使用例
function DeleteButton() {
  const { isOpen, open, close, dialogRef } = useDialog();

  const handleDelete = () => {
    // 削除処理...
    close();
  };

  return (
    <>
      <button onClick={open}>削除</button>
      <dialog ref={dialogRef} onCancel={close}>
        <h2>本当に削除しますか？</h2>
        <p>この操作は取り消せません。</p>
        <button onClick={close}>キャンセル</button>
        <button onClick={handleDelete}>削除する</button>
      </dialog>
    </>
  );
}`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="HTML のネイティブ dialog 要素で showModal() を使って表示した場合、自動的に提供される機能はどれですか？"
              options={[
                { label: 'backdrop クリックによる閉じ機能' },
                { label: 'ESC キーによる閉じ機能とフォーカストラップ', correct: true },
                { label: 'アニメーション付きの表示・非表示' },
                { label: 'レスポンシブなサイズ調整' },
              ]}
              explanation="showModal() で表示した dialog は、ブラウザが ESC キーによる閉じ機能（cancel イベント）とフォーカストラップ（Tab キーが dialog 内に閉じ込められる）を自動的に提供します。backdrop クリックによる閉じ機能は自前で実装する必要があります。"
            />
          </section>

          {/* セクション5: なぜ Dialog の多用を避けるべきか */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">なぜ Dialog の多用を避けるべきか</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Dialog は便利なパターンですが、過度に使用するとユーザー体験を悪化させます。
              ここでは技術的な課題とユーザビリティの問題の両面から、Dialog の多用が危険な理由を解説します。
            </p>

            <InfoBox type="error" title="Dialog 多用の危険性">
              <p>
                Dialog は「ユーザーの作業を中断する」UI パターンです。
                使用するたびにユーザーのフロー（作業の流れ）を強制的に中断します。
                以下の問題を理解した上で、本当に Dialog が最適かどうかを常に検討してください。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">1. フォーカストラップの実装の複雑さ</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Modal Dialog ではフォーカスが dialog の外に出ないようにする「フォーカストラップ」が
              アクセシビリティ上必須です。ネイティブ dialog を使えばブラウザが処理しますが、
              div で自作する場合は以下のような複雑な実装が必要になります。
            </p>

            <CodeBlock
              language="tsx"
              title="フォーカストラップの自前実装（複雑さの例）"
              showLineNumbers
              code={`function FocusTrap({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // フォーカス可能な全要素を取得
    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      // 現時点のフォーカス可能要素を毎回取得
      // （動的に追加・削除される可能性があるため）
      const focusable = container.querySelectorAll<HTMLElement>(focusableSelector);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;

      if (e.shiftKey) {
        // Shift+Tab: 最初の要素にいたら最後に戻る
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: 最後の要素にいたら最初に戻る
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    // 最初のフォーカス可能要素にフォーカスを移動
    const firstFocusable = container.querySelector<HTMLElement>(focusableSelector);
    firstFocusable?.focus();

    return () => container.removeEventListener('keydown', handleKeyDown);
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

// ※ これでも不十分なケースがある:
// - iframe 内の要素
// - Shadow DOM 内の要素
// - contenteditable な要素
// - tabindex が動的に変わる要素`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">2. スクリーンリーダー対応</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              スクリーンリーダーのユーザーに Dialog の存在と内容を正しく伝えるためには、
              複数の ARIA 属性を正確に設定する必要があります。
            </p>

            <CodeBlock
              language="html"
              title="スクリーンリーダーに必要な属性"
              showLineNumbers
              code={`<!-- 必須の属性 -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-desc"
>
  <h2 id="dialog-title">アカウント削除の確認</h2>
  <p id="dialog-desc">
    この操作は取り消せません。全データが削除されます。
  </p>
  <!-- コンテンツ... -->
</div>

<!--
  role="dialog" : スクリーンリーダーに「ダイアログ」として認識させる
  aria-modal="true" : 背景が操作不能であることを伝える
  aria-labelledby : ダイアログのタイトル要素を紐付ける
  aria-describedby : ダイアログの説明文を紐付ける

  ※ ネイティブ <dialog> + showModal() なら
    role と aria-modal は自動的に付与される
-->`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">3. スクロールロックの副作用</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Modal 表示中は背景のスクロールを止める必要がありますが、
              この実装には意外な副作用が伴います。
            </p>

            <CodeBlock
              language="typescript"
              title="スクロールロックの問題点"
              showLineNumbers
              code={`// 単純な実装
function lockScroll() {
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  document.body.style.overflow = '';
}

// 問題1: スクロール位置がリセットされる場合がある
// 問題2: スクロールバーの幅分だけレイアウトがガタつく
// 問題3: iOS Safari では overflow: hidden だけではスクロールが止まらない

// より堅牢な実装
function lockScrollRobust() {
  const scrollY = window.scrollY;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.position = 'fixed';
  document.body.style.top = \`-\${scrollY}px\`;
  document.body.style.width = '100%';
  // スクロールバー消失によるガタつきを防止
  document.body.style.paddingRight = \`\${scrollbarWidth}px\`;
}

function unlockScrollRobust() {
  const scrollY = parseInt(document.body.style.top || '0', 10);
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.paddingRight = '';
  window.scrollTo(0, -scrollY);
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">4. モバイルでの操作性の問題</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              モバイルデバイスでの Dialog は特に多くの問題を抱えています。
            </p>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <div className="space-y-3 text-foreground/80 text-sm">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">1</span>
                  <div>
                    <p className="font-semibold text-foreground">画面の大半を覆い隠す</p>
                    <p>モバイルの小さな画面では Dialog がほぼ全画面を占め、背景のコンテキストが完全に失われる</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">2</span>
                  <div>
                    <p className="font-semibold text-foreground">仮想キーボードとの干渉</p>
                    <p>Dialog 内の input にフォーカスすると仮想キーボードが表示され、Dialog の内容が見切れる</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">3</span>
                  <div>
                    <p className="font-semibold text-foreground">スワイプ操作との競合</p>
                    <p>Dialog 内のスクロールとブラウザの戻る操作（スワイプバック）が競合しやすい</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">4</span>
                  <div>
                    <p className="font-semibold text-foreground">閉じるボタンが押しにくい</p>
                    <p>Dialog 右上の小さな X ボタンは、タッチ操作では正確にタップしにくい</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">5. ネストされた Dialog の地獄</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              「Dialog の中から別の Dialog を開く」というパターンは、
              ユーザー体験を著しく悪化させます。
            </p>

            <CodeBlock
              language="tsx"
              title="避けるべきパターン: ネストされた Dialog"
              showLineNumbers
              code={`// 避けるべきパターン
function BadExample() {
  const [showSettings, setShowSettings] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      <button onClick={() => setShowSettings(true)}>設定</button>

      {/* 第1層: 設定 Dialog */}
      <Dialog open={showSettings} onClose={() => setShowSettings(false)}>
        <h2>設定を変更</h2>
        {/* ... フォーム ... */}
        <button onClick={() => setShowConfirm(true)}>保存</button>

        {/* 第2層: 確認 Dialog（設定 Dialog の中） */}
        <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
          <p>本当に保存しますか？</p>
          <button onClick={() => {
            save();
            setShowConfirm(false);
            setShowSuccess(true);
          }}>
            はい
          </button>

          {/* 第3層: 成功 Dialog（確認 Dialog の中）*/}
          {/* ← ここまで来るとフォーカス管理が破綻する */}
        </Dialog>
      </Dialog>
    </>
  );
}

// 改善案: ステップ型の単一 Dialog にする
function GoodExample() {
  const [step, setStep] = useState<'closed' | 'edit' | 'confirm' | 'done'>('closed');

  return (
    <>
      <button onClick={() => setStep('edit')}>設定</button>
      <Dialog open={step !== 'closed'} onClose={() => setStep('closed')}>
        {step === 'edit' && (
          <>
            <h2>設定を変更</h2>
            {/* ... フォーム ... */}
            <button onClick={() => setStep('confirm')}>保存</button>
          </>
        )}
        {step === 'confirm' && (
          <>
            <p>本当に保存しますか？</p>
            <button onClick={() => setStep('edit')}>戻る</button>
            <button onClick={() => { save(); setStep('done'); }}>はい</button>
          </>
        )}
        {step === 'done' && (
          <>
            <p>保存しました。</p>
            <button onClick={() => setStep('closed')}>閉じる</button>
          </>
        )}
      </Dialog>
    </>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">6. ユーザーの認知負荷</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Dialog は「割り込み UI」です。ユーザーが何かの作業をしている最中に
              Dialog が表示されると、以下の認知的な負荷がかかります。
            </p>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <div className="space-y-2 text-foreground/80 text-sm">
                <p><strong>コンテキストスイッチ:</strong> ユーザーは今やっていた作業を一時停止し、Dialog の内容に注意を切り替える必要がある</p>
                <p><strong>元の状態の記憶:</strong> Dialog を閉じた後、「さっき何をしていたか」を思い出す必要がある</p>
                <p><strong>判断の強制:</strong> Dialog が表示された瞬間に意思決定を迫られる（今すぐ判断しなければならない）</p>
                <p><strong>不安感:</strong> 「このダイアログを閉じたらデータは消えるのか？」という不安が生まれやすい</p>
              </div>
            </div>

            <InfoBox type="error" title="特に避けるべき Dialog の使い方">
              <ul className="list-disc pl-4 space-y-1">
                <li>ページ読み込み直後のニュースレター登録 Dialog</li>
                <li>Cookie 同意 Dialog の上に表示されるプロモーション Dialog</li>
                <li>フォーム入力中に表示される「セッション切れ」Dialog（入力内容を保存してから表示すべき）</li>
                <li>長いフォームを Dialog 内に配置する（ページ遷移の方が適切）</li>
                <li>情報表示だけの Dialog（インライン展開で十分）</li>
              </ul>
            </InfoBox>
          </section>

          {/* セクション6: Dialog の代替案 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Dialog の代替案</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Dialog を使う前に、以下の代替パターンで対応できないか検討しましょう。
              多くの場合、Dialog よりもユーザーの作業フローを妨げない方法が存在します。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">代替パターン</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">適した場面</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">利点</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">インライン展開</td>
                    <td className="py-3 px-4">詳細情報の表示、ヘルプテキスト</td>
                    <td className="py-3 px-4">コンテキストが失われない</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">ページ遷移</td>
                    <td className="py-3 px-4">複雑なフォーム、設定画面</td>
                    <td className="py-3 px-4">十分なスペースと URL 共有</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">Drawer</td>
                    <td className="py-3 px-4">フィルター、サブナビゲーション</td>
                    <td className="py-3 px-4">背景が部分的に見える</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">Accordion</td>
                    <td className="py-3 px-4">FAQ、段階的な情報開示</td>
                    <td className="py-3 px-4">ページ内で完結する</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">Toast / Snackbar</td>
                    <td className="py-3 px-4">成功・エラーの通知</td>
                    <td className="py-3 px-4">非同期的で作業を妨げない</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="tsx"
              title="Dialog の代わりにインライン展開を使う例"
              showLineNumbers
              code={`// 悪い例: 詳細を Dialog で表示
function BadProductCard({ product }: { product: Product }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="card">
      <h3>{product.name}</h3>
      <button onClick={() => setShowDetails(true)}>詳細を見る</button>
      <Dialog open={showDetails} onClose={() => setShowDetails(false)}>
        <p>{product.description}</p>
        <p>価格: {product.price}円</p>
        <p>在庫: {product.stock}個</p>
      </Dialog>
    </div>
  );
}

// 良い例: インライン展開で表示
function GoodProductCard({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card">
      <h3>{product.name}</h3>
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls="product-details"
      >
        {expanded ? '閉じる' : '詳細を見る'}
      </button>
      {expanded && (
        <div id="product-details" className="details">
          <p>{product.description}</p>
          <p>価格: {product.price}円</p>
          <p>在庫: {product.stock}個</p>
        </div>
      )}
    </div>
  );
}`}
            />

            <CodeBlock
              language="tsx"
              title="Dialog の代わりに Toast を使う例"
              showLineNumbers
              code={`// 悪い例: 保存成功を Dialog で表示
function BadSaveHandler() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    await saveData();
    setShowSuccess(true);
    // ユーザーは「OK」を押すまで次の操作ができない
  };

  return (
    <>
      <button onClick={handleSave}>保存</button>
      <Dialog open={showSuccess} onClose={() => setShowSuccess(false)}>
        <p>保存しました</p>
        <button onClick={() => setShowSuccess(false)}>OK</button>
      </Dialog>
    </>
  );
}

// 良い例: Toast 通知で表示
function GoodSaveHandler() {
  const { toast } = useToast();

  const handleSave = async () => {
    await saveData();
    // 通知を出しつつ、ユーザーは即座に次の操作に移れる
    toast({ message: '保存しました', type: 'success' });
  };

  return <button onClick={handleSave}>保存</button>;
}`}
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="以下の場面のうち、Dialog（モーダル）の使用が最も適切なものはどれですか？"
              options={[
                { label: '商品の詳細情報を表示するとき' },
                { label: 'データの保存が成功したことを通知するとき' },
                { label: 'ユーザーがアカウントを削除しようとしているとき', correct: true },
                { label: 'FAQ の回答を表示するとき' },
              ]}
              explanation="アカウント削除は取り消せない破壊的操作であり、ユーザーに意図的な確認を求める必要があるため Dialog が適切です。商品詳細はインライン展開、保存成功は Toast 通知、FAQ は Accordion がそれぞれ適しています。"
            />
          </section>

          {/* セクション7: 適切な使用シーン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Dialog の適切な使用シーン</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Dialog は以下の条件を満たす場合に限り使用を検討しましょう。
              「ユーザーの注意を強制的に引き付ける必要がある」かどうかが判断基準です。
            </p>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">確認ダイアログ</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  「本当に削除しますか？」「送信してよろしいですか？」のように、
                  ユーザーの意図を確認する場面。特に取り消せない操作の前に使用する。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">破壊的操作の防止</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  アカウント削除、データの完全消去、課金の確定など、
                  誤操作のリスクが高い操作のガードとして使用する。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">認証・ログインフォーム</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  セッション切れ時の再ログイン、2要素認証の入力など、
                  セキュリティ上の理由で即座に対応が必要な場面。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">短い入力フォーム</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  リネーム、コメント追加など、1〜2 フィールドの簡単な入力。
                  ページ遷移するほどではないが、インライン編集では狭い場合。
                </p>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              title="適切な確認ダイアログの実装例"
              showLineNumbers
              code={`interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'default';
}

function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  title,
  description,
  confirmLabel = '確認',
  cancelLabel = 'キャンセル',
  variant = 'default',
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => { e.preventDefault(); onCancel(); }}
      onClick={(e) => { if (e.target === dialogRef.current) onCancel(); }}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
      className="dialog"
    >
      <div className="dialog-body">
        <h2 id="confirm-title" className="dialog-title">{title}</h2>
        <p id="confirm-desc" className="dialog-description">{description}</p>
        <div className="dialog-actions">
          {/* キャンセルボタンを先に（Tab 順序で先にフォーカスさせる） */}
          <button onClick={onCancel} className="btn-secondary">
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={variant === 'danger' ? 'btn-danger' : 'btn-primary'}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}

// 使用例
function DeleteAccountButton() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    await deleteAccount();
    setShowConfirm(false);
  };

  return (
    <>
      <button onClick={() => setShowConfirm(true)}>アカウント削除</button>
      <ConfirmDialog
        open={showConfirm}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
        title="アカウントを削除しますか？"
        description="この操作は取り消せません。すべてのデータが完全に削除されます。"
        confirmLabel="削除する"
        variant="danger"
      />
    </>
  );
}`}
            />

            <CodePreview
              code={`function ConfirmDialogDemo() {
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => { setOpen(true); setDeleted(false); }}
          style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
        >
          アカウント削除
        </button>
        {deleted && <span style={{ color: '#ef4444', fontSize: '13px' }}>アカウントが削除されました（デモ）</span>}
      </div>
      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}
        >
          <div style={{ background: 'var(--bg)', borderRadius: '12px', padding: '24px', maxWidth: '440px', width: '90%', color: 'var(--text)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <h2 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 'bold', color: '#ef4444' }}>アカウントを削除しますか？</h2>
            <p style={{ marginBottom: '20px', color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>この操作は取り消せません。すべてのデータが完全に削除されます。</p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => setOpen(false)} style={{ padding: '8px 16px', border: '1px solid var(--border)', borderRadius: '6px', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontSize: '14px' }}>キャンセル</button>
              <button onClick={() => { setOpen(false); setDeleted(true); }} style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>削除する</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`}
              language="tsx"
              title="確認ダイアログの実装例（破壊的操作）"
            />
          </section>

          {/* セクション8: アクセシビリティチェックリスト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">アクセシビリティチェックリスト</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Dialog を実装する際には、以下のチェックリストをすべて満たしているか確認してください。
              ネイティブの <code>&lt;dialog&gt;</code> + <code>showModal()</code> を使えば
              多くの項目が自動的に満たされます。
            </p>

            <div className="rounded-lg border border-border p-6 mb-6">
              <h3 className="font-bold text-foreground mb-4">必須チェック項目</h3>
              <div className="space-y-3">
                {[
                  {
                    category: 'ロールと属性',
                    items: [
                      'role="dialog" が設定されている（<dialog> なら自動）',
                      'aria-modal="true" が設定されている（showModal() なら自動）',
                      'aria-labelledby でタイトル要素と紐付けられている',
                      'aria-describedby で説明文と紐付けられている（任意だが推奨）',
                    ],
                  },
                  {
                    category: 'フォーカス管理',
                    items: [
                      'Dialog が開いたときにフォーカスが Dialog 内に移動する',
                      'Tab キーで Dialog 外にフォーカスが出ない（フォーカストラップ）',
                      'Dialog が閉じたときにトリガー要素にフォーカスが戻る',
                    ],
                  },
                  {
                    category: 'キーボード操作',
                    items: [
                      'ESC キーで閉じることができる',
                      'Enter キーでデフォルトアクション（submit）を実行できる',
                      '全ての操作要素に Tab でアクセスできる',
                    ],
                  },
                  {
                    category: 'ビジュアル',
                    items: [
                      'backdrop がメインコンテンツとの区別を明確にしている',
                      '閉じるボタンが見つけやすい位置にある',
                      'フォーカスリングが視認できる（outline を消していない）',
                    ],
                  },
                ].map((group) => (
                  <div key={group.category}>
                    <p className="font-semibold text-foreground text-sm mb-2">{group.category}</p>
                    <div className="space-y-1.5 pl-2">
                      {group.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-4 h-4 mt-0.5 rounded border border-border flex-shrink-0" />
                          <p className="text-sm text-foreground/80">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <CodeBlock
              language="tsx"
              title="アクセシビリティ完備の Dialog コンポーネント"
              showLineNumbers
              code={`import { useRef, useEffect, useCallback } from 'react';

interface AccessibleDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

function AccessibleDialog({
  open,
  onClose,
  title,
  description,
  children,
}: AccessibleDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // 開く前にトリガー要素を記憶
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [open]);

  // showModal / close の制御
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
      // 閉じた後にフォーカスを戻す
      triggerRef.current?.focus();
    }
  }, [open]);

  // cancel イベント（ESC キー）のハンドリング
  const handleCancel = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  }, [onClose]);

  // backdrop クリック（安全な実装）
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  }, [onClose]);

  // id をユニークにする
  const titleId = 'dialog-title';
  const descId = description ? 'dialog-desc' : undefined;

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleClick}
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="dialog-base"
    >
      <div className="dialog-inner">
        <h2 id={titleId}>{title}</h2>
        {description && <p id={descId}>{description}</p>}
        {children}
        <button
          onClick={onClose}
          aria-label="ダイアログを閉じる"
          className="dialog-close"
        >
          X
        </button>
      </div>
    </dialog>
  );
}`}
            />

            <CodePreview
              code={`function AccessibleDialogDemo() {
  const [open, setOpen] = useState(false);
  const [focusLog, setFocusLog] = useState([]);
  const addLog = (msg) => setFocusLog(prev => [...prev.slice(-5), msg]);
  return (
    <div style={{ padding: '20px' }}>
      <button
        id="trigger-btn"
        onClick={() => { setOpen(true); addLog('ダイアログを開きました'); addLog('フォーカスがダイアログ内に移動'); }}
        style={{ padding: '8px 16px', background: 'var(--text-accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
      >
        アクセシブル Dialog を開く
      </button>
      {focusLog.length > 0 && (
        <div style={{ marginTop: '12px', padding: '8px 12px', background: 'var(--bg-muted)', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
          {focusLog.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      )}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-title"
          aria-describedby="a11y-desc"
          onClick={(e) => { if (e.target === e.currentTarget) { addLog('backdrop クリック → 閉じる'); addLog('フォーカスをトリガーに戻す'); setOpen(false); } }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}
        >
          <div style={{ background: 'var(--bg)', borderRadius: '12px', padding: '24px', maxWidth: '460px', width: '90%', color: 'var(--text)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative' }}>
            <button
              onClick={() => { addLog('X ボタン → 閉じる'); addLog('フォーカスをトリガーに戻す'); setOpen(false); }}
              aria-label="ダイアログを閉じる"
              style={{ position: 'absolute', top: '12px', right: '12px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: '4px 8px', borderRadius: '4px' }}
              onFocus={() => addLog('フォーカス: 閉じるボタン')}
            >X</button>
            <h2 id="a11y-title" style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>アクセシブル Dialog</h2>
            <p id="a11y-desc" style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>aria-labelledby, aria-describedby, role="dialog", aria-modal="true" を設定済み。フォーカスログで動作を確認できます。</p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                onFocus={() => addLog('フォーカス: キャンセル')}
                onClick={() => { addLog('キャンセル → 閉じる'); addLog('フォーカスをトリガーに戻す'); setOpen(false); }}
                style={{ padding: '8px 16px', border: '1px solid var(--border)', borderRadius: '6px', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontSize: '14px' }}
              >キャンセル</button>
              <button
                onFocus={() => addLog('フォーカス: 確認')}
                onClick={() => { addLog('確認 → 閉じる'); addLog('フォーカスをトリガーに戻す'); setOpen(false); }}
                style={{ padding: '8px 16px', background: 'var(--text-accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
              >確認</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`}
              language="tsx"
              title="アクセシビリティ対応 Dialog（フォーカス管理デモ）"
            />

            <InfoBox type="success" title="ネイティブ dialog を使うのが最善">
              <p>
                アクセシビリティ対応の観点では、ネイティブ <code>&lt;dialog&gt;</code> +
                <code>showModal()</code> を使うのが最も確実です。
                <code>role="dialog"</code>、<code>aria-modal="true"</code>、フォーカストラップ、
                ESC キーハンドリングがブラウザによって自動的に提供されます。
                ライブラリを使う場合でも、内部で <code>&lt;dialog&gt;</code> を使っているもの
                （Radix UI Dialog など）を選ぶことを推奨します。
              </p>
            </InfoBox>
          </section>

          {/* CodingChallenge 1 */}
          <section>
            <CodingChallenge
              preview={true}
              title="アクセシブルな確認ダイアログ"
              description="以下のコードに、アクセシビリティに必要な属性を追加してください。aria-labelledby, aria-describedby, onCancel ハンドラ、そして閉じるボタンの aria-label を設定してください。"
              initialCode={`function ConfirmDialog({ open, onClose, onConfirm }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={dialogRef}>
      <h2 id="title">削除の確認</h2>
      <p id="desc">本当に削除しますか？</p>
      <button onClick={onClose}>キャンセル</button>
      <button onClick={onConfirm}>削除</button>
      <button onClick={onClose}>X</button>
    </dialog>
  );
}`}
              answer={`function ConfirmDialog({ open, onClose, onConfirm }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="title"
      aria-describedby="desc"
      onCancel={(e) => { e.preventDefault(); onClose(); }}
    >
      <h2 id="title">削除の確認</h2>
      <p id="desc">本当に削除しますか？</p>
      <button onClick={onClose}>キャンセル</button>
      <button onClick={onConfirm}>削除</button>
      <button onClick={onClose} aria-label="ダイアログを閉じる">X</button>
    </dialog>
  );
}`}
              hints={[
                'dialog 要素に aria-labelledby と aria-describedby を追加します。値は対応する要素の id です。',
                'onCancel は ESC キーが押されたときに発火します。e.preventDefault() でブラウザのデフォルト動作を防ぎ、onClose() で React の state を更新します。',
                '「X」だけのボタンにはスクリーンリーダーが読める aria-label を追加しましょう。',
              ]}
              keywords={['aria-labelledby="title"', 'aria-describedby="desc"', 'onCancel', 'aria-label']}
            />
          </section>

          {/* CodingChallenge 2 */}
          <section>
            <CodingChallenge
              title="useDialog カスタム Hook の作成"
              description="Dialog の開閉とフォーカス復帰を管理するカスタム Hook を完成させてください。open 関数でトリガー要素を記憶し、close 関数でフォーカスを戻す処理を実装してください。"
              initialCode={`function useDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  const open = useCallback(() => {
    // TODO: トリガー要素を記憶して state を更新
  }, []);

  const close = useCallback(() => {
    // TODO: state を更新してフォーカスを戻す
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    else if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return { isOpen, open, close, dialogRef };
}`}
              answer={`function useDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  const open = useCallback(() => {
    triggerRef.current = document.activeElement;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    else if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return { isOpen, open, close, dialogRef };
}`}
              hints={[
                'open 関数では document.activeElement で現在フォーカスされている要素（= Dialog を開くボタン）を記憶します。',
                'close 関数では setIsOpen(false) の後に requestAnimationFrame を使ってフォーカスを戻します。',
                'requestAnimationFrame は dialog.close() の完了後にフォーカスを移すために必要です。',
              ]}
              keywords={['document.activeElement', 'triggerRef.current', 'setIsOpen(true)', 'setIsOpen(false)', 'requestAnimationFrame', '.focus()']}
            />
          </section>

          {/* CodingChallenge 3 */}
          <section>
            <CodingChallenge
              preview={true}
              title="backdrop クリックで閉じる安全な実装"
              description="backdrop クリックで Dialog を閉じる処理を実装してください。ただし、ユーザーが Dialog 内のテキストをドラッグ選択した際に誤って閉じないよう、mousedown の位置も考慮する実装にしてください。"
              initialCode={`function SafeBackdropDialog({ open, onClose, children }) {
  const dialogRef = useRef(null);
  const mouseDownTarget = useRef(null);

  // TODO: mousedown でクリック開始位置を記憶

  // TODO: click で mousedown と click の両方が
  //       dialog 要素自体であることを確認して閉じる

  return (
    <dialog ref={dialogRef}>
      <div className="dialog-content">
        {children}
      </div>
    </dialog>
  );
}`}
              answer={`function SafeBackdropDialog({ open, onClose, children }) {
  const dialogRef = useRef(null);
  const mouseDownTarget = useRef(null);

  const handleMouseDown = (e) => {
    mouseDownTarget.current = e.target;
  };

  const handleClick = (e) => {
    if (
      e.target === dialogRef.current &&
      mouseDownTarget.current === dialogRef.current
    ) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div className="dialog-content">
        {children}
      </div>
    </dialog>
  );
}`}
              hints={[
                'onMouseDown イベントで e.target を mouseDownTarget.current に保存します。',
                'onClick イベントで、e.target と mouseDownTarget.current の両方が dialogRef.current（= backdrop 領域）であることを確認します。',
                'これにより、Dialog 内でドラッグ操作を開始して backdrop 上でリリースした場合は閉じなくなります。',
              ]}
              keywords={['onMouseDown', 'mouseDownTarget.current = e.target', 'mouseDownTarget.current === dialogRef.current', 'e.target === dialogRef.current']}
            />
          </section>

          {/* Quiz 3 */}
          <section>
            <Quiz
              question="スクロールロックの実装で overflow: hidden だけでは不十分な理由として正しいものはどれですか？"
              options={[
                { label: 'Firefox でスクロールロックが効かないから' },
                { label: 'スクロールバーが消えてレイアウトがガタつき、iOS Safari では効かないことがあるから', correct: true },
                { label: 'React の仮想 DOM と競合するから' },
                { label: 'dialog 要素の仕様で禁止されているから' },
              ]}
              explanation="overflow: hidden を body に設定するとスクロールバーが消え、その幅の分だけコンテンツがガタつきます。また iOS Safari ではこの方法だけではスクロールが止まらない場合があります。position: fixed と paddingRight の補正を組み合わせた実装が必要です。"
            />
          </section>

          {/* まとめセクション */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">判断フローチャート</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Dialog を使うかどうか迷ったときは、以下の順序で検討してください。
            </p>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-6">
              <div className="space-y-4 text-foreground/80 text-sm">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</span>
                  <p><strong>その情報はインラインで表示できないか？</strong> -- できるなら Dialog は不要。Accordion やインライン展開を使う。</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</span>
                  <p><strong>ページ遷移で解決できないか？</strong> -- 複雑なフォームや長いコンテンツなら別ページの方が適切。</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">3</span>
                  <p><strong>Toast や Snackbar で十分ではないか？</strong> -- 単なる通知なら非同期的な表示で十分。</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">4</span>
                  <p><strong>ユーザーの作業を中断してでも確認が必要か？</strong> -- 破壊的操作やセキュリティ上の理由がある場合のみ Dialog を使う。</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">5</span>
                  <p><strong>ネイティブ dialog 要素を使っているか？</strong> -- div 自作よりも <code>&lt;dialog&gt;</code> + <code>showModal()</code> を優先する。</p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="Dialog 設計のまとめ">
              <ul className="list-disc pl-4 space-y-1">
                <li>Dialog は「割り込み UI」であることを常に意識する</li>
                <li>ネイティブ <code>&lt;dialog&gt;</code> 要素を使えばアクセシビリティ対応の大部分が自動化される</li>
                <li>Dialog を使う前に、インライン展開・ページ遷移・Toast など代替手段を検討する</li>
                <li>使用する場合は、フォーカス管理・ESC キー・backdrop クリック・スクリーンリーダー対応を必ず実装する</li>
                <li>ネストされた Dialog は避け、ステップ型の単一 Dialog にリファクタリングする</li>
                <li>モバイルでは特に Dialog の弊害が大きいことを認識する</li>
              </ul>
            </InfoBox>
          </section>
        </div>

        {/* ReferenceLinks */}
        <section className="mt-12">
          <ReferenceLinks
            links={[
              {
                title: 'MDN - <dialog>: ダイアログ要素',
                url: 'https://developer.mozilla.org/ja/docs/Web/HTML/Element/dialog',
                description: 'HTML dialog 要素の仕様と使い方',
              },
              {
                title: 'WAI-ARIA Authoring Practices - Dialog (Modal)',
                url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
                description: 'W3C によるアクセシブルな Dialog の設計ガイドライン',
              },
              {
                title: 'Radix UI - Dialog',
                url: 'https://www.radix-ui.com/primitives/docs/components/dialog',
                description: 'アクセシビリティ対応済みの React Dialog コンポーネント',
              },
            ]}
          />
        </section>

        <PageNavigation />
      </div>
    </div>
  );
}
