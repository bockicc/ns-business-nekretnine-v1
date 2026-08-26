import { ArrowUp } from 'lucide-react';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';
import { cn } from '@/lib/utils';

export function BackToTop() {
  const visible = useScrollThreshold(480);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Nazad na vrh stranice"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        'fixed bottom-5 right-5 z-30 flex size-11 items-center justify-center rounded-md bg-primary-900 text-white shadow-card-hover transition-all duration-200 hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        visible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
