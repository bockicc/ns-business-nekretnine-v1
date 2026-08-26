import { queryOptions } from '@tanstack/react-query';
import type { FilterState } from '@/domain/filters';
import { serializeFilterState } from './filterSearchSchema';
import {
  featuredPropertiesFn,
  listPropertiesFn,
  propertyBySlugFn,
  relatedPropertiesFn,
} from '@/functions';

const STALE_TIME_MS = 60_000;

export function propertyListQueryOptions(filters: FilterState) {
  return queryOptions({
    queryKey: ['properties', 'list', serializeFilterState(filters)] as const,
    queryFn: () => listPropertiesFn({ data: filters }),
    staleTime: STALE_TIME_MS,
    placeholderData: (previous) => previous,
  });
}

export function featuredPropertiesQueryOptions(limit = 6) {
  return queryOptions({
    queryKey: ['properties', 'featured', limit] as const,
    queryFn: () => featuredPropertiesFn({ data: limit }),
    staleTime: STALE_TIME_MS,
  });
}

export function propertyDetailQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ['properties', 'detail', slug] as const,
    queryFn: () => propertyBySlugFn({ data: slug }),
    staleTime: STALE_TIME_MS,
  });
}

export function relatedPropertiesQueryOptions(slug: string, limit = 6) {
  return queryOptions({
    queryKey: ['properties', 'related', slug, limit] as const,
    queryFn: () => relatedPropertiesFn({ data: { slug, limit } }),
    staleTime: STALE_TIME_MS,
  });
}
