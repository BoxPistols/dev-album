import { getPageByPath } from "./navigation";

export interface PageContext {
  path: string;
  title: string | null;
  manualId: string | null;
  sectionId: string | null;
}

export function getPageContext(path: string): PageContext {
  const page = getPageByPath(path);
  return {
    path,
    title: page?.title ?? null,
    manualId: page?.manualId ?? null,
    sectionId: page?.sectionId ?? null,
  };
}
