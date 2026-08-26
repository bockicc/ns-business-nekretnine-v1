import { useEffect, useRef, useState } from 'react';

interface CountUpOptions {
  durationMs?: number;
  startDelayMs?: number;
}

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export function useIntersectionCountUp(
  target: number,
  { durationMs = 1200, startDelayMs = 0 }: CountUpOptions = {},
): { ref: React.RefObject<HTMLSpanElement | null>; display: number } {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setDisplay(target);
      return;
    }

    let rafId = 0;

    const startAnimation = (): void => {
      if (startedRef.current) return;
      startedRef.current = true;

      const startTime = performance.now() + startDelayMs;
      const tick = (now: number): void => {
        const elapsed = now - startTime;
        if (elapsed < 0) {
          rafId = requestAnimationFrame(tick);
          return;
        }
        const progress = Math.min(1, elapsed / durationMs);
        setDisplay(Math.round(easeOutCubic(progress) * target));
        if (progress < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    const rect = node.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight && rect.bottom > 0;

    if (alreadyVisible) {
      startAnimation();
      return () => cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);

    const fallbackId = setTimeout(() => {
      if (!startedRef.current) {
        observer.disconnect();
        setDisplay(target);
      }
    }, 3000);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      clearTimeout(fallbackId);
    };
  }, [target, durationMs, startDelayMs]);

  return { ref, display };
}
