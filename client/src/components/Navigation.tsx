import { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronDown, Menu, X, Search, Sun, Moon, Columns2, Maximize, Bookmark, Settings, HelpCircle } from 'lucide-react';
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

const manualColors: Record<ManualId, string> = {
  react: 'text-blue-600 dark:text-blue-400',
  git: 'text-orange-600 dark:text-orange-400',
  threejs: 'text-cyan-600 dark:text-cyan-400',
  'claude-mux': 'text-amber-600 dark:text-amber-400',
};

const manualBgColors: Record<ManualId, string> = {
  react: 'bg-blue-600',
  git: 'bg-orange-600',
  threejs: 'bg-cyan-600',
  'claude-mux': 'bg-amber-600',
};

const manualBorderColors: Record<ManualId, string> = {
  react: 'border-blue-500',
  git: 'border-orange-500',
  threejs: 'border-cyan-500',
  'claude-mux': 'border-amber-500',
};

const manualActiveBg: Record<ManualId, string> = {
  react: 'bg-blue-500/15',
  git: 'bg-orange-500/15',
  threejs: 'bg-cyan-500/15',
  'claude-mux': 'bg-amber-500/15',
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { layoutMode, toggleLayout } = useLayout();
  const { bookmarks, toggle: toggleBookmark, isBookmarked } = useBookmarks();
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
      .map((p) => ({ title: p.title, href: p.path })),
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
    // Claude-mux
    basic: '基礎編',
    advanced: '発展編',
  };

  return (
    <>
      {/* モバイルメニューボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-background border border-border hover:bg-muted"
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
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg">M</span>
            </div>
            <span className="font-heading font-bold text-lg text-foreground">統合マニュアル</span>
          </Link>

          {/* マニュアルタブ */}
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {manuals.map((m) => (
              <Link
                key={m.id}
                href={`/${m.id}`}
                onClick={() => setIsOpen(false)}
                className={`px-2.5 py-1.5 rounded-full text-center text-[11px] font-semibold border transition-colors truncate ${
                  activeManualId === m.id
                    ? `${manualBorderColors[m.id]} ${manualActiveBg[m.id]} ${manualColors[m.id]}`
                    : 'border-border text-muted-foreground hover:bg-muted/50'
                }`}
              >
                {m.shortTitle}
              </Link>
            ))}
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
                    <Link key={bPath} href={bPath} onClick={() => setIsOpen(false)} className={`block px-4 py-1.5 text-sm transition-colors ${location === bPath ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'} rounded-lg`}>
                      <span className={`text-[10px] mr-1 ${manualColors[p.manualId]}`}>{p.manualId.toUpperCase()}</span>
                      {p.title}
                    </Link>
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
                {activeManual?.shortTitle} ホーム
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
                                  className={`block px-4 py-2 text-sm transition-colors ${
                                    location === sub.href
                                      ? 'nav-active rounded-r-lg'
                                      : 'rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
                                  }`}
                                >
                                  {sub.title}
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
              {manuals.map((m) => (
                <Link
                  key={m.id}
                  href={`/${m.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg border border-border hover:bg-sidebar-accent transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${manualBgColors[m.id]} flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{m.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.shortTitle}</p>
                      <p className="text-xs text-muted-foreground">{getManualPages(m.id).length}ステップ</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* モバイルオーバーレイ */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}
