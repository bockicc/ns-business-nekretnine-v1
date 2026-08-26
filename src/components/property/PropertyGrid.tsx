import type { Property } from '@/domain/property';
import { cn } from '@/lib/utils';
import { PropertyCard } from './PropertyCard';

export function PropertyGrid({
  properties,
  className,
}: {
  properties: readonly Property[];
  className?: string;
}) {
  return (
    <div className={cn('grid gap-6 sm:grid-cols-2 xl:grid-cols-3', className)}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
