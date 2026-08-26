import type { PropertyStatus } from '@/domain/property';
import { STATUS_LABEL } from '@/data/amenities';
import { Badge } from '@/components/ui/badge';

const STATUS_TONE: Record<PropertyStatus, 'sale' | 'rent' | 'pending' | 'closed' | 'new'> = {
  new: 'new',
  'for-sale': 'sale',
  'for-rent': 'rent',
  pending: 'pending',
  sold: 'closed',
  rented: 'closed',
};

export function StatusBadge({ status }: { status: PropertyStatus }) {
  return <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>;
}
