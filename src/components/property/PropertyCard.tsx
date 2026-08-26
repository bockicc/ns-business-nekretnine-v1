import { Link } from '@tanstack/react-router';
import { Bath, BedDouble, MapPin, Ruler } from 'lucide-react';
import type { Property } from '@/domain/property';
import { CATEGORY_SINGULAR } from '@/data/categories';
import { formatArea, formatPerSqm } from '@/lib/formatArea';
import { cn } from '@/lib/utils';
import { BookmarkButton } from './BookmarkButton';
import { CompareToggle } from '@/components/comparison/CompareToggle';
import { PriceBlock } from './PriceBlock';
import { StatusBadge } from './StatusBadge';

export function PropertyCard({ property, className }: { property: Property; className?: string }) {
  const cover = property.images.find((image) => image.isCover) ?? property.images[0];

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover',
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <Link
          to="/nekretnine/$slug"
          params={{ slug: property.slug }}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          <img
            src={cover?.url}
            alt={cover?.alt ?? property.title}
            width={cover?.width}
            height={cover?.height}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>
        <div className="absolute left-3 top-3 flex gap-2">
          <StatusBadge status={property.status} />
        </div>
        <div className="absolute right-3 top-3 flex gap-2">
          <BookmarkButton propertyId={property.id} />
          <CompareToggle propertyId={property.id} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-600">
          {CATEGORY_SINGULAR[property.category]} · {property.intent === 'sale' ? 'Prodaja' : 'Izdavanje'}
        </p>
        <h3 className="mt-1.5 font-display text-lg font-medium leading-snug text-primary-900">
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

        <PriceBlock price={property.price} intent={property.intent} className="mt-3" />
        {formatPerSqm(property.areaSqm, property.pricePerSqm, property.intent) ? (
          <p className="mt-0.5 text-xs text-neutral-500">{formatPerSqm(property.areaSqm, property.pricePerSqm, property.intent)}</p>
        ) : null}

        <div className="mt-4 flex items-center gap-4 border-t border-neutral-100 pt-3 text-sm text-neutral-700">
          <span className="flex items-center gap-1.5">
            <Ruler className="size-4 text-neutral-500" aria-hidden="true" />
            {formatArea(property.areaSqm)}
          </span>
          {property.bedrooms != null ? (
            <span className="flex items-center gap-1.5">
              <BedDouble className="size-4 text-neutral-500" aria-hidden="true" />
              {property.bedrooms}
            </span>
          ) : null}
          {property.bathrooms != null ? (
            <span className="flex items-center gap-1.5">
              <Bath className="size-4 text-neutral-500" aria-hidden="true" />
              {property.bathrooms}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
