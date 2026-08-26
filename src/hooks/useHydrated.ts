import { useSyncExternalStore } from 'react';

const emptySubscribe = (): (() => void) => () => {};

export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
