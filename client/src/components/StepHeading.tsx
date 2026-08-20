interface StepHeadingProps {
  /** 手順の番号。1 から始める */
  step: number;
  /** 見出し本文 */
  title: string;
  /** 目次からアンカーで飛ぶための id */
  id?: string;
}

/**
 * 手順ページの見出し。「STEP N」のチップと h2 を組にして、
 * 読み手が現在地と残りの手数を一目で掴めるようにする。
 * 概念の解説セクションには使わず、順番に実行する手順にだけ付ける。
 */
export default function StepHeading({ step, title, id }: StepHeadingProps) {
  return (
    <div className="mb-4">
      <span className="inline-block rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-bold tracking-wider text-primary mb-3">
        STEP {step}
      </span>
      <h2 id={id} className="text-2xl font-bold text-foreground scroll-mt-24">
        {title}
      </h2>
    </div>
  );
}
