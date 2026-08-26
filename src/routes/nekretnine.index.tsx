import { useCallback, useMemo, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type { FilterState } from '@/domain/filters';
import { useFilterState } from '@/hooks/useFilterState';
import { parseFilterSearchParams, toFlatSearchParams } from '@/lib/filterSearchSchema';
import { usePropertyQuery } from '@/hooks/usePropertyQuery';
import { ActiveFilterPills } from '@/components/search/ActiveFilterPills';
import { FilterBar } from '@/components/search/FilterBar';
import { FilterModal } from '@/components/search/FilterModal';
import { PropertyEmptyState } from '@/components/property/PropertyEmptyState';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { PropertyCardSkeleton } from '@/components/property/PropertyCardSkeleton';
import { PropertyListItem } from '@/components/property/PropertyListItem';
import { PropertyToolbar } from '@/components/property/PropertyToolbar';
import { Pagination } from '@/components/ui/pagination';
import { Container } from '@/components/layout/Container';

const PAGE_SIZE = 9;

export const Route = createFileRoute('/nekretnine/')({
  component: CatalogPage,
});

function CatalogPage() {
  const search = Route.useSearch();

  const initialFilters = useMemo(() => parseFilterSearchParams(search), [search]);
  const remountKey = useMemo(() => JSON.stringify(search), [search]);

  return <CatalogView key={remountKey} initial={initialFilters} />;
}

function CatalogView({ initial }: { initial: FilterState }) {
  const navigate = useNavigate();
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const onSync = useCallback(
    (state: FilterState) => {
      void navigate({ to: '/nekretnine', search: toFlatSearchParams(state), replace: true });
    },
    [navigate],
  );

  const { state, dispatch, pills } = useFilterState(initial, { onSync });
  const { data, isLoading } = usePropertyQuery(state);

  const properties = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <Container className="py-10 md:py-14">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.08em] font-semibold text-gold-700">
          Katalog
        </p>
        <h1 className="mt-2 font-display text-3xl font-medium text-primary-900 md:text-4xl">
          Nekretnine u Novom Sadu i okolini
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
          Filtrirajte po nameni, lokaciji, ceni i karakteristikama. Svi oglasi su prošli
          administrativnu proveru NS Business Consulting tima.
        </p>
      </header>

      <FilterBar state={state} dispatch={dispatch} onOpenAdvanced={() => setAdvancedOpen(true)} />

      <div className="mt-4 space-y-4">
        {pills.length > 0 ? (
          <ActiveFilterPills
            pills={pills}
            onRemove={(key) => dispatch({ type: 'REMOVE_PILL', key })}
            onResetAll={() => dispatch({ type: 'RESET' })}
          />
        ) : null}

        <PropertyToolbar
          total={total}
          sort={state.sort}
          view={state.view}
          onSortChange={(sort) => dispatch({ type: 'SET_SORT', sort })}
          onViewChange={(view) => dispatch({ type: 'SET_VIEW', view })}
        />
      </div>

      <div aria-live="polite" aria-busy={isLoading} className="mt-6">
        {isLoading ? (
          state.view === 'grid' ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: PAGE_SIZE }, (_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="h-40 animate-pulse rounded-lg bg-neutral-200/70" />
              ))}
            </div>
          )
        ) : properties.length === 0 ? (
          <PropertyEmptyState onReset={() => dispatch({ type: 'RESET' })} />
        ) : state.view === 'grid' ? (
          <PropertyGrid properties={properties} />
        ) : (
          <div className="space-y-4">
            {properties.map((property) => (
              <PropertyListItem key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

      {!isLoading && totalPages > 1 ? (
        <div className="mt-10 flex justify-center">
          <Pagination page={state.page} totalPages={totalPages} onChange={(page) => dispatch({ type: 'SET_PAGE', page })} />
        </div>
      ) : null}

      <FilterModal open={advancedOpen} onOpenChange={setAdvancedOpen} state={state} dispatch={dispatch} />
    </Container>
  );
}
