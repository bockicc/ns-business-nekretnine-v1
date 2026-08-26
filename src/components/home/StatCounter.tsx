import { useIntersectionCountUp } from '@/hooks/useIntersectionCountUp';
import { cn } from '@/lib/utils';

export function StatCounter({
  target,
  suffix,
  label,
  className,
}: {
  target: number;
  suffix?: string;
  label: string;
  className?: string;
}) {
  const { ref, display } = useIntersectionCountUp(target);

  return (
    <div className={cn('text-center', className)}>
      <p className="font-display text-3xl font-semibold text-gold-500 md:text-4xl">
        <span ref={ref}>
          {display.toLocaleString('sr-RS')}
          {suffix ? <span aria-hidden="true">{suffix}</span> : null}
        </span>
        <span className="sr-only">{suffix === '+' ? ' ili više' : ''} {label}</span>
      </p>
      <p aria-hidden="true" className="mt-1.5 text-sm text-white/70">
        {label}
      </p>
    </div>
  );
}
