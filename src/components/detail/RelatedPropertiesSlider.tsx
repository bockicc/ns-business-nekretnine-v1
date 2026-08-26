import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Property } from '@/domain/property';
import { relatedPropertiesQueryOptions } from '@/lib/propertyQueryOptions';
import { PropertyCard } from '@/components/property/PropertyCard';
import { PropertyCardSkeleton } from '@/components/property/PropertyCardSkeleton';

export function RelatedPropertiesSlider({
  slug,
  fallback,
}: {
  slug: string;
  fallback: readonly Property[];
}) {
  const { data, isLoading } = useQuery(relatedPropertiesQueryOptions(slug, 6));
  const trackRef = useRef<HTMLDivElement>(null);

  const properties = data ?? fallback;

  if (!isLoading && properties.length === 0) return null;

  const scrollBy = (direction: -1 | 1): void => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * (track.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="povezano-naslov" className="mt-14">
      <div className="flex items-center justify-between gap-4">
        <h2 id="povezano-naslov" className="font-display text-2xl font-medium text-primary-900">
          Slične nekretnine
        </h2>
        {properties.length > 2 ? (
          <div className="hidden gap-1.5 sm:flex">
            {([-1, 1] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => scrollBy(direction)}
                aria-label={direction === -1 ? 'Listaj unazad' : 'Listaj unapred'}
                className="flex size-9 items-center justify-center rounded-md border border-neutral-300 bg-white text-primary-900 transition-colors hover:border-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                {direction === -1 ? (
                  <ChevronLeft className="size-4" aria-hidden="true" />
                ) : (
                  <ChevronRight className="size-4" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {isLoading ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div
          ref={trackRef}
          className="scrollbar-none mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]"
            />
          ))}
        </div>
      )}
    </section>
  );
}
