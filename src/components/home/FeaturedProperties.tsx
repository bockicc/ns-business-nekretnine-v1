import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { featuredPropertiesQueryOptions } from '@/lib/propertyQueryOptions';
import type { FeaturedQueryResult } from '@/lib/queryProperties';
import { PropertyCardSkeleton } from '@/components/property/PropertyCardSkeleton';
import { PropertyGrid } from '@/components/property/PropertyGrid';

export function FeaturedProperties({
  initialData,
}: {
  initialData?: FeaturedQueryResult;
}) {
  const { data, isLoading } = useQuery({
    ...featuredPropertiesQueryOptions(6),
    ...(initialData ? { initialData } : {}),
  });

  return (
    <section aria-labelledby="istaknuto-naslov" className="bg-neutral-50 py-16 md:py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-600">Istaknuto</p>
            <h2 id="istaknuto-naslov" className="mt-2 font-display text-3xl font-medium text-primary-900 md:text-4xl">
              Aktuelne nekretnine
            </h2>
          </div>
          <Link
            to="/nekretnine"
            className="hidden items-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-primary-900 transition-colors hover:border-primary-400 hover:bg-primary-100/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 sm:inline-flex"
          >
            Sve nekretnine
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8">
          {isLoading || !data ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <PropertyGrid properties={data.items} />
          )}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/nekretnine"
            className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            Sve nekretnine
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
