import { createFileRoute, notFound } from '@tanstack/react-router';
import type { Property } from '@/domain/property';
import { propertyDetailQueryOptions, relatedPropertiesQueryOptions } from '@/lib/propertyQueryOptions';
import { buildPageMeta, propertyTitle } from '@/lib/seo';
import { Container } from '@/components/layout/Container';
import { PropertyGallery } from '@/components/detail/PropertyGallery';
import { SpecMatrix } from '@/components/detail/SpecMatrix';
import { DescriptionBlock } from '@/components/detail/DescriptionBlock';
import { FloorPlanTabs } from '@/components/detail/FloorPlanTabs';
import { LazyMap } from '@/components/detail/LazyMap';
import { AgentContactCard } from '@/components/detail/AgentContactCard';
import { MortgageCalculator } from '@/components/detail/MortgageCalculator';
import { RelatedPropertiesSlider } from '@/components/detail/RelatedPropertiesSlider';
import { StatusBadge } from '@/components/property/StatusBadge';
import { CompareToggle } from '@/components/comparison/CompareToggle';

export const Route = createFileRoute('/nekretnine/$slug')({
  loader: async ({ params, context }) => {
    const property = await context.queryClient.ensureQueryData(
      propertyDetailQueryOptions(params.slug),
    );
    if (!property) throw notFound();
    void context.queryClient.prefetchQuery(relatedPropertiesQueryOptions(property.slug));
    return property;
  },
  head: ({ loaderData }) => {
    const property = loaderData as Property | undefined;
    return {
      meta: buildPageMeta({
        title: property ? propertyTitle(property.title, property.location.city) : undefined,
        description: property
          ? `${property.description.slice(0, 150)}… — ${property.location.city}. Detalji, galerija i kontakt agenta.`
          : undefined,
        path: `/nekretnine/${property?.slug ?? ''}`,
      }),
    };
  },
  component: DetailPage,
});

function DetailPage() {
  const property = Route.useLoaderData();

  return (
    <div className="bg-white">
      <Container className="py-8 md:py-12">
        <nav aria-label="Putanja" className="mb-6 text-sm text-neutral-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <a href="/" className="transition-colors hover:text-primary-900">Početna</a>
            </li>
            <li aria-hidden="true" className="text-neutral-300">/</li>
            <li>
              <a href="/nekretnine" className="transition-colors hover:text-primary-900">Nekretnine</a>
            </li>
            <li aria-hidden="true" className="text-neutral-300">/</li>
            <li aria-current="page" className="max-w-[16rem] truncate font-medium text-primary-900">
              {property.title}
            </li>
          </ol>
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={property.status} />
          {property.approvedAt ? (
            <p className="text-sm text-neutral-500">Objavljeno {formatDate(property.approvedAt)}</p>
          ) : null}
          <div className="ml-auto">
            <CompareToggle propertyId={property.id} />
          </div>
        </div>

        <h1 className="mt-3 max-w-3xl font-display text-3xl font-medium leading-tight text-primary-900 md:text-4xl">
          {property.title}
        </h1>
        <p className="mt-2 text-base text-neutral-600">
          {[property.location.neighborhood, property.location.city].filter(Boolean).join(', ')}
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-10">
            <PropertyGallery images={property.images} />

            <SpecMatrix property={property} />

            <MortgageCalculator property={property} />

            <DescriptionBlock property={property} />

            {property.floorPlanUrl ? (
              <FloorPlanTabs property={property} />
            ) : null}

            <section aria-labelledby="lokacija-na-mapi">
              <h2 id="lokacija-na-mapi" className="font-display text-xl font-medium text-primary-900">
                Lokacija
              </h2>
              <LazyMap location={property.location} title={property.title} />
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <AgentContactCard
              agent={property.agent}
              propertyTitle={property.title}
            />
          </aside>
        </div>
      </Container>

      <RelatedPropertiesSlider slug={property.slug} fallback={[]} />
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('sr-RS', { day: 'numeric', month: 'long', year: 'numeric' });
}
