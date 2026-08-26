import { useNavigate } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { CATEGORIES } from '@/data/categories';
import type { ListingIntent, PropertyCategory } from '@/domain/property';
import { quickSearchToParams } from '@/lib/filterSearchSchema';
import type { RawSearchParams } from '@/lib/filterSearchSchema';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { IntentToggle } from './IntentToggle';
import { LocationField } from './LocationField';

interface QuickSearchBarProps {
  className?: string;
}

export function QuickSearchBar({ className }: QuickSearchBarProps) {
  const navigate = useNavigate();
  const [intent, setIntent] = useState<ListingIntent | 'all'>('all');
  const [category, setCategory] = useState<PropertyCategory | ''>('');
  const [location, setLocation] = useState<string | null>(null);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void navigate({
          to: '/nekretnine',
          search: flattenParams(
            quickSearchToParams({
              intent,
              ...(category ? { category } : {}),
              location: location ?? undefined,
              priceMin,
              priceMax,
            }),
          ),
        });
      }}
      className={className}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-3">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
            Vrsta oglasa
          </p>
          <IntentToggle value={intent} onChange={setIntent} />
        </div>
        <div className="lg:col-span-2">
          <label
            htmlFor="brza-kategorija"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500"
          >
            Vrsta nekretnine
          </label>
          <Select
            id="brza-kategorija"
            ariaLabel="Vrsta nekretnine"
            placeholder="Sve vrste"
            options={[
              { value: '', label: 'Sve vrste' },
              ...CATEGORIES.map((c) => ({ value: c.value, label: c.singular })),
            ]}
            value={category}
            onValueChange={(value) => setCategory(value === '' ? '' : (value as PropertyCategory))}
          />
        </div>
        <div className="lg:col-span-3">
          <LocationField id="brza-lokacija" value={location} onChange={setLocation} />
        </div>
        <div className="lg:col-span-2">
          <label
            htmlFor="brza-cena-od"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500"
          >
            Cena (€)
          </label>
          <div className="flex items-center gap-2">
            <input
              id="brza-cena-od"
              inputMode="numeric"
              value={priceMin ?? ''}
              onChange={(event) => setPriceMin(parsePositive(event.target.value))}
              placeholder="Od"
              aria-label="Cena od"
              className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            />
            <span aria-hidden="true" className="text-neutral-500">—</span>
            <input
              inputMode="numeric"
              value={priceMax ?? ''}
              onChange={(event) => setPriceMax(parsePositive(event.target.value))}
              placeholder="Do"
              aria-label="Cena do"
              className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            />
          </div>
        </div>
        <div className="lg:col-span-2">
          <Button type="submit" size="lg" className="w-full">
            <Search className="size-4" aria-hidden="true" />
            Pretraži
          </Button>
        </div>
      </div>
    </form>
  );
}

function parsePositive(raw: string): number | null {
  const cleaned = raw.replace(/[^\d]/g, '');
  if (cleaned.length === 0) return null;
  const parsed = Number.parseInt(cleaned, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function flattenParams(params: RawSearchParams): Record<string, string> {
  const flat: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') flat[key] = value;
    else if (Array.isArray(value)) {
      const first = value[0];
      if (first !== undefined) flat[key] = first;
    }
  }
  return flat;
}
