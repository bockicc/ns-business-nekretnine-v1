import { Mail, Phone, MessageCircle } from 'lucide-react';
import type { Agent } from '@/domain/property';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';

export function AgentContactCard({
  agent,
  propertyTitle,
  className,
}: {
  agent: Agent;
  propertyTitle: string;
  className?: string;
}) {
  const messageBody = encodeURIComponent(
    `Pozdrav, zainteresovan sam za nekretninu „${propertyTitle}". Kada mogu da vidim oglas?`,
  );

  return (
    <aside
      aria-label="Kontakt agent"
      className={cn('rounded-lg border border-neutral-200 bg-white p-5 shadow-card md:p-6', className)}
    >
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-900 font-display text-lg font-semibold text-gold-500"
        >
          {initials(agent.name)}
        </span>
        <div>
          <p className="font-display text-lg font-medium leading-tight text-primary-900">{agent.name}</p>
          <p className="mt-0.5 text-sm text-neutral-700">{agent.role}</p>
          <p className="text-xs text-neutral-500">{agent.agency}</p>
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        <a
          href={siteConfig.contact.phoneHref}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary-900 text-sm font-semibold text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <Phone className="size-4" aria-hidden="true" />
          {siteConfig.contact.phoneDisplay}
        </a>
        {agent.whatsapp ? (
          <a
            href={`${siteConfig.contact.whatsappHref}?text=${messageBody}`}
            target="_blank"
            rel="noreferrer"
            style={{ backgroundColor: '#25D366' }}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold text-white transition-all hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp poruka
          </a>
        ) : null}
        {agent.viber ? (
          <a
            href={siteConfig.contact.viberHref}
            style={{ backgroundColor: '#7360F2' }}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold text-white transition-all hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Viber poruka
          </a>
        ) : null}
        <a
          href={`mailto:${agent.email}?subject=${encodeURIComponent(`Upit: ${propertyTitle}`)}`}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white text-sm font-semibold text-primary-900 transition-colors hover:border-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <Mail className="size-4" aria-hidden="true" />
          Email
        </a>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-neutral-500">
        Radnim danima odgovaramo u roku od nekoliko sati. {siteConfig.contact.workingHours}.
      </p>
    </aside>
  );
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0] ?? '')
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
