import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

const MAX_COMPARE = 3;
const STORAGE_KEY = 'ns-nekretnine:compare';

function readStoredIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === 'string').slice(0, MAX_COMPARE);
  } catch {
    return [];
  }
}

interface CompareContextValue {
  ids: readonly string[];
  count: number;
  isSelected: (id: string) => boolean;
  canAdd: boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  MAX_COMPARE: number;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => readStoredIds());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /*noop*/
    }
  }, [ids]);

  const isSelected = useCallback((id: string) => ids.includes(id), [ids]);

  const add = useCallback((id: string) => {
    setIds((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const toggle = useCallback(
    (id: string) => {
      if (ids.includes(id)) remove(id);
      else add(id);
    },
    [ids, add, remove],
  );

  const clear = useCallback(() => setIds([]), []);

  const value = useMemo<CompareContextValue>(
    () => ({
      ids,
      count: ids.length,
      isSelected,
      canAdd: ids.length < MAX_COMPARE,
      add,
      remove,
      toggle,
      clear,
      MAX_COMPARE,
    }),
    [ids, isSelected, add, remove, toggle, clear],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useComparison(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useComparison must be used within CompareProvider');
  return ctx;
}
