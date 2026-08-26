import { Input } from '@/components/ui/input';

function RangeField({
  label,
  minPlaceholder,
  maxPlaceholder,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: {
  label: string;
  minPlaceholder: string;
  maxPlaceholder: string;
  minValue: number | null;
  maxValue: number | null;
  onMinChange: (value: number | null) => void;
  onMaxChange: (value: number | null) => void;
}) {
  const parse = (raw: string): number | null => {
    const cleaned = raw.replace(/[^\d]/g, '');
    if (cleaned.length === 0) return null;
    const parsed = Number.parseInt(cleaned, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  };

  return (
    <fieldset>
      <legend className="mb-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
        {label}
      </legend>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          inputMode="numeric"
          value={minValue ?? ''}
          onChange={(event) => onMinChange(parse(event.target.value))}
          placeholder={minPlaceholder}
          aria-label={`${label} — od`}
          className="w-full"
        />
        <span aria-hidden="true" className="shrink-0 text-neutral-500">—</span>
        <Input
          type="text"
          inputMode="numeric"
          value={maxValue ?? ''}
          onChange={(event) => onMaxChange(parse(event.target.value))}
          placeholder={maxPlaceholder}
          aria-label={`${label} — do`}
          className="w-full"
        />
      </div>
    </fieldset>
  );
}

export function PriceRangeField({
  price,
  onChange,
}: {
  price: { min: number | null; max: number | null };
  onChange: (price: { min: number | null; max: number | null }) => void;
}) {
  return (
    <RangeField
      label="Cena (€)"
      minPlaceholder="Od"
      maxPlaceholder="Do"
      minValue={price.min}
      maxValue={price.max}
      onMinChange={(min) => onChange({ ...price, min })}
      onMaxChange={(max) => onChange({ ...price, max })}
    />
  );
}

export function AreaRangeField({
  area,
  onChange,
}: {
  area: { min: number | null; max: number | null };
  onChange: (area: { min: number | null; max: number | null }) => void;
}) {
  return (
    <RangeField
      label="Kvadratura (m²)"
      minPlaceholder="Od"
      maxPlaceholder="Do"
      minValue={area.min}
      maxValue={area.max}
      onMinChange={(min) => onChange({ ...area, min })}
      onMaxChange={(max) => onChange({ ...area, max })}
    />
  );
}
