import type { RefObject } from 'react';
import { useEffect } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(containerRef: RefObject<HTMLElement | null>, active: boolean): void {
  useEffect(() => {
    if (!active || typeof document === 'undefined') return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const container = containerRef.current;

    const focusFirst = (): void => {
      if (!container) return;
      const focusable = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      focusable[0]?.focus();
    };

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Tab' || !container) return;
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const escapeListener = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        container?.dispatchEvent(new CustomEvent('focustrap:escape'));
      }
    };

    focusFirst();
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keydown', escapeListener);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keydown', escapeListener);
      previouslyFocused?.focus();
    };
  }, [active, containerRef]);
}
