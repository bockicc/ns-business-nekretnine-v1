import { Link } from '@tanstack/react-router';
import { Building2, Calculator, Handshake, Phone, Scale } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { Drawer } from '@/components/ui/drawer';

const NAV_ITEMS = [
  { to: '/', label: 'Početna' },
  { to: '/nekretnine', label: 'Nekretnine' },
  { to: '/oglasite-nekretninu', label: 'Oglasite nekretninu' },
  { to: '/kontakt', label: 'Kontakt' },
] as const;

const OBLASTI_ITEMS = [
  { to: '/nekretnine', label: 'Posredovanje u nekretninama', desc: 'Kupovina, prodaja i izdavanje', icon: Building2 },
  { to: '/krediti', label: 'Kreditno savetovanje', desc: 'Stambeni i komercijalni krediti', icon: Calculator },
  { to: '/pravna-podrska', label: 'Pravna podrška', desc: 'Provera dokumentacije i ugovori', icon: Scale },
  { to: '/procena', label: 'Procena vrednosti', desc: 'Analiza tržišta i procena', icon: Handshake },
  { to: '/konsalting', label: 'Investicioni konsalting', desc: 'Savetovanje za investitore', icon: Building2 },
] as const;

export function MobileDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const close = () => onOpenChange(false);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} title="Meni" side="left">
      <nav aria-label="Mobilna navigacija" className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === '/' }}
            onClick={close}
            className="rounded-md px-3 py-2.5 text-base font-medium text-neutral-900 transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 data-[status=active]:bg-primary-100 data-[status=active]:font-semibold data-[status=active]:text-primary-900"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-4 border-t border-neutral-200 pt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
          Oblasti
        </p>
        <div className="flex flex-col gap-0.5">
          {OBLASTI_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.to}
                href={item.to}
                onClick={close}
                className="flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary-100 text-primary-800">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-primary-900">{item.label}</p>
                  <p className="mt-0.5 text-xs text-neutral-500">{item.desc}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="mt-4 border-t border-neutral-200 pt-4">
        <a
          href={siteConfig.url}
          target="_blank"
          rel="noreferrer"
          className="block rounded-md px-3 py-2 text-sm text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          Krediti, Zapošljavanje, Biznis → ns-business.rs
        </a>
      </div>

      <div className="mt-6 border-t border-neutral-200 pt-4">
        <a
          href={siteConfig.contact.phoneHref}
          className="flex items-center gap-2 rounded-md bg-primary-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <Phone className="size-4" aria-hidden="true" />
          {siteConfig.contact.phoneDisplay}
        </a>
        <p className="mt-3 text-xs text-neutral-500">{siteConfig.contact.workingHours}</p>
        <p className="mt-1 text-xs text-neutral-500">{siteConfig.contact.coverage}</p>
      </div>
    </Drawer>
  );
}
