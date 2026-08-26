import { Link } from '@tanstack/react-router';
import { Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { Container } from './Container';
import { Logo } from './Logo';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.9.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.21 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.45 2.2 8.84 2.2 12 2.2Zm0 1.76c-3.15 0-3.5.01-4.74.07-1.08.05-1.67.23-2.06.38-.52.2-.89.44-1.28.83-.39.39-.63.76-.83 1.28-.15.39-.33.98-.38 2.06-.06 1.24-.07 1.59-.07 4.42s.01 3.18.07 4.42c.05 1.08.23 1.67.38 2.06.2.52.44.89.83 1.28.39.39.76.63 1.28.83.39.15.98.33 2.06.38 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.08-.05 1.67-.23 2.06-.38.52-.2.89-.44 1.28-.83.39-.39.63-.76.83-1.28.15-.39.33-.98.38-2.06.06-1.24.07-1.59.07-4.42s-.01-3.18-.07-4.42c-.05-1.08-.23-1.67-.38-2.06a2.9 2.9 0 0 0-.83-1.28 2.9 2.9 0 0 0-1.28-.83c-.39-.15-.98-.33-2.06-.38-1.24-.06-1.59-.07-4.74-.07Zm0 2.99a5.05 5.05 0 1 1 0 10.1 5.05 5.05 0 0 1 0-10.1Zm0 1.76a3.29 3.29 0 1 0 0 6.58 3.29 3.29 0 0 0 0-6.58Zm5.24-2.97a1.18 1.18 0 1 1 0 2.36 1.18 1.18 0 0 1 0-2.36Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7h2.37l.35-2.75H13.5V9.5c0-.8.22-1.34 1.37-1.34h1.47V5.7a19.7 19.7 0 0 0-2.14-.11c-2.12 0-3.57 1.3-3.57 3.67v2H8.25V14h2.38v7h2.87Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary-950 text-primary-100">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo inverse />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {siteConfig.tagline} {siteConfig.heroLine}
          </p>
          <div className="mt-5 flex gap-2">
            {siteConfig.socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.id === 'instagram' ? 'Instagram' : 'Facebook'}
                className="inline-flex size-9 items-center justify-center rounded-md border border-white/15 text-white/80 transition-colors hover:border-gold-500 hover:text-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                {social.id === 'instagram' ? (
                  <InstagramIcon className="size-4" />
                ) : (
                  <FacebookIcon className="size-4" />
                )}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Navigacija u podnožju">
          <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-500">Navigacija</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">Početna</Link></li>
            <li><Link to="/nekretnine" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">Sve nekretnine</Link></li>
            <li><Link to="/nekretnine" search={{ intent: 'sale' }} className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">Prodaja</Link></li>
            <li><Link to="/nekretnine" search={{ intent: 'rent' }} className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">Izdavanje</Link></li>
            <li><Link to="/oglasite-nekretninu" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">Oglasite nekretninu</Link></li>
            <li><Link to="/kontakt" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">Kontakt</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-500">Kontakt</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold-500" aria-hidden="true" />
              <a href={siteConfig.contact.phoneHref} className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold-500" aria-hidden="true" />
              <a href={`mailto:${siteConfig.contact.email}`} className="break-all transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-500" aria-hidden="true" />
              <span>{siteConfig.contact.address}</span>
            </li>
            <li className="text-white/60">{siteConfig.contact.workingHours}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-500">Pravni podaci</h2>
          <dl className="mt-4 space-y-2 text-sm text-white/70">
            <div>{siteConfig.legal.entity}</div>
            <div>MB: {siteConfig.legal.mb}</div>
            <div>PIB: {siteConfig.legal.pib}</div>
            <div className="break-all">Žiro račun: {siteConfig.legal.account}</div>
          </dl>
          <p className="mt-4 rounded-lg bg-white/5 p-3 text-xs leading-relaxed text-white/60">
            {siteConfig.privacyLine}
          </p>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-1 py-4 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Sva prava zadržana.</p>
          <p>Cene su izražene u EUR i RSD i podložne su promenama.</p>
        </Container>
      </div>
    </footer>
  );
}
