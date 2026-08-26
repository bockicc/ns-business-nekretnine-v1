import { AttributeGrid } from '@/components/property/AttributeGrid';
import type { Property } from '@/domain/property';

const EXTRA_ROWS = (property: Property) => {
  const rows: { label: string; value: string }[] = [];
  if (property.heating) rows.push({ label: 'Grejanje', value: HEATING[property.heating] ?? property.heating });
  if (property.energyClass) rows.push({ label: 'Energetska klasa', value: property.energyClass });
  if (property.pricePerSqm) {
    rows.push({
      label: 'Cena po m²',
      value: `${property.pricePerSqm.amount.toLocaleString('sr-RS')} ${property.pricePerSqm.currency === 'EUR' ? '€' : 'RSD'}`,
    });
  }
  return rows;
};

const HEATING: Record<string, string> = {
  central: 'Centralno',
  gas: 'Gas',
  electric: 'Struja',
  'heat-pump': 'Toplotna pumpa',
  wood: 'Drva/Pelet',
  none: 'Bez grejanja',
};

export function SpecMatrix({ property }: { property: Property }) {
  const extras = EXTRA_ROWS(property);

  return (
    <section aria-labelledby="specifikacija-naslov" className="rounded-lg border border-neutral-200 bg-white p-5 shadow-card md:p-6">
      <h2 id="specifikacija-naslov" className="font-display text-xl font-medium text-primary-900">
        Osnovni podaci
      </h2>
      <div className="mt-5">
        <AttributeGrid property={property} />
      </div>
      {extras.length > 0 ? (
        <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 border-t border-neutral-100 pt-5 sm:grid-cols-3">
          {extras.map((row) => (
            <div key={row.label}>
              <dt className="text-xs uppercase tracking-[0.08em] font-semibold text-neutral-500">
                {row.label}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-neutral-900">{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}
