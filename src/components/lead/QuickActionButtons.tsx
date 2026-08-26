import { Mail, MessageCircle, Phone } from 'lucide-react';
import type { LeadChannel } from '@/domain/lead';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';

const CHANNEL_LABEL: Record<LeadChannel, string> = {
  phone: 'Poziv',
  whatsapp: 'WhatsApp',
  viber: 'Viber',
  email: 'Email',
  form: 'Forma',
};

export function QuickActionButtons({
  propertyTitle,
  preferredChannel,
  className,
}: {
  propertyTitle?: string;
  preferredChannel?: LeadChannel;
  className?: string;
}) {
  const subject = encodeURIComponent(`Upit za nekretninu${propertyTitle ? ` — ${propertyTitle}` : ''}`);

  return (
    <div className={cn('grid gap-2.5 sm:grid-cols-2', className)}>
      <a
        href={siteConfig.contact.phoneHref}
        aria-label={`Pozovite ${siteConfig.contact.phoneDisplay}`}
        className="flex h-11 items-center justify-center gap-2 rounded-md bg-primary-900 text-sm font-semibold text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <Phone className="size-4" aria-hidden="true" />
        Pozovite nas
      </a>
      <a
        href={`${siteConfig.contact.whatsappHref}${propertyTitle ? `?text=${encodeURIComponent(`Pozdrav, zainteresovan sam za „${propertyTitle}".`)}` : ''}`}
        target="_blank"
        rel="noreferrer"
        style={{ backgroundColor: '#25D366' }}
        className="flex h-11 items-center justify-center gap-2 rounded-md text-sm font-semibold text-white transition-all hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        WhatsApp
      </a>
      <a
        href={siteConfig.contact.viberHref}
        style={{ backgroundColor: '#7360F2' }}
        className={cn(
          'flex h-11 items-center justify-center gap-2 rounded-md text-sm font-semibold text-white transition-all hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
          preferredChannel === 'viber' && 'ring-2 ring-offset-1',
        )}
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        Viber
      </a>
      <a
        href={`mailto:${siteConfig.contact.email}?subject=${subject}`}
        className="flex h-11 items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white text-sm font-semibold text-primary-900 transition-colors hover:border-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <Mail className="size-4" aria-hidden="true" />
        Email
      </a>
    </div>
  );
}

export { CHANNEL_LABEL };
