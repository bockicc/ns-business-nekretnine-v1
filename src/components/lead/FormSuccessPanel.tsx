import { CheckCircle2, Phone } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { Button } from '@/components/ui/button';

export function FormSuccessPanel({
  title,
  description,
  onReset,
}: {
  title: string;
  description: string;
  onReset?: () => void;
}) {
  return (
    <div
      role="status"
      className="rounded-lg border border-status-sale-border bg-status-sale-bg px-5 py-8 text-center"
    >
      <CheckCircle2 aria-hidden="true" className="mx-auto size-10 text-status-sale-text" />
      <h3 className="mt-4 font-display text-xl font-medium text-primary-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-neutral-700">{description}</p>
      {onReset ? (
        <Button variant="outline" onClick={onReset} className="mt-6">
          Pošaljite novi upit
        </Button>
      ) : null}
      <p className="mt-5 flex items-center justify-center gap-2 text-sm text-neutral-700">
        <Phone className="size-4 text-gold-600" aria-hidden="true" />
        Hitno? Pozovite {siteConfig.contact.phoneDisplay}
      </p>
    </div>
  );
}
