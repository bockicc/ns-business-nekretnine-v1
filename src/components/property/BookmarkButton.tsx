import { Bookmark } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { cn } from '@/lib/utils';

export function BookmarkButton({ propertyId }: { propertyId: string }) {
  const { isBookmarked, toggle } = useBookmarks();
  const active = isBookmarked(propertyId);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(propertyId);
      }}
      aria-pressed={active}
      aria-label={active ? 'Ukloni iz sačuvanih' : 'Sačuvaj oglas'}
      title={active ? 'Ukloni iz sačuvanih' : 'Sačuvaj oglas'}
      className={cn(
        'flex size-9 items-center justify-center rounded-md border bg-white/90 backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        active
          ? 'border-gold-600 text-gold-600 animate-bookmark-pop'
          : 'border-neutral-200 text-neutral-700 hover:border-primary-400 hover:text-primary-900',
      )}
    >
      <Bookmark className={cn('size-4', active && 'fill-current')} aria-hidden="true" />
    </button>
  );
}
