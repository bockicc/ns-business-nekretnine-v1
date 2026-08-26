import { useMemo } from 'react';
import { Trash2, X } from 'lucide-react';
import type { Property } from '@/domain/property';
import { PROPERTIES } from '@/data/properties.mock';
import { useComparison } from '@/hooks/useComparison';
import { formatPriceCompact } from '@/lib/formatPrice';
import { cn } from '@/lib/utils';

export function CompareDrawer() {
  const { ids, count, remove, clear } = useComparison();

  const selectedProperties = useMemo(
    () => ids.map((id) => PROPERTIES.find((p) => p.id === id)).filter(Boolean) as Property[],
    [ids],
  );

  if (count === 0) return null;

  return (
    <div
      role="region"
      aria-label="Poređenje nekretnina"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white shadow-sticky-nav animate-slide-up"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3 md:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-600">
            Poređenje ({count}/3)
          </p>
          <div className="mt-2 flex gap-3 overflow-x-auto pb-1">
            {selectedProperties.map((property) => (
              <div
                key={property.id}
                className="flex shrink-0 items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2"
              >
                <img
                  src={property.images[0]?.url}
                  alt=""
                  className="size-10 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <p className="max-w-[10rem] truncate text-sm font-medium text-primary-900">
                    {property.title}
                  </p>
                  <p className="text-xs text-neutral-600">
                    {formatPriceCompact(property.price)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(property.id)}
                  aria-label={`Ukloni ${property.title} iz poređenja`}
                  className="ml-1 shrink-0 rounded p-1 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={clear}
            aria-label="Obriši sve iz poređenja"
            className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-primary-900 transition-colors hover:border-neutral-400 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <Trash2 className="mr-1 inline size-3.5" aria-hidden="true" />
            Obriši
          </button>
          <a
            href="/poredjenje"
            aria-disabled={count < 2}
            tabIndex={count < 2 ? -1 : undefined}
            className={cn(
              'rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              count >= 2
                ? 'bg-primary-900 text-white hover:bg-primary-800'
                : 'cursor-not-allowed bg-neutral-200 text-neutral-500',
            )}
          >
            Uporedi
          </a>
        </div>
      </div>
    </div>
  );
}
