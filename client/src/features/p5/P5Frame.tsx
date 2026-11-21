import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import { buildP5PreviewHtml, p5IframeAttributes } from '@/lib/preview';
import { useNearViewport } from '@/hooks/useNearViewport';

interface P5FrameProps {
  /** p5.jsのスケッチ（グローバルモード） */
  code: string;
  isDark: boolean;
  /** iframeのtitle。どの作品の枠かを言葉で伝える */
  title: string;
  className?: string;
  style?: CSSProperties;
  /** スケッチが最初の1フレームを描けたときに呼ばれる */
  onAlive?: () => void;
}

/**
 * p5.jsのスケッチを動かすiframe。CodePreview・CodingChallenge・SketchFrameが共通で使う。
 *
 * - 画面に近づくまでiframeを作らない。srcdocのiframeにはloading="lazy"が効かず、
 *   1ページに10個近くあるスケッチが読み込み直後に全部起動していた
 * - 属性（sandbox・allow）はスケッチの内容から決める（p5IframeAttributes）
 * - 枠の中のスケッチが最初の1フレームを描けたら、onAliveで知らせる
 */
export default function P5Frame({ code, isDark, title, className, style, onAlive }: P5FrameProps) {
  const holder = useRef<HTMLDivElement>(null);
  const iframe = useRef<HTMLIFrameElement>(null);
  const near = useNearViewport(holder);
  const html = useMemo(() => buildP5PreviewHtml(code, isDark), [code, isDark]);
  const attributes = useMemo(() => p5IframeAttributes(code), [code]);

  // 枠から届く「最初の1フレームを描けた」通知。ほかの枠の通知と取り違えないよう、送り主で見分ける
  const onAliveRef = useRef(onAlive);
  onAliveRef.current = onAlive;
  useEffect(() => {
    const handle = (event: MessageEvent) => {
      if (event.source !== iframe.current?.contentWindow) return;
      if ((event.data as { type?: string } | null)?.type === 'p5-preview-alive') onAliveRef.current?.();
    };
    window.addEventListener('message', handle);
    return () => window.removeEventListener('message', handle);
  }, []);

  return (
    <div ref={holder} className={className} style={style}>
      {near && (
        <iframe
          ref={iframe}
          srcDoc={html}
          {...attributes}
          title={title}
          className="w-full h-full border-0 block"
        />
      )}
    </div>
  );
}
