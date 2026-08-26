import { useCallback, useEffect, useRef, useState } from 'react';
import type { PropertyImage } from '@/domain/property';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export function PropertyLightbox({
  images,
  index,
  onClose,
}: {
  images: readonly PropertyImage[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);
  const total = images.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useLockBodyScroll(true);
  useFocusTrap(containerRef, true);

  const showPrevious = useCallback(() => setCurrent((value) => (value - 1 + total) % total), [total]);
  const showNext = useCallback(() => setCurrent((value) => (value + 1) % total), [total]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, showNext, showPrevious]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      const minSwipe = 50;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipe) {
        if (dx > 0) showPrevious();
        else showNext();
      }
    },
    [showPrevious, showNext],
  );

  const image = images[current];
  if (!image) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Fotografija ${current + 1} od ${total}`}
      className="fixed inset-0 z-50 flex flex-col bg-primary-950/95 animate-overlay-in"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-sm text-white/70">
          {current + 1} / {total}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Zatvori galeriju"
          className="rounded-md p-2 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <X className="size-6" aria-hidden="true" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-2">
        <img
          key={image.id}
          src={image.url}
          alt={image.alt}
          className="max-h-full max-w-full rounded-lg object-contain animate-fade-in"
        />
        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Prethodna fotografija"
              className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Sledeća fotografija"
              className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      {total > 1 ? (
        <div className="flex justify-center overflow-x-auto px-4 py-3" role="tablist" aria-label="Slike">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Fotografija ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={cn(
                'mx-0.5 size-14 shrink-0 overflow-hidden rounded-md border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500',
                i === current
                  ? 'border-gold-500 opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-80',
              )}
            >
              <img src={img.url} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
