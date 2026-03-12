/** OS判定（クライアントサイドのみ。SSR時は false） */
export function getIsMac(): boolean {
  if (typeof navigator === 'undefined') return false;
  // navigator.platform は非推奨のため userAgentData を優先
  if ('userAgentData' in navigator && (navigator as any).userAgentData?.platform) {
    return (navigator as any).userAgentData.platform === 'macOS';
  }
  return /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
}

export function modKey(isMac?: boolean): string {
  const mac = isMac ?? getIsMac();
  return mac ? '⌘' : 'Ctrl';
}

export function ctrlKey(isMac?: boolean): string {
  const mac = isMac ?? getIsMac();
  return mac ? '⌃' : 'Ctrl';
}

export function searchShortcutLabel(isMac?: boolean): string {
  return `${modKey(isMac)}+K`;
}

export function navModKey(isMac?: boolean): string {
  return ctrlKey(isMac);
}

export function pageNavLabel(isMac?: boolean, direction: 'next' | 'prev' = 'next'): string {
  const arrow = direction === 'next' ? '↓' : '↑';
  return `${ctrlKey(isMac)}+${arrow}`;
}
