import { AlertTriangle } from 'lucide-react';

export function FormErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-danger-600/30 bg-danger-100 px-4 py-3"
    >
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-danger-600" aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold text-danger-600">Podaci nisu poslati</p>
        <p className="mt-0.5 text-sm text-neutral-700">{message}</p>
      </div>
    </div>
  );
}
