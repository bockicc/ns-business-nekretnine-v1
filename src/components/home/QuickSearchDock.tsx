import { QuickSearchBar } from '@/components/search/QuickSearchBar';

export function QuickSearchDock() {
  return (
    <section
      id="brza-pretraga"
      aria-label="Brza pretraga nekretnina"
      className="relative z-10 -mt-10 scroll-mt-24"
    >
      <div className="container-page">
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-card-hover md:p-6">
          <QuickSearchBar />
        </div>
      </div>
    </section>
  );
}
