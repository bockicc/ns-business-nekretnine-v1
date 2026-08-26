import { forwardRef } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  label: React.ReactNode;
  invalid?: boolean;
};

export const Checkbox = forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, invalid = false, id, ...props }, ref) => {
    const checkboxId = id ?? props.name ?? label?.toString();

    return (
      <div className="flex items-start gap-2.5">
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkboxId}
          aria-invalid={invalid || undefined}
          className={cn(
            'mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-[4px] border bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:shadow-focus-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary-900 data-[state=checked]:bg-primary-900',
            invalid ? 'border-danger-600' : 'border-neutral-500 hover:border-primary-700',
            className,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator>
            <Check className="size-3.5 text-white" aria-hidden="true" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label
          htmlFor={checkboxId}
          className="cursor-pointer text-sm leading-snug text-neutral-700"
        >
          {label}
        </label>
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';
