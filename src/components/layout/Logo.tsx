import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

export function Logo({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  return (
    <Link
      to="/"
      aria-label="NS Business Consulting — početna"
      className={cn('inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md', className)}
    >
      <span className="size-10 shrink-0 overflow-hidden rounded-full inline-flex items-center justify-center">
        <img
          src="./ns-business-logo.png"
          alt="NS Business Consulting logo"
          className="size-full object-cover"
          style={{ clipPath: 'circle(50% at 50% 50%)' }}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-lg font-semibold tracking-tight', inverse ? 'text-white' : 'text-primary-900')}>
          NS Business Consulting
        </span>
        <span className={cn('mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em]', inverse ? 'text-gold-500' : 'text-gold-600')}>
          NOVI SAD
        </span>
      </span>
    </Link>
  );
}
