import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'ns-nekretnine:bookmarks';

function readStoredIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === 'string'));
  } catch {
    return new Set();
  }
}

export function useBookmarks(): {
  ids: ReadonlySet<string>;
  toggle: (propertyId: string) => void;
  isBookmarked: (propertyId: string) => boolean;
} {
  const [ids, setIds] = useState<ReadonlySet<string>>(() => readStoredIds());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
    } catch {
      return;
    }
  }, [ids]);

  const toggle = useCallback((propertyId: string): void => {
    setIds((previous) => {
      const next = new Set(previous);
      if (next.has(propertyId)) next.delete(propertyId);
      else next.add(propertyId);
      return next;
    });
  }, []);

  const isBookmarked = useCallback((propertyId: string): boolean => ids.has(propertyId), [ids]);

  return { ids, toggle, isBookmarked };
}
