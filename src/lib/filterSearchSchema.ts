import { AMENITIES } from '@/data/amenities';
import { DEFAULT_FILTER_STATE } from '@/domain/filters';
import type { FilterState } from '@/domain/filters';
import type { HeatingType, ListingIntent, PropertyCategory } from '@/domain/property';

export const SORT_OPTIONS = ['newest', 'price-asc', 'price-desc', 'area-desc', 'price-per-sqm'] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export const INTENT_OPTIONS = ['all', 'sale', 'rent'] as const;
export type IntentParam = (typeof INTENT_OPTIONS)[number];

const CATEGORY_VALUES: PropertyCategory[] = [
  'apartment',
  'house',
  'land',
  'commercial',
  'garage',
];
const HEATING_VALUES: HeatingType[] = ['central', 'gas', 'electric', 'heat-pump', 'wood', 'none'];
const FEATURE_KEYS = AMENITIES.map((a) => a.key);

export type RawSearchParams = Record<string, string | string[] | undefined>;

const toSingle = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

const toCsv = (value: string | string[] | undefined): string[] => {
  const raw = toSingle(value);
  if (!raw) return [];
  return raw
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
};

const toPositiveInt = (value: string | string[] | undefined): number | null => {
  const raw = toSingle(value);
  if (!raw) return null;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

function pickEnum<T extends string>(
  value: string | string[] | undefined,
  allowed: readonly T[],
): T | null {
  const raw = toSingle(value);
  if (!raw) return null;
  return allowed.find((option) => option === raw) ?? null;
}

export function parseFilterSearchParams(search: RawSearchParams): FilterState {
  const intentParam = pickEnum(search.intent, INTENT_OPTIONS) ?? 'all';
  const categories = toCsv(search.category).filter(
    (c): c is PropertyCategory => CATEGORY_VALUES.includes(c as PropertyCategory),
  );
  const heating = toCsv(search.heating).filter(
    (h): h is HeatingType => HEATING_VALUES.includes(h as HeatingType),
  );
  const features: FilterState['features'] = {};
  for (const key of toCsv(search.features)) {
    if ((FEATURE_KEYS as string[]).includes(key)) {
      features[key as keyof FilterState['features']] = true;
    }
  }
  const locationRaw = toSingle(search.location)?.trim();

  return {
    intent: intentParam,
    categories,
    location: locationRaw ? locationRaw : null,
    price: {
      min: toPositiveInt(search.priceMin),
      max: toPositiveInt(search.priceMax),
    },
    area: {
      min: toPositiveInt(search.areaMin),
      max: toPositiveInt(search.areaMax),
    },
    rooms: toPositiveInt(search.rooms),
    heating,
    features,
    sort: pickEnum(search.sort, SORT_OPTIONS) ?? 'newest',
    view: toSingle(search.view) === 'list' ? 'list' : 'grid',
    page: Math.max(1, toPositiveInt(search.page) ?? 1),
    pageSize: DEFAULT_FILTER_STATE.pageSize,
  };
}

export function serializeFilterState(state: FilterState): RawSearchParams {  const params: Record<string, string> = {};
  if (state.intent !== 'all') params.intent = state.intent;
  if (state.categories.length > 0) params.category = state.categories.join(',');
  if (state.location) params.location = state.location;
  if (state.price.min != null) params.priceMin = String(state.price.min);
  if (state.price.max != null) params.priceMax = String(state.price.max);
  if (state.area.min != null) params.areaMin = String(state.area.min);
  if (state.area.max != null) params.areaMax = String(state.area.max);
  if (state.rooms != null) params.rooms = String(state.rooms);
  if (state.heating.length > 0) params.heating = state.heating.join(',');
  const activeFeatures = Object.entries(state.features)
    .filter(([, enabled]) => enabled)
    .map(([key]) => key);
  if (activeFeatures.length > 0) params.features = activeFeatures.join(',');
  if (state.sort !== 'newest') params.sort = state.sort;
  if (state.view !== 'grid') params.view = state.view;
  if (state.page > 1) params.page = String(state.page);
  return params;
}

export function toFlatSearchParams(state: FilterState): Record<string, string> {
  const flat: Record<string, string> = {};
  for (const [key, value] of Object.entries(serializeFilterState(state))) {
    if (typeof value === 'string') flat[key] = value;
    else if (Array.isArray(value)) {
      const first = value[0];
      if (first !== undefined) flat[key] = first;
    }
  }
  return flat;
}

export interface QuickSearchPayload {
  intent: ListingIntent | 'all';
  category?: PropertyCategory;
  location?: string;
  priceMin?: number | null;
  priceMax?: number | null;
}

export function quickSearchToParams(payload: QuickSearchPayload): RawSearchParams {
  const state: FilterState = {
    ...DEFAULT_FILTER_STATE,
    intent: payload.intent,
    categories: payload.category ? [payload.category] : [],
    location: payload.location?.trim() || null,
    price: {
      min: payload.priceMin ?? null,
      max: payload.priceMax ?? null,
    },
  };
  return serializeFilterState(state);
}
