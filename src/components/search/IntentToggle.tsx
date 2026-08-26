import type { ListingIntent } from '@/domain/property';
import { SegmentedToggle } from '@/components/ui/segmented-toggle';

const INTENT_TABS = [
  { value: 'all', label: 'Sve' },
  { value: 'sale', label: 'Prodaja' },
  { value: 'rent', label: 'Izdavanje' },
] as const;

export function IntentToggle({
  value,
  onChange,
  className,
}: {
  value: ListingIntent | 'all';
  onChange: (intent: ListingIntent | 'all') => void;
  className?: string;
}) {
  return (
    <SegmentedToggle
      ariaLabel="Vrsta oglasa"
      options={INTENT_TABS}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
}
