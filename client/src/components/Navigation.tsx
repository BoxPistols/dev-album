import { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronDown, Menu, X, Search, Sun, Moon, Columns2, Maximize, Bookmark, Settings, HelpCircle, CheckCircle2, Dumbbell } from 'lucide-react';
import {
  pages, sections, manuals,
  getPageByPath, getSectionPages, getManualPages, getManualSections, getManualIdFromPath,
  type ManualId, type ManualInfo,
} from '@/lib/navigation';
import { searchIndex } from '@/lib/searchIndex';
import { toSlug } from '@/hooks/useAutoHeadingIds';
import { useTheme } from '@/contexts/ThemeContext';
import { useLayout } from '@/contexts/LayoutContext';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useProgress } from '@/hooks/useProgress';

const manualColors: Record<ManualId, string> = {
  react: 'text-indigo-600 dark:text-indigo-300',
  git: 'text-rose-600 dark:text-rose-300',
  threejs: 'text-teal-600 dark:text-teal-300',
  'claude-mux': 'text-violet-600 dark:text-violet-300',
};

const manualBgColors: Record<ManualId, string> = {
  react: 'bg-indigo-500',
  git: 'bg-rose-500',
  threejs: 'bg-teal-500',
  'claude-mux': 'bg-violet-500',
};

const manualBorderColors: Record<ManualId, string> = {
  react: 'border-indigo-400',
  git: 'border-rose-400',
  threejs: 'border-teal-400',
  'claude-mux': 'border-violet-400',
};

