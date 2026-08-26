import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepperProps {
  value: number | null;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
  suffix?: string;
  ariaLabel: string;
}

export function Stepper({ value, onChange, min = 1, max = 6, suffix, ariaLabel }: StepperProps) {
  const current = value ?? 0;

  const decrement = () => {
    if (current <= min) return onChange(null);
    return onChange(current - 1);
  };

  const increment = () => {
    if (value == null) return onChange(min);
    if (current >= max) return;
    return onChange(current + 1);
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex h-10 items-center rounded-md border border-neutral-300 bg-white"
    >
      <button
        type="button"
        onClick={decrement}
        disabled={value == null}
        aria-label="Smanji"
        className={cn(
          'flex h-full w-10 items-center justify-center rounded-l-md text-primary-900 transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500',
          value == null && 'cursor-default opacity-40',
        )}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span aria-live="polite" className="min-w-16 text-center text-sm font-semibold text-neutral-900">
        {value == null ? 'Sve' : `${value}${suffix ?? ''}+`}
      </span>
      <button
        type="button"
        onClick={increment}
        aria-label="Povećaj"
        className="flex h-full w-10 items-center justify-center rounded-r-md text-primary-900 transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
