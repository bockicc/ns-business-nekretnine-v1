import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      toastOptions={{
        classNames: {
          toast:
            'rounded-lg border border-neutral-200 bg-white text-neutral-900 shadow-modal font-body',
          description: 'text-neutral-700',
        },
      }}
    />
  );
}
