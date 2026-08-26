import { createFileRoute } from '@tanstack/react-router';
import { buildPageMeta } from '@/lib/seo';
import { siteConfig } from '@/data/site';
import { Container } from '@/components/layout/Container';
import { SubmissionWizard } from '@/components/submission/SubmissionWizard';
import { ShieldCheck, Clock, BadgeCheck } from 'lucide-react';

const ASSURANCES = [
  {
    icon: ShieldCheck,
    title: 'Administrativna provera',
    body: `Svaki oglas pregledamo pre objave (${siteConfig.reviewWindowHours}). Bez duplikata i netačnih podataka.`,
  },
  {
    icon: Clock,
    title: '30 dana vidljivosti',
    body: 'Oglas ostaje aktivan punih 30 dana, sa mogućnošću produženja po istoj ceni.',
  },
  {
    icon: BadgeCheck,
    title: 'Jedna cena, bez skrivenih troškova',
    body: 'Plaćate 5.000 RSD tek nakon odobrenja oglasa. Komisija se ne naplaćuje za oglašavanje.',
  },
];

export const Route = createFileRoute('/oglasite-nekretninu')({
  component: SubmitPage,
  head: () => ({
    meta: buildPageMeta({
      title: 'Oglašite nekretninu',
      description:
        'Postavite nekretninu na NS Nekretnine u tri koraka — osnovni podaci, fotografije i opis, kontakt i plaćanje.',
      path: '/oglasite-nekretninu',
    }),
  }),
});

function SubmitPage() {
  return (
    <div className="bg-neutral-50">
      <Container className="py-10 md:py-16">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.08em] font-semibold text-gold-700">
            Za vlasnike
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium text-primary-900 md:text-4xl">
            Oglasite nekretninu
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Popunite obrazac u tri koraka. Nakon administrativne provere objavljujemo oglas i
            kontaktiramo vas oko uplate.
          </p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <SubmissionWizard />

          <aside className="space-y-4 lg:sticky lg:top-24" aria-label="Garancije servisa">
            {ASSURANCES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-card">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary-100 text-primary-900">
                  <Icon className="size-4.5" aria-hidden="true" />
                </span>
                <h2 className="mt-3 text-sm font-semibold text-primary-900">{title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{body}</p>
              </div>
            ))}
          </aside>
        </div>
      </Container>
    </div>
  );
}
