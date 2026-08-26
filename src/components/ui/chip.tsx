import { cn } from '@/lib/utils';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({ label, selected = false, onClick, className }: ChipProps) {
  const interactive = Boolean(onClick);
  const Component = interactive ? 'button' : 'span';

  return (
    <Component
      {...(interactive
        ? {
            type: 'button' as const,
            onClick,
            'aria-pressed': selected,
          }
        : {})}
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
        interactive && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:shadow-focus-ring',
        selected
          ? 'border-primary-900 bg-primary-900 text-white'
          : 'border-neutral-300 bg-white text-neutral-700 hover:border-primary-400 hover:text-primary-900',
        className,
      )}
    >
      {label}
    </Component>
  );
}
