import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      tone: {
        sale: 'bg-status-sale-bg text-status-sale-text border-status-sale-border',
        rent: 'bg-status-rent-bg text-status-rent-text border-status-rent-border',
        pending: 'bg-status-pending-bg text-status-pending-text border-status-pending-border',
        closed: 'bg-status-closed-bg text-status-closed-text border-status-closed-border',
        new: 'bg-status-new-bg text-status-new-text border-status-new-border',
      },
    },
    defaultVariants: { tone: 'closed' },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ tone, className, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
