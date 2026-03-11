export function modKey(isMac: boolean): string {
  return isMac ? '⌘' : 'Ctrl';
}

export function ctrlKey(isMac: boolean): string {
  return isMac ? '⌃' : 'Ctrl';
}

export function searchShortcutLabel(isMac: boolean): string {
  return `${modKey(isMac)}+K`;
}

export function navModKey(isMac: boolean): string {
  return ctrlKey(isMac);
}

export function pageNavLabel(isMac: boolean, direction: 'next' | 'prev'): string {
  const arrow = direction === 'next' ? '↓' : '↑';
  return `${ctrlKey(isMac)}+${arrow}`;
}
