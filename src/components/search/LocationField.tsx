import { useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';
import { ALL_LOCATIONS } from '@/data/locations';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { cn } from '@/lib/utils';

interface LocationFieldProps {
  value: string | null;
  onChange: (location: string | null) => void;
  id?: string;
  className?: string;
}

export function LocationField({ value, onChange, id = 'lokacija', className }: LocationFieldProps) {
  const [term, setTerm] = useState(value ?? '');
  const debounced = useDebouncedValue(term, 200);

  const suggestions = useMemo(() => {
    const needle = debounced.trim().toLowerCase();
    if (needle.length < 2) return [];
    return ALL_LOCATIONS.filter((location) => location.toLowerCase().includes(needle)).slice(0, 7);
  }, [debounced]);

  const select = (location: string) => {
    setTerm(location);
    onChange(location);
  };

  return (
    <div className={cn('relative', className)}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500"
      >
        Lokacija
      </label>
      <div className="relative">
        <MapPin
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500"
          aria-hidden="true"
        />
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={suggestions.length > 0}
          aria-controls={`${id}-opcije`}
          autoComplete="off"
          value={term}
          onChange={(event) => {
            setTerm(event.target.value);
            if (event.target.value.trim() === '') onChange(null);
          }}
          placeholder="Grad ili naselje"
          className="h-10 w-full rounded-md border border-neutral-300 bg-white pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-500 transition-colors hover:border-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:shadow-focus-ring"
        />
      </div>
      {suggestions.length > 0 ? (
        <ul
          id={`${id}-opcije`}
          role="listbox"
          aria-label="Predlozi lokacija"
          className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-neutral-200 bg-white py-1 shadow-modal"
        >
          {suggestions.map((suggestion) => (
            <li key={suggestion} role="option" aria-selected={suggestion === term}>
              <button
                type="button"
                onClick={() => select(suggestion)}
                className="w-full px-3 py-2 text-left text-sm text-neutral-900 transition-colors hover:bg-primary-100 focus-visible:bg-primary-100 focus-visible:outline-none"
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
