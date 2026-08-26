import { useQuery } from '@tanstack/react-query';
import type { FilterState } from '@/domain/filters';
import { propertyListQueryOptions } from '@/lib/propertyQueryOptions';

export function usePropertyQuery(filters: FilterState) {
  const query = useQuery(propertyListQueryOptions(filters));
  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
  };
}
