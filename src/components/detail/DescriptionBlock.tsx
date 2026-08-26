import { formatDate } from '@/lib/formatDate';
import type { Property } from '@/domain/property';

export function DescriptionBlock({ property }: { property: Property }) {
  return (
    <section aria-labelledby="opis-naslov" className="rounded-lg border border-neutral-200 bg-white p-5 shadow-card md:p-6">
      <h2 id="opis-naslov" className="font-display text-xl font-medium text-primary-900">
        Opis nekretnine
      </h2>
      <p className="mt-4 whitespace-pre-line leading-relaxed text-neutral-700">{property.description}</p>
      <p className="mt-4 border-t border-neutral-100 pt-4 text-xs text-neutral-500">
        Oglas objavljen {formatDate(property.publishedAt)}. Poslednja izmena {formatDate(property.updatedAt)}.
      </p>
    </section>
  );
}
