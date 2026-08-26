import { AMENITIES, HEATING_LABEL } from '@/data/amenities';
import { CATEGORIES } from '@/data/categories';
import type { ActiveFilterPill, FilterState } from '@/domain/filters';
import type { AmenityKey } from '@/data/amenities';
import { formatArea } from './formatArea';

const AMENITY_LABEL: Record<AmenityKey, string> = Object.fromEntries(
  AMENITIES.map((a) => [a.key, a.label]),
) as Record<AmenityKey, string>;

const formatEurShort = (value: number): string =>
  `${new Intl.NumberFormat('sr-RS', { maximumFractionDigits: 0 }).format(value)} €`;

export function buildFilterPills(state: FilterState): ActiveFilterPill[] {
  const pills: ActiveFilterPill[] = [];

  if (state.intent === 'sale') pills.push({ key: 'intent', label: 'Prodaja' });
  if (state.intent === 'rent') pills.push({ key: 'intent', label: 'Izdavanje' });

  for (const category of state.categories) {
    const meta = CATEGORIES.find((c) => c.value === category);
    if (meta) pills.push({ key: `category.${category}`, label: meta.label });
  }

  if (state.location) {
    pills.push({ key: 'location', label: state.location });
  }

  if (state.price.min != null) {
    pills.push({ key: 'price.min', label: `Od ${formatEurShort(state.price.min)}` });
  }
  if (state.price.max != null) {
    pills.push({ key: 'price.max', label: `Do ${formatEurShort(state.price.max)}` });
  }

  if (state.area.min != null) {
    pills.push({ key: 'area.min', label: `Od ${formatArea(state.area.min)}` });
  }
  if (state.area.max != null) {
    pills.push({ key: 'area.max', label: `Do ${formatArea(state.area.max)}` });
  }

  if (state.rooms != null && state.rooms > 0) {
    pills.push({ key: 'rooms', label: `${state.rooms}+ sobe` });
  }

  for (const heating of state.heating) {
    pills.push({ key: `heating.${heating}`, label: HEATING_LABEL[heating] });
  }

  for (const amenity of AMENITIES) {
    if (state.features[amenity.key]) {
      pills.push({ key: `features.${amenity.key}`, label: AMENITY_LABEL[amenity.key] });
    }
  }

  return pills;
}

export function countActiveFilters(state: FilterState): number {
  let count = buildFilterPills(state).length;
  if (state.sort !== 'newest') count += 1;
  return count;
}
