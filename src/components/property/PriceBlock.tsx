import type { ListingIntent, Money } from '@/domain/property';
import { formatPrice, formatPriceCompact } from '@/lib/formatPrice';
import { cn } from '@/lib/utils';

export function PriceBlock({
  price,
  intent,
  compact = false,
  className,
}: {
  price: Money;
  intent?: ListingIntent;
  compact?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'font-display font-semibold text-primary-900',
        compact ? 'text-lg' : 'text-2xl',
        className,
      )}
    >
      <span className="sr-only">Cena: </span>
      {compact ? formatPriceCompact(price) : formatPrice(price, intent)}
    </p>
  );
}
