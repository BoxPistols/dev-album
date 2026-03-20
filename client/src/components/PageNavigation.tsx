import { useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  getNextPage,
  getPreviousPage,
  getPageByPath,
  getManualPages,
} from "@/lib/navigation";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useProgress } from "@/hooks/useProgress";
import { useStreak } from "@/hooks/useStreak";
import { checkAchievements } from "@/hooks/useAchievements";
import { showAchievementToast } from "./AchievementToast";
import PageNotes from "./PageNotes";

export default function PageNavigation() {
  const [location] = useLocation();
  const currentPage = getPageByPath(location);
  const prevPage = getPreviousPage(location);
  const nextPage = getNextPage(location);
  const totalSteps = currentPage
    ? getManualPages(currentPage.manualId).length
    : 0;
  const { isBookmarked, toggle: toggleBookmark } = useBookmarks();
  const { isCompleted, toggleCompleted } = useProgress();
  const { recordActivity } = useStreak();

  const bookmarked = isBookmarked(location);
  const completed = isCompleted(location);

  // 完了セレブレーション表示
  const [showCelebration, setShowCelebration] = useState(false);

  const handleToggleComplete = useCallback(() => {
    const wasCompleted = completed;
    toggleCompleted(location);

    if (!wasCompleted) {
      // 新規完了時: セレブレーション + ストリーク記録 + 実績チェック
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1500);

      recordActivity();

      // 少し遅延して実績チェック（localStorage 更新後）
      setTimeout(() => {
        const newlyUnlocked = checkAchievements();
        for (const achievement of newlyUnlocked) {
          showAchievementToast(achievement);
        }
      }, 100);
    }
  }, [completed, location, toggleCompleted, recordActivity]);

  return (
    <div className="mt-16 pt-8 border-t border-border">
      {/* 完了 & ブックマーク */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative">
          <button
            onClick={handleToggleComplete}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              completed
                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-500 shadow-sm shadow-emerald-500/20"
                : "bg-primary text-primary-foreground hover:opacity-90 border-2 border-transparent shadow-lg shadow-primary/10"
            }`}
          >
            {completed ? (
              <CheckCircle2 size={18} />
            ) : (
              <div className="w-[18px] h-[18px] rounded-full border-2 border-current/30" />
            )}
            {completed ? "ステップ完了済" : "このステップを完了にする"}
          </button>

          {/* 完了セレブレーション */}
          {showCelebration && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <CheckCircle2
                size={24}
                className="text-emerald-500 completion-check"
              />
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 completion-text whitespace-nowrap mt-0.5">
                完了!
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => toggleBookmark(location)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all border ${
            bookmarked
              ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700"
              : "bg-muted/30 text-muted-foreground hover:bg-muted border-border"
          }`}
        >
          {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          {bookmarked ? "ブックマーク中" : "ブックマーク"}
        </button>
      </div>

      <PageNotes path={location} />

      {/* プログレスバー */}
      {currentPage && (
        <div className="mb-8 p-4 rounded-2xl bg-muted/30 border border-border">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                Progress
              </p>
              <h4 className="text-sm font-bold text-foreground">
                STEP {currentPage.step}{" "}
                <span className="text-muted-foreground font-normal">
                  / {totalSteps}
                </span>
              </h4>
            </div>
            <p className="text-sm font-black text-primary">
              {Math.round((currentPage.step / totalSteps) * 100)}%
            </p>
          </div>
          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(var(--primary),0.3)]"
              style={{ width: `${(currentPage.step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* 前後ナビゲーション */}
      <div className="flex justify-between gap-4">
        {prevPage ? (
          <Link
            href={prevPage.path}
            className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group flex-1 max-w-[48%]"
          >
            <ChevronLeft
              size={24}
              className="text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all flex-shrink-0"
            />
            <div className="text-left min-w-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-0.5">
                PREVIOUS
              </p>
              <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                {prevPage.title}
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextPage ? (
          <Link
            href={nextPage.path}
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all group flex-1 max-w-[48%] justify-end text-right ${
              completed
                ? "border-primary/30 bg-primary/5 shadow-md shadow-primary/5"
                : "border-border hover:border-primary/30 hover:bg-primary/5"
            }`}
          >
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-0.5">
                NEXT STEP
              </p>
              <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                {nextPage.title}
              </p>
            </div>
            <ChevronRight
              size={24}
              className={`group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ${completed ? "text-primary" : "text-muted-foreground"}`}
            />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
}
