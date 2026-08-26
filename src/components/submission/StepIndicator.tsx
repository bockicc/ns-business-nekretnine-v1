import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SUBMISSION_STEPS } from '@/hooks/useSubmissionWizard';

export function StepIndicator({ stepIndex }: { stepIndex: number }) {
  return (
    <ol className="flex items-center gap-2" aria-label="Koraci objave oglasa">
      {SUBMISSION_STEPS.map((step, index) => {
        const state = index < stepIndex ? 'done' : index === stepIndex ? 'current' : 'upcoming';

        return (
          <li key={step.id} className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                aria-current={state === 'current' ? 'step' : undefined}
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                  state === 'done' && 'border-gold-600 bg-gold-600 text-primary-950',
                  state === 'current' && 'border-primary-900 bg-primary-900 text-white',
                  state === 'upcoming' && 'border-neutral-300 bg-white text-neutral-500',
                )}
              >
                {state === 'done' ? <Check className="size-4" aria-hidden="true" /> : index + 1}
              </span>
              <span className="min-w-0">
                <span
                  className={cn(
                    'block truncate text-sm font-semibold',
                    state === 'upcoming' ? 'text-neutral-500' : 'text-primary-900',
                  )}
                >
                  {step.title}
                </span>
                <span className="hidden truncate text-xs text-neutral-500 md:block">
                  {step.description}
                </span>
              </span>
            </div>
            {index < SUBMISSION_STEPS.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn('hidden h-px flex-1 sm:block', index < stepIndex ? 'bg-gold-600' : 'bg-neutral-300')}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
