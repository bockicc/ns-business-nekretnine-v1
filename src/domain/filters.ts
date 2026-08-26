import type { HeatingType, ListingIntent, PropertyCategory } from './property';
import type { PropertyFeatureFlags } from './property';

export interface PriceRange {
  min: number | null;
  max: number | null;
}

export interface AreaRange {
  min: number | null;
  max: number | null;
}

export interface FilterState {
  intent: ListingIntent | 'all';
  categories: PropertyCategory[];
  location: string | null;
  price: PriceRange;
  area: AreaRange;
  rooms: number | null;
  heating: HeatingType[];
  features: Partial<Record<keyof PropertyFeatureFlags, boolean>>;
  sort: 'newest' | 'price-asc' | 'price-desc' | 'area-desc' | 'price-per-sqm';
  view: 'grid' | 'list';
  page: number;
  pageSize: number;
}

export const DEFAULT_FILTER_STATE: FilterState = {
  intent: 'all',
  categories: [],
  location: null,
  price: { min: null, max: null },
  area: { min: null, max: null },
  rooms: null,
  heating: [],
  features: {},
  sort: 'newest',
  view: 'grid',
  page: 1,
  pageSize: 12,
};

export interface ActiveFilterPill {
  key: string;
  label: string;
}
