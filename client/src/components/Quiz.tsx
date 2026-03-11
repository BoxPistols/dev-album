import { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw } from 'lucide-react';

interface QuizOption {
  label: string;
  correct?: boolean;
}

interface QuizProps {
  question: string;
  options: QuizOption[];
  explanation: string;
}

export default function Quiz({ question, options, explanation }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const isCorrect = selected !== null && options[selected]?.correct;

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setShowResult(true);
  };

  const handleReset = () => {
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 p-6 my-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
          <HelpCircle className="text-white" size={16} />
        </div>
        <span className="text-sm font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
          理解度チェック
        </span>
      </div>

      {/* 質問 */}
      <p className="text-lg font-semibold text-foreground mb-4">{question}</p>

      {/* 選択肢 */}
      <div className="space-y-2 mb-4">
        {options.map((option, i) => {
          let borderClass = 'border-border hover:border-blue-300 dark:hover:border-blue-700';
          let bgClass = 'bg-card hover:bg-blue-50/50 dark:hover:bg-blue-950/30';

          if (selected === i && !showResult) {
            borderClass = 'border-blue-500 dark:border-blue-400';
            bgClass = 'bg-blue-50 dark:bg-blue-950/40';
          }
          if (showResult && option.correct) {
            borderClass = 'border-green-500 dark:border-green-400';
            bgClass = 'bg-green-50 dark:bg-green-950/40';
          }
          if (showResult && selected === i && !option.correct) {
            borderClass = 'border-red-500 dark:border-red-400';
            bgClass = 'bg-red-50 dark:bg-red-950/40';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${borderClass} ${bgClass} ${showResult ? '' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold text-muted-foreground">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm text-foreground">{option.label}</span>
                {showResult && option.correct && (
                  <CheckCircle2 size={18} className="ml-auto text-green-500 flex-shrink-0" />
                )}
                {showResult && selected === i && !option.correct && (
                  <XCircle size={18} className="ml-auto text-red-500 flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 送信 / リセット */}
      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          回答する
        </button>
      ) : (
        <div className="space-y-3">
          {/* 結果 */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isCorrect
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 size={18} />
            ) : (
              <XCircle size={18} />
            )}
            <span className="text-sm font-semibold">
              {isCorrect ? '正解！' : '不正解...'}
            </span>
          </div>

          {/* 解説 */}
          <div className="px-4 py-3 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw size={14} />
            もう一度
          </button>
        </div>
      )}
    </div>
  );
}
