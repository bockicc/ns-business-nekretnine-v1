import { PROPERTIES } from '@/data/properties.mock';
import type { FilterState } from '@/domain/filters';
import type { Property } from '@/domain/property';
import { toEur } from './formatPrice';

export interface PropertyQueryResult {
  items: Property[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const isActive = (property: Property): boolean =>
  property.approvedAt != null && property.status !== 'sold' && property.status !== 'rented';

export function isApproved(property: Property): boolean {
  return property.approvedAt != null;
}

function matchesLocation(property: Property, location: string): boolean {
  const needle = location.trim().toLowerCase();
  if (needle.length === 0) return true;
  const { city = '', municipality = '', neighborhood = '' } = property.location;
  return (
    city.toLowerCase().includes(needle) ||
    municipality.toLowerCase().includes(needle) ||
    neighborhood.toLowerCase().includes(needle)
  );
}

function matchesFeatureFilters(property: Property, filters: FilterState): boolean {
  return Object.entries(filters.features).every(([key, enabled]) => {
    if (!enabled) return true;
    return property.features[key as keyof typeof property.features];
  });
}

function sortProperties(items: Property[], sort: FilterState['sort']): Property[] {
  const sorted = [...items];
  switch (sort) {
    case 'price-asc':
      sorted.sort(
        (a, b) => toEur(a.price.amount, a.price.currency) - toEur(b.price.amount, b.price.currency),
      );
      break;
    case 'price-desc':
      sorted.sort(
        (a, b) => toEur(b.price.amount, b.price.currency) - toEur(a.price.amount, a.price.currency),
      );
      break;
    case 'area-desc':
      sorted.sort((a, b) => b.areaSqm - a.areaSqm);
      break;
    case 'price-per-sqm':
      sorted.sort((a, b) => {
        const aVal = a.pricePerSqm ? toEur(a.pricePerSqm.amount, a.pricePerSqm.currency) : Infinity;
        const bVal = b.pricePerSqm ? toEur(b.pricePerSqm.amount, b.pricePerSqm.currency) : Infinity;
        return aVal - bVal;
      });
      break;
    case 'newest':
    default:
      sorted.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
      break;
  }
  return sorted;
}

export function filterProperties(all: readonly Property[], filters: FilterState): Property[] {
  let items = all.filter(isActive);

  if (filters.intent !== 'all') {
    items = items.filter((p) => p.intent === filters.intent);
  }
  if (filters.categories.length > 0) {
    items = items.filter((p) => filters.categories.includes(p.category));
  }
  if (filters.location) {
    items = items.filter((p) => matchesLocation(p, filters.location ?? ''));
  }
  if (filters.price.min != null || filters.price.max != null) {
    items = items.filter((p) => {
      const eur = toEur(p.price.amount, p.price.currency);
      if (filters.price.min != null && eur < filters.price.min) return false;
      if (filters.price.max != null && eur > filters.price.max) return false;
      return true;
    });
  }
  if (filters.area.min != null) {
    items = items.filter((p) => p.areaSqm >= (filters.area.min ?? 0));
  }
  if (filters.area.max != null) {
    items = items.filter((p) => p.areaSqm <= (filters.area.max ?? Number.MAX_SAFE_INTEGER));
  }
  if (filters.rooms != null && filters.rooms > 0) {
    const minRooms = filters.rooms;
    items = items.filter((p) => (p.rooms ?? 0) >= minRooms);
  }
  if (filters.heating.length > 0) {
    items = items.filter((p) => p.heating != null && filters.heating.includes(p.heating));
  }

  return sortProperties(items.filter((p) => matchesFeatureFilters(p, filters)), filters.sort);
}

export async function queryProperties(filters: FilterState): Promise<PropertyQueryResult> {
  await simulateNetworkLatency();
  const filtered = filterProperties(PROPERTIES, filters);
  const total = filtered.length;
  const pageSize = Math.max(1, filters.pageSize);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, filters.page), totalPages);
  const start = (page - 1) * pageSize;
  return {
    items: filtered.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    totalPages,
  };
}

export interface FeaturedQueryResult {
  items: Property[];
}

export async function queryFeaturedProperties(limit = 6): Promise<FeaturedQueryResult> {
  await simulateNetworkLatency();
  const items = [...PROPERTIES]
    .filter((p) => isApproved(p) && p.isFeatured && isActive(p))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
  return { items };
}

export async function queryPropertyBySlug(slug: string): Promise<Property | null> {
  await simulateNetworkLatency();
  return PROPERTIES.find((p) => p.slug === slug && isApproved(p)) ?? null;
}

export async function queryRelatedProperties(slug: string, limit = 6): Promise<Property[]> {
  await simulateNetworkLatency();
  const current = await queryPropertyBySlug(slug);
  if (!current) return [];
  const candidates = PROPERTIES.filter(
    (p) =>
      isApproved(p) &&
      isActive(p) &&
      p.id !== current.id &&
      (p.category === current.category || p.location.city === current.location.city),
  );
  const priceOf = (p: Property) => toEur(p.price.amount, p.price.currency);
  return candidates
    .sort(
      (a, b) =>
        Math.abs(priceOf(a) - priceOf(current)) - Math.abs(priceOf(b) - priceOf(current)) ||
        b.publishedAt.localeCompare(a.publishedAt),
    )
    .slice(0, limit);
}

async function simulateNetworkLatency(ms = 320): Promise<void> {
  if (typeof window === 'undefined') return;
  await new Promise((resolve) => setTimeout(resolve, ms));
}
