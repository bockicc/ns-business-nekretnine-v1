import { Info } from 'lucide-react';
import { siteConfig } from '@/data/site';

export function PricingCallout({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-gold-100 bg-gold-100/50 px-4 py-3">
      <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold-700" />
      <p className={compact ? 'text-xs leading-relaxed text-neutral-700' : 'text-sm leading-relaxed text-neutral-700'}>
        Objava oglasa je jednorazovno <strong>5.000 RSD</strong> i važi{' '}
        <strong>{siteConfig.listingFee.periodDays} dana</strong>. Oglas objavljujemo tek nakon
        administrativne provere ({siteConfig.reviewWindowHours}).
      </p>
    </div>
  );
}
