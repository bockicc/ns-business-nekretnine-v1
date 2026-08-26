import { LayoutGrid, List } from 'lucide-react';
import type { FilterState } from '@/domain/filters';
import { SORT_OPTIONS } from '@/lib/filterSearchSchema';
import { cn } from '@/lib/utils';
import { Select } from '@/components/ui/select';

const SORT_LABELS: Record<FilterState['sort'], string> = {
  newest: 'Najnovije',
  'price-asc': 'Cena: niža prema višoj',
  'price-desc': 'Cena: viša prema nižoj',
  'area-desc': 'Kvadratura: najveća',
  'price-per-sqm': 'Cena po m²: najniža',
};

const VIEW_OPTIONS: { value: FilterState['view']; label: string; icon: typeof LayoutGrid }[] = [
  { value: 'grid', label: 'Mrežni prikaz', icon: LayoutGrid },
  { value: 'list', label: 'Listni prikaz', icon: List },
];

export function PropertyToolbar({
  total,
  sort,
  view,
  onSortChange,
  onViewChange,
}: {
  total: number;
  sort: FilterState['sort'];
  view: FilterState['view'];
  onSortChange: (sort: FilterState['sort']) => void;
  onViewChange: (view: FilterState['view']) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p aria-live="polite" className="text-sm text-neutral-700">
        Pronađeno <span className="font-semibold text-primary-900">{total}</span> nekretnina
      </p>
      <div className="flex items-center gap-2">
        <Select
          ariaLabel="Sortiranje rezultata"
          options={SORT_OPTIONS.map((option) => ({ value: option, label: SORT_LABELS[option] }))}
          value={sort}
          onValueChange={(value) => onSortChange(value as FilterState['sort'])}
          className="w-56"
        />
        <div
          role="group"
          aria-label="Prikaz rezultata"
          className="inline-flex rounded-md border border-neutral-300 bg-neutral-100 p-0.5"
        >
          {VIEW_OPTIONS.map((option) => {
            const Icon = option.icon;
            const active = option.value === view;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onViewChange(option.value)}
                aria-label={option.label}
                aria-pressed={active}
                title={option.label}
                className={cn(
                  'flex size-8 items-center justify-center rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  active ? 'bg-white text-primary-900 shadow-card' : 'text-neutral-700 hover:text-primary-900',
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
