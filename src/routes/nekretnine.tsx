import { Outlet, createFileRoute } from '@tanstack/react-router';
import { parseFilterSearchParams, toFlatSearchParams } from '@/lib/filterSearchSchema';
import type { RawSearchParams } from '@/lib/filterSearchSchema';

export const Route = createFileRoute('/nekretnine')({
  validateSearch: (search: Record<string, unknown>): Record<string, string> =>
    toFlatSearchParams(parseFilterSearchParams(search as RawSearchParams)),
  component: CatalogLayout,
});

function CatalogLayout() {
  return (
    <div className="bg-neutral-50">
      <Outlet />
    </div>
  );
}
