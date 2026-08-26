import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { to: '/', label: 'Početna' },
  { to: '/nekretnine', label: 'Nekretnine' },
  { to: '/oglasite-nekretninu', label: 'Oglasite nekretninu' },
  { to: '/kontakt', label: 'Kontakt' },
] as const;

export function DesktopNav({ className }: { className?: string }) {
  return (
    <nav aria-label="Glavna navigacija" className={cn('hidden items-center gap-1 lg:flex', className)}>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          activeOptions={{ exact: item.to === '/' }}
          className="whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-primary-100 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 data-[status=active]:bg-white/10 data-[status=active]:text-gold-500"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
