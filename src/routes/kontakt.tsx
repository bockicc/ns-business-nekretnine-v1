import { createFileRoute } from '@tanstack/react-router';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { buildPageMeta } from '@/lib/seo';
import { siteConfig } from '@/data/site';
import { Container } from '@/components/layout/Container';
import { QuickActionButtons } from '@/components/lead/QuickActionButtons';
import { LeadForm } from '@/components/lead/LeadForm';
import { LazyMap } from '@/components/detail/LazyMap';

export const Route = createFileRoute('/kontakt')({
  component: ContactPage,
  head: () => ({
    meta: buildPageMeta({
      title: 'Kontakt',
      description:
        'Kontaktirajte NS Business Consulting — telefon, WhatsApp, Viber, email ili poruka kroz obrazac.',
      path: '/kontakt',
    }),
  }),
});

function ContactPage() {
  return (
    <div className="bg-neutral-50">
      <Container className="py-10 md:py-16">
        <header className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.08em] font-semibold text-gold-700">
            Kontakt
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium text-primary-900 md:text-4xl">
            Tu smo za sva pitanja
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Odaberite najbrži kanal ili pošaljite upit kroz obrazac — odgovaramo u toku istog
            radnog dana.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* ── Left column ─────────────────────────────────── */}
          <div className="space-y-6 lg:col-span-5">
            {/* Contact cards */}
            <div className="grid gap-3 sm:grid-cols-2" aria-label="Kontakt podaci">
              <ContactTile icon={Phone} label="Telefon" value={siteConfig.contact.phoneDisplay} href={siteConfig.contact.phoneHref} />
              <ContactTile icon={Mail} label="Email" value={siteConfig.contact.email} href={`mailto:${siteConfig.contact.email}`} />
              <ContactTile icon={MapPin} label="Adresa" value={siteConfig.contact.address} />
              <ContactTile icon={Clock} label="Radno vreme" value={siteConfig.contact.workingHours} />
            </div>

            {/* Quick actions */}
            <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-card">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
                Direktni kontakt
              </p>
              <QuickActionButtons propertyTitle="upit sa kontakt strane" />
            </div>

            {/* Legal info */}
            <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-card">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
                Poslovne informacije
              </p>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-neutral-500">Pravno lice</dt>
                  <dd className="text-right font-medium text-primary-900">{siteConfig.legal.entity}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-neutral-500">MB</dt>
                  <dd className="font-medium text-primary-900">{siteConfig.legal.mb}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-neutral-500">PIB</dt>
                  <dd className="font-medium text-primary-900">{siteConfig.legal.pib}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-neutral-500">Žiro račun</dt>
                  <dd className="font-medium text-primary-900">{siteConfig.legal.account}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* ── Right column ────────────────────────────────── */}
          <div className="space-y-6 lg:col-span-7">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <LeadForm />
            </div>

            <LazyMap
              location={{ city: 'Novi Sad', addressLine: siteConfig.contact.address }}
              title="NS Business Consulting"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

function ContactTile({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary-100 text-primary-900">
        <Icon className="size-4.5" aria-hidden />
      </span>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">{label}</p>
      <p className="mt-1 whitespace-pre-line text-sm font-medium text-primary-900">{value}</p>
    </>
  );

  return href ? (
    <a
      href={href}
      className="block rounded-lg border border-neutral-200 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      {content}
    </a>
  ) : (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-card">{content}</div>
  );
}
