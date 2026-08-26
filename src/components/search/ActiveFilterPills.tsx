import type { ActiveFilterPill } from '@/domain/filters';
import { X } from 'lucide-react';

export function ActiveFilterPills({
  pills,
  onRemove,
  onResetAll,
}: {
  pills: readonly ActiveFilterPill[];
  onRemove: (key: string) => void;
  onResetAll?: () => void;
}) {
  if (pills.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" aria-live="polite">
      {pills.map((pill) => (
        <button
          key={pill.key}
          type="button"
          onClick={() => onRemove(pill.key)}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary-100 bg-primary-100/60 py-1 pl-3 pr-2 text-xs font-medium text-primary-900 transition-colors hover:border-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          {pill.label}
          <X className="size-3.5" aria-hidden="true" />
          <span className="sr-only">Ukloni filter</span>
        </button>
      ))}
      {onResetAll && pills.length > 1 ? (
        <button
          type="button"
          onClick={onResetAll}
          className="rounded-full px-2 py-1 text-xs font-semibold text-gold-700 underline-offset-2 transition-colors hover:text-gold-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          Očisti sve
        </button>
      ) : null}
    </div>
  );
}
