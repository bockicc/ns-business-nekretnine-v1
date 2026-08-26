import { ArrowRight, Building2, FileText, MapPin, Phone } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { siteConfig } from '@/data/site';
import { Button } from '@/components/ui/button';

const QUICK_LINKS = [
  { href: '/nekretnine', icon: MapPin, label: 'Nekretnine', desc: 'Katalog svih oglasa →' },
  { href: '/oglasite-nekretninu', icon: FileText, label: 'Postavite oglas', desc: 'Promocija vaše nekretnine →' },
  { href: '/kontakt', icon: Phone, label: 'Kontakt', desc: 'Pozovite ili pišite nam →' },
];

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-naslov"
      className="relative isolate overflow-hidden bg-primary-950"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(./hero-bg.jpg)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-primary-950/95 via-primary-950/75 to-primary-950/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-primary-950/30"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-600/30 to-transparent"
      />

      <div className="container-page relative py-20 md:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-500">
              {siteConfig.cityTag} · Nekretnine · Konsalting
            </p>
            <h1
              id="hero-naslov"
              className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight text-white md:text-5xl lg:text-6xl"
            >
              Most koji spaja
              <br />
              <em className="text-gold-500">ljude i prilike.</em>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Stanovi, kuće i poslovni prostori u Novom Sadu i okolini. Jasne cene,
              provereni podaci i agent koji stoji iza svakog oglasa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="gold"
                size="lg"
                onClick={() =>
                  document.getElementById('brza-pretraga')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Pronađite nekretninu
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
               <Link
                 to="/oglasite-nekretninu"
                 className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 px-6 text-base font-semibold text-white transition-colors hover:border-gold-500 hover:text-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
               >
                 Oglasite nekretninu
               </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-xl border border-white/10 bg-primary-950/70 p-6 shadow-modal backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-600">
                  <Building2 className="size-5 text-primary-950" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-500">
                    Izaberite pravac
                  </p>
                  <p className="font-display text-lg font-medium text-white">Tu smo za vas.</p>
                </div>
              </div>
              <div className="space-y-2">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 px-4 py-3 transition-colors hover:border-gold-600/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  >
                    <link.icon className="size-4 shrink-0 text-gold-500" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-white">{link.label}</p>
                      <p className="text-xs text-white/60">{link.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <a
                href={siteConfig.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-center text-xs text-white/50 transition-colors hover:border-white/10 hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                Krediti, Zapošljavanje, Biznis → ns-business.rs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
