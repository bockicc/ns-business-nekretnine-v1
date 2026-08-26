import { useState } from 'react';
import { Expand } from 'lucide-react';
import type { PropertyImage } from '@/domain/property';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { cn } from '@/lib/utils';
import { PropertyLightbox } from './PropertyLightbox';

export function PropertyGallery({ images }: { images: readonly PropertyImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeId, setActiveId] = useState(images[0]?.id ?? '');
  const [previewId, setPreviewId] = useState<string | null>(null);

  const active = images.find((image) => image.id === (previewId ?? activeId)) ?? images[0];
  useLockBodyScroll(lightboxIndex !== null);

  if (!active) return null;

  return (
    <section aria-label="Galerija fotografija">
      <div className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-card">
        <button
          type="button"
          onClick={() => setLightboxIndex(images.findIndex((image) => image.id === active.id))}
          className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label="Otvori galeriju u punom prikazu"
        >
          <img
            src={active.url}
            alt={active.alt}
            width={active.width}
            height={active.height}
            className="aspect-[16/10] w-full cursor-zoom-in object-cover"
          />
        </button>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-primary-950/70 px-2.5 py-1.5 text-xs font-medium text-white">
          <Expand className="size-3.5" aria-hidden="true" />
          {images.length} fotografije
        </span>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6" role="tablist" aria-label="Odaberite fotografiju">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            role="tab"
            aria-selected={image.id === active.id}
            onClick={() => {
              setActiveId(image.id);
              setPreviewId(null);
            }}
            onMouseEnter={() => setPreviewId(image.id)}
            onMouseLeave={() => setPreviewId(null)}
            onDoubleClick={() => setLightboxIndex(index)}
            className={cn(
              'overflow-hidden rounded-lg border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              image.id === active.id ? 'border-gold-600' : 'border-transparent hover:border-neutral-300',
            )}
          >
            <img
              src={image.url}
              alt=""
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null ? (
        <PropertyLightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </section>
  );
}
