import { useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import type { Property, PropertyFeatureFlags } from '@/domain/property';
import { PROPERTIES } from '@/data/properties.mock';
import { useComparison } from '@/hooks/useComparison';
import { formatPrice } from '@/lib/formatPrice';
import { formatArea, formatPerSqm } from '@/lib/formatArea';
import { Container } from '@/components/layout/Container';
import { buttonVariants } from '@/components/ui/button';

const HEATING: Record<string, string> = {
  central: 'Centralno',
  gas: 'Gas',
  electric: 'Struja',
  'heat-pump': 'Toplotna pumpa',
  wood: 'Drva/Pelet',
  none: 'Bez grejanja',
};

const STATUS: Record<string, string> = {
  new: 'Novo',
  'for-sale': 'Prodaja',
  'for-rent': 'Izdavanje',
  pending: 'Rezervisano',
  sold: 'Prodato',
  rented: 'Izdato',
};

const FEATURE_LABELS: Record<keyof PropertyFeatureFlags, string> = {
  parking: 'Parking',
  elevator: 'Lift',
  balcony: 'Balkon',
  furnished: 'Namešten',
  petFriendly: 'Kućni ljubimci',
  newConstruction: 'Novogradnja',
  registered: 'Uknjiženo',
};

function Row({ label, values }: { label: string; values: (string | null)[] }) {
  return (
    <tr className="border-b border-neutral-100">
      <th
        scope="row"
        className="py-3 pr-4 text-left text-sm font-medium text-neutral-600"
      >
        {label}
      </th>
      {values.map((value, i) => (
        <td key={i} className="py-3 text-center text-sm font-semibold text-primary-900">
          {value ?? '—'}
        </td>
      ))}
    </tr>
  );
}

function FeatureRows({ properties }: { properties: Property[] }) {
  const keys = Object.keys(FEATURE_LABELS) as (keyof PropertyFeatureFlags)[];
  return (
    <>
      {keys.map((key) => (
        <tr key={key} className="border-b border-neutral-100">
          <th scope="row" className="py-3 pr-4 text-left text-sm font-medium text-neutral-600">
            {FEATURE_LABELS[key]}
          </th>
          {properties.map((p) => (
            <td key={p.id} className="py-3 text-center text-sm font-semibold text-primary-900">
              {p.features[key] ? (
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-green-100 text-green-700">
                  ✓
                </span>
              ) : (
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                  —
                </span>
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function CompareMatrix() {
  const { ids, remove, clear } = useComparison();

  const properties = useMemo(
    () => ids.map((id) => PROPERTIES.find((p) => p.id === id)).filter(Boolean) as Property[],
    [ids],
  );

  if (properties.length < 2) {
    return (
      <Container className="py-16 text-center">
        <p className="text-xs uppercase tracking-[0.08em] font-semibold text-gold-600">
          Poređenje
        </p>
        <h1 className="mt-3 font-display text-3xl font-medium text-primary-900">
          Dodajte bar dve nekretnine za poređenje
        </h1>
        <p className="mt-3 text-neutral-600">
          Vratite se na katalog i izaberite nekretnine koje želite da uporedite.
        </p>
        <a
          href="/nekretnine"
          className={buttonVariants({ variant: 'primary', className: 'mt-6' })}
        >
          Pregledaj katalog
        </a>
      </Container>
    );
  }

  return (
    <Container className="py-10 md:py-14">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.08em] font-semibold text-gold-600">
          Poređenje
        </p>
        <h1 className="mt-2 font-display text-3xl font-medium text-primary-900 md:text-4xl">
          Uporedite nekretnine
        </h1>
      </header>

      <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white shadow-card">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="w-40 p-4 text-left text-sm font-medium text-neutral-500" />
              {properties.map((p) => (
                <th key={p.id} className="min-w-[200px] p-4 text-center">
                  <Link
                    to="/nekretnine/$slug"
                    params={{ slug: p.slug }}
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
                  >
                    <img
                      src={p.images[0]?.url}
                      alt={p.title}
                      className="mx-auto h-32 w-full max-w-[180px] rounded-lg object-cover transition-transform group-hover:scale-[1.02]"
                    />
                    <p className="mt-2 font-display text-sm font-medium text-primary-900 group-hover:text-primary-600">
                      {p.title}
                    </p>
                  </Link>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <Link
                      to="/nekretnine/$slug"
                      params={{ slug: p.slug }}
                      className="text-xs text-primary-600 hover:underline focus-visible:outline-none"
                    >
                      Detalji
                    </Link>
                    <span className="text-neutral-300">·</span>
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      className="text-xs text-red-500 hover:underline focus-visible:outline-none"
                    >
                      Ukloni
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 px-4">
            <Row label="Status" values={properties.map((p) => STATUS[p.status] ?? p.status)} />
            <Row label="Cena" values={properties.map((p) => formatPrice(p.price, p.intent))} />
            <Row
              label="Cena po m²"
              values={properties.map((p) =>
                formatPerSqm(p.areaSqm, p.pricePerSqm, p.intent) ?? '—',
              )}
            />
            <Row
              label="Ukupna površina"
              values={properties.map((p) => formatArea(p.areaSqm))}
            />
            <Row
              label="Sobe"
              values={properties.map((p) => (p.rooms != null ? String(p.rooms) : null))}
            />
            <Row
              label="Sprat"
              values={properties.map((p) =>
                p.floor != null
                  ? p.totalFloors != null
                    ? `${p.floor}/${p.totalFloors}`
                    : String(p.floor)
                  : null,
              )}
            />
            <Row
              label="Grejanje"
              values={properties.map((p) => (p.heating ? HEATING[p.heating] ?? p.heating : null))}
            />
            <Row
              label="Godina izgradnje"
              values={properties.map((p) => (p.yearBuilt != null ? String(p.yearBuilt) : null))}
            />
            <Row
              label="Energetska klasa"
              values={properties.map((p) => p.energyClass ?? null)}
            />
            <Row
              label="Uknjiženo"
              values={properties.map((p) => (p.features.registered ? 'Da' : 'Ne'))}
            />
            <FeatureRows properties={properties} />
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={clear}
          className="text-sm font-semibold text-red-600 hover:underline focus-visible:outline-none"
        >
          Obriši sve iz poređenja
        </button>
      </div>
    </Container>
  );
}
