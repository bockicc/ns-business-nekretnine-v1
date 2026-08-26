import type { AmenityKey } from '@/data/amenities';
import { AMENITIES } from '@/data/amenities';
import { Chip } from '@/components/ui/chip';

export function AmenityChips({
  selected,
  onToggle,
}: {
  selected: Partial<Record<AmenityKey, boolean>>;
  onToggle: (key: AmenityKey) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
        Oprema i karakteristike
      </legend>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Oprema i karakteristike">
        {AMENITIES.map((amenity) => (
          <Chip
            key={amenity.key}
            label={amenity.label}
            selected={Boolean(selected[amenity.key])}
            onClick={() => onToggle(amenity.key)}
          />
        ))}
      </div>
    </fieldset>
  );
}
