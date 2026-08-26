import { Link } from '@tanstack/react-router';
import { MapPin } from 'lucide-react';

const LOCATIONS = [
  { name: 'Liman', description: 'Liman 1–4', count: 4 },
  { name: 'Grbavica', description: 'Stambeni blokovi', count: 3 },
  { name: 'Centar', description: 'Stari grad', count: 3 },
  { name: 'Detelinara', description: 'Porodično naselje', count: 2 },
  { name: 'Novo Naselje', description: 'Moderan kraj', count: 3 },
  { name: 'Petrovaradin', description: 'Petrovaradin', count: 2 },
] as const;

export function PopularLocations() {
  return (
    <section aria-labelledby="popularne-lokacije" className="bg-neutral-50 py-16 md:py-20">
      <div className="container-page">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-600">Popularne Lokacije</p>
        <h2 id="popularne-lokacije" className="mt-2 font-display text-3xl font-medium text-primary-900 md:text-4xl">
          Gde tražite nekretninu?
        </h2>
        <p className="mt-3 max-w-lg text-neutral-700">
          Brzo pretražite ponudu po najtraženijim novosadskim naseljima.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LOCATIONS.map((loc) => (
            <Link
              key={loc.name}
              to="/nekretnine"
              search={{ location: loc.name }}
              className="group flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-card transition-all hover:shadow-card-hover hover:border-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary-900 text-gold-500 transition-colors group-hover:bg-primary-800">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg font-medium text-primary-900 group-hover:text-primary-700">{loc.name}</h3>
                <p className="mt-0.5 text-sm text-neutral-500">{loc.description}</p>
              </div>
              <span className="shrink-0 rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-800">
                {loc.count}+
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