const manualActiveBg: Record<ManualId, string> = {
  react: 'bg-indigo-400/15',
  git: 'bg-rose-400/15',
  threejs: 'bg-teal-400/15',
  'claude-mux': 'bg-violet-400/15',
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { layoutMode, toggleLayout } = useLayout();
  const { bookmarks, toggle: toggleBookmark, isBookmarked } = useBookmarks();
  const { isCompleted, getProgressStats } = useProgress();
  const [location] = useLocation();

  const currentPage = useMemo(() => getPageByPath(location), [location]);
  const activeManualId = useMemo(() => getManualIdFromPath(location), [location]);

  useEffect(() => {
    if (currentPage) {
      setExpandedSection(currentPage.sectionId);
    }
  }, [currentPage]);

  useEffect(() => {
    function handleFocusSearch() {
      setIsOpen(true);
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
    document.addEventListener('focus-search', handleFocusSearch);
    return () => document.removeEventListener('focus-search', handleFocusSearch);
  }, []);

  const searchResults = searchQuery.trim()
    ? pages.flatMap((p) => {
        const q = searchQuery.toLowerCase();
        const titleMatch = p.title.toLowerCase().includes(q);
        const keywords = searchIndex[p.path] ?? [];
        const matchedKeywords = keywords.filter((kw) => kw.toLowerCase().includes(q));
        if (!titleMatch && matchedKeywords.length === 0) return [];
        return [{ ...p, matchedKeywords }];
      })
    : [];

  const hasSearch = searchQuery.trim().length > 0;

  // 現在のマニュアルのセクション & ページ
  const activeSections = activeManualId ? getManualSections(activeManualId) : [];
  const activeManual = manuals.find((m) => m.id === activeManualId);

  const navSections = activeSections.map((s) => ({
    ...s,
    subsections: getSectionPages(s.id)
      .filter((p) => p.path !== `/${activeManualId}`)
      .map((p) => ({ title: p.title, href: p.path, isCompleted: isCompleted(p.path) })),
  }));

  // パートごとにグループ化
  const partGroups = navSections.reduce<Record<string, typeof navSections>>((acc, s) => {
    const part = s.part || '_default';
    if (!acc[part]) acc[part] = [];
    acc[part].push(s);
    return acc;
  }, {});

  const partLabels: Record<string, string> = {
    // React
    react: '第1部: React + Vite',
    nextjs: '第2部: Next.js',
    storybook: '第3部: Storybook',
    architecture: '第4部: アーキテクチャ',
    quality: '第5部: 品質と倫理',
    // Claude-mux
    basic: '基礎編',
    advanced: '発展編',
  };

  return (
    <>
      {/* モバイルメニューボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-background border border-border hover:bg-muted shadow-sm"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* サイドバー */}
      <nav
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar glass-sidebar border-r border-sidebar-border overflow-y-auto transition-transform duration-300 z-40 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* ロゴ & マニュアル切替 */}
          <Link href="/" className="flex items-center gap-2 mb-4 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-primary-foreground font-heading font-bold text-sm">DA</span>
            </div>
            <span className="font-heading font-bold text-lg text-foreground">Dev Album</span>
          </Link>

          {/* マニュアルタブ + プログレス */}
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {manuals.map((m) => {
              const { percentage } = getProgressStats(getManualPages(m.id).map(p => p.path));
              const isActive = activeManualId === m.id;
              return (
                <Link
                  key={m.id}
                  href={`/${m.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`relative px-2.5 py-1.5 rounded-xl text-center text-[10.5px] font-bold border transition-all overflow-hidden truncate ${
                    isActive
                      ? `${manualBorderColors[m.id]} ${manualActiveBg[m.id]} ${manualColors[m.id]} ring-2 ring-primary/5`
                      : 'border-border text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  <span className="relative z-10">{m.shortTitle}</span>
                  {/* 小さなプログレスバー */}
                  <div className="absolute bottom-0 left-0 h-0.5 bg-muted w-full">
                    <div 
                      className={`h-full ${manualBgColors[m.id]} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* 検索 */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="全マニュアルを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* ツールバー */}
          <div className="flex gap-1.5 mb-4">
            <button onClick={toggleTheme} className="flex-1 flex items-center justify-center gap-1 px-2 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors" title={theme === 'dark' ? 'ライトモード' : 'ダークモード'}>
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button onClick={toggleLayout} className="flex-1 flex items-center justify-center gap-1 px-2 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors" title={layoutMode === 'normal' ? 'ワイドモード' : '通常モード'}>
              {layoutMode === 'normal' ? <Maximize size={15} /> : <Columns2 size={15} />}
            </button>
            <button onClick={() => document.dispatchEvent(new CustomEvent('open-settings'))} className="flex-1 flex items-center justify-center px-2 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors" title="設定">
              <Settings size={15} />
            </button>
            <Link href="/training" onClick={() => setIsOpen(false)} className="flex-1 flex items-center justify-center px-2 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors" title="UI トレーニング">
              <Dumbbell size={15} />
            </Link>
            <button onClick={() => document.dispatchEvent(new CustomEvent('open-help'))} className="flex-1 flex items-center justify-center px-2 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors" title="ヘルプ">
              <HelpCircle size={15} />
            </button>
          </div>

          {/* ブックマーク */}
          {!hasSearch && bookmarks.length > 0 && (
            <div className="mb-3 pb-3 border-b border-sidebar-border">
              <p className="px-4 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Bookmark size={12} />
                ブックマーク
              </p>
              <div className="max-h-40 overflow-y-auto">
                {bookmarks.map((bPath) => {
                  const p = getPageByPath(bPath);
                  if (!p) return null;
                  return (
                    <div key={bPath} className="group flex items-center">
                      <Link href={bPath} onClick={() => setIsOpen(false)} className={`flex-1 min-w-0 px-4 py-1.5 text-sm transition-colors ${location === bPath ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'} rounded-lg truncate`}>
                        <span className={`text-[10px] mr-1 ${manualColors[p.manualId]}`}>{p.manualId.toUpperCase()}</span>
                        {p.title}
                      </Link>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleBookmark(bPath); }}
                        className="flex-shrink-0 p-1 mr-2 rounded opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all"
                        title="ブックマーク解除"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 検索結果 */}
          {hasSearch ? (
            <div className="space-y-0.5">
              <p className="px-4 py-1 text-xs font-semibold text-muted-foreground">検索結果 ({searchResults.length}件)</p>
              {searchResults.length === 0 ? (
                <p className="px-4 py-2 text-sm text-muted-foreground">該当するページがありません</p>
              ) : (
                searchResults.map((page) => (
                  <div key={page.path}>
                    <Link
                      href={page.matchedKeywords.length > 0 ? `${page.path}#${toSlug(page.matchedKeywords[0])}` : page.path}
                      onClick={() => { setIsOpen(false); setSearchQuery(''); }}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
                    >
                      <span className={`text-xs font-semibold mr-1.5 ${manualColors[page.manualId]}`}>
                        {page.manualId.toUpperCase()} {page.step}
                      </span>
                      {page.title}
                    </Link>
                  </div>
                ))
              )}
            </div>
          ) : activeManualId ? (
            /* セクションナビ */
            <div className="space-y-1">
              {/* マニュアルのホームリンク */}
              <Link
                href={`/${activeManualId}`}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  location === `/${activeManualId}` ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-sidebar-accent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{activeManual?.shortTitle} ホーム</span>
                  {isCompleted(`/${activeManualId}`) && <CheckCircle2 size={14} className="text-emerald-500" />}
                </div>
              </Link>

              {Object.entries(partGroups).map(([part, secs]) => (
                <div key={part}>
                  {part !== '_default' && partLabels[part] && (
                    <p className={`px-4 pt-3 pb-1 text-xs font-bold uppercase tracking-wider ${manualColors[activeManualId]}`}>
                      {partLabels[part]}
                    </p>
                  )}
                  {secs.map((section) => (
                    <div key={section.id}>
                      {section.subsections.length > 0 && (
                        <>
                          <button
                            onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                            className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-foreground hover:bg-sidebar-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <span className="text-sm">{section.title}</span>
                            <ChevronDown size={18} className={`transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`} />
                          </button>
                          {expandedSection === section.id && (
                            <div className="ml-2 mt-1 space-y-1 border-l-2 border-sidebar-border">
                              {section.subsections.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`block px-4 py-2 text-sm transition-all ${
                                    location === sub.href
                                      ? 'nav-active rounded-r-lg'
                                      : 'rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="truncate">{sub.title}</span>
                                    {sub.isCompleted && (
                                      <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0 ml-2" />
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            /* ランディング: マニュアル一覧 */
            <div className="space-y-2">
              {manuals.map((m) => {
                const { percentage } = getProgressStats(getManualPages(m.id).map(p => p.path));
                return (
                  <Link
                    key={m.id}
                    href={`/${m.id}`}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-lg border border-border hover:bg-sidebar-accent transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg ${manualBgColors[m.id]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <span className="text-white font-bold text-sm">{m.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{m.shortTitle}</p>
                        <div className="flex items-center justify-between mt-0.5">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{getManualPages(m.id).length}ステップ</p>
                          <p className={`text-[10px] font-bold ${manualColors[m.id]}`}>{percentage}%</p>
                        </div>
                      </div>
                    </div>
                    {/* 進捗バー */}
                    <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${manualBgColors[m.id]} transition-all duration-700`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* UI トレーニング */}
          <div className="mt-4 pt-4 border-t border-sidebar-border">
            <Link
              href="/training"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                location === '/training'
                  ? 'text-primary font-medium bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Dumbbell size={14} />
              UI トレーニング
            </Link>
            {location.hostname === 'localhost' || location.hostname === '127.0.0.1' ? (
              <Link
                href="/dev/components"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                UI カタログ (dev)
              </Link>
            ) : null}
          </div>
        </div>
      </nav>

      {/* モバイルオーバーレイ */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}
