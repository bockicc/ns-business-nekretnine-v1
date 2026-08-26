import { useEffect, useRef, useState } from 'react';
import { Building2, Calculator, ChevronDown, Handshake, Menu, Scale } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { siteConfig } from '@/data/site';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { DesktopNav } from './DesktopNav';
import { HeaderSearch } from './HeaderSearch';
import { Logo } from './Logo';
import { MobileDrawer } from './MobileDrawer';

const OBLASTI = [
  {
    to: '/nekretnine',
    label: 'Posredovanje u nekretninama',
    desc: 'Kupovina, prodaja i izdavanje',
    icon: Building2,
  },
  {
    to: '/krediti',
    label: 'Kreditno savetovanje',
    desc: 'Stambeni i komercijalni krediti',
    icon: Calculator,
  },
  {
    to: '/pravna-podrska',
    label: 'Pravna podrška',
    desc: 'Provera dokumentacije i ugovori',
    icon: Scale,
  },
  {
    to: '/procena',
    label: 'Procena vrednosti',
    desc: 'Analiza tržišta i procena',
    icon: Handshake,
  },
  {
    to: '/konsalting',
    label: 'Investicioni konsalting',
    desc: 'Savetovanje za investitore',
    icon: Building2,
  },
] as const;

export function Header() {
  const scrolled = useScrollThreshold(24);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [oblastiOpen, setOblastiOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!oblastiOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOblastiOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOblastiOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [oblastiOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full max-w-full bg-primary-900 transition-shadow',
        scrolled ? 'shadow-sticky-nav' : '',
      )}
    >
      <Container className="flex h-14 items-center gap-4 px-4 sm:px-6 lg:px-8 md:h-16">
        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <Logo inverse />
          <DesktopNav />
          <div ref={dropdownRef} className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => setOblastiOpen((prev) => !prev)}
              aria-expanded={oblastiOpen}
              aria-haspopup="true"
              className="flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-primary-100 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              Oblasti
              <ChevronDown className={cn('size-3.5 transition-transform', oblastiOpen && 'rotate-180')} aria-hidden="true" />
            </button>
            {oblastiOpen ? (
              <div className="absolute left-0 top-full z-50 mt-1 w-80 rounded-lg border border-neutral-200 bg-white p-1.5 shadow-modal animate-fade-in">
                {OBLASTI.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.to}
                      href={item.to}
                      className="flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                      onClick={() => setOblastiOpen(false)}
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
                <div className="mt-1 border-t border-neutral-100 pt-1">
                  <a
                    href={siteConfig.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-md px-3 py-2 text-xs text-neutral-400 transition-colors hover:bg-neutral-50 hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    Krediti, Zapošljavanje, Biznis → ns-business.rs
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <HeaderSearch />
          <Link
            to="/oglasite-nekretninu"
            className="hidden whitespace-nowrap rounded-md bg-gold-600 px-4 py-2 text-sm font-semibold text-primary-950 transition-colors hover:bg-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 sm:inline-flex sm:px-5 lg:px-6"
          >
            Izaberite uslugu
          </Link>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Otvori meni"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 md:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </Container>
      <MobileDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </header>
  );
}
