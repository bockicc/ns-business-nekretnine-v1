import { createFileRoute } from '@tanstack/react-router';
import { AgencyTrustSection } from '@/components/home/AgencyTrustSection';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { LatestBlogPosts } from '@/components/home/LatestBlogPosts';
import { PopularLocations } from '@/components/home/PopularLocations';
import { QuickSearchDock } from '@/components/home/QuickSearchDock';
import { Testimonials } from '@/components/home/Testimonials';
import { ValuePropositionBand } from '@/components/home/ValuePropositionBand';
import type { FeaturedQueryResult } from '@/lib/queryProperties';
import { featuredPropertiesQueryOptions } from '@/lib/propertyQueryOptions';

export const Route = createFileRoute('/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(featuredPropertiesQueryOptions(6)),
  component: HomePage,
});

function HomePage() {
  const featured = Route.useLoaderData();

  return (
    <>
      <HeroSection />
      <PopularLocations />
      <QuickSearchDock />
      <FeaturedProperties initialData={featured as FeaturedQueryResult} />
      <ValuePropositionBand />
      <HowItWorks />
      <Testimonials />
      <LatestBlogPosts />
      <AgencyTrustSection />
    </>
  );
}
