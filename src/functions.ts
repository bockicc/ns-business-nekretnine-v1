import type { FilterState } from '@/domain/filters';
import type { Property } from '@/domain/property';
import {
  queryFeaturedProperties,
  queryProperties,
  queryPropertyBySlug,
  queryRelatedProperties,
} from '@/lib/queryProperties';

export function listPropertiesFn(filters: FilterState) {
  return queryProperties(filters);
}

export function featuredPropertiesFn(limit: number = 6) {
  return queryFeaturedProperties(limit);
}

export function propertyBySlugFn(slug: string) {
  return queryPropertyBySlug(slug);
}

export function relatedPropertiesFn(input: { slug: string; limit?: number }): Promise<Property[]> {
  return queryRelatedProperties(input.slug, input.limit ?? 6);
}
