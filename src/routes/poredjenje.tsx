import { createFileRoute } from '@tanstack/react-router';
import { buildPageMeta } from '@/lib/seo';
import { CompareMatrix } from '@/components/comparison/CompareMatrix';

export const Route = createFileRoute('/poredjenje')({
  head: () => ({
    meta: buildPageMeta({
      title: 'Poređenje nekretnina — NS Nekretnine',
      description: 'Uporedite do tri nekretnine po osnovnim podacima, ceni, opremi i karakteristikama.',
      path: '/poredjenje',
    }),
  }),
  component: ComparePage,
});

function ComparePage() {
  return <CompareMatrix />;
}
