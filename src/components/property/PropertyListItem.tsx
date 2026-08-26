import { Link } from '@tanstack/react-router';
import { MapPin } from 'lucide-react';
import type { Property } from '@/domain/property';
import { CATEGORY_SINGULAR } from '@/data/categories';
import { formatArea, formatPerSqm } from '@/lib/formatArea';
import { cn } from '@/lib/utils';
import { BookmarkButton } from './BookmarkButton';
import { CompareToggle } from '@/components/comparison/CompareToggle';
import { PriceBlock } from './PriceBlock';
import { StatusBadge } from './StatusBadge';

export function PropertyListItem({ property, className }: { property: Property; className?: string }) {
  const cover = property.images.find((image) => image.isCover) ?? property.images[0];

  return (
    <article
      className={cn(
        'group flex flex-col gap-4 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-card transition-shadow hover:shadow-card-hover sm:flex-row',
        className,
      )}
    >
      <div className="relative sm:w-64 sm:shrink-0">
        <Link
          to="/nekretnine/$slug"
          params={{ slug: property.slug }}
          className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
        >
          <img
            src={cover?.url}
            alt={cover?.alt ?? property.title}
            width={cover?.width}
            height={cover?.height}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-full sm:aspect-auto"
          />
        </Link>
        <div className="absolute left-3 top-3">
          <StatusBadge status={property.status} />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4 pr-4 sm:py-5 sm:pr-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-600">
              {CATEGORY_SINGULAR[property.category]} · {property.intent === 'sale' ? 'Prodaja' : 'Izdavanje'}
            </p>
            <h3 className="mt-1 font-display text-lg font-medium leading-snug text-primary-900">
              <Link
                to="/nekretnine/$slug"
                params={{ slug: property.slug }}
                className="transition-colors hover:text-primary-600 focus-visible:outline-none"
              >
                {property.title}
              </Link>
            </h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-neutral-700">
              <MapPin className="size-4 shrink-0 text-neutral-500" aria-hidden="true" />
              {property.location.neighborhood
                ? `${property.location.neighborhood}, ${property.location.city}`
                : property.location.city}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <BookmarkButton propertyId={property.id} />
            <CompareToggle propertyId={property.id} />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-700">
          <span>{formatArea(property.areaSqm)}</span>
          {property.rooms != null ? <span>{property.rooms} sobe</span> : null}
          {property.bathrooms != null ? <span>{property.bathrooms} kupatila</span> : null}
        </div>

        <PriceBlock price={property.price} intent={property.intent} compact className="mt-auto pt-3" />
        {formatPerSqm(property.areaSqm, property.pricePerSqm, property.intent) ? (
          <p className="text-xs text-neutral-500">{formatPerSqm(property.areaSqm, property.pricePerSqm, property.intent)}</p>
        ) : null}
      </div>
    </article>
  );
}
