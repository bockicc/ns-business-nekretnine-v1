import type { Property } from '@/domain/property';
import { formatArea } from '@/lib/formatArea';

interface AttributeEntry {
  label: string;
  value: string;
}

function buildAttributes(property: Property): AttributeEntry[] {
  const entries: AttributeEntry[] = [];

  if (property.rooms != null) {
    entries.push({ label: 'Sobe', value: String(property.rooms) });
  }
  if (property.bedrooms != null) {
    entries.push({ label: 'Spavaće sobe', value: String(property.bedrooms) });
  }
  if (property.bathrooms != null) {
    entries.push({ label: 'Kupatila', value: String(property.bathrooms) });
  }
  if (property.floor != null) {
    entries.push({
      label: 'Sprat',
      value: property.totalFloors != null ? `${property.floor}/${property.totalFloors}` : String(property.floor),
    });
  }
  entries.push({ label: 'Kvadratura', value: formatArea(property.areaSqm) });
  if (property.landAreaSqm != null) {
    entries.push({ label: 'Plac', value: formatArea(property.landAreaSqm) });
  }
  if (property.yearBuilt != null) {
    entries.push({ label: 'Godina izgradnje', value: String(property.yearBuilt) });
  }

  return entries;
}

export function AttributeGrid({ property }: { property: Property }) {
  const attributes = buildAttributes(property);

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
      {attributes.map((attribute) => (
        <div key={attribute.label}>
          <dt className="text-xs uppercase tracking-[0.08em] font-semibold text-neutral-500">
            {attribute.label}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-neutral-900">{attribute.value}</dd>
        </div>
      ))}
    </dl>
  );
}
