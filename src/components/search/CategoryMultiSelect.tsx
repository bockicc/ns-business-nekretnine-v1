import type { PropertyCategory } from '@/domain/property';
import { CATEGORIES } from '@/data/categories';
import { Chip } from '@/components/ui/chip';

export function CategoryMultiSelect({
  selected,
  onToggle,
}: {
  selected: readonly PropertyCategory[];
  onToggle: (category: PropertyCategory) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
        Vrsta nekretnine
      </legend>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Vrsta nekretnine">
        {CATEGORIES.map((category) => (
          <Chip
            key={category.value}
            label={category.label}
            selected={selected.includes(category.value)}
            onClick={() => onToggle(category.value)}
          />
        ))}
      </div>
    </fieldset>
  );
}
