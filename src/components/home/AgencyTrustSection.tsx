import { Link } from '@tanstack/react-router';
import { Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { StatCounter } from './StatCounter';

export function AgencyTrustSection() {
  return (
    <section aria-labelledby="agencija-naslov" className="bg-primary-900 py-16 text-white md:py-20">
      <div className="container-page grid items-start gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-500">
            {siteConfig.name}
          </p>
          <h2 id="agencija-naslov" className="mt-3 font-display text-3xl font-medium md:text-4xl">
            Agencija sa licem i adresom u Novom Sadu
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-white/75">
            NS Business Consulting povezuje vlasnike i kupce nekretnina kroz lični pristup i jasne
            brojke. Naš tim je dostupan na svakom koraku — od prvog poziva do potpisa ugovora.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <StatCounter target={150} suffix="+" label="Uspešnih dogovora" />
            <StatCounter target={10} suffix="+" label="Godina iskustva" />
            <StatCounter target={98} suffix="%" label="Zadovoljnih klijenata" />
          </div>

          <ul className="mt-8 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-gold-500" aria-hidden="true" />
              {siteConfig.contact.phoneDisplay} · {siteConfig.contact.workingHours}
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-gold-500" aria-hidden="true" />
              {siteConfig.contact.email}
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-gold-500" aria-hidden="true" />
              {siteConfig.contact.address}
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-white/10 bg-primary-800/60 p-6 md:p-8">
          <h3 className="font-display text-2xl font-medium">Imate nekretninu za prodaju?</h3>
          <p className="mt-3 leading-relaxed text-white/75">
            Objavite oglas kod nas za {siteConfig.listingFee.amount.toLocaleString('sr-RS')}{' '}
            RSD i ostvarite {siteConfig.listingFee.periodDays} dana vidljivosti. Oglas objavljujemo
            nakon provere — bez automatskih objava.
          </p>
          <dl className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm text-white/70">
            <div className="flex justify-between gap-4">
              <dt>Trošak objave</dt>
              <dd className="font-semibold text-gold-500">5.000 RSD / 30 dana</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Rok provere</dt>
              <dd>{siteConfig.reviewWindowHours}</dd>
            </div>
          </dl>
          <Link
            to="/oglasite-nekretninu"
            className="mt-7 flex h-12 w-full items-center justify-center rounded-md bg-gold-600 px-6 font-semibold text-primary-950 transition-colors hover:bg-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            Postavite oglas
          </Link>
        </div>
      </div>
    </section>
  );
}
