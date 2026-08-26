import { createServerFn } from '@tanstack/react-start';
import type { FilterState } from '@/domain/filters';
import type { Property } from '@/domain/property';
import {
  queryFeaturedProperties,
  queryProperties,
  queryPropertyBySlug,
  queryRelatedProperties,
} from '@/lib/queryProperties';

export const listPropertiesFn = createServerFn({ method: 'GET' })
  .validator((input: FilterState) => input)
  .handler(({ data }) => queryProperties(data));

export const featuredPropertiesFn = createServerFn({ method: 'GET' })
  .validator((input: number | undefined) => input ?? 6)
  .handler(({ data }) => queryFeaturedProperties(data));

export const propertyBySlugFn = createServerFn({ method: 'GET' })
  .validator((input: string) => input)
  .handler(({ data }) => queryPropertyBySlug(data));

export const relatedPropertiesFn = createServerFn({ method: 'GET' })
  .validator((input: { slug: string; limit?: number }) => input)
  .handler(
    ({ data }): Promise<Property[]> =>
      queryRelatedProperties(data.slug, data.limit ?? 6),
  );
