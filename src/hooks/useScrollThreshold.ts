import { useEffect, useState } from 'react';

export function useScrollThreshold(thresholdPx: number): boolean {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setPassed(window.scrollY > thresholdPx);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [thresholdPx]);

  return passed;
}
