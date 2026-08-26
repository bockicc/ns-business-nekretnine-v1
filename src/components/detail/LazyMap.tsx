import { useState } from 'react';
import { MapPin } from 'lucide-react';
import type { GeoLocation } from '@/domain/property';

export function LazyMap({ location, title }: { location: GeoLocation; title: string }) {
  const [loaded, setLoaded] = useState(false);

  if (location.lat == null || location.lng == null) return null;

  const bboxHalf = 0.008;
  const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - bboxHalf}%2C${location.lat - bboxHalf * 0.6}%2C${location.lng + bboxHalf}%2C${location.lat + bboxHalf * 0.6}&layer=mapnik&marker=${location.lat}%2C${location.lng}`;

  return (
    <section aria-labelledby="lokacija-naslov" className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-card">
      <div className="flex items-center justify-between gap-3 p-5 pb-4">
        <div>
          <h2 id="lokacija-naslov" className="font-display text-xl font-medium text-primary-900">
            Lokacija
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-700">
            <MapPin className="size-4 shrink-0 text-gold-600" aria-hidden="true" />
            {[location.addressLine, location.neighborhood, location.city].filter(Boolean).join(', ') ||
              title}
          </p>
        </div>
        <a
          href={`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=15/${location.lat}/${location.lng}`}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-primary-900 transition-colors hover:border-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          Otvori mapu
        </a>
      </div>

      <div className="relative aspect-[16/9] w-full border-t border-neutral-100">
        {loaded ? (
          <iframe
            src={embedSrc}
            title={`Mapa — ${title}`}
            loading="lazy"
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            aria-label="Učitaj mapu"
            className="group absolute inset-0 flex size-full items-center justify-center bg-primary-100/50 transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
          >
            <span className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-primary-900 shadow-card transition-transform group-hover:scale-[1.03]">
              <MapPin className="size-4 text-gold-600" aria-hidden="true" />
              Kliknite za učitavanje mape
            </span>
          </button>
        )}
      </div>
      <p className="px-5 py-3 text-xs text-neutral-500">
        Prikazana lokacija je okvirna i ne odnosi se na tačnu adresu nekretnine.
      </p>
    </section>
  );
}
