import { GitCompareArrows } from 'lucide-react';
import { useComparison } from '@/hooks/useComparison';
import { cn } from '@/lib/utils';

export function CompareToggle({
  propertyId,
  className,
}: {
  propertyId: string;
  className?: string;
}) {
  const { isSelected, canAdd, toggle, MAX_COMPARE } = useComparison();
  const active = isSelected(propertyId);
  const wouldExceed = !active && !canAdd;

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(propertyId);
      }}
      aria-pressed={active}
      aria-label={
        active
          ? 'Ukloni iz poređenja'
          : wouldExceed
            ? `Maksimalno ${MAX_COMPARE} nekretnine za poređenje`
            : 'Dodaj u poređenje'
      }
      title={
        active
          ? 'Ukloni iz poređenja'
          : wouldExceed
            ? `Maksimalno ${MAX_COMPARE} nekretnine za poređenje`
            : 'Dodaj u poređenje'
      }
      disabled={wouldExceed}
      className={cn(
        'flex size-9 items-center justify-center rounded-md border bg-white/90 backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        active
          ? 'border-primary-600 bg-primary-100 text-primary-700'
          : wouldExceed
            ? 'cursor-not-allowed border-neutral-200 text-neutral-400'
            : 'border-neutral-200 text-neutral-700 hover:border-primary-400 hover:text-primary-900',
        className,
      )}
    >
      <GitCompareArrows className="size-4" aria-hidden="true" />
    </button>
  );
}
